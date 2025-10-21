'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function SEORouter() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // SEORouter no longer handles sitemaps - let server handle them directly
  }, [pathname]);

  return null;
}