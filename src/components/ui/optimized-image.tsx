'use client';

import React, { useState, useRef, useEffect } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
  priority?: boolean
  lazy?: boolean
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width = 1920,
  height,
  quality = 85,
  format = 'png',
  priority = false,
  lazy = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!lazy)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [lazy, priority])

// Generate optimized image URL with WebP fallback and mobile-first responsive sizing
  const getOptimizedUrl = (originalSrc: string) => {
    if (originalSrc.startsWith('/lovable-uploads/')) {
      // For mobile devices, prioritise smaller file sizes
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      return originalSrc; // Return original for now, will be enhanced when optimised versions are available
    }
    return originalSrc
  }

  // Create multiple image sources for different formats and sizes with mobile-first approach
  const getImageSources = (originalSrc: string) => {
    if (originalSrc.startsWith('/lovable-uploads/') || originalSrc.endsWith('.png') || originalSrc.endsWith('.jpg') || originalSrc.endsWith('.jpeg')) {
      const webpSrc = originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp')
      return {
        webp: webpSrc,
        original: originalSrc,
        small: originalSrc.replace(/\.(png|jpg|jpeg)$/i, '_mobile.webp'), // For mobile - optimised size
        medium: originalSrc.replace(/\.(png|jpg|jpeg)$/i, '_tablet.webp'), // For tablet
        large: originalSrc.replace(/\.(png|jpg|jpeg)$/i, '_desktop.webp') // For desktop
      };
    }
    return { webp: originalSrc, original: originalSrc, small: originalSrc, medium: originalSrc, large: originalSrc }
  }

  const imageSources = getImageSources(src)

  // Enhanced mobile-first preload critical images with WebP support and responsive sizes
  useEffect(() => {
    if (priority && isInView) {
      // Detect device type for optimal preloading strategy
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
      const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024
      
      let preloadSrc = imageSources.original
      if (isMobile && imageSources.small !== imageSources.original) {
        preloadSrc = imageSources.small
      } else if (isTablet && imageSources.medium !== imageSources.original) {
        preloadSrc = imageSources.medium
      } else if (imageSources.large !== imageSources.original) {
        preloadSrc = imageSources.large
      }
      
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = preloadSrc
      link.type = format === 'webp' ? 'image/webp' : 'image/png'
      
      // Add mobile-specific attributes
      if (isMobile) {
        link.setAttribute('media', '(max-width: 767px)')
      }
      
      document.head.appendChild(link)
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }
    }
  }, [imageSources, priority, isInView, format])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setError(true)
    setIsLoaded(true)
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isInView && (
        <picture>
          {/* Enhanced mobile-first WebP sources for different screen sizes */}
          {imageSources.webp !== imageSources.original && (
            <>
              <source 
                media="(max-width: 639px)" 
                srcSet={imageSources.small || imageSources.webp} 
                type="image/webp" 
              />
              <source 
                media="(max-width: 1023px)" 
                srcSet={imageSources.medium || imageSources.webp} 
                type="image/webp" 
              />
              <source 
                media="(min-width: 1024px)" 
                srcSet={imageSources.large || imageSources.webp} 
                type="image/webp" 
              />
              <source srcSet={imageSources.webp} type="image/webp" />
            </>
          )}
          <img
            ref={imgRef}
            src={error ? src : imageSources.original}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            {...(priority ? { fetchPriority: 'high' } : {})}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
          />
        </picture>
      )}
      {/* Minimal loading placeholder */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse" />
      )}
    </div>
  )
}