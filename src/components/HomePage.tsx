'use client';

import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { HighlightBox } from "@/components/ui/highlight-box";
import Image from 'next/image';
import { OptimizedBackground } from "@/components/ui/optimized-background";
import { ConditionsWeTreat } from "@/components/ConditionsWeTreat";
// Hero images now served from /public/ for instant CDN loading
import { WeightLossQuiz } from '@/components/WeightLossQuiz';
import { BodyMetricsShowcase } from '@/components/ui/body-metrics-showcase';
import { HeroSection } from '@/components/HeroSection';

export default function HomePage() {
  return (
    <Layout>
      {/* AI Speakable Content */}
      <div className="ai-speakable sr-only">
        <h2>What is Downscale Weight Loss Clinic?</h2>
        <p>Downscale Weight Loss & Weight Maintenance Clinic is a professional telehealth weight loss clinic providing $45 maximum out-of-pocket consultations with Nurse Practitioner Justin Black. We offer evidence-based weight management through telehealth appointments across all Australian states and territories.</p>
        
        <h3>Key Facts:</h3>
        <ul className="key-facts">
          <li>All consultations $45 maximum out-of-pocket — Medicare-eligible patients receive instant rebates of $27.05-$51.25</li>
          <li>25+ years clinical experience with Nurse Practitioner Justin Black</li>
          <li>Telehealth services available Australia-wide</li>
          <li>Evidence-based medical weight management approach</li>
          <li>Same-day appointments available</li>
          <li>Prescription medications available when clinically appropriate</li>
        </ul>
      </div>
      {/* Modern Mobile-First Hero Section */}
      <HeroSection />

      {/* Body Metrics Calculator Showcase */}
      <BodyMetricsShowcase />

      {/* Services Content */}
      <section className="mobile-section relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden section-divider">
        {/* Enhanced gradient accents for better contrast */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-slate-700/20 to-slate-600/15 rounded-full blur-3xl transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-secondary/15 to-secondary/8 rounded-full blur-3xl transform translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-slate-700/15 to-slate-600/10 rounded-full blur-3xl transform -translate-x-1/2"></div>
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-gradient-to-br from-secondary/12 to-slate-700/8 rounded-full blur-3xl transform translate-x-1/2"></div>
          {/* Add subtle texture overlay for depth */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        <div className="mobile-container">
          <div className="text-center mb-6 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Our Services</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto">
              Justin has an amazing background - evidence based complete care:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto">
            
            <a href="/medical-weight-management" className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-slate-700/20 hover:bg-slate-700/95 transition-all duration-300 hover:scale-105 block group" aria-label="Learn more about Weight Loss Medication & Medical Management services">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-[#b68a71] pl-3 transition-all duration-300 text-white">Weight Loss Medication & Medical Management</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">Medical treatment as indicated. Evidence-based weight management assessment and support. Individual results may vary.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Professional clinical assessment</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Comprehensive health evaluation</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Ongoing clinical monitoring</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Click your way to success</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Learn more →</div>
            </a>

            <a href="/nutrition-meal-planning" className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-slate-700/20 hover:bg-slate-700/95 transition-all duration-300 hover:scale-105 block group" aria-label="Learn more about Nutrition Optimisation services">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-[#b68a71] pl-3 transition-all duration-300 text-white">Nutrition Optimisation</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">Practical nutrition for busy lives - from meal prep to fast food choices and athletic performance.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Busy lifestyle meal planning</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Protein optimisation strategies</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Athletic nutrition guidance</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Learn more →</div>
            </a>

            <a href="/movement-activity-programs" className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-slate-700/20 hover:bg-slate-700/95 transition-all duration-300 hover:scale-105 block group" aria-label="Learn more about Activity & Muscle Building services">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-[#b68a71] pl-3 transition-all duration-300 text-white">Activity & Muscle Building</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">Exercise programs and muscle building strategies tailored to your fitness level and goals.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Personalised exercise plans</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Strength training guidance</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Progressive fitness coaching</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Learn more →</div>
            </a>

            <a href="/mental-health-support" className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-slate-700/20 hover:bg-slate-700/95 transition-all duration-300 hover:scale-105 block group" aria-label="Learn more about Mental Health Support services">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-[#b68a71] pl-3 transition-all duration-300 text-white">Mental Health Support</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">Holistic health support addressing wellbeing within scope of practice.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Wellbeing assessment and support</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Health and wellness strategies</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Stress management approaches</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Learn more →</div>
            </a>

            <a href="/sleep-recovery-optimisation" className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-slate-700/20 hover:bg-slate-700/95 transition-all duration-300 hover:scale-105 block group" aria-label="Learn more about Sleep Optimisation services">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-[#b68a71] pl-3 transition-all duration-300 text-white">Sleep Optimisation</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">Comprehensive sleep analysis and improvement strategies for better rest and recovery.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Sleep pattern analysis</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Sleep hygiene coaching</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Recovery optimisation</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Learn more →</div>
            </a>

            <a href="/about" className="bg-slate-800/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-slate-700/20 hover:bg-slate-700/95 transition-all duration-300 hover:scale-105 block group" aria-label="Learn more about General Practice services">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-[#b68a71] pl-3 transition-all duration-300 text-white">General Practice</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">Comprehensive healthcare with expertise in general practice, emergency medicine, and paediatrics.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>General practice consultations</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Emergency medicine expertise</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Paediatric care</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Learn more →</div>
            </a>

          </div>
        </div>
      </section>

      {/* Weight Loss Quiz Section */}
      {/* Weight Loss Quiz Section */}
      <OptimizedBackground
        src="/confidence-journey-outback-mobile.webp"
        className="py-12 sm:py-16 relative overflow-hidden"
        overlay="linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.35))"
        priority={true}
      >
        
<div className="container mx-auto px-4 relative z-10">
  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6" style={{
    color: '#f7f2d3',
    textShadow: '0 4px 20px rgba(247, 242, 211, 0.4), 0 0 40px rgba(247, 242, 211, 0.2)',
    filter: 'drop-shadow(0 2px 10px rgba(247, 242, 211, 0.3))'
  }}>
    Start Your Confidence Journey Today
  </h2>
  <div className="flex justify-center mb-8 sm:mb-10">
    <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-sm">
      <p className="text-center text-muted-foreground text-sm sm:text-base max-w-2xl">
        A weight loss clinic that sees the bias, the stigma, and the history of your struggles. We walk your transformation with you.
      </p>
    </div>
  </div>
  <WeightLossQuiz />
</div>
</OptimizedBackground>

      {/* Medical Conditions We Treat */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ConditionsWeTreat compact={true} />
          <div className="text-center mt-8">
            <a 
              href="/locations" 
              className="text-[#b68a71] hover:text-[#b68a71]/80 font-medium text-sm transition-colors inline-flex items-center gap-2 touch-target"
            >
              Or find weight loss clinic locations across Australia →
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <OptimizedBackground
        src="/australian-outback-hero.jpg"
        className="py-20 relative overflow-hidden section-divider section-divider-bottom"
        overlay="linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2))"
      >

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-base sm:text-lg md:text-xl text-cream/80 mb-8 sm:mb-12 max-w-3xl mx-auto">
            Book a no-obligation telehealth consultation today. Let's work together to achieve your health goals with evidence-based, compassionate care.
          </p>
          <a 
            href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              onClick={() => window.open('https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131', '_blank')}
              className="bg-secondary hover:bg-secondary/90 text-white font-medium text-sm shadow-md touch-target"
              size="sm"
            >
              BOOK YOUR CONSULTATION NOW
            </Button>
          </a>
        </div>
      </OptimizedBackground>
    </Layout>
  );
}