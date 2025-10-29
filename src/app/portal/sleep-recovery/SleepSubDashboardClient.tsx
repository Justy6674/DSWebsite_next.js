'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import SubDashboard from '@/components/portal/SubDashboard';
import { Moon } from 'lucide-react';

export default function SleepSubDashboardClient() {
  return (
    <PortalLayout>
      <SubDashboard
        pillar="sleep-recovery"
        title="Sleep Hub"
        description="Sleep optimization protocols and recovery strategies to support your weight management journey"
        icon={Moon}
      />
    </PortalLayout>
  );
}

