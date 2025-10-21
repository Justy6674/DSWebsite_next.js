'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AdminSetupProps {
  onSetupComplete: () => void;
}

export function AdminSetup({ onSetupComplete }: AdminSetupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password: string): string | null => {
    if (password.length < 12) {
      return 'Password must be at least 12 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return null;
  };

  const createAdminUser = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate email
    if (!email || !email.includes('@downscale.com.au')) {
      setError('Admin email must be a @downscale.com.au address');
      setIsLoading(false);
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/login`
        }
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccess('Admin account created successfully! You can now sign in.');
        setTimeout(() => {
          onSetupComplete();
        }, 2000);
      }
    } catch (err) {
      setError('Failed to create admin account. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-brown/20 rounded-full">
              <UserPlus className="h-8 w-8 text-brown" />
            </div>
          </div>
          <CardTitle className="text-cream text-2xl">Create Admin Account</CardTitle>
          <CardDescription className="text-cream/70">
            Set up your first admin account to manage blog content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-cream text-sm">Admin Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
              style={{ color: '#f7f2d3' }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-cream text-sm">Admin Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
              style={{ color: '#f7f2d3' }}
            />
          </div>
          
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          
          {success && (
            <p className="text-green-400 text-sm">{success}</p>
          )}

          <Button 
            onClick={createAdminUser}
            disabled={isLoading || !email || !password}
            className="w-full bg-brown hover:bg-brown/80 text-cream"
          >
            <Shield className="mr-2 h-4 w-4" />
            {isLoading ? 'Creating Account...' : 'Create Admin Account'}
          </Button>

          <div className="mt-4 text-center">
            <p className="text-cream/60 text-xs">
              This will create your admin account for blog management
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}