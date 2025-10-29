# Patient Portal Mobile-First Navigation Redesign
## Product Requirements Document (PRD)

**Version**: 3.0  
**Date**: January 2025  
**Author**: Claude Code Assistant  
**Project**: Downscale Weight Loss Clinic Portal System  
**Status**: Ready for Implementation

---

## Executive Summary

The current patient portal navigation is architected for desktop users, creating significant friction for 80% of users accessing via mobile devices. This PRD outlines a complete mobile-first redesign that reduces content access from 5 taps to 2 taps while maintaining desktop functionality and the existing dark theme UI.

### Key Metrics
- **Current Mobile Journey**: 5 taps to reach content
- **Proposed Mobile Journey**: 2 taps to reach content
- **User Base**: 80% mobile, 20% desktop
- **Success Metric**: Reduce time-to-content by 60%
- **UI Theme**: Dark theme preserved (bg-[#334155], slate-800, #b68a71 accent)

---

## Problem Statement

### Current Issues (Desktop-First Architecture)

**Current Mobile User Journey:**
1. Open Portal → 2. Tap Hamburger Menu → 3. Tap 'Medication' → 4. View 7 Cards → 5. Tap 'Guides' → 6. Finally See Content

**Problems Identified:**
1. **Fixed Left Sidebar**: Wastes precious mobile screen real estate (320px on mobile)
2. **Deep Navigation Hierarchy**: 5-tap journey creates friction
3. **Redundant Card Grids**: Sub-sections show empty cards instead of actionable navigation
4. **Desktop-First Patterns**: Mobile treated as afterthought
5. **Content Discovery Friction**: Users must navigate through multiple layers

### User Impact Analysis

| User Action | Current Taps | Proposed Taps | Improvement |
|-------------|--------------|---------------|-------------|
| Access Medication Guides | 5 | 2 | 60% reduction |
| Find Sleep Resources | 5 | 2 | 60% reduction |
| Use Portal Tools | 6 | 2 | 67% reduction |
| Search Content | 3 | 1 | 67% reduction |

---

## Solution Overview

### Mobile-First Navigation Architecture

**New Mobile User Journey:**
1. Open Portal → 2. Tap 'Medication' Bottom Tab → 3. See Sub-Dashboard with 7 Cards → 4. Tap 'Guides' Card → 5. View Content List

**Proposed Navigation:**
- **Mobile (80%)**: Bottom tab navigation (5 tabs max)
- **Desktop (20%)**: Left sidebar (existing, enhanced)
- **Sub-Dashboards**: All pillar pages show 7 content category cards
- **Content Lists**: Direct access to actual content after card selection

### Core Design Principles

1. **Mobile-First**: Design for 80% mobile users, adapt for desktop
2. **Thumb-Friendly**: Bottom navigation within thumb reach (44px minimum)
3. **Progressive Disclosure**: Show relevant information at each level
4. **Dark Theme Consistency**: Maintain existing dark slate (#334155) and bronze (#b68a71) theme
5. **Fast Access**: Minimize taps to content (2 taps maximum)
6. **Familiar Patterns**: Match iOS/Android navigation expectations

---

## Current UI Analysis (From Screenshots)

### Existing Design System

Based on the current portal UI:

**Color Palette:**
- **Primary Background**: `bg-[#334155]` (Slate dark)
- **Card Background**: `bg-slate-800` (Dark slate cards)
- **Accent Color**: `#b68a71` (Bronze/brown - buttons, active states)
- **Text Primary**: `text-[#f8fafc]` (Light foreground)
- **Text Secondary**: `text-[#fef5e7]` (Cream text)
- **Border**: `border-slate-700` (Subtle borders)

**Current Component Patterns:**
- Dark cards with rounded-xl borders
- Bronze accent for active states and hover
- Icon + text navigation items
- Consistent spacing and typography

### UI Elements to Preserve

1. **Dark Theme**: Maintain all dark background colors
2. **Card Design**: Keep existing slate-800 cards with borders
3. **Bronze Accents**: Continue using #b68a71 for interactive elements
4. **Typography**: Maintain current font hierarchy
5. **Icons**: Keep Lucide React icon system
6. **Top Bar**: Preserve search + profile layout

---

## Navigation Architecture

### Primary Navigation (Mobile - 80% Users)

**Bottom Tab Bar Specification:**

```
┌────────────────────────────────────────────┐
│  [🏠 Dashboard] [💊 Medication] [🥗 Nutrition] │
│  [🏃 Activity] [⋯ More ▼]                    │
└────────────────────────────────────────────┘
```

**Tab Configuration:**
- **Tab 1**: Dashboard (Home icon)
- **Tab 2**: Medication (Pill icon)
- **Tab 3**: Nutrition (UtensilsCrossed icon)
- **Tab 4**: Activity (Activity icon)
- **Tab 5**: More (Menu icon) - Contains: Mental Health, Sleep, Water

**Technical Specifications:**
- **Position**: Fixed bottom with safe-area-inset-bottom
- **Height**: 64px (16px padding top/bottom, 44px content)
- **Touch Targets**: Minimum 44px × 44px per tab
- **Active State**: `#b68a71` text and icon tint
- **Inactive State**: `text-slate-400` with subtle opacity
- **Background**: `bg-slate-800` with `border-t border-slate-700`

### Secondary Navigation (Desktop - 20% Users)

**Left Sidebar Configuration:**
- **Width**: 320px (lg:w-80)
- **Visibility**: Hidden on mobile, visible on desktop (lg:flex)
- **Background**: `bg-slate-800` with `border-r border-slate-700`
- **Maintain**: Existing expand/collapse functionality
- **Enhance**: Add visual indicators for sub-dashboard structure

### Responsive Breakpoints

```typescript
// Mobile: < 768px - Bottom tabs only
// Tablet: 768px - 1024px - Bottom tabs + collapsible sidebar
// Desktop: > 1024px - Sidebar only (no bottom tabs)
```

---

## Information Architecture

### Three-Layer Hierarchy

```
Layer 1: Dashboard
├── Quick Actions (Water tracking, Health metrics)
├── Recent Content
├── Pillar Navigation Cards
└── Saved Resources

Layer 2: Pillar Sub-Dashboard (e.g., /portal/medication)
├── 📖 Guides [3 items]
├── 📚 Research & Journal Articles [12 items]
├── 💊 Product Information [5 items]
├── 🎥 Videos and Video Links [8 items]
├── 🎙️ Podcast Links [4 items]
├── 🔧 Tools [3 items]
└── 📋 Other [2 items]

Layer 3: Content List (e.g., /portal/medication/guides)
├── "Getting Started with GLP-1 Medications" [PDF] 📄
├── "Understanding Side Effects" [Video] ▶️
├── "Dosage Guidelines" [PDF] 📄
└── Search/Filter Options
```

### Standard 7 Sub-Sections (All Pillars)

Every health pillar follows this consistent structure:

1. **Guides** (`/portal/[pillar]/guides`)
   - Step-by-step educational guides
   - PDFs, interactive guides, downloadable content
   - Icon: BookOpen

2. **Research & Journal Articles** (`/portal/[pillar]/research`)
   - Evidence-based research papers
   - Peer-reviewed studies, journal articles
   - Icon: FileText

3. **Product Information** (`/portal/[pillar]/products`)
   - Product details and recommendations
   - Medication info, supplement guides
   - Icon: Package

4. **Videos and Video Links** (`/portal/[pillar]/videos`)
   - Educational videos and external video resources
   - YouTube embeds, instructional content
   - Icon: Video

5. **Podcast Links** (`/portal/[pillar]/podcasts`)
   - Audio content and podcast recommendations
   - External podcast links, audio resources
   - Icon: Podcast (or Radio)

6. **Tools** (`/portal/[pillar]/tools`)
   - Interactive calculators, assessments, trackers
   - Also available on Dashboard
   - Icon: Settings

7. **Other** (`/portal/[pillar]/other`)
   - Additional resources and miscellaneous content
   - Various content types
   - Icon: File

---

## Visual Design Specifications

### Mobile Layout (< 768px)

```
┌──────────────────────────────────────┐
│  Top Bar: Search + Profile (64px)     │
├──────────────────────────────────────┤
│  Section Header + Description         │
│  💊 Medication Hub                     │
│  Evidence-based GLP-1 resources      │
├──────────────────────────────────────┤
│  Content Grid: 2 columns              │
│  ┌──────────┐  ┌──────────┐          │
│  │ 📖 Guides│  │ 📚 Research│          │
│  │ [3 items]│  │ [12 items]│          │
│  └──────────┘  └──────────┘          │
│  ┌──────────┐  ┌──────────┐          │
│  │ 💊 Products│  │ 🎥 Videos│          │
│  │ [5 items]│  │ [8 items]│          │
│  └──────────┘  └──────────┘          │
│  ┌──────────┐  ┌──────────┐          │
│  │ 🎙️ Podcasts│  │ 🔧 Tools │          │
│  │ [4 items]│  │ [3 items]│          │
│  └──────────┘  └──────────┘          │
│  ┌─────────────────────────┐          │
│  │ 📋 Other [2 items]      │          │
│  └─────────────────────────┘          │
├──────────────────────────────────────┤
│  Bottom Tab Navigation (64px)         │
│  [Dashboard][Medication][Nutrition]  │
│  [Activity][More ▼]                  │
└──────────────────────────────────────┘
```

**Mobile Card Specifications:**
- **Grid**: 2 columns with gap-4
- **Card Size**: Minimum 140px × 120px
- **Card Background**: `bg-slate-800` with `border border-slate-700`
- **Hover State**: `hover:border-[#b68a71]` transition
- **Padding**: p-4 inside cards
- **Typography**: Text-sm for descriptions, text-base for titles
- **Item Count Badge**: Small badge showing "[X items]"

### Desktop Layout (≥ 1024px)

```
┌──────────────┬────────────────────────────────────┐
│ LEFT SIDEBAR │  MAIN CONTENT AREA                  │
│ (320px)      │                                      │
│              │  Top Bar: Search + Profile          │
│ Dashboard    │                                      │
│ Medication   │  💊 Medication Hub                   │
│ Nutrition    │  Evidence-based GLP-1 resources    │
│ Activity     │                                      │
│ Mental Health│  Content Grid: 3 columns             │
│ Sleep        │  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│ Water        │  │ Guides   │ │ Research│ │Products ││
│              │  │ [3 items]│ │ [12]    │ │ [5]     ││
│ Admin Panel  │  └─────────┘ └─────────┘ └─────────┘│
│ Back to Site │  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│              │  │ Videos  │ │ Podcasts│ │ Tools   ││
│              │  │ [8]     │ │ [4]     │ │ [3]     ││
│              │  └─────────┘ └─────────┘ └─────────┘│
│              │  ┌─────────────────────────┐        │
│              │  │ Other [2 items]         │        │
│              │  └─────────────────────────┘        │
└──────────────┴────────────────────────────────────┘
```

**Desktop Card Specifications:**
- **Grid**: 3-4 columns (responsive based on viewport)
- **Card Size**: Minimum 180px × 160px
- **Same styling**: Maintains dark theme consistency

---

## Technical Implementation

### File Structure (Next.js App Router)

```
src/app/portal/
├── layout.tsx                    # Portal layout wrapper
├── page.tsx                      # Main Dashboard
│
├── components/                    # Portal-specific components
│   ├── MobileBottomNav.tsx       # Mobile bottom tab navigation
│   ├── DesktopSidebar.tsx        # Desktop sidebar (enhanced)
│   ├── SubDashboard.tsx          # Sub-dashboard card grid
│   ├── SubSectionCard.tsx        # Individual sub-section card
│   ├── ContentList.tsx           # Content list component
│   ├── ContentItem.tsx           # Individual content item
│   └── SectionHeader.tsx          # Pillar section header
│
├── medication/
│   ├── layout.tsx               # Medication section layout
│   ├── page.tsx                 # Medication sub-dashboard (7 cards)
│   ├── guides/
│   │   └── page.tsx            # Guides content list
│   ├── research/
│   │   └── page.tsx            # Research content list
│   ├── products/
│   │   └── page.tsx            # Products content list
│   ├── videos/
│   │   └── page.tsx            # Videos content list
│   ├── podcasts/
│   │   └── page.tsx            # Podcasts content list
│   ├── tools/
│   │   └── page.tsx            # Tools content list
│   └── other/
│       └── page.tsx             # Other content list
│
├── nutrition/
│   ├── page.tsx                 # Nutrition sub-dashboard
│   ├── guides/page.tsx
│   ├── research/page.tsx
│   ├── products/page.tsx
│   ├── videos/page.tsx
│   ├── podcasts/page.tsx
│   ├── tools/page.tsx
│   └── other/page.tsx
│
├── activity/
│   ├── page.tsx                  # Activity sub-dashboard
│   └── [same 7 sub-sections]
│
├── mental-health/
│   ├── page.tsx                  # Mental Health sub-dashboard
│   └── [same 7 sub-sections]
│
├── sleep/
│   ├── page.tsx                  # Sleep sub-dashboard
│   └── [same 7 sub-sections]
│
└── water/
    ├── page.tsx                  # Water sub-dashboard + gamification
    └── [same 7 sub-sections]
```

### Component Architecture

#### 1. MobileBottomNav Component

```typescript
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Pill, UtensilsCrossed, Activity, MoreHorizontal } from 'lucide-react'

const MOBILE_TABS = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', href: '/portal' },
  { id: 'medication', icon: Pill, label: 'Medication', href: '/portal/medication' },
  { id: 'nutrition', icon: UtensilsCrossed, label: 'Nutrition', href: '/portal/nutrition' },
  { id: 'activity', icon: Activity, label: 'Activity', href: '/portal/activity' },
  { id: 'more', icon: MoreHorizontal, label: 'More', href: '/portal/more' }
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  
  // Only show on mobile (< 768px)
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 px-2">
        {MOBILE_TABS.map(tab => {
          const Icon = tab.icon
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/')
          
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-1 flex-1 min-w-0 ${
                isActive 
                  ? 'text-[#b68a71]' 
                  : 'text-slate-400'
              } transition-colors active:opacity-70`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs truncate w-full text-center">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
```

#### 2. SubDashboard Component

```typescript
'use client'

import { usePathname } from 'next/navigation'
import { supabase } from '@/integrations/supabase/client'
import { useState, useEffect } from 'react'
import SubSectionCard from './SubSectionCard'
import SectionHeader from './SectionHeader'

interface SubSection {
  id: string
  name: string
  icon: any
  href: string
  description: string
}

const SUB_SECTIONS: SubSection[] = [
  { id: 'guides', name: 'Guides', icon: BookOpen, href: '/guides', description: 'Step-by-step educational guides' },
  { id: 'research', name: 'Research & Journal Articles', icon: FileText, href: '/research', description: 'Evidence-based research papers' },
  { id: 'products', name: 'Product Information', icon: Package, href: '/products', description: 'Product details and recommendations' },
  { id: 'videos', name: 'Videos and Video Links', icon: Video, href: '/videos', description: 'Educational videos and tutorials' },
  { id: 'podcasts', name: 'Podcast Links', icon: Radio, href: '/podcasts', description: 'Audio content and podcasts' },
  { id: 'tools', name: 'Tools', icon: Settings, href: '/tools', description: 'Interactive calculators and assessments' },
  { id: 'other', name: 'Other', icon: File, href: '/other', description: 'Additional resources' }
]

interface SubDashboardProps {
  pillar: 'medication' | 'nutrition' | 'activity' | 'mental-health' | 'sleep' | 'water'
  title: string
  description: string
  icon: any
}

export default function SubDashboard({ pillar, title, description, icon }: SubDashboardProps) {
  const [contentCounts, setContentCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const basePath = `/portal/${pillar}`

  useEffect(() => {
    fetchContentCounts()
  }, [pillar])

  const fetchContentCounts = async () => {
    try {
      const counts: Record<string, number> = {}
      
      for (const section of SUB_SECTIONS) {
        const { count, error } = await supabase
          .from('portal_content')
          .select('*', { count: 'exact', head: true })
          .eq('pillar', pillar)
          .eq('is_published', true)
          .or(`content_data->subsection.eq.${section.name},content_data->subsection.eq.${section.id}`)
        
        counts[section.id] = count || 0
      }
      
      setContentCounts(counts)
    } catch (error) {
      console.error('Error fetching content counts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <SectionHeader icon={icon} title={title} description={description} />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {SUB_SECTIONS.map((section) => (
          <SubSectionCard
            key={section.id}
            section={section}
            count={contentCounts[section.id] || 0}
            href={`${basePath}${section.href}`}
            loading={loading}
          />
        ))}
      </div>
    </div>
  )
}
```

#### 3. SubSectionCard Component

```typescript
'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SubSectionCardProps {
  section: {
    id: string
    name: string
    icon: any
    description: string
  }
  count: number
  href: string
  loading: boolean
}

export default function SubSectionCard({ section, count, href, loading }: SubSectionCardProps) {
  const Icon = section.icon

  return (
    <Link href={href}>
      <Card className="bg-slate-800 border border-slate-700 hover:border-[#b68a71] transition-all duration-300 h-full flex flex-col p-4 cursor-pointer">
        <div className="flex items-start space-x-3 mb-3">
          <div className="bg-slate-900 rounded-lg p-2 border border-slate-700 flex-shrink-0">
            <Icon className="h-5 w-5 text-[#b68a71]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-[#f8fafc] mb-1 line-clamp-2">
              {section.name}
            </h3>
            <p className="text-xs text-[#fef5e7] line-clamp-2 mb-2">
              {section.description}
            </p>
          </div>
        </div>
        
        <div className="mt-auto">
          {loading ? (
            <div className="h-4 bg-slate-700 rounded animate-pulse" />
          ) : (
            <Badge 
              variant="outline" 
              className="text-xs border-slate-600 text-slate-400"
            >
              {count} {count === 1 ? 'item' : 'items'}
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  )
}
```

#### 4. ContentList Component

```typescript
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import ContentItem from './ContentItem'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface ContentListProps {
  pillar: string
  subsection: string
}

export default function ContentList({ pillar, subsection }: ContentListProps) {
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchContent()
  }, [pillar, subsection])

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('portal_content')
        .select('*')
        .eq('pillar', pillar)
        .eq('is_published', true)
        .or(`content_data->subsection.eq.${subsection},content_data->subsection.ilike.%${subsection}%`)
        .order('created_at', { ascending: false })

      if (error) throw error
      setContent(data || [])
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredContent = content.filter(item =>
    searchQuery === '' ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4 pb-20 md:pb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search in this section..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-900 border-slate-700 text-[#f8fafc]"
        />
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filteredContent.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#fef5e7]">No content available in this section yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredContent.map((item) => (
            <ContentItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
```

#### 5. Enhanced PortalLayout Component

```typescript
'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import PortalSidebar from './PortalSidebar'
import MobileBottomNav from './MobileBottomNav'
import { User, Settings, Home } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import Link from 'next/link'

interface PortalLayoutProps {
  children: React.ReactNode
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const { user } = useAuth()
  const [portalUser, setPortalUser] = React.useState<any>(null)
  const [userProfile, setUserProfile] = React.useState<any>(null)

  // ... existing user profile fetching logic ...

  return (
    <div className="min-h-screen bg-[#334155] flex flex-col">
      {/* Sidebar - Desktop Only */}
      <PortalSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 lg:ml-80">
        {/* Top Header Bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-4 md:px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="lg:hidden">
              {/* Mobile menu button space - handled by sidebar */}
            </div>

            <div className="flex items-center space-x-2 md:space-x-4 ml-auto">
              {/* Website Link */}
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-slate-700 hover:bg-slate-600 text-[#fef5e7] transition-colors"
                title="Back to Website"
              >
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">Website</span>
              </Link>

              {/* Admin Access Link */}
              {(['downscale@icloud.com', 'bec@downscale.health', 'rebecca@downscale.health', 'b.burstow83@gmail.com'].includes(user?.email || '')) && (
                <Link
                  href="/portal/admin"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-slate-700 hover:bg-slate-600 text-[#fef5e7] transition-colors"
                  title="Admin Dashboard"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden md:inline">Admin</span>
                </Link>
              )}

              <div className="bg-slate-900 rounded-lg p-2 md:p-3 border border-slate-700">
                <User className="h-5 w-5 md:h-6 md:w-6 text-[#b68a71]" />
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs md:text-sm text-[#fef5e7]">Welcome back</p>
                <p className="text-xs md:text-sm font-medium text-[#f8fafc] truncate max-w-[120px] md:max-w-none">
                  {getDisplayName()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content - with bottom padding for mobile nav */}
        <main className="p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  )
}
```

---

## Implementation Steps

### Phase 1: Foundation (Week 1)

**Step 1.1: Create MobileBottomNav Component**
- [ ] Create `src/components/portal/MobileBottomNav.tsx`
- [ ] Implement responsive visibility (< 768px only)
- [ ] Add active state detection
- [ ] Style with dark theme colors
- [ ] Test on mobile devices

**Step 1.2: Update PortalLayout**
- [ ] Integrate MobileBottomNav into PortalLayout
- [ ] Add bottom padding for mobile content (pb-24)
- [ ] Ensure desktop sidebar still works
- [ ] Test responsive breakpoints

**Step 1.3: Create SubDashboard Component**
- [ ] Create `src/components/portal/SubDashboard.tsx`
- [ ] Implement content count fetching
- [ ] Create 7-card grid layout
- [ ] Add loading states
- [ ] Test with real data

**Step 1.4: Create SubSectionCard Component**
- [ ] Create `src/components/portal/SubSectionCard.tsx`
- [ ] Implement card design with dark theme
- [ ] Add hover states
- [ ] Include item count badge
- [ ] Test responsive grid

### Phase 2: Pillar Pages (Week 2)

**Step 2.1: Medication Sub-Dashboard**
- [ ] Update `src/app/portal/medication/page.tsx`
- [ ] Replace current content grid with SubDashboard
- [ ] Test navigation flow
- [ ] Verify content counts display

**Step 2.2: Create Medication Sub-Section Pages**
- [ ] Create `src/app/portal/medication/guides/page.tsx`
- [ ] Create `src/app/portal/medication/research/page.tsx`
- [ ] Create `src/app/portal/medication/products/page.tsx`
- [ ] Create `src/app/portal/medication/videos/page.tsx`
- [ ] Create `src/app/portal/medication/podcasts/page.tsx`
- [ ] Create `src/app/portal/medication/tools/page.tsx`
- [ ] Create `src/app/portal/medication/other/page.tsx`
- [ ] Implement ContentList component in each

**Step 2.3: Replicate for Other Pillars**
- [ ] Update Nutrition pillar (same structure)
- [ ] Update Activity pillar
- [ ] Update Mental Health pillar
- [ ] Update Sleep pillar
- [ ] Update Water pillar (include gamification)

### Phase 3: Content Components (Week 3)

**Step 3.1: Create ContentList Component**
- [ ] Create `src/components/portal/ContentList.tsx`
- [ ] Implement search functionality
- [ ] Add filtering options
- [ ] Create empty states
- [ ] Test with various content types

**Step 3.2: Create ContentItem Component**
- [ ] Create `src/components/portal/ContentItem.tsx`
- [ ] Support all content types (PDF, video, link, tool)
- [ ] Add save/bookmark functionality
- [ ] Implement preview functionality
- [ ] Add view tracking

**Step 3.3: Create SectionHeader Component**
- [ ] Create reusable section header
- [ ] Include icon, title, description
- [ ] Responsive typography
- [ ] Consistent spacing

### Phase 4: Enhanced Features (Week 4)

**Step 4.1: Search Integration**
- [ ] Integrate GlobalSearch component
- [ ] Add section-specific search
- [ ] Implement search analytics
- [ ] Test search performance

**Step 4.2: Navigation State Management**
- [ ] Implement URL state preservation
- [ ] Add breadcrumb navigation
- [ ] Back button handling
- [ ] Deep link support

**Step 4.3: Performance Optimization**
- [ ] Implement content caching
- [ ] Add lazy loading for content lists
- [ ] Optimize image loading
- [ ] Code splitting for routes

### Phase 5: Testing & Polish (Week 5)

**Step 5.1: Mobile Testing**
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test on various screen sizes
- [ ] Test safe area handling
- [ ] Test touch targets

**Step 5.2: Desktop Testing**
- [ ] Verify sidebar functionality
- [ ] Test responsive breakpoints
- [ ] Test keyboard navigation
- [ ] Test mouse interactions

**Step 5.3: Accessibility Testing**
- [ ] Screen reader testing
- [ ] Keyboard navigation testing
- [ ] Color contrast verification
- [ ] Focus indicators
- [ ] ARIA labels

**Step 5.4: Performance Testing**
- [ ] Lighthouse score > 90
- [ ] Mobile performance testing
- [ ] Network throttling tests
- [ ] Bundle size optimization

---

## Database Query Patterns

### Content Count Query

```typescript
// Get count for a specific pillar and subsection
const { count, error } = await supabase
  .from('portal_content')
  .select('*', { count: 'exact', head: true })
  .eq('pillar', 'medication')
  .eq('is_published', true)
  .or(`content_data->subsection.eq.Guides,content_data->subsection.eq.guides`)
```

### Content List Query

```typescript
// Get content list for a subsection
const { data, error } = await supabase
  .from('portal_content')
  .select('*')
  .eq('pillar', 'medication')
  .eq('is_published', true)
  .or(`content_data->subsection.eq.Guides,content_data->subsection.ilike.%guides%`)
  .order('created_at', { ascending: false })
```

### Subsection Mapping

The admin system stores subsections in `content_data.subsection`. We need to handle both:
- Exact matches: "Guides", "Research & Journal Articles"
- Flexible matches: "guides", "research", etc.

---

## Design System Integration

### Color Tokens (Maintain Existing)

```css
/* Dark Theme Colors */
--background: #334155      /* bg-[#334155] */
--card-bg: #1e293b        /* bg-slate-800 */
--card-border: #475569    /* border-slate-700 */
--accent: #b68a71          /* Primary accent */
--text-primary: #f8fafc    /* Main text */
--text-secondary: #fef5e7  /* Secondary text */
--text-muted: #94a3b8      /* Muted text */
```

### Component Styling

```typescript
// Card Styling
className="bg-slate-800 border border-slate-700 hover:border-[#b68a71] transition-all duration-300"

// Active State
className="text-[#b68a71]"

// Inactive State
className="text-slate-400"

// Button Primary
className="bg-[#b68a71] hover:bg-[#8B6F47] text-white"
```

---

## User Testing Checklist

### Mobile User Testing
- [ ] Can access content in 2 taps
- [ ] Bottom navigation is thumb-friendly
- [ ] Cards are easy to tap
- [ ] Content lists load quickly
- [ ] Search works intuitively
- [ ] Navigation feels familiar

### Desktop User Testing
- [ ] Sidebar navigation still works
- [ ] Sub-dashboards display properly
- [ ] Content lists are readable
- [ ] Hover states work well
- [ ] Keyboard navigation works

### Accessibility Testing
- [ ] Screen reader announces navigation
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation complete
- [ ] Touch targets meet minimum size

---

## Success Metrics

### Primary KPIs

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Time to Content | 15-20s | 5-8s | Analytics tracking |
| Tap Count | 5 taps | 2 taps | User session tracking |
| Mobile Engagement | Baseline | +40% | Session duration |
| Content Discovery | Baseline | +70% | Content views |
| User Satisfaction | Baseline | >85% | User surveys |

### Technical Metrics

| Metric | Target | Tool |
|--------|--------|------|
| Page Load Speed | <2s | Lighthouse |
| Mobile Usability | >90 | Lighthouse |
| Accessibility Score | >95 | Lighthouse |
| Performance Budget | <200KB | Bundle analyzer |

---

## Risk Mitigation

### Technical Risks

1. **Navigation State Management**
   - Risk: Complex state across mobile/desktop
   - Mitigation: Use Next.js App Router built-in state, URL-based navigation

2. **Performance on Older Devices**
   - Risk: Slow rendering on older phones
   - Mitigation: Progressive enhancement, lazy loading, code splitting

3. **Content Count Accuracy**
   - Risk: Stale counts displayed
   - Mitigation: Cache invalidation, real-time updates, loading states

### UX Risks

1. **Learning Curve**
   - Risk: Users confused by new navigation
   - Mitigation: Onboarding tooltips, consistent patterns, familiar UI elements

2. **Feature Discovery**
   - Risk: Users can't find features
   - Mitigation: Clear visual hierarchy, search functionality, breadcrumbs

---

## Post-Launch Plan

### Week 1: Monitoring
- Track error rates
- Monitor performance metrics
- Collect user feedback
- Review analytics data

### Week 2-4: Optimization
- A/B test navigation patterns
- Optimize slow queries
- Improve content loading
- Refine mobile experience

### Month 2-3: Enhancement
- Add advanced filtering
- Implement content recommendations
- Enhance search functionality
- Add personalization features

---

## Approval & Sign-Off

**Technical Review**: [ ] Engineering Lead  
**UX Review**: [ ] UX Designer  
**Product Approval**: [ ] Product Owner  
**Implementation Start Date**: _______________

---

**Document Status**: Ready for Implementation  
**Next Action**: Begin Phase 1 - Foundation Components
