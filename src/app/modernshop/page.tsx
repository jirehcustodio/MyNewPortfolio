"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts } from "./lib/productData";
import { useCart } from "./context/CartContext";
import CartSidebar from "./components/CartSidebar";
import ProductCard from "./components/ProductCard";
import { ShoppingCart, Search } from "lucide-react";

// Type definitions
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

const categories = ["All", "Electronics", "Clothing", "Accessories"];

export default function ModernShopDemo() {
  const { getCartItemCount } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Get all products from the expanded catalog
  const allProducts = getAllProducts();

  // Filter products based on category and search
  useEffect(() => {
    let filtered = allProducts;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, searchQuery, allProducts]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Calculate category counts
  const getCategoryCount = (category: string) => {
    if (category === "All") return allProducts.length;
    return allProducts.filter(product => product.category === category).length;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Back Button */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:border-blue-500/50 transition-all duration-200"
                >
                  ← Portfolio
                </motion.button>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              >
                🛒 ModernShop
              </motion.div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            </div>

            {/* Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 hover:bg-blue-500/20 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartItemCount() > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white"
                >
                  {getCartItemCount()}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Discover Modern
              </span>
              <br />
              <span className="text-white">Shopping Experience</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Explore our curated collection of premium products designed for the modern lifestyle. 
              Quality, style, and innovation in every item.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50 border border-neutral-700/50"
                }`}
              >
                {category} ({getCategoryCount(category)})
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Our Products ({filteredProducts.length} items)
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center items-center gap-2 mt-12"
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-neutral-300 hover:text-white hover:border-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/50"
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-neutral-300 hover:text-white hover:border-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </motion.div>
          )}

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold mb-2">No products found</h3>
              <p className="text-neutral-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer */}
      <footer className="bg-neutral-800/50 border-t border-neutral-700/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              🛒 ModernShop
            </h3>
            <p className="text-neutral-400">Your one-stop shop for modern lifestyle products</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-neutral-400">
                <div>Home</div>
                <div>Products</div>
                <div>About Us</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Customer Service</h4>
              <div className="space-y-2 text-neutral-400">
                <div>Help Center</div>
                <div>Returns</div>
                <div>Shipping Info</div>
                <div>Size Guide</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="space-y-2 text-neutral-400">
                <div>📧 support@modernshop.com</div>
                <div>📱 1-800-MODERN</div>
                <div>🌐 Social Media</div>
              </div>
            </div>
          </div>
          
          <div className="text-neutral-500 text-sm">
            © 2024 ModernShop Demo. Built by Jireh Custodio. This is a portfolio demonstration.
          </div>
        </div>
      </footer>
    </div>
  );
}