import { Metadata } from 'next';
import PricingPage from '@/components/PricingPage';

export const metadata: Metadata = {
  title: 'Pricing | Affordable Telehealth Weight Loss from $45',
  description: 'Transparent pricing for weight loss consultations. From $45 with Medicare rebates. No hidden fees. Bulk billing available for eligible patients. Book online today.',
  keywords: 'weight loss pricing, telehealth consultation cost, medicare rebate weight loss, affordable weight loss doctor, bulk billing weight loss',
  openGraph: {
    title: 'Pricing | Affordable Telehealth Weight Loss from $45',
    description: 'Transparent pricing for weight loss consultations. From $45 with Medicare rebates. No hidden fees. Bulk billing available for eligible patients.',
    url: 'https://www.downscale.com.au/pricing',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic Pricing - Affordable telehealth consultations from $45',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing | Affordable Telehealth Weight Loss from $45',
    description: 'Transparent pricing for weight loss consultations. From $45 with Medicare rebates. No hidden fees.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/pricing',
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