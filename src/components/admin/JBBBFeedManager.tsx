'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/integrations/supabase/client'
import { Plus, Heart, MessageCircle, Calendar, TrendingUp, Edit, Trash2, Eye, EyeOff, Image, Send, User } from 'lucide-react'

interface JBBBFeedPost {
  id: string
  title: string
  content: string
  media_urls: string[]
  tags: string[]
  author: 'JB' | 'BB'
  is_published: boolean
  created_at: string
  updated_at: string
  view_count: number
}

export default function JBBBFeedManager() {
  const [posts, setPosts] = useState<JBBBFeedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState<'JB' | 'BB' | 'all'>('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPost, setEditingPost] = useState<JBBBFeedPost | null>(null)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    media_urls: [] as string[],
    tags: [] as string[],
    author: 'JB' as 'JB' | 'BB',
    is_published: false
  })

  const [newMediaUrl, setNewMediaUrl] = useState('')

  const supabase = createClient()

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('jb_bb_feed')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error loading posts:', error)
      toast({
        title: 'Error',
        description: 'Failed to load JB&BB Feed posts',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSavePost = async () => {
    try {
      if (!formData.title || !formData.content || !formData.author) {
        toast({
          title: 'Validation Error',
          description: 'Please fill in title, content, and author',
          variant: 'destructive'
        })
        return
      }

      if (editingPost) {
        const { error } = await supabase
          .from('jb_bb_feed')
          .update(formData)
          .eq('id', editingPost.id)

        if (error) throw error
        toast({ title: 'Success', description: 'Post updated successfully' })
      } else {
        const { error } = await supabase
          .from('jb_bb_feed')
          .insert([formData])

        if (error) throw error
        toast({ title: 'Success', description: 'Post created successfully' })
      }

      resetForm()
      loadPosts()
    } catch (error) {
      console.error('Error saving post:', error)
      toast({
        title: 'Error',
        description: 'Failed to save post',
        variant: 'destructive'
      })
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const { error } = await supabase
        .from('jb_bb_feed')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast({ title: 'Success', description: 'Post deleted successfully' })
      loadPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive'
      })
    }
  }

  const handleTogglePublish = async (post: JBBBFeedPost) => {
    try {
      const { error } = await supabase
        .from('jb_bb_feed')
        .update({ is_published: !post.is_published })
        .eq('id', post.id)

      if (error) throw error
      toast({
        title: 'Success',
        description: `Post ${!post.is_published ? 'published' : 'unpublished'} successfully`
      })
      loadPosts()
    } catch (error) {
      console.error('Error toggling publish:', error)
      toast({
        title: 'Error',
        description: 'Failed to update publish status',
        variant: 'destructive'
      })
    }
  }

  const addMediaUrl = () => {
    if (newMediaUrl.trim()) {
      setFormData({
        ...formData,
        media_urls: [...formData.media_urls, newMediaUrl.trim()]
      })
      setNewMediaUrl('')
    }
  }

  const removeMediaUrl = (index: number) => {
    setFormData({
      ...formData,
      media_urls: formData.media_urls.filter((_, i) => i !== index)
    })
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      media_urls: [],
      tags: [],
      author: 'JB',
      is_published: false
    })
    setEditingPost(null)
    setShowAddForm(false)
    setNewMediaUrl('')
  }

  const startEdit = (post: JBBBFeedPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      media_urls: post.media_urls,
      tags: post.tags,
      author: post.author,
      is_published: post.is_published
    })
    setEditingPost(post)
    setShowAddForm(true)
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesAuthor = selectedAuthor === 'all' || post.author === selectedAuthor

    return matchesSearch && matchesAuthor
  })

  const getAuthorInfo = (author: 'JB' | 'BB') => {
    return author === 'JB'
      ? { name: 'Dr JB', colour: 'bg-blue-100 text-blue-800', avatar: '👨‍⚕️' }
      : { name: 'Bec', colour: 'bg-purple-100 text-purple-800', avatar: '👩‍⚕️' }
  }

  const renderPostForm = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          {editingPost ? 'Edit JB&BB Feed Post' : 'Create New JB&BB Feed Post'}
        </CardTitle>
        <CardDescription>
          Share personal insights and updates with your patients through the internal JB&BB Feed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="author">Author</Label>
            <Select value={formData.author} onValueChange={(value: 'JB' | 'BB') => setFormData({ ...formData, author: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JB">
                  <div className="flex items-center gap-2">
                    <span>👨‍⚕️</span>
                    Dr JB
                  </div>
                </SelectItem>
                <SelectItem value="BB">
                  <div className="flex items-center gap-2">
                    <span>👩‍⚕️</span>
                    Bec
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4 pt-6">
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
        </div>

        <div>
          <Label htmlFor="title">Post Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter a compelling title for your post"
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Share your insights, tips, or personal updates with patients..."
            rows={6}
          />
        </div>

        <div>
          <Label>Media URLs (Images/Videos)</Label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Input
                value={newMediaUrl}
                onChange={(e) => setNewMediaUrl(e.target.value)}
                placeholder="Add image or video URL"
              />
              <Button type="button" onClick={addMediaUrl} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.media_urls.length > 0 && (
              <div className="space-y-1">
                {formData.media_urls.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <Image className="w-4 h-4" />
                    <span className="flex-1 text-sm truncate">{url}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMediaUrl(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags.join(', ')}
            onChange={(e) => setFormData({
              ...formData,
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
            })}
            placeholder="e.g., motivation, weight loss, meal prep, patient success"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSavePost} className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            {editingPost ? 'Update Post' : 'Create Post'}
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
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            JB&BB Feed Manager
          </h2>
          <p className="text-muted-foreground">
            Internal blog for personal patient connection and insights
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={selectedAuthor} onValueChange={(value: 'JB' | 'BB' | 'all') => setSelectedAuthor(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Authors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Authors</SelectItem>
                <SelectItem value="JB">
                  <div className="flex items-center gap-2">
                    <span>👨‍⚕️</span>
                    Dr JB
                  </div>
                </SelectItem>
                <SelectItem value="BB">
                  <div className="flex items-center gap-2">
                    <span>👩‍⚕️</span>
                    Bec
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      {showAddForm && renderPostForm()}

      {/* Posts Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-sm text-muted-foreground">Total Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{posts.filter(p => p.is_published).length}</div>
            <p className="text-sm text-muted-foreground">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{posts.filter(p => p.author === 'JB').length}</div>
            <p className="text-sm text-muted-foreground">JB Posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{posts.filter(p => p.author === 'BB').length}</div>
            <p className="text-sm text-muted-foreground">Bec Posts</p>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts found</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const authorInfo = getAuthorInfo(post.author)

            return (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={authorInfo.colour}>
                          <User className="w-3 h-3 mr-1" />
                          {authorInfo.name}
                        </Badge>
                        {post.is_published ? (
                          <Badge className="bg-green-100 text-green-800">
                            <Eye className="w-3 h-3 mr-1" />
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <EyeOff className="w-3 h-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-semibold text-lg">{post.title}</h3>

                      <p className="text-muted-foreground line-clamp-3">
                        {post.content}
                      </p>

                      {post.media_urls.length > 0 && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Image className="w-4 h-4" />
                          {post.media_urls.length} media file{post.media_urls.length !== 1 ? 's' : ''}
                        </div>
                      )}

                      {post.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString('en-AU')}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {post.view_count} views
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTogglePublish(post)}
                      >
                        {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {post.is_published ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(post)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
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
    </div>
  )
}