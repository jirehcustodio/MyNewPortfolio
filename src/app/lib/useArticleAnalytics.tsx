'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ArticleAnalytics {
  likes: number;
  views: number;
  isLiked: boolean;
}

interface ArticleAnalyticsContextType {
  analytics: { [articleId: number]: ArticleAnalytics };
  incrementViews: (articleId: number) => void;
  toggleLike: (articleId: number) => void;
  getAnalytics: (articleId: number) => ArticleAnalytics;
}

const ArticleAnalyticsContext = createContext<ArticleAnalyticsContextType | undefined>(undefined);

export const useArticleAnalytics = () => {
  const context = useContext(ArticleAnalyticsContext);
  if (!context) {
    throw new Error('useArticleAnalytics must be used within ArticleAnalyticsProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const ArticleAnalyticsProvider: React.FC<Props> = ({ children }) => {
  const [analytics, setAnalytics] = useState<{ [articleId: number]: ArticleAnalytics }>({});

  // Initialize analytics data from localStorage or default values
  useEffect(() => {
    const savedAnalytics = localStorage.getItem('articleAnalytics');
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    } else {
      // Initialize with default values
      const defaultAnalytics = {
        1: { likes: 124, views: 2847, isLiked: false },
        2: { likes: 89, views: 1923, isLiked: false },
        3: { likes: 156, views: 3421, isLiked: false }
      };
      setAnalytics(defaultAnalytics);
      localStorage.setItem('articleAnalytics', JSON.stringify(defaultAnalytics));
    }
  }, []);

  // Simulate occasional real-time updates (much less frequent)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          const articleId = parseInt(key);
          // Very rarely increment views (simulate occasional real visitors)
          if (Math.random() < 0.05) { // 5% chance every 30 seconds
            updated[articleId] = {
              ...updated[articleId],
              views: updated[articleId].views + 1
            };
          }
          // Very rarely increment likes (simulate occasional engagement)
          if (Math.random() < 0.02) { // 2% chance every 30 seconds
            updated[articleId] = {
              ...updated[articleId],
              likes: updated[articleId].likes + 1
            };
          }
        });
        
        // Save to localStorage
        localStorage.setItem('articleAnalytics', JSON.stringify(updated));
        return updated;
      });
    }, 30000); // Update every 30 seconds (less frequent)

    return () => clearInterval(interval);
  }, []);

  const incrementViews = (articleId: number) => {
    // Check if this article was already viewed in this session
    const sessionKey = `viewed_article_${articleId}`;
    const alreadyViewed = sessionStorage.getItem(sessionKey);
    
    if (!alreadyViewed) {
      // Mark as viewed in this session
      sessionStorage.setItem(sessionKey, 'true');
      
      setAnalytics(prev => {
        const updated = {
          ...prev,
          [articleId]: {
            ...prev[articleId],
            views: (prev[articleId]?.views || 0) + 1
          }
        };
        localStorage.setItem('articleAnalytics', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const toggleLike = (articleId: number) => {
    setAnalytics(prev => {
      const currentAnalytics = prev[articleId] || { likes: 0, views: 0, isLiked: false };
      const updated = {
        ...prev,
        [articleId]: {
          ...currentAnalytics,
          likes: currentAnalytics.isLiked 
            ? Math.max(0, currentAnalytics.likes - 1)
            : currentAnalytics.likes + 1,
          isLiked: !currentAnalytics.isLiked
        }
      };
      localStorage.setItem('articleAnalytics', JSON.stringify(updated));
      return updated;
    });
  };

  const getAnalytics = (articleId: number): ArticleAnalytics => {
    return analytics[articleId] || { likes: 0, views: 0, isLiked: false };
  };

  return (
    <ArticleAnalyticsContext.Provider value={{
      analytics,
      incrementViews,
      toggleLike,
      getAnalytics
    }}>
      {children}
    </ArticleAnalyticsContext.Provider>
  );
};