import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activity & Exercise Hub | Patient Portal',
  description: 'Track your fitness activities, access personalised exercise programmes, and monitor movement patterns. Professional weight loss support with evidence-based activity guidance.',
  openGraph: {
    title: 'Activity & Exercise Hub | Downscale Patient Portal',
    description: 'Track your fitness activities, access personalised exercise programmes, and monitor movement patterns. Professional weight loss support with evidence-based activity guidance.',
    url: 'https://www.downscale.com.au/portal/activity',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-activity.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-activity.jpg',
        width: 1200,
        height: 630,
        alt: 'Activity & Exercise Hub - Downscale Patient Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Activity & Exercise Hub | Downscale Patient Portal',
    description: 'Track your fitness activities, access personalised exercise programmes, and monitor movement patterns.',
    images: ['https://www.downscale.com.au/og-portal-activity.jpg'],
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
    canonical: 'https://www.downscale.com.au/portal/activity',
  },
};

export default function ActivityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}