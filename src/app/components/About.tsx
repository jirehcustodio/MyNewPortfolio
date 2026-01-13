"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiFramer,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiMysql,
  SiMongodb,
  SiFigma,
  SiCisco,
  SiCloudflare
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const skills = [
  { name: "JavaScript", level: 90, color: "from-yellow-400 to-yellow-600", icon: SiJavascript },
  { name: "TypeScript", level: 85, color: "from-blue-500 to-blue-700", icon: SiTypescript },
  { name: "React", level: 85, color: "from-blue-400 to-blue-600", icon: SiReact },
  { name: "Next.js", level: 88, color: "from-gray-400 to-gray-600", icon: SiNextdotjs },
  { name: "Tailwind CSS", level: 90, color: "from-cyan-400 to-cyan-600", icon: SiTailwindcss },
  { name: "Framer Motion", level: 80, color: "from-purple-400 to-purple-600", icon: SiFramer },
  { name: "Node.js", level: 80, color: "from-green-400 to-green-600", icon: SiNodedotjs },
  { name: "Python", level: 85, color: "from-blue-500 to-blue-700", icon: SiPython },
  { name: "HTML/CSS", level: 95, color: "from-orange-400 to-orange-600", icon: SiHtml5 },
  { name: "Java", level: 80, color: "from-red-400 to-red-600", icon: FaJava },
  { name: "MySQL", level: 80, color: "from-blue-400 to-blue-600", icon: SiMysql },
  { name: "MongoDB", level: 75, color: "from-green-500 to-green-700", icon: SiMongodb },
  { name: "Figma", level: 85, color: "from-purple-500 to-pink-500", icon: SiFigma },
  { name: "Cisco Networking", level: 80, color: "from-blue-500 to-indigo-600", icon: SiCisco },
  { name: "Cloud Computing", level: 80, color: "from-cyan-400 to-cyan-600", icon: SiCloudflare }
];

const experiences = [
  { company: "LGU Naga - MyNaga App", role: "IT Support", duration: "2025 - Present" },
  { company: "BESO COSH", role: "Safety Officer 2", duration: "2024 - 2025" },
  { company: "LGU Naga City", role: "IT Support Engineer", duration: "2024" },
  { company: "Shot Studio", role: "Production Assistant Intern", duration: "2024 - 2025" },
  { company: "Self-employed", role: "Freelance Web Developer & Multimedia Specialist", duration: "2020 - Present" }
];

export default function About() {
  const ref = useRef(null);
  const skillsRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isSkillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)] opacity-60" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            About Me
          </motion.div>
          
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
              My Story
            </span>
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Story & Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Story */}
            <div className="space-y-6">
              <p className="text-neutral-300 text-lg lg:text-xl leading-relaxed">
                Hello! I&apos;m <span className="text-blue-400 font-semibold">Jireh Custodio</span>, 
                a detail-oriented Computer Engineering graduate from Naga City, Philippines, with expertise 
                spanning cloud computing, cybersecurity, web development, and multimedia production.
              </p>
              
              <p className="text-neutral-400 text-base lg:text-lg leading-relaxed">
                My professional journey includes serving as an IT Support Engineer at LGU Naga City, 
                where I supported cloud-based system deployments and maintained secure public digital 
                infrastructure. As a certified Cloud System Analyst and Safety Officer, I bring a unique 
                blend of technical depth and safety management expertise.
              </p>

              <p className="text-neutral-400 text-base lg:text-lg leading-relaxed">
                For over 3 years as a freelance developer and multimedia specialist, I&apos;ve helped 
                creatives and small businesses build compelling websites and multimedia solutions. 
                I thrive in fast-paced, innovation-driven environments where technology meets creativity.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                {["Cloud Systems Analyst", "Safety Officer", "Multimedia Specialist", "Network Security"].map((trait, index) => (
                  <motion.span
                    key={trait}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                    className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(59, 130, 246, 0.2)",
                      borderColor: "rgba(59, 130, 246, 0.4)"
                    }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-6"
            >
              <h4 className="text-2xl font-bold text-white mb-6">Experience</h4>
              
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ delay: 1 + (index * 0.1), duration: 0.5 }}
                    className="group relative pl-8 border-l-2 border-neutral-700 hover:border-blue-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="absolute -left-2 top-2 w-4 h-4 bg-blue-500 rounded-full"
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    <div className="pb-4">
                      <h5 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {exp.role}
                      </h5>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                      <p className="text-neutral-400 text-sm">{exp.duration}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            ref={skillsRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <h4 className="text-2xl font-bold text-white">Technical Skills</h4>
            
            <div className="grid gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                  className="group relative"
                  onHoverStart={() => setHoveredSkill(index)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  {/* Skill Item */}
                  <motion.div
                    className="relative p-4 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl backdrop-blur-sm overflow-hidden"
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: "rgba(59, 130, 246, 0.3)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <motion.span
                          className="text-xl"
                          animate={{ 
                            rotate: hoveredSkill === index ? [0, -10, 10, -10, 0] : 0 
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <skill.icon className="w-5 h-5" />
                        </motion.span>
                        <span className="font-semibold text-white">{skill.name}</span>
                      </div>
                      <motion.span
                        className="text-sm font-bold text-blue-400"
                        animate={{ 
                          scale: hoveredSkill === index ? 1.1 : 1 
                        }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-neutral-700 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        initial={{ width: 0 }}
                        animate={isSkillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ 
                          delay: 0.5 + (index * 0.1), 
                          duration: 1,
                          ease: "easeOut"
                        }}
                      >
                        {/* Shimmer Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "linear",
                            delay: 1 + (index * 0.1)
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20"
                      style={{
                        background: `linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)`
                      }}
                      animate={{ 
                        opacity: hoveredSkill === index ? 0.2 : 0 
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Download Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isSkillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="pt-6"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full group px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl font-semibold text-white relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  📄 Download Resume
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}