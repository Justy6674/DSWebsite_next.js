'use client';

import React, { useState, useEffect } from 'react';

export default function SimplePDFTest() {
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfLibrary, setPdfLibrary] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Add a delay to ensure the client environment is fully ready
    const timer = setTimeout(async () => {
      try {
        console.log('🔍 Starting PDF library load...');

        // First, clear any existing global state
        if (typeof window !== 'undefined') {
          (window as any).pdfjsWorker = undefined;
        }

        // Import CSS files first (these should be safe)
        await import('react-pdf/dist/Page/AnnotationLayer.css');
        await import('react-pdf/dist/Page/TextLayer.css');
        console.log('✅ CSS imports loaded');

        // Then import the main library
        const reactPdfModule = await import('react-pdf');
        const { Document, Page, pdfjs } = reactPdfModule;

        console.log('✅ React-pdf imported successfully');
        console.log('📦 PDF.js version:', pdfjs.version);

        // Configure worker with version check
        if (typeof window !== 'undefined' && pdfjs?.version) {
          // Use a specific worker version that's known to work
          const workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
          pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
          console.log('🔧 PDF.js worker configured:', workerSrc);
        }

        setPdfLibrary({ Document, Page, pdfjs });
        console.log('🎉 PDF library ready');

      } catch (err) {
        console.error('❌ PDF library load error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isClient]);

  if (!mounted || !isClient) {
    return (
      <div className="p-4 bg-slate-900 min-h-screen">
        <h1 className="text-white text-xl mb-4">Initializing Client...</h1>
        <div className="bg-slate-800 p-4 rounded text-slate-300">
          Setting up browser environment...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-slate-900 min-h-screen">
        <h1 className="text-white text-xl mb-4">PDF Library Error</h1>
        <div className="bg-red-800 p-4 rounded text-red-100">
          <strong>Error:</strong> {error}
        </div>
        <div className="mt-4 bg-slate-800 p-4 rounded text-slate-300">
          <strong>Troubleshooting:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Client environment: {isClient ? 'Ready' : 'Not ready'}</li>
            <li>Window object: {typeof window !== 'undefined' ? 'Available' : 'Not available'}</li>
            <li>PDF.js available: {typeof (window as any).pdfjsLib !== 'undefined' ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!pdfLibrary) {
    return (
      <div className="p-4 bg-slate-900 min-h-screen">
        <h1 className="text-white text-xl mb-4">Loading PDF Library...</h1>
        <div className="bg-slate-800 p-4 rounded text-slate-300">
          <div className="animate-pulse">Initializing react-pdf...</div>
          <div className="text-sm mt-2">
            Client ready: {isClient ? '✅' : '❌'}
          </div>
        </div>
      </div>
    );
  }

  const { Document, Page } = pdfLibrary;
  const testPdfUrl = "https://pooebqhsshfafkhvccrl.supabase.co/storage/v1/object/public/portal-files/other/1761634856507_high_protein_breakfast_2.pdf";

  return (
    <div className="p-4 bg-slate-900 min-h-screen">
      <h1 className="text-white text-xl mb-4">Simple PDF Test</h1>

      <div className="bg-slate-800 p-4 rounded mb-4">
        <h2 className="text-white mb-2">Library Status</h2>
        <div className="text-green-400">✅ react-pdf loaded successfully</div>
        <div className="text-green-400">✅ Worker configured</div>
        <div className="text-green-400">✅ Client environment ready</div>
        <div className="text-slate-300 text-sm mt-2">
          PDF.js version: {pdfLibrary.pdfjs.version}
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded">
        <h2 className="text-white mb-2">PDF Render Test</h2>
        <div className="border border-slate-600 p-2">
          <Document
            file={testPdfUrl}
            onLoadSuccess={(pdf) => {
              console.log('✅ PDF loaded:', pdf.numPages, 'pages');
            }}
            onLoadError={(error) => {
              console.error('❌ PDF load error:', error);
              setError(`PDF load failed: ${error.message}`);
            }}
            loading={<div className="text-white p-4">Loading PDF document...</div>}
            error={<div className="text-red-400 p-4">Error loading PDF document</div>}
          >
            <Page
              pageNumber={1}
              width={300}
              onLoadSuccess={() => {
                console.log('✅ Page 1 rendered successfully');
              }}
              onLoadError={(error) => {
                console.error('❌ Page render error:', error);
              }}
              loading={<div className="text-white p-4">Loading page...</div>}
              error={<div className="text-red-400 p-4">Error loading page</div>}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}