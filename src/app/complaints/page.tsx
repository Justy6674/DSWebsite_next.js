import { Metadata } from 'next';
import Complaints from '@/components/ComplaintsPage';

export const metadata: Metadata = {
  title: 'Complaints',
  description: 'Complaints page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/complaints',
  },
  openGraph: {
    title: 'Complaints',
    description: 'Complaints page - Access and manage your content',
    url: 'https://www.downscale.com.au/complaints',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Complaints',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complaints',
    description: 'Complaints page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function ComplaintsPage() {
  return <Complaints />;
}