'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Video, Link, Settings, BookOpen, ExternalLink, Calendar, TrendingUp, X } from 'lucide-react';
import FilePreviewClient from './FilePreviewClient';

type ContentType = 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide';
type Pillar = 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop' | 'medication';

interface VideoContent {
  url: string;
  platform?: string;
  duration?: number;
}

interface ExternalDocContent {
  url: string;
  file_type?: string;
  author?: string;
}

interface DownscaleDocContent {
  file_url: string;
  file_type?: string;
  version?: string;
}

interface LinkContent {
  url: string;
  link_type?: string;
}

interface ToolContent {
  tool_url: string;
  tool_type?: string;
  instructions?: string;
}

interface ProgramGuideContent {
  duration_weeks: number;
  total_steps: number;
  difficulty?: string;
  overview?: string;
}

type ContentData = VideoContent | ExternalDocContent | DownscaleDocContent | LinkContent | ToolContent | ProgramGuideContent;

interface PortalContent {
  id: string;
  pillar: Pillar;
  content_type: ContentType;
  title: string;
  description: string;
  content_data: ContentData;
  tags: string[];
  is_published: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  view_count: number;
}

interface PortalContentPreviewProps {
  content: PortalContent;
  isOpen: boolean;
  onClose: () => void;
}

const PILLARS: { value: Pillar; label: string; colour: string }[] = [
  { value: 'nutrition', label: '🥗 Nutrition', colour: 'bg-green-100 text-green-800' },
  { value: 'activity', label: '💪 Activity', colour: 'bg-blue-100 text-blue-800' },
  { value: 'mental-health', label: '🧠 Mental Health', colour: 'bg-purple-100 text-purple-800' },
  { value: 'sleep-recovery', label: '😴 Sleep & Recovery', colour: 'bg-indigo-100 text-indigo-800' },
  { value: 'water', label: '💧 Hydration', colour: 'bg-cyan-100 text-cyan-800' },
  { value: 'shop', label: '🛒 Shop', colour: 'bg-orange-100 text-orange-800' },
  { value: 'medication', label: '💊 Medication', colour: 'bg-red-100 text-red-800' }
];

const CONTENT_TYPES: { value: ContentType; label: string; icon: any }[] = [
  { value: 'video', label: 'Video', icon: Video },
  { value: 'external_doc', label: 'External Document', icon: ExternalLink },
  { value: 'downscale_doc', label: 'Downscale Document', icon: FileText },
  { value: 'link', label: 'Link', icon: Link },
  { value: 'tool', label: 'Tool', icon: Settings },
  { value: 'program_guide', label: 'Program/Guide', icon: BookOpen }
];

