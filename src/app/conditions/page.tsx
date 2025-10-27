import { Metadata } from 'next';
import ConditionsPage from '@/components/ConditionsPage';

export const metadata: Metadata = {
  title: 'Weight-Related Health Conditions We Treat | Downscale Weight Loss Clinic',
  description: 'Comprehensive treatment for obesity, diabetes, metabolic syndrome, and weight-related health conditions. Professional telehealth care across Australia from $45.',
  openGraph: {
    title: 'Weight-Related Health Conditions We Treat | Downscale Weight Loss Clinic',
    description: 'Comprehensive treatment for obesity, diabetes, metabolic syndrome, and weight-related health conditions. Professional telehealth care across Australia from $45.',
    url: 'https://www.downscale.com.au/conditions',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Weight-Related Health Conditions Treatment - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight-Related Health Conditions We Treat | Downscale Weight Loss Clinic',
    description: 'Comprehensive treatment for obesity, diabetes, metabolic syndrome, and weight-related health conditions. Professional telehealth care across Australia from $45.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/conditions',
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

export default function ConditionsPagePage() {
  return <ConditionsPage />;
}