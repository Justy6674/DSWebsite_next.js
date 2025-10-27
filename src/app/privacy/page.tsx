import { Metadata } from 'next';
import PrivacyPolicy from '@/components/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy Policy | Australian Privacy Principles | Downscale Weight Loss Clinic',
  description: 'Our privacy policy covering Australian Privacy Principles (APP), healthcare data protection, telehealth privacy and patient confidentiality. AHPRA-compliant medical privacy practices.',
  openGraph: {
    title: 'Privacy Policy | Australian Privacy Principles | Downscale Weight Loss Clinic',
    description: 'Our privacy policy covering Australian Privacy Principles (APP), healthcare data protection, telehealth privacy and patient confidentiality. AHPRA-compliant medical privacy practices.',
    url: 'https://www.downscale.com.au/privacy',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Australian Privacy Principles | Downscale Weight Loss Clinic',
    description: 'Our privacy policy covering Australian Privacy Principles (APP), healthcare data protection, telehealth privacy and patient confidentiality.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/privacy',
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

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}