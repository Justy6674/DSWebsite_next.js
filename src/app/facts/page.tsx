import { Metadata } from 'next';
import FactsPage from '@/components/FactsPage';

export const metadata: Metadata = {
  title: 'Weight Loss Facts & Medical Evidence | Evidence-Based Information | Downscale',
  description: 'Evidence-based weight loss facts and medical research. Learn about metabolism, nutrition science, obesity medicine and proven weight management strategies from healthcare professionals.',
  openGraph: {
    title: 'Weight Loss Facts & Medical Evidence | Evidence-Based Information | Downscale',
    description: 'Evidence-based weight loss facts and medical research. Learn about metabolism, nutrition science, obesity medicine and proven weight management strategies from healthcare professionals.',
    url: 'https://www.downscale.com.au/facts',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Weight Loss Facts and Medical Evidence - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weight Loss Facts & Medical Evidence | Evidence-Based Information | Downscale',
    description: 'Evidence-based weight loss facts and medical research. Learn about metabolism, nutrition science, obesity medicine and proven weight management strategies.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/facts',
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

export default function FactsPagePage() {
  return <FactsPage />;
}