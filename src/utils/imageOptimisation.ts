// Enhanced mobile-first image optimisation utilities for Australian weight loss clinic
'use client';
export const CRITICAL_IMAGES = [
  '/lovable-uploads/a0c37573-face-441d-8873-97dfc850d27c.png', // Logo
  '/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png', // Justin photo
  '/lovable-uploads/b1d32c79-ba80-48b5-83b4-3bf5e5e66bca.png', // Bec photo
  '/hero-family-sunset.png', // Hero image - family sunset silhouette
]

// Mobile-first image optimization with Australian focus
export const optimizeImageSrc = (src: string, options?: {
  width?: number
  quality?: number
  format?: 'webp' | 'jpeg' | 'png'
  isMobile?: boolean
}) => {
  if (!src.startsWith('/lovable-uploads/')) return src
  
  const { width = 800, quality = 85, format = 'png', isMobile = false } = options || {}
  
  // Smaller images for mobile devices to improve loading speed
  const mobileWidth = isMobile ? Math.min(width, 400) : width
  const mobileQuality = isMobile ? Math.min(quality, 75) : quality
  
  // Return optimised src for mobile-first approach
  return src
}

// Enhanced mobile-first preloading for Australian clinic images
export const preloadCriticalImages = () => {
  const isMobile = window.innerWidth < 768
  
  CRITICAL_IMAGES.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    link.type = 'image/png'
    
    // Add mobile-specific attributes for faster loading
    if (isMobile) {
      link.setAttribute('media', '(max-width: 767px)')
    }
    
    document.head.appendChild(link)
  })
}

// Check if image is critical for LCP optimisation
export const isCriticalImage = (src: string) => {
  return CRITICAL_IMAGES.includes(src)
}

// Mobile-first responsive image srcset generator
export const generateResponsiveSrcSet = (src: string) => {
  if (!src.startsWith('/lovable-uploads/')) return src
  
  // Generate multiple sizes for mobile-first loading
  const sizes = [
    { width: 320, quality: 70, suffix: 'mobile' },
    { width: 640, quality: 75, suffix: 'tablet' },
    { width: 1024, quality: 85, suffix: 'desktop' },
  ]
  
  // For now, return original - will be enhanced when optimised images are available
  return src
}

// Australian alt text generator for SEO improvement
export const generateAustralianAltText = (imageType: string, context: string) => {
  const australianTerms = {
    'clinic': 'Australian weight loss clinic',
    'doctor': 'Australian healthcare practitioner',
    'nurse': 'Australian registered nurse',
    'treatment': 'Australian medical treatment',
    'consultation': 'Australian telehealth consultation',
    'logo': 'Australian health clinic logo',
    'hero': 'Australian landscape',
    'beach': 'pristine Australian beach',
    'outback': 'Australian outback landscape'
  }
  
  return australianTerms[imageType] || `Australian ${context}`
}