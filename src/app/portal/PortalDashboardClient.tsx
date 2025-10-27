'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import PortalLayout from '@/components/portal/PortalLayout';
import HealthMetricsDashboard from '@/components/portal/HealthMetricsDashboard';
import GlobalSearch from '@/components/portal/GlobalSearch';

export default function PortalDashboardClient() {
  const { user } = useAuth();

  // Check for admin testing session
  const [portalUser, setPortalUser] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('portal_user');
      if (storedUser) {
        setPortalUser(JSON.parse(storedUser));
      }
    }
  }, []);

  if (!user && !portalUser) {
    return (
      <div className="min-h-screen bg-[#334155] flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full border border-slate-700">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-4">Portal Access Required</h2>
          <p className="text-[#fef5e7] mb-6">Please sign in to access your clinical portal dashboard.</p>
          <Link href="/portal/login">
            <Button className="w-full bg-[#b68a71] hover:bg-[#8B6F47] text-white">
              Sign In to Portal
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PortalLayout>
      <div className="space-y-8">
        {/* Central Search Engine */}
        <div className="max-w-md mx-auto">
          <GlobalSearch />
        </div>

        <HealthMetricsDashboard />
      </div>
    </PortalLayout>
  );
}