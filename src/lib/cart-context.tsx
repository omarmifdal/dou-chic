'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Product {
  id: string
  name: string
  price: number
  image: string
  hoverImage: string
  sizes: string[]
  colors: string[]
  category: string
  soldOut?: boolean
  description: string
}

export interface CartItem extends Product {
  size: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, size: string) => void
  removeFromCart: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  wishlist: string[]
  toggleWishlist: (productId: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size)
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, size, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (productId: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.size === size)))
  }

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId && item.size === size ? { ...item, quantity } : item
      )
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    )
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartOpen, setCartOpen, wishlist, toggleWishlist }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
