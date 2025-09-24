'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaArrowLeft, 
  FaShoppingCart, 
  FaHeart, 
  FaStar, 
  FaFilter,
  FaSearch,
  FaCreditCard,
  FaTruck,
  FaShieldAlt
} from 'react-icons/fa';

// Mock product data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    image: "🎧",
    rating: 4.8,
    reviews: 1247,
    category: "Electronics",
    inStock: true,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "⌚",
    rating: 4.6,
    reviews: 892,
    category: "Wearables",
    inStock: true,
    badge: "New"
  },
  {
    id: 3,
    name: "Professional Laptop Stand",
    price: 79.99,
    originalPrice: 99.99,
    image: "💻",
    rating: 4.9,
    reviews: 543,
    category: "Accessories",
    inStock: true,
    badge: "Sale"
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    price: 49.99,
    originalPrice: 69.99,
    image: "🔌",
    rating: 4.4,
    reviews: 321,
    category: "Electronics",
    inStock: false,
    badge: ""
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 129.99,
    originalPrice: 159.99,
    image: "🔊",
    rating: 4.7,
    reviews: 678,
    category: "Electronics",
    inStock: true,
    badge: "Featured"
  },
  {
    id: 6,
    name: "Gaming Mouse",
    price: 89.99,
    originalPrice: 119.99,
    image: "🖱️",
    rating: 4.5,
    reviews: 456,
    category: "Gaming",
    inStock: true,
    badge: ""
  }
];

export default function EcommercePage() {
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Electronics", "Wearables", "Accessories", "Gaming"];

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <FaArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                TechStore Pro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaShoppingCart className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-gray-600 dark:text-gray-300">Live Demo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Welcome to TechStore Pro</h2>
            <p className="text-xl mb-6">Discover amazing tech products at unbeatable prices</p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <FaTruck className="mr-2" />
                Free Shipping
              </div>
              <div className="flex items-center">
                <FaShieldAlt className="mr-2" />
                Secure Payment
              </div>
              <div className="flex items-center">
                <FaCreditCard className="mr-2" />
                Easy Returns
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <button className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
              <FaFilter className="mr-2" />
              Filters
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-6xl">{product.image}</div>
                {product.badge && (
                  <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded ${
                    product.badge === 'Best Seller' ? 'bg-yellow-500 text-white' :
                    product.badge === 'New' ? 'bg-green-500 text-white' :
                    product.badge === 'Sale' ? 'bg-red-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-300 ${
                    wishlist.includes(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                  }`}
                >
                  <FaHeart className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-4">
                  <span className={`text-sm font-medium ${
                    product.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product.id)}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    product.inStock
                      ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🚀 This is a Live Demo
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This E-commerce platform demonstrates modern web development practices including responsive design, 
            interactive components, and smooth animations. The actual platform would include real payment processing, 
            inventory management, and user authentication.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Back to Portfolio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}