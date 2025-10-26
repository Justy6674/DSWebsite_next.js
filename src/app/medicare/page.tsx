import { Metadata } from 'next';
import MedicareBilling from '@/components/MedicareBillingPage';

export const metadata: Metadata = {
  title: 'Medicare',
  description: 'Medicare page - Access and manage your content',
  openGraph: {
    title: 'Medicare',
    description: 'Medicare page - Access and manage your content',
    url: 'https://www.downscale.com.au/medicare',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Medicare',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medicare',
    description: 'Medicare page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/medicare',
  },
};

export default function MedicareBillingPage() {
  return <MedicareBilling />;
}