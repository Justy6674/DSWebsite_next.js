'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createClient } from '@/integrations/supabase/client'
import { Search, FileText, Video, Link, Tool, BookOpen, ExternalLink, Calendar, TrendingUp, Heart, User, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  title: string
  description: string
  content_type: 'portal_content' | 'jb_bb_feed'
  pillar?: string
  sub_type?: string
  tags: string[]
  created_at: string
  view_count: number
  author?: string
  is_published: boolean
  content_data?: any
  content?: string
}

const CONTENT_TYPE_ICONS = {
  video: Video,
  external_doc: ExternalLink,
  downscale_doc: FileText,
  link: Link,
  tool: Tool,
  program_guide: BookOpen,
  jb_bb_feed: Heart
}

const PILLAR_COLOURS = {
  nutrition: 'bg-green-100 text-green-800',
  activity: 'bg-blue-100 text-blue-800',
  'mental-health': 'bg-purple-100 text-purple-800',
  'sleep-recovery': 'bg-indigo-100 text-indigo-800',
  shop: 'bg-orange-100 text-orange-800'
}

export default function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])

  const supabase = createClient()
  const router = useRouter()

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('portal-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length < 2) {
        setSearchResults([])
        return
      }

      setLoading(true)
      await performSearch(query)
      setLoading(false)
    }, 300),
    []
  )

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      debouncedSearch(searchQuery)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, debouncedSearch])

  // Load search suggestions
  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      loadSearchSuggestions(searchQuery)
    } else {
      setSearchSuggestions([])
    }
  }, [searchQuery])

  const performSearch = async (query: string) => {
    try {
      // Log the search
      await logSearch(query)

      // Search portal content
      const { data: portalData, error: portalError } = await supabase
        .from('portal_content')
        .select('*')
        .eq('is_published', true)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
        .order('view_count', { ascending: false })
        .limit(20)

      if (portalError) throw portalError

      // Search JB&BB Feed
      const { data: feedData, error: feedError } = await supabase
        .from('jb_bb_feed')
        .select('*')
        .eq('is_published', true)
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,tags.cs.{${query}}`)
        .order('created_at', { ascending: false })
        .limit(20)

      if (feedError) throw feedError

      // Combine and format results
      const portalResults: SearchResult[] = (portalData || []).map(item => ({
        ...item,
        content_type: 'portal_content' as const,
        sub_type: item.content_type,
        description: item.description || ''
      }))

      const feedResults: SearchResult[] = (feedData || []).map(item => ({
        ...item,
        content_type: 'jb_bb_feed' as const,
        sub_type: 'jb_bb_feed',
        description: item.content.substring(0, 200) + '...'
      }))

      // Sort by relevance (exact title matches first, then by view count)
      const allResults = [...portalResults, ...feedResults].sort((a, b) => {
        const aExactMatch = a.title.toLowerCase().includes(query.toLowerCase())
        const bExactMatch = b.title.toLowerCase().includes(query.toLowerCase())

        if (aExactMatch && !bExactMatch) return -1
        if (!aExactMatch && bExactMatch) return 1

        return b.view_count - a.view_count
      })

      setSearchResults(allResults)

      // Save to recent searches
      if (query.trim() && !recentSearches.includes(query.trim())) {
        const updated = [query.trim(), ...recentSearches.slice(0, 4)]
        setRecentSearches(updated)
        localStorage.setItem('portal-recent-searches', JSON.stringify(updated))
      }

    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const loadSearchSuggestions = async (query: string) => {
    try {
      // Get popular tags that match the query
      const { data: portalTags } = await supabase
        .from('portal_content')
        .select('tags')
        .eq('is_published', true)

      const { data: feedTags } = await supabase
        .from('jb_bb_feed')
        .select('tags')
        .eq('is_published', true)

      const allTags = new Set<string>()

      ;[...(portalTags || []), ...(feedTags || [])].forEach(item => {
        item.tags.forEach((tag: string) => {
          if (tag.toLowerCase().includes(query.toLowerCase())) {
            allTags.add(tag)
          }
        })
      })

      setSearchSuggestions(Array.from(allTags).slice(0, 5))
    } catch (error) {
      console.error('Error loading suggestions:', error)
    }
  }

  const logSearch = async (query: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      await supabase.rpc('log_search', {
        p_query: query,
        p_results_count: 0, // Will be updated after search
        p_user_id: user?.id || null
      })
    } catch (error) {
      console.error('Error logging search:', error)
    }
  }

  const trackContentView = async (result: SearchResult) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      await supabase.rpc('track_content_view', {
        p_content_type: result.content_type,
        p_content_id: result.id,
        p_user_id: user?.id || null
      })
    } catch (error) {
      console.error('Error tracking view:', error)
    }
  }

  const handleResultClick = async (result: SearchResult) => {
    await trackContentView(result)

    if (result.content_type === 'jb_bb_feed') {
      // Navigate to JB&BB Feed with highlight
      router.push(`/portal/jb-bb-feed?highlight=${result.id}`)
    } else {
      // Navigate to appropriate pillar section
      router.push(`/portal/${result.pillar}?highlight=${result.id}`)
    }

    setIsSearchVisible(false)
    setSearchQuery('')
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setSearchSuggestions([])
  }

  const renderSearchResult = (result: SearchResult) => {
    const IconComponent = CONTENT_TYPE_ICONS[result.sub_type as keyof typeof CONTENT_TYPE_ICONS] || FileText
    const pillarColour = result.pillar ? PILLAR_COLOURS[result.pillar as keyof typeof PILLAR_COLOURS] : ''

    return (
      <Card
        key={result.id}
        className="cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-muted/50"
        onClick={() => handleResultClick(result)}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <IconComponent className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-sm leading-5 line-clamp-2">
                  {highlightSearchTerm(result.title, searchQuery)}
                </h3>
                <div className="flex-shrink-0 flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  {result.view_count}
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {highlightSearchTerm(result.description, searchQuery)}
              </p>

              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {result.content_type === 'jb_bb_feed' ? (
                  <Badge className="bg-pink-100 text-pink-800 text-xs">
                    <Heart className="w-3 h-3 mr-1" />
                    JB&BB Feed
                  </Badge>
                ) : (
                  result.pillar && (
                    <Badge className={`${pillarColour} text-xs`}>
                      {result.pillar.replace('-', ' ')}
                    </Badge>
                  )
                )}

                {result.author && (
                  <Badge variant="outline" className="text-xs">
                    <User className="w-3 h-3 mr-1" />
                    {result.author}
                  </Badge>
                )}

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(result.created_at).toLocaleDateString('en-AU')}
                </div>
              </div>

              {result.tags.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {result.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {result.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{result.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search everything in the portal..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchVisible(true)}
          className="pl-10 pr-10 bg-background/95 backdrop-blur"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isSearchVisible && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <Card className="max-h-96 overflow-y-auto shadow-lg border">
            <CardContent className="p-3 space-y-2">
              {loading ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  Searching...
                </div>
              ) : searchQuery.trim().length < 2 ? (
                <div className="space-y-3">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2">Recent Searches</h4>
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => setSearchQuery(search)}
                            className="justify-start text-xs h-8 w-full"
                          >
                            <Search className="w-3 h-3 mr-2" />
                            {search}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Tags */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">Popular Topics</h4>
                    <div className="flex gap-1 flex-wrap">
                      {['weight loss', 'meal planning', 'exercise', 'mental health', 'sleep'].map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer text-xs hover:bg-muted"
                          onClick={() => setSearchQuery(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">No results found for "{searchQuery}"</p>

                  {/* Search Suggestions */}
                  {searchSuggestions.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">Try these related topics:</p>
                      <div className="flex gap-1 flex-wrap justify-center">
                        {searchSuggestions.map((suggestion) => (
                          <Badge
                            key={suggestion}
                            variant="outline"
                            className="cursor-pointer text-xs hover:bg-muted"
                            onClick={() => setSearchQuery(suggestion)}
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-muted-foreground mb-2">
                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                  </div>
                  {searchResults.map(renderSearchResult)}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop to close search */}
      {isSearchVisible && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsSearchVisible(false)}
        />
      )}
    </div>
  )
}

// Utility function to highlight search terms
function highlightSearchTerm(text: string, searchTerm: string): React.ReactNode {
  if (!searchTerm.trim()) return text

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-yellow-200 dark:bg-yellow-700 px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}