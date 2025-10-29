# 🏥 DOWNSCALE PORTAL SYSTEM - PRODUCT REQUIREMENTS DOCUMENT

## 🎯 PROJECT OVERVIEW

**Transform the static portal into a dynamic, admin-managed content system with intelligent search and personal connection features.**

### Current Problem
- Portal sections have hardcoded static content
- No way to upload new content from admin
- No internal communication system between JB/Bec and patients
- No search functionality across portal content
- Existing tools (binge eating, OSA, ADHD, mental health assessments) not integrated

### Solution
**Dynamic Portal Content Management System** with:
- Live admin uploads to any portal section
- JB&BB Feed for personal patient connection
- Global search across all content
- Integration of existing health assessment tools
- PDF export capabilities for all patient tools

---

## 📊 CONTENT SYSTEM ARCHITECTURE

### **6 Content Types (Simplified)**
```
✅ VIDEOS - YouTube/Vimeo embeds + direct uploads
✅ EXTERNAL DOCUMENTS - Research papers, external PDFs
✅ DOWNSCALE DOCUMENTS - Clinic-created PDFs, tools, assessments
✅ LINKS - External resources, podcasts, social posts
✅ TOOLS - Calculators, assessments, trackers (with PDF export)
✅ PROGRAMS/GUIDES - Multi-week content + step-by-step guides
```

### **Portal Structure**
```
MAIN PORTAL DASHBOARD:
├── 🔍 GLOBAL SEARCH (searches everything)
├── 📱 JB&BB FEED (internal blog for members)
├── 🥗 NUTRITION PILLAR
├── 💪 ACTIVITY PILLAR
├── 🧠 MENTAL HEALTH PILLAR
├── 😴 SLEEP & RECOVERY PILLAR
└── 🛒 SHOP PILLAR (links to downscale.shop)
```

---

## 🔍 GLOBAL SEARCH SYSTEM

### **Single Search Bar (Portal Header)**
```
┌─ PORTAL DASHBOARD ──────────────────────────────┐
│ 🔍 [Search everything...] [🔍]                  │
│                                                 │
│ Navigation: JB&BB Feed | Nutrition | Activity...│
└─────────────────────────────────────────────────┘
```

### **Search Capabilities**
- **Full-text search** across all portal content + JB&BB Feed
- **Smart matching**: handles typos, synonyms (GLP-1=Ozempic=semaglutide)
- **Relevance ranking**: recent content, content type, user history
- **No per-section searches** - one search finds everything
- **Results grouped by type**: Videos, Documents, Links, Tools, etc.

### **Search Implementation**
- PostgreSQL full-text search with `tsvector` indexing
- Synonym dictionary for medical terms
- Auto-suggestions as user types
- Search history per user

---

## 📱 JB&BB FEED SYSTEM

### **Internal Member Blog**
```
┌─ JB&BB FEED ────────────────────────────────────┐
│ 📅 Last updated: 2 hours ago                   │
│                                                 │
│ 🆕 "Plateau Week Reality Check" - JB           │
│ 🆕 "Family Meal Prep Sunday" - BB              │
│ 🆕 "Why Scale Weight Fluctuates" - JB          │
│                                                 │
│ 🔔 Get notified of new posts: [ON] [OFF]       │
└─────────────────────────────────────────────────┘
```

### **Feed Features**
- **Member-only access** (not public)
- **Relaxed advertising rules** for medical content
- **Personal insights** from JB and Bec
- **Rich media support**: photos, videos, links
- **Quick posting interface** for admin
- **Patient opt-in notifications** (in-portal pop-ups only, NO emails)
- **Searchable content** integrated with global search

### **Content Types for Feed**
- Personal tips and observations
- Behind-the-scenes clinic insights
- Patient success celebrations (with permission)
- Real-time advice and encouragement
- Links to interesting research
- Family meal ideas from Bec
- Honest struggles and wins

---

## 🥗 DYNAMIC PILLAR SECTIONS

