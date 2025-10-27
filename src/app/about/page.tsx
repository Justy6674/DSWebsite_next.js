import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'About Justin Black & Team | Downscale Weight Loss Clinic Australia',
  description: 'Meet Justin Black, Nurse Practitioner with 25+ years experience. Learn about Downscale Weight Loss Clinic team, our approach, and commitment to affordable weight management.',
  openGraph: {
    title: 'About Justin Black & Team | Downscale Weight Loss Clinic Australia',
    description: 'Meet Justin Black, Nurse Practitioner with 25+ years experience. Learn about Downscale Weight Loss Clinic team, our approach, and commitment to affordable weight management.',
    url: 'https://www.downscale.com.au/about',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png',
        secureUrl: 'https://www.downscale.com.au/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png',
        width: 1200,
        height: 630,
        alt: 'Meet Justin Black and Bec - Downscale Weight Loss Clinic Team',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Justin Black & Team | Downscale Weight Loss Clinic Australia',
    description: 'Meet Justin Black, Nurse Practitioner with 25+ years experience. Learn about Downscale Weight Loss Clinic team, our approach, and commitment to affordable weight management.',
    images: ['https://www.downscale.com.au/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/about',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function AboutPagePage() {
  return <AboutPage />;
}