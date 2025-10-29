'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PortalLayout from '@/components/portal/PortalLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Item {
  id: string;
  pillar: string;
  title: string;
  content_type: string;
  content_data: any;
  created_at: string;
}

export default function PortalContentAdminPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('portal_content')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const del = async (id: string) => {
    if (!confirm('Delete this portal content item?')) return;
    await supabase.from('portal_content').delete().eq('id', id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const filtered = items.filter(i =>
    !q || i.title.toLowerCase().includes(q.toLowerCase()) ||
    (i.content_data?.subsection || '').toLowerCase().includes(q.toLowerCase()) ||
    i.pillar.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#f8fafc]">Portal Content (Admin)</h1>
          <Button onClick={load} disabled={loading}>{loading ? 'Refreshing…' : 'Refresh'}</Button>
        </div>
        <div className="max-w-md">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title, subsection, pillar" className="bg-slate-900 border-slate-700 text-[#f8fafc]" />
        </div>
        <div className="space-y-3">
          {filtered.map(item => (
            <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-sm text-slate-400">{item.pillar} → {item.content_data?.subsection || '—'}</div>
                <div className="text-[#f8fafc] font-semibold truncate">{item.title}</div>
                <div className="text-xs text-slate-500">{new Date(item.created_at).toLocaleString('en-AU')}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => window.open(item.content_data?.file_url || item.content_data?.url, '_blank')}>Open</Button>
                <Button variant="destructive" onClick={() => del(item.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-slate-400">No items.</div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}


