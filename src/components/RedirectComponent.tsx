'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RedirectComponentProps {
  to: string;
}

export const RedirectComponent = ({ to }: RedirectComponentProps) => {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    // Replace parameters in the destination path
    let destination = to;
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        destination = destination.replace(`:${key}`, value);
      }
    });
    
    // Use replace to avoid adding to history
    router.push(destination, { replace: true });
  }, [params, router, to]);

  return null; // This component doesn't render anything
};