import HeroVisual from "../components/HeroVisual";
import Header from "../components/Header";
import ModernOperations from "../components/ModernOperations";
import Process from "../components/Process";
import Methodology from "../components/Methodology";
import Consultation from "../components/Consultation";
import Footer from "../components/Footer";


export default function HeroSection() {
  return (
    <>
      <section 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col"
        style={{
          backgroundImage: 'url(/images/Hero-bgg.png)',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* network dot grid overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
        <Header />

        {/* Hero body */}
        <div className="relative z-10 flex-1 grid grid-cols-2 items-center px-10 pt-60 gap-16 max-lg:grid-cols-1 max-lg:px-6 max-lg:pt-16 max-lg:text-center">
          {/* Left column */}
          <div className="flex flex-col gap-6 pb-60 max-lg:pb-0 max-lg:items-center">
            <h1 className="text-6xl max-lg:text-3xl font-black leading-tight text-white -tracking-tight">
              Engineer Operational<br />Excellence
            </h1>
            <p className="text-base max-lg:text-sm leading-relaxed text-white/65 max-w-md">
              Databliz transforms complex business processes into high-performing
              operational systems through process intelligence, intelligent
              automation, and simulation-driven optimisation.
            </p>
            <button className="w-fit bg-white/95 text-[#0a1560] px-7 py-3.5 rounded-full text-sm max-lg:text-xs font-semibold transition-all duration-200 hover:bg-white hover:-translate-y-0.5">
              Book Free Consultation
            </button>
          </div>

          {/* Right column — the animated component */}
          <div className="min-h-96 max-lg:min-h-96">
            <HeroVisual />
          </div>
        </div>
      </section>

      <ModernOperations />

      <Process />

      <Methodology />

      <Consultation />

      <Footer />
    </>
  );
}