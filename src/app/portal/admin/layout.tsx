import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Clinical Portal',
  description: 'Administrative dashboard for clinical staff. Manage patient records, review consultations, oversee treatment plans, and access healthcare analytics.',
  openGraph: {
    title: 'Admin Dashboard | Downscale Clinical Portal',
    description: 'Administrative dashboard for clinical staff. Manage patient records, review consultations, oversee treatment plans, and access healthcare analytics.',
    url: 'https://www.downscale.com.au/portal/admin',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-portal-admin.jpg',
        secureUrl: 'https://www.downscale.com.au/og-portal-admin.jpg',
        width: 1200,
        height: 630,
        alt: 'Admin Dashboard - Downscale Clinical Portal',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin Dashboard | Downscale Clinical Portal',
    description: 'Administrative dashboard for clinical staff. Manage patient records, review consultations, and oversee treatment plans.',
    images: ['https://www.downscale.com.au/og-portal-admin.jpg'],
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/portal/admin',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}