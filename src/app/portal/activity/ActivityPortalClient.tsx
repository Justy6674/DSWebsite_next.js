'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import DynamicPortalSection from '@/components/portal/DynamicPortalSection';
import { Dumbbell } from 'lucide-react';

export default function ActivityPortalClient() {
  return (
    <PortalLayout>
      <div className="container mx-auto px-4 py-8">
        <DynamicPortalSection
          pillar="activity"
          title="💪 Activity Hub"
          description="Evidence-based exercise programs, movement tracking, and fitness tools designed for sustainable weight management"
          colour="text-blue-800"
          icon={Dumbbell}
        />
      </div>
    </PortalLayout>
  );
}