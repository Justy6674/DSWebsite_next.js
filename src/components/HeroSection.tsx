'use client';

import React from 'react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HERO IMAGE SECTION: Clean Family Image */}
      <div className="relative h-64 md:h-80 lg:h-96">
        <Image
          src="/hero-family-sunset.webp"
          alt="Family silhouette at sunset"
          fill
          className="object-cover object-center md:object-contain lg:object-cover"
          priority
        />
      </div>

      {/* BOTTOM SECTION: Text Content on Slate Background */}
      <div className="bg-[#334155] text-[#f7f2d3] p-4 flex-1">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h2 className="text-xl md:text-3xl font-bold leading-tight">
            <span className="block">Weight Loss Clinic</span>
            <span className="block text-base md:text-2xl">&</span>
            <span className="block">Weight Maintenance Clinic</span>
          </h2>

          <p className="text-base md:text-xl font-medium">
            Personalised, evidence-based telehealth care by Nurse Practitioner Justin Black
          </p>

          <p className="text-sm md:text-lg">
            Justin walks your journey through real life challenges
          </p>

          <p className="text-sm md:text-lg">
            Helping you lose weight safely — and most importantly keep it off - no more yo-yo diets and regains
          </p>

          <p className="text-xs md:text-base text-[#f7f2d3]/90 mb-2">
            From only $45 per consultation — Medicare rebates available to many
          </p>

          {/* BOOKING BUTTONS */}
          <div className="space-y-1 max-w-sm mx-auto pt-1">
            <p className="text-center text-[#f7f2d3] font-semibold text-xs mb-1">
              👇 Choose One to Book Your Appointment 👇
            </p>

            <a
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-[#f5deb3] to-[#f7e7c5] text-[#5a4a35] rounded-lg p-2 md:p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="font-bold text-xs md:text-sm">💊 Book Initial Consultation</div>
              <div className="text-xs">Weight Loss 30 Min • From $45</div>
            </a>

            <a
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-[#8b6f47] to-[#9d8157] text-[#f5deb3] rounded-lg p-2 md:p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="font-bold text-xs md:text-sm">✓ Book Review Consultation</div>
              <div className="text-xs">Weight Loss 15 Min • From $45</div>
            </a>

            <a
              href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131?appointmentTypeId=544473"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg p-2 md:p-4 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="font-bold text-xs md:text-sm">📋 Book General Appointment</div>
              <div className="text-xs">General Practice 10 Minutes</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}