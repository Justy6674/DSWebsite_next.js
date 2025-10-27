import { Metadata } from 'next';
import WeightLossClinicBendigo from '@/components/locations/WeightLossClinicBendigo';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Bendigo | $45 Affordable Telehealth | Downscale Weight Loss Clinic',
  description: 'Professional telehealth weight loss clinic serving Bendigo, VIC. Consultations from $45 with experienced Nurse Practitioner Justin Black. Medicare rebates available. Book online today.',
  keywords: 'weight loss clinic bendigo, telehealth weight loss bendigo, online weight loss consultation bendigo, medicare weight loss doctor bendigo, affordable weight loss clinic bendigo',
  openGraph: {
    title: 'Weight Loss Clinic Bendigo | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Bendigo, VIC. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-bendigo',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.jpg',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Bendigo - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Bendigo | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Bendigo, VIC. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-bendigo',
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

export default function WeightLossClinicBendigoPage() {
  return <WeightLossClinicBendigo />;
}
