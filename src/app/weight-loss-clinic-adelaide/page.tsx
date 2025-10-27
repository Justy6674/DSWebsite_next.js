import { Metadata } from 'next';
import WeightLossClinicAdelaide from '@/components/locations/WeightLossClinicAdelaide';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Adelaide | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Adelaide, SA. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic adelaide, telehealth weight loss adelaide, online weight loss consultation adelaide, medicare weight loss doctor adelaide, affordable weight loss clinic adelaide',
  openGraph: {
    title: 'Weight Loss Clinic Adelaide | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Adelaide, SA. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-adelaide',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Adelaide - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Adelaide | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Adelaide, SA. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-adelaide',
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

export default function WeightLossClinicAdelaidePage() {
  return <WeightLossClinicAdelaide />;
}
