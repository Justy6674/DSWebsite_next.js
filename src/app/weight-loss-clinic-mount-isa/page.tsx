import { Metadata } from 'next';
import WeightLossClinicMountIsa from '@/components/locations/WeightLossClinicMountIsa';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Mount Isa | $45 Telehealth Mining Town QLD | Downscale',
  description: 'Professional telehealth weight loss clinic serving Mount Isa and remote Queensland. Consultations from $45 with experienced Nurse Practitioner. Medicare rebates available for mining communities.',
  keywords: 'weight loss clinic mount isa, telehealth weight loss remote qld, online weight loss mining town, medicare weight loss doctor mount isa, remote weight loss clinic queensland',
  openGraph: {
    title: 'Weight Loss Clinic Mount Isa | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Mount Isa and remote Queensland. Consultations from $45 with instant Medicare rebate processing.',
    url: 'https://www.downscale.com.au/weight-loss-clinic-mount-isa',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-locations.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Mount Isa - Professional telehealth weight management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Mount Isa | Professional Telehealth Medicare',
    description: 'Professional telehealth weight loss clinic serving Mount Isa and remote Queensland. Consultations from $45 with instant Medicare rebate processing.',
    images: ['https://www.downscale.com.au/og-locations.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/weight-loss-clinic-mount-isa',
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

export default function WeightLossClinicMountIsaPage() {
  return <WeightLossClinicMountIsa />;
}