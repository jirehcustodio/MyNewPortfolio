"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center min-h-screen py-16 sm:py-20"
        >
          {/* Left Column - Text Content */}
          <motion.div 
            variants={itemVariants}
            className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs sm:text-sm font-medium"
            >
              <span className="hidden sm:inline">👋 Available for opportunities</span>
              <span className="sm:hidden">👋 Available</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-2 sm:space-y-4">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-2 lg:px-0">
                <span className="text-white">Hi, I&apos;m </span>
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Jireh Custodio
                </span>
              </h1>
              
              {/* Subtitle */}
              <motion.div
                variants={itemVariants}
                className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-neutral-300 font-light"
              >
                Full-Stack Developer
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl leading-relaxed px-2 lg:px-0"
            >
              Building robust web applications with modern technologies. 
              Specializing in <span className="text-blue-400 font-medium">Next.js</span>, {" "}
              <span className="text-blue-400 font-medium">React</span>, and {" "}
              <span className="text-blue-400 font-medium">TypeScript</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 px-2 lg:px-0"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors text-center text-sm sm:text-base"
              >
                View My Work →
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-neutral-700 hover:border-blue-500 rounded-lg font-semibold transition-colors text-center text-sm sm:text-base"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start gap-3 sm:gap-4 pt-4 sm:pt-6"
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
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-800/50 border border-neutral-700 rounded-lg sm:rounded-xl flex items-center justify-center hover:border-blue-400 transition-colors backdrop-blur-sm touch-manipulation"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 hover:text-blue-400 transition-colors" />
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
                className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Subtle Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-blue-500"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.15, 0.25, 0.15]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Frame */}
                <motion.div
                  className="relative w-full h-full rounded-3xl overflow-hidden border border-neutral-700 bg-neutral-800/50"
                  style={{
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)'
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
                  className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    className="bg-neutral-900/90 border border-neutral-700 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-md"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "#60a5fa",
                      y: -2
                    }}
                    style={{
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.div
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"
                        animate={{ 
                          opacity: [1, 0.5, 1],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity 
                        }}
                      />
                      <span className="text-xs sm:text-sm font-medium text-white whitespace-nowrap">
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