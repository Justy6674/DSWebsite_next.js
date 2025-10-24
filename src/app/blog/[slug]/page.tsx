import { Metadata } from 'next';
import BlogPostPage from '@/components/BlogPostPage';
import { supabaseServer } from '@/integrations/supabase/server';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate dynamic metadata based on the blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = params;
  
  try {
    const { data: post } = await supabaseServer
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

export default async function BlogPostPagePage({ params }: BlogPostPageProps) {
  const { slug } = params;

  try {
    const { data: post } = await supabaseServer
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle();

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find the blog post you were looking for.
            </p>
          </div>
        </div>
      );
    }

    return <BlogPostPage post={post} />;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Post</h1>
          <p className="text-muted-foreground mb-6">
            Something went wrong while loading the blog post.
          </p>
        </div>
      </div>
    );
  }
}