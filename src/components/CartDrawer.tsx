'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity } = useCart()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/30 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-soft-petal-grey">
              <div className="flex items-center">
                <ShoppingBag size={20} className="mr-3 text-soft-petal-charcoal" />
                <h2 className="font-playfair text-xl text-soft-petal-charcoal">Your Bag</h2>
                <span className="ml-2 font-montserrat text-sm text-soft-petal-charcoal/60">
                  ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 -mr-2 text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-soft-petal-grey flex items-center justify-center">
                    <ShoppingBag size={32} className="text-soft-petal-pink" />
                  </div>
                  <p className="font-playfair text-lg text-soft-petal-charcoal mb-2">Your bag is empty</p>
                  <p className="font-montserrat text-sm text-soft-petal-charcoal/60 mb-6">
                    Discover our curated collection of timeless pieces
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-3 bg-soft-petal-charcoal text-white font-montserrat text-xs tracking-wider uppercase hover:bg-soft-petal-pink hover:text-soft-petal-charcoal transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.size}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex"
                    >
                      {/* Image */}
                      <div className="relative w-24 h-32 bg-soft-petal-grey flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 ml-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-playfair text-sm text-soft-petal-charcoal mb-1">
                            {item.name}
                          </h3>
                          <p className="font-montserrat text-xs text-soft-petal-charcoal/60 mb-2">
                            Size: {item.size}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity */}
                          <div className="flex items-center border border-soft-petal-grey">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="p-2 text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 font-montserrat text-sm text-soft-petal-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="p-2 text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="font-montserrat text-sm text-soft-petal-charcoal font-medium">
                            {item.price * item.quantity} MAD
                          </p>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="ml-2 p-1 text-soft-petal-charcoal/40 hover:text-soft-petal-pink transition-colors self-start"
                      >
                        <X size={18} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-soft-petal-grey bg-soft-petal-white">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-montserrat text-sm tracking-wider text-soft-petal-charcoal uppercase">
                    Subtotal
                  </span>
                  <span className="font-playfair text-xl text-soft-petal-charcoal">
                    {subtotal} MAD
                  </span>
                </div>
                <p className="font-montserrat text-xs text-soft-petal-charcoal/60 mb-4 text-center">
                  Shipping and taxes calculated at checkout
                </p>
                <button className="w-full py-4 bg-soft-petal-charcoal text-white font-montserrat text-xs tracking-wider uppercase hover:bg-soft-petal-pink hover:text-soft-petal-charcoal transition-colors">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3 mt-2 font-montserrat text-xs tracking-wider text-soft-petal-charcoal hover:text-soft-petal-pink transition-colors uppercase"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
