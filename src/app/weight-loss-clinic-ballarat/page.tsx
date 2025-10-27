import { Metadata } from 'next';
import WeightLossClinicBallarat from '@/components/locations/WeightLossClinicBallarat';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Ballarat | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Ballarat, VIC. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic ballarat, telehealth weight loss ballarat, online weight loss consultation ballarat, medicare weight loss doctor ballarat, affordable weight loss clinic ballarat',
  openGraph: {
    title: 'Weight Loss Clinic Ballarat | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Ballarat, VIC. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-ballarat',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Ballarat - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Ballarat | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Ballarat, VIC. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-ballarat',
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

export default function WeightLossClinicBallaratPage() {
  return <WeightLossClinicBallarat />;
}
