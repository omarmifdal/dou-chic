'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, ShoppingBag, Eye } from 'lucide-react'
import { Product, useCart } from '@/lib/cart-context'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [showSizes, setShowSizes] = useState(false)
  const { addToCart, wishlist, toggleWishlist } = useCart()
  const wishlistRef = useRef<HTMLButtonElement>(null)

  const isWishlisted = wishlist.includes(product.id)

  const handleWishlistClick = () => {
    toggleWishlist(product.id)
    if (!isWishlisted && wishlistRef.current) {
      wishlistRef.current.classList.add('wishlist-pulse')
      setTimeout(() => wishlistRef.current?.classList.remove('wishlist-pulse'), 400)
    }
  }

  const handleQuickAdd = () => {
    if (product.soldOut) return
    if (!selectedSize) {
      setShowSizes(true)
      return
    }
    addToCart(product, selectedSize)
    setShowSizes(false)
    setSelectedSize(null)
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    addToCart(product, size)
    setShowSizes(false)
    setSelectedSize(null)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setShowSizes(false)
      }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-soft-petal-grey zoom-container">
        <Image
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          fill
          className="object-cover zoom-image"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Sold Out Overlay */}
        {product.soldOut && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="font-montserrat text-xs sm:text-sm tracking-[0.2em] text-soft-petal-charcoal uppercase">
              Sold Out
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            ref={wishlistRef}
            onClick={handleWishlistClick}
            className={`p-2 sm:p-3 bg-white shadow-lg transition-all duration-200 hover:scale-110 ${isWishlisted ? 'text-soft-petal-pink' : 'text-soft-petal-charcoal'}`}
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 sm:p-3 bg-white shadow-lg text-soft-petal-charcoal transition-all duration-200 hover:scale-110 hover:text-soft-petal-pink">
            <Eye size={18} />
          </button>
        </div>

        {/* Quick Add Button */}
        {!product.soldOut && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-white/95 backdrop-blur-sm"
          >
            {showSizes ? (
              <div className="flex items-center justify-between">
                <span className="font-montserrat text-xs tracking-wider text-soft-petal-charcoal uppercase">Select Size</span>
                <div className="flex space-x-1">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-montserrat text-xs bg-soft-petal-grey text-soft-petal-charcoal hover:bg-soft-petal-pink transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                onClick={handleQuickAdd}
                className="w-full flex items-center justify-center py-2 sm:py-3 bg-soft-petal-charcoal text-white font-montserrat text-xs tracking-wider uppercase hover:bg-soft-petal-pink hover:text-soft-petal-charcoal transition-colors"
              >
                <ShoppingBag size={16} className="mr-2" />
                Quick Add
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Product Info */}
      <div className="pt-4 sm:pt-6 pb-2">
        <p className="font-montserrat text-xs tracking-wider text-soft-petal-pink uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-playfair text-base sm:text-lg text-soft-petal-charcoal mb-2 group-hover:text-soft-petal-pink transition-colors">
          {product.name}
        </h3>
        <p className="font-montserrat text-sm sm:text-base text-soft-petal-charcoal font-medium">
          ${product.price}
        </p>
      </div>

      {/* Color Swatches */}
      <div className="flex space-x-1">
        {product.colors.slice(0, 3).map((color, i) => (
          <span
            key={color}
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-soft-petal-grey"
            style={{
              backgroundColor:
                color === 'White' ? '#FFFFFF' :
                color === 'Blush' || color === 'Dusty Pink' || color === 'Dusty Rose' || color === 'Soft Pink' || color === 'Rose' || color === 'Pink' ? '#F3CFCF' :
                color === 'Cream' || color === 'Ivory' || color === 'Oatmeal' || color === 'Champagne' ? '#F5F5F5' :
                color === 'Charcoal' ? '#333333' : '#F3CFCF',
            }}
          />
        ))}
      </div>
    </motion.article>
  )
}
