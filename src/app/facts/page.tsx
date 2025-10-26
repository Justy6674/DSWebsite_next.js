import { Metadata } from 'next';
import FactsPage from '@/components/FactsPage';

export const metadata: Metadata = {
  title: 'Facts',
  description: 'Facts page - Access and manage your content',
  openGraph: {
    title: 'Facts',
    description: 'Facts page - Access and manage your content',
    url: 'https://www.downscale.com.au/facts',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Facts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Facts',
    description: 'Facts page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/facts',
  },
};

export default function FactsPagePage() {
  return <FactsPage />;
}