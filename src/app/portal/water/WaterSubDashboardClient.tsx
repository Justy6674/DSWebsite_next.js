'use client';

import React from 'react';
import { Droplets } from 'lucide-react';
import PortalLayout from '@/components/portal/PortalLayout';
import SubDashboard from '@/components/portal/SubDashboard';
import SimpleWaterReminders from '@/components/portal/SimpleWaterReminders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function WaterSubDashboardClient() {
  return (
    <PortalLayout>
      <div className="space-y-8">
        {/* Featured Water Gamification System */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-3">
              <Droplets className="w-6 h-6 text-cyan-400" />
              Interactive Hydration System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleWaterReminders />
          </CardContent>
        </Card>

        {/* Sub-Dashboard for Water Content */}
        <SubDashboard
          pillar="water"
          title="Water Hub"
          description="Comprehensive hydration resources to support your weight loss journey through optimal water intake and fat burning optimization"
          icon={Droplets}
        />
      </div>
    </PortalLayout>
  );
}

