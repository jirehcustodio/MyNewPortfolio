'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { FaSearch, FaCalendar, FaClock, FaEye, FaHeart, FaArrowLeft, FaShare } from 'react-icons/fa';
import { getAllArticles } from '../lib/articles';
import { useLanguage } from '../lib/useLanguage';
import { useArticleAnalytics } from '../lib/useArticleAnalytics';

// Utility function for consistent date formatting (prevents hydration mismatch)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default function BlogPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useLanguage();
  const { getAnalytics } = useArticleAnalytics();

  const articles = getAllArticles();
  const categories = ["All", "Development", "Technology", "Security"];

  // Filter articles based on category and search
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <FaArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {language === 'en' ? 'Blog & Articles' : 'Blog at mga Artikulo'}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {language === 'en' ? 'Latest Articles & Insights' : 'Pinakabagong mga Artikulo at Pananaw'}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              {language === 'en' 
                ? 'Explore in-depth articles on web development, technology trends, and software engineering best practices.'
                : 'Tuklasin ang mga malalimang artikulo tungkol sa web development, technology trends, at mga best practices sa software engineering.'
              }
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12" ref={ref}>
        {/* Search and Filter */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search articles...' : 'Maghanap ng artikulo...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white border-blue-600 transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <Link href={`/blog/${article.id}`}>
                {/* Article Cover Image */}
                <div className={`relative h-48 overflow-hidden ${
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
                  
                  {/* Featured Badge */}
                  {article.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ {language === 'en' ? 'Featured' : 'Tampok'}
                    </div>
                  )}

                  {/* Article Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs font-medium text-white/90 border border-white/10">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-white text-lg font-semibold line-clamp-2 leading-tight mb-1">
                      {article.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-1">
                      {article.readTime} • {formatDate(article.date)}
                    </p>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  {/* Category and Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-3">
                      <span className="flex items-center">
                        <FaEye className="mr-1" />
                        {getAnalytics(article.id).views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <FaHeart className="mr-1" />
                        {getAnalytics(article.id).likes}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center">
                        <FaCalendar className="mr-1" />
                        {formatDate(article.date)}
                      </span>
                      <span className="flex items-center">
                        <FaClock className="mr-1" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Author and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {article.author.charAt(0)}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {article.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const shareUrl = `${window.location.origin}/blog/${article.id}`;
                          const text = `Check out this article: "${article.title}" by ${article.author}`;
                          if (navigator.share) {
                            navigator.share({
                              title: article.title,
                              text: text,
                              url: shareUrl,
                            });
                          } else {
                            navigator.clipboard.writeText(shareUrl);
                            alert(language === 'en' ? 'Link copied!' : 'Link na-copy!');
                          }
                        }}
                        className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
                        title={language === 'en' ? 'Share article' : 'Ibahagi ang artikulo'}
                      >
                        <FaShare className="w-4 h-4" />
                      </button>
                      <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                        {language === 'en' ? 'Read More' : 'Basahin pa'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {language === 'en' ? 'No Articles Found' : 'Walang Natagpuang Artikulo'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {language === 'en' 
                ? 'Try adjusting your search terms or category filter.'
                : 'Subukan na baguhin ang inyong search terms o category filter.'
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {language === 'en' ? 'Clear Filters' : 'I-clear ang mga Filter'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}