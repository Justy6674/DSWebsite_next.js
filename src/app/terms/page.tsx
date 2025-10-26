import { Metadata } from 'next';
import TermsAndConditions from '@/components/TermsAndConditions';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms page - Access and manage your content',
  openGraph: {
    title: 'Terms',
    description: 'Terms page - Access and manage your content',
    url: 'https://www.downscale.com.au/terms',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Terms',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms',
    description: 'Terms page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}