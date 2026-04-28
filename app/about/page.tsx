import React from 'react'
import Header from '@/components/Header'
import AboutHero from '@/components/AboutHero'
import WhyDatablizExists from '@/components/WhyDatablizExists'
import VisionMission from '@/components/VisionMision'
import Impact from '@/components/Impact'
import Values from '@/components/Values'
import Footer from '@/components/Footer';
import ColoredHeader from '@/components/ColoredHeader'

const page = () => {
  return (
    <>
      <section 
        className="relative w-full h-[40vh] bg-white overflow-hidden flex flex-col"
      >
        <ColoredHeader />
        <div className="flex-1 flex items-center">
          <AboutHero />
        </div>
      </section>

    
      <WhyDatablizExists />

      <VisionMission />

      <Impact /> 

      <Values />

      <Footer /> 
      
    </>
  )
}

export default page
