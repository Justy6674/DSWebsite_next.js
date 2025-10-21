'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Edit3, Save, X } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import TurndownService from 'turndown';

interface EditablePreviewProps {
  content: string;
  onContentChange: (content: string) => void;
}

export function EditablePreview({ content, onContentChange }: EditablePreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableHtml, setEditableHtml] = useState('');
  const editableRef = useRef<HTMLDivElement>(null);
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
  });

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus();
    }
  }, [isEditing]);

  const handleStartEditing = () => {
    if (editableRef.current) {
      // Safely get content using textContent for security
      setEditableHtml(editableRef.current.innerHTML || '');
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editableRef.current) {
      // Get content safely and sanitize before processing
      const html = editableRef.current.innerHTML || '';
      
      // Basic XSS protection - remove script tags and on* attributes
      const sanitizedHtml = html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/\son\w+="[^"]*"/gi, '')
        .replace(/\son\w+='[^']*'/gi, '')
        .replace(/javascript:/gi, '');
      
      const markdown = turndownService.turndown(sanitizedHtml);
      onContentChange(markdown);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (editableRef.current) {
      // Safely restore previous content
      editableRef.current.innerHTML = editableHtml || '';
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        handleCancel();
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-cream">Live Preview</h3>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button
              onClick={handleStartEditing}
              size="sm"
              variant="outline"
              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit in Preview
            </Button>
          ) : (
            <>
              <Button
                onClick={handleSave}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save (Ctrl+S)
              </Button>
              <Button
                onClick={handleCancel}
                size="sm"
                variant="outline"
                className="bg-slate-600 hover:bg-slate-700 text-white border-slate-500"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel (Esc)
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div 
        ref={editableRef}
        contentEditable={isEditing}
        onKeyDown={handleKeyDown}
        className={`
          min-h-[400px] p-4 bg-background rounded-lg border text-foreground
          ${isEditing 
            ? 'border-primary outline-none focus:ring-2 focus:ring-primary/20' 
            : 'border-border'
          }
        `}
        style={{ 
          cursor: isEditing ? 'text' : 'default'
        }}
        suppressContentEditableWarning={true}
      >
        {!isEditing && (
          <MarkdownRenderer 
            content={content} 
            isPreview={true}
            onContentChange={onContentChange}
          />
        )}
      </div>
      
      {isEditing && (
        <div className="mt-2 text-sm text-slate-400">
          <p>• Links will open in new tabs when clicked</p>
          <p>• Use Ctrl+S to save or Ctrl+Esc to cancel</p>
          <p>• Content will be converted back to Markdown</p>
        </div>
      )}
    </div>
  );
}