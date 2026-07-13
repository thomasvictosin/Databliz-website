import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://databliz.com';

export function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
  });
}
