"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-20 py-6 backdrop-blur-xl bg-white/3 shadow-lg max-lg:px-6 max-lg:py-4">
      <a href="/" className="flex items-center gap-2 text-white font-bold tracking-tight text-2xl max-lg:text-xl">
        <img src="/images/Databliz-logo.png" alt="Databliz Logo" className="h-8 w-auto max-lg:h-6" />
      </a>

      <ul className="flex items-center gap-10 list-none max-lg:hidden">
        {["Home","About","Services","Solutions","Contact Us"].map((item) => (
          <li key={item}>
            <a href="#" className="text-white/75 text-sm no-underline transition-colors duration-200 hover:text-white">
              {item}
            </a>
          </li>
        ))}
      </ul>

      <button className="bg-white text-[#0a1560] px-6 py-3 rounded-full text-sm font-semibold cursor-pointer whitespace-nowrap transition-all duration-200 hover:bg-blue-100 hover:-translate-y-0.5 max-lg:px-4 max-lg:py-2 max-lg:text-xs">
        Book Free Consultation
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden max-lg:block text-white ml-4"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-b border-white/20 hidden max-lg:block">
          <ul className="flex flex-col items-start gap-4 list-none p-6">
            {["Home","About","Services","Solutions","Contact Us"].map((item) => (
              <li key={item}>
                <a href="#" className="text-white/75 text-sm no-underline transition-colors duration-200 hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
