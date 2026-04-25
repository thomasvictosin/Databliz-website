"use client";

import React from "react";

export default function WhyDatabliz() {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image Container */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/images/business-people-using-digital-tablet.jpg" 
              alt="business-people-using-digital-tablet" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="flex flex-col space-y-6">
          {/* Tag */}
          <div>
            <span className="bg-[#3d418e] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              About Us
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e1e1e]">
            Why Databliz Exists
          </h2>

          {/* Paragraphs */}
          <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
            <p>
              Modern organisations face increasing operational complexity. 
              Growth introduces interconnected systems, layered workflows, and 
              expanding data volumes.
            </p>
            <p>
              Without structured intelligence, complexity becomes inefficiency. 
              Databliz was founded to bring clarity and engineering discipline to 
              operational systems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}