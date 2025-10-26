import { Metadata } from 'next';
import Calculator from '@/components/medical/Calculator';

export const metadata: Metadata = {
  title: 'Calculator',
  description: 'Calculator page - Access and manage your content',
  openGraph: {
    title: 'Calculator',
    description: 'Calculator page - Access and manage your content',
    url: 'https://www.downscale.com.au/calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator',
    description: 'Calculator page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/calculator',
  },
};

export default function CalculatorPage() {
  return <Calculator />;
}