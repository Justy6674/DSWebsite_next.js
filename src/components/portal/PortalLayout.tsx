'use client';

import React from 'react';
import { registerServiceWorker } from '@/lib/registerServiceWorker';
import { useAuth } from '@/contexts/AuthContext';
import PortalSidebar from './PortalSidebar';
import MobileBottomNav from './MobileBottomNav';
import { User, Settings, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Link from 'next/link';

interface PortalLayoutProps {
  children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const { user } = useAuth();

  // Check for admin testing session
  const [portalUser, setPortalUser] = React.useState<any>(null);
  const [userProfile, setUserProfile] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('portal_user');
      if (storedUser) {
        setPortalUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Register service worker for push notifications
  React.useEffect(() => {
    registerServiceWorker();
  }, []);

  // Fetch user profile data from Supabase
  React.useEffect(() => {
    const fetchUserProfile = async () => {
      const currentUser = user || portalUser;
      if (currentUser?.id) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('first_name, last_name, email')
          .eq('id', currentUser.id)
          .single();

        if (profile) {
          setUserProfile(profile);
        }
      }
    };

    fetchUserProfile();
  }, [user, portalUser]);

  // Use either authenticated user or portal test user
  const currentUser = user || portalUser;

  // Get display name from profile or fallback to email
  const getDisplayName = () => {
    if (userProfile?.first_name || userProfile?.last_name) {
      return `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim();
    }
    return currentUser?.name || currentUser?.email || 'User';
  };

  return (
    <div className="min-h-screen bg-[#334155] flex flex-col">
      {/* Sidebar - Desktop Only */}
      <PortalSidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-80">
        {/* Top Header Bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-4 md:px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              {/* Mobile menu button space - handled by sidebar component */}
            </div>

            <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
              {/* Website Link */}
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-slate-700 hover:bg-slate-600 text-[#fef5e7] transition-colors"
                title="Back to Website"
              >
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">Website</span>
              </Link>

              {/* Admin Access Link - Only show for admin emails */}
              {(['downscale@icloud.com', 'bec@downscale.health', 'rebecca@downscale.health', 'b.burstow83@gmail.com'].includes(user?.email || '')) && (
                <Link
                  href="/portal/admin"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-slate-700 hover:bg-slate-600 text-[#fef5e7] transition-colors"
                  title="Admin Dashboard"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden md:inline">Admin</span>
                </Link>
              )}

              <div className="bg-slate-900 rounded-lg p-2 md:p-3 border border-slate-700">
                <User className="h-5 w-5 md:h-6 md:w-6 text-[#b68a71]" />
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs md:text-sm text-[#fef5e7]">Welcome back</p>
                <p className="text-xs md:text-sm font-medium text-[#f8fafc] truncate max-w-[120px] md:max-w-none">
                  {getDisplayName()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content - with bottom padding for mobile nav */}
        <main className="p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}