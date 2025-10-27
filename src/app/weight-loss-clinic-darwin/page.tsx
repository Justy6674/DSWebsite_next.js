import { Metadata } from 'next';
import WeightLossClinicDarwin from '@/components/locations/WeightLossClinicDarwin';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Darwin | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Darwin, NT. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic darwin, telehealth weight loss darwin, online weight loss consultation darwin, medicare weight loss doctor darwin, affordable weight loss clinic darwin',
  openGraph: {
    title: 'Weight Loss Clinic Darwin | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Darwin, NT. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-darwin',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Darwin - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Darwin | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Darwin, NT. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-darwin',
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

export default function WeightLossClinicDarwinPage() {
  return <WeightLossClinicDarwin />;
}
