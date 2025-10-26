import { Metadata } from 'next';
import ConditionsPage from '@/components/ConditionsPage';

export const metadata: Metadata = {
  title: 'Conditions',
  description: 'Conditions page - Access and manage your content',
  openGraph: {
    title: 'Conditions',
    description: 'Conditions page - Access and manage your content',
    url: 'https://www.downscale.com.au/conditions',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Conditions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conditions',
    description: 'Conditions page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/conditions',
  },
};

export default function ConditionsPagePage() {
  return <ConditionsPage />;
}