import { Metadata } from 'next';
import PortalDashboardClient from './PortalDashboardClient';

export const metadata: Metadata = {
  title: 'Patient Portal Dashboard | Health Tracking & Clinical Access | Downscale Weight Loss Clinic',
  description: 'Comprehensive patient portal dashboard for Downscale members. Access weight tracking, consultation history, treatment plans, prescriptions, health metrics, and personalised weight loss insights.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal',
  },
  openGraph: {
    title: 'Patient Portal Dashboard | Health Tracking | Downscale',
    description: 'Comprehensive patient portal for Downscale members. Access weight tracking, consultation history, treatment plans, and personalised health insights.',
    url: 'https://www.downscale.com.au/portal',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-dashboard.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-dashboard.jpg',
        width: 1200,
        height: 630,
        alt: 'Patient Portal Dashboard - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patient Portal Dashboard | Health Tracking | Downscale',
    description: 'Comprehensive patient portal for weight tracking, consultation history, and personalised health insights.',
    images: ['https://www.downscale.com.au/og-portal-dashboard.jpg'],
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

export default function PortalDashboardPage() {
  return <PortalDashboardClient />;
}