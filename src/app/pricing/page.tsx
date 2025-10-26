import { Metadata } from 'next';
import PricingPage from '@/components/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Pricing page - Access and manage your content',
  openGraph: {
    title: 'Pricing',
    description: 'Pricing page - Access and manage your content',
    url: 'https://www.downscale.com.au/pricing',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Pricing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing',
    description: 'Pricing page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function PricingPagePage() {
  return <PricingPage />;
}