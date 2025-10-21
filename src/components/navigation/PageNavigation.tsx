'use client';

import Head from "next/head";
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface NavigationItem {
  label: string;
  path: string;
}

interface PageNavigationProps {
  items?: NavigationItem[];
  className?: string;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({ 
  items = [], 
  className = "mb-6"
}) => {
  const pathname = usePathname();

  // Generate breadcrumb items based on current path if not provided
  const generateBreadcrumbs = (): NavigationItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: NavigationItem[] = [];

    // Add home
    breadcrumbs.push({ label: 'Home', path: '/' });

    // Generate breadcrumbs from path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert path segment to readable label
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Special cases for better labels
      if (segment === 'weight-loss-clinic-sydney') label = 'Weight Loss Clinic Sydney';
      if (segment === 'weight-loss-clinic-melbourne') label = 'Weight Loss Clinic Melbourne';
      if (segment === 'weight-loss-clinic-brisbane') label = 'Weight Loss Clinic Brisbane';
      if (segment === 'weight-loss-clinic-perth') label = 'Weight Loss Clinic Perth';
      if (segment === 'weight-loss-clinic-adelaide') label = 'Weight Loss Clinic Adelaide';
      if (segment === 'weight-loss-clinic-gold-coast') label = 'Weight Loss Clinic Gold Coast';
      if (segment === 'weight-loss-clinic-canberra') label = 'Weight Loss Clinic Canberra';
      if (segment === 'weight-loss-clinic-newcastle') label = 'Weight Loss Clinic Newcastle';
      if (segment === 'weight-loss-clinic-hobart') label = 'Weight Loss Clinic Hobart';
      if (segment === 'weight-loss-clinic-darwin') label = 'Weight Loss Clinic Darwin';
      if (segment === 'weight-loss-clinic-geelong') label = 'Weight Loss Clinic Geelong';
      if (segment === 'weight-loss-clinic-sunshine-coast') label = 'Weight Loss Clinic Sunshine Coast';
      if (segment === 'weight-loss-clinic-wollongong') label = 'Weight Loss Clinic Wollongong';
      if (segment === 'medical-weight-management') label = 'Medical Weight Management';
      if (segment === 'nutrition-meal-planning') label = 'Nutrition & Meal Planning';
      if (segment === 'mental-health-support') label = 'Mental Health Support';
      if (segment === 'movement-activity-programs') label = 'Movement & Activity Programs';
      if (segment === 'sleep-recovery-optimisation') label = 'Sleep & Recovery Optimisation';
      if (segment === 'goal-setting-maintenance') label = 'Goal Setting & Maintenance';
      if (segment === 'blog-admin') label = 'Blog Admin';
      if (segment === 'data-deletion') label = 'Data Deletion';

      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const navigationItems = items.length > 0 ? items : generateBreadcrumbs();

  // Generate BreadcrumbList schema for Google
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": navigationItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://www.downscale.com.au${item.path}`
    }))
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Head>
      <nav className="py-2" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          {navigationItems.map((item, index) => {
            const isLast = index === navigationItems.length - 1;
            const isHome = index === 0;

            return (
              <li 
                key={item.path} 
                className="flex items-center gap-2"
                itemProp="itemListElement" 
                itemScope 
                itemType="https://schema.org/ListItem"
              >
                {isLast ? (
                  <span className="flex items-center gap-2 text-[hsl(var(--downscale-brown))] font-semibold" itemProp="name">
                    {isHome && <Home className="h-4 w-4" />}
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link 
                      href={item.path}
                      className="flex items-center gap-2 text-[hsl(var(--downscale-brown))] hover:text-[hsl(var(--primary))] transition-colors opacity-70 hover:opacity-100"
                      itemProp="item"
                    >
                      {isHome && <Home className="h-4 w-4" />}
                      <span itemProp="name">{item.label}</span>
                    </Link>
                    <meta itemProp="position" content={String(index + 1)} />
                    <ChevronRight className="h-4 w-4 text-[hsl(var(--downscale-brown))] opacity-40" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};