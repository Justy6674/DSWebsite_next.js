import { Metadata } from 'next';
import WeightLossClinicSunshineCoast from '@/components/locations/WeightLossClinicSunshineCoast';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Sunshine Coast | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Sunshine Coast, QLD. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic sunshine coast, telehealth weight loss sunshine coast, online weight loss consultation sunshine coast, medicare weight loss doctor sunshine coast, affordable weight loss clinic sunshine coast',
  openGraph: {
    title: 'Weight Loss Clinic Sunshine Coast | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Sunshine Coast, QLD. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-sunshine-coast',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Sunshine Coast - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Sunshine Coast | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Sunshine Coast, QLD. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-services.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-sunshine-coast',
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

export default function WeightLossClinicSunshineCoastPage() {
  return <WeightLossClinicSunshineCoast />;
}
