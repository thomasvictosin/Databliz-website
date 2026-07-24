import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#3E4095] to-[#5B63CC] text-white px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Follow Blog */}
        <div className="mb-12 pb-8 border-b border-white/20">
          <div className="flex items-center gap-4">
            <a href="/blog" className="text-xl font-semibold transition hover:opacity-75">
              Follow Our <span className="underline">Blog</span>
            </a>
            <div className="flex gap-4">
              <a href="#" className="hover:opacity-75 transition"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="hover:opacity-75 transition"><i className="fab fa-circle"></i></a>
              <a href="#" className="hover:opacity-75 transition"><i className="fab fa-x-twitter"></i></a>
              <a href="#" className="hover:opacity-75 transition"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Main Grid - Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:opacity-75 transition">Home</a></li>
              <li><a href="/about" className="hover:opacity-75 transition">About Us</a></li>
              <li><a href="/industries" className="hover:opacity-75 transition">Industries</a></li>
              <li><a href="/our-solution" className="hover:opacity-75 transition">Solutions</a></li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-bold text-lg mb-6">Industries</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:opacity-75 transition">Manufacturing</a></li>
              <li><a href="#" className="hover:opacity-75 transition">Retail</a></li>
              <li><a href="#" className="hover:opacity-75 transition">Health Care</a></li>
              <li><a href="#" className="hover:opacity-75 transition">Airline & Aviation</a></li>
              <li><a href="#" className="hover:opacity-75 transition">Humanitarian & Non-Profit</a></li>
              <li><a href="#" className="hover:opacity-75 transition">Emergency Response</a></li>
              <li><a href="#" className="hover:opacity-75 transition">Logistics & Transportation</a></li>
            </ul>
          </div>

          {/* Case Studies */}
          <div>
            <h3 className="font-bold text-lg mb-6">Case Studies</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:opacity-75 transition">Retail</a></li>
              <li><a href="#" className="hover:opacity-75 transition">Humanitarian</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:opacity-75 transition">FAQ</a></li>
              <li><a href="#" className="hover:opacity-75 transition">Help</a></li>
              <li><a href="#" className="hover:opacity-75 transition">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* ICO Logo */}
          <div className="items-center justify-start">
            <div className="text-center">
              <img src="/images/ico-header-logo.svg" alt="ico Logo" className="h-40 w-auto max-lg:h-42" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