### **Uniform Section Structure**
```
┌─ NUTRITION PILLAR ──────────────────────────────┐
│ 📅 Last content added: Oct 19, 2024            │
│                                                 │
│ 📺 VIDEOS (3 new)                              │
│ • "Meal Prep Basics" - 8:45                    │
│ • "Reading Labels" - 6:24                      │
│                                                 │
│ 📄 DOWNSCALE DOCUMENTS (2 new)                 │
│ • "High-Protein Meal Plans"                    │
│ • "GLP-1 Friendly Recipes"                     │
│                                                 │
│ 📋 EXTERNAL DOCUMENTS (1 new)                  │
│ • "Australian Dietary Guidelines"              │
│                                                 │
│ 🔗 LINKS (2 new)                               │
│ • "Nutrition Australia Resources"              │
│ • "Protein Research Study"                     │
│                                                 │
│ 🛠️ TOOLS (1 new)                               │
│ • "Macro Calculator" [Export PDF]              │
│                                                 │
│ 📚 PROGRAMS/GUIDES (1 new)                     │
│ • "8-Week Nutrition Foundation Program"        │
└─────────────────────────────────────────────────┘
```

### **Section Timestamps**
- **Last content added** date displayed prominently
- **Updated automatically** when new content published
- **Shows at top or bottom** of each section
- **Applies to all 5 pillar sections**

---

## ⚙️ ADMIN CONTENT MANAGEMENT

### **Admin Upload Workflow**
```
JB'S ADMIN DASHBOARD:
├── 📝 Quick JB&BB Feed Post
│   • Rich text editor with media upload
│   • Tag system for categorisation
│   • Preview before publish
│   • Schedule for later posting
│
├── ➕ Add Content to Pillar:
│   1. Choose Type: [Video][External Doc][Downscale Doc][Link][Tool][Program/Guide]
│   2. Choose Pillar: [Nutrition][Activity][Mental Health][Sleep][Shop]
│   3. Upload/Enter Details
│   4. PUBLISH → Goes live + updates section timestamp
│
└── 📊 Content Analytics
    • Most accessed content
    • Patient engagement metrics
    • Search query analytics
    • Content performance reports
```

### **Content Upload Forms by Type**

**VIDEO:**
- Title, Description
- YouTube/Vimeo URL OR direct file upload
- Auto-generate thumbnail
- Duration auto-detection

**EXTERNAL DOCUMENT:**
- Title, Description
- URL to external PDF/resource
- Auto-fetch metadata when possible
- Category tags

**DOWNSCALE DOCUMENT:**
- Title, Description
- PDF upload with preview generation
- Integration with existing tools
- PDF export functionality

**LINK:**
- Title, Description
- URL with auto-metadata fetching
- Custom thumbnail option
- Link validation

**TOOL:**
- Title, Description
- Embed code or internal tool integration
- PDF export configuration
- Calculator/assessment setup

**PROGRAM/GUIDE:**
- Title, Description, Duration
- Multi-section content upload
- Progress tracking setup
- Resource attachments

---

## 🛠️ EXISTING TOOLS INTEGRATION

### **Current Health Assessment Tools**
```
EXISTING TOOLS TO INTEGRATE:
✅ Binge Eating Assessment
✅ Obstructive Sleep Apnoea Screening
✅ ADHD Assessment
✅ Mental Health Questionnaires
✅ BMI Calculator
✅ Weight Loss Calculator
✅ Various health screening tools
```

### **PDF Export Requirements**
- **All tools exportable** as professional PDF reports
- **Patient branding** with Downscale logo and details
- **Results summary** with recommendations
- **Date/time stamps** for record keeping
- **Professional formatting** for sharing with GPs
- **Australian compliance** with medical document standards

### **Tool Integration Process**
1. **Audit existing tools** and assessment forms
2. **Standardise PDF export** functionality across all tools
3. **Integrate into portal search** system
4. **Add to appropriate pillar sections**
5. **Enable admin management** of tool content

---

## 🗄️ DATABASE ARCHITECTURE

