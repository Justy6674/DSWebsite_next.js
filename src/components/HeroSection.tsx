'use client';

import React from 'react';
import Image from 'next/image';
import { getImageProps } from 'next/image';
import styles from './HeroSection.module.css';

function getBackgroundImage(srcSet = '') {
  const imageSet = srcSet
    .split(', ')
    .map((str) => {
      const [url, dpi] = str.split(' ')
      return `url("${url}") ${dpi}`
    })
    .join(', ')
  return `image-set(${imageSet})`
}

export function HeroSection() {
  // Get optimized background image with Next.js Image props
  const {
    props: { srcSet },
  } = getImageProps({
    alt: 'Australian family at sunset - Weight Loss Clinic',
    width: 1920,
    height: 1080,
    src: '/hero-family-sunset.webp',
    sizes: "(max-width: 768px) 100vw, 100vw",
    priority: true
  });

  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <section
      className={styles.heroGrid}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), ${backgroundImage}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 65%', // Sun-centered positioning
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Brand Header */}
      <header className={styles.heroBrand}>
        <h1 className={styles.brandTitle}>DOWNSCALE</h1>
      </header>

      {/* Main Content */}
      <main className={styles.heroContent}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.heroHeading}>
            <span>Online Weight Loss Clinic</span>
            <span className={styles.ampersand}>&</span>
            <span>Weight Maintenance Clinic</span>
          </h2>

          <p className={styles.heroSubtitle}>
            Evidence-Based Medical Weight Loss with Justin Black
          </p>

          <p className={styles.heroPrice}>
            From Only $45 Per Consultation — Medicare Rebates Processed Instantly for Eligible Patients
          </p>
        </div>
      </main>

      {/* Booking Buttons */}
      <footer className={styles.heroFooter}>
        <div className={styles.ctaText}>
          <span className={styles.ctaIcon}>👇</span>
          <span>Choose One to Book Your Appointment</span>
          <span className={styles.ctaIcon}>👇</span>
        </div>

        <div className={styles.bookingGrid}>
          <a
            href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.bookingBtn} ${styles.bookingBtnInitial}`}
          >
            <span className={styles.btnTitle}>💊 Book Initial Consultation</span>
            <span className={styles.btnSubtitle}>Weight Loss 30 Min • From $45</span>
          </a>

          <a
            href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.bookingBtn} ${styles.bookingBtnReview}`}
          >
            <span className={styles.btnTitle}>✓ Book Review Consultation</span>
            <span className={styles.btnSubtitle}>Weight Loss 15 Min • From $45</span>
          </a>

          <a
            href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131?appointmentTypeId=544473"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.bookingBtn} ${styles.bookingBtnGeneral}`}
          >
            <span className={styles.btnTitle}>📋 Book General Appointment</span>
            <span className={styles.btnSubtitle}>General Practice 10 Minutes</span>
          </a>
        </div>
      </footer>
    </section>
  );
}