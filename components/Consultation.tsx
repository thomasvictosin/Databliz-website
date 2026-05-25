'use client';

export default function Consultation() {
  return (
    <section className="relative w-full py-24 bg-[#E6E7FF] overflow-hidden">
      {/* Background grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col gap-8 lg:text-left text-center lg:items-start items-center">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-[#3E4095] -tracking-tight">
              From Complexity to Clarity
            </h2>
            
            <div className="flex flex-col gap-4">
              <p className="text-lg font-semibold text-[#3E4095]/90">
                Operational excellence is not accidental. It is designed.
              </p>
              <p className="text-base leading-relaxed text-[#3E4095]/70 max-w-lg">
                Databliz equips organisations with the intelligence and structure required to operate faster, leaner, and with greater precision
              </p>
            </div>

            <button className="w-fit flex items-center gap-3 bg-white text-[#0a1560] px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:bg-white/95 hover:-translate-y-1 group">
              <span>Book Free Consultation</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1 lg:block hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:flex justify-center lg:justify-end">
            <img 
              src="/images/curly-arrow.png" 
              alt="Curly arrow decoration"
              className="w-full max-w-sm lg:max-w-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}