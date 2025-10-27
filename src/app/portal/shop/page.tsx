import { Metadata } from 'next';
import ShopPortalClient from './ShopPortalClient';

export const metadata: Metadata = {
  title: 'Health Shop & Supplements | Patient Portal | Downscale Weight Loss Clinic',
  description: 'Access curated health supplements, weight management products, and wellness resources. TGA-approved supplements and evidence-based health products for weight loss.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/shop',
  },
  openGraph: {
    title: 'Health Shop & Supplements | Patient Portal | Downscale',
    description: 'Access curated health supplements and weight management products. TGA-approved supplements and wellness resources.',
    url: 'https://www.downscale.com.au/portal/shop',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-shop.jpg',
        secureUrl: 'https://www.downscale.com.au/og-shop.jpg',
        width: 1200,
        height: 630,
        alt: 'Health Shop Portal - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Shop & Supplements | Downscale Portal',
    description: 'Curated health supplements and weight management products.',
    images: ['https://www.downscale.com.au/og-shop.jpg'],
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

export default function ShopPortal() {
  return <ShopPortalClient />;
}