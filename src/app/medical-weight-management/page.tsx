import { Metadata } from 'next';
import MedicalWeightManagement from '@/components/MedicalWeightManagementPage';

export const metadata: Metadata = {
  title: 'Medical Weight Management | Evidence-Based Weight Loss Treatment',
  description: 'Professional medical weight management with Nurse Practitioner Justin Black. Evidence-based treatment including medications, lifestyle support, and ongoing care.',
  keywords: 'medical weight management, weight loss medications, GLP-1 medications, evidence-based weight loss, medical weight loss doctor',
  openGraph: {
    title: 'Medical Weight Management | Evidence-Based Weight Loss Treatment',
    description: 'Professional medical weight management with Nurse Practitioner Justin Black. Evidence-based treatment including medications, lifestyle support, and ongoing care.',
    url: 'https://www.downscale.com.au/medical-weight-management',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Medical Weight Management at Downscale Weight Loss Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Weight Management | Evidence-Based Weight Loss Treatment',
    description: 'Professional medical weight management with evidence-based treatment including medications and lifestyle support.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/medical-weight-management',
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

export default function MedicalWeightManagementPage() {
  return <MedicalWeightManagement />;
}