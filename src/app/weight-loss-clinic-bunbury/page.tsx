import { Metadata } from 'next';
import WeightLossClinicBunbury from '@/components/locations/WeightLossClinicBunbury';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Bunbury | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Bunbury, WA. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic bunbury, telehealth weight loss bunbury, online weight loss consultation bunbury, medicare weight loss doctor bunbury, affordable weight loss clinic bunbury',
  openGraph: {
    title: 'Weight Loss Clinic Bunbury | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Bunbury, WA. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-bunbury',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Bunbury - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Bunbury | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Bunbury, WA. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-bunbury',
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

export default function WeightLossClinicBunburyPage() {
  return <WeightLossClinicBunbury />;
}
