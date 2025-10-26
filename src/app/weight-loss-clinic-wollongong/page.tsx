import { Metadata } from 'next';
import WeightLossClinicWollongong from '@/components/locations/WeightLossClinicWollongong';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Wollongong | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Wollongong, NSW. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic wollongong, telehealth weight loss wollongong, online weight loss consultation wollongong, medicare weight loss doctor wollongong, affordable weight loss clinic wollongong',
  openGraph: {
    title: 'Weight Loss Clinic Wollongong | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Wollongong, NSW. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-wollongong',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Wollongong - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Wollongong | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Wollongong, NSW. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-services.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-wollongong',
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

export default function WeightLossClinicWollongongPage() {
  return <WeightLossClinicWollongong />;
}
