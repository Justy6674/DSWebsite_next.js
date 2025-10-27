import { Metadata } from 'next';
import TermsAndConditions from '@/components/TermsAndConditions';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Service Agreement | Downscale Weight Loss Clinic',
  description: 'Terms and conditions for Downscale Weight Loss Clinic telehealth services. Healthcare service agreement, AHPRA compliance, Medicare billing terms and patient responsibilities.',
  openGraph: {
    title: 'Terms & Conditions | Service Agreement | Downscale Weight Loss Clinic',
    description: 'Terms and conditions for Downscale Weight Loss Clinic telehealth services. Healthcare service agreement, AHPRA compliance, Medicare billing terms and patient responsibilities.',
    url: 'https://www.downscale.com.au/terms',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Terms and Conditions - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Service Agreement | Downscale Weight Loss Clinic',
    description: 'Terms and conditions for Downscale Weight Loss Clinic telehealth services. Healthcare service agreement, AHPRA compliance, Medicare billing terms.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/terms',
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

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}