"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import PaymentPopup from "./PaymentPopup";
import Image from "next/image";
import { useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartItemCount, clearCart } = useCart();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-neutral-900 border-l border-neutral-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-700">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                  <p className="text-sm text-neutral-400">{getCartItemCount()} items</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-neutral-600 mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-400 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-neutral-500">Add some products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.variantId}-${item.sizeId}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-neutral-800/50 rounded-xl p-4 space-y-3"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm truncate">{item.name}</h4>
                          {item.variant && (
                            <p className="text-xs text-neutral-400">Color: {item.variant}</p>
                          )}
                          {item.size && (
                            <p className="text-xs text-neutral-400">Size: {item.size}</p>
                          )}
                          <p className="text-blue-400 font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id, item.variantId)}
                          className="p-1 hover:bg-neutral-700 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </motion.button>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variantId)}
                            className="p-1 hover:bg-neutral-700 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4 text-neutral-400" />
                          </motion.button>
                          <span className="px-3 py-1 bg-neutral-700 rounded text-sm font-medium text-white min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variantId)}
                            className="p-1 hover:bg-neutral-700 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4 text-neutral-400" />
                          </motion.button>
                        </div>
                        <p className="text-white font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Clear Cart Button */}
                  {cart.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearCart}
                      className="w-full py-2 text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    >
                      Clear Cart
                    </motion.button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-neutral-700 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Tax</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-neutral-700 pt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-green-400">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    Checkout
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-3 border border-neutral-600 text-neutral-300 rounded-lg font-medium hover:bg-neutral-800 transition-all"
                  >
                    Continue Shopping
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
      
      {/* Payment Popup */}
      <PaymentPopup
        isOpen={isPaymentOpen}
        onClose={handlePaymentClose}
        amount={total}
        items={cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))}
      />
    </AnimatePresence>
  );
}