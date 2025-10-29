'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { BookOpen } from 'lucide-react';

export default function NutritionGuidesClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon={BookOpen}
          title="Nutrition Guides"
          description="Step-by-step educational guides and instructions for nutrition and meal planning"
        />
        <ContentList pillar="nutrition" subsection="Guides" />
      </div>
    </PortalLayout>
  );
}

