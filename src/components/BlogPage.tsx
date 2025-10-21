'use client';

import Head from "next/head";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Layout } from "@/components/layout/Layout";
import { OptimizedBackground } from '@/components/ui/optimized-background';
import { Calendar, User, ArrowRight, Search, Clock, FileText, Users, Award, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PageNavigation } from '@/components/navigation/PageNavigation';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  featured: boolean;
  featured_image?: string;
  created_at: string;
  updated_at: string;
  meta_description?: string;
  reading_time?: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setPosts(data || []);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(data?.map(post => post.category) || [])];
      setCategories(uniqueCategories);
      
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get only the latest featured post (one only)
  const manuallyFeaturedPosts = filteredPosts.filter(post => post.featured);
  const featuredPost = manuallyFeaturedPosts.length > 0 ? [manuallyFeaturedPosts[0]] : [];
  const regularPosts = featuredPost.length > 0 ? 
    filteredPosts.filter(post => post.id !== featuredPost[0].id) : 
    filteredPosts;

  return (
    <Layout>
      <Head>
        <title>Clinical Blog & Research | Downscale Weight Loss Clinic</title>
        <meta name="description" content="Evidence-based articles, clinical insights, and research updates from the Downscale Weight Loss Clinic team. Expert medical advice on weight management, nutrition, and health." />
        <meta property="og:title" content="Clinical Blog & Research | Downscale Weight Loss Clinic" />
        <meta property="og:description" content="Evidence-based articles, clinical insights, and research updates from the Downscale Weight Loss Clinic team. Expert medical advice on weight management, nutrition, and health." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clinical Blog & Research | Downscale Weight Loss Clinic" />
        <meta name="twitter:description" content="Evidence-based articles, clinical insights, and research updates from the Downscale Weight Loss Clinic team." />
        <meta name="keywords" content="health blog, clinical insights, weight management, nutrition, medical research, downscale weight loss clinic" />
        <link rel="canonical" href="https://www.downscale.com.au/blog" />
        <link rel="preload" as="image" href="/blog-hero-bookshelf.webp" type="image/webp" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Downscale Weight Loss Clinic Clinical Blog",
            "description": "Evidence-based medical articles and clinical insights from qualified healthcare professionals specializing in weight management and telehealth services.",
            "url": "https://www.downscale.com.au/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Downscale Weight Loss Clinic",
              "url": "https://www.downscale.com.au"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.downscale.com.au/blog"
            },
            "about": ["Weight Management", "Telehealth", "Clinical Medicine", "Nutrition", "Healthcare"],
            "inLanguage": "en-AU",
            "audience": {
              "@type": "Audience",
              "audienceType": "Patients and Healthcare Professionals"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How often do you publish new clinical articles?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We publish new evidence-based articles weekly, covering the latest research in weight management, telehealth best practices, and clinical insights from our healthcare team."
                }
              },
              {
                "@type": "Question", 
                "name": "Are your blog articles written by qualified healthcare professionals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all our articles are written or reviewed by our qualified Nurse Practitioner and healthcare team, ensuring clinical accuracy and evidence-based content."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use information from your blog for medical decisions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our blog provides educational information only and should not replace professional medical advice. Always consult with your healthcare provider for personalised medical guidance."
                }
              }
            ]
          })}
        </script>
      </Head>
      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <div 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(/blog-hero-bookshelf.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img 
            src="/blog-hero-bookshelf.webp" 
            alt="" 
            className="hidden"
            loading="eager"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="mb-4 animate-fade-in" style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}>
                Clinical Insights & Research
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in" style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}>
                Evidence-based articles, clinical insights, and research updates from the Downscale Weight Loss Clinic team
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-2">
          <PageNavigation />
        </div>

        <div className="container mx-auto px-4 py-8">
          

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading articles...</p>
            </div>
          ) : (
            <>
              {/* Featured Post - Single, Larger with Brown Border */}
              {featuredPost.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
                  <div className="max-w-5xl mx-auto">
                     {featuredPost.map((post) => (
                       <Link key={post.id} href={`/blog/${post.slug}`} className="block no-underline">
                         <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border-3" 
                               style={{ borderColor: '#b68a71', borderWidth: '3px' }}>
                           <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-primary/5 to-primary/10">
                             {/* Image Section */}
                             {post.featured_image ? (
                               <div className="relative h-80 md:h-96 overflow-hidden bg-muted">
                                  <img 
                                    src={post.featured_image} 
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="eager"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                                  />
                                 <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                   <Badge variant="secondary" className="text-sm shadow-lg">{post.category}</Badge>
                                   <Badge className="text-sm shadow-lg" style={{ backgroundColor: '#b68a71', color: 'white' }}>Featured</Badge>
                                 </div>
                               </div>
                             ) : (
                               <div className="h-80 md:h-96 bg-muted flex items-center justify-center">
                                 <div className="text-center">
                                   <div className="text-sm text-muted-foreground mb-4">No Image</div>
                                   <div className="flex flex-wrap gap-2 justify-center">
                                     <Badge variant="secondary" className="text-sm">{post.category}</Badge>
                                     <Badge className="text-sm" style={{ backgroundColor: '#b68a71', color: 'white' }}>Featured</Badge>
                                   </div>
                                 </div>
                               </div>
                             )}
                             
                             {/* Content Section */}
                             <div className="p-6 md:p-8 flex flex-col justify-center">
                               <CardHeader className="p-0 mb-6">
                                 <CardTitle className="text-2xl md:text-3xl leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                   {post.title}
                                 </CardTitle>
                                 <CardDescription className="text-lg leading-relaxed line-clamp-4 text-muted-foreground">
                                   {post.excerpt}
                                 </CardDescription>
                               </CardHeader>
                               <CardContent className="p-0">
                                 <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
                                   <div className="flex items-center gap-2">
                                     <User className="h-4 w-4" />
                                     <span>{post.author}</span>
                                   </div>
                                   <div className="flex items-center gap-2">
                                     <Calendar className="h-4 w-4" />
                                     <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                                   </div>
                                   {post.reading_time && (
                                     <div className="flex items-center gap-2">
                                       <Clock className="h-4 w-4" />
                                       <span>{post.reading_time} min read</span>
                                     </div>
                                   )}
                                 </div>
                                 <div className="flex flex-wrap gap-2">
                                   {post.tags.slice(0, 6).map((tag) => (
                                     <Badge key={tag} variant="outline" className="text-sm">
                                       {tag}
                                     </Badge>
                                   ))}
                                 </div>
                               </CardContent>
                             </div>
                           </div>
                         </Card>
                       </Link>
                    ))}
                   </div>
                </div>
              )}

              {/* Regular Posts - Clickable Cards */}
              {regularPosts.length > 0 && (
                <div>
                   <h2 className="text-2xl font-bold mb-6">
                     {featuredPost.length > 0 ? 'Latest Articles' : 'All Articles'}
                   </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {regularPosts.map((post) => (
                          <Link key={post.id} href={`/blog/${post.slug}`} className="block no-underline">
                            <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group hover:border-primary/50 h-full">
                              <div className="flex flex-col h-full">
                                {/* Image */}
                                {post.featured_image && (
                                  <div className="relative h-48 overflow-hidden bg-muted">
                                     <img 
                                       src={post.featured_image} 
                                       alt={post.title}
                                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                       loading="lazy"
                                       sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
                                     />
                                    <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
                                      {post.category}
                                    </Badge>
                                  </div>
                                )}
                                
                                {/* Content */}
                                <div className="flex-1 p-4">
                                  <CardHeader className="p-0 mb-3">
                                    {!post.featured_image && (
                                      <Badge variant="secondary" className="w-fit mb-2 text-xs">
                                        {post.category}
                                      </Badge>
                                    )}
                                    <CardTitle className="line-clamp-2 text-lg leading-tight group-hover:text-primary transition-colors">{post.title}</CardTitle>
                                    <CardDescription className="line-clamp-3 text-sm mt-2">
                                      {post.excerpt}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent className="p-0 mt-auto">
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                                      <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        <span>{post.author}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                                      </div>
                                      {post.reading_time && (
                                        <div className="flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          <span>{post.reading_time} min</span>
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex overflow-x-auto gap-1 no-scrollbar">
                                      {post.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="outline" className="text-xs flex-shrink-0">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </CardContent>
                                </div>
                              </div>
                            </Card>
                          </Link>
                        ))}
                      </div>
                   </div>
               )}

              {/* No Results Found */}
              {filteredPosts.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-xl font-semibold mb-2">No matching articles found</h3>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any articles matching your current search criteria. Try different keywords or browse all categories.
                    </p>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("All");
                        }}
                        className="w-full"
                      >
                        View All Articles
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Or try searching for topics like "weight management", "nutrition", or "telehealth"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}