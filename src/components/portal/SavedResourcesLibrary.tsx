'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BookOpen,
  FileText,
  Play,
  UtensilsCrossed,
  Camera,
  StickyNote,
  Star,
  Search,
  Filter,
  Download,
  ExternalLink,
  Calendar,
  Tag,
  Heart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SavedResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'meal-plan' | 'recipe' | 'article' | 'photo' | 'note';
  category: string;
  url?: string;
  content?: string;
  tags: string[];
  savedDate: string;
  lastViewed?: string;
  isFavorite: boolean;
}

const resourceTypes = {
  pdf: { icon: FileText, label: 'PDF Documents', color: 'text-red-400' },
  video: { icon: Play, label: 'Videos', color: 'text-blue-400' },
  'meal-plan': { icon: UtensilsCrossed, label: 'Meal Plans', color: 'text-green-400' },
  recipe: { icon: UtensilsCrossed, label: 'Recipes', color: 'text-yellow-400' },
  article: { icon: BookOpen, label: 'Articles', color: 'text-purple-400' },
  photo: { icon: Camera, label: 'Progress Photos', color: 'text-pink-400' },
  note: { icon: StickyNote, label: 'Personal Notes', color: 'text-orange-400' }
};

const sampleResources: SavedResource[] = [
  {
    id: '1',
    title: 'Ozempic Injection Guide',
    type: 'pdf',
    category: 'Medication',
    url: '/docs/ozempic-guide.pdf',
    tags: ['injection', 'tutorial', 'ozempic'],
    savedDate: '2024-10-20',
    lastViewed: '2024-10-22',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Week 1 Progress Photo',
    type: 'photo',
    category: 'Progress',
    url: '/photos/week1-front.jpg',
    tags: ['progress', 'week1', 'front-view'],
    savedDate: '2024-10-15',
    isFavorite: false
  },
  {
    id: '3',
    title: 'High Protein Breakfast Recipes',
    type: 'meal-plan',
    category: 'Nutrition',
    content: 'Collection of 20 high-protein breakfast options for weight loss',
    tags: ['breakfast', 'protein', 'weight-loss'],
    savedDate: '2024-10-18',
    lastViewed: '2024-10-21',
    isFavorite: true
  },
  {
    id: '4',
    title: 'Home Workout: 15-Minute HIIT',
    type: 'video',
    category: 'Activity',
    url: 'https://youtube.com/watch?v=example',
    tags: ['hiit', 'home-workout', 'beginner'],
    savedDate: '2024-10-17',
    isFavorite: false
  },
  {
    id: '5',
    title: 'Side Effect Management Notes',
    type: 'note',
    category: 'Medication',
    content: 'Personal notes on managing nausea: ginger tea helps, avoid fatty foods in morning...',
    tags: ['side-effects', 'nausea', 'personal'],
    savedDate: '2024-10-19',
    lastViewed: '2024-10-22',
    isFavorite: true
  }
];

