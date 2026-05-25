"use client";
import React, { useEffect, useRef } from "react";

const IMG = {
  network:    "/images/icon-network.png",
  automation: "/images/icon-automation.png",
  dashboard:  "/images/icon-dashboard.png",
  process:    "/images/icon-process.png",
  hero:       "/images/visualhand.png",
};
const ORB_X = 0.5;  // Adjust left/right (0-1, where 0.5 is center)
const ORB_Y = 0.5;  // Adjust up/down (0-1, where 0.5 is center)

const CSS = `
  @keyframes hvFloat {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-14px); }
  }

  @keyframes hvGlow {
    0%,100% { transform: translate(-50%,-50%) scale(1);   opacity:.6; }
    50%      { transform: translate(-50%,-50%) scale(1.6); opacity:1;  }
  }

  @keyframes hvSpin { to { transform: rotate(360deg); } }

  @keyframes hvUnspin { to { transform: rotate(-360deg); } }

  .hv-hero-container img {
    mix-blend-mode: lighten;
    filter: drop-shadow(0 0 60px rgba(0, 200, 255, 0.35));
  }

  .hv-cglow {
    animation: hvGlow 3s ease-in-out infinite;
  }

  .hv-owrap {
    animation: hvSpin var(--dur) linear infinite;
    animation-delay: var(--dl);
  }

  .hv-oicon {
    animation: hvUnspin var(--dur) linear infinite;
    animation-delay: var(--dl);
    box-shadow:
      0 0 14px rgba(0,180,255,0.65),
      0 0 32px rgba(0,80,200,0.35);
    transition: box-shadow .3s;
    width: var(--sz);
    height: var(--sz);
    top: calc(-1 * var(--r));
    left: calc(-1 * var(--sz) / 2);
  }

  .hv-oicon:hover {
    box-shadow: 0 0 28px rgba(0,220,255,.9), 0 0 56px rgba(0,150,255,.5);
  }

  .hv-hero-container {
    width: auto;
    max-width: none;
    mix-blend-mode: lighten;
  }

  @media (max-width: 1024px) {
    .hv-hero-container {
      right: auto;
      bottom: auto;
    }
    :root {
      --sz-val: 38px;
    }
  }

  @media (max-width: 640px) {
    :root {
      --sz-val: 30px;
    }
  }

  @media (min-width: 1025px) {
    :root {
      --sz-val: 62px;
    }
  }
`;

const ICONS = [
  { src: IMG.network,    alt: "Network Intelligence",   delay: "0s"  },
  { src: IMG.automation, alt: "Intelligent Automation", delay: "-3s" },
  { src: IMG.dashboard,  alt: "Performance Dashboard",  delay: "-6s" },
  { src: IMG.process,    alt: "Process Intelligence",   delay: "-9s" },
];

const DUR = "12s";

function getBreakpoint() {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(max-width: 640px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1024px)").matches) return "tablet";
  return "desktop";
}

/** Width so orb sits at horizontal center and image right edge meets viewport right. */
function layoutImageWidth(viewportWidth: number) {
  return viewportWidth / (2 * (1 - ORB_X));
}


