import { Metadata } from 'next';
import MedicareBilling from '@/components/MedicareBillingPage';

export const metadata: Metadata = {
  title: 'Medicare Billing | Instant Rebates & Bulk Billing',
  description: 'Medicare rebates available for weight loss consultations. Eligible patients can receive instant rebates or bulk billing. Learn about Medicare item numbers and requirements.',
  keywords: 'medicare weight loss, bulk billing weight loss, medicare rebate telehealth, medicare item numbers, instant medicare rebate',
  openGraph: {
    title: 'Medicare Billing | Instant Rebates & Bulk Billing',
    description: 'Medicare rebates available for weight loss consultations. Eligible patients can receive instant rebates or bulk billing.',
    url: 'https://www.downscale.com.au/medicare',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Medicare Billing at Downscale Weight Loss Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medicare Billing | Instant Rebates & Bulk Billing',
    description: 'Medicare rebates available for weight loss consultations. Eligible patients can receive instant rebates or bulk billing.',
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