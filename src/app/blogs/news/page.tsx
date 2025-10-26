import { Metadata } from 'next';
import BlogPage from '@/components/BlogPage';

export const metadata: Metadata = {
  title: 'Blogs - News',
  description: 'Blogs - News page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/blogs/news',
  },
  openGraph: {
    title: 'Blogs - News',
    description: 'Blogs - News page - Access and manage your content',
    url: 'https://www.downscale.com.au/blogs/news',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Blogs - News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogs - News',
    description: 'Blogs - News page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
};

export default function BlogPagePage() {
  return <BlogPage />;
}