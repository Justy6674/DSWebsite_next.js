import { Metadata } from 'next';
import PortalLoginClient from './PortalLoginClient';

export const metadata: Metadata = {
  title: 'Portal Login | Secure Patient Access | Downscale Weight Loss Clinic',
  description: 'Secure portal login for Downscale patients. Access your personalised weight loss treatment plans, consultation history, prescriptions, and health tracking tools with two-factor authentication.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/login',
  },
  openGraph: {
    title: 'Portal Login | Secure Patient Access | Downscale',
    description: 'Secure portal login for Downscale patients. Access personalised treatment plans, consultation history, and health tracking tools.',
    url: 'https://www.downscale.com.au/portal/login',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-login.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-login.jpg',
        width: 1200,
        height: 630,
        alt: 'Portal Login - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal Login | Secure Patient Access | Downscale',
    description: 'Secure portal login for Downscale patients. Access personalised treatment plans and health tools.',
    images: ['https://www.downscale.com.au/og-portal-login.jpg'],
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

export default function PortalLoginPage() {
  return <PortalLoginClient />;
}