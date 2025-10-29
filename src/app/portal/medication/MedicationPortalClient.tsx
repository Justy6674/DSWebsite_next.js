'use client';

import React, { useState, useEffect } from 'react';
import { Play, Download, ExternalLink, Clock, Star, Pill, FileText, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PortalLayout from '@/components/portal/PortalLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface PortalContentItem {
  id: string;
  title: string;
  description: string | null;
  content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide';
  content_data: any;
  tags: string[];
  view_count: number;
  created_at: string;
}

// MEDICAL SAFETY: Removed static medical placeholders per HEALTHCARE_PORTAL_PRD.md
// All medical content now comes from admin-approved sources via database
const staticMedicationContent: any[] = [
  // Static content removed for patient safety - fake medical content could mislead patients
];

export default function MedicationPortalClient() {
  const { user } = useAuth();
  const [dynamicContent, setDynamicContent] = useState<PortalContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch portal content for medication pillar
  useEffect(() => {
    fetchMedicationContent();
  }, []);

  const fetchMedicationContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portal_content')
        .select('*')
        .eq('pillar', 'medication')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDynamicContent(data || []);
    } catch (error) {
      console.error('Error fetching medication content:', error);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  // Track content view
  const trackContentView = async (contentId: string) => {
    if (user?.id) {
      try {
        await supabase.rpc('track_content_view', {
          p_content_type: 'portal_content',
          p_content_id: contentId,
          p_user_id: user.id
        });
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    }
  };

  // Handle content click
  const handleContentClick = (item: PortalContentItem) => {
    trackContentView(item.id);

    if (item.content_data?.file_url) {
      // Open file in new tab
      window.open(item.content_data.file_url, '_blank');
    } else if (item.content_data?.external_url) {
      // Open external link
      window.open(item.content_data.external_url, '_blank');
    }
  };

  // Render dynamic content items by admin-selected subsection - UNIFORM TILE LAYOUT
  const renderDynamicContent = (subsection: string, title: string, description: string) => {
    const items = dynamicContent.filter(item => item.content_data?.subsection === subsection);

    if (items.length === 0) return null;

    const typeIcons: any = {
      video: Play,
      external_doc: FileText,
      downscale_doc: Download,
      link: ExternalLink,
      tool: Star,
      program_guide: Clock
    };

    // Use content type from first item since they're now grouped by subsection
    const Icon = typeIcons[items[0]?.content_type] || FileText;

    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-[#b68a71] transition-all duration-300 h-fit">
        {/* Section Header - Fixed Height */}
        <div className="flex items-start space-x-3 mb-4">
          <div className="bg-slate-900 rounded-lg p-2 border border-slate-700 flex-shrink-0">
            <Icon className="h-5 w-5 text-[#b68a71]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[#f8fafc] mb-1 line-clamp-1">{title}</h3>
            <p className="text-[#fef5e7] text-xs line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Content Grid - Uniform Tiles */}
        <div className="grid grid-cols-1 gap-3">
          {items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-lg p-3 border border-slate-700 hover:border-[#b68a71]/50 transition-colors cursor-pointer group"
              onClick={() => handleContentClick(item)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[#f8fafc] text-sm line-clamp-1 mb-1">{item.title}</h4>
                  <p className="text-xs text-[#fef5e7] line-clamp-2 mb-2">{item.description || 'No description available'}</p>
                  <div className="flex items-center space-x-2 text-xs text-[#b68a71]">
                    <span>{item.view_count} views</span>
                    <span>•</span>
                    <span>{new Date(item.created_at).toLocaleDateString('en-AU')}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-[#b68a71] rounded-lg flex items-center justify-center group-hover:bg-[#8B6F47] transition-colors">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Show More Button if more than 3 items */}
          {items.length > 3 && (
            <div className="text-center pt-2">
              <button className="text-[#b68a71] hover:text-[#8B6F47] text-sm font-medium transition-colors">
                View {items.length - 3} more items →
              </button>
            </div>
          )}

          {/* Empty State for sections with no content */}
          {items.length === 0 && (
            <div className="text-center py-6 text-slate-400">
              <p className="text-sm">No content available yet</p>
              <p className="text-xs mt-1">Content will appear here when added by admin</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContentTile = (category: any) => {
    const typeIcons: any = {
      video: Play,
      pdf: Download,
      research: ExternalLink,
      guide: Star,
      timeline: Clock,
      tool: Star
    };

    const Icon = typeIcons[category.type] || Star;

    return (
      <div key={category.id} className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-[#b68a71] transition-all duration-300">
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
            <Icon className="h-6 w-6 text-[#b68a71]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#f8fafc] mb-2">{category.title}</h3>
            <p className="text-[#fef5e7] text-sm">{category.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {category.items.map((item: any, index: number) => (
            <div key={index} className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-[#b68a71]/50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-[#f8fafc] mb-1">{item.title}</h4>
                  <p className="text-sm text-[#fef5e7] mb-2">{item.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-[#b68a71]">
                    {item.duration && <span>Duration: {item.duration}</span>}
                    {item.size && <span>Size: {item.size}</span>}
                    {item.pages && <span>Pages: {item.pages}</span>}
                    {item.journal && <span>{item.journal} ({item.year})</span>}
                    {item.rating && <span>Rating: {item.rating}/5</span>}
                    {item.downloads && <span>{item.downloads} downloads</span>}
                    {item.phase && <span className="bg-[#b68a71] text-white px-2 py-1 rounded">{item.phase}</span>}
                  </div>
                  {item.features && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.features.map((feature: string, i: number) => (
                        <span key={i} className="bg-slate-800 text-[#fef5e7] px-2 py-1 rounded text-xs border border-slate-700">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  className="bg-[#b68a71] hover:bg-[#8B6F47] text-white ml-4"
                >
                  {category.type === 'video' ? 'Watch' :
                   category.type === 'pdf' ? 'Download' :
                   category.type === 'tool' ? 'Use Tool' : 'View'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
            <Pill className="h-8 w-8 text-[#b68a71]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#f8fafc]">Medication</h1>
            <p className="text-[#fef5e7]">Evidence-based resources for GLP-1 medication management</p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#fef5e7]">Loading medication resources...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* STANDARDIZED 6-SECTION PORTAL STRUCTURE */}
            {renderDynamicContent('Guides', 'Guides', 'Clinical guides and step-by-step instructions for medication management')}
            {renderDynamicContent('Research & Journal Articles', 'Research & Journal Articles', 'Evidence-based research and peer-reviewed studies on weight management medications')}
            {renderDynamicContent('Product Information', 'Product Information', 'Official medication information, prescribing guides, and product documentation')}
            {renderDynamicContent('Videos and Video Links', 'Videos and Video Links', 'Video tutorials for injection devices, demonstrations, and educational content')}
            {renderDynamicContent('Podcast Links', 'Podcast Links', 'Expert interviews and educational podcasts on medication and weight management')}
            {renderDynamicContent('Other', 'Other', 'Additional resources and tools for medication support and management')}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-[#b68a71] hover:bg-[#8B6F47] text-white justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download All PDFs
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Play className="h-4 w-4 mr-2" />
              Watch Video Playlist
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Star className="h-4 w-4 mr-2" />
              Mark Section Complete
            </Button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}