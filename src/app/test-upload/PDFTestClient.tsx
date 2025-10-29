'use client';

import React, { useState } from 'react';
import PDFThumbnail from '@/components/admin/PDFThumbnail';

export default function PDFTestClient() {
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

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-white mb-4">PDF Thumbnail Test</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testFiles.map((file) => (
            <div key={file.id} className="bg-slate-800 p-4 rounded-lg">
              <h3 className="text-white text-sm font-medium mb-2">{file.name}</h3>
              <PDFThumbnail
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
    </div>
  );
}