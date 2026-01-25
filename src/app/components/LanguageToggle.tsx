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
        className="flex items-center bg-neutral-50 border border-neutral-200 rounded-full p-1"
        whileHover={{ borderColor: "#b8814a" }}
      >
        <motion.button
          onClick={() => handleLanguageChange('en')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            language === 'en'
              ? 'bg-[#b8814a] text-white'
              : 'text-neutral-600 hover:text-neutral-900'
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
              ? 'bg-[#b8814a] text-white'
              : 'text-neutral-600 hover:text-neutral-900'
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