'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

interface SEOHelmetProps {
  title?: string;
  description?: string;
  noindex?: boolean;
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({ 
  title, 
  description,
  noindex = false 
}) => {
  const pathname = usePathname();
  
  useEffect(() => {
    // Enhanced title targeting weight loss clinic
    if (title) {
      document.title = title.includes('Weight Loss Clinic') ? title : `${title} | Weight Loss Clinic Australia`;
    }
    
    // Update description with weight loss clinic focus
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
    
    // Add canonical URL to prevent duplicate content issues
    const canonicalUrl = `https://www.downscale.com.au${pathname}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
    
    // Enhanced keywords for weight loss clinic targeting
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    
    // Set location-specific or general weight loss clinic keywords
    let keywords = 'weight loss clinic Australia, telehealth weight loss clinic, weight loss clinic near me, telehealth weight loss Australia, Medicare weight loss clinic';
    if (pathname.includes('sydney')) {
      keywords = 'weight loss clinic sydney, sydney weight loss clinic, virtual weight loss clinic sydney, telehealth weight loss sydney, professional weight loss clinic sydney';
    } else if (pathname.includes('melbourne')) {
      keywords = 'weight loss clinic melbourne, melbourne weight loss clinic, virtual weight loss clinic melbourne, telehealth weight loss melbourne';
    } else if (pathname.includes('brisbane')) {
      keywords = 'weight loss clinic brisbane, brisbane weight loss clinic, virtual weight loss clinic brisbane, telehealth weight loss brisbane';
    } else if (pathname.includes('perth')) {
      keywords = 'weight loss clinic perth, perth weight loss clinic, virtual weight loss clinic perth, telehealth weight loss perth';
    } else if (pathname.includes('adelaide')) {
      keywords = 'weight loss clinic adelaide, adelaide weight loss clinic, virtual weight loss clinic adelaide, telehealth weight loss adelaide';
    }
    keywordsMeta.setAttribute('content', keywords);
    
    // Enhanced Open Graph for weight loss clinic
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title || 'Book Telehealth Weight Loss Consultation - Justin Black Nurse Practitioner Australia');
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description || "Book weight loss consultation with Nurse Practitioner Justin Black. Medicare bulk billed telehealth appointments. Call, book online, get treatment plan, lose weight safely across Australia.");
    
    // Ensure favicon is set properly for all pages
    const ensureFavicon = () => {
      const faviconUrl = '/lovable-uploads/32a049cc-72de-47b5-a542-d19255f97a4e.png';
      
      // Main favicon
      let favicon = document.querySelector('link[rel="icon"][type="image/png"]');
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        favicon.setAttribute('type', 'image/png');
        document.head.appendChild(favicon);
      }
      favicon.setAttribute('href', faviconUrl);
      
      // Apple touch icon
      let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
      if (!appleTouchIcon) {
        appleTouchIcon = document.createElement('link');
        appleTouchIcon.setAttribute('rel', 'apple-touch-icon');
        appleTouchIcon.setAttribute('sizes', '180x180');
        document.head.appendChild(appleTouchIcon);
      }
      appleTouchIcon.setAttribute('href', faviconUrl);
    };
    
    ensureFavicon();
    
    // Update hreflang for Australian targeting
    let hreflangAU = document.querySelector('link[hreflang="en-AU"]');
    if (!hreflangAU) {
      hreflangAU = document.createElement('link');
      hreflangAU.setAttribute('rel', 'alternate');
      hreflangAU.setAttribute('hreflang', 'en-AU');
      document.head.appendChild(hreflangAU);
    }
    hreflangAU.setAttribute('href', canonicalUrl);
    
    // Enhanced robots meta for better indexing
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    
    if (noindex) {
      robotsMeta.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
    } else {
      robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }
    
    // Update Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);
    
    // Add geographic targeting for Australia
    let geoRegion = document.querySelector('meta[name="geo.region"]');
    if (!geoRegion) {
      geoRegion = document.createElement('meta');
      geoRegion.setAttribute('name', 'geo.region');
      document.head.appendChild(geoRegion);
    }
    geoRegion.setAttribute('content', 'AU');
    
    // Cleanup function to restore original title
    return () => {
      if (title) {
        document.title = 'Book Telehealth Weight Loss Consultation - Justin Black Nurse Practitioner Australia';
      }
    };
  }, [title, description, pathname, noindex]);
  
  return null;
};