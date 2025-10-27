import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Calculator = dynamic(() => import('@/components/medical/Calculator'), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>,
  ssr: false
});

export const metadata: Metadata = {
  title: 'Health & Weight Loss Calculators | BMI, TDEE & Body Fat Calculator | Downscale',
  description: 'Free medical calculators for weight management. Calculate BMI, TDEE, body fat percentage, ideal weight and daily calorie needs. Professional health assessment tools.',
  openGraph: {
    title: 'Health & Weight Loss Calculators | BMI, TDEE & Body Fat Calculator | Downscale',
    description: 'Free medical calculators for weight management. Calculate BMI, TDEE, body fat percentage, ideal weight and daily calorie needs. Professional health assessment tools.',
    url: 'https://www.downscale.com.au/calculator',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Health and Weight Loss Calculators - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health & Weight Loss Calculators | BMI, TDEE & Body Fat Calculator | Downscale',
    description: 'Free medical calculators for weight management. Calculate BMI, TDEE, body fat percentage, ideal weight and daily calorie needs.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
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