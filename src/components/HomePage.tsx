'use client';

import Head from "next/head";
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { HighlightBox } from "@/components/ui/highlight-box";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { OptimizedBackground } from "@/components/ui/optimized-background";
import { ConditionsWeTreat } from "@/components/ConditionsWeTreat";
import oceanWavesBg from '@/assets/ocean-waves-bg.jpg';
// Hero image now served from /public/ for instant CDN loading
import australianOutbackHero from '@/assets/australian-outback-hero.jpg';
import { WeightLossQuiz } from '@/components/WeightLossQuiz';



export default function HomePage() {

  return (
    <Layout>
      <Head>
        <title>Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black</title>
        <meta name="description" content="Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates." />
        <meta name="keywords" content="comprehensive family health clinic, whole person healthcare Australia, family wellness telehealth, endocrine health clinic, medication management clinic, reverse chronic conditions, holistic family medicine, general practice telehealth, whole family health Australia" />
        <link rel="canonical" href="https://www.downscale.com.au/" />
        <link rel="preload" as="image" href="/hero-family-sunset-mobile.webp" type="image/webp" />
        <link rel="preload" as="image" href="/confidence-journey-outback-mobile.webp" type="image/webp" />
        <link rel="preload" href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" as="image" type="image/jpeg" />
        
        <meta property="og:title" content="Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black" />
        <meta property="og:description" content="Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/" />
        <meta property="og:image" content="https://www.downscale.com.au/public/hero-family-sunset.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="Comprehensive family health and wellness clinic - treating the whole person and family - Australian telehealth clinic for weight loss, endocrine health, and chronic disease reversal" />
        <meta property="og:image:type" content="image/png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.downscale.com.au/hero-family-sunset.png" />
        <meta name="twitter:image:alt" content="Whole person healthcare for families - comprehensive telehealth clinic treating weight, endocrine health, medication management, and chronic disease reversal across Australia" />
        <meta name="twitter:title" content="Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black" />
        <meta name="twitter:description" content="Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
             "name": "Comprehensive Health & Wellness Services - Whole Person and Family Care",
             "description": "Holistic telehealth clinic treating the whole person and family - weight management, endocrine health, chronic disease reversal, medication management, and general practice services",
            "url": "https://www.downscale.com.au/",
            "mainContentOfPage": {
              "@type": "WebPageElement",
              "description": "Comprehensive whole-person healthcare including weight management, endocrine health optimization, chronic disease reversal, medication reduction, and family wellness support via telehealth."
            },
            "specialty": "Comprehensive Family Health, Endocrine Medicine, Chronic Disease Reversal & General Practice Telehealth",
            "about": [
              {
                "@type": "MedicalCondition",
                "name": "Comprehensive Health Management - Weight, Endocrine, Chronic Disease Reversal"
              },
              {
                "@type": "MedicalCondition",
                "name": "Medication Optimization and Chronic Disease Management"
              },
              {
                "@type": "MedicalSpecialty",
                "name": "Holistic Family Medicine & Endocrine Health"
              }
            ],
            "significantLink": "https://www.downscale.com.au/",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Comprehensive Family Health & Wellness Clinic Australia",
                  "item": "https://www.downscale.com.au/"
                }
              ]
            }
          })}
        </script>
        
        {/* ItemList Structured Data for Weight Loss Clinic Services */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Comprehensive Health & Wellness Services - Whole Person Care",
            "description": "Holistic telehealth services treating the whole person and family - weight, endocrine health, chronic disease reversal, medication management by Nurse Practitioner Justin Black",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Comprehensive Medical Weight & Metabolic Health Management",
                "description": "Whole-person medical consultations including weight management, endocrine optimization, medication reduction, and chronic disease reversal via telehealth",
                "url": "https://www.downscale.com.au/medical-weight-management"
              },
              {
                "@type": "ListItem", 
                "position": 2,
                "name": "Personalized Nutrition & Metabolic Health Planning",
                "description": "Evidence-based nutrition planning for metabolic health, weight optimization, and family wellness via telehealth consultations",
                "url": "https://www.downscale.com.au/nutrition-meal-planning"
              },
              {
                "@type": "ListItem",
                "position": 3, 
                "name": "Comprehensive Mental Health & Wellbeing Support",
                "description": "Holistic mental health care as part of whole-person treatment including assessments, treatment plans, and family support",
                "url": "https://www.downscale.com.au/mental-health-support"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "General Practice & Family Healthcare Services", 
                "description": "Comprehensive general practice including health assessments, medication management, chronic disease treatment, and family healthcare via telehealth",
                "url": "https://www.downscale.com.au"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": "Endocrine Health & Hormone Optimization",
                "description": "Specialized endocrine and metabolic health care including hormone optimization, thyroid management, and metabolic disease treatment",
                "url": "https://www.downscale.com.au"
              },
              {
                "@type": "ListItem", 
                "position": 6,
                "name": "Medication Management & Chronic Disease Reversal",
                "description": "Expert medication review, reduction, and optimization with focus on reversing chronic conditions and improving overall family health",
                "url": "https://www.downscale.com.au"
              }
            ]
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Downscale Weight Loss Clinic",
            "alternateName": "Downscale Weight Loss Clinic",
            "url": "https://www.downscale.com.au/",
            "logo": "https://www.downscale.com.au/og-services.jpg",
            "image": "https://www.downscale.com.au/og-services.jpg",
            "description": "Comprehensive whole-person and family healthcare - treating weight, endocrine health, chronic diseases, medication optimization from $45 with Medicare rebates for eligible patients.",
            
            "email": "office@downscale.com.au",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "AU",
              "addressRegion": "QLD",
              "addressLocality": "Brisbane",
              "postalCode": "4000"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Australia"
            },
            "medicalSpecialty": ["Comprehensive Family Medicine", "Endocrine Health", "Metabolic Medicine", "Chronic Disease Reversal", "Medication Management", "General Practice", "Telehealth"],
            "priceRange": "$45-$96.25",
            "paymentAccepted": ["Medicare", "Credit Card", "Debit Card"],
            "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
            "sameAs": [
              "https://www.facebook.com/445168355337624",
              "https://www.instagram.com/downscale_weightloss",
              "https://www.downscale.com.au/about",
              "https://www.downscale.com.au/justin-black-nurse-practitioner"
            ]
          })}
        </script>

        {/* Person Schema for Justin Black */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Justin Black",
            "jobTitle": "Nurse Practitioner",
            "description": "Experienced Nurse Practitioner specializing in whole-person healthcare, endocrine health, metabolic medicine, chronic disease reversal, medication optimization, and family wellness.",
            "url": "https://www.downscale.com.au/about",
            "worksFor": {
              "@type": "MedicalBusiness",
              "name": "Downscale Weight Loss Clinic"
            },
            "knowsAbout": [
              "Comprehensive Family Medicine",
              "Endocrine Health & Hormone Optimization",
              "Metabolic Medicine & Chronic Disease Reversal",
              "Medication Management & Reduction",
              "Whole Person Healthcare",
              "Emergency Nursing",
              "Paediatric Emergency Care",
              "General Practice",
              "Telehealth Consultations"
            ],
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Nurse Practitioner",
              "occupationLocation": {
                "@type": "Country",
                "name": "Australia"
              }
            }
          })}
        </script>

        {/* WebSite Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Downscale Weight Loss Clinic",
            "url": "https://www.downscale.com.au/",
            "description": "Comprehensive whole-person and family healthcare clinic - treating weight, endocrine health, chronic disease reversal, medication management via telehealth across Australia.",
            "publisher": {
              "@type": "MedicalBusiness",
              "name": "Downscale Weight Loss Clinic"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.downscale.com.au/?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
      </Head>
      {/* AI Speakable Content */}
      <div className="ai-speakable sr-only">
        <h2>What is Downscale Weight Loss Clinic?</h2>
        <p>Downscale Weight Loss & Weight Maintenance Clinic is a professional telehealth weight loss clinic providing Medicare bulk-billed initial consultations with Nurse Practitioner Justin Black. We offer evidence-based weight management through telehealth appointments across all Australian states and territories.</p>
        
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
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      {/* Hero Section - WebP optimized for <1s mobile LCP */}
      <div 
        className="relative min-h-screen flex flex-col justify-between overflow-visible"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), image-set(url(/hero-family-sunset-mobile.webp) type("image/webp"), url(/hero-family-sunset.png) type("image/png"))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex-1 flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 min-h-screen">
          {/* DOWNSCALE Brand Header - Top */}
          <div className="pt-4 sm:pt-8 pb-4 sm:pb-6">
            <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-black text-center leading-none tracking-tight" style={{
              color: '#f7f2d3',
              textShadow: '0 4px 20px rgba(247, 242, 211, 0.4), 0 0 40px rgba(247, 242, 211, 0.2)',
              filter: 'drop-shadow(0 2px 10px rgba(247, 242, 211, 0.3))'
            }}>
              DOWNSCALE
            </h1>
          </div>
          
          {/* Main Heading - Center */}
          <div className="flex-1 flex items-center justify-center py-6 sm:py-8">
            <div className="text-center max-w-4xl px-2">
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-5 leading-tight" style={{ 
                color: '#f7f2d3', 
                textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' 
              }}>
                <div>Online Weight Loss Clinic</div>
                <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold py-1 sm:py-2 my-1 leading-none">&</div>
                <div>Weight Maintenance Clinic</div>
              </h2>
              
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white mb-2 sm:mb-3 drop-shadow-lg font-light leading-relaxed" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)'
              }}>
                Evidence-Based Medical Weight Loss with Justin Black
              </p>
              
              <p className="text-xs sm:text-base md:text-lg lg:text-xl text-white" style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.9)'
              }}>
                From Only $45 Per Consultation — Medicare Rebates Processed Instantly for Eligible Patients
              </p>
            </div>
          </div>
          
          {/* Booking Buttons - Bottom */}
          <div className="pb-8 sm:pb-12 w-full max-w-7xl mx-auto">
            {/* Clear booking call-to-action */}
            <div className="mb-4 sm:mb-6 text-center px-4">
              <p 
                className="text-sm sm:text-base md:text-lg font-semibold inline-flex items-center justify-center gap-2"
                style={{ 
                  color: '#f7f2d3', 
                  textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' 
                }}
              >
                <span className="text-base sm:text-lg md:text-xl" aria-hidden="true">👇</span>
                <span>Choose One to Book Your Appointment</span>
                <span className="text-base sm:text-lg md:text-xl" aria-hidden="true">👇</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch px-2 sm:px-4 md:px-6 w-full">
              <a 
                href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto sm:flex-1 h-[60px] sm:h-[100px] flex flex-col items-center justify-center bg-gradient-to-br from-[#f5deb3]/85 to-[#f7e7c5]/85 backdrop-blur-lg md:hover:from-[#f7e7c5]/90 md:hover:to-[#f5deb3]/90 border border-white/20 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl md:transition-all md:duration-300 md:transform md:hover:scale-105"
                style={{ minWidth: '160px', maxWidth: '100%' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 111, 71, 0.7), 0 0 20px rgba(139, 111, 71, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}
              >
                <span className="text-center leading-tight mb-1 text-xs sm:text-base md:text-lg lg:text-xl font-black underline text-[#5a4a35] drop-shadow-lg">💊 Book Initial Consultation</span>
                <span className="text-[10px] sm:text-xs font-bold text-center text-[#6b5840] drop-shadow-md whitespace-nowrap">Weight Loss 30 Min • From $45</span>
              </a>
              
              <a 
                href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto sm:flex-1 h-[60px] sm:h-[100px] flex flex-col items-center justify-center bg-gradient-to-br from-[#8B6F47]/85 to-[#9d8157]/85 backdrop-blur-lg md:hover:from-[#9d8157]/90 md:hover:to-[#8B6F47]/90 border border-white/20 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl md:transition-all md:duration-300 md:transform md:hover:scale-105"
                style={{ minWidth: '160px', maxWidth: '100%' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(247, 242, 211, 0.6), 0 0 20px rgba(247, 242, 211, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}
              >
                <span className="text-center leading-tight mb-1 text-xs sm:text-base md:text-lg lg:text-xl font-black underline text-[#f5deb3] drop-shadow-lg">✓ Book Review Consultation</span>
                <span className="text-[10px] sm:text-xs font-bold text-center text-[#f7e7c5] drop-shadow-md whitespace-nowrap">Weight Loss 15 Min • From $45</span>
              </a>
              
              <a 
                href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto sm:flex-1 h-[60px] sm:h-[100px] flex flex-col items-center justify-center bg-gradient-to-br from-slate-700/85 to-slate-800/85 backdrop-blur-lg md:hover:from-slate-700/90 md:hover:to-slate-600/90 border border-white/20 px-3 sm:px-4 md:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl md:transition-all md:duration-300 md:transform md:hover:scale-105"
                style={{ minWidth: '160px', maxWidth: '100%' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(139, 111, 71, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}
              >
                <span className="text-center leading-tight mb-1 text-xs sm:text-base md:text-lg lg:text-xl font-black underline text-white drop-shadow-lg">📋 Book General Appointment</span>
                <span className="text-[10px] sm:text-xs font-bold text-center text-white/90 drop-shadow-md whitespace-nowrap">General Practice 10 Minutes</span>
              </a>
            </div>
          </div>
        </div>
      </div>

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
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="mb-4 sm:mb-6">Our Services</h2>
            <p className="mobile-text text-blue-100 max-w-3xl mx-auto">
              Justin has an amazing background - evidence based complete care:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            
            <a href="/medical-weight-management" className="bg-card/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border/20 hover:bg-card transition-all duration-300 hover:scale-105 block group" aria-label="Learn more about Weight Loss Medication & Medical Management services">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-accent pl-3 transition-all duration-300 heading-beach">Weight Loss Medication & Medical Management</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">Medical treatment as indicated. Evidence-based weight management assessment and support. Individual results may vary.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Professional clinical assessment</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Comprehensive health evaluation</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Ongoing clinical monitoring</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Click your way to success</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Learn more →</div>
            </a>

            <a href="/nutrition-meal-planning" className="bg-card/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border/20 hover:bg-card transition-all duration-300 hover:scale-105 block group" aria-label="Learn more about Nutrition Optimisation services">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-accent pl-3 transition-all duration-300 heading-beach">Nutrition Optimisation</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">Practical nutrition for busy lives - from meal prep to fast food choices and athletic performance.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Busy lifestyle meal planning</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Protein optimisation strategies</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Athletic nutrition guidance</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Learn more →</div>
            </a>

            <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border/20 hover:bg-card transition-all duration-300 hover:scale-105 group cursor-pointer">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-accent pl-3 transition-all duration-300 heading-beach">Activity & Muscle Building</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">Exercise programs and muscle building strategies tailored to your fitness level and goals.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Personalised exercise plans</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Strength training guidance</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Progressive fitness coaching</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Coming soon →</div>
            </div>

            <a href="/mental-health-support" className="bg-card/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border/20 hover:bg-card transition-all duration-300 hover:scale-105 block group" aria-label="Learn more about Mental Health Support services">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-accent pl-3 transition-all duration-300 heading-beach">Mental Health Support</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">Holistic health support addressing wellbeing within scope of practice.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Wellbeing assessment and support</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Health and wellness strategies</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Stress management approaches</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Learn more →</div>
            </a>

            <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border/20 hover:bg-card transition-all duration-300 hover:scale-105 group cursor-pointer">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-accent pl-3 transition-all duration-300 heading-beach">Sleep Optimisation</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">Comprehensive sleep analysis and improvement strategies for better rest and recovery.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Sleep pattern analysis</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Sleep hygiene coaching</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Recovery optimisation</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Coming soon →</div>
            </div>

            <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-border/20 hover:bg-card transition-all duration-300 hover:scale-105 group cursor-pointer">
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 border-l-4 border-transparent group-hover:border-accent pl-3 transition-all duration-300 heading-beach">General Practice</h3>
              <p className="text-blue-100 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">Comprehensive healthcare with expertise in general practice, emergency medicine, and paediatrics.</p>
              <ul className="text-blue-200 space-y-1 md:space-y-2 text-xs md:text-sm">
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>General practice consultations</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Emergency medicine expertise</li>
                <li className="flex items-start"><span className="text-green-400 mr-2 mt-0.5">✓</span>Paediatric care</li>
              </ul>
              <div className="mt-2 md:mt-3 text-[#b68a71] group-hover:underline text-xs md:text-sm">Coming soon →</div>
            </div>

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
  <h2 className="text-center mb-6" style={{
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
              className="text-primary hover:text-primary/80 font-medium text-sm transition-colors inline-flex items-center gap-2"
            >
              Or find weight loss clinic locations across Australia →
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <OptimizedBackground
        src={australianOutbackHero}
        className="py-20 relative overflow-hidden section-divider section-divider-bottom"
        overlay="linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2))"
      >

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-cream/80 mb-12 max-w-3xl mx-auto">
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
              className="bg-secondary hover:bg-secondary/90 text-white font-medium text-sm shadow-md"
              size="sm"
            >
              BOOK YOUR CONSULTATION NOW
            </Button>
          </a>
        </div>
      </OptimizedBackground>
      </div>
    </Layout>
  );
}