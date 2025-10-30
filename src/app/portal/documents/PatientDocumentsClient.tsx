'use client';

import React, { useEffect, useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<File | null>(null);

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

  const sanitize = (name: string) => name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_');

  const handleUpload = async () => {
    if (!user?.id || !selected) return;
    setUploading(true);
    try {
      const ext = selected.name.split('.').pop()?.toLowerCase() || 'dat';
      const objectName = `${basePrefix}/${Date.now()}_${sanitize(selected.name)}.${ext}`;
      const { error } = await supabase.storage
        .from('patient-documents')
        .upload(objectName, selected, { cacheControl: '3600', upsert: false, contentType: selected.type || 'application/octet-stream' });
      if (error) throw error;
      setSelected(null);
      await listFiles();
    } catch (e: any) {
      console.error('Upload error', e);
    } finally {
      setUploading(false);
    }
  };

  const openFile = async (name: string) => {
    if (!user?.id) return;
    const path = `${basePrefix}/${name}`;
    const { data, error } = await supabase.storage
      .from('patient-documents')
      .createSignedUrl(path, 60 * 60); // 60 min
    if (error || !data?.signedUrl) return;
    window.open(data.signedUrl, '_blank');
  };

  const deleteFile = async (name: string) => {
    if (!user?.id) return;
    const path = `${basePrefix}/${name}`;
    const { error } = await supabase.storage
      .from('patient-documents')
      .remove([path]);
    if (!error) listFiles();
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f8fafc]">Patient Documents</h1>
          <p className="text-[#fef5e7] mt-2">Upload and manage your files securely. Only you and your clinical team can access these documents.</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            <Input type="file" onChange={(e) => setSelected(e.target.files?.[0] || null)} className="bg-slate-900 border-slate-700 text-[#f8fafc]" />
            <Button disabled={!selected || uploading} onClick={handleUpload} className="bg-[#b68a71] hover:bg-[#8B6F47] text-white">
              {uploading ? 'Uploading…' : 'Upload'}
            </Button>
            <div className="text-xs text-slate-400">Accepted: PDFs, images, documents. Max 50MB per file.</div>
          </div>
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
                  <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20" onClick={() => deleteFile(f.name)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PortalLayout>
  );
}


