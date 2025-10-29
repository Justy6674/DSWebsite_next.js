'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { FileText } from 'lucide-react';

export default function MentalHealthGoalSettingResearchClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon=FileText
          title="Research & Journal Articles"
          description="Evidence-based research papers and peer-reviewed studies"
        />
        <ContentList pillar="mental-health" subsection="Research & Journal Articles" />
      </div>
    </PortalLayout>
  );
}
