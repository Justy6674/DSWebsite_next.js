'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import SubDashboard from '@/components/portal/SubDashboard';
import { Dumbbell } from 'lucide-react';

export default function ActivitySubDashboardClient() {
  return (
    <PortalLayout>
      <SubDashboard
        pillar="activity"
        title="Activity Hub"
        description="Evidence-based exercise programs, movement tracking, and fitness tools designed for sustainable weight management"
        icon={Dumbbell}
      />
    </PortalLayout>
  );
}
