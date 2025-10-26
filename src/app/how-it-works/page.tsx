import { Metadata } from 'next';
import HowItWorks from '@/components/HowItWorks';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'How It Works page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/how-it-works',
  },
  openGraph: {
    title: 'How It Works',
    description: 'How It Works page - Access and manage your content',
    url: 'https://www.downscale.com.au/how-it-works',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'How It Works',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works',
    description: 'How It Works page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function HowItWorksPage() {
  return <HowItWorks />;
}