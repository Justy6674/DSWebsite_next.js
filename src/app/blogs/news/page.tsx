import { Metadata } from 'next';
import BlogPage from '@/components/BlogPage';

export const metadata: Metadata = {
  title: 'Health News & Clinical Updates | Weight Loss Blog | Downscale',
  description: 'Latest health news, clinical updates, and evidence-based weight loss insights from Australian healthcare professionals. Medical research updates and patient success stories.',
  alternates: {
    canonical: 'https://www.downscale.com.au/blogs/news',
  },
  openGraph: {
    title: 'Health News & Clinical Updates | Weight Loss Blog | Downscale',
    description: 'Latest health news, clinical updates, and evidence-based weight loss insights from Australian healthcare professionals.',
    url: 'https://www.downscale.com.au/blogs/news',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-blog.jpg',
        secureUrl: 'https://www.downscale.com.au/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Health News & Clinical Updates - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health News & Clinical Updates | Weight Loss Blog | Downscale',
    description: 'Latest health news and evidence-based weight loss insights from Australian healthcare professionals.',
    images: ['https://www.downscale.com.au/og-blog.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPagePage() {
  return <BlogPage />;
}