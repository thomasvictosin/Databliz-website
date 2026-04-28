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

  .hv-hero img {
    mix-blend-mode: lighten;
    filter: drop-shadow(0 0 60px rgba(0,200,255,0.35));
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
  }
  .hv-oicon:hover {
    box-shadow: 0 0 28px rgba(0,220,255,.9), 0 0 56px rgba(0,150,255,.5);
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
      
      if (imgRect.width === 0 || imgRect.height === 0 || rootRect.width === 0) return;
      
      const orbX = imgRect.left + imgRect.width  * ORB_X - rootRect.left;
      const orbY = imgRect.top  + imgRect.height * ORB_Y - rootRect.top;
      
      anchorEl!.style.left = orbX + "px";
      anchorEl!.style.top  = orbY + "px";
      
      // Scale orbit based on image size
      const imgWidth = imgRect.width;
      const orbitRadius = Math.round(imgWidth * 0.4);
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
      
      const wraps = anchorEl!.querySelectorAll(".hv-owrap");
      wraps.forEach(wrap => {
        (wrap as HTMLElement).style.setProperty("--r", orbitRadius + "px");
      });
    }

    function scheduleReposition() {
      requestAnimationFrame(reposition);
    }

    const img = heroEl.querySelector("img") as HTMLImageElement;
    
    // Wait for image to load or use it if already loaded
    const loadPromise = new Promise<void>((resolve) => {
      if (img?.complete && img?.naturalWidth > 0) {
        resolve();
      } else {
        img?.addEventListener("load", () => resolve(), { once: true });
        setTimeout(resolve, 2000); // Fallback timeout
      }
    });

    loadPromise.then(() => {
      // Wait for next frame after image is loaded
      requestAnimationFrame(() => {
        requestAnimationFrame(scheduleReposition);
      });
    });

    // Set up ResizeObserver for continuous updates
    const ro = new ResizeObserver(scheduleReposition);
    ro.observe(heroEl.parentElement!);
    
    // Also listen to window resize
    window.addEventListener("resize", scheduleReposition);
    
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", scheduleReposition);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-96 overflow-visible">
      <style>{CSS}</style>

      <div className="absolute bottom-[-4%] right-[-8%] w-full max-w-[760px] pointer-events-none z-20" ref={heroRef}>
        <img src={IMG.hero} alt="Operational excellence" className="w-full block" />
      </div>

      <div className="absolute w-0 h-0 z-20 pointer-events-none" ref={anchorRef}>
        <div 
          className="hv-cglow absolute rounded-full bg-gradient-to-r from-cyan-900/20 to-transparent pointer-events-none" 
          style={{ width: 170, height: 170, transform: 'translate(-50%, -50%)' }} 
        />
        <div 
          className="hv-track absolute rounded-full border border-dashed border-cyan-500/20 pointer-events-none" 
          style={{ width: TRACK, height: TRACK, transform: 'translate(-50%, -50%)' }} 
        />

        {ICONS.map((icon) => (
          <div
            key={icon.alt}
            className="hv-owrap absolute top-0 left-0 w-0 h-0"
            style={{
              "--dur": DUR,
              "--dl":  icon.delay,
              "--r":   R,
              "--sz":  SZ,
            } as React.CSSProperties}
          >
            <div 
              className="hv-oicon absolute rounded-full overflow-hidden cursor-pointer pointer-events-auto"
              style={{
                width: 'var(--sz)',
                height: 'var(--sz)',
                top: 'calc(-1 * var(--r))',
                left: 'calc(-1 * var(--sz) / 2)',
              }}
            >
              <img src={icon.src} alt={icon.alt} className="w-full h-full object-cover rounded-full block" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}