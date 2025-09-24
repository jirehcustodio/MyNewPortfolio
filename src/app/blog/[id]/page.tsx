'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaEye, FaHeart, FaShare, FaTwitter, FaLinkedin, FaFacebook, FaCopy, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { Article, getArticleById } from '../../lib/articles';
import { useLanguage } from '../../lib/useLanguage';
import { useArticleAnalytics } from '../../lib/useArticleAnalytics';

// Utility function for consistent date formatting (prevents hydration mismatch)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export default function ArticlePage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const { getAnalytics, incrementViews, toggleLike } = useArticleAnalytics();

  useEffect(() => {
    const foundArticle = getArticleById(id);
    setArticle(foundArticle || null);
    setIsLoading(false);
    
    // Increment views when article is loaded
    if (foundArticle) {
      incrementViews(id);
    }
  }, [id, incrementViews]);

  const handleLike = () => {
    toggleLike(id);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnTwitter = () => {
    if (!article) return;
    const text = `📖 Just read an amazing article: "${article.title}" by ${article.author}`;
    const hashtags = article.tags.join(',');
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    if (!article) return;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.excerpt)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnFacebook = () => {
    if (!article) return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnWhatsApp = () => {
    if (!article) return;
    const text = `Check out this article: ${article.title} ${shareUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareOnTelegram = () => {
    if (!article) return;
    const text = `Check out this article: ${article.title}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Article Not Found' : 'Hindi Nahanap ang Artikulo'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {language === 'en' ? 'The article you are looking for does not exist.' : 'Ang artikulong inyong hinahanap ay hindi umiiral.'}
          </p>
          <Link href="/blog" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            {language === 'en' ? 'Back to Blog' : 'Bumalik sa Blog'}
          </Link>
        </div>
      </div>
    );
  }

  const analytics = getAnalytics(id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-300 justify-center">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-3">
                {article.author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">{article.author}</p>
                <p className="text-sm">{formatDate(article.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center">
                <FaClock className="mr-1" />
                {article.readTime}
              </span>
              <span className="flex items-center">
                <FaEye className="mr-1" />
                {analytics.views.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.header>

        {/* Hero Image */}
        <motion.div 
          className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`relative w-full h-64 md:h-96 flex items-center justify-center ${
            article.category === 'Development' 
              ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700'
              : article.category === 'Technology' 
              ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600'
              : article.category === 'Security'
              ? 'bg-gradient-to-br from-red-600 via-pink-600 to-rose-700'
              : 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700'
          }`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), 
                                 radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
                backgroundSize: '50px 50px, 25px 25px'
              }}></div>
            </div>

            {/* Professional Visual Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {article.category === 'Development' && (
                <>
                  {/* Code Editor Window */}
                  <div className="absolute top-8 left-8 w-32 h-20 bg-slate-900/30 rounded-lg border border-blue-400/20 backdrop-blur-sm">
                    <div className="flex gap-1 p-2">
                      <div className="w-2 h-2 bg-red-400/60 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-400/60 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400/60 rounded-full"></div>
                    </div>
                    <div className="px-2 space-y-1">
                      <div className="w-20 h-1 bg-blue-400/50 rounded"></div>
                      <div className="w-16 h-1 bg-purple-400/50 rounded"></div>
                      <div className="w-24 h-1 bg-indigo-400/50 rounded"></div>
                    </div>
                  </div>
                  {/* Floating Code Brackets */}
                  <div className="absolute top-1/3 right-12 text-6xl font-mono text-white/15 select-none">{"<>"}</div>
                  <div className="absolute bottom-1/3 left-1/3 text-4xl font-mono text-white/10 select-none">{"{ }"}</div>
                  {/* Component Tree */}
                  <div className="absolute bottom-12 right-8 w-24 h-16 border-l-2 border-t-2 border-blue-400/20 rounded-tl-lg">
                    <div className="absolute top-0 left-4 w-8 h-0.5 bg-purple-400/30"></div>
                    <div className="absolute top-4 left-4 w-12 h-0.5 bg-indigo-400/30"></div>
                    <div className="absolute top-8 left-8 w-6 h-0.5 bg-blue-400/30"></div>
                  </div>
                </>
              )}
              {article.category === 'Technology' && (
                <>
                  {/* Server Rack Visualization */}
                  <div className="absolute top-12 left-12 w-20 h-24 bg-emerald-900/30 rounded border border-emerald-400/20 backdrop-blur-sm">
                    <div className="p-2 space-y-1">
                      <div className="w-full h-2 bg-emerald-400/40 rounded"></div>
                      <div className="w-full h-2 bg-teal-400/40 rounded"></div>
                      <div className="w-full h-2 bg-cyan-400/40 rounded"></div>
                      <div className="flex gap-1 mt-2">
                        <div className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        <div className="w-2 h-2 bg-teal-400/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      </div>
                    </div>
                  </div>
                  {/* Network Nodes */}
                  <div className="absolute top-1/2 right-16 w-3 h-3 bg-cyan-400/40 rounded-full"></div>
                  <div className="absolute top-1/2 right-24 w-3 h-3 bg-teal-400/40 rounded-full"></div>
                  <div className="absolute top-1/2 right-32 w-3 h-3 bg-emerald-400/40 rounded-full"></div>
                  {/* Connection Lines */}
                  <div className="absolute top-1/2 right-16 w-8 h-0.5 bg-gradient-to-r from-cyan-400/30 to-teal-400/30"></div>
                  <div className="absolute top-1/2 right-24 w-8 h-0.5 bg-gradient-to-r from-teal-400/30 to-emerald-400/30"></div>
                  {/* Data Flow Animation */}
                  <div className="absolute bottom-16 left-1/3 w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"></div>
                </>
              )}
              {article.category === 'Security' && (
                <>
                  {/* Digital Lock */}
                  <div className="absolute top-16 left-16 w-16 h-20 border-2 border-red-400/30 rounded-lg bg-red-900/20 backdrop-blur-sm">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 border-2 border-rose-400/40 rounded-full"></div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-400/50 rounded-full animate-pulse"></div>
                  </div>
                  {/* Encryption Visualization */}
                  <div className="absolute top-1/3 right-12 font-mono text-white/20 text-sm leading-tight select-none">
                    101010<br/>
                    011101<br/>
                    110010<br/>
                    010111
                  </div>
                  {/* Security Shield */}
                  <div className="absolute bottom-20 right-20 w-12 h-14 bg-gradient-to-b from-pink-400/20 to-red-400/20 rounded-t-full border border-rose-400/30">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/40 rounded-full"></div>
                  </div>
                  {/* Fingerprint Scanner */}
                  <div className="absolute bottom-12 left-1/4 w-10 h-10">
                    <div className="absolute inset-0 border border-red-400/20 rounded-full"></div>
                    <div className="absolute inset-1 border border-rose-400/25 rounded-full"></div>
                    <div className="absolute inset-2 border border-pink-400/30 rounded-full"></div>
                    <div className="absolute inset-3 border border-red-400/35 rounded-full"></div>
                  </div>
                </>
              )}
            </div>
            
            {/* Content */}
            <div className="relative text-center text-white p-8 max-w-4xl z-10">
              {/* Professional Category Icon */}
              <div className="mb-6 flex justify-center">
                {article.category === 'Development' && (
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center">
                    <div className="text-3xl font-mono text-white/90">{"</>"}</div>
                  </div>
                )}
                {article.category === 'Technology' && (
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center">
                    <div className="relative">
                      <div className="w-8 h-8 border-2 border-white/60 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full"></div>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
                {article.category === 'Security' && (
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center">
                    <div className="relative">
                      <div className="w-6 h-8 border-2 border-white/60 rounded-t-md"></div>
                      <div className="w-8 h-6 bg-white/20 rounded-sm -mt-1 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
                {!['Development', 'Technology', 'Security'].includes(article.category) && (
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center">
                    <div className="w-8 h-10 bg-white/20 rounded border border-white/30"></div>
                  </div>
                )}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                {article.title}
              </h2>
              <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
                {article.excerpt}
              </p>
              
              {/* Article Tags */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="inline-block bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                  {article.category}
                </span>
                {article.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Reading Stats */}
              <div className="mt-4 flex justify-center gap-6 text-sm opacity-80">
                <span className="flex items-center gap-1">
                  <FaEye />
                  {analytics.views.toLocaleString()} views
                </span>
                <span className="flex items-center gap-1">
                  <FaClock />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Actions Bar */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-4 mb-12 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Like Button */}
          <motion.button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              analytics.isLiked 
                ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-red-100 hover:text-red-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart className={analytics.isLiked ? 'text-red-500' : ''} />
            <span>{analytics.likes}</span>
          </motion.button>

          {/* Views Counter */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            <FaEye />
            <span>{analytics.views.toLocaleString()}</span>
          </div>

          {/* Share Dropdown */}
          <div className="relative group">
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full hover:bg-blue-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShare />
              <span>Share</span>
            </motion.button>

            {/* Share Options */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 flex gap-2">
                <motion.button
                  onClick={shareOnTwitter}
                  className="p-2 text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                  whileHover={{ scale: 1.1 }}
                  title="Share on Twitter"
                >
                  <FaTwitter />
                </motion.button>
                <motion.button
                  onClick={shareOnLinkedIn}
                  className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                  whileHover={{ scale: 1.1 }}
                  title="Share on LinkedIn"
                >
                  <FaLinkedin />
                </motion.button>
                <motion.button
                  onClick={shareOnFacebook}
                  className="p-2 text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                  whileHover={{ scale: 1.1 }}
                  title="Share on Facebook"
                >
                  <FaFacebook />
                </motion.button>
                <motion.button
                  onClick={shareOnWhatsApp}
                  className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded"
                  whileHover={{ scale: 1.1 }}
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp />
                </motion.button>
                <motion.button
                  onClick={shareOnTelegram}
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                  whileHover={{ scale: 1.1 }}
                  title="Share on Telegram"
                >
                  <FaTelegram />
                </motion.button>
                <motion.button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
                  whileHover={{ scale: 1.1 }}
                  title="Copy Link"
                >
                  <FaCopy />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div 
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-pink-600 dark:prose-code:text-pink-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          dangerouslySetInnerHTML={{ 
            __html: article.content
              .replace(/```[\s\S]*?```/g, (match) => {
                const code = match.replace(/```(\w+)?\n?/, '').replace(/```$/, '');
                const language = match.match(/```(\w+)/)?.[1] || 'text';
                return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto"><code class="language-${language}">${code}</code></pre>`;
              })
              .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
              .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6 leading-tight">$1</h1>')
              .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">$1</h2>')
              .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-3">$1</h3>')
              .replace(/^\* (.+)$/gm, '<li class="text-gray-700 dark:text-gray-300 mb-2">$1</li>')
              .replace(/^(\d+)\. (.+)$/gm, '<li class="text-gray-700 dark:text-gray-300 mb-2">$2</li>')
              .replace(/\n\n/g, '</p><p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">')
              .replace(/^\w/gm, '<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">$&')
              .replace(/$(?=\w)/gm, '</p>')
          }}
        />

        {/* Article Tags */}
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Tags:' : 'Mga Tag:'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div 
          className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-start">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl mr-4 flex-shrink-0">
              {article.author.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'About the Author' : 'Tungkol sa May-akda'}
              </h3>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {article.author}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {article.authorBio}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Link 
            href="/blog"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            {language === 'en' ? 'Back to All Articles' : 'Bumalik sa Lahat ng Artikulo'}
          </Link>
        </motion.div>
      </article>
    </div>
  );
}