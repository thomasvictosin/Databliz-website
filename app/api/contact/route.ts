import { Resend } from "resend";
import { NextResponse } from "next/server";

// Redis-backed rate limiter configuration
const MAX_PER_HOUR = 5;
const MIN_INTERVAL_MS = 10 * 1000; // 10 seconds

async function getRedisClient() {
  // Upstash uses REST URL + token (recommended for serverless)
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
    if (!(globalThis as any).__upstash) {
    // dynamically import to avoid requiring @upstash/redis type declarations at build time
    const mod = await import('@upstash' + '/redis');
    const RedisCtor = (mod as any).Redis ?? (mod as any).default;
    (globalThis as any).__upstash = new RedisCtor({ url, token });
  }
  return (globalThis as any).__upstash;
}

// In-memory fallback (only used if Upstash isn't configured).
// Suitable for local dev; not for production horizontal scaling.
const INMEM = new Map<string, { count: number; firstTs: number; lastTs: number }>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};

    // basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // honeypot (spam) field - should be empty
    if (body.honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // determine client IP (best-effort)
    const xff = (request.headers.get('x-forwarded-for') || '').split(',').map(s => s.trim()).find(Boolean);
    const ip = xff || request.headers.get('x-real-ip') || 'unknown';

    // Redis client (if configured) or fallback to in-memory map
    const redis = await getRedisClient();
    const now = Date.now();

    if (redis) {
      // check last submission timestamp to enforce MIN_INTERVAL_MS
      const lastKey = `contact:${ip}:last`;
      const countKey = `contact:${ip}:count`;

      const last = await redis.get(lastKey);
      if (last && now - parseInt(last, 10) < MIN_INTERVAL_MS) {
        return NextResponse.json({ error: `Please wait ${Math.ceil((MIN_INTERVAL_MS - (now - parseInt(last, 10))) / 1000)}s before retrying.` }, { status: 429 });
      }

      // increment hourly counter
      const count = await redis.incr(countKey);
      if (count === 1) {
        // set 1 hour expiry on first increment
        await redis.expire(countKey, 60 * 60);
      }
      if (count > MAX_PER_HOUR) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }

      // update last timestamp (expire after 1 hour)
      await redis.set(lastKey, String(now), 'PX', 60 * 60 * 1000);
    } else {
      // fallback in-memory limiter for local dev
      const entry = INMEM.get(ip) ?? { count: 0, firstTs: now, lastTs: 0 };
      if (now - entry.firstTs > 60 * 60 * 1000) {
        entry.count = 0;
        entry.firstTs = now;
      }
      if (entry.lastTs && now - entry.lastTs < MIN_INTERVAL_MS) {
        return NextResponse.json({ error: `Please wait ${Math.ceil((MIN_INTERVAL_MS - (now - entry.lastTs)) / 1000)}s before retrying.` }, { status: 429 });
      }
      entry.count += 1;
      entry.lastTs = now;
      INMEM.set(ip, entry);
      if (entry.count > MAX_PER_HOUR) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }
    }

    // basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const requiredEnv = ['RESEND_API_KEY', 'CONTACT_EMAIL'] as const;
    const missing = requiredEnv.filter((k) => !process.env[k]);
    if (missing.length) {
      // Return which env var names are missing (do NOT return values)
      return NextResponse.json({ error: 'Server not configured', missing }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const html = `<!DOCTYPE html>
      <html>
        <body>
          <h2>New contact message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p>${String(message).replace(/\n/g, '<br/>')}</p>
        </body>
      </html>`;

    await resend.emails.send({
      from: `Databliz Contact <no-reply@${process.env.CONTACT_DOMAIN ?? 'databliz.com'}>`,
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: err?.message || 'Internal error' }, { status: 500 });
  }
}