import { Metadata } from 'next';
import WeightLossClinicDubbo from '@/components/locations/WeightLossClinicDubbo';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Dubbo | $45 Telehealth Western NSW | Downscale',
  description: 'Professional telehealth weight loss clinic serving Dubbo and Western NSW. Consultations from $45 with experienced Nurse Practitioner. Medicare rebates available for rural residents.',
  keywords: 'weight loss clinic dubbo, telehealth weight loss western nsw, online weight loss dubbo, medicare weight loss doctor dubbo, rural weight loss clinic nsw',
  openGraph: {
    title: 'Weight Loss Clinic Dubbo | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Dubbo and Western NSW. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-dubbo',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Dubbo - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Dubbo | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Dubbo and Western NSW. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-dubbo',
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

export default function WeightLossClinicDubboPage() {
  return <WeightLossClinicDubbo />;
}