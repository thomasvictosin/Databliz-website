"use client";

import React from "react";

export default function ContactHero() {
  return (
    <div className="w-full px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 align-right items-center">
        <div className="text-left bg-[#3E4095] rounded-lg px-10 py-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
            Contact Us
          </h1>
          <p className="text-blue-100/80 text-md">
            Have a question or project in mind? Get in touch with our team and we'll be happy to discuss how we can help.
          </p>
        </div>
      </div>
    </div>
  );
}