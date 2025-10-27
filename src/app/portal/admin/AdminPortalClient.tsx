'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const UnifiedAdminDashboard = dynamic(() => import('@/components/admin/UnifiedAdminDashboard'), {
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <span className="ml-3 text-lg">Loading Admin Dashboard...</span>
    </div>
  ),
  ssr: false
});

export default function AdminPortalClient() {
  return <UnifiedAdminDashboard />;
}