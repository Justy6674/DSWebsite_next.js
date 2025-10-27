import { Metadata } from 'next';
import PricingPage from '@/components/PricingPage';

export const metadata: Metadata = {
  title: 'Affordable Weight Loss Consultation Pricing | Downscale Weight Loss Clinic',
  description: 'Transparent pricing for telehealth weight loss consultations from $45. Medicare rebates available. Book online consultations with Nurse Practitioner Justin Black.',
  alternates: {
    canonical: 'https://www.downscale.com.au/pricing',
  },
  openGraph: {
    title: 'Affordable Weight Loss Consultation Pricing | Downscale Weight Loss Clinic',
    description: 'Transparent pricing for telehealth weight loss consultations from $45. Medicare rebates available. Book online consultations with Nurse Practitioner Justin Black.',
    url: 'https://www.downscale.com.au/pricing',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-pricing.jpg?v=2',
        secureUrl: 'https://www.downscale.com.au/og-pricing.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Affordable Weight Loss Consultation Pricing - Downscale Weight Loss Clinic',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affordable Weight Loss Consultation Pricing | Downscale Weight Loss Clinic',
    description: 'Transparent pricing for telehealth weight loss consultations from $45. Medicare rebates available. Book online consultations with Nurse Practitioner Justin Black.',
    images: [
      {
        url: 'https://www.downscale.com.au/og-pricing.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Affordable Weight Loss Consultation Pricing - Downscale Weight Loss Clinic',
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

export default function PricingPagePage() {
  return <PricingPage />;
}