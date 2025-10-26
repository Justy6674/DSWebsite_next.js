import { Metadata } from 'next';
import WeightLossClinicMelbourne from '@/components/locations/WeightLossClinicMelbourne';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Melbourne | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Melbourne, VIC. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic melbourne, telehealth weight loss melbourne, online weight loss consultation melbourne, medicare weight loss doctor melbourne, affordable weight loss clinic melbourne',
  openGraph: {
    title: 'Weight Loss Clinic Melbourne | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Melbourne, VIC. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-melbourne',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Melbourne - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Melbourne | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Melbourne, VIC. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-services.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-melbourne',
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

export default function WeightLossClinicMelbournePage() {
  return <WeightLossClinicMelbourne />;
}
