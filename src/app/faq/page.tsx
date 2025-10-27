import { Metadata } from 'next';
import FaqPage from '@/components/FaqPage';

export const metadata: Metadata = {
  title: 'FAQ | Weight Loss Questions Answered',
  description: 'Frequently asked questions about telehealth weight loss consultations, Medicare billing, treatment options, and how Downscale Weight Loss Clinic works.',
  keywords: 'weight loss FAQ, telehealth questions, medicare billing FAQ, weight loss treatment questions, how does telehealth work',
  alternates: {
    canonical: 'https://www.downscale.com.au/faq',
  },
  openGraph: {
    title: 'FAQ | Weight Loss Questions Answered',
    description: 'Frequently asked questions about telehealth weight loss consultations, Medicare billing, treatment options, and how Downscale Weight Loss Clinic works.',
    url: 'https://www.downscale.com.au/faq',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-faq.jpg',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | Weight Loss Questions Answered',
    description: 'Frequently asked questions about telehealth weight loss consultations, Medicare billing, and treatment options.',
    images: ['https://www.downscale.com.au/og-faq.jpg'],
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