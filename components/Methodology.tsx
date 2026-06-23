"use client";

import React from "react";
import {
  Users,
  BarChart3,
  Zap,
  Cog,
  TrendingUp,
} from "lucide-react";

interface MethodologyStep {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    number: 1,
    icon: <Users className="w-10 h-10 md:w-12 md:h-12 text-white" />,
    title: "Discover",
    description: "We map your current processes and establish a performance baseline.",
  },
  {
    number: 2,
    icon: <BarChart3 className="w-10 h-10 md:w-12 md:h-12 text-white" />,
    title: "Diagnose",
    description: "We identify bottlenecks, manual friction points, and automation opportunities",
  },
  {
    number: 3,
    icon: <Zap className="w-10 h-10 md:w-12 md:h-12 text-white" />,
    title: "Design",
    description: "We model improved workflows using simulation so you see results before we change anything",
  },
  {
    number: 4,
    icon: <Cog className="w-10 h-10 md:w-12 md:h-12 text-white" />,
    title: "Deploy",
    description: "We implement automation and process improvements within your existing systems.",
  },
  {
    number: 5,
    icon: <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-white" />,
    title: "Monitor",
    description: "We monitor performance and refine continuously because operations should always be improving.",
  },
];

export default function Methodology() {
  return (
    <section className="bg-slate-100 py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#3d418e] mb-4">
            Our Methodology
          </h2>
          <p className="text-sm md:text-base sm:text-sm lg:text-base text-slate-600">
            A <span className="text-[#3d418e] font-semibold">Structured</span> Approach to Performance Engineering
          </p>
        </div>

        {/* Steps Grid */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 lg:gap-0">
          {METHODOLOGY_STEPS.map((step, index) => (
            <React.Fragment key={step.number}>
              {/* Step Circle */}
              <div className="flex flex-col items-center w-full max-w-[250px]">
                <div className="relative mb-6">
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-[#3d418e] rounded-full flex items-center justify-center shadow-lg hover:scale-130 transition-transform duration-300">
                    {step.icon}
                  </div>
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 bg-cyan-500 rounded-full flex items-center justify-center border-4 border-slate-100">
                    <span className="text-white font-bold text-sm md:text-lg">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Step Title and Description */}
                <h3 className="text-xl md:text-2xl font-bold text-[#3d418e] mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-center text-xs md:text-sm leading-relaxed px-2">
                  {step.description}
                </p>
              </div>

              {/* Your Initial Arrow - Now Responsive */}
              {index < METHODOLOGY_STEPS.length - 1 && (
                <div className="flex justify-center items-center py-4 lg:py-0 lg:mt-12 lg:px-2">
                  <div className="text-3xl md:text-4xl text-[#3d418e] font-bold transform rotate-90 lg:rotate-0 opacity-40 lg:opacity-100">
                    →
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}