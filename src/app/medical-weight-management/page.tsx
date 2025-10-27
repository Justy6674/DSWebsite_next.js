import { Metadata } from 'next';
import MedicalWeightManagement from '@/components/MedicalWeightManagementPage';

export const metadata: Metadata = {
  title: 'Medical Weight Management Services | Professional Weight Loss Treatment',
  description: 'Evidence-based medical weight management from qualified healthcare professionals. Personalised treatment plans, medication management, and ongoing support from $45.',
  openGraph: {
    title: 'Medical Weight Management Services | Professional Weight Loss Treatment',
    description: 'Evidence-based medical weight management from qualified healthcare professionals. Personalised treatment plans, medication management, and ongoing support from $45.',
    url: 'https://www.downscale.com.au/medical-weight-management',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Medical Weight Management Services - Professional Weight Loss Treatment',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Weight Management Services | Professional Weight Loss Treatment',
    description: 'Evidence-based medical weight management from qualified healthcare professionals. Personalised treatment plans, medication management, and ongoing support from $45.',
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