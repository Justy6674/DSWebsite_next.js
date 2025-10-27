import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const BlogAdminPage = dynamic(() => import('@/components/BlogAdminPage'), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>,
  ssr: false
});

export const metadata: Metadata = {
  title: 'Blog Content Management | Admin Dashboard | Downscale Weight Loss Clinic',
  description: 'Blog administration dashboard for managing weight loss articles, clinical updates, and healthcare content. Restricted access for authorised staff only.',
  alternates: {
    canonical: 'https://www.downscale.com.au/blog-admin',
  },
  openGraph: {
    title: 'Blog Content Management | Admin Dashboard | Downscale Weight Loss Clinic',
    description: 'Blog administration dashboard for managing weight loss articles, clinical updates, and healthcare content.',
    url: 'https://www.downscale.com.au/blog-admin',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-admin.jpg',
        secureUrl: 'https://www.downscale.com.au/og-admin.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Admin Dashboard - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Content Management | Admin Dashboard | Downscale',
    description: 'Blog administration dashboard for managing healthcare content.',
    images: ['https://www.downscale.com.au/og-admin.jpg'],
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
};

export default function BlogAdminPagePage() {
  return <BlogAdminPage />;
}