export default function SavedResourcesLibrary() {
  const { user } = useAuth();
  const [resources, setResources] = useState<SavedResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<SavedResource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Check for admin testing session
  const [portalUser, setPortalUser] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('portal_user');
      if (storedUser) {
        setPortalUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const currentUser = user || portalUser;

  // Load saved resources
  useEffect(() => {
    if (currentUser?.email) {
      const savedResources = localStorage.getItem(`saved_resources_${currentUser.email}`);
      if (savedResources) {
        setResources(JSON.parse(savedResources));
      } else {
        // Use sample data for demo
        setResources(sampleResources);
        localStorage.setItem(`saved_resources_${currentUser.email}`, JSON.stringify(sampleResources));
      }
    }
  }, [currentUser]);

  // Filter resources
  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        resource.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(resource => resource.type === filterType);
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === filterCategory);
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter(resource => resource.isFavorite);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, filterType, filterCategory, showFavoritesOnly]);

  const toggleFavorite = (resourceId: string) => {
    const updatedResources = resources.map(resource =>
      resource.id === resourceId
        ? { ...resource, isFavorite: !resource.isFavorite }
        : resource
    );
    setResources(updatedResources);

    if (currentUser?.email) {
      localStorage.setItem(`saved_resources_${currentUser.email}`, JSON.stringify(updatedResources));
    }
  };

  const updateLastViewed = (resourceId: string) => {
    const updatedResources = resources.map(resource =>
      resource.id === resourceId
        ? { ...resource, lastViewed: new Date().toISOString().split('T')[0] }
        : resource
    );
    setResources(updatedResources);

    if (currentUser?.email) {
      localStorage.setItem(`saved_resources_${currentUser.email}`, JSON.stringify(updatedResources));
    }
  };

  const getResourceIcon = (type: string) => {
    const resourceType = resourceTypes[type as keyof typeof resourceTypes];
    return resourceType ? resourceType.icon : FileText;
  };

  const getResourceColor = (type: string) => {
    const resourceType = resourceTypes[type as keyof typeof resourceTypes];
    return resourceType ? resourceType.color : 'text-gray-400';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU');
  };

  const categories = Array.from(new Set(resources.map(r => r.category)));

  if (!currentUser) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8 text-center">
          <p className="text-[#fef5e7]">Please sign in to view your saved resources.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
          <BookOpen className="h-8 w-8 text-[#b68a71]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#f8fafc]">Saved Resources</h1>
          <p className="text-[#fef5e7]">Your personal library of health and wellness resources</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#b68a71]">{resources.length}</div>
            <div className="text-sm text-[#fef5e7]">Total Saved</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#b68a71]">
              {resources.filter(r => r.isFavorite).length}
            </div>
            <div className="text-sm text-[#fef5e7]">Favorites</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#b68a71]">
              {categories.length}
            </div>
            <div className="text-sm text-[#fef5e7]">Categories</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#b68a71]">
              {resources.filter(r => r.lastViewed === new Date().toISOString().split('T')[0]).length}
            </div>
            <div className="text-sm text-[#fef5e7]">Viewed Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-700 text-[#f8fafc]"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-[#f8fafc]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(resourceTypes).map(([key, type]) => (
                  <SelectItem key={key} value={key}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-[#f8fafc]">
                <Tag className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              variant={showFavoritesOnly ? "default" : "outline"}
              className={showFavoritesOnly
                ? "bg-[#b68a71] hover:bg-[#8B6F47] text-white"
                : "border-slate-600 text-[#fef5e7] hover:bg-slate-700"
              }
            >
              <Heart className="h-4 w-4 mr-2" />
              Favorites Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const Icon = getResourceIcon(resource.type);
          const color = getResourceColor(resource.type);

          return (
            <Card key={resource.id} className="bg-slate-800 border-slate-700 hover:border-[#b68a71] transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-slate-900 rounded-lg p-2 border border-slate-700">
                      <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-[#f8fafc] text-lg leading-tight">
                        {resource.title}
                      </CardTitle>
                      <p className="text-sm text-[#b68a71]">{resource.category}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite(resource.id)}
                    className={`p-1 ${resource.isFavorite ? 'text-red-400' : 'text-slate-400'}`}
                  >
                    <Heart className={`h-4 w-4 ${resource.isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {resource.content && (
                  <p className="text-sm text-[#fef5e7] mb-3 line-clamp-2">
                    {resource.content}
                  </p>
                )}

                <div className="flex flex-wrap gap-1 mb-3">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-900 text-[#fef5e7] px-2 py-1 rounded text-xs border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="text-xs text-slate-400">+{resource.tags.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Saved {formatDate(resource.savedDate)}
                  </div>
                  {resource.lastViewed && (
                    <div>Last viewed {formatDate(resource.lastViewed)}</div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      updateLastViewed(resource.id);
                      if (resource.url) {
                        window.open(resource.url, '_blank');
                      }
                    }}
                    className="flex-1 bg-[#b68a71] hover:bg-[#8B6F47] text-white"
                  >
                    {resource.type === 'video' && <Play className="h-3 w-3 mr-1" />}
                    {resource.type === 'pdf' && <Download className="h-3 w-3 mr-1" />}
                    {resource.url ? 'Open' : 'View'}
                  </Button>
                  {resource.url && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(resource.url, '_blank')}
                      className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#f8fafc] mb-2">No resources found</h3>
            <p className="text-[#fef5e7]">
              {searchTerm || filterType !== 'all' || filterCategory !== 'all' || showFavoritesOnly
                ? 'Try adjusting your filters or search terms'
                : 'Start saving resources as you explore the portal'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}