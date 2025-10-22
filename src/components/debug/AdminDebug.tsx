'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function AdminDebug() {
  const { user } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkAdminStatus = async () => {
    setLoading(true);
    try {
      console.log('Checking admin status for user:', user?.id);

      if (!user?.id) {
        setDebugInfo({ error: 'No user logged in' });
        return;
      }

      // Check user_profiles table
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      console.log('Profile query result:', { data: profile, error });

      setDebugInfo({
        userId: user.id,
        userEmail: user.email,
        profile: profile,
        profileError: error,
        isAdmin: profile?.role === 'admin'
      });
    } catch (err) {
      console.error('Debug error:', err);
      setDebugInfo({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const setUserAsAdmin = async () => {
    if (!user?.id) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          role: 'admin'
        })
        .select()
        .single();

      console.log('Admin update result:', { data, error });

      // Refresh debug info
      await checkAdminStatus();
    } catch (err) {
      console.error('Error setting admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      checkAdminStatus();
    }
  }, [user?.id]);

  return (
    <Card className="bg-slate-800 border-slate-700 m-4">
      <CardHeader>
        <CardTitle className="text-white">Admin Debug Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={checkAdminStatus} disabled={loading}>
          {loading ? 'Checking...' : 'Check Admin Status'}
        </Button>

        <Button onClick={setUserAsAdmin} disabled={loading || !user}>
          Set Current User as Admin
        </Button>

        {debugInfo && (
          <div className="bg-slate-900 p-4 rounded-lg">
            <pre className="text-white text-xs overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}