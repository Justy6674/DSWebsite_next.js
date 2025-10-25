import type { Metadata } from 'next';
// import { Inter } from 'next/font/google'; // Temporarily disabled for build - using system fonts
import './globals.css';
import { Providers } from './providers';

// const inter = Inter({ subsets: ['latin'] }); // Temporarily disabled for build

export const metadata: Metadata = {
  title: {
    default: 'Downscale Weight Loss Clinic',
    template: '%s | Downscale Weight Loss Clinic',
  },
  description: 'Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates.',
  keywords: 'comprehensive family health clinic, whole person healthcare Australia, family wellness telehealth, endocrine health clinic, medication management clinic, reverse chronic conditions, holistic family medicine, general practice telehealth, whole family health Australia',
  authors: [{ name: 'Justin Black', url: 'https://www.downscale.com.au/about' }],
  creator: 'Downscale Weight Loss Clinic',
  publisher: 'Downscale Weight Loss Clinic',
  metadataBase: new URL('https://www.downscale.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.downscale.com.au',
    siteName: 'Downscale Weight Loss Clinic',
    title: 'Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black',
    description: 'Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates.',
    images: [
      {
        url: '/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Comprehensive family health and wellness clinic - treating the whole person and family - Australian telehealth clinic for weight loss, endocrine health, and chronic disease reversal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black',
    description: 'Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates.',
    images: ['/og-services.jpg'],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}