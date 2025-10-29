import { Metadata } from 'next';
import MentalHealthSubDashboardClient from './MentalHealthSubDashboardClient';

export const metadata: Metadata = {
  title: 'Mental Health Hub | Psychological Support & Assessments | Downscale Weight Loss Clinic',
  description: 'Evidence-based mental health resources, psychological assessments, and support tools for holistic weight management. Professional mental health support integrated with weight loss treatment.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/mental-health',
  },
  openGraph: {
    title: 'Mental Health Hub | Psychological Support & Assessments | Downscale',
    description: 'Evidence-based mental health resources, psychological assessments, and support tools for holistic weight management. Professional psychological support.',
    url: 'https://www.downscale.com.au/portal/mental-health',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-mental-health.jpg',
        secureUrl: 'https://www.downscale.com.au/og-mental-health.jpg',
        width: 1200,
        height: 630,
        alt: 'Mental Health Hub - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Health Hub | Psychological Support | Downscale',
    description: 'Evidence-based mental health resources and support tools for holistic weight management.',
    images: ['https://www.downscale.com.au/og-mental-health.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function MentalHealthPortalPage() {
  return <MentalHealthSubDashboardClient />;
}