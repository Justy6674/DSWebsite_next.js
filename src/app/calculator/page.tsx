import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Calculator = dynamic(() => import('@/components/medical/Calculator'), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>,
  ssr: false
});

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