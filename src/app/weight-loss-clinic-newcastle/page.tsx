import { Metadata } from 'next';
import WeightLossClinicNewcastle from '@/components/locations/WeightLossClinicNewcastle';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Newcastle | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Newcastle, NSW. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic newcastle, telehealth weight loss newcastle, online weight loss consultation newcastle, medicare weight loss doctor newcastle, affordable weight loss clinic newcastle',
  openGraph: {
    title: 'Weight Loss Clinic Newcastle | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Newcastle, NSW. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-newcastle',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Newcastle - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Newcastle | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Newcastle, NSW. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-newcastle',
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

export default function WeightLossClinicNewcastlePage() {
  return <WeightLossClinicNewcastle />;
}
