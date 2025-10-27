import { Metadata } from 'next';
import EpworthAssessmentClient from './EpworthAssessmentClient';

export const metadata: Metadata = {
  title: 'Epworth Sleepiness Scale Assessment | Sleep Disorder Screening | Downscale',
  description: 'Take the Epworth Sleepiness Scale assessment. Professional sleep disorder screening tool to measure daytime sleepiness. Book consultation for sleep health.',
  alternates: {
    canonical: 'https://www.downscale.com.au/assessment/epworth',
  },
  openGraph: {
    title: 'Epworth Sleepiness Scale Assessment | Sleep Disorder Screening | Downscale',
    description: 'Take the Epworth Sleepiness Scale assessment. Professional sleep disorder screening tool to measure daytime sleepiness. Book consultation for sleep health.',
    url: 'https://www.downscale.com.au/assessment/epworth',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-assessment.jpg?v=2',
        secureUrl: 'https://www.downscale.com.au/og-assessment.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Epworth Sleepiness Scale Assessment - Sleep Disorder Screening',
        type: 'image/webp',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Epworth Sleepiness Scale Assessment | Sleep Disorder Screening | Downscale',
    description: 'Take the Epworth Sleepiness Scale assessment. Professional sleep disorder screening tool to measure daytime sleepiness.',
    images: [
      {
        url: 'https://www.downscale.com.au/og-assessment.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Epworth Sleepiness Scale Assessment - Sleep Disorder Screening',
      },
    ],
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

export default function EpworthAssessmentPage() {
  return <EpworthAssessmentClient />;
}