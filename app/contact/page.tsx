import type { Metadata } from 'next';
import React from 'react'
import ColoredHeader from '@/components/ColoredHeader'
import ContactHero from '@/components/ContactHero'
import Footer from '@/components/Footer';
import ContactBody from '@/components/ContactBody';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://databliz.com';

export const metadata: Metadata = {
  title: 'Contact Databliz | Free Consultation',
  description: 'Ready to optimize your business processes? Contact Databliz today for a free consultation. Let\'s transform your workflows together.',
  openGraph: {
    title: 'Contact Databliz',
    description: 'Get in touch with Databliz for a free consultation on process automation.',
    url: `${SITE_URL}/contact`,
    images: [{ url: `${SITE_URL}/images/Dbliz.png`, width: 1200, height: 630, alt: 'Contact Databliz' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Databliz',
    description: 'Get in touch with Databliz for a free consultation on process automation.',
  },
};

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
