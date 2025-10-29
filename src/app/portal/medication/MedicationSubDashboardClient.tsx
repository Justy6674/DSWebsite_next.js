'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import SubDashboard from '@/components/portal/SubDashboard';
import { Pill } from 'lucide-react';

export default function MedicationSubDashboardClient() {
  return (
    <PortalLayout>
      <SubDashboard
        pillar="medication"
        title="Medication Hub"
        description="Evidence-based resources for GLP-1 medication management, including clinical guides, research articles, product information, and educational content."
        icon={Pill}
      />
    </PortalLayout>
  );
}

