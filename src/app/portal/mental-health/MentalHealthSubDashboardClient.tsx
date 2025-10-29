'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import SubDashboard from '@/components/portal/SubDashboard';
import { Brain } from 'lucide-react';

export default function MentalHealthSubDashboardClient() {
  return (
    <PortalLayout>
      <SubDashboard
        pillar="mental-health"
        title="Mental Health / Goal Setting"
        description="Psychology, mindset tools, and goal achievement resources to support holistic weight management"
        icon={Brain}
      />
    </PortalLayout>
  );
}

