import { Metadata } from 'next';
import WeightLossClinicMandurah from '@/components/locations/WeightLossClinicMandurah';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Mandurah | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Mandurah, WA. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic mandurah, telehealth weight loss mandurah, online weight loss consultation mandurah, medicare weight loss doctor mandurah, affordable weight loss clinic mandurah',
  openGraph: {
    title: 'Weight Loss Clinic Mandurah | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Mandurah, WA. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-mandurah',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.jpg',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Mandurah - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Mandurah | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Mandurah, WA. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-mandurah',
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

export default function WeightLossClinicMandurahPage() {
  return <WeightLossClinicMandurah />;
}
