"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingSplashProps {
  onComplete: () => void;
}

export default function LoadingSplash({ onComplete }: LoadingSplashProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const controls = useAnimation();

  const loadingTexts = [
    "Initializing Experience...",
    "Loading Creativity...",
    "Preparing Portfolio...",
    "Almost Ready...",
    "Welcome!"
  ];

  // Predefined positions for particles to prevent hydration mismatch
  const particlePositions = [
    { left: 10, top: 15 }, { left: 85, top: 25 }, { left: 20, top: 80 }, { left: 70, top: 5 },
    { left: 5, top: 60 }, { left: 90, top: 70 }, { left: 45, top: 20 }, { left: 75, top: 85 },
    { left: 15, top: 45 }, { left: 95, top: 40 }, { left: 30, top: 90 }, { left: 60, top: 10 },
    { left: 25, top: 65 }, { left: 80, top: 35 }, { left: 35, top: 75 }, { left: 55, top: 50 },
    { left: 40, top: 30 }, { left: 65, top: 60 }, { left: 50, top: 95 }, { left: 85, top: 15 },
    { left: 12, top: 25 }, { left: 72, top: 70 }, { left: 28, top: 85 }, { left: 88, top: 45 },
    { left: 8, top: 35 }, { left: 92, top: 55 }, { left: 38, top: 12 }, { left: 68, top: 88 },
    { left: 22, top: 40 }, { left: 78, top: 20 }, { left: 48, top: 75 }, { left: 58, top: 8 },
    { left: 18, top: 68 }, { left: 82, top: 28 }, { left: 42, top: 58 }, { left: 62, top: 38 },
    { left: 32, top: 48 }, { left: 52, top: 78 }, { left: 26, top: 18 }, { left: 76, top: 63 },
    { left: 36, top: 33 }, { left: 66, top: 83 }, { left: 46, top: 53 }, { left: 56, top: 23 },
    { left: 14, top: 73 }, { left: 74, top: 43 }, { left: 34, top: 13 }, { left: 64, top: 93 },
    { left: 24, top: 28 }, { left: 84, top: 58 }
  ];

  // Predefined animation delays and durations for consistent animations
  const animationSettings = [
    { delay: 0.2, duration: 2.5 }, { delay: 1.8, duration: 3.2 }, { delay: 0.7, duration: 2.8 },
    { delay: 1.3, duration: 3.5 }, { delay: 0.5, duration: 2.2 }, { delay: 1.6, duration: 4.0 },
    { delay: 0.9, duration: 2.7 }, { delay: 1.1, duration: 3.8 }, { delay: 0.3, duration: 2.9 },
    { delay: 1.9, duration: 2.6 }, { delay: 0.8, duration: 3.1 }, { delay: 1.4, duration: 2.4 },
    { delay: 0.6, duration: 3.3 }, { delay: 1.7, duration: 2.1 }, { delay: 1.0, duration: 3.6 },
    { delay: 0.4, duration: 2.3 }, { delay: 1.5, duration: 3.9 }, { delay: 0.1, duration: 2.0 },
    { delay: 1.2, duration: 3.4 }, { delay: 0.0, duration: 2.8 }, { delay: 1.8, duration: 3.7 },
    { delay: 0.7, duration: 2.5 }, { delay: 1.3, duration: 3.0 }, { delay: 0.5, duration: 2.6 },
    { delay: 1.6, duration: 3.2 }, { delay: 0.9, duration: 2.9 }, { delay: 1.1, duration: 3.5 },
    { delay: 0.3, duration: 2.7 }, { delay: 1.9, duration: 3.8 }, { delay: 0.8, duration: 2.4 },
    { delay: 1.4, duration: 3.1 }, { delay: 0.6, duration: 2.2 }, { delay: 1.7, duration: 3.6 },
    { delay: 1.0, duration: 2.8 }, { delay: 0.4, duration: 3.3 }, { delay: 1.5, duration: 2.1 },
    { delay: 0.2, duration: 3.9 }, { delay: 1.2, duration: 2.5 }, { delay: 0.0, duration: 3.4 },
    { delay: 1.8, duration: 2.7 }, { delay: 0.7, duration: 3.7 }, { delay: 1.3, duration: 2.3 },
    { delay: 0.5, duration: 3.0 }, { delay: 1.6, duration: 2.6 }, { delay: 0.9, duration: 3.2 },
    { delay: 1.1, duration: 2.9 }, { delay: 0.3, duration: 3.5 }, { delay: 1.9, duration: 2.8 },
    { delay: 0.8, duration: 3.8 }, { delay: 1.4, duration: 2.4 }
  ];

  const logoVariants = {
    hidden: { 
      scale: 0.5, 
      opacity: 0,
      rotateY: -180
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 1.2
      }
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      rotateY: 180,
      transition: { duration: 0.6 }
    }
  };

  const progressBarVariants = {
    initial: { width: "0%" },
    loading: { 
      width: `${progress}%`,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            controls.start("exit").then(() => {
              setTimeout(onComplete, 300);
            });
          }, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [controls, onComplete]);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1000);

    return () => clearInterval(textTimer);
  }, [loadingTexts.length]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={controls}
      className="fixed inset-0 z-50 bg-gradient-to-br from-neutral-900 via-blue-900/20 to-purple-900/20 flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              delay: animationSettings[i]?.delay || 0,
              duration: animationSettings[i]?.duration || 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-400/20"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${20 + (i * 10)}%`,
              width: `${30 + (i * 5)}px`,
              height: `${30 + (i * 5)}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 4 + (i * 0.5),
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="text-center z-10">
        {/* Logo/Initial Animation */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-blue-400/30 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-purple-400/50 rounded-full"></div>
            <motion.div 
              className="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0%", "100%", "0%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Portfolio
          </motion.h1>
        </motion.div>

        {/* Dynamic Loading Text */}
        <motion.div
          className="mb-8 h-8"
          key={currentText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg text-neutral-300">
            {loadingTexts[currentText]}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="flex justify-between text-sm text-neutral-400 mb-2">
            <span>Loading</span>
            <motion.span
              key={progress}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-mono"
            >
              {progress}%
            </motion.span>
          </div>
          
          <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
              variants={progressBarVariants}
              initial="initial"
              animate="loading"
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>

        {/* Pulsing Dots */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner Accents */}
      <motion.div
        className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-blue-400/30"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-purple-400/30"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-pink-400/30"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-blue-400/30"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      />
    </motion.div>
  );
}