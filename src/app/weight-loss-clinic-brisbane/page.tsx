import { Metadata } from 'next';
import WeightLossClinicBrisbane from '@/components/locations/WeightLossClinicBrisbane';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Brisbane | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Brisbane, QLD. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic brisbane, telehealth weight loss brisbane, online weight loss consultation brisbane, medicare weight loss doctor brisbane, affordable weight loss clinic brisbane',
  openGraph: {
    title: 'Weight Loss Clinic Brisbane | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Brisbane, QLD. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-brisbane',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Brisbane - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Brisbane | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Brisbane, QLD. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-services.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-brisbane',
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

export default function WeightLossClinicBrisbanePage() {
  return <WeightLossClinicBrisbane />;
}
