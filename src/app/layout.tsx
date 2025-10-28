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
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes',
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
        url: 'https://www.downscale.com.au/hero-family-sunset.webp',
        width: 1200,
        height: 630,
        alt: 'Downscale Weight Loss Clinic - Australian telehealth weight loss and weight maintenance clinic',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@downscale_weightloss',
    creator: '@downscale_weightloss',
    title: 'Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black',
    description: 'Professional telehealth weight loss & weight maintenance clinic from only $45. Consultations with Justin Black, Nurse Practitioner. Medicare-eligible patients receive instant rebates.',
    images: ['https://www.downscale.com.au/hero-family-sunset.webp'],
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
      <head>
        {/* Preload critical hero image for instant LCP */}
        <link rel="preload" as="image" href="/hero-family-sunset.webp" type="image/webp" />
        <link rel="preload" as="image" href="/hero-family-sunset.webp" type="image/webp" media="(max-width: 1024px)" />
        {/* Preload critical font for instant text rendering */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.halaxy.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        {/* Preload favicon for instant load */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Resource hints for booking links */}
        <link rel="dns-prefetch" href="//www.halaxy.com" />
        <link rel="preconnect" href="https://www.halaxy.com" />
      </head>
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}