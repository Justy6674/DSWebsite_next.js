import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'Meet Our Expert Healthcare Team | Nurse Practitioners & Specialists | Downscale',
  description: 'Meet Justin Black (Nurse Practitioner) and our qualified healthcare team. 25+ years experience in weight management, telehealth specialists across Australia.',
  openGraph: {
    title: 'Meet Our Expert Healthcare Team | Nurse Practitioners & Specialists | Downscale',
    description: 'Meet Justin Black (Nurse Practitioner) and our qualified healthcare team. 25+ years experience in weight management, telehealth specialists across Australia.',
    url: 'https://www.downscale.com.au/meet-the-team',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png',
        secureUrl: 'https://www.downscale.com.au/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png',
        width: 1200,
        height: 630,
        alt: 'Meet Justin Black and Healthcare Team - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Our Expert Healthcare Team | Nurse Practitioners & Specialists | Downscale',
    description: 'Meet Justin Black (Nurse Practitioner) and our qualified healthcare team. 25+ years experience in weight management, telehealth specialists.',
    images: ['https://www.downscale.com.au/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/meet-the-team',
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

export default function AboutPagePage() {
  return <AboutPage />;
}