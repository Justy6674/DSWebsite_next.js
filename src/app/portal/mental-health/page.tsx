'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import DynamicPortalSection from '@/components/portal/DynamicPortalSection';
import { Brain } from 'lucide-react';

export default function MentalHealthPortal() {
  return (
    <PortalLayout>
      <div className="container mx-auto px-4 py-8">
        <DynamicPortalSection
          pillar="mental-health"
          title="🧠 Mental Health Hub"
          description="Evidence-based mental health resources, assessments, and support tools for holistic weight management"
          colour="text-purple-800"
          icon={Brain}
        />
      </div>
    </PortalLayout>
  );
}