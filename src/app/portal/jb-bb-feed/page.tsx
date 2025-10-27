import { Metadata } from 'next';
import JBBBFeedClient from './JBBBFeedClient';

export const metadata: Metadata = {
  title: 'Clinical Updates Feed | JB&BB Personal Blog | Downscale Weight Loss Clinic',
  description: 'Exclusive member feed with personal insights, clinical updates, and weight management tips from Dr JB and Bec. Behind-the-scenes clinic updates and real-time patient support.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/jb-bb-feed',
  },
  openGraph: {
    title: 'Clinical Updates Feed | JB&BB Personal Blog | Downscale',
    description: 'Exclusive member feed with personal insights and clinical updates from Dr JB and Bec. Real-time patient support and weight management tips.',
    url: 'https://www.downscale.com.au/portal/jb-bb-feed',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-jb-bb-feed.jpg',
        secureUrl: 'https://www.downscale.com.au/og-jb-bb-feed.jpg',
        width: 1200,
        height: 630,
        alt: 'JB&BB Clinical Updates Feed - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinical Updates Feed | JB&BB Personal Blog | Downscale',
    description: 'Exclusive member feed with personal insights and clinical updates from Dr JB and Bec.',
    images: ['https://www.downscale.com.au/og-jb-bb-feed.jpg'],
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

export default function JBBBFeedPage() {
  return <JBBBFeedClient />;
}