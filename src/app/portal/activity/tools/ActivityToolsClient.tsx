'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { Settings } from 'lucide-react';

export default function ActivityToolsClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon=Settings
          title="Tools"
          description="Interactive calculators and assessments"
        />
        <ContentList pillar="activity" subsection="Tools" />
      </div>
    </PortalLayout>
  );
}
