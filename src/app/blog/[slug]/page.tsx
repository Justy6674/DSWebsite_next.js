import { Metadata } from 'next';
import { ClientOnlyBlogPost } from '@/components/blog/ClientOnlyBlogPost';
import { createClient } from '@supabase/supabase-js';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Initialize Supabase client for metadata generation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pooebqhsshfafkhvccrl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8';

// Generate static params for SSG - pre-render all published blog posts
export async function generateStaticParams() {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (posts) {
      return posts.map((post) => ({
        slug: post.slug,
      }));
    }
  } catch (error) {
    console.error('Error generating static params for blog posts:', error);
  }

  return [];
}

// ISR - Revalidate every hour for fresh content
export const revalidate = 3600;

// Enhanced metadata generation with proper SEO for blog posts
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    // Fetch blog post data for metadata
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: post } = await supabase
      .from('blog_posts')
      .select('title, excerpt, meta_description, category, tags, author, featured_image, created_at, updated_at')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (post) {
      const title = `${post.title} | Downscale Weight Loss Clinic`;
      const description = post.meta_description || post.excerpt || `Read ${post.title} on Downscale Weight Loss Clinic blog`;
      const keywords = post.tags?.join(', ') || 'weight loss, health, nutrition, wellness';
      const imageUrl = post.featured_image || 'https://www.downscale.com.au/og-image.jpg';

      return {
        title,
        description,
        keywords,
        authors: [{ name: post.author || 'Downscale Team' }],
        openGraph: {
          title,
          description,
          type: 'article',
          url: `https://www.downscale.com.au/blog/${slug}`,
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
          publishedTime: post.created_at,
          modifiedTime: post.updated_at,
          authors: [post.author || 'Downscale Team'],
          section: post.category,
          tags: post.tags || [],
        },
        twitter: {
          card: 'summary_large_image',
          title,
          description,
          images: [imageUrl],
        },
        alternates: {
          canonical: `https://www.downscale.com.au/blog/${slug}`,
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
    }
  } catch (error) {
    console.error('Error fetching blog post metadata:', error);
  }

  // Fallback metadata if post not found or error
  return {
    title: `Blog Post | Downscale Weight Loss Clinic`,
    description: 'Expert insights on weight loss, nutrition, and health from Downscale Weight Loss Clinic',
    alternates: {
      canonical: `https://www.downscale.com.au/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogPostPagePage({ params }: BlogPostPageProps) {
  // Use completely client-side component to bypass server-side issues
  return <ClientOnlyBlogPost />;
}