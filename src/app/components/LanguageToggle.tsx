"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../lib/useLanguage";
import { Language } from "../lib/translations";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="relative">
      <motion.div
        className="flex items-center bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-full p-1"
        whileHover={{ borderColor: "rgba(59, 130, 246, 0.3)" }}
      >
        <motion.button
          onClick={() => handleLanguageChange('en')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            language === 'en'
              ? 'bg-blue-500 text-white'
              : 'text-neutral-300 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EN
        </motion.button>
        
        <motion.button
          onClick={() => handleLanguageChange('fil')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            language === 'fil'
              ? 'bg-blue-500 text-white'
              : 'text-neutral-300 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          FIL
        </motion.button>
      </motion.div>
    </div>
  );
}