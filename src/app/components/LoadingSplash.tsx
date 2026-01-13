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
    "Loading...",
    "Preparing content...",
    "Almost there...",
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

  // Function to play completion sound
  const playCompletionSound = async () => {
    try {
      // Create a simple success sound using Web Audio API
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      
      if (!AudioContextClass) {
        console.log('AudioContext not supported');
        return;
      }

      const audioContext = new AudioContextClass();
      
      // Check if audio context is suspended and try to resume it
      if (audioContext.state === 'suspended') {
        try {
          await audioContext.resume();
          console.log('Audio context resumed');
        } catch (err) {
          console.log('Failed to resume audio context:', err);
          return;
        }
      }
      
      // Wait a moment for context to be ready
      await new Promise(resolve => setTimeout(resolve, 10));
      
      // Create a sequence of pleasant tones
      const tones = [
        { frequency: 523.25, duration: 0.15 }, // C5
        { frequency: 659.25, duration: 0.15 }, // E5  
        { frequency: 783.99, duration: 0.3 }   // G5
      ];

      let currentTime = audioContext.currentTime + 0.01; // Small delay to ensure context is ready

      tones.forEach(({ frequency, duration }) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, currentTime);
        oscillator.type = 'sine';
        
        // Create a smooth envelope
        gainNode.gain.setValueAtTime(0, currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + duration);
        
        currentTime += duration + 0.05; // Small gap between tones
      });
      
      console.log('Completion sound played');
    } catch (error) {
      console.log('Audio playback failed:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            // Play completion sound
            playCompletionSound();
            
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
      className="fixed inset-0 z-50 bg-neutral-900 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Main Content */}
      <div className="text-center z-10">
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
            <motion.div 
              className="absolute inset-4 bg-blue-500 rounded-full"
              animate={{ 
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-blue-500"
          >
            Jireh Custodio
          </motion.h1>
          <motion.p className="text-neutral-400 mt-2">
            Full-Stack Developer
          </motion.p>
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
          <p className="text-sm text-neutral-400">
            {loadingTexts[currentText]}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="flex justify-between text-sm text-neutral-500 mb-2">
            <span>Loading</span>
            <motion.span
              key={progress}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="font-mono"
            >
              {progress}%
            </motion.span>
          </div>
          
          <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              variants={progressBarVariants}
              initial="initial"
              animate="loading"
            />
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