import { Metadata } from 'next';
import WeightLossClinicCentralCoast from '@/components/locations/WeightLossClinicCentralCoast';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Central Coast | $45 Telehealth Gosford Wyong | Downscale',
  description: 'Professional telehealth weight loss clinic serving Central Coast NSW. Consultations from $45 with experienced Nurse Practitioner. Medicare rebates available for Gosford, Wyong residents.',
  keywords: 'weight loss clinic central coast, telehealth weight loss gosford, online weight loss wyong, medicare weight loss doctor central coast, affordable weight loss clinic gosford',
  openGraph: {
    title: 'Weight Loss Clinic Central Coast | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Central Coast NSW. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-central-coast',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Central Coast - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Central Coast | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Central Coast NSW. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-services.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-central-coast',
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

export default function WeightLossClinicCentralCoastPage() {
  return <WeightLossClinicCentralCoast />;
}