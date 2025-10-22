'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import WaterReminderDashboard from '@/components/portal/WaterReminderDashboard';

export default function WaterReminderPage() {
  return (
    <PortalLayout>
      <WaterReminderDashboard />
    </PortalLayout>
  );
}