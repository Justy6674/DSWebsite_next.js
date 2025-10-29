import { Metadata } from 'next';
import SleepSubDashboardClient from './SleepSubDashboardClient';

export const metadata: Metadata = {
  title: 'Sleep & Recovery Hub | Evidence-Based Sleep Optimisation | Downscale Weight Loss Clinic',
  description: 'Evidence-based sleep optimisation strategies, recovery tools, and sleep hygiene guidance to support your weight management journey. Improve sleep quality for better metabolic health and weight loss outcomes.',
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/sleep-recovery',
  },
  openGraph: {
    title: 'Sleep & Recovery Hub | Evidence-Based Sleep Optimisation | Downscale',
    description: 'Evidence-based sleep optimisation strategies and recovery tools to support weight management. Improve sleep quality for better metabolic health.',
    url: 'https://www.downscale.com.au/portal/sleep-recovery',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-sleep-recovery.jpg',
        secureUrl: 'https://www.downscale.com.au/og-sleep-recovery.jpg',
        width: 1200,
        height: 630,
        alt: 'Sleep & Recovery Hub - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sleep & Recovery Hub | Evidence-Based Sleep Optimisation | Downscale',
    description: 'Evidence-based sleep optimisation strategies and recovery tools to support weight management.',
    images: ['https://www.downscale.com.au/og-sleep-recovery.jpg'],
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

export default function SleepRecoveryPage() {
  return <SleepSubDashboardClient />;
}