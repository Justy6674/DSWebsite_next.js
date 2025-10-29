'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import SubDashboard from '@/components/portal/SubDashboard';
import { UtensilsCrossed } from 'lucide-react';

export default function NutritionSubDashboardClient() {
  return (
    <PortalLayout>
      <SubDashboard
        pillar="nutrition"
        title="Nutrition Hub"
        description="Evidence-based nutrition resources, meal plans, and tools to support your weight management journey"
        icon={UtensilsCrossed}
      />
    </PortalLayout>
  );
}

