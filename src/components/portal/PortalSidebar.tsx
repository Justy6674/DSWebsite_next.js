'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Pill,
  UtensilsCrossed,
  Activity,
  Brain,
  Moon,
  ShoppingBag,
  Calendar,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const pillars = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: BarChart3,
    href: '/portal',
    subItems: [
      { name: 'Personal Metrics', href: '/portal' },
      { name: 'Saved Resources', href: '/portal/saved' },
      { name: 'Water Reminders', href: '/portal/water' },
      { name: 'Halaxy Portal', href: 'https://www.halaxy.com/a/login', external: true }
    ]
  },
  {
    id: 'medication',
    name: 'Medication',
    icon: Pill,
    href: '/portal/medication',
    subItems: [
      { name: 'Device Videos', href: '/portal/medication/videos' },
      { name: 'Product Information', href: '/portal/medication/products' },
      { name: 'Research Articles', href: '/portal/medication/research' },
      { name: 'Side Effect Management', href: '/portal/medication/side-effects' },
      { name: 'Dose Tracking', href: '/portal/medication/tracking' }
    ]
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    icon: UtensilsCrossed,
    href: '/portal/nutrition',
    subItems: [
      { name: 'Meal Planning Tools', href: '/portal/nutrition/planning' },
      { name: 'Recipe Library', href: '/portal/nutrition/recipes' },
      { name: 'Macro Calculators', href: '/portal/nutrition/calculators' },
      { name: 'Eating Guides', href: '/portal/nutrition/guides' },
      { name: 'Saved Meal Plans', href: '/portal/nutrition/saved' }
    ]
  },
  {
    id: 'activity',
    name: 'Activity',
    icon: Activity,
    href: '/portal/activity',
    subItems: [
      { name: 'Home Workouts', href: '/portal/activity/workouts' },
      { name: 'Exercise Videos', href: '/portal/activity/videos' },
      { name: 'Movement Alternatives', href: '/portal/activity/alternatives' },
      { name: 'Progress Tracking', href: '/portal/activity/tracking' },
      { name: 'Equipment-Free', href: '/portal/activity/equipment-free' }
    ]
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    icon: Brain,
    href: '/portal/mental-health',
    subItems: [
      { name: 'Stress Management', href: '/portal/mental-health/stress' },
      { name: 'Emotional Eating', href: '/portal/mental-health/emotional-eating' },
      { name: 'CBT Resources', href: '/portal/mental-health/cbt' },
      { name: 'Identity Change', href: '/portal/mental-health/identity' },
      { name: 'Mindfulness Library', href: '/portal/mental-health/mindfulness' }
    ]
  },
  {
    id: 'sleep-recovery',
    name: 'Sleep + Recovery',
    icon: Moon,
    href: '/portal/sleep-recovery',
    subItems: [
      { name: 'Sleep Hygiene', href: '/portal/sleep-recovery/hygiene' },
      { name: 'Relaxation Resources', href: '/portal/sleep-recovery/relaxation' },
      { name: 'Recovery Strategies', href: '/portal/sleep-recovery/strategies' },
      { name: 'Parent Tips', href: '/portal/sleep-recovery/parent-tips' },
      { name: 'Sleep Tracking', href: '/portal/sleep-recovery/tracking' }
    ]
  },
  {
    id: 'shop',
    name: 'Shop',
    icon: ShoppingBag,
    href: '/portal/shop',
    subItems: [
      { name: 'Compounding Pharmacy', href: '/portal/shop/pharmacy' },
      { name: 'Supplements', href: '/portal/shop/supplements' },
      { name: 'Devices & Equipment', href: '/portal/shop/equipment' },
      { name: 'Educational Products', href: '/portal/shop/educational' },
      { name: 'Recommendations', href: '/portal/shop/recommendations' }
    ]
  }
];

interface PortalSidebarProps {
  className?: string;
}

export default function PortalSidebar({ className = '' }: PortalSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedPillars, setExpandedPillars] = useState<string[]>(['dashboard']);
  const pathname = usePathname();

  const togglePillar = (pillarId: string) => {
    setExpandedPillars(prev =>
      prev.includes(pillarId)
        ? prev.filter(id => id !== pillarId)
        : [...prev, pillarId]
    );
  };

  const isActivePath = (href: string) => {
    if (href === '/portal') {
      return pathname === '/portal';
    }
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#f8fafc]">Clinical Portal</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-[#f8fafc] hover:bg-slate-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isExpanded = expandedPillars.includes(pillar.id);
          const isActive = isActivePath(pillar.href);

          return (
            <div key={pillar.id} className="space-y-1">
              {/* Main Pillar Link */}
              <div className="flex items-center">
                <Link
                  href={pillar.href}
                  className={`flex items-center flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#b68a71] text-white shadow-lg'
                      : 'text-[#fef5e7] hover:bg-slate-700 hover:text-[#b68a71]'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="flex-1">{pillar.name}</span>
                </Link>

                {/* Expand/Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePillar(pillar.id)}
                  className="ml-2 text-[#fef5e7] hover:bg-slate-700 hover:text-[#b68a71] p-1"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Sub-items */}
              {isExpanded && (
                <div className="ml-6 space-y-1 border-l border-slate-700 pl-4">
                  {pillar.subItems.map((subItem) => (
                    <div key={subItem.name}>
                      {subItem.external ? (
                        <a
                          href={subItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 py-2 rounded-lg text-sm text-[#fef5e7] hover:bg-slate-700 hover:text-[#b68a71] transition-all duration-200"
                        >
                          <Calendar className="h-4 w-4 mr-3" />
                          <span>{subItem.name}</span>
                        </a>
                      ) : (
                        <Link
                          href={subItem.href}
                          className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            isActivePath(subItem.href)
                              ? 'bg-[#b68a71]/20 text-[#b68a71] font-medium'
                              : 'text-[#fef5e7] hover:bg-slate-700 hover:text-[#b68a71]'
                          }`}
                        >
                          <span>{subItem.name}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <Link
          href="/"
          className="flex items-center px-3 py-2 rounded-lg text-sm text-[#fef5e7] hover:bg-slate-700 hover:text-[#b68a71] transition-all duration-200"
        >
          <Home className="h-4 w-4 mr-3" />
          <span>Back to Main Site</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-800 text-[#f8fafc] hover:bg-slate-700 border border-slate-700"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-80 bg-slate-800 border-r border-slate-700 z-30 ${className}`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-80 bg-slate-800 border-r border-slate-700 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}