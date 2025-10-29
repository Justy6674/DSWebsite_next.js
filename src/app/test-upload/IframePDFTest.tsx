'use client';

import React, { useState, useEffect } from 'react';

export default function IframePDFTest() {
  const [mounted, setMounted] = useState(false);
  const [testFiles] = useState([
    {
      id: '1',
      name: 'high-protein-breakfast-2.pdf',
      url: 'https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/portal-files/other/1761634856507_high_protein_breakfast_2.pdf'
    },
    {
      id: '2',
      name: 'Protein-Downscale.pdf',
      url: 'https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/portal-files/other/1761634856507_Protein_Downscale.pdf'
    },
    {
      id: '3',
      name: 'Side Effect Management.pdf',
      url: 'https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/portal-files/other/1761634856506_Side_Effect_Management.pdf'
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
      <h1 className="text-white text-xl mb-4">PDF Iframe Test - Direct Browser Rendering</h1>

      <div className="bg-slate-800 p-4 rounded mb-4">
        <h2 className="text-white mb-2">Test Status</h2>
        <div className="text-green-400">✅ No JavaScript libraries needed</div>
        <div className="text-green-400">✅ Browser native PDF rendering</div>
        <div className="text-green-400">✅ Direct Supabase URLs</div>
        <div className="text-green-400">✅ No SSR issues</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testFiles.map((file) => (
          <div key={file.id} className="bg-slate-800 p-4 rounded-lg">
            <h3 className="text-white text-sm font-medium mb-2">{file.name}</h3>

            {/* PDF Thumbnail using iframe */}
            <div className="bg-slate-700 rounded border border-slate-600 overflow-hidden">
              <iframe
                src={`${file.url}#page=1&zoom=50&toolbar=0&navpanes=0&scrollbar=0`}
                width="200"
                height="280"
                className="w-full border-0"
                title={`PDF preview: ${file.name}`}
                style={{
                  transform: 'scale(1)',
                  transformOrigin: 'top left'
                }}
                onLoad={() => console.log('✅ PDF iframe loaded:', file.name)}
                onError={() => console.error('❌ PDF iframe error:', file.name)}
              />
            </div>

            {/* PDF Controls */}
            <div className="mt-2 flex gap-2">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 underline"
              >
                View Full PDF
              </a>
              <a
                href={file.url}
                download={file.name}
                className="text-xs text-green-400 hover:text-green-300 underline"
              >
                Download
              </a>
            </div>

            <div className="mt-2 text-xs text-slate-400">
              URL: {file.url.substring(0, 50)}...
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-slate-800 p-4 rounded">
        <h2 className="text-white mb-2">Iframe PDF Rendering</h2>
        <div className="text-slate-300 text-sm space-y-1">
          <div>✅ Uses browser's native PDF viewer</div>
          <div>✅ No external JavaScript dependencies</div>
          <div>✅ Works in all modern browsers</div>
          <div>✅ No SSR/hydration issues</div>
          <div>✅ Thumbnail-style preview with controls</div>
        </div>
      </div>
    </div>
  );
}