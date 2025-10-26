import { Metadata } from 'next';
import DataDeletion from '@/components/DataDeletion';

export const metadata: Metadata = {
  title: 'Data Deletion',
  description: 'Data Deletion page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/data-deletion',
  },
  openGraph: {
    title: 'Data Deletion',
    description: 'Data Deletion page - Access and manage your content',
    url: 'https://www.downscale.com.au/data-deletion',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Data Deletion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Deletion',
    description: 'Data Deletion page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function DataDeletionPage() {
  return <DataDeletion />;
}