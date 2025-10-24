'use client';

import React from 'react';

interface SimpleMarkdownRendererProps {
  content: string;
}

export function SimpleMarkdownRenderer({ content }: SimpleMarkdownRendererProps) {
  // For now, let's just render the content as plain text to verify the component loads
  // This eliminates any complex markdown processing that might be failing

  return (
    <div className="prose prose-lg max-w-none text-foreground">
      <div className="whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
}