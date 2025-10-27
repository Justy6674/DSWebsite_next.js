import { Metadata } from 'next';
import WeightLossClinicHobart from '@/components/locations/WeightLossClinicHobart';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Hobart | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Hobart, TAS. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic hobart, telehealth weight loss hobart, online weight loss consultation hobart, medicare weight loss doctor hobart, affordable weight loss clinic hobart',
  openGraph: {
    title: 'Weight Loss Clinic Hobart | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Hobart, TAS. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-hobart',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Hobart - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Hobart | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Hobart, TAS. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-hobart',
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

export default function WeightLossClinicHobartPage() {
  return <WeightLossClinicHobart />;
}
