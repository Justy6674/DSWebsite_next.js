'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import {
  Pill,
  UtensilsCrossed,
  Activity,
  Brain,
  Moon,
  ShoppingBag,
  ArrowRight,
  User,
  BarChart3
} from "lucide-react";

const pillars = [
  {
    id: 'medication',
    name: 'Medication',
    icon: Pill,
    description: 'Device usage videos, product information, research articles and side effect management for GLP-1 medications',
    href: '/portal/medication',
    stats: '12 resources'
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    icon: UtensilsCrossed,
    description: 'Meal plans, recipe library, macro calculators and real-world eating guides for sustainable weight management',
    href: '/portal/nutrition',
    stats: '28 resources'
  },
  {
    id: 'activity',
    name: 'Activity',
    icon: Activity,
    description: 'Home workout programs, exercise videos and life-proof movement alternatives requiring no gym membership',
    href: '/portal/activity',
    stats: '18 resources'
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    icon: Brain,
    description: 'Stress management, emotional eating strategies, CBT resources and identity-based change frameworks',
    href: '/portal/mental-health',
    stats: '15 resources'
  },
  {
    id: 'sleep-recovery',
    name: 'Sleep + Recovery',
    icon: Moon,
    description: 'Sleep hygiene guides, relaxation resources and strategies for busy parents to optimise recovery',
    href: '/portal/sleep-recovery',
    stats: '10 resources'
  },
  {
    id: 'shop',
    name: 'Shop',
    icon: ShoppingBag,
    description: 'Compounding pharmacy products, supplements, devices and educational product guides',
    href: '/portal/shop',
    stats: 'Browse products'
  }
];

export default function PortalDashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-700 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full border border-slate-700">
          <h2 className="text-2xl font-bold text-foreground mb-4">Portal Access Required</h2>
          <p className="text-slate-300 mb-6">Please sign in to access your clinical portal dashboard.</p>
          <Link href="/auth/login">
            <Button className="w-full bg-[#b68a71] hover:bg-[#8B6F47] text-white">
              Sign In to Portal
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#334155]">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#f8fafc] mb-2">Clinical Portal</h1>
              <p className="text-[#fef5e7]">Your comprehensive weight management resource centre</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
                <User className="h-6 w-6 text-[#b68a71]" />
              </div>
              <div className="text-right">
                <p className="text-sm text-[#fef5e7]">Welcome back</p>
                <p className="font-medium text-[#f8fafc]">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#fef5e7] text-sm">Total Resources</p>
                <p className="text-2xl font-bold text-[#f8fafc]">83</p>
              </div>
              <BarChart3 className="h-8 w-8 text-[#b68a71]" />
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#fef5e7] text-sm">Completed</p>
                <p className="text-2xl font-bold text-[#f8fafc]">12</p>
              </div>
              <div className="h-8 w-8 bg-[#b68a71] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#fef5e7] text-sm">Progress</p>
                <p className="text-2xl font-bold text-[#f8fafc]">14%</p>
              </div>
              <div className="w-8 h-8 relative">
                <div className="w-full h-full bg-slate-700 rounded-full"></div>
                <div className="absolute inset-0 bg-[#b68a71] rounded-full" style={{clipPath: 'polygon(0 0, 14% 0, 14% 100%, 0 100%)'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Link
                key={pillar.id}
                href={pillar.href}
                className="group bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-[#b68a71] transition-all duration-300 hover:shadow-xl hover:shadow-[#b68a71]/10"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 group-hover:border-[#b68a71] group-hover:bg-[#b68a71]/10 transition-all duration-300">
                    <Icon className="h-6 w-6 text-[#b68a71]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#f8fafc] mb-2 group-hover:text-[#b68a71] transition-colors">
                      {pillar.name}
                    </h3>
                    <p className="text-sm text-[#fef5e7] mb-3 line-clamp-3">
                      {pillar.description}
                    </p>
                    <p className="text-xs text-[#b68a71] font-medium">
                      {pillar.stats}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <span className="text-sm text-[#fef5e7] group-hover:text-[#b68a71] transition-colors">
                    Explore resources
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#b68a71] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-6">Recent Activity</h2>
          <div className="bg-slate-800 rounded-xl border border-slate-700">
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <div className="bg-[#b68a71] rounded-full p-2">
                    <Pill className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#f8fafc] font-medium">Downloaded Mounjaro injection guide</p>
                    <p className="text-sm text-[#fef5e7]">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <div className="bg-[#b68a71] rounded-full p-2">
                    <UtensilsCrossed className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#f8fafc] font-medium">Completed macro calculator assessment</p>
                    <p className="text-sm text-[#fef5e7]">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <div className="bg-[#b68a71] rounded-full p-2">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#f8fafc] font-medium">Viewed resistance band workout videos</p>
                    <p className="text-sm text-[#fef5e7]">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}