'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { Plus, FileText, Video, Link, Settings, BookOpen, ExternalLink, Upload, Search, Eye, Edit, Trash2, Calendar, TrendingUp } from 'lucide-react'
import PortalContentPreview from './PortalContentPreview'
import TagsInput from '@/components/admin/TagsInput'

type ContentType = 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide'
type Pillar = 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop' | 'medication'

interface VideoContent {
  url: string
  platform?: string
  duration?: number
}

interface ExternalDocContent {
  url: string
  file_type?: string
  author?: string
}

interface DownscaleDocContent {
  file_url: string
  file_type?: string
  version?: string
}

interface LinkContent {
  url: string
  link_type?: string
}

interface ToolContent {
  tool_url: string
  tool_type?: string
  instructions?: string
}

interface ProgramGuideContent {
  duration_weeks: number
  total_steps: number
  difficulty?: string
  overview?: string
}

type ContentData = VideoContent | ExternalDocContent | DownscaleDocContent | LinkContent | ToolContent | ProgramGuideContent

interface PortalContent {
  id: string
  pillar: Pillar
  content_type: ContentType
  title: string
  description: string
  content_data: ContentData
  tags: string[]
  is_published: boolean
  created_by: string
  created_at: string
  updated_at: string
  view_count: number
}

const PILLARS: { value: Pillar; label: string; colour: string }[] = [
  { value: 'nutrition', label: '🥗 Nutrition', colour: 'bg-green-100 text-green-800' },
  { value: 'activity', label: '💪 Activity', colour: 'bg-blue-100 text-blue-800' },
  { value: 'mental-health', label: '🧠 Mental Health', colour: 'bg-purple-100 text-purple-800' },
  { value: 'sleep-recovery', label: '😴 Sleep & Recovery', colour: 'bg-indigo-100 text-indigo-800' },
  { value: 'water', label: '💧 Hydration', colour: 'bg-cyan-100 text-cyan-800' },
  { value: 'shop', label: '🛒 Shop (→ downscale.shop)', colour: 'bg-orange-100 text-orange-800' },
  { value: 'medication', label: '💊 Medication', colour: 'bg-red-100 text-red-800' }
]

const CONTENT_TYPES: { value: ContentType; label: string; icon: any; description: string }[] = [
  { value: 'video', label: 'Video', icon: Video, description: 'YouTube/Vimeo embeds or direct uploads' },
  { value: 'external_doc', label: 'External Document', icon: ExternalLink, description: 'Research papers, external PDFs' },
  { value: 'downscale_doc', label: 'Downscale Document', icon: FileText, description: 'Clinic-created PDFs, tools, assessments' },
  { value: 'link', label: 'Link', icon: Link, description: 'External resources, podcasts, social posts' },
  { value: 'tool', label: 'Tool', icon: Settings, description: 'Calculators, assessments, trackers' },
  { value: 'program_guide', label: 'Program/Guide', icon: BookOpen, description: 'Multi-week content, step-by-step guides' }
]

