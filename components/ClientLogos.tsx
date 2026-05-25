"use client";

import Image from "next/image";

const CLIENT_LOGOS = [
  { src: "/images/Swiftcare.png", alt: "Swiftcare" },
  { src: "/images/Sellmart.png", alt: "Sellmart" },
  { src: "/images/Mozisha.png", alt: "Mozisha" },
  { src: "/images/Arctekton.png", alt: "Arctekton" },
  { src: "/images/Spicynovel.png", alt: "Spicynovel" },
  { src: "/images/Tastewiz.png", alt: "Tastewiz" },
  { src: "/images/Tirob.png", alt: "Tirob" },
  { src: "/images/JMM.png", alt: "JMM" },
] as const;

function LogoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="client-logo-card relative mx-3 h-[50px] w-[150px] flex-shrink-0 sm:h-14 sm:w-[180px]">
      <Image src={src} alt={alt} fill sizes="180px" className="object-contain p-1" />
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
