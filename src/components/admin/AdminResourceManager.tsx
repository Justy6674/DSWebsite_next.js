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
  category: string;
  type: string;
  title: string;
  description: string;
  content_url?: string;
  metadata: Record<string, any>;
  is_active: boolean;
  sort_order: number;
}

const CATEGORIES = [
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'activity', label: 'Activity & Exercise' },
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'sleep-recovery', label: 'Sleep & Recovery' },
  { value: 'shop', label: 'Shop & Products' }
];

const RESOURCE_TYPES = [
  { value: 'pdf', label: 'PDF Document' },
  { value: 'video', label: 'Video Content' },
  { value: 'tool', label: 'Interactive Tool' },
  { value: 'link', label: 'External Link' },
  { value: 'guide', label: 'Step-by-step Guide' },
  { value: 'audio', label: 'Audio Content' },
  { value: 'calculator', label: 'Calculator Tool' }
];

export default function AdminResourceManager() {
  const { user } = useAuth();
  const [resources, setResources] = useState<PortalResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingResource, setEditingResource] = useState<PortalResource | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');

  // Form state
  const [formData, setFormData] = useState<PortalResource>({
    category: '',
    type: '',
    title: '',
    description: '',
    content_url: '',
    metadata: {},
    is_active: true,
    sort_order: 0
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
        .from('portal_resources')
        .select('*')
        .order('category', { ascending: true })
        .order('sort_order', { ascending: true });

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
          .from('portal_resources')
          .update(formData)
          .eq('id', editingResource.id);

        if (updateError) throw updateError;
      } else {
        // Create new resource
        const { error: insertError } = await supabase
          .from('portal_resources')
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
        .from('portal_resources')
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
        .from('portal_resources')
        .update({ is_active: !currentStatus })
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
      category: '',
      type: '',
      title: '',
      description: '',
      content_url: '',
      metadata: {},
      is_active: true,
      sort_order: 0
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
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !filterCategory || resource.category === filterCategory;
    const matchesType = !filterType || resource.type === filterType;

    return matchesSearch && matchesCategory && matchesType;
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
              <Label htmlFor="filter-category" className="text-[#fef5e7]">Category</Label>
              <select
                id="filter-category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="filter-type" className="text-[#fef5e7]">Type</Label>
              <select
                id="filter-type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
              >
                <option value="">All Types</option>
                {RESOURCE_TYPES.map(type => (
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
                <Label htmlFor="category" className="text-[#fef5e7]">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="type" className="text-[#fef5e7]">Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Type</option>
                  {RESOURCE_TYPES.map(type => (
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
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="content_url" className="text-[#fef5e7]">Content URL (optional)</Label>
              <Input
                id="content_url"
                type="url"
                value={formData.content_url || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, content_url: e.target.value }))}
                className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sort_order" className="text-[#fef5e7]">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                  className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  id="is_active"
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="is_active" className="text-[#fef5e7]">Active</Label>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={saveResource}
                disabled={loading || !formData.title || !formData.category || !formData.type}
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
                  resource.is_active ? 'border-slate-700' : 'border-slate-600 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-[#f8fafc]">{resource.title}</h3>
                      <span className="text-xs bg-slate-700 text-[#fef5e7] px-2 py-1 rounded">
                        {resource.category}
                      </span>
                      <span className="text-xs bg-slate-700 text-[#fef5e7] px-2 py-1 rounded">
                        {resource.type}
                      </span>
                      {!resource.is_active && (
                        <span className="text-xs bg-red-700 text-white px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#fef5e7] mb-2">{resource.description}</p>
                    {resource.content_url && (
                      <div className="flex items-center space-x-1 text-xs text-[#b68a71]">
                        <ExternalLink className="h-3 w-3" />
                        <span>{resource.content_url}</span>
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
                      onClick={() => toggleResourceStatus(resource.id!, resource.is_active)}
                      size="sm"
                      variant="outline"
                      className={`border-slate-600 hover:bg-slate-700 ${
                        resource.is_active ? 'text-yellow-400' : 'text-green-400'
                      }`}
                    >
                      {resource.is_active ? 'Deactivate' : 'Activate'}
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