export default function PortalContentManager() {
  const [content, setContent] = useState<PortalContent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPillar, setSelectedPillar] = useState<Pillar | 'all'>('all')
  const [selectedType, setSelectedType] = useState<ContentType | 'all'>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingContent, setEditingContent] = useState<PortalContent | null>(null)
  const [previewContent, setPreviewContent] = useState<PortalContent | null>(null)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    pillar: '' as Pillar,
    content_type: '' as ContentType,
    title: '',
    description: '',
    content_data: {},
    tags: [] as string[],
    is_published: false
  })


  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portal_content')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContent((data || []).map(item => ({
        ...item,
        content_data: (item.content_data as unknown) as ContentData
      })))
    } catch (error) {
      console.error('Error loading content:', error)
      toast({
        title: 'Error',
        description: 'Failed to load portal content',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSaveContent = async () => {
    try {
      if (!formData.title || !formData.pillar || !formData.content_type) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in all required fields',
          variant: 'destructive'
        })
        return
      }

      // Require sub-section to ensure portal list visibility
      const subsection = (formData.content_data as any)?.subsection || ''
      if (!subsection.trim()) {
        toast({
          title: 'Sub-section required',
          description: 'Select where this appears (e.g., Research & Journal Articles).',
          variant: 'destructive'
        })
        return
      }

      const contentPayload = {
        ...formData,
        content_data: buildContentData(formData.content_type, formData.content_data)
      }

      if (editingContent) {
        const { error } = await supabase
          .from('portal_content')
          .update(contentPayload)
          .eq('id', editingContent.id)

        if (error) throw error
        toast({ title: 'Success', description: 'Content updated successfully' })
      } else {
        const { error } = await supabase
          .from('portal_content')
          .insert([contentPayload])

        if (error) throw error
        toast({ title: 'Success', description: 'Content created successfully' })
      }

      resetForm()
      loadContent()
    } catch (error) {
      console.error('Error saving content:', error)
      toast({
        title: 'Error',
        description: 'Failed to save content',
        variant: 'destructive'
      })
    }
  }

  const buildContentData = (type: ContentType, data: any) => {
    let base: any
    switch (type) {
      case 'video':
        base = {
          url: data.url || '',
          duration: data.duration || '',
          thumbnail_url: data.thumbnail_url || '',
          is_youtube: data.url?.includes('youtube.com') || data.url?.includes('youtu.be') || false,
          is_vimeo: data.url?.includes('vimeo.com') || false
        }
        break
      case 'external_doc':
        base = {
          url: data.url || '',
          file_type: data.file_type || 'PDF',
          file_size: data.file_size || '',
          source: data.source || ''
        }
        break
      case 'downscale_doc':
        base = {
          file_url: data.file_url || '',
          file_type: data.file_type || 'PDF',
          file_size: data.file_size || '',
          can_export_pdf: true,
          requires_completion: data.requires_completion || false
        }
        break
      case 'link':
        base = {
          url: data.url || '',
          thumbnail_url: data.thumbnail_url || '',
          resource_type: data.resource_type || 'website',
          estimated_read_time: data.estimated_read_time || ''
        }
        break
      case 'tool':
        base = {
          tool_url: data.tool_url || '',
          can_export_pdf: true,
          requires_login: data.requires_login || false,
          estimated_completion_time: data.estimated_completion_time || '',
          tool_type: data.tool_type || 'assessment'
        }
        break
      case 'program_guide':
        base = {
          duration_weeks: data.duration_weeks || '',
          total_steps: data.total_steps || '',
          difficulty_level: data.difficulty_level || 'beginner',
          includes_resources: data.includes_resources || false,
          progress_tracking: true
        }
        break
      default:
        base = data
    }
    // Always include subsection to drive portal placement
    return { ...base, subsection: (data?.subsection || '').toString() }
  }

  const handleDeleteContent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      const { error } = await supabase
        .from('portal_content')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast({ title: 'Success', description: 'Content deleted successfully' })
      loadContent()
    } catch (error) {
      console.error('Error deleting content:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete content',
        variant: 'destructive'
      })
    }
  }

  const handleTogglePublish = async (content: PortalContent) => {
    try {
      const { error } = await supabase
        .from('portal_content')
        .update({ is_published: !content.is_published })
        .eq('id', content.id)

      if (error) throw error
      toast({
        title: 'Success',
        description: `Content ${!content.is_published ? 'published' : 'unpublished'} successfully`
      })
      loadContent()
    } catch (error) {
      console.error('Error toggling publish:', error)
      toast({
        title: 'Error',
        description: 'Failed to update publish status',
        variant: 'destructive'
      })
    }
  }

  const resetForm = () => {
    setFormData({
      pillar: '' as Pillar,
      content_type: '' as ContentType,
      title: '',
      description: '',
      content_data: {},
      tags: [],
      is_published: false
    })
    setEditingContent(null)
    setShowAddForm(false)
  }

  const startEdit = (content: PortalContent) => {
    setFormData({
      pillar: content.pillar,
      content_type: content.content_type,
      title: content.title,
      description: content.description,
      content_data: content.content_data,
      tags: content.tags,
      is_published: content.is_published
    })
    setEditingContent(content)
    setShowAddForm(true)
  }

  const filteredContent = content.filter(item => {
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesPillar = selectedPillar === 'all' || item.pillar === selectedPillar
    const matchesType = selectedType === 'all' || item.content_type === selectedType

    return matchesSearch && matchesPillar && matchesType
  })

  const renderContentForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{editingContent ? 'Edit Content' : 'Add New Content'}</CardTitle>
        <CardDescription>
          Create dynamic content that will appear in the portal sections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pillar">Pillar Section</Label>
            <Select value={formData.pillar} onValueChange={(value: Pillar) => setFormData({ ...formData, pillar: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select pillar section" />
              </SelectTrigger>
              <SelectContent>
                {PILLARS.map(pillar => (
                  <SelectItem key={pillar.value} value={pillar.value}>
                    {pillar.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content_type">Content Type</Label>
            <Select value={formData.content_type} onValueChange={(value: ContentType) => setFormData({ ...formData, content_type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {CONTENT_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

      {/* Sub-section selection (required) */}
      <div>
        <Label htmlFor="subsection">Sub-section</Label>
        <Select value={(formData.content_data as any)?.subsection || ''} onValueChange={(value: string) => setFormData({ ...formData, content_data: { ...formData.content_data, subsection: value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select sub-section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Guides">Guides</SelectItem>
            <SelectItem value="Research & Journal Articles">Research & Journal Articles</SelectItem>
            <SelectItem value="Product Information">Product Information</SelectItem>
            <SelectItem value="Videos and Video Links">Videos and Video Links</SelectItem>
            <SelectItem value="Podcast Links">Podcast Links</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
            <SelectItem value="Tools">Tools</SelectItem>
          </SelectContent>
        </Select>
      </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter content title"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter content description"
            rows={3}
          />
        </div>

        {/* Content-specific fields */}
        {formData.content_type === 'video' && (
          <div>
            <Label htmlFor="video_url">Video URL</Label>
            <Input
              id="video_url"
              value={(formData.content_data as VideoContent).url || ''}
              onChange={(e) => setFormData({
                ...formData,
                content_data: { ...formData.content_data, url: e.target.value }
              })}
              placeholder="YouTube, Vimeo, or direct video URL"
            />
          </div>
        )}

        {(formData.content_type === 'external_doc' || formData.content_type === 'link') && (
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={(formData.content_data as ExternalDocContent | LinkContent).url || ''}
              onChange={(e) => setFormData({
                ...formData,
                content_data: { ...formData.content_data, url: e.target.value }
              })}
              placeholder="External URL"
            />
          </div>
        )}

        {formData.content_type === 'downscale_doc' && (
          <div>
            <Label htmlFor="file_url">File URL</Label>
            <Input
              id="file_url"
              value={(formData.content_data as DownscaleDocContent).file_url || ''}
              onChange={(e) => setFormData({
                ...formData,
                content_data: { ...formData.content_data, file_url: e.target.value }
              })}
              placeholder="Upload file first, then enter URL"
            />
          </div>
        )}

        {formData.content_type === 'tool' && (
          <div>
            <Label htmlFor="tool_url">Tool URL</Label>
            <Input
              id="tool_url"
              value={(formData.content_data as ToolContent).tool_url || ''}
              onChange={(e) => setFormData({
                ...formData,
                content_data: { ...formData.content_data, tool_url: e.target.value }
              })}
              placeholder="Internal tool URL or embed code"
            />
          </div>
        )}

        {formData.content_type === 'program_guide' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration_weeks">Duration (weeks)</Label>
              <Input
                id="duration_weeks"
                value={(formData.content_data as ProgramGuideContent).duration_weeks || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  content_data: { ...formData.content_data, duration_weeks: e.target.value }
                })}
                placeholder="e.g., 8"
              />
            </div>
            <div>
              <Label htmlFor="total_steps">Total Steps</Label>
              <Input
                id="total_steps"
                value={(formData.content_data as ProgramGuideContent).total_steps || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  content_data: { ...formData.content_data, total_steps: e.target.value }
                })}
                placeholder="e.g., 56"
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="tags">Tags</Label>
          <TagsInput
            value={formData.tags}
            onChange={(tags) => setFormData({ ...formData, tags })}
            placeholder="Add a tag (press Enter or Comma)"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
              className="rounded"
            />
            Publish immediately
          </label>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSaveContent}>
            {editingContent ? 'Update Content' : 'Create Content'}
          </Button>
          <Button variant="outline" onClick={resetForm}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Portal Content Manager</h2>
          <p className="text-muted-foreground">
            Manage dynamic content for all portal sections
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Content
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Select value={selectedPillar} onValueChange={(value: Pillar | 'all') => setSelectedPillar(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Pillars" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pillars</SelectItem>
                {PILLARS.map(pillar => (
                  <SelectItem key={pillar.value} value={pillar.value}>
                    {pillar.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={(value: ContentType | 'all') => setSelectedType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {CONTENT_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && renderContentForm()}

      {/* Content List */}
      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-8">Loading content...</div>
        ) : filteredContent.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No content found</p>
          </div>
        ) : (
          filteredContent.map((item) => {
            const pillar = PILLARS.find(p => p.value === item.pillar)
            const contentType = CONTENT_TYPES.find(t => t.value === item.content_type)

            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={pillar?.colour}>
                          {pillar?.label}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {contentType?.icon && <contentType.icon className="w-3 h-3" />}
                          {contentType?.label}
                        </Badge>
                        {item.is_published ? (
                          <Badge className="bg-green-100 text-green-800">Published</Badge>
                        ) : (
                          <Badge variant="secondary">Draft</Badge>
                        )}
                      </div>

                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>

                      {item.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(item.created_at).toLocaleDateString('en-AU')}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {item.view_count} views
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPreviewContent(item)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTogglePublish(item)}
                      >
                        {item.is_published ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteContent(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Portal Content Preview Modal */}
      {previewContent && (
        <PortalContentPreview
          content={previewContent}
          isOpen={!!previewContent}
          onClose={() => setPreviewContent(null)}
        />
      )}
    </div>
  )
}