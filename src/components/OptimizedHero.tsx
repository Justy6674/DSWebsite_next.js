'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
// Image served from /public/ for instant CDN loading

export function OptimizedHero() {
  return (
    <section className="relative pt-16 pb-12 min-h-[75svh] sm:min-h-[80vh] sm:pt-24 sm:pb-20 flex items-center overflow-hidden">
      {/* Australian Beach Hero Background */}
      <picture>
        <source
          srcSet="/australian-beach-hero.jpg"
          type="image/jpeg"
          media="(min-width: 768px)"
        />
        <img 
          src="/australian-beach-hero.jpg"
          alt="Pristine Australian beach with crystal-clear turquoise ocean waters and white sand - weight loss clinic inspiration"
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
      
      {/* Clean hero background without heavy overlays */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Social Proof Badge - ABOVE the main heading */}
          <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span>1.5K+ on Facebook</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30 shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
              <span>Join Our Community</span>
            </div>
          </div>

          <h1 className="heading-beach mb-4 sm:mb-6 leading-tight">
            Your New Set Point Starts Here.
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 sm:mb-12 max-w-4xl mx-auto font-light leading-relaxed hero-text-australian">
            Biology fights to pull weight back up. Justin at Downscale get's your weight down - but then keeping it down and transitioning you from a weight loss mindset to just living in a beautiful body - no regain!
          </p>
          
          
          {/* Clear booking call-to-action */}
          <div className="mb-4 text-center">
            <p 
              className="text-lg sm:text-xl font-semibold inline-flex items-center justify-center gap-2"
              style={{ 
                color: '#f7f2d3', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' 
              }}
            >
              <span className="text-xl sm:text-2xl" aria-hidden="true">👇</span>
              <span>Choose One to Book Your Appointment</span>
              <span className="text-xl sm:text-2xl" aria-hidden="true">👇</span>
            </p>
          </div>

          {/* Booking Options - Optimized for better hero image viewing */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-5xl mx-auto px-4">
            <a 
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-56 min-h-[64px] sm:min-h-[80px] button-ocean-primary inline-flex flex-col items-center justify-center text-white text-base sm:text-lg font-bold px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow-lg md:transition-all md:duration-300 md:transform md:hover:scale-105 md:hover:shadow-xl touch-target"
              aria-label="Book initial weight loss appointment - 30 minute $45 consultation"
            >
              <span className="text-center leading-tight mb-1">Initial First Appointment</span>
              <span className="text-xs sm:text-sm font-normal text-center opacity-95">Weight Loss 30 Min • $45</span>
            </a>
            
            <a 
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-56 min-h-[64px] sm:min-h-[80px] button-reef-secondary inline-flex flex-col items-center justify-center text-white text-base sm:text-lg font-bold px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow-lg md:transition-all md:duration-300 md:transform md:hover:scale-105 md:hover:shadow-xl touch-target"
              aria-label="Book follow-up weight loss appointment - 15 minute consultation"
            >
              <span className="text-center leading-tight mb-1">Follow-up Appointment</span>
              <span className="text-xs sm:text-sm font-normal text-center opacity-95">Weight-Loss 15 Minutes</span>
            </a>
            
            <a 
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-56 min-h-[64px] sm:min-h-[80px] button-coral-accent inline-flex flex-col items-center justify-center text-white text-base sm:text-lg font-bold px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow-lg md:transition-all md:duration-300 md:transform md:hover:scale-105 md:hover:shadow-xl touch-target"
              aria-label="Book general practice appointment - 10 minute non-weight related consultation"
            >
              <span className="text-center leading-tight mb-1">Non-Weight GP Appointment</span>
              <span className="text-xs sm:text-sm font-normal text-center opacity-95">General Practice 10 Minutes</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}