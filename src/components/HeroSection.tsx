'use client';

import React from 'react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TOP SECTION: Brown Header */}
      <header className="bg-[#b68a71] p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#f7f2d3]/20">
              <img
                src="/lovable-uploads/a0c37573-face-441d-8873-97dfc850d27c.png"
                alt="Downscale Logo"
                className="h-8 w-8 object-contain"
                loading="eager"
              />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#f7f2d3]">DOWNSCALE</h1>
              <p className="text-sm text-[#f7f2d3]/90">Weight Loss Clinic</p>
            </div>
          </div>
          {/* Mobile menu icon */}
          <div className="md:hidden">
            <div className="w-6 h-6 text-[#f7f2d3]">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* MIDDLE SECTION: Clean Family Image */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src="/hero-family-sunset.webp"
          alt="Family silhouette at sunset"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* BOTTOM SECTION: Text Content on Slate Background */}
      <div className="bg-[#334155] text-[#f7f2d3] p-6 flex-1">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Telehealth Weight Loss Clinic & Weight Maintenance Clinic
          </h2>

          <p className="text-lg md:text-xl font-medium">
            Personalised, evidence-based care by Nurse Practitioner Justin Black
          </p>

          <p className="text-base md:text-lg">
            Justin walks your journey through real life challenges
          </p>

          <p className="text-base md:text-lg">
            Helping you lose weight safely — and most importantly keep it off - no more yo-yo diets and regains
          </p>

          <p className="text-sm md:text-base text-[#f7f2d3]/90 mb-6">
            From only $45 per consultation — Medicare rebates available to many
          </p>

          {/* BOOKING BUTTONS */}
          <div className="space-y-3 max-w-md mx-auto pt-4">
            <p className="text-center text-[#f7f2d3] font-semibold text-sm mb-4">
              👇 Choose One to Book Your Appointment 👇
            </p>

            <a
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-[#f5deb3] to-[#f7e7c5] text-[#5a4a35] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="font-bold text-sm">💊 Book Initial Consultation</div>
              <div className="text-xs">Weight Loss 30 Min • From $45</div>
            </a>

            <a
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-[#8b6f47] to-[#9d8157] text-[#f5deb3] rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="font-bold text-sm">✓ Book Review Consultation</div>
              <div className="text-xs">Weight Loss 15 Min • From $45</div>
            </a>

            <a
              href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131?appointmentTypeId=544473"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="font-bold text-sm">📋 Book General Appointment</div>
              <div className="text-xs">General Practice 10 Minutes</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}