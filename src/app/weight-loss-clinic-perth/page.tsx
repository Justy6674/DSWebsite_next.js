import { Metadata } from 'next';
import WeightLossClinicPerth from '@/components/locations/WeightLossClinicPerth';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Perth | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Perth, WA. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic perth, telehealth weight loss perth, online weight loss consultation perth, medicare weight loss doctor perth, affordable weight loss clinic perth',
  openGraph: {
    title: 'Weight Loss Clinic Perth | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Perth, WA. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-perth',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.jpg',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Perth - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Perth | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Perth, WA. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-perth',
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

export default function WeightLossClinicPerthPage() {
  return <WeightLossClinicPerth />;
}