### **New Tables Required**

```sql
-- Main content table (replaces hardcoded portal content)
CREATE TABLE portal_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pillar VARCHAR(50) NOT NULL, -- nutrition/activity/mental-health/sleep-recovery/shop
    content_type VARCHAR(20) NOT NULL, -- video/external_doc/downscale_doc/link/tool/program_guide
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_data JSONB NOT NULL, -- flexible for different content types
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    search_vector tsvector -- for full-text search
);

-- JB&BB Internal Blog Feed
CREATE TABLE jb_bb_feed (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    media_urls TEXT[],
    tags TEXT[],
    author VARCHAR(50) NOT NULL, -- 'JB' or 'BB'
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    search_vector tsvector
);

-- Patient notification preferences
CREATE TABLE patient_notifications (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    jb_bb_feed_alerts BOOLEAN DEFAULT false,
    content_alerts_by_pillar JSONB DEFAULT '{}',
    last_portal_visit TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Content analytics tracking
CREATE TABLE content_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    content_type VARCHAR(20) NOT NULL, -- portal_content or jb_bb_feed
    content_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL, -- view, download, export_pdf, search
    created_at TIMESTAMP DEFAULT NOW()
);

-- Search analytics
CREATE TABLE search_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    search_query TEXT NOT NULL,
    results_count INTEGER,
    clicked_result_id UUID,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **Search Index Setup**
```sql
-- Full-text search indexes
CREATE INDEX portal_content_search_idx ON portal_content USING GIN(search_vector);
CREATE INDEX jb_bb_feed_search_idx ON jb_bb_feed USING GIN(search_vector);

-- Content type and pillar indexes
CREATE INDEX portal_content_pillar_idx ON portal_content(pillar);
CREATE INDEX portal_content_type_idx ON portal_content(content_type);
CREATE INDEX portal_content_published_idx ON portal_content(is_published);

