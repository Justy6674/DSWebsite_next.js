import { Metadata } from 'next';
import BedAssessmentContent from './BedAssessmentContent';

export const metadata: Metadata = {
  title: 'BED Assessment | Binge Eating Disorder Screening | Downscale Weight Loss Clinic',
  description: 'Professional Binge Eating Disorder (BED) screening questionnaire. Clinical assessment tool to evaluate eating patterns and behaviors. Telehealth support available.',
  openGraph: {
    title: 'BED Assessment | Binge Eating Disorder Screening',
    description: 'Professional Binge Eating Disorder (BED) screening questionnaire. Clinical assessment tool to evaluate eating patterns and behaviors.',
    url: 'https://www.downscale.com.au/assessment/bed',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-assessment.jpg',
        width: 1200,
        height: 630,
        alt: 'BED Assessment - Binge Eating Disorder Screening',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BED Assessment | Binge Eating Disorder Screening',
    description: 'Professional Binge Eating Disorder (BED) screening questionnaire. Clinical assessment tool to evaluate eating patterns and behaviors.',
    images: ['https://www.downscale.com.au/og-assessment.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/assessment/bed',
  },
};

export default function BedAssessmentPage() {
  return <BedAssessmentContent />;
}