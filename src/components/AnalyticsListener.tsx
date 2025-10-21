'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const AnalyticsListener = () => {
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      // Track pageview for both GA4 properties
      window.gtag('config', 'G-W86HGMF6X2', {
        page_path: pathname + searchParams.toString(),
        send_page_view: true
      });
      
      window.gtag('config', 'G-G4CL3VY5P3', {
        page_path: pathname + searchParams.toString(),
        send_page_view: true
      });
    }
  }, [location]);

  return null;
};
const pathname = usePathname();
const searchParams = useSearchParams();