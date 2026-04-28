"use client";

import React from "react";

export default function AboutHero() {
  return (
    <div className="w-full px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-left bg-[#3E4095] px-6px py-2 rounded-lg px-10 py-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            About Databliz
          </h1>
          <p className="text-blue-100/80 text-lg">
            Designing the Future of Intelligent Operations
          </p>
        </div>
      
      </div>
    </div>
  );
}