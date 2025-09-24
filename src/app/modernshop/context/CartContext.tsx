"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  size?: string;
  variantId?: string;
  sizeId?: string;
  brand?: string;
  category?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (productId: number, variantId?: string) => void;
  updateQuantity: (productId: number, quantity: number, variantId?: string) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => cartItem.id === item.id && 
        cartItem.variantId === item.variantId && 
        cartItem.sizeId === item.sizeId
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        return prevCart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // New item, add to cart
        return [...prevCart, { ...item, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number, variantId?: string) => {
    setCart(prevCart => 
      prevCart.filter(item => 
        !(item.id === productId && item.variantId === variantId)
      )
    );
  };

  const updateQuantity = (productId: number, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      getCartItemCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}