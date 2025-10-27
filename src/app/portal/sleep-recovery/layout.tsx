import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sleep & Recovery Tracking | Patient Portal',
  description: 'Monitor your sleep patterns, track recovery metrics, access sleep hygiene guidance, and optimise rest for better weight management outcomes.',
  openGraph: {
    title: 'Sleep & Recovery Tracking | Downscale Patient Portal',
    description: 'Monitor your sleep patterns, track recovery metrics, access sleep hygiene guidance, and optimise rest for better weight management outcomes.',
    url: 'https://www.downscale.com.au/portal/sleep-recovery',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-sleep.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-sleep.jpg',
        width: 1200,
        height: 630,
        alt: 'Sleep & Recovery Tracking - Downscale Patient Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sleep & Recovery Tracking | Downscale Patient Portal',
    description: 'Monitor your sleep patterns, track recovery metrics, and optimise rest for better weight management.',
    images: ['https://www.downscale.com.au/og-portal-sleep.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/sleep-recovery',
  },
};

export default function SleepRecoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}