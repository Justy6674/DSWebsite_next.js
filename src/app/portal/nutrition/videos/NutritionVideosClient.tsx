'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { Video } from 'lucide-react';

export default function NutritionVideosClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon={Video}
          title="Videos and Video Links"
          description="Educational videos on nutrition, meal preparation, and dietary strategies"
        />
        <ContentList pillar="nutrition" subsection="Videos and Video Links" />
      </div>
    </PortalLayout>
  );
}

