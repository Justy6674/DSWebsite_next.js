'use client';

import React, { useEffect, useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ContentItem from '@/components/portal/ContentItem';

interface PortalContentItem {
  id: string;
  title: string;
  description: string | null;
  content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide';
  content_data: any;
  tags: string[];
  is_published: boolean;
  created_at: string;
}

export default function NewClientResourcesClient() {
  const [items, setItems] = useState<PortalContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('portal_content')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false });
        if (error) throw error;

        const tagMatches = ['onboarding', 'new-client', 'new patient', 'welcome'];
        const filtered = (data || []).filter((r: any) => {
          const tags: string[] = Array.isArray(r.tags) ? r.tags : [];
          return tags.some(t => tagMatches.includes((t || '').toLowerCase()));
        });
        setItems(filtered as any);
      } catch (e) {
        console.error('Failed to load new client resources', e);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const visible = items.filter(i => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      i.title.toLowerCase().includes(q) ||
      (i.description || '').toLowerCase().includes(q) ||
      (Array.isArray(i.tags) ? i.tags.join(' ').toLowerCase().includes(q) : false)
    );
  });

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f8fafc]">New Client Resources</h1>
          <p className="text-[#fef5e7] mt-2">Welcome materials for first-time patients. Videos and documents here are clinic-wide and privacy-safe with signed playback.</p>
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search in New Client Resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-900 border-slate-700 text-[#f8fafc] placeholder:text-slate-500 w-full"
          />
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="h-24 bg-slate-800 rounded-lg animate-pulse border border-slate-700" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
            <p className="text-[#fef5e7] mb-2">No resources yet. Add items in Admin → Add to Portal and tag with <span className=\"text-[#b68a71]\">onboarding</span>.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map(item => (
              <ContentItem key={item.id} item={item as any} />
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}


