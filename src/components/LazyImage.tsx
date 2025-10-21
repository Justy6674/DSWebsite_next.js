import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  isMobile?: boolean;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3C/svg%3E',
  className = '',
  isMobile = false,
  priority = false,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    // Load immediately if priority or if already in view
    if (priority || (imageRef && imageSrc === placeholder)) {
      if (priority) {
        setImageSrc(src);
        setIsLoaded(true);
        return;
      }

      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Preload image with mobile-first approach
              const img = new Image();
              img.src = src;
              img.onload = () => {
                setImageSrc(src);
                setIsLoaded(true);
              };
              img.onerror = () => {
                // Fallback to original src on error
                setImageSrc(src);
                setIsLoaded(true);
              };
              observer.unobserve(imageRef);
            }
          });
        },
        { 
          threshold: 0.01,
          // Mobile-first: smaller root margin for better performance
          rootMargin: isMobile ? '25px' : '50px'
        }
      );
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && observer.unobserve && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, placeholder, src, priority, isMobile]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-75'} transition-opacity duration-300 ease-in-out`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      style={{ 
        willChange: 'opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
      {...props}
    />
  );
};