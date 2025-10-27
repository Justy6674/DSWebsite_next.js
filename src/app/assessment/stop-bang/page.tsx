import { Metadata } from 'next';
import StopBangAssessmentClient from './StopBangAssessmentClient';

export const metadata: Metadata = {
  title: 'STOP-BANG Sleep Apnoea Assessment | Sleep Apnoea Screening | Downscale',
  description: 'Take the STOP-BANG sleep apnoea screening questionnaire. Professional obstructive sleep apnoea risk assessment. Book consultation for evaluation.',
  alternates: {
    canonical: 'https://www.downscale.com.au/assessment/stop-bang',
  },
  openGraph: {
    title: 'STOP-BANG Sleep Apnoea Assessment | Sleep Apnoea Screening | Downscale',
    description: 'Take the STOP-BANG sleep apnoea screening questionnaire. Professional obstructive sleep apnoea risk assessment. Book consultation for evaluation.',
    url: 'https://www.downscale.com.au/assessment/stop-bang',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-assessment.webp?v=2',
        secureUrl: 'https://www.downscale.com.au/og-assessment.webp?v=2',
        width: 1200,
        height: 630,
        alt: 'STOP-BANG Sleep Apnoea Assessment - Sleep Apnoea Screening',
        type: 'image/webp',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STOP-BANG Sleep Apnoea Assessment | Sleep Apnoea Screening | Downscale',
    description: 'Take the STOP-BANG sleep apnoea screening questionnaire. Professional obstructive sleep apnoea risk assessment.',
    images: [
      {
        url: 'https://www.downscale.com.au/og-assessment.webp?v=2',
        width: 1200,
        height: 630,
        alt: 'STOP-BANG Sleep Apnoea Assessment - Sleep Apnoea Screening',
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

export default function StopBangAssessmentPage() {
  return <StopBangAssessmentClient />;
}