const PortalContentPreview: React.FC<PortalContentPreviewProps> = ({ content, isOpen, onClose }) => {
  const pillar = PILLARS.find(p => p.value === content.pillar);
  const contentType = CONTENT_TYPES.find(ct => ct.value === content.content_type);

  const renderContentPreview = () => {
    switch (content.content_type) {
      case 'video':
        const videoData = content.content_data as VideoContent;
        return (
          <div className="w-full aspect-video bg-slate-800 rounded-lg overflow-hidden">
            {videoData.url ? (
              <iframe
                src={videoData.url}
                className="w-full h-full"
                title={content.title}
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <Video className="w-12 h-12 mb-2" />
                <span>No video URL provided</span>
              </div>
            )}
          </div>
        );

      case 'downscale_doc':
        const docData = content.content_data as DownscaleDocContent;
        return (
          <div className="w-full flex justify-center">
            <FilePreviewClient
              fileUrl={docData.file_url}
              fileName={content.title}
              fileType={docData.file_type}
              width={280}
              className="mx-auto"
            />
          </div>
        );

      case 'external_doc':
        const extDocData = content.content_data as ExternalDocContent;
        return (
          <div className="w-full bg-slate-800 rounded-lg p-6 text-center">
            <ExternalLink className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <p className="text-slate-300 mb-4">External Document</p>
            <Button asChild variant="outline" size="sm">
              <a href={extDocData.url} target="_blank" rel="noopener noreferrer">
                Open Document
              </a>
            </Button>
          </div>
        );

      case 'link':
        const linkData = content.content_data as LinkContent;
        return (
          <div className="w-full bg-slate-800 rounded-lg p-6 text-center">
            <Link className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <p className="text-slate-300 mb-4">External Link</p>
            <Button asChild variant="outline" size="sm">
              <a href={linkData.url} target="_blank" rel="noopener noreferrer">
                Visit Link
              </a>
            </Button>
          </div>
        );

      case 'tool':
        const toolData = content.content_data as ToolContent;
        return (
          <div className="w-full bg-slate-800 rounded-lg p-6 text-center">
            <Settings className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-slate-300 mb-4">Interactive Tool</p>
            {toolData.instructions && (
              <p className="text-slate-400 text-sm mb-4">{toolData.instructions}</p>
            )}
            <Button asChild variant="outline" size="sm">
              <a href={toolData.tool_url} target="_blank" rel="noopener noreferrer">
                Open Tool
              </a>
            </Button>
          </div>
        );

      case 'program_guide':
        const programData = content.content_data as ProgramGuideContent;
        return (
          <div className="w-full bg-slate-800 rounded-lg p-6">
            <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-slate-400 text-sm">Duration</p>
                <p className="text-slate-200 font-semibold">{programData.duration_weeks} weeks</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Steps</p>
                <p className="text-slate-200 font-semibold">{programData.total_steps}</p>
              </div>
            </div>
            {programData.difficulty && (
              <div className="mt-4 text-center">
                <Badge variant="outline">{programData.difficulty}</Badge>
              </div>
            )}
            {programData.overview && (
              <p className="text-slate-300 text-sm mt-4">{programData.overview}</p>
            )}
          </div>
        );

      default:
        return (
          <div className="w-full bg-slate-800 rounded-lg p-6 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400">Content preview not available</p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-slate-100 text-xl">Patient Portal Preview</DialogTitle>
              <DialogDescription className="text-slate-400">
                This is exactly how patients will see this content in their portal
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Patient Portal Style Preview */}
        <div className="bg-slate-800 rounded-xl p-6 space-y-6">
          {/* Header with pillar and status */}
          <div className="flex items-center gap-3 flex-wrap">
            <Badge className={pillar?.colour || 'bg-slate-600 text-slate-200'}>
              {pillar?.label || 'Unknown Pillar'}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 text-slate-300 border-slate-600">
              {contentType?.icon && <contentType.icon className="w-3 h-3" />}
              {contentType?.label || 'Unknown Type'}
            </Badge>
            <Badge className={content.is_published ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'}>
              {content.is_published ? 'Published' : 'Draft'}
            </Badge>
          </div>

          {/* Title and description */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-100">{content.title}</h2>
            <p className="text-slate-300 leading-relaxed">{content.description}</p>
          </div>

          {/* Tags */}
          {content.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {content.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs text-slate-400 border-slate-600">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Content preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-200">Content Preview</h3>
            {renderContentPreview()}
          </div>

          {/* Metadata footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(content.created_at).toLocaleDateString('en-AU')}
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {content.view_count} views
              </div>
            </div>

            {!content.is_published && (
              <Badge variant="outline" className="text-yellow-400 border-yellow-600">
                Only visible to admins (not published)
              </Badge>
            )}
          </div>
        </div>

        {/* Admin notes */}
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-2">Admin Notes</h4>
          <ul className="text-blue-300 text-sm space-y-1">
            <li>• This preview shows the exact patient portal styling and layout</li>
            <li>• {content.is_published ? 'Content is LIVE and visible to patients' : 'Content is DRAFT and only visible to admins'}</li>
            <li>• Mobile responsive design automatically adapts to smaller screens</li>
            <li>• Patients can save this content to their personal library</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortalContentPreview;