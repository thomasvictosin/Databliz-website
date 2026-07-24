"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";

const steps = [
  { id: '01', title: 'Reveal hidden inefficiencies', desc: 'Map and baseline your operational systems.', color: 'bg-[#2B70B8]', icon: '🔍', side: 'left' },
  { id: '02', title: 'Remove operational bottlenecks', desc: 'Identify automation opportunities and bottlenecks.', color: 'bg-[#3E3B92]', icon: '📋', side: 'right' },
  { id: '03', title: 'Test improvement scenarios', desc: 'Model optimised workflows using simulation.', color: 'bg-[#7D7DA3]', icon: '📐', side: 'left' },
  { id: '04', title: 'Enhance workflow performance', desc: 'implement intelligent automation and improvements.', color: 'bg-[#007FFF]', icon: '🚀', side: 'right' },
];

const stepPositionsDesktop = [
  { tile: "top-[8%] left-[10%]", badge: "top-[10%] left-[71.5%]" },
  { tile: "top-[31%] left-[30%]", badge: "top-[32%] left-[10%]" },
  { tile: "top-[54%] left-[9%]", badge: "top-[58%] left-[71.5%]" },
  { tile: "top-[77.5%] left-[28%]", badge: "top-[80%] left-[6%]" },
];
const stepPositionsTablet = [
  { tile: "top-[8%] left-[15%]", badge: "top-[10%] left-[75%]" },
  { tile: "top-[30%] left-[32%]", badge: "top-[32%] left-[17%]" },
  { tile: "top-[54%] left-[17%]", badge: "top-[56%] left-[75%]" },
  { tile: "top-[77%] left-[30%]", badge: "top-[80%] left-[14%]" },
];
const stepPositionsMobile = [
  { tile: "top-[0%] left-[5%]", badge: "top-[3%] left-[78%]" },
  { tile: "top-[22%] left-[25%]", badge: "top-[24%] left-[6%]" },
  { tile: "top-[45%] left-[5%]", badge: "top-[47%] left-[78%]" },
  { tile: "top-[68%] left-[25%]", badge: "top-[70%] left-[6%]" },
];

function useStepPositions() {
  const [positions, setPositions] = useState(stepPositionsDesktop);
  useEffect(() => {
    function updatePositions() {
      if (window.innerWidth < 640) {
        setPositions(stepPositionsMobile);
      } else if (window.innerWidth < 1024) {
        setPositions(stepPositionsTablet);
      } else {
        setPositions(stepPositionsDesktop);
      }
    }
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);
  return positions;
}

export default function SerpentineFinal() {
  const stepPositions = useStepPositions();

  return (
    <div className="relative w-full bg-white mx-auto pt-24 pb-0 min-h-[800px] flex flex-col items-center">
      {/* Heading Section */}
      <div className="z-20 w-full text-center mb-20 px-4">
        {/* Top Pill Badge */}
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-white bg-[#3d418e] px-4 py-1.5 rounded-full mb-3">
          Impacts
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          How We Create Impact
        </h2>
        <p className="text-sm md:text-base sm:text-sm lg:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Through process intelligence, simulation modelling, and intelligent automation, we:
        </p>
      </div>

      {/* Dashed line background */}
      <div className="absolute top-[100px] sm:top-[2400px] flex justify-center pointer-events-none select-none z-0">
        <img
          src="/images/curved-dashed-line.svg"
          alt="Curved dashed line"
          className="h-[900px] w-auto max-w-[420px] md:h-[1000px] md:max-w-[400px] lg:h-[1100px] lg:max-w-[600px]"
          draggable="false"
        />
      </div>
      {/* Steps and Badges */}
      <div className="relative w-full max-w-[600px] h-[1000px] z-10 overflow-hidden px-2 sm:px-0">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            {/* Step Tile */}
            <div
              className={`absolute ${stepPositions[idx].tile} flex items-center shadow-2xl rounded-full px-4 py-6 max-w-[320px] min-h-[110px] ${step.color}`}
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