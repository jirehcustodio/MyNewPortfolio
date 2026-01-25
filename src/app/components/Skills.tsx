"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  SiNextdotjs, 
  SiReact, 
  SiTypescript, 
  SiJavascript,
  SiNodedotjs, 
  SiPostgresql, 
  SiSupabase,
  SiFramer,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiRedis,
  SiStripe,
  SiPrisma,
  SiFigma,
  SiMongodb,
  SiDocker,
  SiGraphql
} from 'react-icons/si';
import { FaCode, FaServer, FaDatabase, FaTools, FaRocket, FaMobile, FaCloud, FaBrain } from 'react-icons/fa';
import { IconType } from 'react-icons';
import analytics from '../lib/analytics';

// Skill categories and data
interface Skill {
  name: string;
  level: number; // 1-100
  icon: IconType;
  experience: string;
  projects: number;
  description: string;
  category: string;
}

interface SkillCategory {
  name: string;
  icon: IconType;
  color: string;
  gradient: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    icon: FaCode,
    color: "text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      {
        name: "Next.js",
        level: 95,
        icon: SiNextdotjs,
        experience: "3+ years",
        projects: 8,
        description: "Full-stack React framework with SSR, SSG, and API routes",
        category: "Frontend"
      },
      {
        name: "React",
        level: 92,
        icon: SiReact,
        experience: "4+ years",
        projects: 12,
        description: "Component-based UI library with hooks and context",
        category: "Frontend"
      },
      {
        name: "TypeScript",
        level: 90,
        icon: SiTypescript,
        experience: "3+ years",
        projects: 10,
        description: "Strongly typed JavaScript for scalable applications",
        category: "Frontend"
      },
      {
        name: "JavaScript",
        level: 88,
        icon: SiJavascript,
        experience: "5+ years",
        projects: 15,
        description: "Modern ES6+ JavaScript with advanced patterns",
        category: "Frontend"
      },
      {
        name: "Tailwind CSS",
        level: 85,
        icon: SiTailwindcss,
        experience: "2+ years",
        projects: 8,
        description: "Utility-first CSS framework for rapid UI development",
        category: "Frontend"
      },
      {
        name: "Framer Motion",
        level: 80,
        icon: SiFramer,
        experience: "2+ years",
        projects: 6,
        description: "Production-ready motion library for React",
        category: "Frontend"
      },
      {
        name: "HTML5",
        level: 95,
        icon: SiHtml5,
        experience: "6+ years",
        projects: 20,
        description: "Semantic markup and modern web standards",
        category: "Frontend"
      },
      {
        name: "CSS3",
        level: 88,
        icon: SiCss3,
        experience: "5+ years",
        projects: 18,
        description: "Advanced styling with Grid, Flexbox, and animations",
        category: "Frontend"
      }
    ]
  },
  {
    name: "Backend Development",
    icon: FaServer,
    color: "text-green-400",
    gradient: "from-green-500 to-emerald-500",
    skills: [
      {
        name: "Node.js",
        level: 85,
        icon: SiNodedotjs,
        experience: "3+ years",
        projects: 8,
        description: "Server-side JavaScript runtime for scalable applications",
        category: "Backend"
      },
      {
        name: "API Development",
        level: 88,
        icon: FaServer,
        experience: "3+ years",
        projects: 10,
        description: "RESTful and GraphQL API design and implementation",
        category: "Backend"
      },
      {
        name: "Authentication",
        level: 80,
        icon: FaTools,
        experience: "2+ years",
        projects: 6,
        description: "JWT, OAuth, and secure authentication systems",
        category: "Backend"
      },
      {
        name: "Serverless",
        level: 75,
        icon: FaCloud,
        experience: "2+ years",
        projects: 5,
        description: "AWS Lambda, Vercel Functions, and edge computing",
        category: "Backend"
      }
    ]
  },
  {
    name: "Database & Storage",
    icon: FaDatabase,
    color: "text-purple-400",
    gradient: "from-purple-500 to-pink-500",
    skills: [
      {
        name: "PostgreSQL",
        level: 85,
        icon: SiPostgresql,
        experience: "3+ years",
        projects: 8,
        description: "Advanced SQL queries, optimization, and schema design",
        category: "Database"
      },
      {
        name: "Supabase",
        level: 88,
        icon: SiSupabase,
        experience: "2+ years",
        projects: 6,
        description: "Real-time database with authentication and storage",
        category: "Database"
      },
      {
        name: "Redis",
        level: 75,
        icon: SiRedis,
        experience: "2+ years",
        projects: 4,
        description: "Caching and session management for performance",
        category: "Database"
      },
      {
        name: "Prisma",
        level: 80,
        icon: SiPrisma,
        experience: "2+ years",
        projects: 5,
        description: "Type-safe database client and schema management",
        category: "Database"
      },
      {
        name: "MongoDB",
        level: 70,
        icon: SiMongodb,
        experience: "1+ years",
        projects: 3,
        description: "NoSQL document database for flexible data models",
        category: "Database"
      }
    ]
  },
  {
    name: "DevOps & Tools",
    icon: FaTools,
    color: "text-yellow-400",
    gradient: "from-yellow-500 to-orange-500",
    skills: [
      {
        name: "Git",
        level: 90,
        icon: SiGit,
        experience: "4+ years",
        projects: 20,
        description: "Version control, branching strategies, and collaboration",
        category: "Tools"
      },
      {
        name: "GitHub",
        level: 88,
        icon: SiGithub,
        experience: "4+ years",
        projects: 15,
        description: "Code hosting, CI/CD, and project management",
        category: "Tools"
      },
      {
        name: "Vercel",
        level: 85,
        icon: SiVercel,
        experience: "3+ years",
        projects: 10,
        description: "Frontend deployment and edge functions",
        category: "Tools"
      },
      {
        name: "Netlify",
        level: 80,
        icon: SiNetlify,
        experience: "2+ years",
        projects: 6,
        description: "Static site deployment and form handling",
        category: "Tools"
      },
      {
        name: "Docker",
        level: 70,
        icon: SiDocker,
        experience: "1+ years",
        projects: 3,
        description: "Containerization for consistent development environments",
        category: "Tools"
      },
      {
        name: "AWS",
        level: 65,
        icon: FaCloud,
        experience: "1+ years",
        projects: 2,
        description: "Cloud infrastructure and serverless deployments",
        category: "Tools"
      }
    ]
  },
  {
    name: "Specialized Skills",
    icon: FaBrain,
    color: "text-indigo-400",
    gradient: "from-indigo-500 to-purple-500",
    skills: [
      {
        name: "Performance Optimization",
        level: 85,
        icon: FaRocket,
        experience: "3+ years",
        projects: 8,
        description: "Web vitals, code splitting, and performance monitoring",
        category: "Specialized"
      },
      {
        name: "Real-time Systems",
        level: 80,
        icon: FaServer,
        experience: "2+ years",
        projects: 5,
        description: "WebSockets, Server-Sent Events, and live updates",
        category: "Specialized"
      },
      {
        name: "Payment Integration",
        level: 75,
        icon: SiStripe,
        experience: "2+ years",
        projects: 4,
        description: "Stripe, PayPal, and secure payment processing",
        category: "Specialized"
      },
      {
        name: "Responsive Design",
        level: 90,
        icon: FaMobile,
        experience: "4+ years",
        projects: 15,
        description: "Mobile-first design and cross-device compatibility",
        category: "Specialized"
      },
      {
        name: "UI/UX Design",
        level: 75,
        icon: SiFigma,
        experience: "2+ years",
        projects: 8,
        description: "User interface design and user experience optimization",
        category: "Specialized"
      },
      {
        name: "GraphQL",
        level: 70,
        icon: SiGraphql,
        experience: "1+ years",
        projects: 3,
        description: "Query language for APIs and data fetching",
        category: "Specialized"
      }
    ]
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6
    }
  }
};

const categoryVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
      duration: 0.6
    }
  }
};

const skillVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20
    }
  }
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const totalSkills = skillCategories.reduce((acc, category) => acc + category.skills.length, 0);
  const averageLevel = Math.round(
    skillCategories.reduce((acc, category) => 
      acc + category.skills.reduce((skillAcc, skill) => skillAcc + skill.level, 0), 0
    ) / totalSkills
  );

  return (
    <section id="skills" className="relative py-12 sm:py-16 lg:py-32 overflow-hidden bg-white">
      {/* Minimal Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
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
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-full text-neutral-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            <span className="w-2 h-2 bg-neutral-900 rounded-full" />
            Technical Expertise
          </motion.div>
          
          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2 text-neutral-900">
            Skills & Technologies
          </h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-2 mb-8"
          >
            A comprehensive overview of my technical skills, tools, and technologies. 
            From frontend frameworks to backend systems, I build end-to-end solutions.
          </motion.p>

          {/* Skills Overview Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">{totalSkills}</div>
              <div className="text-sm text-neutral-500">Skills</div>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">{skillCategories.length}</div>
              <div className="text-sm text-neutral-500">Categories</div>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">{averageLevel}%</div>
              <div className="text-sm text-neutral-500">Avg Proficiency</div>
            </div>
            <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">5+</div>
              <div className="text-sm text-neutral-500">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(index);
                  analytics.trackPortfolioEvent.viewSkillCategory(category.name);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                  selectedCategory === index
                    ? 'bg-neutral-900 text-white border border-neutral-900'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-900 hover:text-neutral-900'
                }`}
              >
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Category Header */}
          <motion.div
            variants={categoryVariants}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4 text-2xl sm:text-3xl font-bold text-neutral-900">
              {(() => {
                const IconComponent = skillCategories[selectedCategory].icon;
                return <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />;
              })()}
              {skillCategories[selectedCategory].name}
            </div>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              {selectedCategory === 0 && "Building modern, responsive, and performant user interfaces"}
              {selectedCategory === 1 && "Server-side development and API architecture"}
              {selectedCategory === 2 && "Data storage, management, and optimization"}
              {selectedCategory === 3 && "Development tools and deployment platforms"}
              {selectedCategory === 4 && "Advanced techniques and specialized knowledge"}
            </p>
          </motion.div>

          {/* Skills List */}
          <div className="grid gap-4 sm:gap-6">
            {skillCategories[selectedCategory].skills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  variants={skillVariants}
                  className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-6 hover:border-neutral-900 transition-all duration-300 group"
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 sm:p-3 bg-neutral-100 rounded-xl">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-900" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-semibold text-neutral-900">{skill.name}</h4>
                        <div className="flex items-center gap-3 text-sm text-neutral-600">
                          <span>{skill.experience}</span>
                          <span>•</span>
                          <span>{skill.projects} projects</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-neutral-900">{skill.level}%</div>
                      <div className="text-xs text-neutral-500">Proficiency</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-neutral-100 rounded-full h-2 sm:h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-neutral-900 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: 0.2 + index * 0.1, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-12 lg:mt-16"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="#contact"
              className="group px-8 py-4 bg-neutral-900 hover:bg-neutral-800 rounded-xl font-semibold text-white relative overflow-hidden transition-colors"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let&apos;s Work Together
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </a>
          </motion.div>
          <p className="text-neutral-500 text-sm mt-4">
            Ready to bring your project to life with these technologies
          </p>
        </motion.div>
      </div>
    </section>
  );
}