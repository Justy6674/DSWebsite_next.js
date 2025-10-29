'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { File } from 'lucide-react';

export default function ActivityOtherClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon={File}
          title="Other"
          description="Additional resources"
        />
        <ContentList pillar="activity" subsection="Other" />
      </div>
    </PortalLayout>
  );
}
