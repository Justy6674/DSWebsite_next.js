'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogPasswordGateProps {
  onAccessGranted: () => void;
}

export function BlogPasswordGate({ onAccessGranted }: BlogPasswordGateProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        onAccessGranted();
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-brown/20 rounded-full">
              <Shield className="h-8 w-8 text-brown" />
            </div>
          </div>
          <CardTitle className="text-cream text-2xl">Staff Login Required</CardTitle>
          <CardDescription className="text-cream/70">
            Please sign in to manage blog content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
                style={{ color: '#f7f2d3' }}
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-cream placeholder:text-cream/50"
                style={{ color: '#f7f2d3' }}
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !email || !password}
              className="w-full bg-brown hover:bg-brown/80 text-cream"
            >
              <Lock className="mr-2 h-4 w-4" />
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-cream/60 text-xs">
              Contact system administrator for access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}