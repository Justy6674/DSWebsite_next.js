import { Metadata } from 'next';
import SavedResourcesClient from './SavedResourcesClient';

export const metadata: Metadata = {
  title: 'Saved Resources & Bookmarks | Patient Portal | Downscale Weight Loss Clinic',
  description: 'Access your saved articles, resources, meal plans, and educational materials. Personalised collection of weight management tools and healthcare information.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/saved',
  },
  openGraph: {
    title: 'Saved Resources & Bookmarks | Patient Portal | Downscale',
    description: 'Access your saved articles, resources, meal plans, and educational materials for weight management.',
    url: 'https://www.downscale.com.au/portal/saved',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal.jpg',
        width: 1200,
        height: 630,
        alt: 'Saved Resources Portal - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saved Resources & Bookmarks | Downscale Portal',
    description: 'Access your saved weight management resources and educational materials.',
    images: ['https://www.downscale.com.au/og-portal.jpg'],
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

export default function SavedResourcesPage() {
  return <SavedResourcesClient />;
}