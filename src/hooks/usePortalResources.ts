import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface PortalResource {
  id: string;
  category: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'shop';
  type: 'pdf' | 'video' | 'tool' | 'link' | 'guide' | 'audio' | 'calculator';
  title: string;
  description: string;
  content_url?: string;
  metadata: Record<string, any>;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface UserSavedResource {
  id: string;
  user_id: string;
  resource_id: string;
  saved_at: string;
  notes?: string;
  resource?: PortalResource;
}

export const usePortalResources = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<PortalResource[]>([]);
  const [savedResources, setSavedResources] = useState<UserSavedResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all active portal resources
  const fetchResources = async (category?: string) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('portal_resources')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setResources(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's saved resources
  const fetchSavedResources = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('user_saved_resources')
        .select(`
          *,
          resource:portal_resources(*)
        `)
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });

      if (fetchError) throw fetchError;

      setSavedResources(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch saved resources');
    } finally {
      setLoading(false);
    }
  };

  // Save a resource for the user
  const saveResource = async (resourceId: string, notes?: string) => {
    if (!user?.id) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      const { error: saveError } = await supabase
        .from('user_saved_resources')
        .insert({
          user_id: user.id,
          resource_id: resourceId,
          notes: notes || null
        });

      if (saveError) {
        // Handle unique constraint violation
        if (saveError.code === '23505') {
          throw new Error('Resource already saved');
        }
        throw saveError;
      }

      // Refresh saved resources
      await fetchSavedResources();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save resource');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove a saved resource
  const unsaveResource = async (resourceId: string) => {
    if (!user?.id) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('user_saved_resources')
        .delete()
        .eq('user_id', user.id)
        .eq('resource_id', resourceId);

      if (deleteError) throw deleteError;

      // Refresh saved resources
      await fetchSavedResources();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove saved resource');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update notes for a saved resource
  const updateResourceNotes = async (resourceId: string, notes: string) => {
    if (!user?.id) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('user_saved_resources')
        .update({ notes })
        .eq('user_id', user.id)
        .eq('resource_id', resourceId);

      if (updateError) throw updateError;

      // Refresh saved resources
      await fetchSavedResources();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update notes');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Check if a resource is saved by the user
  const isResourceSaved = (resourceId: string): boolean => {
    return savedResources.some(saved => saved.resource_id === resourceId);
  };

  // Get resources by category
  const getResourcesByCategory = (category: string): PortalResource[] => {
    return resources.filter(resource => resource.category === category);
  };

  // Get resources by type
  const getResourcesByType = (type: string): PortalResource[] => {
    return resources.filter(resource => resource.type === type);
  };

  // Search resources
  const searchResources = (query: string): PortalResource[] => {
    const lowercaseQuery = query.toLowerCase();
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(lowercaseQuery) ||
      resource.description.toLowerCase().includes(lowercaseQuery) ||
      resource.category.toLowerCase().includes(lowercaseQuery) ||
      resource.type.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Load data on component mount
  useEffect(() => {
    fetchResources();
    if (user?.id) {
      fetchSavedResources();
    }
  }, [user?.id]);

  return {
    resources,
    savedResources,
    loading,
    error,
    fetchResources,
    fetchSavedResources,
    saveResource,
    unsaveResource,
    updateResourceNotes,
    isResourceSaved,
    getResourcesByCategory,
    getResourcesByType,
    searchResources,
    refreshResources: fetchResources,
    refreshSavedResources: fetchSavedResources
  };
};