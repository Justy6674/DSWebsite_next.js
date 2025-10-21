'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
}

/**
 * Reusable SEO head component for Downscale Weight Loss Clinic
 * Implements the specification from the problem statement:
 * - Dynamic title, description, and canonical URL
 * - Open Graph and Twitter Card tags
 * - Default canonical URL based on current pathname
 * - Australian English optimized content
 */
export const SeoHead: React.FC<SeoHeadProps> = ({ 
  title, 
  description, 
  canonical, 
  noindex = false 
}) => {
  const pathname = usePathname();
  
  useEffect(() => {
    // Set page title
    document.title = title;
    
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Set canonical URL - default to absolute URL based on pathname
    const canonicalUrl = canonical || `https://www.downscale.com.au${pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
    
    // Set robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    
    // Open Graph tags
    const ogTags = [
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:site_name', content: 'Downscale Weight Loss Clinic' },
      { property: 'og:locale', content: 'en_AU' }
    ];
    
    ogTags.forEach(({ property, content }) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    });
    
    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:site', content: '@DownscaleAU' },
      { name: 'twitter:creator', content: '@DownscaleAU' }
    ];
    
    twitterTags.forEach(({ name, content }) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    });
    
    // Update hreflang for Australian content
    let hreflangTag = document.querySelector('link[rel="alternate"][hreflang="en-AU"]');
    if (!hreflangTag) {
      hreflangTag = document.createElement('link');
      hreflangTag.setAttribute('rel', 'alternate');
      hreflangTag.setAttribute('hreflang', 'en-AU');
      document.head.appendChild(hreflangTag);
    }
    hreflangTag.setAttribute('href', canonicalUrl);
    
    // Cleanup function
    return () => {
      // Note: We don't cleanup meta tags as they might be used by other components
      // This follows React's best practices for SEO components
    };
  }, [title, description, canonical, pathname, noindex]);

  return null; // This component doesn't render anything visible
};

// Export individual utility functions for advanced usage
export const updatePageTitle = (title: string) => {
  document.title = title;
};

export const updateMetaDescription = (description: string) => {
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);
};

export const updateCanonical = (url: string) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
};

// Utility function to validate SEO content according to best practices
export const validateSEOContent = (title: string, description: string) => {
  const issues = [];
  
  if (title.length > 60) {
    issues.push('Title too long (should be ≤ 60 characters)');
  }
  
  if (title.length < 10) {
    issues.push('Title too short (should be ≥ 10 characters)');
  }
  
  if (description.length > 160) {
    issues.push('Description too long (should be ≤ 160 characters)');  
  }
  
  if (description.length < 120) {
    issues.push('Description too short (should be ≥ 120 characters for optimal snippet)');
  }
  
  // Check for Australian English specific terms
  const australianTerms = ['telehealth', 'medicare', 'bulk bill', 'practitioner', 'australia'];
  const hasAustralianContext = australianTerms.some(term => 
    title.toLowerCase().includes(term) || description.toLowerCase().includes(term)
  );
  
  if (!hasAustralianContext) {
    issues.push('Consider adding Australian-specific terminology (Medicare, telehealth, Australia, etc.)');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    score: Math.max(0, 100 - (issues.length * 20))
  };
};

export default SeoHead;