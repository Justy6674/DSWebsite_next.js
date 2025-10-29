'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SubSectionCardProps {
  section: {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  };
  count: number;
  href: string;
  loading: boolean;
}

export default function SubSectionCard({ section, count, href, loading }: SubSectionCardProps) {
  const Icon = section.icon;

  return (
    <Link href={href} className="block h-full">
      <Card className="bg-slate-800 border border-slate-700 hover:border-[#b68a71] transition-all duration-300 h-full flex flex-col p-4 cursor-pointer group">
        <div className="flex items-start space-x-3 mb-3">
          <div className="bg-slate-900 rounded-lg p-2 border border-slate-700 flex-shrink-0 group-hover:border-[#b68a71] transition-colors">
            <Icon className="h-5 w-5 text-[#b68a71]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-[#f8fafc] mb-1 line-clamp-2 group-hover:text-[#b68a71] transition-colors">
              {section.name}
            </h3>
            <p className="text-xs text-[#fef5e7] line-clamp-2 mb-2">
              {section.description}
            </p>
          </div>
        </div>

        <div className="mt-auto">
          {loading ? (
            <div className="h-5 bg-slate-700 rounded animate-pulse w-20" />
          ) : (
            <Badge
              variant="outline"
              className="text-xs border-slate-600 text-slate-400 bg-slate-900/50"
            >
              {count} {count === 1 ? 'item' : 'items'}
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}

