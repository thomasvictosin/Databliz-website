import React from 'react'
import ColoredHeader from '@/components/ColoredHeader'
import SolutionsHero from '@/components/SolutionsHero'
import Solution from '@/components/Solution'
import Footer from '@/components/Footer';

const page = () => {
  return (
    <>
      <section 
        className="relative w-full h-[40vh] bg-white overflow-hidden flex flex-col"
      >
        <ColoredHeader />
          <div className="flex-1 flex items-center">
              <SolutionsHero />
          </div>
      </section>
    
        <Solution />   

        <Footer />
      
    </>
  )
}

export default page
