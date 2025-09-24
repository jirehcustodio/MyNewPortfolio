'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Monitor, Smartphone, Tablet, Zap, Shield, Globe, Users, Calendar, BarChart3, Bell } from 'lucide-react';
import Link from 'next/link';

export default function TaskFlowProDetails() {
  const features = [
    {
      icon: Users,
      title: "Personal & Team Workspaces",
      description: "Switch seamlessly between personal productivity and team collaboration modes."
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Real-time alerts, due date reminders, and cross-device notification sync."
    },
    {
      icon: Globe,
      title: "Cloud Synchronization",
      description: "Powered by Supabase for real-time data sync across all your devices."
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Email/password authentication with persistent sessions and guest mode."
    },
    {
      icon: Calendar,
      title: "Task Scheduling",
      description: "Advanced task management with due dates, priorities, and categories."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track productivity metrics and team performance insights."
    }
  ];

  const techStack = [
    { name: "Next.js 15", color: "from-black to-gray-800" },
    { name: "TypeScript", color: "from-blue-500 to-blue-700" },
    { name: "Supabase", color: "from-green-500 to-green-700" },
    { name: "Framer Motion", color: "from-purple-500 to-purple-700" },
    { name: "Tailwind CSS", color: "from-cyan-500 to-cyan-700" },
    { name: "React Context", color: "from-orange-500 to-orange-700" }
  ];

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link 
                href="/taskflow"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <Monitor className="w-4 h-4" />
                Live Demo
              </Link>
              <a 
                href="https://github.com/jirehcustodio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-neutral-900" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              Live Production App
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TaskFlow Pro
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-neutral-300 mb-12 leading-relaxed">
              A comprehensive productivity platform combining personal task management 
              with team collaboration, featuring real-time synchronization and smart notifications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/taskflow"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105"
              >
                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Try Live Demo
              </Link>
              <a 
                href="https://github.com/jirehcustodio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl font-semibold transition-all"
              >
                <Github className="w-5 h-5" />
                View Source
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Built with modern technologies for maximum productivity and seamless collaboration.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 bg-neutral-800/50 border border-neutral-700 rounded-2xl hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-neutral-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Built With Modern Tech
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Leveraging the latest technologies for performance, scalability, and developer experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`p-4 bg-gradient-to-br ${tech.color} rounded-xl text-white text-center font-semibold shadow-lg hover:shadow-xl transition-all`}
              >
                {tech.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Design Section */}
      <section className="py-20 bg-neutral-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Responsive Design
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Optimized for all devices with a mobile-first approach and seamless user experience.
            </p>
          </motion.div>

          <div className="flex items-center justify-center gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <p className="text-neutral-300 font-medium">Mobile</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Tablet className="w-8 h-8 text-white" />
              </div>
              <p className="text-neutral-300 font-medium">Tablet</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <p className="text-neutral-300 font-medium">Desktop</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Ready to Experience TaskFlow Pro?
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
              Try the live demo now and see how TaskFlow Pro can transform your productivity workflow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/taskflow"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 text-lg"
              >
                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Launch Live Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}