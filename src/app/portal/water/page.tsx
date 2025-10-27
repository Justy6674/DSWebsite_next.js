import { Metadata } from 'next';
import WaterPortalClient from './WaterPortalClient';

export const metadata: Metadata = {
  title: 'Hydration & Water Tracking | Patient Portal | Downscale Weight Loss Clinic',
  description: 'Track daily water intake, hydration goals, and fluid balance. Evidence-based hydration strategies to support weight loss and metabolic health optimization.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/water',
  },
  openGraph: {
    title: 'Hydration & Water Tracking | Patient Portal | Downscale',
    description: 'Track daily water intake and hydration goals. Evidence-based strategies for weight loss support.',
    url: 'https://www.downscale.com.au/portal/water',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-hydration.jpg',
        secureUrl: 'https://www.downscale.com.au/og-hydration.jpg',
        width: 1200,
        height: 630,
        alt: 'Hydration Tracking Portal - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hydration & Water Tracking | Downscale Portal',
    description: 'Track water intake and hydration goals for weight loss support.',
    images: ['https://www.downscale.com.au/og-hydration.jpg'],
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

export default function WaterPortalPage() {
  return <WaterPortalClient />;
}