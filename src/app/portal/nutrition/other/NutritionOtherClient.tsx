'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { File } from 'lucide-react';

export default function NutritionOtherClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon={File}
          title="Other Resources"
          description="Additional resources and tools for nutrition support and management"
        />
        <ContentList pillar="nutrition" subsection="Other" />
      </div>
    </PortalLayout>
  );
}

