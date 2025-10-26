import { Metadata } from 'next';
import WeightLossClinicToowoomba from '@/components/locations/WeightLossClinicToowoomba';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Toowoomba | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Toowoomba, QLD. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic toowoomba, telehealth weight loss toowoomba, online weight loss consultation toowoomba, medicare weight loss doctor toowoomba, affordable weight loss clinic toowoomba',
  openGraph: {
    title: 'Weight Loss Clinic Toowoomba | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Toowoomba, QLD. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-toowoomba',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Toowoomba - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Toowoomba | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Toowoomba, QLD. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-services.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-toowoomba',
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

export default function WeightLossClinicToowoombaPage() {
  return <WeightLossClinicToowoomba />;
}
