"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Eye, Star, Zap } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import PaymentPopup from "./PaymentPopup";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  brand: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      category: product.category
    }, 1);
  };

  const handleBuyNow = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentClose = () => {
    setIsPaymentOpen(false);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="bg-neutral-800/50 border border-neutral-700/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 group"
    >
      {/* Product Image */}
      <div className="aspect-square bg-gradient-to-br from-neutral-700 to-neutral-800 overflow-hidden relative">
        <Link href={`/modernshop/product/${product.id}`} className="block w-full h-full">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isInWishlist(product.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-black/30 text-white hover:bg-red-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </motion.button>
          
          <Link href={`/modernshop/product/${product.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-blue-500 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm text-blue-400 font-medium">{product.brand}</p>
          <Link href={`/modernshop/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-white line-clamp-2 hover:text-blue-400 transition-colors cursor-pointer">{product.name}</h3>
          </Link>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="text-xs text-neutral-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-green-400">${product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-neutral-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBuyNow}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Buy Now
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
          
          <Link href={`/modernshop/product/${product.id}`} className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 border border-neutral-600 text-neutral-300 rounded-lg font-medium hover:bg-neutral-700 hover:border-neutral-500 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
      
      {/* Payment Popup */}
      <PaymentPopup
        isOpen={isPaymentOpen}
        onClose={handlePaymentClose}
        amount={product.price}
        items={[{
          name: product.name,
          quantity: 1,
          price: product.price
        }]}
      />
    </motion.div>
  );
}