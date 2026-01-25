"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import FloatingShapes from "./FloatingShapes";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Floating Shapes Background */}
      <FloatingShapes />
      
      {/* Minimal Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
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
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-neutral-700 text-xs sm:text-sm font-medium"
            >
              <span className="hidden sm:inline">Available for opportunities</span>
              <span className="sm:hidden">Available</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-2 sm:space-y-4">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight px-2 lg:px-0 text-neutral-900">
                <span>Hi, I&apos;m </span>
                <span className="text-neutral-900">
                  Jireh Custodio
                </span>
              </h1>
              
              {/* Subtitle */}
              <motion.div
                variants={itemVariants}
                className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-neutral-600 font-light"
              >
                Full-Stack Developer
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-neutral-500 max-w-2xl leading-relaxed px-2 lg:px-0"
            >
              Building robust web applications with modern technologies. 
              Specializing in <span className="text-neutral-900 font-medium">Next.js</span>, {" "}
              <span className="text-neutral-900 font-medium">React</span>, and {" "}
              <span className="text-neutral-900 font-medium">TypeScript</span>.
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
                className="px-6 sm:px-8 py-3 sm:py-4 bg-neutral-900 hover:bg-neutral-800 rounded-lg font-medium text-white transition-colors text-center text-sm sm:text-base"
              >
                View My Work
              </motion.a>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 sm:px-8 py-3 sm:py-4 border border-neutral-300 hover:border-neutral-900 rounded-lg font-medium transition-colors text-center text-sm sm:text-base text-neutral-900"
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
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-center hover:border-neutral-900 transition-colors touch-manipulation"
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 hover:text-neutral-900 transition-colors" />
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
              className="relative group"
            >
              {/* Minimal Profile Container */}
              <motion.div
                className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                
                {/* Frame */}
                <motion.div
                  className="relative w-full h-full rounded-2xl overflow-hidden border border-neutral-200 bg-white"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                  }}
                  whileHover={{ 
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)'
                  }}
                >
                  {/* Profile Image */}
                  <Image
                    src="/profile.jpg"
                    alt="Jireh Custodio"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                    priority
                    sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  />
                  
                  {/* Minimal Overlay - removed colorful gradients */}
                </motion.div>

                {/* Status Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    className="bg-white border border-neutral-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: "#171717",
                      y: -2
                    }}
                    style={{
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
                    }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.div
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"
                        animate={{ 
                          opacity: [1, 0.6, 1],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity 
                        }}
                      />
                      <span className="text-xs sm:text-sm font-medium text-neutral-900 whitespace-nowrap">
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
          className="w-6 h-10 border border-neutral-300 rounded-full flex justify-center"
          whileHover={{ borderColor: "#171717" }}
        >
          <motion.div
            className="w-1 h-3 bg-neutral-900 rounded-full mt-2"
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