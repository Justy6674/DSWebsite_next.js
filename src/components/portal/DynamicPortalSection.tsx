'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/integrations/supabase/client'
import {
  Video,
  FileText,
  ExternalLink,
  Link as LinkIcon,
  Settings,
  BookOpen,
  Download,
  Play,
  Calendar,
  TrendingUp,
  Clock,
  Users,
  Zap
} from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import GlobalSearch from './GlobalSearch'

interface PortalContent {
  id: string
  pillar: string
  content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide'
  title: string
  description: string
  content_data: any
  tags: string[]
  is_published: boolean
  created_at: string
  view_count: number
}

interface DynamicPortalSectionProps {
  pillar: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop'
  title: string
  description: string
  colour: string
  icon: React.ComponentType<any>
}

const CONTENT_TYPE_CONFIG = {
  video: {
    icon: Video,
    label: 'Videos',
    colour: 'bg-red-100 text-red-800',
    description: 'Educational videos and tutorials'
  },
  external_doc: {
    icon: ExternalLink,
    label: 'External Documents',
    colour: 'bg-blue-100 text-blue-800',
    description: 'Research papers and external resources'
  },
  downscale_doc: {
    icon: FileText,
    label: 'Downscale Documents',
    colour: 'bg-green-100 text-green-800',
    description: 'Clinic-created guides and resources'
  },
  link: {
    icon: LinkIcon,
    label: 'Links',
    colour: 'bg-purple-100 text-purple-800',
    description: 'Useful external resources'
  },
  tool: {
    icon: Settings,
    label: 'Tools',
    colour: 'bg-orange-100 text-orange-800',
    description: 'Interactive tools and assessments'
  },
  program_guide: {
    icon: BookOpen,
    label: 'Programs & Guides',
    colour: 'bg-indigo-100 text-indigo-800',
    description: 'Structured programs and step-by-step guides'
  }
}

