'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import AdminResourceManager from '@/components/admin/AdminResourceManager';

export default function AdminPortalPage() {
  return (
    <PortalLayout>
      <AdminResourceManager />
    </PortalLayout>
  );
}