'use client';

import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';

interface VitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const sendToAnalytics = (metric: VitalMetric) => {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.rating,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating
    });
  }
};

export const reportWebVitals = () => {
  onCLS((metric) => sendToAnalytics({
    name: 'CLS',
    value: metric.value,
    rating: metric.rating || 'needs-improvement'
  }));
  
  
  onFCP((metric) => sendToAnalytics({
    name: 'FCP',
    value: metric.value,
    rating: metric.rating || 'needs-improvement'
  }));
  
  onLCP((metric) => sendToAnalytics({
    name: 'LCP',
    value: metric.value,
    rating: metric.rating || 'needs-improvement'
  }));
  
  onTTFB((metric) => sendToAnalytics({
    name: 'TTFB',
    value: metric.value,
    rating: metric.rating || 'needs-improvement'
  }));
  
  onINP((metric) => sendToAnalytics({
    name: 'INP',
    value: metric.value,
    rating: metric.rating || 'needs-improvement'
  }));
};