export default function DynamicPortalSection({
  pillar,
  title,
  description,
  colour,
  icon: SectionIcon
}: DynamicPortalSectionProps) {
  const [content, setContent] = useState<PortalContent[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const router = useRouter()
  const searchParams = useSearchParams()
  const highlightId = searchParams.get('highlight')


  useEffect(() => {
    loadContent()
  }, [pillar])

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portal_content')
        .select('*')
        .eq('pillar', pillar)
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      setContent(data || [])

      // Get last updated date
      if (data && data.length > 0) {
        const mostRecent = data[0].created_at
        setLastUpdated(new Date(mostRecent).toLocaleDateString('en-AU'))
      }

    } catch (error) {
      console.error('Error loading content:', error)
    } finally {
      setLoading(false)
    }
  }

  const trackContentView = async (contentId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      await supabase.rpc('track_content_view', {
        p_content_type: 'portal_content',
        p_content_id: contentId,
        p_user_id: user?.id || null
      })
    } catch (error) {
      console.error('Error tracking view:', error)
    }
  }

  const handleContentClick = async (item: PortalContent) => {
    await trackContentView(item.id)

    // Handle different content types
    switch (item.content_type) {
      case 'video':
        if (item.content_data.mux_playback_id) {
          window.location.href = `/portal/video/${item.content_data.mux_playback_id}`
        } else if (item.content_data.url) {
          window.open(item.content_data.url, '_blank')
        }
        break
      case 'external_doc':
      case 'link':
        if (item.content_data.url) {
          window.open(item.content_data.url, '_blank')
        }
        break
      case 'downscale_doc':
        if (item.content_data.file_url) {
          window.open(item.content_data.file_url, '_blank')
        }
        break
      case 'tool':
        if (item.content_data.tool_url) {
          router.push(item.content_data.tool_url)
        }
        break
      case 'program_guide':
        // Navigate to program details or start program
        router.push(`/portal/programs/${item.id}`)
        break
    }
  }

  const getContentTypeStats = () => {
    const stats = Object.keys(CONTENT_TYPE_CONFIG).map(type => ({
      type,
      count: content.filter(item => item.content_type === type).length,
      ...CONTENT_TYPE_CONFIG[type as keyof typeof CONTENT_TYPE_CONFIG]
    })).filter(stat => stat.count > 0)

    return stats
  }

  const filteredContent = selectedType === 'all'
    ? content
    : content.filter(item => item.content_type === selectedType)

  // Group by admin-defined subsection so sections reflect placement decisions
  const contentBySubsection = filteredContent.reduce((acc: Record<string, PortalContent[]>, item) => {
    const subsection = (item.content_data?.subsection || 'Other') as string
    if (!acc[subsection]) acc[subsection] = []
    acc[subsection].push(item)
    return acc
  }, {})

  const renderContentItem = (item: PortalContent) => {
    const config = CONTENT_TYPE_CONFIG[item.content_type]
    const IconComponent = config.icon
    const isHighlighted = highlightId === item.id

    return (
      <Card
        key={item.id}
        className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] ${
          isHighlighted ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
        onClick={() => handleContentClick(item)}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${config.colour.replace('text-', 'bg-').replace('800', '50')}`}>
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                  {/* Fixed-height, scrollable description to keep tiles uniform */}
                  <div className="mt-1 bg-slate-900 border border-slate-700 rounded-md p-2 h-20 overflow-y-auto">
                    <p className="text-xs text-[#fef5e7] whitespace-pre-wrap w-full max-w-none">{item.description}</p>
                  </div>
                </div>
                <Badge className={config.colour} variant="secondary">
                  {config.label}
                </Badge>
              </div>

              {/* Content-specific metadata */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {item.content_type === 'video' && item.content_data.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {item.content_data.duration}
                  </div>
                )}

                {item.content_type === 'program_guide' && item.content_data.duration_weeks && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.content_data.duration_weeks} weeks
                  </div>
                )}

                {item.content_type === 'program_guide' && item.content_data.total_steps && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {item.content_data.total_steps} steps
                  </div>
                )}

                {(item.content_type === 'downscale_doc' || item.content_type === 'tool') &&
                 item.content_data.can_export_pdf && (
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    PDF Export
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {item.view_count} views
                </div>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {item.tags.slice(0, 4).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 4} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Action button based on content type */}
              <div className="pt-2">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleContentClick(item)
                  }}
                >
                  {item.content_type === 'video' && (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </>
                  )}
                  {(item.content_type === 'external_doc' || item.content_type === 'link') && (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Resource
                    </>
                  )}
                  {item.content_type === 'downscale_doc' && (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </>
                  )}
                  {item.content_type === 'tool' && (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Use Tool
                    </>
                  )}
                  {item.content_type === 'program_guide' && (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Start Program
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading {title.toLowerCase()} content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className={`p-3 rounded-lg ${colour.replace('text-', 'bg-').replace('800', '100')}`}>
            <SectionIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>

        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Last content added: {lastUpdated}
          </div>
        )}
      </div>


      {content.length === 0 ? (
        <div className="text-center py-12">
          <SectionIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No content available yet</h3>
          <p className="text-muted-foreground">
            New {title.toLowerCase()} resources will appear here when added by our team.
          </p>
        </div>
      ) : (
        <>
          {/* Content Type Navigation */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedType === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedType('all')}
              className="flex items-center gap-2"
            >
              All Content ({content.length})
            </Button>
            {getContentTypeStats().map(stat => (
              <Button
                key={stat.type}
                variant={selectedType === stat.type ? 'default' : 'outline'}
                onClick={() => setSelectedType(stat.type)}
                className="flex items-center gap-2"
              >
                <stat.icon className="w-4 h-4" />
                {stat.label} ({stat.count})
              </Button>
            ))}
          </div>

          {/* Content grouped by sub-section as chosen in Admin */}
          <div className="space-y-8">
            {Object.entries(contentBySubsection).map(([sub, items]) => (
              <div key={sub} className="space-y-3">
                <h3 className="text-xl font-semibold">{sub}</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map(renderContentItem)}
                </div>
              </div>
            ))}
          </div>

          {filteredContent.length === 0 && selectedType !== 'all' && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No {CONTENT_TYPE_CONFIG[selectedType as keyof typeof CONTENT_TYPE_CONFIG]?.label.toLowerCase()}
                available in this section yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}