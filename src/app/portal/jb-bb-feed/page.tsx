'use client'

import React, { useState, useEffect } from 'react'
import PortalLayout from '@/components/portal/PortalLayout'
import GlobalSearch from '@/components/portal/GlobalSearch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/integrations/supabase/client'
import {
  Heart,
  Calendar,
  TrendingUp,
  User,
  Bell,
  BellOff,
  Image,
  Play,
  MessageCircle,
  Clock
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface JBBBFeedPost {
  id: string
  title: string
  content: string
  media_urls: string[]
  tags: string[]
  author: 'JB' | 'BB'
  is_published: boolean
  created_at: string
  view_count: number
}

export default function JBBBFeedPage() {
  const [posts, setPosts] = useState<JBBBFeedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [selectedAuthor, setSelectedAuthor] = useState<'all' | 'JB' | 'BB'>('all')
  const searchParams = useSearchParams()
  const highlightId = searchParams.get('highlight')


  useEffect(() => {
    loadPosts()
    loadNotificationPreferences()
  }, [])

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('jb_bb_feed')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadNotificationPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('patient_notifications')
        .select('jb_bb_feed_alerts')
        .eq('user_id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      setNotificationsEnabled(data?.jb_bb_feed_alerts || false)
    } catch (error) {
      console.error('Error loading notification preferences:', error)
    }
  }

  const toggleNotifications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const newState = !notificationsEnabled

      const { error } = await supabase
        .from('patient_notifications')
        .upsert({
          user_id: user.id,
          jb_bb_feed_alerts: newState
        })

      if (error) throw error
      setNotificationsEnabled(newState)
    } catch (error) {
      console.error('Error updating notifications:', error)
    }
  }

  const trackPostView = async (postId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      await supabase.rpc('track_content_view', {
        p_content_type: 'jb_bb_feed',
        p_content_id: postId,
        p_user_id: user?.id || null
      })
    } catch (error) {
      console.error('Error tracking view:', error)
    }
  }

  const handlePostClick = async (post: JBBBFeedPost) => {
    await trackPostView(post.id)
    // Mark as viewed - could expand post content or navigate to detail view
  }

  const getAuthorInfo = (author: 'JB' | 'BB') => {
    return author === 'JB'
      ? { name: 'Dr JB', colour: 'bg-blue-100 text-blue-800', avatar: '👨‍⚕️' }
      : { name: 'Bec', colour: 'bg-purple-100 text-purple-800', avatar: '👩‍⚕️' }
  }

  const formatPostContent = (content: string) => {
    // Simple formatting for line breaks and links
    return content
      .split('\n')
      .map((line, index) => (
        <p key={index} className="mb-2 last:mb-0">
          {line}
        </p>
      ))
  }

  const filteredPosts = selectedAuthor === 'all'
    ? posts
    : posts.filter(post => post.author === selectedAuthor)

  const renderPost = (post: JBBBFeedPost) => {
    const authorInfo = getAuthorInfo(post.author)
    const isHighlighted = highlightId === post.id

    return (
      <Card
        key={post.id}
        className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
          isHighlighted ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}
        onClick={() => handlePostClick(post)}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{authorInfo.avatar}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{authorInfo.name}</h3>
                  <Badge className={authorInfo.colour} variant="secondary">
                    {post.author}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString('en-AU', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              {post.view_count}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-lg mb-2">{post.title}</h4>
            <div className="text-muted-foreground leading-relaxed">
              {formatPostContent(post.content)}
            </div>
          </div>

          {/* Media attachments */}
          {post.media_urls.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium flex items-center gap-2">
                <Image className="w-4 h-4" />
                Media ({post.media_urls.length})
              </h5>
              <div className="grid grid-cols-2 gap-2">
                {post.media_urls.slice(0, 4).map((url, index) => (
                  <div
                    key={index}
                    className="bg-muted rounded-lg p-3 text-sm flex items-center gap-2 hover:bg-muted/80 transition-colors"
                  >
                    {url.includes('video') || url.includes('youtube') || url.includes('vimeo') ? (
                      <Play className="w-4 h-4" />
                    ) : (
                      <Image className="w-4 h-4" />
                    )}
                    <span className="truncate">Media {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <PortalLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-lg bg-pink-100">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
            <h1 className="text-3xl font-bold">JB&BB Feed</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Personal insights, tips, and updates from Dr JB and Bec to support your weight management journey
          </p>

          {/* Notification toggle */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant={notificationsEnabled ? 'default' : 'outline'}
              size="sm"
              onClick={toggleNotifications}
              className="flex items-center gap-2"
            >
              {notificationsEnabled ? (
                <>
                  <Bell className="w-4 h-4" />
                  Notifications On
                </>
              ) : (
                <>
                  <BellOff className="w-4 h-4" />
                  Get Notified of New Posts
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Global Search */}
        <div className="max-w-md mx-auto">
          <GlobalSearch />
        </div>

        {/* Author Filter */}
        <div className="flex justify-center gap-3">
          <Button
            variant={selectedAuthor === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedAuthor('all')}
            className="flex items-center gap-2"
          >
            All Posts ({posts.length})
          </Button>
          <Button
            variant={selectedAuthor === 'JB' ? 'default' : 'outline'}
            onClick={() => setSelectedAuthor('JB')}
            className="flex items-center gap-2"
          >
            👨‍⚕️ Dr JB ({posts.filter(p => p.author === 'JB').length})
          </Button>
          <Button
            variant={selectedAuthor === 'BB' ? 'default' : 'outline'}
            onClick={() => setSelectedAuthor('BB')}
            className="flex items-center gap-2"
          >
            👩‍⚕️ Bec ({posts.filter(p => p.author === 'BB').length})
          </Button>
        </div>

        {/* Posts */}
        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">
                Dr JB and Bec will share personal insights and updates here soon.
              </p>
            </div>
          ) : (
            filteredPosts.map(renderPost)
          )}
        </div>

        {/* Footer info */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                  <h4 className="font-medium">About the JB&BB Feed</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is an internal member-only blog where Dr JB and Bec share personal insights,
                  behind-the-scenes clinic updates, patient success stories (with permission),
                  and real-time advice to support your weight management journey.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  )
}