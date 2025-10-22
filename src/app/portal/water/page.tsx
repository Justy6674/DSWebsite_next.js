'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import SimpleWaterReminders from '@/components/portal/SimpleWaterReminders';

export default function WaterReminderPage() {
  return (
    <PortalLayout>
      <SimpleWaterReminders />
    </PortalLayout>
  );
}