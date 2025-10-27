'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import DynamicPortalSection from '@/components/portal/DynamicPortalSection';
import { Moon } from 'lucide-react';

export default function SleepRecoveryClient() {
  return (
    <PortalLayout>
      <div className="container mx-auto px-4 py-8">
        <DynamicPortalSection
          pillar="sleep-recovery"
          title="😴 Sleep & Recovery Hub"
          description="Evidence-based sleep optimisation strategies and recovery tools to support your weight management journey"
          colour="text-indigo-800"
          icon={Moon}
        />
      </div>
    </PortalLayout>
  );
}