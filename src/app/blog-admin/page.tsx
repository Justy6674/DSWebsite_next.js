import { Metadata } from 'next';
import BlogAdminPage from '@/components/BlogAdminPage';

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