import { Metadata } from 'next';
import WeightLossClinicTownsville from '@/components/locations/WeightLossClinicTownsville';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Townsville | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Townsville, QLD. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic townsville, telehealth weight loss townsville, online weight loss consultation townsville, medicare weight loss doctor townsville, affordable weight loss clinic townsville',
  openGraph: {
    title: 'Weight Loss Clinic Townsville | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Townsville, QLD. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-townsville',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Townsville - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Townsville | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Townsville, QLD. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-townsville',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function WeightLossClinicTownsvillePage() {
  return <WeightLossClinicTownsville />;
}
