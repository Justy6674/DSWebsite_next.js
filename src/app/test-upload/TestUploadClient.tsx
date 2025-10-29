'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the existing PDFThumbnailClient component
const PDFThumbnailClient = dynamic(() => import('@/components/admin/PDFThumbnailClient'), {
  ssr: false,
  loading: () => <div className="text-white">Loading PDF component...</div>
});

export default function TestUploadClient() {
  const [mounted, setMounted] = useState(false);
  const [testFiles] = useState([
    {
      id: '1',
      name: 'high-protein-breakfast-2.pdf',
      url: 'https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/portal-files/other/1761634856507_high_protein_breakfast_2.pdf',
      type: 'document' as const
    },
    {
      id: '2',
      name: 'Protein-Downscale.pdf',
      url: 'https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/portal-files/other/1761634856507_Protein_Downscale.pdf',
      type: 'document' as const
    },
    {
      id: '3',
      name: 'Side Effect Management.pdf',
      url: 'https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/portal-files/other/1761634856506_Side_Effect_Management.pdf',
      type: 'document' as const
    }
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-4 bg-slate-900 min-h-screen">
        <h1 className="text-white text-xl mb-4">Loading PDF Test Environment...</h1>
        <div className="bg-slate-800 p-4 rounded">
          <div className="text-white">Initializing...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-900 min-h-screen">
      <h1 className="text-white text-xl mb-4">PDF Thumbnail Test - Using Existing Component</h1>

      <div className="bg-slate-800 p-4 rounded mb-4">
        <h2 className="text-white mb-2">Test Status</h2>
        <div className="text-green-400">✅ Component mounted successfully</div>
        <div className="text-green-400">✅ Using existing PDFThumbnailClient</div>
        <div className="text-green-400">✅ Testing with correct Supabase URLs</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testFiles.map((file) => (
          <div key={file.id} className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-white text-sm font-medium mb-2">{file.name}</h3>
            <PDFThumbnailClient
              fileUrl={file.url}
              fileName={file.name}
              width={200}
              onRefresh={() => console.log('Refresh clicked for:', file.name)}
            />
            <div className="mt-2 text-xs text-slate-400">
              URL: {file.url}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}