'use client';

// Note: Head component removed - App Router uses metadata exports instead
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Layout } from "@/components/layout/Layout";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4 mb-2"></div>,
  ssr: false
});
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkBreaks from 'remark-breaks';
// Use simple renderer to test if the issue is with markdown processing
const SimpleMarkdownRenderer = dynamic(
  () => import('@/components/blog/SimpleMarkdownRenderer').then(mod => ({ default: mod.SimpleMarkdownRenderer })),
  {
    ssr: false,
    loading: () => <div className="animate-pulse bg-muted h-48 rounded"></div>
  }
);


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

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle legacy URL redirects and ensure proper hydration
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentPath = window.location.pathname;

    // Legacy URL patterns should be handled by redirects,
    // but add extra protection here
    if (currentPath.includes('/f/') || currentPath.includes('/home/f/')) {
      const cleanSlug = post.slug;
      if (cleanSlug) {
        router.replace(`/blog/${cleanSlug}`);
        return;
      }
    }
  }, [post.slug, router, searchParams]);

  const formatDate = (dateString: string) => {
    // Format dates in Australian locale
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground">
        {post ? (
          <>
            {/* Hero Section with Background Image */}
            <div 
              className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: post.featured_image 
                  ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${post.featured_image})`
                  : 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary-variant)) 100%)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"></div>
              
              <div className="relative z-10 container mx-auto px-4 py-16 text-center">
                <Button 
                  onClick={() => router.push('/blog')}
                  variant="ghost"
                  className="absolute top-4 left-4 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
                
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-sm">
                      {post.category}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-primary text-primary-foreground text-sm">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                    {post.title}
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto drop-shadow-md">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-center gap-6 text-white/80">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="font-medium">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>{format(new Date(post.created_at), 'MMMM d, yyyy')}</span>
                    </div>
                    {post.reading_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>{post.reading_time} min read</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-4xl mx-auto">
                <SimpleMarkdownRenderer content={post.content} />
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="min-h-screen flex items-center justify-center pt-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
              <p className="text-muted-foreground mb-6">
                Sorry, we couldn't find the blog post you were looking for.
              </p>
              <Button onClick={() => router.push('/blog')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
