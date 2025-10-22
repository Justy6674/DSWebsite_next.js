'use client';

import React, { useEffect } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingBag } from 'lucide-react';

export default function ShopPortal() {
  // Auto-redirect to external shop
  useEffect(() => {
    const timer = setTimeout(() => {
      window.open('https://www.downscale.shop', '_blank');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDirectRedirect = () => {
    window.open('https://www.downscale.shop', '_blank');
  };

  return (
    <PortalLayout>
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-slate-800 border-slate-700 max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-[#b68a71] p-4 rounded-full">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">🛒 Shop Hub</h1>
            <p className="text-slate-300 mb-6">
              Curated health and wellness products, supplements, and resources to support your weight management journey
            </p>

            <div className="space-y-4">
              <p className="text-slate-400 text-sm">
                Redirecting you to our external shop in 2 seconds...
              </p>

              <Button
                onClick={handleDirectRedirect}
                className="bg-[#b68a71] hover:bg-[#8B6F47] text-white flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Downscale Shop Now
              </Button>

              <p className="text-slate-500 text-xs">
                Opens in a new tab: www.downscale.shop
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}