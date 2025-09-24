"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AnalyticsDashboardPage() {
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
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-purple-500 border border-purple-400 rounded-xl text-white hover:bg-purple-600 transition-colors"
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              Analytics Dashboard
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                DataViz Pro
              </span>
            </h1>
            
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive analytics dashboard that transforms complex data into 
              actionable insights with interactive charts, real-time monitoring, 
              and advanced data visualization capabilities.
            </p>
          </motion.div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-neutral-700/50 backdrop-blur-sm">
              <div className="aspect-video bg-neutral-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
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
                    DataViz Pro is a powerful analytics dashboard that helps businesses 
                    make data-driven decisions through beautiful visualizations and 
                    real-time insights. The platform aggregates data from multiple sources 
                    and presents it in an intuitive, interactive interface.
                  </p>
                  <p className="text-neutral-300 leading-relaxed">
                    Built with performance and scalability in mind, the dashboard handles 
                    large datasets efficiently while providing smooth user interactions 
                    and lightning-fast data updates.
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
                      icon: "📊",
                      title: "Interactive Charts",
                      description: "Dynamic charts and graphs with drill-down capabilities and custom filtering"
                    },
                    {
                      icon: "⚡",
                      title: "Real-time Updates",
                      description: "Live data streaming with WebSocket connections for instant dashboard updates"
                    },
                    {
                      icon: "🎨",
                      title: "Custom Widgets",
                      description: "Drag-and-drop dashboard builder with customizable widgets and layouts"
                    },
                    {
                      icon: "📱",
                      title: "Responsive Design",
                      description: "Optimized for desktop, tablet, and mobile devices with touch-friendly controls"
                    },
                    {
                      icon: "🔍",
                      title: "Advanced Filtering",
                      description: "Complex data filtering with date ranges, multi-select options, and saved views"
                    },
                    {
                      icon: "📈",
                      title: "Predictive Analytics",
                      description: "Machine learning integration for trend analysis and forecasting capabilities"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + (index * 0.1), duration: 0.6 }}
                      className="p-6 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl backdrop-blur-sm hover:border-purple-500/20 transition-colors group"
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
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">Frontend & Visualization</h3>
                    <p className="text-neutral-300 mb-4">
                      Built with React and D3.js for powerful data visualization. Chart.js and 
                      Recharts provide additional charting capabilities with smooth animations.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "D3.js", "Chart.js", "Recharts"].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl">
                    <h3 className="text-xl font-semibold text-pink-400 mb-3">Backend & Data Processing</h3>
                    <p className="text-neutral-300 mb-4">
                      Python backend with FastAPI for high-performance data processing. 
                      PostgreSQL for structured data and Redis for caching and real-time features.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "FastAPI", "PostgreSQL", "Redis", "Pandas"].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm">
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
                    <p className="text-white">4 months</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-sm">Team Size</span>
                    <p className="text-white">Solo Project</p>
                  </div>
                  <div>
                    <span className="text-neutral-400 text-sm">Status</span>
                    <p className="text-yellow-400">In Progress</p>
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
                    { category: "Frontend", techs: ["React", "TypeScript", "Tailwind CSS"] },
                    { category: "Visualization", techs: ["D3.js", "Chart.js", "Recharts"] },
                    { category: "Backend", techs: ["Python", "FastAPI", "Pandas"] },
                    { category: "Database", techs: ["PostgreSQL", "Redis"] }
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
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-purple-500 border border-purple-400 rounded-xl text-white hover:bg-purple-600 transition-colors"
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