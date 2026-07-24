"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import BookConsultationButton from "./BookConsultationButton";

export default function ColoredHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/our-solution" },
    { name: "Blog", href: "/blog" },
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
      <ul className="flex items-center gap-2 list-none max-lg:hidden">
        {navLinks.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-[#3176B1] text-white"
                    : "text-[#3E4095] hover:bg-[#3176B1] hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* CTA Button (Desktop only) */}
      <BookConsultationButton variant="dark" className="px-6 py-3 text-sm max-lg:hidden">
        Book Free Consultation
      </BookConsultationButton>

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
          <ul className="flex flex-col gap-2 p-6">
            {navLinks.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block rounded-full px-3 py-2 text-sm transition-colors duration-200 ${
                      isActive
                        ? "bg-[#3176B1] text-white"
                        : "text-white/80 hover:bg-[#3176B1] hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile CTA */}
          <div className="px-6 pb-6">
            <BookConsultationButton className="w-full py-3 text-sm" fullWidth>
              Book Free Consultation
            </BookConsultationButton>
          </div>
        </div>
      )}
    </nav>
  );
}