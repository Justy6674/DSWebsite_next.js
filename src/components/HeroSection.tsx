'use client';

import React from 'react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <>
      {/* MOBILE HERO: Keep original family sunset design */}
      <div className="flex flex-col lg:hidden">
        {/* HERO IMAGE SECTION: Clean Family Image */}
        <div className="relative h-64 md:h-80">
          <Image
            src="/hero-family-sunset.webp"
            alt="Family silhouette at sunset - Downscale Weight Loss Clinic"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* BOTTOM SECTION: Text Content on Slate Background */}
        <div className="bg-[#334155] text-[#f7f2d3] px-4 py-4">
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

            {/* MOBILE BOOKING BUTTONS */}
            <div className="max-w-sm mx-auto pt-1 pb-4">
              <p className="text-center text-[#f7f2d3] font-semibold text-xs md:text-sm mb-1 md:mb-4">
                👇 Choose One to Book Your Appointment 👇
              </p>

              <div className="space-y-1">
                <a
                  href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-[#f5deb3] to-[#f7e7c5] text-[#5a4a35] rounded-lg p-2 text-center shadow-lg"
                >
                  <div className="font-bold text-xs">💊 Book Initial Consultation</div>
                  <div className="text-xs">Weight Loss 30 Min • From $45</div>
                </a>

                <a
                  href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-[#8b6f47] to-[#9d8157] text-[#f5deb3] rounded-lg p-2 text-center shadow-lg"
                >
                  <div className="font-bold text-xs">✓ Book Review Consultation</div>
                  <div className="text-xs">Weight Loss 15 Min • From $45</div>
                </a>

                <a
                  href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131?appointmentTypeId=544473"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg p-2 text-center shadow-lg"
                >
                  <div className="font-bold text-xs">📋 Book General Appointment</div>
                  <div className="text-xs">General Practice 10 Minutes</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP HERO: New two-column layout */}
      <div className="hidden lg:block bg-[#334155] min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT COLUMN: Content */}
            <div className="text-[#f7f2d3] space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="block">Weight Loss Clinic &</span>
                  <span className="block">Weight Maintenance Clinic</span>
                </h1>

                <p className="text-xl xl:text-2xl font-medium leading-relaxed">
                  Personalised, evidence-based telehealth care by Nurse Practitioner Justin Black
                </p>

                <p className="text-lg xl:text-xl">
                  Justin walks your journey through real life challenges
                </p>

                <p className="text-lg xl:text-xl">
                  Helping you lose weight safely — and most importantly keep it off - no more yo-yo diets and regains
                </p>

                <p className="text-base xl:text-lg text-[#f7f2d3]/90">
                  From only $45 per consultation — Medicare rebates available to many
                </p>
              </div>

              {/* DESKTOP BOOKING BUTTONS */}
              <div className="space-y-6">
                <p className="text-center text-[#f7f2d3] font-semibold text-lg">
                  👇 Choose One to Book Your Appointment 👇
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <a
                    href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-center items-center bg-gradient-to-r from-[#f5deb3] to-[#f7e7c5] text-[#5a4a35] rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[120px]"
                  >
                    <div className="font-bold text-lg mb-1">💊 Book Initial</div>
                    <div className="text-sm mb-2">Consultation</div>
                    <div className="text-xs">Weight Loss 30 Min • From $45</div>
                  </a>

                  <a
                    href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-center items-center bg-gradient-to-r from-[#8b6f47] to-[#9d8157] text-[#f5deb3] rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[120px]"
                  >
                    <div className="font-bold text-lg mb-1">✓ Book Review</div>
                    <div className="text-sm mb-2">Consultation</div>
                    <div className="text-xs">Weight Loss 15 Min • From $45</div>
                  </a>

                  <a
                    href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131?appointmentTypeId=544473"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-center items-center bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl p-6 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[120px]"
                  >
                    <div className="font-bold text-lg mb-1">📋 Book General</div>
                    <div className="text-sm mb-2">Appointment</div>
                    <div className="text-xs">General Practice 10 Minutes</div>
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Hero Image */}
            <div className="relative">
              <div className="relative h-[600px] xl:h-[700px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-family-sunset.webp"
                  alt="Family silhouette at sunset - Downscale Weight Loss Clinic"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}