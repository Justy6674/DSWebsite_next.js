import { Metadata } from 'next';
import SleepRecoveryOptimisation from '@/components/SleepRecoveryOptimisation';

export const metadata: Metadata = {
  title: 'Sleep Recovery Optimisation for Weight Loss | Sleep Medicine | Downscale',
  description: 'Professional sleep optimisation to support weight management. Address sleep apnoea, insomnia, sleep hygiene and recovery patterns. Evidence-based sleep medicine from $45.',
  openGraph: {
    title: 'Sleep Recovery Optimisation for Weight Loss | Sleep Medicine | Downscale',
    description: 'Professional sleep optimisation to support weight management. Address sleep apnoea, insomnia, sleep hygiene and recovery patterns. Evidence-based sleep medicine from $45.',
    url: 'https://www.downscale.com.au/sleep-recovery-optimisation',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Sleep Recovery Optimisation for Weight Management - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sleep Recovery Optimisation for Weight Loss | Sleep Medicine | Downscale',
    description: 'Professional sleep optimisation to support weight management. Address sleep apnoea, insomnia, sleep hygiene and recovery patterns.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/sleep-recovery-optimisation',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function SleepRecoveryOptimisationPage() {
  return <SleepRecoveryOptimisation />;
}