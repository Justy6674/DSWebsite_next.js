import { Metadata } from 'next';
import { ClientOnlyBlogPost } from '@/components/blog/ClientOnlyBlogPost';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Basic metadata for now - will be improved once hydration works
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;

  return {
    title: `Blog Post | Downscale Weight Loss Clinic`,
    description: 'Blog post from Downscale Weight Loss Clinic',
    alternates: {
      canonical: `https://www.downscale.com.au/blog/${slug}`,
    },
  };
}

export default function BlogPostPagePage({ params }: BlogPostPageProps) {
  // Use completely client-side component to bypass server-side issues
  return <ClientOnlyBlogPost />;
}