import { Metadata } from 'next';
import WeightLossClinicLaunceston from '@/components/locations/WeightLossClinicLaunceston';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Launceston | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Launceston, TAS. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic launceston, telehealth weight loss launceston, online weight loss consultation launceston, medicare weight loss doctor launceston, affordable weight loss clinic launceston',
  openGraph: {
    title: 'Weight Loss Clinic Launceston | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Launceston, TAS. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-launceston',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Launceston - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Launceston | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Launceston, TAS. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-launceston',
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

export default function WeightLossClinicLauncestonPage() {
  return <WeightLossClinicLaunceston />;
}
