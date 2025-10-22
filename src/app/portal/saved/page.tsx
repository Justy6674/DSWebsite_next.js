'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import SavedResourcesLibrary from '@/components/portal/SavedResourcesLibrary';

export default function SavedResourcesPage() {
  return (
    <PortalLayout>
      <SavedResourcesLibrary />
    </PortalLayout>
  );
}