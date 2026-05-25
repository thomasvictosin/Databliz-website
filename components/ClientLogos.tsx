"use client";

import Image from "next/image";

const CLIENT_LOGOS = [
  { src: "/images/Swiftcare2x.png", alt: "Swiftcare" },
  { src: "/images/Sellmart2x.png", alt: "Sellmart" },
  { src: "/images/Mozisha2x.png", alt: "Mozisha" },
  { src: "/images/Arctekton2x.png", alt: "Arctekton" },
  {src: "/images/Blazer2x.png", alt: "Databliz" },
  { src: "/images/Spicynovel2x.png", alt: "Spicynovel" },
  { src: "/images/Tastewiz2x.png", alt: "Tastewiz" },
  { src: "/images/Tirob2x.png", alt: "Tirob" },
  { src: "/images/JMM2x.png", alt: "JMM" },
] as const;

function LogoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="client-logo-card relative mx-3 h-[60px] w-[180px] flex-shrink-0 sm:h-[80px] sm:w-[220px] lg:h-24 lg:w-[280px]">
      <Image src={src} alt={alt} fill sizes="280px" className="object-contain p-1" />
    </div>
  );
}

export default function ClientLogos() {
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section
      className="bg-white py-12 md:py-16"
      aria-label="Clients we have worked with"
    >
      <div className="client-logos-marquee relative overflow-hidden">
        <div className="client-logos-marquee__track flex w-max items-center">
          {track.map((logo, index) => (
            <LogoCard key={`${logo.alt}-${index}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
