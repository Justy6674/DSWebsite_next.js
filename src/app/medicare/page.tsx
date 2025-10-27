import { Metadata } from 'next';
import MedicareBilling from '@/components/MedicareBillingPage';

export const metadata: Metadata = {
  title: 'Medicare Billing & Rebates | Telehealth Provider Numbers | Downscale Weight Loss',
  description: 'Medicare rebates available for eligible consultations. Registered Medicare provider with telehealth item numbers. Bulk billing options and gap payment information for weight management.',
  openGraph: {
    title: 'Medicare Billing & Rebates | Telehealth Provider Numbers | Downscale Weight Loss',
    description: 'Medicare rebates available for eligible consultations. Registered Medicare provider with telehealth item numbers. Bulk billing options and gap payment information for weight management.',
    url: 'https://www.downscale.com.au/medicare',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Medicare Billing and Rebates Information - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medicare Billing & Rebates | Telehealth Provider Numbers | Downscale Weight Loss',
    description: 'Medicare rebates available for eligible consultations. Registered Medicare provider with telehealth item numbers. Bulk billing and gap payment information.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/medicare',
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

export default function MedicareBillingPage() {
  return <MedicareBilling />;
}