import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clinical Updates Feed | Patient Portal',
  description: 'Latest clinical updates, health insights, and personalised recommendations from your healthcare team. Stay informed about your weight management journey.',
  openGraph: {
    title: 'Clinical Updates Feed | Downscale Patient Portal',
    description: 'Latest clinical updates, health insights, and personalised recommendations from your healthcare team. Stay informed about your weight management journey.',
    url: 'https://www.downscale.com.au/portal/jb-bb-feed',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-feed.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-feed.jpg',
        width: 1200,
        height: 630,
        alt: 'Clinical Updates Feed - Downscale Patient Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinical Updates Feed | Downscale Patient Portal',
    description: 'Latest clinical updates, health insights, and personalised recommendations from your healthcare team.',
    images: ['https://www.downscale.com.au/og-portal-feed.jpg'],
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
    canonical: 'https://www.downscale.com.au/portal/jb-bb-feed',
  },
};

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}