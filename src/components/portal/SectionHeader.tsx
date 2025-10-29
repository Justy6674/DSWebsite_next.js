'use client';

import React from 'react';

interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export default function SectionHeader({ icon: Icon, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
          <Icon className="h-8 w-8 text-[#b68a71]" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f8fafc]">{title}</h1>
        </div>
      </div>
      <p className="text-[#fef5e7] text-sm md:text-base max-w-3xl">{description}</p>
    </div>
  );
}

