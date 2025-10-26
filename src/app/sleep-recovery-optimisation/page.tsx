import { Metadata } from 'next';
import SleepRecoveryOptimisation from '@/components/SleepRecoveryOptimisation';

export const metadata: Metadata = {
  title: 'Sleep Recovery Optimisation',
  description: 'Sleep Recovery Optimisation page - Access and manage your content',
  openGraph: {
    title: 'Sleep Recovery Optimisation',
    description: 'Sleep Recovery Optimisation page - Access and manage your content',
    url: 'https://www.downscale.com.au/sleep-recovery-optimisation',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Sleep Recovery Optimisation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sleep Recovery Optimisation',
    description: 'Sleep Recovery Optimisation page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/sleep-recovery-optimisation',
  },
};

export default function SleepRecoveryOptimisationPage() {
  return <SleepRecoveryOptimisation />;
}