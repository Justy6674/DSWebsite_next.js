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
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (error) throw error;
      setSubscription(data as Subscription);
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