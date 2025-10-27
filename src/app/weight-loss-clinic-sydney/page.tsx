import { Metadata } from 'next';
import WeightLossClinicSydney from '@/components/locations/WeightLossClinicSydney';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Sydney | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Sydney. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic sydney, telehealth weight loss sydney, online weight loss consultation sydney, medicare weight loss doctor sydney, affordable weight loss clinic sydney',
  openGraph: {
    title: 'Weight Loss Clinic Sydney | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Sydney. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-sydney',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.jpg',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Sydney - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Sydney | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Sydney. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-sydney',
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

export default function WeightLossClinicSydneyPage() {
  return <WeightLossClinicSydney />;
}