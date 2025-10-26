import { Metadata } from 'next';
import LocationsPage from '@/components/LocationsPage';

export const metadata: Metadata = {
  title: 'Locations',
  description: 'Locations page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/locations',
  },
  openGraph: {
    title: 'Locations',
    description: 'Locations page - Access and manage your content',
    url: 'https://www.downscale.com.au/locations',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Locations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Locations',
    description: 'Locations page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function LocationsPagePage() {
  return <LocationsPage />;
}