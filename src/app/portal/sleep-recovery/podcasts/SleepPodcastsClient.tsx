'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { Podcast } from 'lucide-react';

export default function SleepPodcastsClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon=Podcast
          title="Podcast Links"
          description="Expert interviews and educational podcasts"
        />
        <ContentList pillar="sleep-recovery" subsection="Podcast Links" />
      </div>
    </PortalLayout>
  );
}
