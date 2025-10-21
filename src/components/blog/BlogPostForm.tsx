'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Eye, Calendar, Upload, X, Wand2, Sparkles, Clock, Brain, WrapText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AICreatorModal } from './AICreatorModal';
import { MarkdownToolbar } from './MarkdownToolbar';
import { MarkdownRenderer } from './MarkdownRenderer';
import { EditablePreview } from './EditablePreview';
import { LinkModal } from './LinkModal';
import { normalizeBlogContent } from '@/utils/markdown';

interface BlogPost {
  id?: string;
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  created_at?: string;
  updated_at?: string;
  meta_description?: string;
  reading_time?: number;
}

interface BlogPostFormProps {
  post: Partial<BlogPost>;
  onSave: (post: Partial<BlogPost>, action: 'draft' | 'publish' | 'schedule') => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function BlogPostForm({ post, onSave, onCancel, isLoading = false }: BlogPostFormProps) {
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>(post);
  const [tagInput, setTagInput] = useState(post.tags?.join(', ') || '');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showAICreator, setShowAICreator] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setCurrentPost(post);
    setTagInput(post.tags?.join(', ') || '');
  }, [post]);

  const handleSave = useCallback((action: 'draft' | 'publish' | 'schedule') => {
    if (!currentPost.title?.trim() || !currentPost.content?.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }

    const postData = {
      ...currentPost,
      tags: tagInput.split(',').map(tag => tag.trim()).filter(Boolean),
    };

    onSave(postData, action);
  }, [currentPost, tagInput, onSave, toast]);

  const optimizeWithAI = async (action: string) => {
    setIsOptimizing(true);
    try {
      const { data, error } = await supabase.functions.invoke('blog-ai-optimizer', {
        body: {
          action,
          title: currentPost.title,
          content: currentPost.content,
          excerpt: currentPost.excerpt,
          category: currentPost.category,
          context: 'Australian healthcare, use Australian English spelling and terminology'
        }
      });

      if (error) throw error;

      switch (action) {
        case 'optimize_content':
          // Keep content as Markdown instead of converting to HTML
          setCurrentPost(prev => ({ ...prev, content: data.result }));
          break;
        case 'generate_excerpt':
          setCurrentPost(prev => ({ ...prev, excerpt: data.result }));
          break;
        case 'suggest_tags':
          let tags = data.result;
          if (typeof tags === 'string') {
            try {
              tags = JSON.parse(tags);
            } catch {
              tags = tags.split(',').map(tag => tag.trim());
            }
          }
          if (Array.isArray(tags)) {
            setTagInput(tags.join(', '));
          } else {
            setTagInput(String(tags));
          }
          break;
        case 'suggest_category':
          if (data.result && typeof data.result === 'string') {
            setCurrentPost(prev => ({ ...prev, category: data.result }));
            toast({
              title: "Category generated successfully",
              description: `Set category to: ${data.result}`,
            });
          }
          break;
        case 'master_optimize':
          if (data.result && typeof data.result === 'object') {
            const optimized = data.result;
            setCurrentPost(prev => ({
              ...prev,
              content: optimized.content || prev.content,
              title: optimized.title || prev.title,
              excerpt: optimized.excerpt || prev.excerpt,
              category: optimized.category || prev.category,
              tags: optimized.tags || prev.tags,
              meta_description: optimized.meta_description || prev.meta_description
            }));
            if (optimized.tags && Array.isArray(optimized.tags)) {
              setTagInput(optimized.tags.join(', '));
            }
            toast({
              title: "Master AI Optimisation Complete",
              description: "Content and all metadata optimized with medical expertise and proper references",
            });
          }
          break;
        case 'generate_meta_description':
          setCurrentPost(prev => ({ ...prev, meta_description: data.result }));
          break;
      }

      toast({
        title: "AI Optimisation Complete",
        description: "Content has been optimized successfully",
      });
    } catch (error) {
      console.error('Error optimizing with AI:', error);
      toast({
        title: "AI Optimisation Failed",
        description: error?.message || "Could not optimize content with AI",
        variant: "destructive",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `blog-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      setCurrentPost(prev => ({ ...prev, featured_image: publicUrl }));
      
      toast({
        title: "Image Uploaded",
        description: "Featured image has been uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: `Failed to upload image: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const removeImage = () => {
    setCurrentPost(prev => ({ ...prev, featured_image: '' }));
  };

  const handleAIPostCreated = (aiPost: Partial<BlogPost>) => {
    setCurrentPost(aiPost);
    if (aiPost.tags) {
      setTagInput(Array.isArray(aiPost.tags) ? aiPost.tags.join(', ') : '');
    }
    setShowAICreator(false);
  };

  const insertMarkdown = (text: string) => {
    const textarea = document.getElementById('post-content') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentContent = currentPost.content || '';
      const newContent = currentContent.substring(0, start) + text + currentContent.substring(end);
      setCurrentPost({ ...currentPost, content: newContent });
      
      // Set cursor position after inserted text
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + text.length, start + text.length);
      }, 0);
    }
  };

  const handleLinkInsert = () => {
    const textarea = document.getElementById('post-content') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = textarea.value.substring(start, end);
      setSelectedText(selected);
      setShowLinkModal(true);
    }
  };

  const insertLink = (linkText: string, url: string) => {
    const markdown = `[${linkText}](${url})`;
    const textarea = document.getElementById('post-content') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentContent = currentPost.content || '';
      const newContent = currentContent.substring(0, start) + markdown + currentContent.substring(end);
      setCurrentPost({ ...currentPost, content: newContent });
      
      // Set cursor position after inserted link
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + markdown.length, start + markdown.length);
      }, 0);
    }
  };

  const handlePasteFix = () => {
    if (currentPost.content) {
      const normalizedContent = normalizeBlogContent(currentPost.content);
      setCurrentPost({ ...currentPost, content: normalizedContent });
      toast({
        title: "Content Fixed",
        description: "Applied bullet point and formatting fixes",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-cream">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                onClick={onCancel}
                variant="outline"
                className="bg-slate-800 border-slate-700 text-cream hover:bg-slate-700"
                disabled={isLoading}
                aria-label="Back to posts list"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Button>
              <h1 className="text-3xl font-bold">
                {currentPost.id ? 'Edit Post' : 'New Post'}
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowAICreator(true)}
                variant="outline"
                className="bg-purple-600 border-purple-500 text-white hover:bg-purple-700"
                disabled={isLoading}
                aria-label="Create post with AI assistance"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Create with AI
              </Button>
              <Button
                onClick={() => handleSave('draft')}
                variant="outline"
                className="bg-slate-800 border-slate-700 text-cream hover:bg-slate-700"
                disabled={isLoading}
                aria-label={currentPost.id ? "Update draft" : "Save as draft"}
              >
                <Save className="mr-2 h-4 w-4" />
                {currentPost.id ? 'Update Draft' : 'Save Draft'}
              </Button>
              <Button
                onClick={() => handleSave('publish')}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
                aria-label={currentPost.id ? "Update and publish" : "Publish post now"}
              >
                <Eye className="mr-2 h-4 w-4" />
                {currentPost.id ? 'Update & Publish' : 'Publish Now'}
              </Button>
              <Button
                onClick={() => handleSave('schedule')}
                variant="outline"
                className="bg-blue-600 border-blue-500 text-white hover:bg-blue-700"
                disabled={isLoading}
                aria-label="Schedule post for later"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              {/* Master AI Optimization */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-cream flex items-center gap-2">
                    <Brain className="w-5 h-5 text-green-400" />
                    Master AI Optimisation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-3">
                    <Button
                      type="button"
                      onClick={() => optimizeWithAI('master_optimize')}
                      disabled={isLoading || !currentPost.content}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2"
                      title="Optimize all fields using medical expertise and reputable sources"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Master AI Optimize
                    </Button>
                  </div>
                  <p className="text-sm text-cream/70">
                    Intelligently optimizes Title, Excerpt, Category, Tags, and Meta Description using evidence-based medical content from .gov, WHO, RACGP, and peer-reviewed sources.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-cream">Post Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="post-title" className="block text-sm font-medium text-cream mb-2">
                      Title *
                    </label>
                    <Input
                      id="post-title"
                      placeholder="Post title"
                      value={currentPost.title || ''}
                      onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
                      style={{ color: '#f7f2d3' }}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="post-excerpt" className="block text-sm font-medium text-cream mb-2">
                      Excerpt
                    </label>
                    <Textarea
                      id="post-excerpt"
                      placeholder="Brief description of the post"
                      value={currentPost.excerpt || ''}
                      onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50 min-h-[100px]"
                      style={{ color: '#f7f2d3' }}
                    />
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => optimizeWithAI('generate_excerpt')}
                        size="sm"
                        variant="outline"
                        className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                        disabled={!currentPost.title || isOptimizing}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isOptimizing ? 'Generating...' : 'AI Generate'}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="post-content" className="block text-sm font-medium text-cream mb-2">
                      Content *
                    </label>
                    
                    {/* Formatting Help */}
                    <div className="mb-3 p-3 bg-slate-800 rounded-md border border-slate-600">
                      <h4 className="text-cream font-medium mb-2">Markdown Quick Reference:</h4>
                      <div className="text-sm text-slate-300 grid grid-cols-2 gap-2">
                        <div>**Bold** = <strong>Bold</strong></div>
                        <div>_Italic_ = <em>Italic</em></div>
                        <div># Heading 1</div>
                        <div>## Heading 2</div>
                        <div>- Bullet list</div>
                        <div>1. Numbered list</div>
                      </div>
                    </div>

                    <div className="border border-slate-600 rounded-md bg-slate-700">
                      <MarkdownToolbar onInsert={insertMarkdown} onLinkInsert={handleLinkInsert} />
                      <Textarea
                        id="post-content"
                        placeholder="Write your blog post content here using Markdown..."
                        value={currentPost.content || ''}
                        onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                        className="bg-slate-700 border-0 border-t border-slate-600 text-cream placeholder:text-cream/50 min-h-[400px] rounded-t-none"
                        style={{ color: '#f7f2d3' }}
                        required
                        aria-required="true"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => optimizeWithAI('optimize_content')}
                        size="sm"
                        variant="outline"
                        className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                        disabled={isOptimizing}
                        title="Uses AI to add headings, lists and improve readability/SEO"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isOptimizing ? 'Optimizing...' : 'Step 2: AI Format & Optimize'}
                      </Button>
                      <Button
                        onClick={handlePasteFix}
                        size="sm"
                        variant="outline"
                        className="bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
                        disabled={!currentPost.content}
                        title="Cleans up pasted content: fixes bullets, numbered lists, and line breaks"
                      >
                        <WrapText className="mr-2 h-4 w-4" />
                        Step 1: Clean Pasted Formatting
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* Live Preview */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-cream">Live Preview</CardTitle>
                  <p className="text-sm text-slate-300 mt-1">
                    This preview matches exactly how your content will appear on the live website
                  </p>
                </CardHeader>
                 <CardContent>
                   <EditablePreview 
                     content={currentPost.content || '*Preview will appear here as you type...*'}
                     onContentChange={(content) => setCurrentPost({ ...currentPost, content })}
                   />
                 </CardContent>
              </Card>

              {/* Meta Information */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-cream">Meta Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="post-author" className="block text-sm font-medium text-cream mb-2">
                      Author *
                    </label>
                    <Input
                      id="post-author"
                      placeholder="Enter author name"
                      value={currentPost.author || 'Downscale Weight Loss Clinic Team'}
                      onChange={(e) => setCurrentPost({...currentPost, author: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
                      style={{ color: '#f7f2d3' }}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label htmlFor="post-category" className="block text-sm font-medium text-cream mb-2">
                      Category *
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="post-category"
                        placeholder="e.g. Weight Management, Nutrition, Mental Health"
                        value={currentPost.category || ''}
                        onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
                        style={{ color: '#f7f2d3' }}
                        required
                        aria-required="true"
                      />
                      <Button
                        type="button"
                        onClick={() => optimizeWithAI('suggest_category')}
                        disabled={isLoading || !currentPost.title}
                        className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                        title="Generate SEO-optimised category based on title"
                      >
                        <Sparkles className="w-4 h-4 mr-1" />
                        AI Generate
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="post-tags" className="block text-sm font-medium text-cream mb-2">
                      Tags (comma-separated)
                    </label>
                    <Input
                      id="post-tags"
                      placeholder="health, weight-loss, nutrition"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
                      style={{ color: '#f7f2d3' }}
                    />
                    <div className="flex gap-2 mt-2">
                      <Button
                        onClick={() => optimizeWithAI('suggest_tags')}
                        size="sm"
                        variant="outline"
                        className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                        disabled={!currentPost.title || isOptimizing}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isOptimizing ? 'Suggesting...' : 'AI Suggest'}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="meta-description" className="block text-sm font-medium text-cream mb-2">
                      Meta Description
                    </label>
                    <Textarea
                      id="meta-description"
                      placeholder="SEO meta description (155 characters max)"
                      value={currentPost.meta_description || ''}
                      onChange={(e) => setCurrentPost({...currentPost, meta_description: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
                      style={{ color: '#f7f2d3' }}
                      maxLength={155}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <Button
                        onClick={() => optimizeWithAI('generate_meta_description')}
                        size="sm"
                        variant="outline"
                        className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                        disabled={!currentPost.title || isOptimizing}
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isOptimizing ? 'Generating...' : 'AI Generate'}
                      </Button>
                      <span className="text-xs text-cream/60">
                        {(currentPost.meta_description || '').length}/155
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-cream">Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={currentPost.featured || false}
                      onChange={(e) => setCurrentPost({...currentPost, featured: e.target.checked})}
                      className="w-4 h-4 text-primary bg-slate-700 border-slate-600 rounded focus:ring-primary focus:ring-2"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-cream">
                      Featured Article
                    </label>
                  </div>
                  <p className="text-xs text-cream/60">
                    Featured articles appear prominently at the top of the blog page
                  </p>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-cream">Featured Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentPost.featured_image ? (
                    <div className="space-y-2">
                      <img 
                        src={currentPost.featured_image} 
                        alt="Featured image preview" 
                        className="w-full h-32 object-cover rounded-lg border border-slate-600"
                      />
                      <Button
                        onClick={removeImage}
                        size="sm"
                        variant="destructive"
                        className="w-full"
                        aria-label="Remove featured image"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleImageUpload(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                        disabled={isUploadingImage}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full bg-slate-700 border-slate-600 text-cream hover:bg-slate-600"
                        disabled={isUploadingImage}
                        onClick={() => document.getElementById('image-upload')?.click()}
                        aria-label="Upload featured image"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploadingImage ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AICreatorModal
        isOpen={showAICreator}
        onClose={() => setShowAICreator(false)}
        onPostCreated={handleAIPostCreated}
      />
      
      <LinkModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onInsert={insertLink}
        selectedText={selectedText}
      />
    </>
  );
}