'use client';

import Head from "next/head";
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Layout } from "@/components/layout/Layout";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkBreaks from 'remark-breaks';
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

export default function BlogPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Handle canonical URL for query parameters without removing them from browser URL
  useEffect(() => {
    const currentPath = window.location.pathname;
    const queryParams = searchParams.toString();
    
    // For blogcategory parameters, we keep the URL but ensure canonical is clean
    // This prevents the URL from being seen as a soft 404 while maintaining SEO
    
    // Legacy URL patterns should be handled by App.tsx redirects,
    // but add extra protection here
    if (currentPath.includes('/f/') || currentPath.includes('/home/f/')) {
      const cleanSlug = slug;
      if (cleanSlug) {
        router.push(`/blog/${cleanSlug}`, { replace: true });
        return;
      }
    }
  }, [slug, router]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        
        // Clean and normalize the slug more thoroughly
        const cleanSlug = slug
          ?.split('?')[0] // Remove query parameters
          .toLowerCase() // Convert to lowercase
          .replace(/[^a-z0-9\-_]/g, '-') // Replace invalid chars with hyphens
          .replace(/-+/g, '-') // Collapse multiple hyphens
          .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
        
        if (!cleanSlug) {
          setPost(null);
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', cleanSlug)
          .eq('published', true)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching post:', error);
          toast({
            title: "Error",
            description: "Failed to fetch blog post",
            variant: "destructive",
          });
          return;
        }
        
        if (!data) {
          console.log(`Blog post not found for slug: ${cleanSlug}`);
          setPost(null);
          // Ensure 404 status is set for search engines
          if (typeof window !== 'undefined') {
            // Add meta tag for robots if it doesn't exist
            let robotsMeta = document.querySelector('meta[name="robots"]');
            if (!robotsMeta) {
              robotsMeta = document.createElement('meta');
              robotsMeta.setAttribute('name', 'robots');
              document.head.appendChild(robotsMeta);
            }
            robotsMeta.setAttribute('content', 'noindex, nofollow');
            
            // Set document title for 404
            document.title = 'Blog Post Not Found | Downscale Health';
          }
          return;
        }
        
        setPost(data);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error", 
          description: "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      {!loading && !post && (
        <Head>
          <title>Blog Post Not Found | Downscale Weight Loss Clinic</title>
          <meta name="description" content="The requested blog post could not be found. Visit our blog to explore other articles about weight management and health." />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="canonical" href="https://www.downscale.com.au/blog" />
        </Head>
      )}
      {post && (
        <Head>
          <title>{post.title} | Downscale Weight Loss Clinic</title>
          <meta name="description" content={post.meta_description || post.excerpt} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.meta_description || post.excerpt} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://www.downscale.com.au/blog/${post.slug}`} />
          <link rel="canonical" href={`https://www.downscale.com.au/blog/${post.slug}`} />
          {post.featured_image && <meta property="og:image" content={post.featured_image} />}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.meta_description || post.excerpt} />
          {post.featured_image && <meta name="twitter:image" content={post.featured_image} />}
          <meta name="article:published_time" content={post.created_at} />
          <meta name="article:modified_time" content={post.updated_at} />
          <meta name="author" content={post.author} />
          <meta name="keywords" content={post.tags.join(', ')} />
          <meta name="article:author" content={post.author} />
          <meta name="article:section" content={post.category} />
          {post.tags.map(tag => (
            <meta key={tag} name="article:tag" content={tag} />
          ))}
          <meta httpEquiv="last-modified" content={new Date(post.updated_at).toUTCString()} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "description": post.meta_description || post.excerpt,
              "url": `https://www.downscale.com.au/blog/${post.slug}`,
              "datePublished": post.created_at,
              "dateModified": post.updated_at,
              "author": {
                "@type": "Person",
                "name": post.author || "Downscale Weight Loss Clinic",
                "url": "https://www.downscale.com.au/about",
                "jobTitle": "Nurse Practitioner",
                "sameAs": [
                  "https://www.downscale.com.au/justin-black-nurse-practitioner"
                ]
              },
              "publisher": {
                "@type": "Organization",
                "name": "Downscale Weight Loss Clinic",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.downscale.com.au/og-image.jpg"
                },
                "url": "https://www.downscale.com.au"
              },
              "image": post.featured_image || "https://www.downscale.com.au/og-image.jpg",
              "articleSection": post.category,
              "keywords": post.tags ? post.tags.join(", ") : "",
              "reviewedBy": {
                "@type": "Person",
                "name": "Justin Black",
                "jobTitle": "Nurse Practitioner",
                "affiliation": {
                  "@type": "Organization",
                  "name": "Downscale Weight Loss Clinic"
                }
              },
              "citation": [
                {
                  "@type": "WebPage",
                  "name": "Australian Government Department of Health",
                  "url": "https://www.health.gov.au"
                },
                {
                  "@type": "WebPage", 
                  "name": "Royal Australian College of General Practitioners",
                  "url": "https://www.racgp.org.au"
                }
              ]
            })}
          </script>
        </Head>
      )}
      <div className="min-h-screen bg-background text-foreground">
        {loading ? (
          <div className="min-h-screen flex items-center justify-center pt-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading post...</p>
            </div>
          </div>
        ) : post ? (
          <>
            {/* Hero Section with Background Image */}
            <div 
              className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
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
                <MarkdownRenderer content={post.content} />
                
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
