import { Metadata } from 'next';
import AuthPage from '@/components/AuthPage';

export const metadata: Metadata = {
  title: 'Patient Portal Login | Secure Access | Downscale Weight Loss Clinic',
  description: 'Secure login to your Downscale patient portal. Access consultation history, treatment plans, prescriptions and weight tracking tools. Two-factor authentication enabled.',
  alternates: {
    canonical: 'https://www.downscale.com.au/auth',
  },
  openGraph: {
    title: 'Patient Portal Login | Secure Access | Downscale Weight Loss Clinic',
    description: 'Secure login to your Downscale patient portal. Access consultation history, treatment plans, prescriptions and weight tracking tools.',
    url: 'https://www.downscale.com.au/auth',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal.jpg',
        width: 1200,
        height: 630,
        alt: 'Patient Portal Login - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patient Portal Login | Secure Access | Downscale Weight Loss Clinic',
    description: 'Secure login to your Downscale patient portal. Access consultation history and treatment plans.',
    images: ['https://www.downscale.com.au/og-portal.jpg'],
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

export default function AuthPagePage() {
  return <AuthPage />;
}