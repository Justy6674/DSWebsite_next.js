'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Link, Type } from 'lucide-react';

interface MarkdownToolbarProps {
  onInsert: (text: string) => void;
  onLinkInsert: () => void;
}

export function MarkdownToolbar({ onInsert, onLinkInsert }: MarkdownToolbarProps) {
  const tools = [
    { icon: Bold, text: '**bold text**', label: 'Bold' },
    { icon: Italic, text: '_italic text_', label: 'Italic' },
    { icon: Heading1, text: '# Heading 1\n', label: 'H1' },
    { icon: Heading2, text: '## Heading 2\n', label: 'H2' },
    { icon: Heading3, text: '### Heading 3\n', label: 'H3' },
    { icon: List, text: '- List item\n', label: 'Bullet List' },
    { icon: ListOrdered, text: '1. List item\n', label: 'Numbered List' },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 bg-slate-700 rounded-t-md border-b border-slate-600">
      {tools.map(({ icon: Icon, text, label }) => (
        <Button
          key={label}
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => onInsert(text)}
          className="h-8 w-8 p-0 text-cream hover:bg-slate-600"
          title={label}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onLinkInsert}
        className="h-8 w-8 p-0 text-cream hover:bg-slate-600"
        title="Insert Link"
      >
        <Link className="h-4 w-4" />
      </Button>
    </div>
  );
}