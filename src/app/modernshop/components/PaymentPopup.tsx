"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Smartphone, Wallet, DollarSign } from "lucide-react";
import { useState } from "react";

interface PaymentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
    color: "from-blue-500 to-blue-600"
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Wallet,
    description: "Pay with your PayPal account",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "apple_pay",
    name: "Apple Pay",
    icon: Smartphone,
    description: "Touch ID or Face ID",
    color: "from-gray-700 to-gray-800"
  },
  {
    id: "google_pay",
    name: "Google Pay",
    icon: Smartphone,
    description: "Pay with Google",
    color: "from-green-500 to-green-600"
  },
  {
    id: "cash",
    name: "Cash on Delivery",
    icon: DollarSign,
    description: "Pay when you receive",
    color: "from-emerald-500 to-teal-600"
  }
];

export default function PaymentPopup({ isOpen, onClose, amount, items = [] }: PaymentPopupProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    alert(`Payment successful! Paid $${amount.toFixed(2)} via ${paymentMethods.find(m => m.id === selectedMethod)?.name}`);
    
    setIsProcessing(false);
    setSelectedMethod("");
    onClose();
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Payment Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-700">
                <div>
                  <h2 className="text-xl font-bold text-white">Payment Method</h2>
                  <p className="text-sm text-neutral-400">Choose how you&apos;d like to pay</p>
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

              {/* Order Summary */}
              <div className="p-6 border-b border-neutral-700">
                <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
                {items.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-neutral-400">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-400 mb-4">Quick purchase</p>
                )}
                <div className="border-t border-neutral-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-green-400">${amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-6 max-h-60 overflow-y-auto">
                <h3 className="text-lg font-semibold text-white mb-4">Select Payment Method</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <motion.button
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`w-full p-4 rounded-xl border transition-all duration-200 ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-neutral-700 hover:border-neutral-600 bg-neutral-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${method.color}`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="font-semibold text-white">{method.name}</h4>
                            <p className="text-sm text-neutral-400">{method.description}</p>
                          </div>
                          {selectedMethod === method.id && (
                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-neutral-700">
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 py-3 border border-neutral-600 text-neutral-300 rounded-lg font-medium hover:bg-neutral-800 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: selectedMethod && !isProcessing ? 1.02 : 1 }}
                    whileTap={{ scale: selectedMethod && !isProcessing ? 0.98 : 1 }}
                    onClick={handlePayment}
                    disabled={!selectedMethod || isProcessing}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      selectedMethod && !isProcessing
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                        : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}