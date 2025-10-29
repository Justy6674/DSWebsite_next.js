'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the iframe-based PDF test component
const IframePDFTest = dynamic(() => import('./IframePDFTest'), {
  ssr: false,
  loading: () => <div className="text-white">Loading PDF test component...</div>
});

export default function TestUploadClient() {
  const [mounted, setMounted] = useState(false);

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

  return <IframePDFTest />;
}