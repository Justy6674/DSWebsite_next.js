'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4 mb-2"></div>,
  ssr: false
});
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { normalizeBlogContent } from '@/utils/markdown';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface MarkdownRendererProps {
  content: string;
  isPreview?: boolean;
  onContentChange?: (content: string) => void;
}

export function MarkdownRenderer({ content, isPreview = false, onContentChange }: MarkdownRendererProps) {
  // Automatically normalize content for consistent formatting
  const normalizedContent = normalizeBlogContent(content);
  
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-blockquote:text-foreground prose-code:text-foreground dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 text-foreground">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-8 text-foreground">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-6 text-foreground">{children}</h3>,
          p: ({ children }) => <p className="mb-4 text-foreground leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-outside ml-6 mb-4 space-y-1 text-foreground">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-1 text-foreground">{children}</ol>,
          li: ({ children }) => <li className="text-foreground mb-1">{children}</li>,
          strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic text-foreground">{children}</em>,
          img: ({ src, alt, width, height, ...props }) => (
            <OptimizedImage
              src={src || ''}
              alt={alt || ''}
              className="rounded-lg my-4 w-full max-w-full h-auto"
              quality={85}
              format="webp"
              lazy={true}
              width={typeof width === 'string' ? parseInt(width) || 800 : width || 800}
              height={typeof height === 'string' ? parseInt(height) || 600 : height || 600}
            />
          ),
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-primary hover:text-primary/80 underline" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => {
                if (isPreview) {
                  e.preventDefault();
                  window.open(href, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              {children}
            </a>
          ),
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}