export default function HeroVisual() {
  const rootRef   = useRef<HTMLDivElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl   = rootRef.current;
    const heroEl   = heroRef.current;
    const anchorEl = anchorRef.current;
    if (!rootEl || !heroEl || !anchorEl) return;

    function layoutHand() {
      const img = heroEl!.querySelector("img") as HTMLImageElement;
      if (!img) return;

      const bp = getBreakpoint();
      const rootW = rootEl!.clientWidth;
      const rootH = rootEl!.clientHeight;

      if (rootW === 0 || rootH === 0) return;

      if (bp === "desktop") {
        heroEl!.style.width = "";
        heroEl!.style.left = "";
        heroEl!.style.top = "";
        heroEl!.style.right = "";
        heroEl!.style.bottom = "";
        heroEl!.style.transform = "";
        img.style.width = "";
      } else {
        const layoutW = window.innerWidth;
        const imgW = layoutImageWidth(layoutW);

        img.style.width = `${Math.round(imgW)}px`;
        img.style.maxWidth = "none";

        const imgH = img.offsetHeight || img.getBoundingClientRect().height;
        if (imgH === 0) return;

        const rootRect = rootEl!.getBoundingClientRect();
        // Orb at viewport center; image right edge flush with viewport right
        const left = layoutW / 2 - imgW * ORB_X - rootRect.left;
        const top = rootH - imgH;

        heroEl!.style.width = "auto";
        heroEl!.style.left = `${left}px`;
        heroEl!.style.top = `${top}px`;
        heroEl!.style.right = "";
        heroEl!.style.bottom = "";
        heroEl!.style.transform = "none";
      }
    }

    function reposition() {
      layoutHand();

      const img = heroEl!.querySelector("img") as HTMLImageElement;
      if (!img) return;

      const imgRect  = img.getBoundingClientRect();
      const rootRect = rootEl!.getBoundingClientRect();

      if (imgRect.width === 0 || imgRect.height === 0 || rootRect.width === 0) return;

      const orbX = imgRect.left + imgRect.width * ORB_X - rootRect.left;
      const orbY = imgRect.top + imgRect.height * ORB_Y - rootRect.top;

      anchorEl!.style.left = orbX + "px";
      anchorEl!.style.top = orbY + "px";

      const imgWidth = imgRect.width;
      const bp = getBreakpoint();
      const orbitMultiplier = bp === "tablet" ? 0.2 : 0.3;
      const orbitRadius = Math.round(imgWidth * orbitMultiplier);
      const trackSize = Math.round(orbitRadius * 2);

      const track = anchorEl!.querySelector(".hv-track") as HTMLElement;
      const cglow = anchorEl!.querySelector(".hv-cglow") as HTMLElement;
      if (track) {
        track.style.width = trackSize + "px";
        track.style.height = trackSize + "px";
      }
      if (cglow) {
        cglow.style.width = trackSize + 40 + "px";
        cglow.style.height = trackSize + 40 + "px";
      }

      anchorEl!.querySelectorAll(".hv-owrap").forEach((wrap) => {
        (wrap as HTMLElement).style.setProperty("--r", orbitRadius + "px");
      });
    }

    function scheduleReposition() {
      requestAnimationFrame(reposition);
    }

    const img = heroEl.querySelector("img") as HTMLImageElement;

    const loadPromise = new Promise<void>((resolve) => {
      if (img?.complete && img?.naturalWidth > 0) {
        resolve();
      } else {
        img?.addEventListener("load", () => resolve(), { once: true });
        setTimeout(resolve, 2000);
      }
    });

    loadPromise.then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(scheduleReposition);
      });
    });

    const ro = new ResizeObserver(scheduleReposition);
    ro.observe(rootEl);

    window.addEventListener("resize", scheduleReposition);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", scheduleReposition);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="hv-root relative w-full h-full min-h-[300px] md:min-h-96 max-lg:min-h-full max-lg:w-full max-lg:left-0"
    >
      <style>{CSS}</style>

      <div
        className="hv-hero-container absolute bottom-[-10%] -right-[6.5%] max-lg:bottom-auto max-lg:right-auto w-full max-w-[900px] md:max-w-[400px] max-md:max-w-none pointer-events-none z-20 mix-blend-lighten"
        ref={heroRef}
      >
        <img
          src={IMG.hero}
          alt="Operational excellence"
          className="w-full max-lg:w-auto block mix-blend-lighten"
        />
      </div>

      <div className="absolute w-0 h-0 z-20 pointer-events-none" ref={anchorRef}>
        <div
          className="hv-cglow absolute rounded-full bg-gradient-to-r from-cyan-900/20 to-transparent pointer-events-none"
          style={{ left: 0, top: 0, width: 0, height: 0, transform: "translate(-50%, -50%)" }}
        />
        <div
          className="hv-track absolute rounded-full border border-dashed border-cyan-500/20 pointer-events-none"
          style={{ left: 0, top: 0, width: 0, height: 0, transform: "translate(-50%, -50%)" }}
        />

        {ICONS.map((icon) => (
          <div
            key={icon.alt}
            className="hv-owrap absolute top-0 left-0 w-0 h-0"
            style={
              {
                "--dur": DUR,
                "--dl": icon.delay,
                "--sz": "var(--sz-val)",
              } as React.CSSProperties
            }
          >
            <div className="hv-oicon absolute rounded-full overflow-hidden cursor-pointer pointer-events-auto">
              <img src={icon.src} alt={icon.alt} className="w-full h-full object-cover rounded-full block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
