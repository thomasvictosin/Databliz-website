import type { Metadata } from 'next';
import React from 'react'
import ColoredHeader from '@/components/ColoredHeader'
import SolutionsHero from '@/components/SolutionsHero'
import Solution from '@/components/Solution'
import Footer from '@/components/Footer';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://databliz.com';

export const metadata: Metadata = {
  title: 'Our Solution | Business Process Automation Platform',
  description: 'Explore Databliz\'s end-to-end business process automation solution. From mapping to simulation to deployment, we optimize your workflows.',
  openGraph: {
    title: 'Our Solution',
    description: 'End-to-end business process automation platform.',
    url: `${SITE_URL}/our-solution`,
    images: [{ url: `${SITE_URL}/images/our-solutions-background.png`, width: 1200, height: 630, alt: 'Databliz Solution' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Solution',
    description: 'End-to-end business process automation platform.',
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
              <SolutionsHero />
          </div>
      </section>
    
        <Solution />   

        <Footer />
      
    </>
  )
}

export default page
