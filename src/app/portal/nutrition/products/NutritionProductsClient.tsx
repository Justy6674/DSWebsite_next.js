'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { Package } from 'lucide-react';

export default function NutritionProductsClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon={Package}
          title="Product Information"
          description="Product details and recommendations for nutritional supplements"
        />
        <ContentList pillar="nutrition" subsection="Product Information" />
      </div>
    </PortalLayout>
  );
}

