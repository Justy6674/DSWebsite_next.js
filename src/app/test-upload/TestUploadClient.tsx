'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import with no SSR to prevent server-side rendering issues
const MinimalPDFTest = dynamic(() => import('./MinimalPDFTest'), {
  ssr: false,
  loading: () => (
    <div className="p-4 bg-slate-900 min-h-screen">
      <h1 className="text-white text-xl mb-4">Loading PDF Test...</h1>
    </div>
  )
});

export default function TestUploadClient() {
  return <MinimalPDFTest />;
}