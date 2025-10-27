import { Metadata } from 'next';
import WeightLossClinicMackay from '@/components/locations/WeightLossClinicMackay';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Mackay | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Mackay, QLD. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic mackay, telehealth weight loss mackay, online weight loss consultation mackay, medicare weight loss doctor mackay, affordable weight loss clinic mackay',
  openGraph: {
    title: 'Weight Loss Clinic Mackay | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Mackay, QLD. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-mackay',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.jpg',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Mackay - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Mackay | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Mackay, QLD. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-mackay',
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

export default function WeightLossClinicMackayPage() {
  return <WeightLossClinicMackay />;
}
