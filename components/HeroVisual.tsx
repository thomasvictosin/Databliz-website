"use client";
import React, { useEffect, useRef } from "react";

const IMG = {
  network:    "/images/icon-network.png",
  automation: "/images/icon-automation.png",
  dashboard:  "/images/icon-dashboard.png",
  process:    "/images/icon-process.png",
  hero:       "/images/hero-hand.png",
};
const ORB_X = 0.37;  // Adjust left/right (0-1, where 0.5 is center)
const ORB_Y = 0.38;  // Adjust up/down (0-1, where 0.5 is center)

const CSS = `
  .hv-root {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 580px;
    overflow: visible;
  }

  /* Hero — now 110% wide so it dominates the right column */
  .hv-hero {
    position: absolute;
    bottom: -4%;
    right: -8%;
    width: 100%;
    max-width: 760px;
    pointer-events: none;
    z-index: 2;
    
  }
  .hv-hero img {
    width: 100%;
    display: block;
    mix-blend-mode: lighten;
    filter: drop-shadow(0 0 60px rgba(0,200,255,0.35));
  }
  @keyframes hvFloat {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-14px); }
  }

  .hv-anchor {
    position: absolute;
    width: 0;
    height: 0;
    z-index: 20;
    pointer-events: none;
  }

  .hv-track {
    position: absolute;
    border-radius: 50%;
    border: 1px dashed rgba(0,210,255,0.22);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .hv-cglow {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,210,255,0.18) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    animation: hvGlow 3s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes hvGlow {
    0%,100% { transform: translate(-50%,-50%) scale(1);   opacity:.6; }
    50%      { transform: translate(-50%,-50%) scale(1.6); opacity:1;  }
  }

  .hv-owrap {
    position: absolute;
    top: 0; left: 0;
    width: 0; height: 0;
    animation: hvSpin var(--dur) linear infinite;
    animation-delay: var(--dl);
  }
  @keyframes hvSpin { to { transform: rotate(360deg); } }

  .hv-oicon {
    position: absolute;
    width: var(--sz);
    height: var(--sz);
    top: calc(-1 * var(--r));
    left: calc(-1 * var(--sz) / 2);
    border-radius: 50%;
    overflow: hidden;
    animation: hvUnspin var(--dur) linear infinite;
    animation-delay: var(--dl);
    box-shadow:
      0 0 14px rgba(0,180,255,0.65),
      0 0 32px rgba(0,80,200,0.35);
    transition: box-shadow .3s;
    cursor: pointer;
    pointer-events: all;
  }
  .hv-oicon:hover {
    box-shadow: 0 0 28px rgba(0,220,255,.9), 0 0 56px rgba(0,150,255,.5);
  }
  @keyframes hvUnspin { to { transform: rotate(-360deg); } }

  .hv-oicon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }
`;

const ICONS = [
  { src: IMG.network,    alt: "Network Intelligence",   delay: "0s"  },
  { src: IMG.automation, alt: "Intelligent Automation", delay: "-3s" },
  { src: IMG.dashboard,  alt: "Performance Dashboard",  delay: "-6s" },
  { src: IMG.process,    alt: "Process Intelligence",   delay: "-9s" },
];

const R   = "135px";
const SZ  = "62px";
const DUR = "12s";
const TRACK = 270;

export default function HeroVisual() {
  const heroRef   = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroEl   = heroRef.current;
    const anchorEl = anchorRef.current;
    if (!heroEl || !anchorEl) return;

    function reposition() {
      const img = heroEl!.querySelector("img") as HTMLImageElement;
      if (!img) return;
      const imgRect  = img.getBoundingClientRect();
      const rootRect = heroEl!.parentElement!.getBoundingClientRect();
      const orbX = imgRect.left + imgRect.width  * ORB_X - rootRect.left;
      const orbY = imgRect.top  + imgRect.height * ORB_Y - rootRect.top;
      anchorEl!.style.left = orbX + "px";
      anchorEl!.style.top  = orbY + "px";
      
      // Scale orbit based on image size
      const imgWidth = imgRect.width;
      const orbitRadius = Math.round(imgWidth * 0.4); // 40% of image width
      const trackSize = Math.round(orbitRadius * 2);
      
      const track = anchorEl!.querySelector(".hv-track") as HTMLElement;
      const cglow = anchorEl!.querySelector(".hv-cglow") as HTMLElement;
      if (track) {
        track.style.width = trackSize + "px";
        track.style.height = trackSize + "px";
      }
      if (cglow) {
        cglow.style.width = (trackSize + 40) + "px";
        cglow.style.height = (trackSize + 40) + "px";
      }
      
      // Update CSS variables for icon orbit
      const wraps = anchorEl!.querySelectorAll(".hv-owrap");
      wraps.forEach(wrap => {
        (wrap as HTMLElement).style.setProperty("--r", orbitRadius + "px");
      });
    }

    const ro = new ResizeObserver(reposition);
    ro.observe(heroEl.parentElement!);
    const img = heroEl.querySelector("img") as HTMLImageElement;
    img?.addEventListener("load", reposition);
    reposition();
    return () => ro.disconnect();
  }, []);

  return (
    <div className="hv-root">
      <style>{CSS}</style>

      <div className="hv-hero" ref={heroRef}>
        <img src={IMG.hero} alt="Operational excellence" />
      </div>

      <div className="hv-anchor" ref={anchorRef}>
        <div className="hv-cglow" style={{ width: 170, height: 170 }} />
        <div className="hv-track" style={{ width: TRACK, height: TRACK }} />

        {ICONS.map((icon) => (
          <div
            key={icon.alt}
            className="hv-owrap"
            style={{
              "--dur": DUR,
              "--dl":  icon.delay,
              "--r":   R,
              "--sz":  SZ,
            } as React.CSSProperties}
          >
            <div className="hv-oicon">
              <img src={icon.src} alt={icon.alt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}