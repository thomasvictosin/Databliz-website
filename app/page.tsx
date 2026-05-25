import HeroVisual from "../components/HeroVisual";
import ModernOperations from "../components/ModernOperations";
import Process from "../components/Process";
import Methodology from "../components/Methodology";
import ClientLogos from "../components/ClientLogos";
import Consultation from "../components/Consultation";
import Footer from "../components/Footer";
import Header from "../components/Header";


export default function HeroSection() {
  return (
    <>
      <section 
        className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col max-lg:overflow-hidden"
        style={{
          backgroundImage: 'url(/images/Hero-bgg.png)',
          backgroundAttachment: typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches ? 'scroll' : 'fixed'
        }}
      >
        
        <Header />

        {/* Hero body */}
        <div className="relative flex-1 grid grid-cols-2 items-center px-10 pt-40 gap-16 max-lg:grid-cols-1 max-lg:px-0 max-lg:pt-16 max-lg:text-center max-lg:min-h-0">
          {/* Left column */}
          <div className="flex flex-col gap-6 pb-60 max-lg:pb-0 max-lg:px-6 max-lg:items-center">
            <h1 className="text-6xl max-lg:text-3xl font-black leading-tight text-white -tracking-tight">
            Business Process Automation & <br />Optimisation for UK Enterprises

            </h1>
            <p className="text-base max-lg:text-sm leading-relaxed text-white/65 max-w-md">
            Databliz helps UK business owners eliminate manual processes, remove bottlenecks, and build operations that scale — without adding headcount.
            </p>
            <button className="w-fit bg-white/95 text-[#0a1560] px-7 py-3.5 rounded-full text-sm max-lg:text-xs font-semibold transition-all duration-200 hover:bg-white hover:-translate-y-0.5">
              Book Free Consultation
            </button>
          </div>

          {/* Right column — the animated component centered */}
          <div className="relative min-h-96 max-lg:flex-1 max-lg:min-h-[42vh] max-lg:w-full max-lg:mt-2 overflow-visible">
            <HeroVisual />
          </div>
        </div>
      </section>

      <ModernOperations />

      <Process />

      <Methodology />

      <ClientLogos />

      <Consultation />

      <Footer />
    </>
  );
}