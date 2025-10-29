'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Pill, UtensilsCrossed, Activity, MoreHorizontal, Brain, Moon, Droplets } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TabItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const PRIMARY_TABS: TabItem[] = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/portal' },
  { id: 'medication', icon: Pill, label: 'Medication', href: '/portal/medication' },
  { id: 'nutrition', icon: UtensilsCrossed, label: 'Nutrition', href: '/portal/nutrition' },
  { id: 'activity', icon: Activity, label: 'Activity', href: '/portal/activity' },
];

const MORE_TABS: TabItem[] = [
  { id: 'mental-health', icon: Brain, label: 'Mental Health', href: '/portal/mental-health' },
  { id: 'sleep', icon: Moon, label: 'Sleep', href: '/portal/sleep-recovery' },
  { id: 'water', icon: Droplets, label: 'Water', href: '/portal/water' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only show on mobile (< 768px)
  if (!isMobile) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/portal') {
      return pathname === '/portal';
    }
    return pathname.startsWith(href + '/') || pathname === href;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {PRIMARY_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.href);

          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 min-w-0 px-2 ${
                active
                  ? 'text-[#b68a71]'
                  : 'text-slate-400'
              } transition-colors active:opacity-70`}
            >
              <Icon className="w-6 h-6 flex-shrink-0" />
              <span className="text-xs truncate w-full text-center leading-tight">{tab.label}</span>
            </Link>
          );
        })}

        {/* More Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`flex flex-col items-center justify-center gap-1 flex-1 min-w-0 px-2 ${
                MORE_TABS.some(tab => isActive(tab.href))
                  ? 'text-[#b68a71]'
                  : 'text-slate-400'
              } transition-colors active:opacity-70`}
            >
              <MoreHorizontal className="w-6 h-6 flex-shrink-0" />
              <span className="text-xs truncate w-full text-center leading-tight">More</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="end"
            className="bg-slate-800 border-slate-700 w-48 mb-2"
          >
            {MORE_TABS.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.href);

              return (
                <DropdownMenuItem key={tab.id} asChild>
                  <Link
                    href={tab.href}
                    className={`flex items-center gap-3 w-full px-4 py-3 ${
                      active
                        ? 'text-[#b68a71] bg-slate-700'
                        : 'text-[#fef5e7] hover:bg-slate-700'
                    } transition-colors`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

