"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Mock cart items for demo
  const cartItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 99.99,
      quantity: 1,
      image: "🎧"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      quantity: 1,
      image: "⌚"
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Order Complete!
          </h1>
          <p className="text-xl text-neutral-300 mb-8">
            Thank you for your order. Your items will be shipped soon!
          </p>
          <div className="space-x-4">
            <Link href="/modernshop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold text-white transition-colors"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                >
                  🛒 ModernShop
                </motion.div>
              </Link>
            </div>
            <div className="text-lg font-semibold">Secure Checkout</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-neutral-700 text-neutral-400"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {step}
                </motion.div>
                <span className="ml-2 text-sm">
                  {step === 1 && "Shipping"}
                  {step === 2 && "Payment"}
                  {step === 3 && "Review"}
                </span>
                {step < 3 && (
                  <div className={`w-8 h-0.5 ml-4 ${
                    step < currentStep ? "bg-blue-500" : "bg-neutral-700"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="PH">Philippines</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={19}
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>
                  
                  <div className="bg-neutral-800/30 rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold">Shipping Details</h3>
                    <div className="text-neutral-300">
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.postalCode}</p>
                      <p>{formData.country}</p>
                    </div>
                  </div>

                  <div className="bg-neutral-800/30 rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold">Payment Method</h3>
                    <div className="text-neutral-300">
                      <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                      <p>Expires {formData.expiryDate}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-xl font-semibold text-white transition-colors"
                  >
                    ← Previous
                  </motion.button>
                )}
                
                {currentStep < 3 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold text-white transition-colors ml-auto"
                  >
                    Next →
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isProcessing}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-neutral-600 rounded-xl font-semibold text-white transition-colors ml-auto flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Processing...
                      </>
                    ) : (
                      "Complete Order 💳"
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-neutral-800/50 border border-neutral-700/50 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="text-2xl">{item.image}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-neutral-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-semibold">${item.price}</div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-neutral-600 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-600 pt-2 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-green-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-2 text-green-400">
                  <span>🔒</span>
                  <span className="text-sm font-medium">Secure SSL Encryption</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Your payment information is safe and secure
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}