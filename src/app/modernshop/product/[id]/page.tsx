"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  MessageCircle,
  Clock,
  CheckCircle,
  Plus,
  Minus,
  MapPin,
  Award,
  ThumbsUp,
  X
} from "lucide-react";
import { getProductById } from "../../lib/productData";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Initialize all hooks first
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const product = getProductById(productId);

  // Update state when product is loaded
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants[0]?.id || "");
      setSelectedSize(product.sizes[0]?.id || "");
      setSelectedDelivery(product.deliveryOptions[0]?.id || "");
    }
  }, [product]);

  // Update image when variant changes
  useEffect(() => {
    if (product && selectedVariant) {
      const variantIndex = product.variants.findIndex(v => v.id === selectedVariant);
      if (variantIndex !== -1 && variantIndex < product.images.length) {
        setSelectedImage(variantIndex);
      }
    }
  }, [selectedVariant, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/modernshop" className="text-blue-400 hover:text-blue-300">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const currentVariant = product.variants.find(v => v.id === selectedVariant) || product.variants[0];
  const currentDelivery = product.deliveryOptions.find(d => d.id === selectedDelivery) || product.deliveryOptions[0];
  
  const basePrice = currentVariant ? currentVariant.price : product.price;
  const baseOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;
  const deliveryPrice = currentDelivery ? currentDelivery.price : 0;
  
  const totalPrice = (basePrice * quantity) + deliveryPrice;
  const totalOriginalPrice = (baseOriginalPrice * quantity) + deliveryPrice;
  const totalPricePhp = Math.round(totalPrice * 56.5);
  const totalOriginalPricePhp = Math.round(totalOriginalPrice * 56.5);

  const handleBuyNow = () => {
    setShowPaymentModal(true);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const currentVariant = product.variants.find(v => v.id === selectedVariant);
    const currentSize = product.sizes.find(s => s.id === selectedSize);
    
    addToCart({
      id: product.id,
      name: product.name,
      price: basePrice,
      image: product.images[selectedImage],
      variant: currentVariant?.name,
      size: currentSize?.name,
      variantId: selectedVariant,
      sizeId: selectedSize
    }, quantity);

    // Show success feedback
    alert(`Added ${quantity} ${product.name}${currentVariant ? ` (${currentVariant.name})` : ''} to cart!`);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: basePrice,
        image: product.images[0],
        brand: product.brand,
        category: product.category
      });
    }
  };

  const handleShare = () => {
    navigator.share({
      title: product.name,
      text: product.description,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800/50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
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
              <Link href="/modernshop" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                >
                  🛒 ModernShop
                </motion.div>
              </Link>
            </div>
            
            {/* Breadcrumb */}
            <div className="text-sm text-neutral-400">
              <Link href="/modernshop" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="hover:text-white">{product.category}</span>
              <span className="mx-2">/</span>
              <span className="text-white">{product.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid xl:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="xl:col-span-1 space-y-6"
          >
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-2xl relative overflow-hidden">
              <motion.div
                key={selectedImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Discount Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                {Math.round(((baseOriginalPrice - basePrice) / baseOriginalPrice) * 100)}% OFF
              </motion.div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl relative overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? "ring-2 ring-blue-500"
                      : "ring-1 ring-neutral-700/50 hover:ring-blue-500/30"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Middle Column - Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="xl:col-span-1 space-y-6"
          >
            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">{product.brand}</p>
                  <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                  <p className="text-neutral-400 text-sm">SKU: {product.sku}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlistToggle}
                    className={`p-2 rounded-full transition-colors ${
                      isInWishlist(product.id) ? "bg-red-500 text-white" : "bg-neutral-800 text-neutral-400 hover:text-red-400"
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-blue-400 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-neutral-600"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-neutral-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-white">${basePrice.toFixed(2)}</span>
                  {baseOriginalPrice > basePrice && (
                    <span className="text-lg text-neutral-500 line-through">${baseOriginalPrice.toFixed(2)}</span>
                  )}
                </div>
                <div className="text-sm text-neutral-400">
                  Quantity: {quantity} × ${basePrice.toFixed(2)} = ${(basePrice * quantity).toFixed(2)}
                </div>
                {deliveryPrice > 0 && (
                  <div className="text-sm text-neutral-400">
                    Delivery: ${deliveryPrice.toFixed(2)}
                  </div>
                )}
                <div className="border-t border-neutral-700 pt-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-green-400">${totalPrice.toFixed(2)}</span>
                    <span className="text-sm text-neutral-400">Total</span>
                  </div>
                  <div className="text-xl font-semibold text-yellow-400">₱{totalPricePhp.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Color/Variant</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant) => (
                    <motion.button
                      key={variant.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`p-3 rounded-lg border transition-all text-left ${
                        selectedVariant === variant.id
                          ? "border-blue-500 bg-blue-500/20 text-blue-400"
                          : "border-neutral-700 text-neutral-300 hover:border-neutral-600"
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-sm opacity-75">${variant.price.toFixed(2)}</div>
                      <div className="text-xs opacity-50">Stock: {variant.stock}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Size</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size.id}
                      whileHover={{ scale: size.available ? 1.05 : 1 }}
                      whileTap={{ scale: size.available ? 0.95 : 1 }}
                      onClick={() => size.available && setSelectedSize(size.id)}
                      disabled={!size.available}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedSize === size.id
                          ? "border-blue-500 bg-blue-500/20 text-blue-400"
                          : size.available
                          ? "border-neutral-700 text-neutral-300 hover:border-neutral-600"
                          : "border-neutral-800 text-neutral-600 cursor-not-allowed"
                      }`}
                    >
                      {size.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-700 rounded-lg">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-neutral-800 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-neutral-800 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <span className="text-sm text-neutral-400">
                  {currentVariant ? currentVariant.stock : product.stock} available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                Buy Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full bg-neutral-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-neutral-700 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
            </div>

            {/* Delivery Options */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Delivery Options
              </h3>
              <div className="space-y-2">
                {product.deliveryOptions.map((option) => (
                  <motion.label
                    key={option.id}
                    whileHover={{ scale: 1.01 }}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedDelivery === option.id
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-neutral-700 hover:border-neutral-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={selectedDelivery === option.id}
                        onChange={() => setSelectedDelivery(option.id)}
                        className="text-blue-500"
                      />
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-neutral-400">{option.description}</p>
                        <p className="text-xs text-neutral-500">{option.duration}</p>
                      </div>
                    </div>
                    <span className="font-semibold">
                      {option.price === 0 ? "Free" : `$${option.price}`}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Store Info & Additional Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="xl:col-span-1 space-y-6"
          >
            {/* Store Information */}
            <div className="bg-neutral-800/50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Store Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{product.store.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.store.status === "Online" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {product.store.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.store.rating) ? "text-yellow-400 fill-current" : "text-neutral-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-400">
                    {product.store.rating} ({product.store.totalReviews} reviews)
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    <span className="text-neutral-300">{product.store.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span className="text-neutral-300">Response time: {product.store.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-neutral-500" />
                    <span className="text-neutral-300">Chat response: {product.store.chatResponse}%</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with Seller
                </motion.button>
              </div>
            </div>

            {/* Warranty & Returns */}
            <div className="bg-neutral-800/50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                Warranty & Returns
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{product.warranty.duration} Warranty</p>
                    <ul className="text-neutral-400 mt-1">
                      {product.warranty.coverage.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <RotateCcw className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Return Policy</p>
                    <p className="text-neutral-400">{product.warranty.returnPolicy}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tags */}
            <div className="bg-neutral-800/50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <div className="border-b border-neutral-800">
            <nav className="flex gap-8">
              {["details", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-neutral-400 hover:text-neutral-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "details" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-neutral-300 leading-relaxed">{product.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Technical Specifications</h3>
                <div className="bg-neutral-800/50 rounded-xl p-6">
                  <dl className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-neutral-700/50 pb-3">
                        <dt className="font-medium text-neutral-400 text-sm">{key}</dt>
                        <dd className="text-white mt-1">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-neutral-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-neutral-400">
                      {product.rating} out of 5 ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {product.reviewsList.map((review) => (
                    <div key={review.id} className="bg-neutral-800/50 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={review.avatar}
                            alt={review.user}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{review.user}</h4>
                                {review.verified && (
                                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "text-yellow-400 fill-current" : "text-neutral-600"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-neutral-400">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-neutral-300">{review.comment}</p>
                          
                          {review.images && (
                            <div className="flex gap-2">
                              {review.images.map((img, index) => (
                                <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden">
                                  <Image
                                    src={img}
                                    alt={`Review image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1 text-neutral-400 hover:text-blue-400 transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              Helpful ({review.helpful})
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowPaymentModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-md w-full p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Choose Payment Method</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </motion.button>
            </div>

            {/* Order Summary */}
            <div className="bg-neutral-800/50 rounded-xl p-4 space-y-2">
              <h3 className="font-semibold text-white mb-3">Order Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">{product.name}</span>
                <span className="text-white">${basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Quantity</span>
                <span className="text-white">{quantity}</span>
              </div>
              {selectedVariant && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Variant</span>
                  <span className="text-white">{currentVariant?.name}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Subtotal</span>
                <span className="text-white">${(basePrice * quantity).toFixed(2)}</span>
              </div>
              {deliveryPrice > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-400">Delivery</span>
                  <span className="text-white">${deliveryPrice.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-neutral-700 pt-2 mt-3">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Total</span>
                  <div className="text-right">
                    <div className="text-green-400">${totalPrice.toFixed(2)}</div>
                    <div className="text-yellow-400 text-sm">₱{totalPricePhp.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Select Payment Method</h3>
              
              {/* PayPal */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPaymentMethod('paypal')}
                className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${
                  selectedPaymentMethod === 'paypal'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'
                }`}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PP</span>
                </div>
                <div className="text-left">
                  <div className="font-medium">PayPal</div>
                  <div className="text-sm opacity-75">Pay with your PayPal account</div>
                </div>
                {selectedPaymentMethod === 'paypal' && (
                  <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </motion.button>

              {/* GCash */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPaymentMethod('gcash')}
                className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${
                  selectedPaymentMethod === 'gcash'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'
                }`}
              >
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <div className="text-left">
                  <div className="font-medium">GCash</div>
                  <div className="text-sm opacity-75">Pay with GCash e-wallet</div>
                </div>
                {selectedPaymentMethod === 'gcash' && (
                  <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </motion.button>

              {/* Bank Account */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPaymentMethod('bank')}
                className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${
                  selectedPaymentMethod === 'bank'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'
                }`}
              >
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🏦</span>
                </div>
                <div className="text-left">
                  <div className="font-medium">Bank Transfer</div>
                  <div className="text-sm opacity-75">Direct bank account transfer</div>
                </div>
                {selectedPaymentMethod === 'bank' && (
                  <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </motion.button>

              {/* Cash on Delivery */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPaymentMethod('cod')}
                className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${
                  selectedPaymentMethod === 'cod'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'
                }`}
              >
                <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">💰</span>
                </div>
                <div className="text-left">
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm opacity-75">Pay when you receive the item</div>
                </div>
                {selectedPaymentMethod === 'cod' && (
                  <div className="ml-auto w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </motion.button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-3 px-4 border border-neutral-700 text-neutral-300 rounded-xl hover:bg-neutral-800 transition-all"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Handle payment processing
                  alert(`Processing payment via ${selectedPaymentMethod}...`);
                  setShowPaymentModal(false);
                }}
                disabled={!selectedPaymentMethod}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Payment
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}