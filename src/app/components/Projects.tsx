"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiNodedotjs, 
  SiPostgresql, 
  SiSupabase,
  SiFramer,
  SiTailwindcss,
  SiJavascript
} from 'react-icons/si';
import { FaExternalLinkAlt, FaGithub, FaPlay, FaTimes } from 'react-icons/fa';
import { IconType } from 'react-icons';

// Types
interface Project {
  id: number;
  title: string;
  desc: string;
  longDesc: string;
  tech: string[];
  category: string;
  gradient: string;
  link: string;
  githubLink: string;
  isLiveDemo: boolean;
  demoUrl?: string;
  image: string;
  features: string[];
  challenges: string;
  solution: string;
}

// Enhanced project data with more details
const projects = [
  { 
    id: 1,
    title: "TaskFlow Pro", 
    desc: "Advanced productivity platform with personal & team workspaces, real-time notifications, and cloud synchronization.",
    longDesc: "A comprehensive task management solution built for modern teams and individuals. Features include real-time collaboration, advanced analytics, custom workflows, and seamless cloud integration.",
    tech: ["Next.js", "TypeScript", "Supabase", "Framer Motion", "Tailwind CSS"],
    category: "Web App",
    gradient: "from-blue-500 to-purple-600",
    link: "/taskflow",
    githubLink: "https://github.com/jirehcustodio/taskflow-pro",
    isLiveDemo: true,
    demoUrl: "/taskflow",
    image: "/projects/taskflow-preview.jpg",
    features: ["Real-time Collaboration", "Advanced Analytics", "Cloud Sync", "Custom Workflows"],
    challenges: "Building real-time synchronization while maintaining performance",
    solution: "Implemented Supabase real-time subscriptions with optimistic updates"
  },
  { 
    id: 2,
    title: "E-Commerce Platform", 
    desc: "Modern e-commerce solution with real-time inventory and seamless checkout experience.",
    longDesc: "Full-stack e-commerce platform featuring advanced inventory management, payment processing, and user analytics. Built with modern technologies for optimal performance.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    category: "E-Commerce",
    gradient: "from-emerald-500 to-teal-500",
    link: "/modernshop",
    githubLink: "https://github.com/jirehcustodio/ecommerce-platform",
    isLiveDemo: true,
    demoUrl: "/modernshop",
    image: "/projects/ecommerce-preview.jpg",
    features: ["Payment Integration", "Inventory Management", "User Analytics", "Admin Dashboard"],
    challenges: "Managing complex inventory states and real-time updates",
    solution: "Implemented Redis caching with PostgreSQL for consistent data flow"
  },
  { 
    id: 3,
    title: "Analytics Dashboard", 
    desc: "Real-time analytics dashboard with interactive charts, live metrics, and comprehensive data visualization.",
    longDesc: "A professional analytics dashboard featuring real-time data visualization, interactive charts using Chart.js, live user tracking, and comprehensive business metrics. Built with modern technologies for optimal performance and user experience.",
    tech: ["Next.js", "TypeScript", "Chart.js", "Tailwind CSS", "Framer Motion"],
    category: "Dashboard",
    gradient: "from-orange-500 to-red-500",
    link: "/analytics",
    githubLink: "https://github.com/jirehcustodio/analytics-dashboard",
    isLiveDemo: true,
    demoUrl: "/analytics",
    image: "/projects/analytics-preview.jpg",
    features: ["Real-time Metrics", "Interactive Charts", "Live User Tracking", "Responsive Design", "Data Export"],
    challenges: "Creating smooth real-time updates while maintaining performance and user experience",
    solution: "Implemented Chart.js with optimized re-rendering and real-time data simulation"
  }
];

// Tech stack icons mapping
const techIcons: { [key: string]: IconType } = {
  "Next.js": SiNextdotjs,
  "React": SiReact,
  "TypeScript": SiTypescript,
  "Node.js": SiNodedotjs,
  "PostgreSQL": SiPostgresql,
  "Supabase": SiSupabase,
  "Framer Motion": SiFramer,
  "Tailwind CSS": SiTailwindcss,
  "JavaScript": SiJavascript,
  "D3.js": SiJavascript, // Using JS icon for D3
  "Express": SiNodedotjs, // Using Node icon for Express
  "MongoDB": SiNodedotjs, // You can add SiMongodb if available
  "Stripe": SiJavascript,
  "Redis": SiNodedotjs,
  "WebSocket": SiJavascript
};

