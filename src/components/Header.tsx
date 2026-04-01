'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart, setCartOpen, wishlist } = useCart()

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-soft-petal-grey">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-1 lg:flex-none flex items-center gap-3 text-center lg:text-left">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
              <Image
                src="/tshirt-collage.jpeg"
                alt="Dou Chic Logo"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h1 className="font-playfair text-xl lg:text-2xl font-semibold tracking-wide text-soft-petal-charcoal">
              Dou Chic
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {['New Arrivals', 'Collections', 'Ready-to-Wear', 'Accessories', 'About'].map((item) => (
              <Link
                key={item}
                href="#"
                className="font-montserrat text-sm tracking-wider text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-soft-petal-pink transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <button className="p-2 text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors hidden lg:block">
              <Search size={20} />
            </button>
            <button className="p-2 text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-soft-petal-pink text-white text-xs rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-soft-petal-pink text-white text-xs rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-soft-petal-grey"
          >
            <nav className="px-4 py-6 space-y-4">
              {['New Arrivals', 'Collections', 'Ready-to-Wear', 'Accessories', 'About'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="block font-montserrat text-sm tracking-wider text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors py-2"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
