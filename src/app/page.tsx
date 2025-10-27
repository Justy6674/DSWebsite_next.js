import { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black',
  description: 'Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates.',
  openGraph: {
    title: 'Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black',
    description: 'Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates.',
    url: 'https://www.downscale.com.au',
    images: [
      {
        url: 'https://www.downscale.com.au/hero-family-sunset.webp',
        width: 1200,
        height: 800,
        alt: 'Downscale Weight Loss Clinic - Australian telehealth weight loss and weight maintenance clinic with Justin Black',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/',
  },
};

export default function HomePagePage() {
  return (
    <>
      {/* Structured Data for Organization */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Downscale Weight Loss Clinic",
            "url": "https://www.downscale.com.au/",
            "logo": "https://www.downscale.com.au/og-image.jpg",
            "description": "Professional telehealth weight loss clinic providing $45 maximum out-of-pocket consultations with Nurse Practitioner Justin Black across Australia.",
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
            "medicalSpecialty": ["Weight Management", "General Practice", "Telehealth"],
            "priceRange": "$0-$80",
            "paymentAccepted": ["Medicare", "Credit Card", "Debit Card"],
            "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
            "sameAs": [
              "https://www.facebook.com/445168355337624",
              "https://www.instagram.com/downscale_weightloss"
            ]
          })
        }}
      />
      {/* Structured Data for Website */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Downscale Weight Loss Clinic",
            "url": "https://www.downscale.com.au/"
          })
        }}
      />
      <HomePage />
    </>
  );
}