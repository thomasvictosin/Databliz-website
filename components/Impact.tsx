import React from 'react';

const steps = [
  { id: '01', title: 'Reveal hidden inefficiencies', desc: 'Map and baseline your operational systems.', color: 'bg-[#2B70B8]', icon: '🔍', side: 'left' },
  { id: '02', title: 'Remove operational bottlenecks', desc: 'Identify automation opportunities and bottlenecks.', color: 'bg-[#3E3B92]', icon: '📋', side: 'right' },
  { id: '03', title: 'Test improvement scenarios', desc: 'Model optimised workflows using simulation.', color: 'bg-[#7D7DA3]', icon: '📐', side: 'left' },
  { id: '04', title: 'Enhance workflow performance', desc: 'implement intelligent automation and improvements.', color: 'bg-[#007FFF]', icon: '🚀', side: 'right' },
];

export default function SerpentineFinal() {
  return (
    <div className="relative w-full bg-white mx-auto py-24 min-h-[1000px]">
      
      {/* Heading Section */}
      <div className="text-center mb-20 px-6">
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

      {/* The Central "S" Path */}
      <div className="absolute inset-0 flex justify-center pt-60">
        <svg width="400" height="100%" viewBox="0 0 400 1000" fill="none" className="h-full">
          {/* Main Dashed Path */}
          <path
            d="M200,20 C200,100 350,120 350,220 C350,320 50,330 50,430 C50,530 350,540 350,640 C350,740 50,750 50,850 C50,950 200,980 200,1000"
            stroke="#1e293b"
            strokeWidth="5"
            strokeDasharray="8 10"
            className="opacity-80"
          />
          
          {/* Node Rings (Placed precisely at the inflection points) */}
          <circle cx="350" cy="200" r="9" fill="none" stroke="#2B70B8 opacity-0" strokeWidth="3" />
          <circle cx="50" cy="420" r="9" fill="none" stroke="#3E3B92 opacity-0" strokeWidth="3" />
          <circle cx="350" cy="630" r="9" fill="none" stroke="#7D7DA3 opacity-0" strokeWidth="3" />
          <circle cx="50" cy="850" r="9" fill="none" stroke="#007FFF opacity-0" strokeWidth="3" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-y-26 pt-25">
        {steps.map((step, idx) => (
          <div 
            key={step.id} 
            className={`flex items-center w-full justify-center gap-8 ${step.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Card */}
            <div className="flex-shrink-0">
              <div className={`relative flex items-center ${step.color} text-white p-6 pr-14 rounded-full shadow-2xl max-w-[320px] min-h-[110px]`}>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                </div>
                {/* White Icon Circle */}
                <div className="absolute right-2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-xl">{step.icon}</span>
                </div>
              </div>
            </div>

            {/* Number Badge */}
            <div className="flex-shrink-0">
              <div className={`${step.color} text-white rounded-full w-20 h-20 flex items-center justify-center font-black text-3xl shadow-2xl border-4 border-white`}>
                {step.id}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}