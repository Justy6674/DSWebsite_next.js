'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ExternalLink,
  Search,
  Filter,
  Upload
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface PortalResource {
  id?: string;
  pillar: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop';
  content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide';
  title: string;
  description: string | null;
  content_data?: any;
  tags?: string[];
  is_published: boolean;
  created_by?: string | null;
  created_at?: string;
  updated_at?: string;
  view_count?: number;
}

const PILLARS = [
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'activity', label: 'Activity & Exercise' },
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'sleep-recovery', label: 'Sleep & Recovery' },
  { value: 'shop', label: 'Shop & Products' }
];

const CONTENT_TYPES = [
  { value: 'video', label: 'Video Content' },
  { value: 'external_doc', label: 'External Document' },
  { value: 'downscale_doc', label: 'Downscale Document' },
  { value: 'link', label: 'External Link' },
  { value: 'tool', label: 'Interactive Tool' },
  { value: 'program_guide', label: 'Program Guide' }
];

export default function AdminResourceManager() {
  const { user } = useAuth();
  const [resources, setResources] = useState<PortalResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingResource, setEditingResource] = useState<PortalResource | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPillar, setFilterPillar] = useState('');
  const [filterContentType, setFilterContentType] = useState('');

  // Form state
  const [formData, setFormData] = useState<PortalResource>({
    pillar: 'nutrition',
    content_type: 'video',
    title: '',
    description: '',
    content_data: {},
    tags: [],
    is_published: true
  });

  // Check if user is admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.id) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        setIsAdmin(profile?.role === 'admin');
      }
    };

    checkAdminStatus();
  }, [user?.id]);

  // Fetch all resources
  const fetchResources = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('portal_content')
        .select('*')
        .order('pillar', { ascending: true })
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setResources(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  };

  // Save resource (create or update)
  const saveResource = async () => {
    setLoading(true);
    setError(null);

    try {
      if (editingResource?.id) {
        // Update existing resource
        const { error: updateError } = await supabase
          .from('portal_content')
          .update(formData)
          .eq('id', editingResource.id);

        if (updateError) throw updateError;
      } else {
        // Create new resource
        const { error: insertError } = await supabase
          .from('portal_content')
          .insert(formData);

        if (insertError) throw insertError;
      }

      // Reset form and refresh data
      resetForm();
      await fetchResources();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save resource');
    } finally {
      setLoading(false);
    }
  };

  // Delete resource
  const deleteResource = async (resourceId: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('portal_content')
        .delete()
        .eq('id', resourceId);

      if (deleteError) throw deleteError;

      await fetchResources();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete resource');
    } finally {
      setLoading(false);
    }
  };

  // Toggle resource active status
  const toggleResourceStatus = async (resourceId: string, currentStatus: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('portal_content')
        .update({ is_published: !currentStatus })
        .eq('id', resourceId);

      if (updateError) throw updateError;

      await fetchResources();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update resource status');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      pillar: 'nutrition',
      content_type: 'video',
      title: '',
      description: '',
      content_data: {},
      tags: [],
      is_published: true
    });
    setEditingResource(null);
    setShowAddForm(false);
  };

  // Start editing resource
  const startEditing = (resource: PortalResource) => {
    setFormData(resource);
    setEditingResource(resource);
    setShowAddForm(true);
  };

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = !searchTerm ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.description && resource.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPillar = !filterPillar || resource.pillar === filterPillar;
    const matchesContentType = !filterContentType || resource.content_type === filterContentType;

    return matchesSearch && matchesPillar && matchesContentType;
  });

  // Load resources on mount
  useEffect(() => {
    if (isAdmin) {
      fetchResources();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8 text-center">
          <p className="text-[#fef5e7]">Access denied. Admin privileges required.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-2">Portal Resource Manager</h1>
          <p className="text-[#fef5e7]">Manage resources available to portal users</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-[#b68a71] hover:bg-[#8B6F47] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="bg-red-900/20 border-red-700">
          <CardContent className="p-4">
            <p className="text-red-200">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className="text-[#fef5e7]">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter-pillar" className="text-[#fef5e7]">Pillar</Label>
              <select
                id="filter-pillar"
                value={filterPillar}
                onChange={(e) => setFilterPillar(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
              >
                <option value="">All Pillars</option>
                {PILLARS.map(pillar => (
                  <option key={pillar.value} value={pillar.value}>{pillar.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="filter-content-type" className="text-[#fef5e7]">Content Type</Label>
              <select
                id="filter-content-type"
                value={filterContentType}
                onChange={(e) => setFilterContentType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
              >
                <option value="">All Types</option>
                {CONTENT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="bg-slate-800 border-[#b68a71]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#f8fafc]">
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </CardTitle>
              <Button
                onClick={resetForm}
                variant="outline"
                size="sm"
                className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pillar" className="text-[#fef5e7]">Pillar</Label>
                <select
                  id="pillar"
                  value={formData.pillar}
                  onChange={(e) => setFormData(prev => ({ ...prev, pillar: e.target.value as any }))}
                  className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
                  required
                >
                  {PILLARS.map(pillar => (
                    <option key={pillar.value} value={pillar.value}>{pillar.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="content-type" className="text-[#fef5e7]">Content Type</Label>
                <select
                  id="content-type"
                  value={formData.content_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, content_type: e.target.value as any }))}
                  className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
                  required
                >
                  {CONTENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="title" className="text-[#fef5e7]">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-[#fef5e7]">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="tags" className="text-[#fef5e7]">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags?.join(', ') || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                }))}
                className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                placeholder="weight loss, nutrition, meal planning"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="is_published"
                type="checkbox"
                checked={formData.is_published}
                onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="is_published" className="text-[#fef5e7]">Published</Label>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={saveResource}
                disabled={loading || !formData.title || !formData.pillar || !formData.content_type}
                className="bg-[#b68a71] hover:bg-[#8B6F47] text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Resource'}
              </Button>
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources List */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">
            Resources ({filteredResources.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="text-center py-8">
              <p className="text-[#fef5e7]">Loading resources...</p>
            </div>
          )}

          {!loading && filteredResources.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#fef5e7]">No resources found.</p>
            </div>
          )}

          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className={`bg-slate-900 rounded-lg p-4 border ${
                  resource.is_published ? 'border-slate-700' : 'border-slate-600 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-[#f8fafc]">{resource.title}</h3>
                      <span className="text-xs bg-slate-700 text-[#fef5e7] px-2 py-1 rounded">
                        {resource.pillar}
                      </span>
                      <span className="text-xs bg-slate-700 text-[#fef5e7] px-2 py-1 rounded">
                        {resource.content_type}
                      </span>
                      {!resource.is_published && (
                        <span className="text-xs bg-red-700 text-white px-2 py-1 rounded">
                          Unpublished
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#fef5e7] mb-2">{resource.description}</p>
                    {resource.tags && resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {resource.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-[#b68a71] text-white px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => startEditing(resource)}
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => toggleResourceStatus(resource.id!, resource.is_published)}
                      size="sm"
                      variant="outline"
                      className={`border-slate-600 hover:bg-slate-700 ${
                        resource.is_published ? 'text-yellow-400' : 'text-green-400'
                      }`}
                    >
                      {resource.is_published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      onClick={() => deleteResource(resource.id!)}
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}