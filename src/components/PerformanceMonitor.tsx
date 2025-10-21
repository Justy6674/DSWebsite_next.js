'use client';

import { useEffect } from 'react';

// Performance monitoring component for Core Web Vitals
export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            // Track LCP for monitoring
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                name: 'LCP',
                value: Math.round(entry.startTime),
                custom_map: { metric_id: 'LCP' }
              });
            }
          }
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            const event = entry as PerformanceEventTiming as any;
            const delay = (event.processingStart || 0) - (event.startTime || 0);
            console.log('FID:', delay);
            if (window.gtag) {
              window.gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round(delay),
                custom_map: { metric_id: 'FID' }
              });
            }
          }
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Report CLS when page is about to unload
      const reportCLS = () => {
        console.log('CLS:', clsValue);
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000) / 1000,
            custom_map: { metric_id: 'CLS' }
          });
        }
      };

      // Report CLS on visibility change or page unload
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportCLS();
        }
      });

      window.addEventListener('beforeunload', reportCLS);

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        document.removeEventListener('visibilitychange', reportCLS);
        window.removeEventListener('beforeunload', reportCLS);
      };
    }
  }, []);

  return null;
}

// Global types for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}