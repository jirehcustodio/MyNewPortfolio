"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ECommercePage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/#projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-neutral-300 hover:text-white transition-colors"
              >
                <span className="text-lg">←</span>
                Back to Projects
              </motion.button>
            </Link>
            
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/jirehcustodio"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-neutral-300 hover:text-white transition-colors"
              >
                <span className="text-lg">🐙</span>
              </motion.a>
              <motion.a
                href="/modernshop"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-blue-500 border border-blue-400 rounded-xl text-white hover:bg-blue-600 transition-colors"
              >
                <span className="text-lg">🔗</span>
              </motion.a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              E-Commerce Platform
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                ModernShop
              </span>
            </h1>
            
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive e-commerce platform built with modern web technologies, 
              featuring advanced product management, secure payment processing, and 
              intelligent recommendation systems.
            </p>
          </motion.div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-neutral-700/50 backdrop-blur-sm">
              <div className="aspect-video bg-neutral-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-neutral-400">Project Screenshot Coming Soon</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Project Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                  Project Overview
                </h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-neutral-300 leading-relaxed mb-4">
                    ModernShop is a full-stack e-commerce platform designed to provide seamless 
                    online shopping experiences. Built with scalability and performance in mind, 
                    it features a modern React frontend, robust Node.js backend, and secure 
                    payment processing.
                  </p>
                  <p className="text-neutral-300 leading-relaxed">
                    The platform includes advanced features like real-time inventory management, 
                    AI-powered product recommendations, multi-vendor support, and comprehensive 
                    analytics dashboard for store owners.
                  </p>
                </div>
              </motion.section>

              {/* Key Features */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                  Key Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "🛍️",
                      title: "Product Catalog",
                      description: "Advanced filtering, search, and categorization with high-quality image galleries"
                    },
                    {
                      icon: "💳",
                      title: "Secure Payments",
                      description: "Multiple payment gateways including Stripe, PayPal, and digital wallets"
                    },
                    {
                      icon: "📊",
                      title: "Analytics Dashboard",
                      description: "Real-time sales analytics, customer insights, and inventory tracking"
                    },
                    {
                      icon: "🤖",
                      title: "AI Recommendations",
                      description: "Machine learning-powered product suggestions and personalized shopping"
                    },
                    {
                      icon: "📱",
                      title: "Mobile Responsive",
                      description: "Optimized for all devices with progressive web app capabilities"
                    },
                    {
                      icon: "🔐",
                      title: "Admin Panel",
                      description: "Comprehensive admin interface for inventory, orders, and user management"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + (index * 0.1), duration: 0.6 }}
                      className="p-6 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl backdrop-blur-sm hover:border-blue-500/20 transition-colors group"
                    >
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-neutral-400">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Technical Implementation */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                  Technical Implementation
                </h2>
                <div className="space-y-6">
                  <div className="p-6 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">Frontend Architecture</h3>
                    <p className="text-neutral-300 mb-4">
                      Built with React 18 and Next.js 14 for optimal performance and SEO. 
                      Utilizes TypeScript for type safety and Tailwind CSS for responsive design.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl">
                    <h3 className="text-xl font-semibold text-green-400 mb-3">Backend & Database</h3>
                    <p className="text-neutral-300 mb-4">
                      Node.js with Express.js for RESTful API development, MongoDB for flexible 
                      data storage, and Redis for caching and session management.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "Express.js", "MongoDB", "Redis", "JWT"].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Project Info */}
              <div className="p-6 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Project Info</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-neutral-400 text-sm">Duration</span>
                    <p className="text-white">3 months</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-sm">Team Size</span>
                    <p className="text-white">Solo Project</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-sm">Status</span>
                    <p className="text-green-400">Completed</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-sm">Platform</span>
                    <p className="text-white">Web Application</p>
                  </div>
                </div>
              </div>

              {/* Technology Stack */}
              <div className="p-6 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Technology Stack</h3>
                <div className="space-y-3">
                  {[
                    { category: "Frontend", techs: ["React", "Next.js", "TypeScript"] },
                    { category: "Backend", techs: ["Node.js", "Express.js", "MongoDB"] },
                    { category: "Styling", techs: ["Tailwind CSS", "Framer Motion"] },
                    { category: "Tools", techs: ["Git", "VS Code", "Figma"] }
                  ].map((stack, index) => (
                    <div key={index}>
                      <span className="text-neutral-400 text-sm">{stack.category}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {stack.techs.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-neutral-700/50 rounded text-xs text-neutral-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                <motion.a
                  href="https://github.com/jirehcustodio"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white hover:border-neutral-600 transition-colors"
                >
                  <span className="text-lg">🐙</span>
                  View Code
                </motion.a>
                
                <motion.a
                  href="/modernshop"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-500 border border-blue-400 rounded-xl text-white hover:bg-blue-600 transition-colors"
                >
                  <span className="text-lg">🔗</span>
                  Live Demo
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}