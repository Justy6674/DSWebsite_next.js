import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Calculator = dynamic(() => import('@/components/medical/Calculator'), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>,
  ssr: false
});

export const metadata: Metadata = {
  title: 'BMI & Health Metrics Calculator | Free Weight Loss Tools',
  description: 'Calculate your BMI, ideal weight, and body composition. Free health calculator for weight loss planning and health assessment.',
  keywords: 'BMI calculator, ideal weight calculator, body metrics calculator, health calculator, weight loss calculator',
  openGraph: {
    title: 'BMI & Health Metrics Calculator | Free Weight Loss Tools',
    description: 'Calculate your BMI, ideal weight, and body composition. Free health calculator for weight loss planning and health assessment.',
    url: 'https://www.downscale.com.au/calculator',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-tools.jpg',
        width: 1200,
        height: 630,
        alt: 'BMI and Health Metrics Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI & Health Metrics Calculator | Free Weight Loss Tools',
    description: 'Calculate your BMI, ideal weight, and body composition. Free health calculator for weight loss planning.',
    images: ['https://www.downscale.com.au/og-tools.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/calculator',
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

export default function CalculatorPage() {
  return <Calculator />;
}