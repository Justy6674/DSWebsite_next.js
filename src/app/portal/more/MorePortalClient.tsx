'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Brain, Moon, Droplets } from 'lucide-react';

export default function MorePortalClient() {
  const moreSections = [
    {
      id: 'mental-health',
      icon: Brain,
      title: 'Mental Health / Goal Setting',
      description: 'Psychology, mindset tools, and goal achievement resources',
      href: '/portal/mental-health',
      color: 'text-purple-400',
    },
    {
      id: 'sleep',
      icon: Moon,
      title: 'Sleep',
      description: 'Sleep optimization protocols and recovery strategies',
      href: '/portal/sleep-recovery',
      color: 'text-indigo-400',
    },
    {
      id: 'water',
      icon: Droplets,
      title: 'Water',
      description: 'Gamified hydration tracking and water intake optimization',
      href: '/portal/water',
      color: 'text-cyan-400',
    },
  ];

  return (
    <PortalLayout>
      <div className="space-y-6 pb-20 md:pb-6">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#f8fafc]">More Resources</h1>
          <p className="text-[#fef5e7] text-sm md:text-base max-w-3xl">
            Additional health pillars and resources for your weight management journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moreSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.id} href={section.href}>
                <Card className="bg-slate-800 border border-slate-700 hover:border-[#b68a71] transition-all duration-300 h-full flex flex-col p-6 cursor-pointer group">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 flex-shrink-0 group-hover:border-[#b68a71] transition-colors">
                      <Icon className={`h-6 w-6 ${section.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-[#f8fafc] mb-2 group-hover:text-[#b68a71] transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-[#fef5e7]">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}

