'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Pages that should not be indexed
const NOINDEX_PATHS = [
  '/admin',
  '/blog-admin',
  '/404',
  '/terms',
  '/privacy',
  '/data-deletion',
  '/complaints',
  '/password',
  '/collections',
  '/products'
];

export const useRobotsMeta = () => {
  const pathname = usePathname();
  
  useEffect(() => {
    const shouldNoindex = NOINDEX_PATHS.some(path => 
      pathname.startsWith(path)
    );
    
    let robotsMeta = document.querySelector('meta[name="robots"]');
    
    if (shouldNoindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    } else {
      // Reset to default indexing for other pages
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      }
    }
  }, [pathname]);
};