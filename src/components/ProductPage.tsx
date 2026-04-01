'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Heart, ShoppingBag, ChevronRight } from 'lucide-react'
import { Product, useCart } from '@/lib/cart-context'
import { products } from '@/lib/products'

interface ProductPageProps {
  product: Product
}

const sizeGuide = {
  measurements: ['Bust', 'Waist', 'Hip'],
  sizes: [
    { name: 'XS', bust: 32, waist: 24, hip: 34 },
    { name: 'S', bust: 34, waist: 26, hip: 36 },
    { name: 'M', bust: 36, waist: 28, hip: 38 },
    { name: 'L', bust: 38, waist: 30, hip: 40 },
    { name: 'XL', bust: 40, waist: 32, hip: 42 },
  ],
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showAddedMessage, setShowAddedMessage] = useState(false)
  const { addToCart, wishlist, toggleWishlist } = useCart()

  const isWishlisted = wishlist.includes(product.id)
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAddToCart = () => {
    if (!selectedSize) return
    addToCart(product, selectedSize)
    setShowAddedMessage(true)
    setTimeout(() => setShowAddedMessage(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center font-montserrat text-xs text-soft-petal-charcoal/60 mb-8">
          <span className="hover:text-soft-petal-pink cursor-pointer transition-colors">Home</span>
          <ChevronRight size={12} className="mx-2" />
          <span className="hover:text-soft-petal-pink cursor-pointer transition-colors">{product.category}</span>
          <ChevronRight size={12} className="mx-2" />
          <span className="text-soft-petal-charcoal">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-[3/4] lg:aspect-square bg-soft-petal-grey overflow-hidden zoom-container"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover zoom-image"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="flex mt-4 space-x-4">
              {[product.image, product.hoverImage].map((img, i) => (
                <button
                  key={i}
                  className={`relative w-20 h-20 border-2 transition-colors ${
                    i === 0 ? 'border-soft-petal-pink' : 'border-transparent hover:border-soft-petal-pink'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="font-montserrat text-xs tracking-[0.2em] text-soft-petal-pink uppercase mb-3">
              {product.category}
            </p>
            <h1 className="font-playfair text-3xl lg:text-4xl text-soft-petal-charcoal mb-4">
              {product.name}
            </h1>
            <p className="font-montserrat text-2xl text-soft-petal-charcoal mb-6">
              ${product.price}
            </p>

            {/* Description */}
            <p className="font-montserrat text-sm text-soft-petal-charcoal/70 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase mb-3">
                Color: <span className="font-normal">{product.colors[0]}</span>
              </p>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="px-3 py-1 font-montserrat text-xs border border-soft-petal-grey text-soft-petal-charcoal hover:border-soft-petal-pink transition-colors"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase">
                  Size: {selectedSize && <span className="font-normal">{selectedSize}</span>}
                </p>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="font-montserrat text-xs text-soft-petal-pink hover:text-soft-petal-charcoal transition-colors underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    disabled={product.soldOut}
                    className={`w-12 h-12 font-montserrat text-sm border transition-all ${
                      selectedSize === size
                        ? 'border-soft-petal-pink bg-soft-petal-pink text-white'
                        : product.soldOut
                        ? 'border-soft-petal-grey bg-soft-petal-grey/50 text-soft-petal-charcoal/40 cursor-not-allowed'
                        : 'border-soft-petal-grey text-soft-petal-charcoal hover:border-soft-petal-pink'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart / Wishlist */}
            <div className="flex space-x-4 mb-12">
              <button
                onClick={handleAddToCart}
                disabled={product.soldOut || !selectedSize}
                className={`flex-1 py-4 font-montserrat text-xs tracking-wider uppercase transition-all flex items-center justify-center ${
                  product.soldOut
                    ? 'bg-soft-petal-grey text-soft-petal-charcoal/40 cursor-not-allowed'
                    : !selectedSize
                    ? 'bg-soft-petal-charcoal/20 text-soft-petal-charcoal/60 cursor-not-allowed'
                    : showAddedMessage
                    ? 'bg-green-500 text-white'
                    : 'bg-soft-petal-charcoal text-white hover:bg-soft-petal-pink hover:text-soft-petal-charcoal'
                }`}
              >
                {product.soldOut ? 'Sold Out' : showAddedMessage ? 'Added to Bag' : 'Add to Bag'}
                {!product.soldOut && !showAddedMessage && <ShoppingBag size={16} className="ml-2" />}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 border transition-all ${
                  isWishlisted
                    ? 'border-soft-petal-pink bg-soft-petal-pink text-white'
                    : 'border-soft-petal-grey text-soft-petal-charcoal hover:border-soft-petal-pink hover:text-soft-petal-pink'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Product Details Accordion */}
            <div className="border-t border-soft-petal-grey">
              <details className="py-4">
                <summary className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase cursor-pointer flex items-center justify-between">
                  Details & Care
                  <Plus size={16} />
                </summary>
                <div className="mt-4 font-montserrat text-sm text-soft-petal-charcoal/70 leading-relaxed">
                  <ul className="space-y-2">
                    <li>• 100% Mulberry Silk</li>
                    <li>• Dry clean only</li>
                    <li>• Made in Italy</li>
                    <li>• Model is 5&apos;10&quot; wearing size S</li>
                  </ul>
                </div>
              </details>
              <details className="py-4 border-t border-soft-petal-grey">
                <summary className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase cursor-pointer flex items-center justify-between">
                  Shipping & Returns
                  <Plus size={16} />
                </summary>
                <div className="mt-4 font-montserrat text-sm text-soft-petal-charcoal/70 leading-relaxed">
                  <p>Complimentary shipping on orders over $300. Standard delivery 3-5 business days.</p>
                  <p className="mt-2">Returns accepted within 14 days of delivery. Items must be unworn with tags attached.</p>
                </div>
              </details>
            </div>
          </motion.div>
        </div>

        {/* Complete the Look */}
        <section className="mt-20 lg:mt-24">
          <h2 className="font-playfair text-2xl lg:text-3xl text-soft-petal-charcoal text-center mb-10">
            Complete the Look
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {relatedProducts.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-soft-petal-grey zoom-container">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover zoom-image"
                  />
                </div>
                <div className="pt-4">
                  <h3 className="font-playfair text-base text-soft-petal-charcoal group-hover:text-soft-petal-pink transition-colors">
                    {item.name}
                  </h3>
                  <p className="font-montserrat text-sm text-soft-petal-charcoal mt-1">
                    ${item.price}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="fixed inset-0 bg-black/30 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white p-8 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-playfair text-xl text-soft-petal-charcoal">Size Guide</h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="p-2 -mr-2 text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="font-montserrat text-sm text-soft-petal-charcoal/70 mb-6">
                All measurements are in inches. Use the guide to find your perfect fit.
              </p>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-soft-petal-grey">
                    <th className="py-3 font-montserrat text-xs tracking-wider text-soft-petal-charcoal text-left">Size</th>
                    {sizeGuide.measurements.map((m) => (
                      <th key={m} className="py-3 font-montserrat text-xs tracking-wider text-soft-petal-charcoal text-right">{m}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeGuide.sizes.map((size) => (
                    <tr key={size.name} className="border-b border-soft-petal-grey">
                      <td className="py-3 font-montserrat text-sm text-soft-petal-charcoal font-medium">{size.name}</td>
                      <td className="py-3 font-montserrat text-sm text-soft-petal-charcoal text-right">{size.bust}</td>
                      <td className="py-3 font-montserrat text-sm text-soft-petal-charcoal text-right">{size.waist}</td>
                      <td className="py-3 font-montserrat text-sm text-soft-petal-charcoal text-right">{size.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="mt-6 font-montserrat text-xs text-soft-petal-charcoal/60">
                Not sure of your size? Our stylists are here to help. Contact us at style@douchic.com
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
