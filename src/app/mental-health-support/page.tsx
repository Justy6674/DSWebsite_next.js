import { Metadata } from 'next';
import MentalHealthSupport from '@/components/MentalHealthSupport';

export const metadata: Metadata = {
  title: 'Mental Health Support',
  description: 'Mental Health Support page - Access and manage your content',
  openGraph: {
    title: 'Mental Health Support',
    description: 'Mental Health Support page - Access and manage your content',
    url: 'https://www.downscale.com.au/mental-health-support',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Mental Health Support',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Health Support',
    description: 'Mental Health Support page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/mental-health-support',
  },
};

export default function MentalHealthSupportPage() {
  return <MentalHealthSupport />;
}