import { Metadata } from 'next';
import MentalHealthSupport from '@/components/MentalHealthSupport';

export const metadata: Metadata = {
  title: 'Mental Health Support for Weight Management | Psychology & Wellbeing | Downscale',
  description: 'Professional mental health support for weight management. Address emotional eating, body image, motivation and psychological barriers to weight loss. Telehealth counselling from $45.',
  openGraph: {
    title: 'Mental Health Support for Weight Management | Psychology & Wellbeing | Downscale',
    description: 'Professional mental health support for weight management. Address emotional eating, body image, motivation and psychological barriers to weight loss. Telehealth counselling from $45.',
    url: 'https://www.downscale.com.au/mental-health-support',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Mental Health Support for Weight Management - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Health Support for Weight Management | Psychology & Wellbeing | Downscale',
    description: 'Professional mental health support for weight management. Address emotional eating, body image, motivation and psychological barriers to weight loss.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/mental-health-support',
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

export default function MentalHealthSupportPage() {
  return <MentalHealthSupport />;
}