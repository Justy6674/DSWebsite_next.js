'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (linkText: string, url: string) => void;
  selectedText?: string;
}

export function LinkModal({ isOpen, onClose, onInsert, selectedText = '' }: LinkModalProps) {
  const [linkText, setLinkText] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      setLinkText(selectedText || '');
      setUrl('');
    }
  }, [isOpen, selectedText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkText.trim() && url.trim()) {
      onInsert(linkText.trim(), url.trim());
      onClose();
    }
  };

  const formatUrl = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return '';
    
    // If it doesn't start with http:// or https://, add https://
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleUrlBlur = () => {
    setUrl(formatUrl(url));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-cream">
        <DialogHeader>
          <DialogTitle className="text-cream">Insert Link</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="link-text" className="text-cream">
              Link Text
            </Label>
            <Input
              id="link-text"
              placeholder="Enter link text"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
              style={{ color: '#f7f2d3' }}
              autoFocus={!selectedText}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="link-url" className="text-cream">
              URL
            </Label>
            <Input
              id="link-url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={handleUrlChange}
              onBlur={handleUrlBlur}
              className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
              style={{ color: '#f7f2d3' }}
              autoFocus={!!selectedText}
              required
            />
          </div>
        </form>
        
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-slate-700 border-slate-600 text-cream hover:bg-slate-600"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!linkText.trim() || !url.trim()}
          >
            Insert Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}