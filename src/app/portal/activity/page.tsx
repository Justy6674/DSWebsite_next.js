import { Metadata } from 'next';
import ActivityPortalClient from './ActivityPortalClient';

export const metadata: Metadata = {
  title: 'Activity Hub | Exercise Programs & Fitness Tracking | Downscale Weight Loss Clinic',
  description: 'Evidence-based exercise programs, movement tracking, and fitness tools designed for sustainable weight management. Personalised activity plans and progress monitoring for optimal health outcomes.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/activity',
  },
  openGraph: {
    title: 'Activity Hub | Exercise Programs & Fitness Tracking | Downscale',
    description: 'Evidence-based exercise programs, movement tracking, and fitness tools designed for sustainable weight management. Personalised activity plans for optimal health.',
    url: 'https://www.downscale.com.au/portal/activity',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-activity.jpg',
        secureUrl: 'https://www.downscale.com.au/og-activity.jpg',
        width: 1200,
        height: 630,
        alt: 'Activity Hub - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Activity Hub | Exercise Programs & Fitness Tracking | Downscale',
    description: 'Evidence-based exercise programs and fitness tools for sustainable weight management.',
    images: ['https://www.downscale.com.au/og-activity.jpg'],
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

export default function ActivityPortalPage() {
  return <ActivityPortalClient />;
}