'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Edit, Eye, User, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BlogPostForm } from './BlogPostForm';
import { normalizeBlogContent } from '@/utils/markdown';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  meta_description?: string;
  reading_time?: number;
}

interface BlogAdminProps {
  onLogout: () => void;
}

export function BlogAdmin({ onLogout }: BlogAdminProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Downscale Weight Loss Clinic Team',
    category: 'Health',
    tags: [],
    featured: false,
    published: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...');
      
      // Check authentication status
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session status:', !!session);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching posts:', error);
        console.error('Error details:', error.details, error.hint, error.code);
        toast({
          title: "Error",
          description: `Failed to fetch blog posts: ${error.message}`,
          variant: "destructive",
        });
        return;
      }
      
      console.log('Posts fetched successfully:', data?.length);
      setPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Function to notify search engines about new/updated content
  const triggerSearchEngineNotifications = async (slug: string) => {
    try {
      console.log('Triggering search engine notifications for:', slug);
      
      // Ping Google and Bing about sitemap update
      const pingResponse = await supabase.functions.invoke('ping-google-sitemap');
      if (pingResponse.error) {
        console.warn('Error pinging Google/Bing:', pingResponse.error);
      } else {
        console.log('Successfully pinged Google and Bing');
      }

      // Submit to IndexNow (Bing/Yandex)
      const blogUrl = `https://www.downscale.com.au/blog/${slug}`;
      const indexNowResponse = await supabase.functions.invoke('indexnow-submit', {
        body: { urls: [blogUrl, 'https://www.downscale.com.au/blog'] }
      });
      if (indexNowResponse.error) {
        console.warn('Error submitting to IndexNow:', indexNowResponse.error);
      } else {
        console.log('Successfully submitted to IndexNow');
      }

      toast({
        title: "Search Engines Notified",
        description: "Google, Bing, and other search engines have been notified about this new content.",
      });
    } catch (error) {
      console.warn('Error notifying search engines:', error);
      // Don't show error toast as this is not critical to the user experience
    }
  };

  const handleSavePost = async (postData: Partial<BlogPost>, action: 'draft' | 'publish' | 'schedule') => {
    setIsLoading(true);
    try {
      // Generate slug from title
      const slug = postData.title
        ?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Save content as-is without auto-normalization
      const saveData = {
        title: postData.title,
        slug,
        excerpt: postData.excerpt || '',
        content: postData.content || '',
        author: postData.author || 'Downscale Weight Loss Clinic Team',
        category: postData.category || 'Health',
        tags: postData.tags || [],
        featured: postData.featured || false,
        published: action === 'publish',
        featured_image: postData.featured_image || null,
        meta_description: postData.meta_description || null,
        reading_time: Math.ceil(((postData.content || '').split(' ').length || 0) / 200) || null
      };

      let result;
      if (currentPost.id) {
        // Update existing post
        result = await supabase
          .from('blog_posts')
          .update(saveData)
          .eq('id', currentPost.id);
      } else {
        // Create new post
        result = await supabase
          .from('blog_posts')
          .insert([saveData]);
      }

      if (result.error) {
        console.error('Error saving post:', result.error);
        console.error('Error details:', result.error.details, result.error.hint, result.error.code);
        console.error('Save data that failed:', saveData);
        toast({
          title: "Error",
          description: `Failed to save blog post: ${result.error.message}`,
          variant: "destructive",
        });
        return;
      }

      const actionText = action === 'publish' ? 'published' : action === 'schedule' ? 'scheduled' : 'saved as draft';
      
      // If publishing, trigger search engine notifications
      if (action === 'publish') {
        try {
          await triggerSearchEngineNotifications(slug);
        } catch (error) {
          console.warn('Search engine notification failed:', error);
          // Don't fail the post save if notifications fail
        }
      }
      
      toast({
        title: "Post Saved",
        description: `Your blog post has been ${actionText} successfully.`,
      });

      setIsEditing(false);
      setCurrentPost({
        title: '',
        excerpt: '',
        content: '',
        author: 'Downscale Weight Loss Clinic Team',
        category: 'Health',
        tags: [],
        featured: false,
        published: false
      });
      fetchPosts();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const startNew = () => {
    setCurrentPost({
      title: '',
      excerpt: '',
      content: '',
      author: 'Downscale Weight Loss Clinic Team',
      category: 'Health',
      tags: [],
      featured: false,
      published: false
    });
    setIsEditing(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isEditing) {
    return (
      <BlogPostForm
        post={currentPost}
        onSave={handleSavePost}
        onCancel={() => setIsEditing(false)}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                className="bg-slate-800 border-slate-700 text-cream hover:bg-slate-700"
                aria-label="Back to main site"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Blog Management</h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={startNew}
              className="bg-brown hover:bg-brown/80 text-cream"
              aria-label="Create new blog post"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
            <Button
              onClick={onLogout}
              variant="outline"
              className="bg-slate-800 border-slate-700 text-cream hover:bg-slate-700"
              aria-label="Logout from blog admin"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="text-center py-12">
                <p className="text-cream/70 mb-4">No blog posts yet</p>
                <Button
                  onClick={startNew}
                  className="bg-brown hover:bg-brown/80 text-cream"
                  aria-label="Create your first blog post"
                >
                  Create your first post
                </Button>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors duration-300 overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  {/* Featured Image Section - Same as main site */}
                  {post.featured_image ? (
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 overflow-hidden rounded-lg bg-slate-700 m-4">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-full object-contain md:hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1 left-1 flex gap-1">
                        <Badge variant="secondary" className="text-xs bg-slate-600 text-cream">{post.category}</Badge>
                        {post.featured && <Badge className="bg-brown text-cream text-xs">Featured</Badge>}
                      </div>
                    </div>
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 bg-slate-700 rounded-lg flex items-center justify-center m-4">
                      <div className="text-center">
                        <div className="text-xs text-cream/50 mb-1">No Image</div>
                        <div className="flex flex-col gap-1">
                          <Badge variant="secondary" className="text-xs bg-slate-600 text-cream">{post.category}</Badge>
                          {post.featured && <Badge className="bg-brown text-cream text-xs">Featured</Badge>}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Content Section */}
                  <div className="flex-1 flex flex-col justify-between p-4 pt-2">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-cream line-clamp-2 text-lg leading-tight">{post.title}</CardTitle>
                            <Badge variant={post.published ? "default" : "secondary"} className="ml-auto flex-shrink-0">
                              {post.published ? "Published" : "Draft"}
                            </Badge>
                          </div>
                          <CardDescription className="text-cream/70 line-clamp-2 text-sm">
                            {post.excerpt}
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-cream/60">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs text-cream/70 border-cream/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => startEdit(post)}
                          size="sm"
                          variant="outline"
                          className="bg-slate-700 border-slate-600 text-cream hover:bg-slate-600"
                          aria-label={`Edit ${post.title}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Link href={`/blog/${post.slug}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-slate-700 border-slate-600 text-cream hover:bg-slate-600"
                            aria-label={`View ${post.title}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}