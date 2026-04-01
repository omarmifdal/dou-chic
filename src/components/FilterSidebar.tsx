'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, Check } from 'lucide-react'
import { products, categories } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import ProductCard from './ProductCard'

const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under 200 MAD', min: 0, max: 200 },
  { label: '200 - 300 MAD', min: 200, max: 300 },
  { label: '300 - 400 MAD', min: 300, max: 400 },
  { label: 'Over 400 MAD', min: 400, max: Infinity },
]

const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = ['All', 'White', 'Blush', 'Dusty Pink', 'Rose', 'Cream', 'Ivory', 'Charcoal']

export default function FilterSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [activePrice, setActivePrice] = useState(priceRanges[0])
  const [activeSize, setActiveSize] = useState<string | null>(null)
  const [activeColor, setActiveColor] = useState('All')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const { addToCart } = useCart()

  useEffect(() => {
    let result = products

    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory)
    }

    result = result.filter(p => p.price >= activePrice.min && p.price < activePrice.max)

    if (activeSize) {
      result = result.filter(p => p.sizes.includes(activeSize))
    }

    if (activeColor !== 'All') {
      result = result.filter(p => p.colors.some(c => c.toLowerCase().includes(activeColor.toLowerCase())))
    }

    setFilteredProducts(result)
  }, [activeCategory, activePrice, activeSize, activeColor])

  const handleAddAllToCart = () => {
    filteredProducts.forEach(product => {
      if (!product.soldOut && product.sizes.length > 0) {
        addToCart(product, product.sizes[0])
      }
    })
  }

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 bg-soft-petal-charcoal text-white font-montserrat text-xs tracking-wider uppercase shadow-xl flex items-center space-x-2 hover:bg-soft-petal-pink hover:text-soft-petal-charcoal transition-colors"
      >
        <span>Filter</span>
        <ChevronDown size={16} />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/30 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={mobileOpen ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-80 lg:w-64 bg-white lg:bg-transparent z-50 lg:z-auto p-6 lg:p-0 border-r lg:border-0 border-soft-petal-grey overflow-y-auto lg:overflow-visible transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h2 className="font-playfair text-xl text-soft-petal-charcoal">Filters</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase mb-4">
            Category
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`w-full text-left font-montserrat text-sm py-2 transition-colors ${
                  activeCategory === category
                    ? 'text-soft-petal-pink font-medium'
                    : 'text-soft-petal-charcoal/70 hover:text-soft-petal-pink'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase mb-4">
            Price
          </h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => setActivePrice(range)}
                className={`w-full text-left font-montserrat text-sm py-2 transition-colors flex items-center ${
                  activePrice.label === range.label
                    ? 'text-soft-petal-pink font-medium'
                    : 'text-soft-petal-charcoal/70 hover:text-soft-petal-pink'
                }`}
              >
                {activePrice.label === range.label && (
                  <Check size={14} className="mr-2 text-soft-petal-pink" />
                )}
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-8">
          <h3 className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase mb-4">
            Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setActiveSize(activeSize === size ? null : size)}
                className={`w-10 h-10 font-montserrat text-xs border transition-all ${
                  activeSize === size
                    ? 'border-soft-petal-pink bg-soft-petal-pink text-white'
                    : 'border-soft-petal-grey text-soft-petal-charcoal hover:border-soft-petal-pink'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-8">
          <h3 className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase mb-4">
            Color
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setActiveColor(color)}
                className={`px-3 py-2 font-montserrat text-xs border transition-all ${
                  activeColor === color
                    ? 'border-soft-petal-pink bg-soft-petal-pink text-white'
                    : 'border-soft-petal-grey text-soft-petal-charcoal hover:border-soft-petal-pink'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(activeCategory !== 'All' || activePrice.label !== 'All Prices' || activeSize || activeColor !== 'All') && (
          <button
            onClick={() => {
              setActiveCategory('All')
              setActivePrice(priceRanges[0])
              setActiveSize(null)
              setActiveColor('All')
            }}
            className="w-full py-3 font-montserrat text-xs tracking-wider text-soft-petal-charcoal border border-soft-petal-grey hover:border-soft-petal-pink hover:text-soft-petal-pink transition-colors uppercase"
          >
            Clear All Filters
          </button>
        )}

        {/* Add All to Cart */}
        {filteredProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="hidden lg:block w-full mt-6 py-3 bg-soft-petal-pink text-soft-petal-charcoal font-montserrat text-xs tracking-wider uppercase hover:bg-soft-petal-charcoal hover:text-white transition-colors"
          >
            Add All to Cart ({filteredProducts.length})
          </button>
        )}
      </motion.aside>

      {/* Product Grid */}
      <div className="flex-1">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-montserrat text-sm text-soft-petal-charcoal/70">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
          <select className="font-montserrat text-sm bg-transparent border-b border-soft-petal-grey text-soft-petal-charcoal focus:outline-none focus:border-soft-petal-pink pb-1">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-playfair text-xl text-soft-petal-charcoal mb-2">No pieces found</p>
            <p className="font-montserrat text-sm text-soft-petal-charcoal/60">
              Try adjusting your filters to discover more
            </p>
          </div>
        )}
      </div>
    </>
  )
}