const categories = ["All", "Web App", "E-Commerce", "Dashboard", "Mobile", "AI/ML"];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        duration: 0.6
      }
    }
  };

  return (
    <section id="projects" className="relative py-12 sm:py-16 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800/50 to-neutral-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] opacity-60" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Recent Work
          </motion.div>
          
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed px-2"
          >
            A showcase of my recent work, featuring modern web applications 
            built with cutting-edge technologies and thoughtful user experiences.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm text-sm sm:text-base touch-manipulation ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white border border-blue-400'
                  : 'bg-neutral-800/50 text-neutral-300 border border-neutral-700/50 hover:border-blue-400/50 hover:text-blue-400 active:bg-neutral-700/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className="group relative"
                onHoverStart={() => setHoveredProject(i)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                {/* Project Card */}
                <motion.div
                  className="relative h-full bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer touch-manipulation"
                  whileHover={{ 
                    y: -8,
                    rotateY: 2,
                    rotateX: 2,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: hoveredProject === i 
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(59, 130, 246, 0.2)"
                      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Gradient Header */}
                  <motion.div
                    className={`h-40 sm:h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Live Demo Badge */}
                    {project.isLiveDemo && (
                      <motion.div
                        initial={{ scale: 0, rotate: -12 }}
                        animate={{ scale: 1, rotate: -12 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 bg-green-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm border border-green-400/50 flex items-center gap-1"
                      >
                        <FaPlay className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">LIVE DEMO</span>
                        <span className="sm:hidden">LIVE</span>
                      </motion.div>
                    )}
                    
                    {/* Category Badge */}
                    <motion.div
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-black/20 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                    >
                      {project.category}
                    </motion.div>
                    
                    {/* Animated Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: "20px 20px"
                      }}
                      animate={{
                        backgroundPosition: ["0px 0px", "20px 20px"]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* 3D Floating Elements */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-3xl backdrop-blur-sm"
                      style={{ translateX: "-50%", translateY: "-50%" }}
                      animate={{
                        rotateX: hoveredProject === i ? [0, 360] : 0,
                        rotateY: hoveredProject === i ? [0, 360] : 0,
                      }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    <motion.h4
                      className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-blue-400 transition-colors duration-300"
                      layoutId={`title-${project.id}`}
                    >
                      {project.title}
                    </motion.h4>
                    
                    <motion.p
                      className="text-neutral-400 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6"
                      animate={{ 
                        color: hoveredProject === i ? "#e5e7eb" : "#a3a3a3" 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.desc}
                    </motion.p>

                    {/* Tech Stack with Icons */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {project.tech.map((tech, techIndex) => {
                        const IconComponent = techIcons[tech];
                        return (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * techIndex, duration: 0.3 }}
                            className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-neutral-700/50 border border-neutral-600/50 rounded-full text-xs font-medium text-neutral-300 backdrop-blur-sm"
                            whileHover={{ 
                              scale: 1.02,
                              backgroundColor: "rgba(59, 130, 246, 0.1)",
                              borderColor: "rgba(59, 130, 246, 0.3)",
                              color: "#60a5fa"
                            }}
                          >
                            {IconComponent && <IconComponent className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                            <span className="truncate">{tech}</span>
                          </motion.span>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-2.5 sm:py-3 bg-blue-500/10 border border-blue-500/20 rounded-lg sm:rounded-xl text-blue-400 font-medium hover:bg-blue-500/20 transition-colors backdrop-blur-sm text-center flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                      >
                        <FaExternalLinkAlt className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">Details</span>
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(project.githubLink, "_blank", "noopener,noreferrer");
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-2.5 sm:py-3 bg-neutral-700/50 border border-neutral-600/50 rounded-lg sm:rounded-xl text-neutral-300 font-medium hover:bg-neutral-600/50 transition-colors backdrop-blur-sm flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base touch-manipulation"
                      >
                        <FaGithub className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        Code
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent)`,
                      filter: "blur(1px)"
                    }}
                  />
                </motion.div>

                {/* External Glow */}
                <motion.div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5), rgba(236, 72, 153, 0.5))`,
                    filter: "blur(20px)"
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-neutral-800 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className={`h-48 sm:h-64 bg-gradient-to-br ${selectedProject.gradient} relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl`}>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 bg-black/20 rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors touch-manipulation"
                  >
                    <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-12 sm:right-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{selectedProject.title}</h2>
                    <p className="text-white/80 text-sm sm:text-base">{selectedProject.category}</p>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <p className="text-neutral-300 text-lg leading-relaxed mb-8">
                    {selectedProject.longDesc}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-3 text-neutral-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tech.map((tech: string) => {
                        const IconComponent = techIcons[tech];
                        return (
                          <span
                            key={tech}
                            className="flex items-center gap-2 px-4 py-2 bg-neutral-700/50 border border-neutral-600/50 rounded-full text-sm font-medium text-neutral-300"
                          >
                            {IconComponent && <IconComponent className="w-4 h-4" />}
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Challenge & Solution</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-red-400 mb-2">Challenge</h4>
                        <p className="text-neutral-300">{selectedProject.challenges}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Solution</h4>
                        <p className="text-neutral-300">{selectedProject.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    {selectedProject.isLiveDemo && selectedProject.demoUrl && (
                      <Link
                        href={selectedProject.demoUrl}
                        className="flex-1 py-4 bg-green-500 hover:bg-green-600 rounded-xl text-white font-semibold text-center transition-colors flex items-center justify-center gap-2"
                      >
                        <FaPlay className="w-4 h-4" />
                        View Live Demo
                      </Link>
                    )}
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-4 bg-neutral-700 hover:bg-neutral-600 rounded-xl text-white font-semibold text-center transition-colors flex items-center justify-center gap-2"
                    >
                      <FaGithub className="w-4 h-4" />
                      View Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12 lg:mt-16"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-semibold text-white relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 flex items-center gap-2">
              View All Projects
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}