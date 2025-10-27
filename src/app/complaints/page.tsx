import { Metadata } from 'next';
import Complaints from '@/components/ComplaintsPage';

export const metadata: Metadata = {
  title: 'Complaints & Feedback Process | Patient Advocacy | Downscale Weight Loss Clinic',
  description: 'Lodge complaints or feedback about your healthcare experience. AHPRA-compliant complaints process. We take all patient concerns seriously and respond within 48 hours.',
  alternates: {
    canonical: 'https://www.downscale.com.au/complaints',
  },
  openGraph: {
    title: 'Complaints & Feedback Process | Patient Advocacy | Downscale Weight Loss Clinic',
    description: 'Lodge complaints or feedback about your healthcare experience. AHPRA-compliant complaints process with 48-hour response guarantee.',
    url: 'https://www.downscale.com.au/complaints',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-support.jpg',
        secureUrl: 'https://www.downscale.com.au/og-support.jpg',
        width: 1200,
        height: 630,
        alt: 'Complaints & Feedback - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complaints & Feedback Process | Downscale',
    description: 'Lodge complaints or feedback. AHPRA-compliant process with 48-hour response.',
    images: ['https://www.downscale.com.au/og-support.jpg'],
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

export default function ComplaintsPage() {
  return <Complaints />;
}