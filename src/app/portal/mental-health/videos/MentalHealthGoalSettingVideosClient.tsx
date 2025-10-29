'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { Video } from 'lucide-react';

export default function MentalHealthGoalSettingVideosClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon={Video}
          title="Videos and Video Links"
          description="Educational videos and tutorials"
        />
        <ContentList pillar="mental-health" subsection="Videos and Video Links" />
      </div>
    </PortalLayout>
  );
}
