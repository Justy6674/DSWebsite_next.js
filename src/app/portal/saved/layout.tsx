import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved Items & Bookmarks | Patient Portal',
  description: 'Access your saved articles, bookmarked resources, favourite meal plans, and personalised health content for your weight management journey.',
  openGraph: {
    title: 'Saved Items & Bookmarks | Downscale Patient Portal',
    description: 'Access your saved articles, bookmarked resources, favourite meal plans, and personalised health content for your weight management journey.',
    url: 'https://www.downscale.com.au/portal/saved',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-saved.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-saved.jpg',
        width: 1200,
        height: 630,
        alt: 'Saved Items & Bookmarks - Downscale Patient Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saved Items & Bookmarks | Downscale Patient Portal',
    description: 'Access your saved articles, bookmarked resources, and personalised health content.',
    images: ['https://www.downscale.com.au/og-portal-saved.jpg'],
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
    canonical: 'https://www.downscale.com.au/portal/saved',
  },
};

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}