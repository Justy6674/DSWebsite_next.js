'use client';

/**
 * Subscription tier management hook
 * Handles tier checking and feature gating
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Subscription {
  id: string;
  tier: 'freemium' | 'basic' | 'premium' | 'vip';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  current_period_end: string;
  source: 'shopify' | 'stripe';
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSubscription();
    } else {
      setLoading(false);
      setSubscription(null);
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      // Get subscription data from user_profiles.metadata
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('metadata')
        .eq('email', user.email)
        .single();

      if (error) throw error;

      const subscriptionData = profile?.metadata?.subscription;
      if (subscriptionData) {
        setSubscription(subscriptionData);
      } else {
        // Default to freemium if no subscription data exists
        setSubscription({
          id: 'default',
          tier: 'freemium',
          status: 'active',
          current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
          source: 'shopify'
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const hasFeatureAccess = (requiredTier: 'freemium' | 'basic' | 'premium' | 'vip' = 'basic'): boolean => {
    if (!subscription) return requiredTier === 'freemium';
    
    const tierHierarchy = ['freemium', 'basic', 'premium', 'vip'];
    const userTierLevel = tierHierarchy.indexOf(subscription.tier);
    const requiredTierLevel = tierHierarchy.indexOf(requiredTier);
    
    return userTierLevel >= requiredTierLevel;
  };

  const getTierDisplayName = (tier: string): string => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  return {
    subscription,
    loading,
    hasFeatureAccess,
    getTierDisplayName,
    refetch: fetchSubscription,
  };
}