-- Analytics indexes
CREATE INDEX content_analytics_user_idx ON content_analytics(user_id);
CREATE INDEX content_analytics_content_idx ON content_analytics(content_id);
CREATE INDEX search_analytics_user_idx ON search_analytics(user_id);
```

---

## 🔔 NOTIFICATION SYSTEM

### **Patient Notification Preferences**
```
┌─ My Notification Preferences ───────────────────┐
│ ⚠️  ALL NOTIFICATIONS DISABLED BY DEFAULT       │
│                                                 │
│ 📱 IN-PORTAL NOTIFICATIONS ONLY:               │
│ ☐ New JB&BB Feed posts                         │
│ ☐ New content in subscribed pillars            │
│                                                 │
│ 📧 EMAIL COMMUNICATIONS:                       │
│ ☐ Weekly digest of new content                 │
│ ☐ Important clinic announcements only          │
│                                                 │
│ 📊 PORTAL INDICATORS:                          │
│ ☑️ Show "new content" badges when I log in     │
│ ☑️ Show last visit date                        │
│                                                 │
│ [SAVE PREFERENCES] [TURN OFF EVERYTHING]       │
└─────────────────────────────────────────────────┘
```

### **Notification Rules**
- **Default state**: NO notifications
- **Opt-in only**: Patient must explicitly enable
- **In-portal pop-ups**: NOT emails (privacy compliance)
- **Badge system**: Show "NEW" indicators for unread content
- **Last visit tracking**: "New since your last visit" messaging

---

## 🎨 USER INTERFACE REQUIREMENTS

### **Global Search Bar**
- **Prominent placement** in portal header
- **Auto-suggestions** as user types
- **Search history** dropdown
- **Clear/cancel** functionality
- **Loading states** during search
- **No results** state with suggestions

### **Content Display**
- **Card-based layout** for content items
- **Consistent iconography** for content types
- **"NEW" badges** for recent content
- **Quick actions**: View, Download, Share, Save
- **Timestamps** showing when content was added
- **Author attribution** where applicable

### **JB&BB Feed Interface**
- **Social media style** feed layout
- **Author avatars** (JB/Bec photos)
- **Rich text rendering** with media embeds
- **Like/reaction** system (optional)
- **Share functionality** within portal
- **Archive/history** view

---

## 🔒 PRIVACY & COMPLIANCE

### **Australian Privacy Requirements**
- **Privacy Act Compliance**: Australian Privacy Principles (APP)
- **Medical Data Protection**: Encryption at rest and in transit
- **Audit Logging**: All content access and admin actions logged
- **Data Retention**: Clear policies for content and user data
- **Right to Deletion**: Patient can request content removal

### **Medical Content Compliance**
- **TGA Guidelines**: Appropriate medication information
- **AHPRA Standards**: Professional healthcare communication
- **Evidence-Based Content**: All medical claims properly referenced
- **Disclaimer Requirements**: Clear medical disclaimer on all content

### **Technical Security**
- **Row Level Security**: Supabase RLS policies
- **Role-Based Access**: Admin vs patient permissions
- **Content Moderation**: Admin review before publishing
- **Secure File Upload**: Virus scanning and file validation

---

## 📊 SUCCESS METRICS

### **Content Engagement**
- **Search Usage**: 70%+ of patients use search monthly
- **Feed Engagement**: 60%+ read JB&BB Feed weekly
- **Content Views**: Average 5+ pieces of content per session
- **Tool Usage**: 80%+ of patients use assessment tools
- **PDF Exports**: Track tool result downloads

### **Admin Efficiency**
- **Upload Time**: <5 minutes to publish new content
- **Content Updates**: 90%+ of pillars updated monthly
- **Search Performance**: <2 seconds for search results
- **System Uptime**: 99.9% availability

### **Patient Satisfaction**
- **Content Relevance**: 4.5+ star rating for search results
- **Ease of Use**: 90%+ find content easily
- **Information Value**: 85%+ rate content as helpful
- **Return Visits**: 75%+ weekly portal usage

---

## 🚀 IMPLEMENTATION PHASES

### **Phase 1: Foundation (Week 1)**
- Database schema creation
- Basic admin upload interface
- Global search implementation
- JB&BB Feed basic functionality

### **Phase 2: Content Management (Week 2)**
- Dynamic portal section population
- Content type upload forms
- PDF export for existing tools
- Section timestamp system

### **Phase 3: Search & Navigation (Week 3)**
- Advanced search features
- Content analytics tracking
- Patient notification preferences
- Feed enhancement features

### **Phase 4: Integration & Polish (Week 4)**
- Existing tools integration
- Performance optimization
- User testing and feedback
- Production deployment

---

## 🛠️ TECHNICAL STACK

### **Frontend**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Query** for data fetching

### **Backend**
- **Supabase** database and authentication
- **PostgreSQL** full-text search
- **Row Level Security** for data protection
- **Real-time subscriptions** for live updates

### **File Storage**
- **Supabase Storage** for files and images
- **PDF generation** library for exports
- **Image optimization** for media content
- **CDN integration** for performance

### **Search Technology**
- **PostgreSQL tsvector** for full-text search
- **Fuzzy matching** for typos
- **Synonym dictionary** for medical terms
- **Search analytics** for improvement

---

## ✅ ACCEPTANCE CRITERIA

### **Must Have Features**
1. ✅ Admin can upload content to any pillar section
2. ✅ Global search finds all content across portal
3. ✅ JB&BB Feed for internal member communication
4. ✅ All existing tools export to PDF
5. ✅ Section timestamps update automatically
6. ✅ Patient notification preferences system
7. ✅ Mobile-responsive design
8. ✅ Australian spelling throughout
9. ✅ Privacy compliance (no auto-emails)
10. ✅ Content analytics for admin

### **Nice to Have Features**
- Advanced search filters
- Content scheduling
- Bulk content upload
- Social features (likes, comments)
- Content versioning
- A/B testing for content
- Integration with external APIs

---

**Created**: October 22, 2024
**Version**: 1.0
**Author**: JB & Claude
**Status**: Ready for Implementation