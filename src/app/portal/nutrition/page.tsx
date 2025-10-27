import { Metadata } from 'next';
import NutritionPortalClient from './NutritionPortalClient';

export const metadata: Metadata = {
  title: 'Nutrition Hub | Evidence-Based Meal Plans & Resources | Downscale Weight Loss Clinic',
  description: 'Evidence-based nutrition resources, personalised meal plans, and dietary tools to support your weight management journey. Professional nutritional guidance for sustainable weight loss.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/nutrition',
  },
  openGraph: {
    title: 'Nutrition Hub | Evidence-Based Meal Plans & Resources | Downscale',
    description: 'Evidence-based nutrition resources, personalised meal plans, and dietary tools to support sustainable weight management.',
    url: 'https://www.downscale.com.au/portal/nutrition',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-nutrition.jpg',
        secureUrl: 'https://www.downscale.com.au/og-nutrition.jpg',
        width: 1200,
        height: 630,
        alt: 'Nutrition Hub - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nutrition Hub | Evidence-Based Meal Plans | Downscale',
    description: 'Evidence-based nutrition resources and personalised meal plans for sustainable weight management.',
    images: ['https://www.downscale.com.au/og-nutrition.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NutritionPortalPage() {
  return <NutritionPortalClient />;
}