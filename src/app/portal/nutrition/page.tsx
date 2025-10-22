'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import DynamicPortalSection from '@/components/portal/DynamicPortalSection';
import { Apple } from 'lucide-react';

export default function NutritionPortal() {
  return (
    <PortalLayout>
      <div className="container mx-auto px-4 py-8">
        <DynamicPortalSection
          pillar="nutrition"
          title="🥗 Nutrition Hub"
          description="Evidence-based nutrition resources, meal plans, and tools to support your weight management journey"
          colour="text-green-800"
          icon={Apple}
        />
      </div>
    </PortalLayout>
  );
}