import { Metadata } from 'next';
import ADHDAssessmentClient from './ADHDAssessmentClient';

export const metadata: Metadata = {
  title: 'ADHD Assessment | Adult ADHD Screening Test | Downscale Weight Loss Clinic',
  description: 'Take our professional ADHD screening assessment. Adult ADHD questionnaire used by healthcare professionals. Book consultation for comprehensive evaluation.',
  alternates: {
    canonical: 'https://www.downscale.com.au/assessment/adhd',
  },
  openGraph: {
    title: 'ADHD Assessment | Adult ADHD Screening Test | Downscale Weight Loss Clinic',
    description: 'Take our professional ADHD screening assessment. Adult ADHD questionnaire used by healthcare professionals. Book consultation for comprehensive evaluation.',
    url: 'https://www.downscale.com.au/assessment/adhd',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-assessment.jpg?v=2',
        secureUrl: 'https://www.downscale.com.au/og-assessment.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'ADHD Assessment - Adult ADHD Screening Test',
        type: 'image/webp',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADHD Assessment | Adult ADHD Screening Test | Downscale Weight Loss Clinic',
    description: 'Take our professional ADHD screening assessment. Adult ADHD questionnaire used by healthcare professionals.',
    images: [
      {
        url: 'https://www.downscale.com.au/og-assessment.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'ADHD Assessment - Adult ADHD Screening Test',
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

export default function ADHDAssessmentPage() {
  return <ADHDAssessmentClient />;
}