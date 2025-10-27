import { Metadata } from 'next';
import AdminPortalClient from './AdminPortalClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Clinical Management Portal | Downscale Weight Loss Clinic',
  description: 'Administrative dashboard for clinic management, patient oversight, and clinical operations. Restricted access for authorised healthcare staff and administrators only.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/admin',
  },
  openGraph: {
    title: 'Admin Dashboard | Clinical Management Portal | Downscale',
    description: 'Administrative dashboard for clinic management and patient oversight. Restricted access for healthcare staff.',
    url: 'https://www.downscale.com.au/portal/admin',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-admin.jpg',
        secureUrl: 'https://www.downscale.com.au/og-admin.jpg',
        width: 1200,
        height: 630,
        alt: 'Admin Dashboard - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin Dashboard | Clinical Management | Downscale',
    description: 'Administrative dashboard for clinic management. Restricted access.',
    images: ['https://www.downscale.com.au/og-admin.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminPortalPage() {
  return <AdminPortalClient />;
}