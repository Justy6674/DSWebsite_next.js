'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import SubSectionCard from './SubSectionCard';
import SectionHeader from './SectionHeader';
import {
  BookOpen,
  FileText,
  Package,
  Video,
  Podcast,
  Settings,
  File,
} from 'lucide-react';

interface SubSection {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  description: string;
  subsectionKey: string;
}

const SUB_SECTIONS: SubSection[] = [
  {
    id: 'guides',
    name: 'Guides',
    icon: BookOpen,
    href: '/guides',
    description: 'Step-by-step educational guides',
    subsectionKey: 'Guides',
  },
  {
    id: 'research',
    name: 'Research & Journal Articles',
    icon: FileText,
    href: '/research',
    description: 'Evidence-based research papers',
    subsectionKey: 'Research & Journal Articles',
  },
  {
    id: 'products',
    name: 'Product Information',
    icon: Package,
    href: '/products',
    description: 'Product details and recommendations',
    subsectionKey: 'Product Information',
  },
  {
    id: 'videos',
    name: 'Videos and Video Links',
    icon: Video,
    href: '/videos',
    description: 'Educational videos and tutorials',
    subsectionKey: 'Videos and Video Links',
  },
  {
    id: 'podcasts',
    name: 'Podcast Links',
    icon: Podcast,
    href: '/podcasts',
    description: 'Audio content and podcasts',
    subsectionKey: 'Podcast Links',
  },
  {
    id: 'tools',
    name: 'Tools',
    icon: Settings,
    href: '/tools',
    description: 'Interactive calculators and assessments',
    subsectionKey: 'Tools',
  },
  {
    id: 'other',
    name: 'Other',
    icon: File,
    href: '/other',
    description: 'Additional resources',
    subsectionKey: 'Other',
  },
];

interface SubDashboardProps {
  pillar: 'medication' | 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function SubDashboard({ pillar, title, description, icon }: SubDashboardProps) {
  const [contentCounts, setContentCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const basePath = `/portal/${pillar}`;

  useEffect(() => {
    fetchContentCounts();
  }, [pillar]);

  const fetchContentCounts = async () => {
    try {
      const counts: Record<string, number> = {};

      // Fetch all published content for this pillar
      const { data: allContent, error } = await supabase
        .from('portal_content')
        .select('content_data, pillar')
        .eq('pillar', pillar)
        .eq('is_published', true);

      if (error) throw error;

      // Count content by subsection
      SUB_SECTIONS.forEach((section) => {
        const count = (allContent || []).filter((item) => {
          const contentData = item.content_data as any;
          const subsection = contentData?.subsection;
          if (!subsection || typeof subsection !== 'string') return false;
          return (
            subsection === section.subsectionKey ||
            subsection === section.name ||
            subsection.toLowerCase() === section.id.toLowerCase()
          );
        }).length;
        counts[section.id] = count;
      });

      setContentCounts(counts);
    } catch (error) {
      console.error('Error fetching content counts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <SectionHeader icon={icon} title={title} description={description} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {SUB_SECTIONS.map((section) => (
          <SubSectionCard
            key={section.id}
            section={section}
            count={contentCounts[section.id] || 0}
            href={`${basePath}${section.href}`}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}

