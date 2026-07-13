import type { Metadata } from 'next';
import React from 'react'
import Header from '@/components/Header'
import AboutHero from '@/components/AboutHero'
import WhyDatablizExists from '@/components/WhyDatablizExists'
import VisionMission from '@/components/VisionMision'
import Impact from '@/components/Impact'
import Values from '@/components/Values'
import Footer from '@/components/Footer';
import ColoredHeader from '@/components/ColoredHeader'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://databliz.com';

export const metadata: Metadata = {
  title: 'About Databliz | Our Mission & Values',
  description: 'Discover Databliz\'s mission to revolutionize business process automation. Learn about our team, vision, and commitment to excellence.',
  openGraph: {
    title: 'About Databliz',
    description: 'Discover Databliz\'s mission to revolutionize business process automation.',
    url: `${SITE_URL}/about`,
    images: [{ url: `${SITE_URL}/images/About-hero-bg.png`, width: 1200, height: 630, alt: 'About Databliz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Databliz',
    description: 'Discover Databliz\'s mission to revolutionize business process automation.',
  },
};

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
