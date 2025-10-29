'use client';

import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configure PDF.js worker only on client side
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export default function MinimalPDFTest() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-slate-900 min-h-screen">
      <h1 className="text-white text-xl mb-4">Minimal PDF Test</h1>

      <div className="bg-slate-800 p-4 rounded">
        <h2 className="text-white mb-2">Direct URL Test</h2>

        <Document
          file="https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/portal-files/other/1761634856507_high_protein_breakfast_2.pdf"
          onLoadSuccess={(pdf) => console.log('✅ PDF loaded:', pdf.numPages, 'pages')}
          onLoadError={(error) => console.error('❌ PDF error:', error)}
          loading={<div className="text-white">Loading PDF...</div>}
          error={<div className="text-red-400">Error loading PDF</div>}
        >
          <Page
            pageNumber={1}
            width={200}
            onLoadSuccess={() => console.log('✅ Page loaded')}
            onLoadError={(error) => console.error('❌ Page error:', error)}
            loading={<div className="text-white">Loading page...</div>}
            error={<div className="text-red-400">Error loading page</div>}
          />
        </Document>
      </div>
    </div>
  );
}