import { Metadata } from 'next';
import BlogPostPage from '@/components/BlogPostPage';
import { supabase } from '@/integrations/supabase/client';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate dynamic metadata based on the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  
  try {
    const { data: post } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (!post) {
      return {
        title: 'Blog Post Not Found | Downscale Weight Loss Clinic',
        description: 'The requested blog post could not be found.',
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    return {
      title: `${post.title} | Downscale Weight Loss Clinic Blog`,
      description: post.meta_description || post.excerpt,
      keywords: post.tags?.join(', '),
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.meta_description || post.excerpt,
        type: 'article',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        authors: [post.author],
        images: post.featured_image ? [
          {
            url: post.featured_image,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ] : [],
        url: `https://www.downscale.com.au/blog/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.meta_description || post.excerpt,
        images: post.featured_image ? [post.featured_image] : [],
      },
      alternates: {
        canonical: `https://www.downscale.com.au/blog/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog | Downscale Weight Loss Clinic',
      description: 'Blog page - Access and manage your content',
    };
  }
}

export default function BlogPostPagePage({ params }: BlogPostPageProps) {
  return <BlogPostPage />;
}