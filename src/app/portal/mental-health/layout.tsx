import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mental Health & Wellbeing | Patient Portal',
  description: 'Access mental health resources, mood tracking tools, stress management techniques, and psychological support for your weight management journey.',
  openGraph: {
    title: 'Mental Health & Wellbeing | Downscale Patient Portal',
    description: 'Access mental health resources, mood tracking tools, stress management techniques, and psychological support for your weight management journey.',
    url: 'https://www.downscale.com.au/portal/mental-health',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-mental-health.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-mental-health.jpg',
        width: 1200,
        height: 630,
        alt: 'Mental Health & Wellbeing - Downscale Patient Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mental Health & Wellbeing | Downscale Patient Portal',
    description: 'Access mental health resources, mood tracking tools, and psychological support for weight management.',
    images: ['https://www.downscale.com.au/og-portal-mental-health.jpg'],
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
    canonical: 'https://www.downscale.com.au/portal/mental-health',
  },
};

export default function MentalHealthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}