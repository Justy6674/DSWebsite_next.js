'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Upload, X, Clock, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  meta_description: string;
}

interface AICreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: Partial<BlogPost>) => void;
}

export function AICreatorModal({ isOpen, onClose, onPostCreated }: AICreatorModalProps) {
  const [aiTopic, setAiTopic] = useState('');
  const [aiImage, setAiImage] = useState<File | null>(null);
  const [aiImagePreview, setAiImagePreview] = useState<string>('');
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Handle escape key and focus management
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Focus the modal when it opens
    const firstInput = modalRef.current?.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Cleanup image preview on unmount
  useEffect(() => {
    return () => {
      if (aiImagePreview) {
        URL.revokeObjectURL(aiImagePreview);
      }
    };
  }, [aiImagePreview]);

  const handleClose = () => {
    setAiTopic('');
    setAiImage(null);
    if (aiImagePreview) {
      URL.revokeObjectURL(aiImagePreview);
      setAiImagePreview('');
    }
    onClose();
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAIImageUpload = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    // Clean up previous preview
    if (aiImagePreview) {
      URL.revokeObjectURL(aiImagePreview);
    }

    setAiImage(file);
    const previewUrl = URL.createObjectURL(file);
    setAiImagePreview(previewUrl);
  };

  const createWithAI = async () => {
    if (!aiTopic.trim() && !aiImage) {
      toast({
        title: "Missing Input",
        description: "Please provide a topic or upload an image for AI generation",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingWithAI(true);
    try {
      let requestBody;
      
      if (aiImage) {
        const base64Image = await convertImageToBase64(aiImage);
        requestBody = {
          action: 'create_from_image',
          image: base64Image,
          topic: aiTopic || 'Analyse this image and create relevant health content',
          context: 'Australian healthcare context, use Australian English spelling, include proper medical references and evidence-based information'
        };
      } else {
        requestBody = {
          action: 'create_full_post',
          topic: aiTopic,
          context: 'Australian healthcare context, use Australian English spelling, include proper medical references and evidence-based information'
        };
      }

      const { data, error } = await supabase.functions.invoke('blog-ai-optimizer', {
        body: requestBody
      });

      if (error) {
        console.error('AI creation error:', error);
        throw error;
      }

      console.log('Raw AI response data:', data);

      if (!data || (!data.result && !data.success)) {
        console.error('Invalid response structure:', data);
        throw new Error('No result returned from AI function');
      }

      const post = data.result;
      console.log('Parsed post data:', post);
      
      // Use content directly - don't convert objects to JSON strings
      const content = post.content || '';
      
      const createdPost = {
        title: post.title || aiTopic || 'Generated from Image',
        excerpt: post.excerpt || '',
        content: content, // Use content as-is from the AI response
        author: 'Downscale Weight Loss Clinic Team',
        category: post.category || 'Health',
        tags: Array.isArray(post.tags) ? post.tags : (post.tags ? [post.tags] : ['Health']),
        featured: false,
        published: false,
        meta_description: post.meta_description || ''
      };

      console.log('Final created post:', createdPost);
      
      onPostCreated(createdPost);

      toast({
        title: "AI Post Created",
        description: "Blog post has been generated successfully. Review and edit as needed.",
      });

      handleClose();
    } catch (error) {
      console.error('Error creating with AI:', error);
      toast({
        title: "AI Creation Failed",
        description: error?.message || "Could not create post with AI",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingWithAI(false);
    }
  };

  const removeImage = () => {
    if (aiImagePreview) {
      URL.revokeObjectURL(aiImagePreview);
      setAiImagePreview('');
    }
    setAiImage(null);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-creator-title"
      aria-describedby="ai-creator-description"
    >
      <Card 
        ref={modalRef}
        className="bg-slate-800 border-slate-700 w-full max-w-md mx-4"
      >
        <CardHeader>
          <CardTitle id="ai-creator-title" className="text-cream flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Create Blog Post with AI
          </CardTitle>
          <CardDescription id="ai-creator-description" className="text-cream/70">
            Enter a topic or upload an image (Canva designs, infographics, etc.) and AI will create a complete blog post
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="ai-topic" className="text-cream text-sm font-medium">
              Topic (Optional if uploading image)
            </label>
            <Input
              id="ai-topic"
              placeholder="e.g., ADHD and Weight Management in Australia"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
              style={{ color: '#f7f2d3' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isGeneratingWithAI && (aiTopic.trim() || aiImage)) {
                  createWithAI();
                }
              }}
              disabled={isGeneratingWithAI}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-cream text-sm font-medium flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Upload Image (Canva design, infographic, etc.)
            </label>
            
            {aiImagePreview ? (
              <div className="space-y-2">
                <div className="relative">
                  <img 
                    src={aiImagePreview} 
                    alt="AI source image preview" 
                    className="w-full h-32 object-cover rounded-lg border border-slate-600"
                  />
                  <Button
                    onClick={removeImage}
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    disabled={isGeneratingWithAI}
                    aria-label="Remove uploaded image"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  id="ai-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleAIImageUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  disabled={isGeneratingWithAI}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-slate-700 border-slate-600 text-cream hover:bg-slate-600"
                  disabled={isGeneratingWithAI}
                  onClick={() => document.getElementById('ai-image-upload')?.click()}
                  aria-label="Upload image for AI analysis"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image for Analysis
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button
              onClick={handleClose}
              variant="outline"
              className="bg-slate-700 border-slate-600 text-cream hover:bg-slate-600"
              disabled={isGeneratingWithAI}
            >
              Cancel
            </Button>
            <Button
              onClick={createWithAI}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isGeneratingWithAI || (!aiTopic.trim() && !aiImage)}
            >
              {isGeneratingWithAI ? (
                <>
                  <Clock className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create Post
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}