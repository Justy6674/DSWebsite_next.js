import { Metadata } from 'next';
import FaqPage from '@/components/FaqPage';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Downscale Weight Loss Clinic',
  description: 'Find answers to common questions about our telehealth weight loss services, Medicare rebates, consultations, and treatments.',
  alternates: {
    canonical: 'https://www.downscale.com.au/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Downscale Weight Loss Clinic',
    description: 'Find answers to common questions about our telehealth weight loss services, Medicare rebates, consultations, and treatments.',
    url: 'https://www.downscale.com.au/faq',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-faq.jpg?v=2',
        secureUrl: 'https://www.downscale.com.au/og-faq.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - Downscale Weight Loss Clinic',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | Downscale Weight Loss Clinic',
    description: 'Find answers to common questions about our telehealth weight loss services, Medicare rebates, consultations, and treatments.',
    images: [
      {
        url: 'https://www.downscale.com.au/og-faq.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - Downscale Weight Loss Clinic',
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

export default function FaqPagePage() {
  return <FaqPage />;
}