'use client';

import React, { useState, useEffect } from 'react';
import { BlogPasswordGate } from '@/components/blog/BlogPasswordGate';
import { BlogAdmin } from '@/components/blog/BlogAdmin';
import { supabase } from '@/integrations/supabase/client';

export default function BlogAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);
    };

    checkAuthState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAccessGranted = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-cream">Loading...</div>
    </div>;
  }

  if (!isAuthenticated) {
    return <BlogPasswordGate onAccessGranted={handleAccessGranted} />;
  }

  return <BlogAdmin onLogout={handleLogout} />;
}