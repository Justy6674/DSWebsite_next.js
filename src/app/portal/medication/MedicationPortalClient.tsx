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

  // Render dynamic content items by admin-selected subsection
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
      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-[#b68a71] transition-all duration-300">
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
            <Icon className="h-6 w-6 text-[#b68a71]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#f8fafc] mb-2">{title}</h3>
            <p className="text-[#fef5e7] text-sm">{description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-[#b68a71]/50 transition-colors cursor-pointer"
              onClick={() => handleContentClick(item)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-[#f8fafc] mb-1">{item.title}</h4>
                  {item.description && (
                    <p className="text-sm text-[#fef5e7] mb-2">{item.description}</p>
                  )}
                  <div className="flex items-center space-x-4 text-xs text-[#b68a71]">
                    <span>Views: {item.view_count}</span>
                    <span>Added: {new Date(item.created_at).toLocaleDateString('en-AU')}</span>
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 ml-2">
                        {item.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="bg-slate-800 text-[#fef5e7] px-2 py-1 rounded text-xs border border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#b68a71] hover:bg-[#8B6F47] text-white ml-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContentClick(item);
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {item.content_type === 'video' ? 'Watch' :
                   item.content_type.includes('doc') ? 'View' :
                   item.content_type === 'tool' ? 'Use' : 'Open'}
                </Button>
              </div>
            </div>
          ))}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dynamic Content Sections - Organized by Admin Sub-Sections */}
            {renderDynamicContent('Device Videos', 'Device Videos', 'Video tutorials for injection devices and demonstration videos')}
            {renderDynamicContent('Product Information', 'Product Information', 'Comprehensive medication information and prescribing guides')}
            {renderDynamicContent('Research Articles', 'Research Articles', 'Evidence-based research and clinical studies on weight management')}
            {renderDynamicContent('Side Effect Management', 'Side Effect Management', 'Managing and understanding medication side effects')}
            {renderDynamicContent('Dose Tracking', 'Dose Tracking', 'Tools and resources for tracking medication doses and progress')}

            {/* Static Content (legacy) - REMOVED FOR MEDICAL SAFETY */}
            {/* staticMedicationContent.map(renderContentTile) - Commented out per HEALTHCARE_PORTAL_PRD.md */}
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