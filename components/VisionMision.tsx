"use client";

import React from "react";
import { Eye, Target } from "lucide-react";

const DATA = [
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To lead the advancement of process intelligence globally — transforming operational complexity into strategic advantage.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To engineer intelligent operational systems that enable organisations to scale efficiently, operate with precision, and achieve measurable performance improvement.",
  },
];

export default function VisionMission() {
  return (
    <section className="bg-[#f0f0f3] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Top Pill Badge */}
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white bg-[#3d418e] px-4 py-1.5 rounded-full mb-3">
            Vision and Mission
          </span>
          {/* Main Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter">
            Our Vision and Mission
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-stretch">
          {DATA.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                
                className="bg-[#f0f0f3] rounded-3xl p-10 md:p-14  flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]" style={{
          boxShadow: `
            -8px -8px 16px rgba(255, 255, 255, 0.85),
            8px 8px 20px rgba(174, 174, 192, 0.45),
            -2px -2px 6px rgba(255, 255, 255, 0.6),
            2px 2px 8px rgba(174, 174, 192, 0.3)
          `,
        }}
              >
                <div>
                  {/* Icon Square */}
                  <div className="w-14 h-14 rounded-xl bg-[#3d418e] flex items-center justify-center mb-10 shadow-lg shadow-[#3d418e]/20">
                    <Icon className="w-7 h-7 text-white stroke-[2.5]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-6 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-slate-600 text-sm md:text-base sm:text-sm lg:text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}