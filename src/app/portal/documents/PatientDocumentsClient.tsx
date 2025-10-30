'use client';

import React, { useEffect, useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface StoredFile {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: Record<string, any>;
}

export default function PatientDocumentsClient() {
  const { user } = useAuth();
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [loading, setLoading] = useState(true);
  // Read-only for patients: no upload or delete

  const basePrefix = user?.id ? `users/${user.id}` : '';

  const listFiles = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('patient-documents')
        .list(basePrefix, { limit: 100, offset: 0, sortBy: { column: 'created_at', order: 'desc' } });
      if (error) throw error;
      setFiles(data || []);
    } catch (e) {
      console.error('List error', e);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const openFile = async (name: string) => {
    if (!user?.id) return;
    const path = `${basePrefix}/${name}`;
    const { data, error } = await supabase.storage
      .from('patient-documents')
      .createSignedUrl(path, 60 * 60); // 60 min
    if (error || !data?.signedUrl) return;
    window.open(data.signedUrl, '_blank');
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f8fafc]">Patient Documents</h1>
          <p className="text-[#fef5e7] mt-2">Documents shared by your clinical team. Only you and your clinicians can access these files.</p>
        </div>


        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-20 bg-slate-800 rounded-lg animate-pulse border border-slate-700" />
            ))}
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
            <p className="text-[#fef5e7]">No documents yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((f) => (
              <div key={f.name} className="flex items-center justify-between bg-slate-800 rounded-lg border border-slate-700 p-3">
                <div className="truncate text-[#f8fafc]">{f.name}</div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-slate-600 text-[#fef5e7] hover:bg-slate-700" onClick={() => openFile(f.name)}>Open</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}


