'use client';

import React from 'react';

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url('/hero-family-sunset.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 60%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* All content in one evenly spaced flex container */}
      <div className="flex-1 flex flex-col justify-between p-4 min-h-screen">

        {/* Top: Brand */}
        <div className="text-center pt-4">
          <h1 className="text-4xl md:text-6xl font-black text-[#f7f2d3] tracking-tight">
            DOWNSCALE
          </h1>
        </div>

        {/* Middle: Main content */}
        <div className="text-center">
          <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
            Online Weight Loss Clinic
            <br />
            <span className="text-lg md:text-2xl">&</span>
            <br />
            Weight Maintenance Clinic
          </h2>

          <p className="text-base md:text-lg text-white font-medium mb-2">
            Evidence-Based Medical Weight Loss with Justin Black
          </p>

          <p className="text-sm md:text-base text-white/90">
            From Only $45 Per Consultation — Medicare Rebates Processed Instantly
          </p>
        </div>

        {/* Bottom: Booking buttons */}
        <div className="space-y-2">
          <div className="text-center text-[#f7f2d3] font-semibold text-sm mb-2">
            👇 Choose One to Book Your Appointment 👇
          </div>

          <div className="space-y-2 max-w-sm mx-auto">
            <a
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-[#f5deb3] to-[#f7e7c5] text-[#5a4a35] rounded-lg p-3 text-center shadow-lg"
            >
              <div className="font-bold text-sm">💊 Book Initial Consultation</div>
              <div className="text-xs">Weight Loss 30 Min • From $45</div>
            </a>

            <a
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-[#8b6f47] to-[#9d8157] text-[#f5deb3] rounded-lg p-3 text-center shadow-lg"
            >
              <div className="font-bold text-sm">✓ Book Review Consultation</div>
              <div className="text-xs">Weight Loss 15 Min • From $45</div>
            </a>

            <a
              href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131?appointmentTypeId=544473"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg p-3 text-center shadow-lg"
            >
              <div className="font-bold text-sm">📋 Book General Appointment</div>
              <div className="text-xs">General Practice 10 Minutes</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}