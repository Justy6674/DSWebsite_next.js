import { Metadata } from 'next';
import PrivacyPolicy from '@/components/PrivacyPolicy';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Privacy page - Access and manage your content',
  openGraph: {
    title: 'Privacy',
    description: 'Privacy page - Access and manage your content',
    url: 'https://www.downscale.com.au/privacy',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Privacy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy',
    description: 'Privacy page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}