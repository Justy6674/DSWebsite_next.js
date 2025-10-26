import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page - Access and manage your content',
  openGraph: {
    title: 'About',
    description: 'About page - Access and manage your content',
    url: 'https://www.downscale.com.au/about',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'About',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About',
    description: 'About page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/about',
  },
};

export default function AboutPagePage() {
  return <AboutPage />;
}