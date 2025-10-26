import React from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';
// Hero images served from /public/ for instant CDN loading

interface AustralianHeroSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  children?: React.ReactNode;
  imageVariant?: 'beach' | 'desert' | 'reef';
  overlayVariant?: 'ocean' | 'desert' | 'reef';
}

// Enhanced Australian alt text generator for better SEO
const getAustralianAltText = (variant: string): string => {
  const australianAltTexts = {
    beach: 'Pristine Australian beach coastline with turquoise waters and golden sand - weight loss clinic inspiration',
    desert: 'Australian red centre outback landscape with desert vista - health and wellness journey',
    reef: 'Australian Great Barrier Reef marine ecosystem - natural health and vitality'
  };
  return australianAltTexts[variant] || `Australian ${variant} natural landscape background`;
};

export function AustralianHeroSection({ 
  title, 
  subtitle, 
  description, 
  children,
  imageVariant = 'beach',
  overlayVariant = 'ocean'
}: AustralianHeroSectionProps) {
  
  const getBackgroundImage = () => {
    switch (imageVariant) {
      case 'desert':
        return '/australian-coastal-desert.jpg';
      case 'reef':
        return '/great-barrier-reef-hero.jpg';
      default:
        return '/australian-beach-hero.jpg';
    }
  };

  const getOverlayClass = () => {
    switch (overlayVariant) {
      case 'desert':
        return 'bg-gradient-to-r from-red-900/60 via-orange-800/50 to-yellow-700/45';
      case 'reef':
        return 'bg-gradient-to-r from-teal-900/60 via-green-800/50 to-blue-700/55';
      default:
        return 'bg-gradient-to-r from-blue-900/60 via-teal-700/50 to-cyan-800/55';
    }
  };

  return (
    <section className="relative pt-16 pb-12 min-h-[60vh] sm:pt-24 sm:pb-20 flex items-center overflow-hidden">
      {/* Australian Background Image */}
      <picture>
        <source
          srcSet={getBackgroundImage()}
          type="image/jpeg"
          media="(min-width: 768px)"
        />
        <img
          src={getBackgroundImage()}
          alt={getAustralianAltText(imageVariant)}
          className="absolute inset-0 w-full h-full object-cover object-center transform-gpu mobile-image-hero"
          loading="eager"
          fetchPriority="high"
          width="1920"
          height="1080"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
          decoding="async"
          style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        />
      </picture>
      
      {/* Dynamic Australian-themed overlay */}
      <div className={`absolute inset-0 ${getOverlayClass()}`}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/25 to-blue-900/35"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {subtitle && (
            <div className="inline-block bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 border border-white/20">
              {subtitle}
            </div>
          )}
          
          <h1 className="heading-beach mb-4 sm:mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 sm:mb-12 max-w-4xl mx-auto font-light leading-relaxed hero-text-australian">
            {description}
          </p>
          
          {children && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-5xl mx-auto px-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}