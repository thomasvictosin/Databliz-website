"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function ColoredHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/our-solution" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-20 py-6 backdrop-blur-xl bg-transparent border-b border-white/15 shadow-none max-lg:px-6 max-lg:py-4 relative">
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <img
          src="/images/Colored-databliz-logo.png"
          alt="Databliz Logo"
          className="h-8 w-auto max-lg:h-6"
        />
      </Link>

      {/* Desktop Menu */}
      <ul className="flex items-center gap-10 list-none max-lg:hidden">
        {navLinks.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="text-[#3E4095] text-sm transition-colors duration-200 hover:text-white"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA Button (Desktop only) */}
      <button className="bg-[#3E4095] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-blue-600 hover:-translate-y-0.5 max-lg:hidden">
        Book Free Consultation
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="hidden max-lg:block text-[#3E4095] ml-4"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg border-b border-white/20 max-lg:block">
          <ul className="flex flex-col gap-4 p-6">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-white/80 text-sm transition-colors duration-200 hover:text-white"
                  onClick={() => setIsOpen(false)} // closes menu on click
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile CTA */}
          <div className="px-6 pb-6">
            <button className="w-full bg-white text-[#0a1560] py-3 rounded-full text-sm font-semibold">
              Book Free Consultation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}