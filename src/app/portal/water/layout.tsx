import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hydration & Water Tracking | Patient Portal',
  description: 'Track your daily water intake, monitor hydration levels, set personalised goals, and access evidence-based hydration guidance for optimal health.',
  openGraph: {
    title: 'Hydration & Water Tracking | Downscale Patient Portal',
    description: 'Track your daily water intake, monitor hydration levels, set personalised goals, and access evidence-based hydration guidance for optimal health.',
    url: 'https://www.downscale.com.au/portal/water',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-water.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-water.jpg',
        width: 1200,
        height: 630,
        alt: 'Hydration & Water Tracking - Downscale Patient Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hydration & Water Tracking | Downscale Patient Portal',
    description: 'Track your daily water intake, monitor hydration levels, and access evidence-based hydration guidance.',
    images: ['https://www.downscale.com.au/og-portal-water.jpg'],
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
    canonical: 'https://www.downscale.com.au/portal/water',
  },
};

export default function WaterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}