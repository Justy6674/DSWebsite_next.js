'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import ContentItem from './ContentItem';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ContentListProps {
  pillar: 'medication' | 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water';
  subsection: string;
}

export default function ContentList({ pillar, subsection }: ContentListProps) {
  const { user } = useAuth();
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContent();
  }, [pillar, subsection]);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portal_content')
        .select('*')
        .eq('pillar', pillar)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filter by subsection - handle multiple variations
      const filtered = (data || []).filter((item) => {
        const itemSubsection = item.content_data?.subsection || '';
        if (!itemSubsection) return false;
        return (
          itemSubsection === subsection ||
          itemSubsection === subsection.replace(' and ', ' & ') ||
          itemSubsection.toLowerCase().includes(subsection.toLowerCase()) ||
          subsection.toLowerCase().includes(itemSubsection.toLowerCase())
        );
      });

      setContent(filtered);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = content.filter((item) =>
    searchQuery === '' ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-4 pb-20 md:pb-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search in this section..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-900 border-slate-700 text-[#f8fafc] placeholder:text-slate-500"
        />
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-800 rounded-lg animate-pulse border border-slate-700" />
          ))}
        </div>
      ) : filteredContent.length === 0 ? (
        <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-[#fef5e7] mb-2">
            {searchQuery ? 'No results found for your search.' : 'No content available in this section yet.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#b68a71] hover:text-[#8B6F47] text-sm transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredContent.map((item) => (
            <ContentItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

