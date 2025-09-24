"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaCheckCircle, FaHome, FaEnvelope } from "react-icons/fa";

export default function ContactSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.8
          }}
          className="mb-8"
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1,
              delay: 0.5,
              ease: "easeInOut"
            }}
            className="w-24 h-24 mx-auto mb-6"
          >
            <FaCheckCircle className="w-full h-full text-green-400" />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Message Sent Successfully!
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed"
          >
            Thank you for reaching out! I&apos;ve received your message and will get back to you within 24 hours.
          </motion.p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid md:grid-cols-2 gap-6 mb-10"
        >
          <div className="p-6 bg-neutral-800/40 border border-neutral-700/50 rounded-2xl backdrop-blur-sm">
            <FaEnvelope className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
            <h3 className="font-semibold text-white mb-2">Quick Response</h3>
            <p className="text-neutral-400 text-sm">
              I typically respond within 24 hours during business days
            </p>
          </div>
          
          <div className="p-6 bg-neutral-800/40 border border-neutral-700/50 rounded-2xl backdrop-blur-sm">
            <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
            </div>
            <h3 className="font-semibold text-white mb-2">Message Received</h3>
            <p className="text-neutral-400 text-sm">
              Your message has been delivered to my inbox safely
            </p>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-semibold text-white relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaHome className="w-4 h-4" />
                Back to Portfolio
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </Link>

          <Link href="/#contact">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(59, 130, 246, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-neutral-600 rounded-2xl font-semibold text-white hover:text-blue-400 transition-colors duration-300"
            >
              Send Another Message
            </motion.button>
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-12 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm"
        >
          <p className="text-blue-300 text-sm">
            💡 <strong>Tip:</strong> For urgent matters, you can also reach me directly at{" "}
            <a 
              href="mailto:jireh4401@gmail.com" 
              className="underline hover:text-blue-200 transition-colors"
            >
              jireh4401@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}