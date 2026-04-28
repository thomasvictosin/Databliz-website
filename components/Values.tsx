import Image from 'next/image';

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
}

const ValueCard = ({ icon, title, description }: ValueCardProps) => (
  <div className="relative backdrop-blur-[5px] p-8 flex flex-col items-start gap-4 min-h-[220px] rounded-[61px]"
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(62,64,149,0.1) 100%)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.3), inset 0 0 0 2px rgba(62,64,149,0.2), 10px 10px 20px rgba(0,0,0,0.2)',
    }}>
    <div aria-hidden="true" className="absolute inset-[-1px] rounded-[61px] p-[1px] pointer-events-none" />
       <div className="relative w-12 h-12">
         <Image src={icon} alt={title} fill className="object-contain" />
        </div>
    <div className="space-y-3">
      <h3 className="text-white text-xl font-bold leading-tight">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

export default function ValuesSection() {
  const values = [
    {
      icon: '/images/Precision.svg',
      title: 'Precision Over Assumption',
      description: 'Every recommendation is grounded in measurable insight.',
    },
    {
      icon: '/images/Rocket.svg',
      title: 'Impact First',
      description: 'Transformation must deliver tangible operational improvement.',
    },
    {
      icon: '/images/Structure.svg',
      title: 'Structured Innovation',
      description: 'Technology is applied strategically, not impulsively.',
    },
    {
      icon: '/images/Partnership.svg', // Match the filename provided
      title: 'Partnership',
      description: 'We build enduring relationships rooted in trust and accountability.',
    },
    {
      icon: '/images/Excellence.svg',
      title: 'Excellence as Standard',
      description: 'Operational excellence is engineered, not improvised.    ',
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden py-24 px-6">
      {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
          src="/images/Valuebackground.png"
          alt="Background Pattern"
          fill
          className="object-cover opacity-80" // Increased opacity for sharpness
            style={{ 
              imageRendering: 'crisp-edges', // Prevents browser softening
              filter: 'contrast(1.1) brightness(0.9)' // Sharpens the visual lines
           }}
         priority
        quality={100} // Ensures Next.js doesn't over-compress
          />
  
        </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-white text-[#3b3b98] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Values
          </span>
          <h2 className="text-white text-5xl font-bold mt-4">Our Values</h2>
        </div>

        {/* Custom Grid: 3 columns top, 2 columns centered bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {values.slice(0, 3).map((v, i) => (
            <ValueCard key={i} {...v} />
          ))}
          
          <div className="md:col-start-1 md:col-end-4 flex flex-col md:flex-row justify-center gap-16">
            {values.slice(3).map((v, i) => (
              <div key={i} className="md:w-1/3">
                <ValueCard {...v} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}