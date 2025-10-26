import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const BlogAdminPage = dynamic(() => import('@/components/BlogAdminPage'), {
  loading: () => <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>,
  ssr: false
});

export const metadata: Metadata = {
  title: 'Blog Admin',
  description: 'Blog Admin page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/blog-admin',
  },
  openGraph: {
    title: 'Blog Admin',
    description: 'Blog Admin page - Access and manage your content',
    url: 'https://www.downscale.com.au/blog-admin',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Admin',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Admin',
    description: 'Blog Admin page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function BlogAdminPagePage() {
  return <BlogAdminPage />;
}