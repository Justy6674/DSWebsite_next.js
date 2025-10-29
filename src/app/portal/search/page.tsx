'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PortalLayout from '@/components/portal/PortalLayout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Search, ExternalLink, FileText, Video, Link as LinkIcon, Settings, BookOpen } from 'lucide-react';

type PortalType = 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide';

interface PortalRow {
  id: string;
  pillar: string;
  title: string;
  description: string | null;
  content_type: PortalType;
  content_data: any;
  tags: string[];
  created_at: string;
  view_count: number;
}

const TYPE_ICON: Record<string, any> = {
  video: Video,
  external_doc: ExternalLink,
  downscale_doc: FileText,
  link: LinkIcon,
  tool: Settings,
  program_guide: BookOpen
};

export default function GlobalSearchPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState<string>(params.get('q') || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PortalRow[]>([]);

  useEffect(() => {
    const q = params.get('q') || '';
    setQuery(q);
    if (q.trim()) {
      runSearch(q);
    } else {
      setResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const runSearch = async (q: string) => {
    setLoading(true);
    try {
      // Use PostgreSQL full‑text search on search_vector (already indexed)
      const { data, error } = await supabase
        .from('portal_content')
        .select('*')
        .eq('is_published', true)
        .textSearch('search_vector', q, { type: 'websearch', config: 'english' })
        .limit(50);

      if (error) throw error;
      setResults(data || []);
    } catch (e) {
      console.error('Global search error', e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const grouped = useMemo(() => {
    const map: Record<string, PortalRow[]> = {};
    for (const r of results) {
      const key = `${r.pillar} > ${(r.content_data?.subsection || 'Other')}`;
      map[key] = map[key] || [];
      map[key].push(r);
    }
    return map;
  }, [results]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`/portal/search?q=${encodeURIComponent(query)}`);
  };

  const open = (row: PortalRow) => {
    const url = row.content_data?.file_url || row.content_data?.url;
    if (url) window.open(url, '_blank');
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        <form onSubmit={onSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all portal content…"
            className="pl-10 bg-slate-900 border-slate-700 text-[#f8fafc]"
          />
        </form>

        {loading ? (
          <div className="text-slate-400">Searching…</div>
        ) : query.trim() && results.length === 0 ? (
          <div className="text-slate-400">No results.</div>
        ) : (
          <div className="space-y-6">
            {Object.entries(grouped).map(([group, rows]) => (
              <div key={group} className="space-y-3">
                <h3 className="text-lg font-semibold text-[#f8fafc]">{group}</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {rows.map((row) => {
                    const Icon = TYPE_ICON[row.content_type] || FileText;
                    return (
                      <div key={row.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-[#b68a71] transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="bg-slate-900 border border-slate-700 rounded-md p-2 flex-shrink-0"><Icon className="h-4 w-4 text-[#b68a71]" /></div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <div className="font-semibold text-[#f8fafc] truncate">{row.title}</div>
                              <Badge variant="outline" className="text-xs">{row.content_type.replace('_',' ')}</Badge>
                            </div>
                            {row.description && (
                              <div className="mt-2 bg-slate-900 border border-slate-700 rounded-md p-2 h-20 md:h-24 overflow-y-auto">
                                <p className="text-xs text-[#fef5e7] whitespace-pre-wrap">{row.description}</p>
                              </div>
                            )}
                            {row.tags?.length > 0 && (
                              <div className="flex gap-1 mt-2 flex-wrap">
                                {row.tags.slice(0,4).map((t, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{t}</Badge>
                                ))}
                              </div>
                            )}
                            <div className="mt-3">
                              <Button size="sm" className="bg-[#b68a71] hover:bg-[#8B6F47] text-white" onClick={() => open(row)}>
                                Open Resource
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}


