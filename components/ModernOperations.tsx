"use client";

import type { CSSProperties, ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

function runAfterPaint(fn: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
}

function useBulletsReveal(regionRef: RefObject<HTMLDivElement | null>) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;

    let cancelled = false;

    const reveal = () => {
      runAfterPaint(() => {
        if (!cancelled) setPlay(true);
      });
    };

    const isInViewport = () => {
      const r = el.getBoundingClientRect();
      if (r.height < 1 && r.width < 1) return false;
      const vh = window.innerHeight;
      return r.top < vh && r.bottom > 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        reveal();
      },
      { threshold: 0, rootMargin: "0px 0px 25% 0px" }
    );

    observer.observe(el);

    const onScrollOrResize = () => {
      if (isInViewport()) {
        observer.disconnect();
        window.removeEventListener("scroll", onScrollOrResize);
        window.removeEventListener("resize", onScrollOrResize);
        reveal();
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    requestAnimationFrame(onScrollOrResize);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [regionRef]);

  return play;
}

const pillBase =
  "w-full bg-white rounded-full text-gray-700 shadow-sm hover:shadow-md before:content-['•'] before:text-[#0a1560] before:font-bold";

const painPillClassMobile = "pl-4 pr-2 py-4 text-base before:mr-2";
const painPillClassDesktop = "pl-4 pr-2 py-3 text-base before:mr-2";
const painPillColClass = "flex flex-col w-max max-w-full";
const painPillColClassMobile = "flex flex-col gap-4 md:gap-6 w-full min-w-0 flex-1";

function PainPill({
  side,
  index,
  play,
  className,
  children,
}: {
  side: "left" | "right";
  index: number;
  play: boolean;
  className: string;
  children: ReactNode;
}) {
  const sideClass = side === "left" ? "modern-ops-pain-pill--left" : "modern-ops-pain-pill--right";
  const style = {
    "--modern-ops-stagger": `${index * 140}ms`,
  } as CSSProperties;

  return (
    <div
      className={`${pillBase} ${sideClass} ${play ? "modern-ops-pain-pill--play" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default function ModernOperations() {
  const bulletsRegionRef = useRef<HTMLDivElement>(null);
  const play = useBulletsReveal(bulletsRegionRef);

  const leftPoints = [
    "Manual tasks slow execution",
    "Disconnected workflows obscure",
    "Bottlenecks restrict throughput",
  ];

  const rightPoints = [
    "Operations are inefficient",
  "Capacity constraints limit scalability",
    "Operational complexity is inevitable",
  ];

  return (
    <section className="relative w-full bg-gray-50 px-4 sm:px-6 lg:px-0 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-3 md:mb-4">
            <img src="/images/target.png" alt="Target Icon" className="h-10 md:h-12 w-auto mx-auto" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#3E4095] leading-tight mb-4 md:mb-6">
            Modern Operations <br />
            <span className="text-[#3176B1] font-black">Pain Points</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Most UK SMEs run on processes that were never properly designed — they grew organically and now create
            invisible drag on your performance.
          </p>
        </div>

        <div className="flex justify-center mb-12 md:mb-16 lg:hidden">
          <div className="w-full max-w-[400px] md:max-w-[560px] rounded-2xl overflow-hidden shadow-2xl">
            <img src="/images/mordern-operation.png" alt="Modern Operations" className="w-full h-auto block" />
          </div>
        </div>

        <div ref={bulletsRegionRef} className="mt-0">
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full lg:hidden">
            <div className={`${painPillColClassMobile} sm:items-end`}>
              {leftPoints.map((point, idx) => (
                <PainPill key={`left-${idx}`} side="left" index={idx} play={play} className={painPillClassMobile}>
                  {point}
                </PainPill>
              ))}
            </div>
            <div className={`${painPillColClassMobile} sm:items-start`}>
              {rightPoints.map((point, idx) => (
                <PainPill key={`right-${idx}`} side="right" index={idx} play={play} className={painPillClassMobile}>
                  {point}
                </PainPill>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-[1fr_1.45fr_1fr] gap-8 xl:gap-10 items-center mt-20">
            <div className={`${painPillColClass} gap-8 justify-self-end`}>
              {leftPoints.map((point, idx) => (
                <PainPill
                  key={`desktop-left-${idx}`}
                  side="left"
                  index={idx}
                  play={play}
                  className={painPillClassDesktop}
                >
                  {point}
                </PainPill>
              ))}
            </div>
            <div className="flex justify-center w-full">
              <div className="w-full max-w-2xl xl:max-w-3xl rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/mordern-operation.png" alt="Modern Operations" className="w-full h-auto block" />
              </div>
            </div>
            <div className={`${painPillColClass} gap-8 justify-self-start`}>
              {rightPoints.map((point, idx) => (
                <PainPill
                  key={`desktop-right-${idx}`}
                  side="right"
                  index={idx}
                  play={play}
                  className={painPillClassDesktop}
                >
                  {point}
                </PainPill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
