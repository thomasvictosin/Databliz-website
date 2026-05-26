import React from 'react';
import Image from "next/image";

const steps = [
  { id: '01', title: 'Reveal hidden inefficiencies', desc: 'Map and baseline your operational systems.', color: 'bg-[#2B70B8]', icon: '🔍', side: 'left' },
  { id: '02', title: 'Remove operational bottlenecks', desc: 'Identify automation opportunities and bottlenecks.', color: 'bg-[#3E3B92]', icon: '📋', side: 'right' },
  { id: '03', title: 'Test improvement scenarios', desc: 'Model optimised workflows using simulation.', color: 'bg-[#7D7DA3]', icon: '📐', side: 'left' },
  { id: '04', title: 'Enhance workflow performance', desc: 'implement intelligent automation and improvements.', color: 'bg-[#007FFF]', icon: '🚀', side: 'right' },
];

const stepPositions = [
  // These values are estimates and may need fine-tuning for your SVG
  { tile: "top-[8%] left-[10%]", badge: "top-[10%] left-[71.5%]" },
  { tile: "top-[31%] left-[30%]", badge: "top-[32%] left-[10%]" },
  { tile: "top-[54%] left-[9%]", badge: "top-[58%] left-[71.5%]" },
  { tile: "top-[77.5%] left-[28%]", badge: "top-[80%] left-[6%]" },
];

export default function SerpentineFinal() {
  return (
    <div className="relative w-full bg-white mx-auto py-24 min-h-[1000px] flex flex-col items-center">
      {/* Heading Section */}
      <div className="z-20 w-full text-center mb-20 px-4">
        {/* Top Pill Badge */}
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white bg-[#3d418e] px-4 py-1.5 rounded-full mb-3">
          Impacts
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          How We Create Impact
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Through process intelligence, simulation modelling, and intelligent automation, we:
        </p>
      </div>
      {/* Dashed Line Background */}
      <div className="absolute top-65 flex justify-center pointer-events-none select-none z-0">
        <img 
          src="/images/curved-dashed-line.svg" 
          alt="Curved dashed line" 
          className="h-[900px] w-auto max-w-[420px] md:h-[1000px] md:max-w-[500px] lg:h-[1100px] lg:max-w-[600px]"
          draggable="false"
        />
      </div>
      {/* Steps and Badges */}
      <div className="relative w-[600px] h-[1000px] z-10">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            {/* Step Tile */}
            <div
              className={`absolute ${stepPositions[idx].tile} flex items-center shadow-2xl rounded-full px-8 py-6 max-w-[320px] min-h-[110px] ${step.color}`}
              style={{boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)"}}
            >
              <div className="flex flex-col">
                <h3 className="text-white text-xs md:text-sm font-bold mb-2">{step.title}</h3>
              </div>
              <div className="ml-6 flex items-center justify-center">
                <span className="bg-white rounded-full shadow-xl w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl">{step.icon}</span>
                </span>
              </div>
            </div>
            {/* Number Badge */}
            <div
              className={`absolute ${stepPositions[idx].badge} flex items-center justify-center`}
            >
              <span className="bg-white rounded-full shadow-lg p-1">
                <span className={`${step.color} text-white rounded-full w-14 h-14 flex items-center justify-center font-black text-xl shadow-2xl border-4 border-white`}>{step.id}</span>
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}