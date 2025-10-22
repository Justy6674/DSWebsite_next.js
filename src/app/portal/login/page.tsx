'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';

export default function PortalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Admin bypass for testing - you can remove this in production
      if (email === 'admin@downscale.com.au' && password === 'portal2024') {
        // Create a mock user session for testing
        localStorage.setItem('portal_user', JSON.stringify({
          email: 'admin@downscale.com.au',
          name: 'Portal Admin',
          role: 'admin'
        }));
        router.push('/portal');
        return;
      }

      // Regular Supabase authentication
      const { error } = await signIn(email, password);
      if (error) {
        setError('Invalid credentials. Portal access is currently limited to approved users.');
      } else {
        router.push('/portal');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#334155] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-[#b68a71] hover:text-[#8B6F47] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-slate-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 border border-slate-700">
              <User className="h-8 w-8 text-[#b68a71]" />
            </div>
            <h1 className="text-2xl font-bold text-[#f8fafc] mb-2">Clinical Portal Access</h1>
            <p className="text-[#fef5e7] text-sm">Enter your credentials to access the portal</p>
          </div>

          {/* Coming Soon Notice */}
          <div className="bg-slate-900 rounded-lg p-4 mb-6 border border-slate-700">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-[#b68a71] mb-2">🚀 Coming Soon</h3>
              <p className="text-sm text-[#fef5e7] mb-3">
                The Clinical Portal is currently in beta testing. Full patient access will be available soon.
              </p>
              <div className="text-xs text-[#b68a71] bg-slate-800 rounded px-3 py-2 border border-slate-700">
                <strong>Admin Testing:</strong> admin@downscale.com.au / portal2024
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-[#f8fafc] text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-1 bg-slate-900 border-slate-700 text-[#f8fafc] placeholder-slate-400 focus:border-[#b68a71] focus:ring-[#b68a71]"
              />
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-[#f8fafc] text-sm font-medium">
                Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-slate-900 border-slate-700 text-[#f8fafc] placeholder-slate-400 focus:border-[#b68a71] focus:ring-[#b68a71] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-[#b68a71] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#b68a71] hover:bg-[#8B6F47] text-white font-medium py-2.5 mt-6"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Access Portal
                </div>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-700 text-center">
            <p className="text-xs text-slate-400">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@downscale.com.au" className="text-[#b68a71] hover:text-[#8B6F47]">
                support@downscale.com.au
              </a>
            </p>
          </div>
        </div>

        {/* Beta Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            This portal is currently in beta testing. Features and content may change.
          </p>
        </div>
      </div>
    </div>
  );
}