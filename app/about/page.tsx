import React from 'react'
import Header from '@/components/Header'
import AboutHero from '@/components/AboutHero'
import WhyDatablizExists from '@/components/WhyDatablizExists'
import VisionMission from '@/components/VisionMision'
import Impact from '@/components/Impact'

const page = () => {
  return (
    <>
      <section 
        className="relative w-full h-[40vh] bg-cover bg-center bg-no-repeat overflow-hidden flex flex-col"
        style={{ backgroundImage: 'url(/images/About-hero-bg.png)' }}
      >
        <Header />
        <div className="flex-1 flex items-center">
          <AboutHero />
        </div>
      </section>

    
      <WhyDatablizExists />

      <VisionMission />

      <Impact /> 
    </>
  )
}

export default page
