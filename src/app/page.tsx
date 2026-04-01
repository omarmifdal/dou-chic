'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import FilterSidebar from '@/components/FilterSidebar'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured Collection Section */}
      <section className="py-16 lg:py-24 bg-soft-petal-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <span className="inline-block font-montserrat text-xs tracking-[0.3em] text-soft-petal-pink uppercase mb-4">
              Curated Selection
            </span>
            <h2 className="font-playfair text-3xl lg:text-4xl text-soft-petal-charcoal mb-4">
              The Spring Lookbook
            </h2>
            <p className="font-montserrat text-sm text-soft-petal-charcoal/70 max-w-xl mx-auto leading-relaxed">
              A harmonious collection of ethereal silhouettes and timeless essentials,
              designed for the woman who moves through the world with quiet confidence.
            </p>
          </motion.div>

          {/* Filter & Products */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <FilterSidebar />
          </div>
        </div>
      </section>

      {/* Brand Story Banner */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-soft-petal-pink/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(243,207,207,0.4),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block font-montserrat text-xs tracking-[0.3em] text-soft-petal-pink uppercase mb-6"
            >
              Our Philosophy
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-playfair text-3xl lg:text-5xl text-soft-petal-charcoal leading-tight mb-6"
            >
              Sustainable Luxury,<br />
              <span className="italic">Consciously Crafted</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-montserrat text-base text-soft-petal-charcoal/80 leading-relaxed mb-8"
            >
              Every piece in our collection is thoughtfully designed with respect for both
              people and planet. We partner with artisan workshops across Europe, using only
              responsibly sourced materials that stand the test of time.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center font-montserrat text-xs tracking-wider uppercase text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors group"
            >
              <span>Discover Our Story</span>
              <svg
                className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-20 bg-soft-petal-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-playfair text-2xl lg:text-3xl text-white mb-4">
              Join the Dou Circle
            </h2>
            <p className="font-montserrat text-sm text-white/70 mb-8">
              Be the first to discover new arrivals, exclusive offers, and the stories behind our collection.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 font-montserrat text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-soft-petal-pink transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-soft-petal-pink text-soft-petal-charcoal font-montserrat text-xs tracking-wider uppercase hover:bg-white transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="font-montserrat text-xs text-white/50 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-soft-petal-white py-12 lg:py-16 border-t border-soft-petal-grey">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <h3 className="font-playfair text-xl text-soft-petal-charcoal mb-4">Dou Chic</h3>
              <p className="font-montserrat text-xs text-soft-petal-charcoal/60 leading-relaxed">
                Curated luxury fashion for the modern woman. Ethically crafted, timelessly designed.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase mb-4">Shop</h4>
              <ul className="space-y-2">
                {['New Arrivals', 'Ready-to-Wear', 'Accessories', 'Sale'].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-montserrat text-xs text-soft-petal-charcoal/70 hover:text-soft-petal-pink transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase mb-4">About</h4>
              <ul className="space-y-2">
                {['Our Story', 'Sustainability', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-montserrat text-xs text-soft-petal-charcoal/70 hover:text-soft-petal-pink transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase mb-4">Help</h4>
              <ul className="space-y-2">
                {['Contact Us', 'Shipping', 'Returns', 'Size Guide'].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-montserrat text-xs text-soft-petal-charcoal/70 hover:text-soft-petal-pink transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-soft-petal-grey flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-montserrat text-xs text-soft-petal-charcoal/60">
              © 2026 Dou Chic. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <a key={item} href="#" className="font-montserrat text-xs text-soft-petal-charcoal/60 hover:text-soft-petal-pink transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
