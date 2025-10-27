import { Metadata } from 'next';
import MenopauseAssessmentClient from './MenopauseAssessmentClient';

export const metadata: Metadata = {
  title: 'Menopause Assessment | AMS Symptom Score Card | Downscale Weight Loss Clinic',
  description: 'Official AMS Menopause Symptom Score Card assessment. Professional menopause screening using validated Greene Climacteric Scale. Book consultation.',
  alternates: {
    canonical: 'https://www.downscale.com.au/assessment/menopause',
  },
  openGraph: {
    title: 'Menopause Assessment | AMS Symptom Score Card | Downscale Weight Loss Clinic',
    description: 'Official AMS Menopause Symptom Score Card assessment. Professional menopause screening using validated Greene Climacteric Scale. Book consultation.',
    url: 'https://www.downscale.com.au/assessment/menopause',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-assessment.webp?v=2',
        secureUrl: 'https://www.downscale.com.au/og-assessment.webp?v=2',
        width: 1200,
        height: 630,
        alt: 'Menopause Assessment - AMS Symptom Score Card',
        type: 'image/webp',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menopause Assessment | AMS Symptom Score Card | Downscale Weight Loss Clinic',
    description: 'Official AMS Menopause Symptom Score Card assessment. Professional menopause screening using validated Greene Climacteric Scale.',
    images: [
      {
        url: 'https://www.downscale.com.au/og-assessment.webp?v=2',
        width: 1200,
        height: 630,
        alt: 'Menopause Assessment - AMS Symptom Score Card',
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

export default function MenopauseAssessmentPage() {
  return <MenopauseAssessmentClient />;
}