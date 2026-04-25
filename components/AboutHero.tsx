"use client";

import React from "react";

export default function AboutHero() {
  return (
    // Removed all height classes. It will fill the parent's flex-1 space.
    <div className="w-full px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            About Databliz
          </h1>
          <p className="text-blue-100/80 text-lg">
            Designing the Future of Intelligent Operations
          </p>
        </div>
        
        {/* The Graphic */}
        <div className="hidden lg:flex justify-end">
           <img src="/images/network-graphic.png" className="w-[300px]" alt="Network" />
        </div>
      </div>
    </div>
  );
}