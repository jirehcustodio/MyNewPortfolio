// Google Analytics configuration and utilities
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Google Analytics types
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string | Date,
      config?: {
        page_title?: string;
        page_location?: string;
        custom_map?: { [key: string]: string };
        [key: string]: unknown;
      }
    ) => void;
  }
}

// Check if GA is enabled
export const isGAEnabled = GA_TRACKING_ID && typeof window !== 'undefined';

// Page view tracking
export const pageview = (url: string, title?: string) => {
  if (isGAEnabled) {
    window.gtag('config', GA_TRACKING_ID!, {
      page_location: url,
      page_title: title,
    });
  }
};

// Event tracking
interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GAEvent) => {
  if (isGAEnabled) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Portfolio specific events
export const trackPortfolioEvent = {
  // Navigation events
  navigateToSection: (section: string) => {
    event({
      action: 'navigate_to_section',
      category: 'Navigation',
      label: section,
    });
  },

  // Project interaction events
  viewProject: (projectName: string, projectType: string) => {
    event({
      action: 'view_project',
      category: 'Projects',
      label: `${projectName} - ${projectType}`,
    });
  },

  openProjectDemo: (projectName: string) => {
    event({
      action: 'open_demo',
      category: 'Projects',
      label: projectName,
    });
  },

  viewSourceCode: (projectName: string) => {
    event({
      action: 'view_source',
      category: 'Projects',
      label: projectName,
    });
  },

  // Skills interaction events
  viewSkillCategory: (category: string) => {
    event({
      action: 'view_skill_category',
      category: 'Skills',
      label: category,
    });
  },

  // Blog interaction events
  readBlogPost: (postTitle: string, readTime?: number) => {
    event({
      action: 'read_blog_post',
      category: 'Blog',
      label: postTitle,
      value: readTime,
    });
  },

  searchBlog: (searchTerm: string) => {
    event({
      action: 'search_blog',
      category: 'Blog',
      label: searchTerm,
    });
  },

  // Contact events
  submitContactForm: (formType: string = 'contact') => {
    event({
      action: 'submit_form',
      category: 'Contact',
      label: formType,
    });
  },

  downloadResume: () => {
    event({
      action: 'download_resume',
      category: 'Contact',
      label: 'PDF Resume',
    });
  },

  // Testimonial events
  viewTestimonial: (testimonialId: string) => {
    event({
      action: 'view_testimonial',
      category: 'Testimonials',
      label: testimonialId,
    });
  },

  submitTestimonial: () => {
    event({
      action: 'submit_testimonial',
      category: 'Testimonials',
      label: 'User Submission',
    });
  },

  // Engagement events
  timeOnSite: (timeSpent: number) => {
    event({
      action: 'time_on_site',
      category: 'Engagement',
      label: 'Minutes Spent',
      value: Math.round(timeSpent / 60000), // Convert to minutes
    });
  },

  scrollDepth: (percentage: number) => {
    event({
      action: 'scroll_depth',
      category: 'Engagement',
      label: `${percentage}% Scrolled`,
      value: percentage,
    });
  },

  audioFeedback: (action: 'play' | 'complete') => {
    event({
      action: 'audio_feedback',
      category: 'UX',
      label: action,
    });
  },

  // Social sharing events
  sharePortfolio: (platform: string) => {
    event({
      action: 'share_portfolio',
      category: 'Social',
      label: platform,
    });
  },

  // Error tracking
  trackError: (errorType: string, errorMessage: string) => {
    event({
      action: 'error',
      category: 'Errors',
      label: `${errorType}: ${errorMessage}`,
    });
  },

  // Performance tracking
  trackPerformance: (metric: string, value: number) => {
    event({
      action: 'performance_metric',
      category: 'Performance',
      label: metric,
      value: Math.round(value),
    });
  },
};

// Advanced tracking utilities
export const trackUserJourney = {
  startSession: () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio_session_start', Date.now().toString());
      trackPortfolioEvent.navigateToSection('Landing');
    }
  },

  endSession: () => {
    if (typeof window !== 'undefined') {
      const startTime = sessionStorage.getItem('portfolio_session_start');
      if (startTime) {
        const sessionDuration = Date.now() - parseInt(startTime);
        trackPortfolioEvent.timeOnSite(sessionDuration);
      }
    }
  },
};

// Scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let maxScrollDepth = 0;
  const scrollMilestones = [25, 50, 75, 90, 100];
  const trackedMilestones = new Set<number>();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = Math.round((scrollTop / documentHeight) * 100);

    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;

      // Track milestone achievements
      scrollMilestones.forEach(milestone => {
        if (scrollDepth >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);
          trackPortfolioEvent.scrollDepth(milestone);
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Cleanup function
  return () => window.removeEventListener('scroll', handleScroll);
};

// Performance tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Track basic performance metrics
  if ('performance' in window && 'getEntriesByType' in window.performance) {
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        
        trackPortfolioEvent.trackPerformance('Page Load Time', loadTime);
        trackPortfolioEvent.trackPerformance('DOM Content Loaded', domContentLoaded);
      }
    } catch {
      // Performance API not available or failed
    }
  }
};

// Device and browser tracking
export const trackUserEnvironment = () => {
  if (typeof window === 'undefined') return;

  const userAgent = navigator.userAgent;
  const screenResolution = `${screen.width}x${screen.height}`;
  
  // Track device type
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent) || 
                   (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  let deviceType = 'Desktop';
  if (isMobile) deviceType = 'Mobile';
  else if (isTablet) deviceType = 'Tablet';

  event({
    action: 'user_environment',
    category: 'User Info',
    label: `${deviceType} - ${screenResolution}`,
  });
};

const analytics = {
  pageview,
  event,
  trackPortfolioEvent,
  trackUserJourney,
  initScrollTracking,
  trackWebVitals,
  trackUserEnvironment,
  isGAEnabled,
};

export default analytics;