'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Layout } from "@/components/layout/Layout";
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  meta_description?: string;
  reading_time?: number;
  featured_image?: string;
}

export function ClientOnlyBlogPost() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();

        if (error) throw error;

        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "Sorry, we couldn't find the blog post you were looking for."}
            </p>
            <Button onClick={() => router.push('/blog')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground">
        {/* Back to Blog Button */}
        <div className="container mx-auto px-4 pt-4">
          <Button
            onClick={() => router.push('/blog')}
            variant="ghost"
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{isClient ? new Date(post.created_at).toLocaleDateString('en-AU') : 'Loading...'}</span>
                {post.reading_time && (
                  <>
                    <span>•</span>
                    <span>{post.reading_time} min read</span>
                  </>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="mb-8">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer content={post.content} />
            </div>

          </div>
        </article>
      </div>
    </Layout>
  );
}