import React from 'react'
import ColoredHeader from '@/components/ColoredHeader'
import ContactHero from '@/components/ContactHero'
import Footer from '@/components/Footer';
import ContactBody from '@/components/ContactBody';

const page = () => {
  return (
    <>
      <section className="relative w-full h-[40vh] bg-white overflow-hidden flex flex-col">
        <ColoredHeader />

          <div className="flex-1 flex items-center">
            <ContactHero />
          </div>
      </section>
      <div className="px-8 bg-white">
          <ContactBody />
      </div>
      <Footer />
      
    </>
  )
}

export default page
