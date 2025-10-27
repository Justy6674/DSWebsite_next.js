import { Metadata } from 'next';
import WeightLossClinicGoldCoast from '@/components/locations/WeightLossClinicGoldCoast';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Gold Coast | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Gold Coast, QLD. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic gold coast, telehealth weight loss gold coast, online weight loss consultation gold coast, medicare weight loss doctor gold coast, affordable weight loss clinic gold coast',
  openGraph: {
    title: 'Weight Loss Clinic Gold Coast | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Gold Coast, QLD. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-gold-coast',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Gold Coast - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Gold Coast | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Gold Coast, QLD. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-gold-coast',
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

export default function WeightLossClinicGoldCoastPage() {
  return <WeightLossClinicGoldCoast />;
}
