'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import ContentList from '@/components/portal/ContentList';
import SectionHeader from '@/components/portal/SectionHeader';
import { Package } from 'lucide-react';

export default function MedicationProductsClient() {
  return (
    <PortalLayout>
      <div className="space-y-6">
        <SectionHeader
          icon={Package}
          title="Product Information"
          description="Official medication information, prescribing guides, and product documentation"
        />
        <ContentList pillar="medication" subsection="Product Information" />
      </div>
    </PortalLayout>
  );
}

