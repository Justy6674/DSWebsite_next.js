import { Metadata } from 'next';
import HowItWorks from '@/components/HowItWorks';

export const metadata: Metadata = {
  title: 'How It Works - Simple 3-Step Telehealth Process | Downscale Weight Loss Clinic',
  description: 'Discover our simple 3-step telehealth weight loss process. Book online, consult with healthcare professionals, receive treatment from $45. Australia-wide telehealth service.',
  openGraph: {
    title: 'How It Works - Simple 3-Step Telehealth Process | Downscale Weight Loss Clinic',
    description: 'Discover our simple 3-step telehealth weight loss process. Book online, consult with healthcare professionals, receive treatment from $45. Australia-wide telehealth service.',
    url: 'https://www.downscale.com.au/how-it-works',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'How Our 3-Step Telehealth Weight Loss Process Works - Downscale',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works - Simple 3-Step Telehealth Process | Downscale Weight Loss Clinic',
    description: 'Discover our simple 3-step telehealth weight loss process. Book online, consult with healthcare professionals, receive treatment from $45.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/how-it-works',
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

export default function HowItWorksPage() {
  return <HowItWorks />;
}