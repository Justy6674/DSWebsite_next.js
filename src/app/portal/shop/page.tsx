'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import DynamicPortalSection from '@/components/portal/DynamicPortalSection';
import { ShoppingBag } from 'lucide-react';

export default function ShopPortal() {
  return (
    <PortalLayout>
      <div className="container mx-auto px-4 py-8">
        <DynamicPortalSection
          pillar="shop"
          title="🛒 Shop Hub"
          description="Curated health and wellness products, supplements, and resources to support your weight management journey"
          colour="text-orange-800"
          icon={ShoppingBag}
        />
      </div>
    </PortalLayout>
  );
}