import { Metadata } from 'next';
import FaqPage from '@/components/FaqPage';

export const metadata: Metadata = {
  title: 'Faq',
  description: 'Faq page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/faq',
  },
  openGraph: {
    title: 'Faq',
    description: 'Faq page - Access and manage your content',
    url: 'https://www.downscale.com.au/faq',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Faq',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Faq',
    description: 'Faq page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function FaqPagePage() {
  return <FaqPage />;
}