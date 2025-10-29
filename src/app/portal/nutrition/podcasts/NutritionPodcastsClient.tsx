'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { Podcast } from 'lucide-react';

export default function NutritionPodcastsClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon={Podcast}
          title="Podcast Links"
          description="Expert interviews and educational podcasts on nutrition and dietary management"
        />
        <ContentList pillar="nutrition" subsection="Podcast Links" />
      </div>
    </PortalLayout>
  );
}

