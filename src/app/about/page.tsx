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
        url: 'https://www.downscale.com.au/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png',
        width: 1200,
        height: 630,
        alt: 'Meet Justin Black and Bec - Downscale Weight Loss Clinic Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About',
    description: 'About page - Access and manage your content',
    images: ['https://www.downscale.com.au/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/about',
  },
};

export default function AboutPagePage() {
  return <AboutPage />;
}