import { Metadata } from 'next';
import BlogPage from '@/components/BlogPage';

export const metadata: Metadata = {
  title: 'Clinical Blog & Research | Downscale Weight Loss Clinic',
  description: 'Evidence-based articles, clinical insights, and research updates from the Downscale Weight Loss Clinic team. Expert medical advice on weight management, nutrition, and health.',
  keywords: 'health blog, clinical insights, weight management, nutrition, medical research, downscale weight loss clinic',
  openGraph: {
    title: 'Clinical Blog & Research | Downscale Weight Loss Clinic',
    description: 'Evidence-based articles, clinical insights, and research updates from the Downscale Weight Loss Clinic team.',
    type: 'website',
    url: 'https://www.downscale.com.au/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clinical Blog & Research | Downscale Weight Loss Clinic',
    description: 'Evidence-based articles, clinical insights, and research updates from the Downscale Weight Loss Clinic team.',
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/blog',
  },
};

export default function BlogPagePage() {
  return <BlogPage />;
}