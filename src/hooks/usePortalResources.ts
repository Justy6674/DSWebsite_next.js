import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface PortalResource {
  id: string;
  pillar: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop' | 'medication';
  content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide';
  title: string;
  description: string | null;
  content_data?: any;
  tags?: string[];
  is_published: boolean;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  view_count?: number;
}

export interface UserSavedResource {
  id: string;
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

  // Fetch all published portal resources
  const fetchResources = async (pillar?: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'shop') => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('portal_content')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (pillar) {
        query = query.eq('pillar', pillar);
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

  // Fetch user's saved resources from user_profiles.metadata
  const fetchSavedResources = async () => {
    if (!user?.email) return;

    setLoading(true);
    setError(null);

    try {
      const { data: profile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('metadata')
        .eq('email', user.email)
        .single();

      if (fetchError) throw fetchError;

      const savedResourcesData = profile?.metadata?.saved_resources || [];
      setSavedResources(savedResourcesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch saved resources');
    } finally {
      setLoading(false);
    }
  };

  // Save a resource for the user in metadata
  const saveResource = async (resourceId: string, notes?: string) => {
    if (!user?.email) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      // Get current profile metadata
      const { data: profile, error: getError } = await supabase
        .from('user_profiles')
        .select('metadata')
        .eq('email', user.email)
        .single();

      if (getError) throw getError;

      const currentSavedResources = profile?.metadata?.saved_resources || [];

      // Check if resource is already saved
      if (currentSavedResources.some((saved: any) => saved.resource_id === resourceId)) {
        throw new Error('Resource already saved');
      }

      // Add new saved resource
      const newSavedResource = {
        id: `saved_${Date.now()}`,
        resource_id: resourceId,
        saved_at: new Date().toISOString(),
        notes: notes || null
      };

      const updatedMetadata = {
        ...profile?.metadata,
        saved_resources: [newSavedResource, ...currentSavedResources]
      };

      // Update metadata
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ metadata: updatedMetadata })
        .eq('email', user.email);

      if (updateError) throw updateError;

      // Refresh saved resources
      await fetchSavedResources();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save resource');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove a saved resource from metadata
  const unsaveResource = async (resourceId: string) => {
    if (!user?.email) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      // Get current profile metadata
      const { data: profile, error: getError } = await supabase
        .from('user_profiles')
        .select('metadata')
        .eq('email', user.email)
        .single();

      if (getError) throw getError;

      const currentSavedResources = profile?.metadata?.saved_resources || [];

      // Remove the saved resource
      const updatedSavedResources = currentSavedResources.filter(
        (saved: any) => saved.resource_id !== resourceId
      );

      const updatedMetadata = {
        ...profile?.metadata,
        saved_resources: updatedSavedResources
      };

      // Update metadata
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ metadata: updatedMetadata })
        .eq('email', user.email);

      if (updateError) throw updateError;

      // Refresh saved resources
      await fetchSavedResources();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove saved resource');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update notes for a saved resource in metadata
  const updateResourceNotes = async (resourceId: string, notes: string) => {
    if (!user?.email) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      // Get current profile metadata
      const { data: profile, error: getError } = await supabase
        .from('user_profiles')
        .select('metadata')
        .eq('email', user.email)
        .single();

      if (getError) throw getError;

      const currentSavedResources = profile?.metadata?.saved_resources || [];

      // Update the notes for the specific resource
      const updatedSavedResources = currentSavedResources.map((saved: any) =>
        saved.resource_id === resourceId
          ? { ...saved, notes }
          : saved
      );

      const updatedMetadata = {
        ...profile?.metadata,
        saved_resources: updatedSavedResources
      };

      // Update metadata
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ metadata: updatedMetadata })
        .eq('email', user.email);

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

  // Get resources by pillar
  const getResourcesByPillar = (pillar: string): PortalResource[] => {
    return resources.filter(resource => resource.pillar === pillar);
  };

  // Get resources by content type
  const getResourcesByContentType = (contentType: string): PortalResource[] => {
    return resources.filter(resource => resource.content_type === contentType);
  };

  // Search resources
  const searchResources = (query: string): PortalResource[] => {
    const lowercaseQuery = query.toLowerCase();
    return resources.filter(resource =>
      resource.title.toLowerCase().includes(lowercaseQuery) ||
      (resource.description && resource.description.toLowerCase().includes(lowercaseQuery)) ||
      resource.pillar.toLowerCase().includes(lowercaseQuery) ||
      resource.content_type.toLowerCase().includes(lowercaseQuery) ||
      (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
    );
  };

  // Load data on component mount
  useEffect(() => {
    fetchResources();
    if (user?.email) {
      fetchSavedResources();
    }
  }, [user?.email]);

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
    getResourcesByPillar,
    getResourcesByContentType,
    searchResources,
    refreshResources: fetchResources,
    refreshSavedResources: fetchSavedResources
  };
};