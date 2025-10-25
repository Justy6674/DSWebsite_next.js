'use client';

import React from 'react';
import FileManagement from '@/components/admin/FileManagement';

// Note: This is a test page and should not be indexed by search engines
// It's blocked via robots.ts

export default function TestUploadPage() {
  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-white mb-4">Test File Upload (Auth Bypass)</h1>
        <FileManagement />
      </div>
    </div>
  );
}