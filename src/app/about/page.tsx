import { Metadata } from 'next';
import AboutPage from '@/components/AboutPage';

export const metadata: Metadata = {
  title: 'About Justin Black | Nurse Practitioner & Weight Loss Specialist',
  description: 'Meet Justin Black, experienced Nurse Practitioner specializing in weight loss and weight maintenance. Professional telehealth consultations across Australia from $45.',
  keywords: 'Justin Black, nurse practitioner, weight loss specialist, telehealth doctor Australia, about downscale clinic',
  openGraph: {
    title: 'About Justin Black | Nurse Practitioner & Weight Loss Specialist',
    description: 'Meet Justin Black, experienced Nurse Practitioner specializing in weight loss and weight maintenance. Professional telehealth consultations across Australia from $45.',
    url: 'https://www.downscale.com.au/about',
    type: 'profile',
    images: [
      {
        url: 'https://www.downscale.com.au/justin-black.webp',
        width: 1200,
        height: 630,
        alt: 'Justin Black - Nurse Practitioner at Downscale Weight Loss Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Justin Black | Nurse Practitioner & Weight Loss Specialist',
    description: 'Meet Justin Black, experienced Nurse Practitioner specializing in weight loss and weight maintenance.',
    images: ['https://www.downscale.com.au/justin-black.webp'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/about',
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