"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.section 
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
    >
      {/* Dynamic Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}
      />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Floating Particles with Physics */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-20"
        >
          {/* Left Column - Text Content */}
          <motion.div 
            variants={itemVariants}
            className="text-center lg:text-left space-y-6 lg:space-y-8"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm"
            >
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-lg"
              >
                👋
              </motion.span>
              Hello, I&apos;m available for work!
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white">Hi, I&apos;m </span>
                <motion.span
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Jireh Custodio
                  </span>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </h1>
              
              {/* Subtitle with Typewriter Effect */}
              <motion.div
                variants={itemVariants}
                className="text-xl sm:text-2xl lg:text-3xl text-neutral-300 font-light"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-blue-400"
                  style={{ borderRightColor: "transparent" }}
                >
                  Full-Stack Developer
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-neutral-400 max-w-2xl leading-relaxed"
            >
              I craft exceptional digital experiences through{" "}
              <motion.span
                className="text-blue-400 font-semibold relative"
                whileHover={{ color: "#60a5fa", scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                innovative code
              </motion.span>
              ,{" "}
              <motion.span
                className="text-purple-400 font-semibold"
                whileHover={{ color: "#a855f7", scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                elegant design
              </motion.span>
              , and{" "}
              <motion.span
                className="text-pink-400 font-semibold"
                whileHover={{ color: "#ec4899", scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                seamless interactions
              </motion.span>
              .
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "#60a5fa",
                  y: -2,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-neutral-600 hover:border-blue-400 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm bg-neutral-800/50"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start gap-4 pt-6"
            >
              {[
                { name: 'GitHub', icon: FaGithub, href: 'https://github.com/jirehcustodio' },
                { name: 'LinkedIn', icon: FaLinkedin, href: 'https://www.linkedin.com/in/jireh-custodio-19a492341/' },
                { name: 'Email', icon: FaEnvelope, href: 'mailto:jireh4401@gmail.com' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-neutral-800/50 border border-neutral-700 rounded-xl flex items-center justify-center hover:border-blue-400 transition-colors backdrop-blur-sm"
                >
                  <social.icon className="w-5 h-5 text-neutral-400 hover:text-blue-400 transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Picture */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              style={{ y: y1 }}
              className="relative group"
            >
              {/* Decorative Background Elements */}
              <motion.div
                style={{ y: y2 }}
                className="absolute -inset-8 opacity-50"
              >
                {/* Rotating Rings */}
                <motion.div
                  className="absolute -top-8 -left-8 w-24 h-24 border-2 border-blue-400/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -bottom-8 -right-8 w-20 h-20 border-2 border-purple-400/30 rounded-lg"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-1/2 -right-12 w-4 h-4 bg-pink-400/60 rounded-full"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Main Profile Container */}
              <motion.div
                className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Dynamic Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-60"
                  style={{
                    background: `conic-gradient(from ${mousePosition.x * 0.1}deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))`
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Glass Morphism Frame */}
                <motion.div
                  className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
                  style={{
                    boxShadow: `
                      0 8px 32px 0 rgba(31, 38, 135, 0.37),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                      0 0 60px rgba(59, 130, 246, 0.1)
                    `
                  }}
                  whileHover={{ 
                    boxShadow: `
                      0 8px 32px 0 rgba(31, 38, 135, 0.5),
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                      0 0 80px rgba(59, 130, 246, 0.2)
                    `
                  }}
                >
                  {/* Profile Image */}
                  <Image
                    src="/profile.jpg"
                    alt="Jireh Custodio"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  />
                  
                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Scan Line Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent h-full w-full opacity-0 group-hover:opacity-100"
                    animate={{
                      y: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                {/* Status Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    className="bg-neutral-900/90 border border-neutral-700 rounded-2xl px-6 py-3 backdrop-blur-md"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "#60a5fa",
                      y: -2
                    }}
                    style={{
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-3 h-3 bg-green-400 rounded-full"
                        animate={{ 
                          opacity: [1, 0.5, 1],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity 
                        }}
                      />
                      <span className="text-sm font-medium text-white">
                        Available for work
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-neutral-400 text-sm">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 border-2 border-neutral-600 rounded-full flex justify-center"
          whileHover={{ borderColor: "#60a5fa" }}
        >
          <motion.div
            className="w-1 h-3 bg-blue-400 rounded-full mt-2"
            animate={{
              y: [0, 12, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}