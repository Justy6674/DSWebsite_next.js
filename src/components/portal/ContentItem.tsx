'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Video,
  ExternalLink,
  Download,
  Play,
  Settings,
  Calendar,
  TrendingUp,
  Bookmark,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ContentItemProps {
  item: {
    id: string;
    title: string;
    description: string | null;
    content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide';
    content_data: any;
    tags: string[];
    view_count: number;
    created_at: string;
  };
}

const CONTENT_TYPE_ICONS = {
  video: Video,
  external_doc: ExternalLink,
  downscale_doc: FileText,
  link: ExternalLink,
  tool: Settings,
  program_guide: Bookmark,
};

const CONTENT_TYPE_LABELS = {
  video: 'Video',
  external_doc: 'External Document',
  downscale_doc: 'Document',
  link: 'Link',
  tool: 'Tool',
  program_guide: 'Program Guide',
};

export default function ContentItem({ item }: ContentItemProps) {
  const { user } = useAuth();

  const IconComponent = CONTENT_TYPE_ICONS[item.content_type] || FileText;
  const typeLabel = CONTENT_TYPE_LABELS[item.content_type] || 'Content';

  const trackContentView = async () => {
    if (user?.id) {
      try {
        await supabase.rpc('track_content_view', {
          p_content_type: 'portal_content',
          p_content_id: item.id,
          p_user_id: user.id,
        });
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    }
  };

  const handleClick = async () => {
    await trackContentView();

    const contentData = item.content_data || {};
    
    if (item.content_type === 'video' && contentData.mux_playback_id) {
      window.location.href = `/portal/video/${contentData.mux_playback_id}`;
    } else if (contentData.file_url) {
      window.open(contentData.file_url, '_blank');
    } else if (contentData.url) {
      window.open(contentData.url, '_blank');
    } else if (contentData.tool_url) {
      window.location.href = contentData.tool_url;
    }
  };

  return (
    <Card className="bg-slate-800 border border-slate-700 hover:border-[#b68a71] transition-all duration-300 cursor-pointer group">
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-2">
              <div className="bg-slate-900 rounded-lg p-2 border border-slate-700 flex-shrink-0 group-hover:border-[#b68a71] transition-colors">
                <IconComponent className="h-5 w-5 text-[#b68a71]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-base md:text-lg font-bold text-[#f8fafc] group-hover:text-[#b68a71] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs border-slate-600 text-slate-400 bg-slate-900/50 flex-shrink-0"
                  >
                    {typeLabel}
                  </Badge>
                </div>
                {item.description && (
                  <div className="mt-1 bg-slate-900 border border-slate-700 rounded-md p-2 h-20 md:h-24 overflow-y-auto mb-3">
                    <p className="text-xs text-[#fef5e7] whitespace-pre-wrap w-full max-w-none">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 flex-wrap">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{item.view_count} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(item.created_at).toLocaleDateString('en-AU')}</span>
              </div>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap mb-3">
                {item.tags.slice(0, 4).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs border-slate-600 text-slate-400 bg-slate-900/50"
                  >
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 4 && (
                  <span className="text-xs text-slate-500">
                    +{item.tags.length - 4} more
                  </span>
                )}
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={handleClick}
              className="bg-[#b68a71] hover:bg-[#8B6F47] text-white w-full sm:w-auto"
            >
              {item.content_type === 'video' && (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Watch Video
                </>
              )}
              {(item.content_type === 'external_doc' || item.content_type === 'link') && (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Resource
                </>
              )}
              {item.content_type === 'downscale_doc' && (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
              {item.content_type === 'tool' && (
                <>
                  <Settings className="h-4 w-4 mr-2" />
                  Use Tool
                </>
              )}
              {item.content_type === 'program_guide' && (
                <>
                  <Bookmark className="h-4 w-4 mr-2" />
                  View Guide
                </>
              )}
              {!['video', 'external_doc', 'link', 'downscale_doc', 'tool', 'program_guide'].includes(item.content_type) && (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  View Content
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

