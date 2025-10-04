"use client";

import { useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import analytics from '../lib/analytics';

interface AnalyticsProviderProps {
  children: ReactNode;
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics on mount
    if (analytics.isGAEnabled) {
      // Track initial page view
      analytics.pageview(window.location.href, document.title);
      
      // Initialize scroll tracking
      const cleanupScroll = analytics.initScrollTracking();
      
      // Track user environment
      analytics.trackUserEnvironment();
      
      // Track web vitals
      analytics.trackWebVitals();
      
      // Start user journey tracking
      analytics.trackUserJourney.startSession();

      // Track page unload
      const handleUnload = () => {
        analytics.trackUserJourney.endSession();
      };

      window.addEventListener('beforeunload', handleUnload);

      // Cleanup function
      return () => {
        if (cleanupScroll) cleanupScroll();
        window.removeEventListener('beforeunload', handleUnload);
      };
    }
  }, []);

  // Track route changes
  useEffect(() => {
    if (analytics.isGAEnabled && pathname) {
      analytics.pageview(window.location.href, document.title);
    }
  }, [pathname]);

  return <>{children}</>;
}