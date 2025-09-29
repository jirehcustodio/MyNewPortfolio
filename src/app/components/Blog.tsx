"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { FaCalendar, FaClock, FaTag, FaSearch, FaArrowRight } from 'react-icons/fa';
import { getAllArticles } from '../lib/articles';

// Get articles from the main articles file
const articles = getAllArticles();

const categories = ["All", "Development", "Technology", "Security", "Performance", "Database"];

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter articles based on category and search
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

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

  const itemVariants = {
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

  return (
    <section id="blog" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800/50 to-neutral-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.1),transparent_50%)] opacity-60" />
      
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
            Latest Articles
          </motion.div>
          
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-pink-100 to-purple-200 bg-clip-text text-transparent">
              Blog & Insights
            </span>
          </h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
          >
            Thoughts on technology, development practices, and insights from my journey 
            in software engineering and system design.
          </motion.p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-full text-white placeholder-neutral-400 focus:outline-none focus:border-pink-400/50 backdrop-blur-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm ${
                  selectedCategory === category
                    ? 'bg-pink-500 text-white border border-pink-400'
                    : 'bg-neutral-800/50 text-neutral-300 border border-neutral-700/50 hover:border-pink-400/50 hover:text-pink-400'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-16"
          >
            <h4 className="text-2xl font-bold text-white mb-8 text-center">Featured Articles</h4>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.slice(0, 2).map((article) => (
                <motion.article
                  key={article.id}
                  variants={itemVariants}
                  className="group relative bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-3xl overflow-hidden hover:border-pink-400/30 transition-all duration-300"
                  whileHover={{ y: -8 }}
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-pink-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                    ⭐ FEATURED
                  </div>

                  {/* Article Cover Image */}
                  <div className={`h-48 relative overflow-hidden ${
                    article.category === 'Development' ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900' :
                    article.category === 'Technology' ? 'bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900' :
                    article.category === 'Security' ? 'bg-gradient-to-br from-red-900 via-rose-800 to-pink-900' :
                    'bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900'
                  }`}>
                    {/* Background Abstract Shapes */}
                    <div className="absolute inset-0">
                      {article.category === 'Development' && (
                        <>
                          {/* Code blocks pattern */}
                          <div className="absolute top-4 left-4 w-16 h-3 bg-blue-400/30 rounded"></div>
                          <div className="absolute top-8 left-6 w-12 h-3 bg-purple-400/30 rounded"></div>
                          <div className="absolute top-12 left-4 w-20 h-3 bg-indigo-400/30 rounded"></div>
                          {/* Brackets */}
                          <div className="absolute bottom-8 right-6 text-blue-300/40 text-4xl font-mono">{"{ }"}</div>
                          {/* Circuit pattern */}
                          <div className="absolute top-1/2 right-4 w-8 h-8 border-2 border-blue-400/20 rounded-full"></div>
                          <div className="absolute top-1/2 right-8 w-4 h-4 border-2 border-purple-400/20 rounded-full"></div>
                          <div className="absolute top-1/2 right-6 w-1 h-6 bg-blue-400/20"></div>
                        </>
                      )}
                      {article.category === 'Technology' && (
                        <>
                          {/* Circuit board pattern */}
                          <div className="absolute top-6 left-6 w-12 h-1 bg-emerald-400/30"></div>
                          <div className="absolute top-6 left-6 w-1 h-8 bg-emerald-400/30"></div>
                          <div className="absolute top-14 left-10 w-8 h-1 bg-teal-400/30"></div>
                          <div className="absolute top-10 right-8 w-6 h-6 border border-cyan-400/30 rounded"></div>
                          <div className="absolute bottom-12 left-8 w-4 h-4 bg-emerald-400/20 rounded-full"></div>
                          {/* Network nodes */}
                          <div className="absolute bottom-8 right-12 w-2 h-2 bg-teal-400/40 rounded-full"></div>
                          <div className="absolute bottom-6 right-8 w-2 h-2 bg-cyan-400/40 rounded-full"></div>
                          <div className="absolute bottom-10 right-6 w-2 h-2 bg-emerald-400/40 rounded-full"></div>
                          {/* Connecting lines */}
                          <div className="absolute bottom-8 right-8 w-4 h-0.5 bg-teal-400/20 rotate-45"></div>
                        </>
                      )}
                      {article.category === 'Security' && (
                        <>
                          {/* Shield pattern */}
                          <div className="absolute top-8 left-8 w-8 h-10 bg-red-400/20 clip-path-shield"></div>
                          {/* Lock elements */}
                          <div className="absolute top-6 right-8 w-6 h-4 border-2 border-rose-400/30 rounded-t-md"></div>
                          <div className="absolute top-9 right-7 w-8 h-6 bg-pink-400/20 rounded-sm"></div>
                          {/* Key pattern */}
                          <div className="absolute bottom-12 left-6 w-12 h-2 bg-red-400/25 rounded-full"></div>
                          <div className="absolute bottom-12 left-16 w-3 h-6 bg-rose-400/25"></div>
                          {/* Binary code effect */}
                          <div className="absolute bottom-8 right-4 text-red-300/20 text-xs font-mono">
                            101010<br/>010101<br/>101010
                          </div>
                        </>
                      )}
                    </div>

                    {/* Geometric overlay pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full" style={{
                        backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%),
                                         radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px, 20px 20px'
                      }}></div>
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    
                    {/* Article Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-medium text-white/90 border border-white/10">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight mb-1">
                        {article.title}
                      </h3>
                      <p className="text-white/70 text-xs line-clamp-1">
                        {article.readTime} • {article.date}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 lg:p-8">
                    {/* Article Meta */}
                    <div className="flex items-center gap-4 text-neutral-400 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaTag className="w-3 h-3" />
                        {article.category}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors">
                      {article.title}
                    </h3>

                    {/* Article Excerpt */}
                    <p className="text-neutral-300 leading-relaxed mb-6">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-neutral-700/50 border border-neutral-600/50 rounded-full text-xs font-medium text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Link
                      href={`/blog/${article.id}`}
                      className="inline-flex items-center gap-2 text-pink-400 font-medium hover:text-pink-300 transition-colors"
                    >
                      Read More
                      <FaArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
        >
          {regularArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={itemVariants}
              className="group bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-2xl overflow-hidden hover:border-pink-400/30 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Article Cover Image */}
              <div className={`h-40 relative overflow-hidden ${
                article.category === 'Development' ? 'bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800' :
                article.category === 'Technology' ? 'bg-gradient-to-br from-emerald-800 via-teal-700 to-cyan-800' :
                article.category === 'Security' ? 'bg-gradient-to-br from-red-800 via-rose-700 to-pink-800' :
                'bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-800'
              }`}>
                {/* Abstract Visual Elements */}
                <div className="absolute inset-0">
                  {article.category === 'Development' && (
                    <>
                      {/* Code window mockup */}
                      <div className="absolute top-3 left-3 w-20 h-12 bg-slate-900/40 rounded border border-blue-400/20">
                        <div className="flex gap-1 p-1">
                          <div className="w-1.5 h-1.5 bg-red-400/60 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-yellow-400/60 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-green-400/60 rounded-full"></div>
                        </div>
                        <div className="px-1 space-y-1">
                          <div className="w-12 h-0.5 bg-blue-400/40"></div>
                          <div className="w-8 h-0.5 bg-purple-400/40"></div>
                          <div className="w-14 h-0.5 bg-indigo-400/40"></div>
                        </div>
                      </div>
                      {/* Floating elements */}
                      <div className="absolute bottom-4 right-4 w-6 h-6 border border-blue-400/30 rounded rotate-45"></div>
                    </>
                  )}
                  {article.category === 'Technology' && (
                    <>
                      {/* Server rack mockup */}
                      <div className="absolute top-3 left-3 w-16 h-14 bg-emerald-900/40 rounded border border-emerald-400/20">
                        <div className="p-1 space-y-0.5">
                          <div className="w-full h-1 bg-emerald-400/30 rounded"></div>
                          <div className="w-full h-1 bg-teal-400/30 rounded"></div>
                          <div className="w-full h-1 bg-cyan-400/30 rounded"></div>
                          <div className="flex gap-0.5 mt-1">
                            <div className="w-1 h-1 bg-emerald-400/50 rounded-full"></div>
                            <div className="w-1 h-1 bg-teal-400/50 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      {/* Data flow lines */}
                      <div className="absolute bottom-6 right-6 w-8 h-0.5 bg-cyan-400/40"></div>
                      <div className="absolute bottom-4 right-8 w-0.5 h-4 bg-teal-400/40"></div>
                    </>
                  )}
                  {article.category === 'Security' && (
                    <>
                      {/* Security badge */}
                      <div className="absolute top-4 left-4 w-12 h-12 border-2 border-red-400/30 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-red-400/20 rounded-full"></div>
                      </div>
                      {/* Fingerprint pattern */}
                      <div className="absolute bottom-4 right-4 w-8 h-8">
                        <div className="absolute inset-0 border border-rose-400/20 rounded-full"></div>
                        <div className="absolute inset-1 border border-pink-400/20 rounded-full"></div>
                        <div className="absolute inset-2 border border-red-400/20 rounded-full"></div>
                      </div>
                    </>
                  )}
                </div>

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
                  }}></div>
                </div>

                {/* Category Badge */}
                <motion.div
                  className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-xs rounded backdrop-blur-sm border border-white/10"
                >
                  {article.category}
                </motion.div>

                {/* Content Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              <div className="p-6">
                {/* Article Meta */}
                <div className="flex items-center gap-4 text-neutral-400 text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendar className="w-3 h-3" />
                    {new Date(article.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-pink-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Article Excerpt */}
                <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neutral-700/50 rounded text-xs text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${article.id}`}
                  className="inline-flex items-center gap-2 text-pink-400 font-medium hover:text-pink-300 transition-colors text-sm"
                >
                  Read Article
                  <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl font-semibold text-white relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center gap-2">
                View All Articles
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}