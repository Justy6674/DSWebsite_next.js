import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'Meet The Team',
  description: 'Meet The Team page - Access and manage your content',
  openGraph: {
    title: 'Meet The Team',
    description: 'Meet The Team page - Access and manage your content',
    url: 'https://www.downscale.com.au/meet-the-team',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Meet The Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet The Team',
    description: 'Meet The Team page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/meet-the-team',
  },
};

export default function AboutPagePage() {
  return <AboutPage />;
}