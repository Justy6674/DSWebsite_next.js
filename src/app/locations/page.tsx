import { Metadata } from 'next';
import LocationsPage from '@/components/LocationsPage';

export const metadata: Metadata = {
  title: 'Weight Loss Clinic Locations Australia-wide | Downscale Weight Loss Clinic',
  description: 'Downscale Weight Loss Clinic serves 34+ Australian locations across all states and territories via telehealth. Professional weight loss clinics covering metro, regional and remote areas nationwide.',
  keywords: 'weight loss clinic Australia, telehealth weight loss, Australia-wide weight management, all states territories weight loss, regional weight loss, remote area healthcare',
  alternates: {
    canonical: 'https://www.downscale.com.au/locations',
  },
  openGraph: {
    title: 'Weight Loss Clinic Locations Australia-wide | Downscale Weight Loss Clinic',
    description: 'Professional weight loss services available across all Australian states and territories via telehealth consultation.',
    url: 'https://www.downscale.com.au/locations',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Weight Loss Clinic Locations Australia-wide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Clinic Locations Australia-wide | Downscale Weight Loss Clinic',
    description: 'Professional weight loss services available across all Australian states and territories via telehealth consultation.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LocationsPagePage() {
  return <LocationsPage />;
}