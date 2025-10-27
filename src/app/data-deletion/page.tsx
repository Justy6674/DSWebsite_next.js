import { Metadata } from 'next';
import DataDeletion from '@/components/DataDeletion';

export const metadata: Metadata = {
  title: 'Data Deletion Request | Privacy Rights | Downscale Weight Loss Clinic',
  description: 'Request deletion of your personal health data from Downscale systems. Australian Privacy Principles (APP) compliant. Exercise your right to be forgotten under privacy laws.',
  alternates: {
    canonical: 'https://www.downscale.com.au/data-deletion',
  },
  openGraph: {
    title: 'Data Deletion Request | Privacy Rights | Downscale Weight Loss Clinic',
    description: 'Request deletion of your personal health data from Downscale systems. Australian Privacy Principles (APP) compliant.',
    url: 'https://www.downscale.com.au/data-deletion',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-privacy.jpg',
        secureUrl: 'https://www.downscale.com.au/og-privacy.jpg',
        width: 1200,
        height: 630,
        alt: 'Data Deletion Request - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Deletion Request | Privacy Rights | Downscale',
    description: 'Request deletion of your personal health data. APP compliant privacy rights.',
    images: ['https://www.downscale.com.au/og-privacy.jpg'],
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

export default function DataDeletionPage() {
  return <DataDeletion />;
}