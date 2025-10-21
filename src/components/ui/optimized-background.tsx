'use client';

import React, { useState, useEffect } from 'react'

interface OptimizedBackgroundProps {
  src: string
  className?: string
  children?: React.ReactNode
  overlay?: string
  quality?: number
  priority?: boolean
}

export const OptimizedBackground: React.FC<{
  children?: React.ReactNode;
}> = ({
  src,
  className = '',
  children,
  overlay = 'linear-gradient(rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7))',
  quality = 85,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [optimizedSrc, setOptimizedSrc] = useState('')

  useEffect(() => {
    // Check for WebP version first (created by our optimization script)
    const tryWebPFirst = async () => {
      try {
        // Check if WebP version exists
        const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp')
        
        if (webpSrc !== src) {
          // Test if WebP version exists
          const img = new Image()
          img.onload = () => {
            setOptimizedSrc(webpSrc)
            setIsLoaded(true)
          }
          img.onerror = () => {
            // Fallback to original if WebP doesn't exist
            setOptimizedSrc(src)
            setIsLoaded(true)
          }
          img.src = webpSrc
        } else {
          // Not an image we can optimize, use original
          setOptimizedSrc(src)
          setIsLoaded(true)
        }
      } catch {
        // Fallback to original on any error
        setOptimizedSrc(src)
        setIsLoaded(true)
      }
    }

    tryWebPFirst()
  }, [src, quality])

  // Preload critical background images
  useEffect(() => {
    if (priority && optimizedSrc) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = optimizedSrc
      document.head.appendChild(link)
      
      return () => {
        document.head.removeChild(link)
      }
    }
  }, [optimizedSrc, priority])

  const bg = optimizedSrc || src
  const backgroundStyle = bg ? {
    backgroundImage: `${overlay}, url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  } : {}

  return (
    <div
      className={`relative ${className}`}
      style={backgroundStyle}
    >
      {children}
    </div>
  )
}