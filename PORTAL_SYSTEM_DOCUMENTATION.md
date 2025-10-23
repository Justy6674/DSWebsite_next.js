# DOWNSCALE PATIENT PORTAL & ADMIN SYSTEM - COMPREHENSIVE DOCUMENTATION

## 🏥 SYSTEM OVERVIEW

The Downscale Patient Portal is a comprehensive telehealth platform designed for Australian weight loss clinic patients. It combines evidence-based medical content, gamified wellness tools, and professional clinical management in a fully integrated Next.js application.

### 🎯 CORE PURPOSE
- **Patient Experience**: Organised access to weight loss resources across 7 health pillars
- **Clinical Management**: Complete administrative control over content, users, and analytics
- **Australian Compliance**: AHPRA, Medicare, TGA-compliant healthcare platform
- **Evidence-Based**: Medical references and clinical protocols throughout

---

## 🗄️ DATABASE ARCHITECTURE

### **Primary Tables**

#### `portal_content` - Main Content Repository
```sql
- id: string (UUID)
- pillar: 'nutrition' | 'activity' | 'mental-health' | 'sleep-recovery' | 'water' | 'shop' | 'medication'
- content_type: 'video' | 'external_doc' | 'downscale_doc' | 'link' | 'tool' | 'program_guide'
- title: string
- description: string | null
- content_data: JSON (file URLs, metadata, custom data)
- tags: string[] (searchable keywords)
- is_published: boolean
- created_by: string (user ID)
- view_count: number
- search_vector: tsvector (full-text search)
- created_at/updated_at: timestamps
```

#### `jb_bb_feed` - Internal Member Blog
```sql
- id: string (UUID)
- title: string
- content: string (markdown/text)
- media_urls: string[] (attachments)
- tags: string[]
- author: 'JB' | 'BB' (Dr JB or Bec)
- is_published: boolean
- view_count: number
- search_vector: tsvector
- created_at/updated_at: timestamps
```

#### `user_profiles` - Patient Data
```sql
- id: string (links to auth.users)
- email: string
- role: 'patient' | 'admin' | 'practitioner'
- patient_id: string | null
- first_name/last_name: string
- subscription_tier: string
- metadata: JSON (saved_resources, preferences, custom_notes)
- created_at/updated_at: timestamps
```

#### `patient_notifications` - Notification Preferences
```sql
- user_id: string
- jb_bb_feed_alerts: boolean
- content_alerts_by_pillar: JSON
- last_portal_visit: timestamp
```

#### Supporting Tables
- `file_storage` - Uploaded documents and media
- `content_analytics` - Usage tracking
- `search_analytics` - Search behavior analysis
- `health_metrics` - Patient health data
- `daily_tracking_extended` - Patient progress tracking

---

## 👥 PATIENT PORTAL SYSTEM

### **Navigation Structure**
```
/portal/
├── /nutrition          # Nutrition resources and tools
├── /activity           # Exercise and movement content
├── /mental-health      # Psychology and mindset resources
├── /sleep-recovery     # Sleep optimization content
├── /water              # Hydration tracking and education
├── /shop               # Supplement and product info
├── /medication         # GLP-1 and medication resources
├── /jb-bb-feed        # Internal blog from Dr JB & Bec
└── /saved             # User's bookmarked content
```

### **Core Features**

#### 🔍 **Global Search System**
- **Full-text search** across all portal content
- **Real-time suggestions** as user types
- **Analytics tracking** of search queries and clicks
- **Pillar filtering** to narrow results by health area
- **Tag-based discovery** for related content

#### 📚 **Content Organisation by Health Pillars**
Each pillar page includes:
- **Dynamic content loading** from portal_content table
- **Organised sub-sections** (Tools, Education, Programs, etc.)
- **Content type indicators** (Video, PDF, Link, Tool)
- **View tracking** for analytics
- **Save/bookmark functionality**

#### 💧 **Gamified Water Tracking**
- **8 Notification Personalities**: Encouraging, Funny, Clinical, Australian, etc.
- **Custom reminder intervals**: 1-4 hours, custom times
- **Wake/sleep time respect**
- **Browser notification integration**
- **Educational content**: Fat hydrolysis science, clinical references
- **Target tracking**: 2.5-3L daily with medical rationale

#### 📱 **JB&BB Feed (Internal Blog)**
- **Author-specific posts** from Dr JB and Bec
- **Media attachment support** (images, videos)
- **Notification preferences** (user-controllable)
- **View analytics** and engagement tracking
- **Professional but personal** clinic insights

#### 💾 **User Resource Management**
- **Save/unsave content** across all pillars
- **Personal notes** on saved resources
- **Organised saved content page**
- **Cross-reference** between pillars

### **Mobile Optimisation**
- **Responsive design** with Tailwind CSS breakpoints
- **Touch-friendly** interfaces and buttons
- **Mobile-first** approach throughout
- **Grid layouts** adapt from 1-column (mobile) to 2-4 columns (desktop)

---

## ⚙️ ADMIN SYSTEM

### **Unified Admin Dashboard** (`/portal/admin`)

#### 🔐 **Authentication & Access Control**
- **Role-based access** (admin/practitioner/patient)
- **Secure login** with Supabase Auth
- **Session management** and automatic logout
- **Admin-only route protection**

#### 📁 **File Management System**
**Full-screen modal interface** with complete manual control:

**Upload Features**:
- **Drag & drop** file upload
- **Multiple file** selection
- **File type validation** (PDF, DOC, images, videos)
- **Progress tracking** during upload

**Manual Categorisation**:
- **Two-level dropdown**: Pillar → Sub-section selection
- **Custom sub-sections** (admin can create new categories)
- **Content type assignment** (Video, Document, Link, Tool, etc.)
- **Rich metadata**: Title, description, tags, display order
- **No auto-placement** - admin must manually assign everything

**Enhanced Tile Design**:
- **Professional layout** with clear hierarchy
- **Visual file type** indicators
- **Upload progress** and status
- **File size and format** display

#### 📝 **Portal Content Manager**
- **CRUD operations** for all portal content
- **Live preview** of content before publishing
- **Bulk operations** (publish, unpublish, delete)
- **Content analytics** (views, engagement)
- **Tag management** and categorisation
- **Search and filtering** of admin content

#### 📰 **JB&BB Feed Manager**
- **Post creation** with rich text editor
- **Media upload** and attachment management
- **Author assignment** (JB or BB)
- **Draft/publish** workflow
- **Tag management** for post categorisation
- **Analytics dashboard** for post performance

#### 👤 **User Management**
- **Patient profile** viewing and editing
- **Subscription tier** management
- **Activity monitoring** (last login, portal usage)
- **Notification preference** management
- **Bulk user operations**

#### 🤖 **AI Content Generator**
- **Automated content creation** for portal resources
- **SEO-optimised** titles and descriptions
- **Medical accuracy** checking
- **Batch content generation**
- **Template-based** content creation

#### 📊 **Analytics & Reporting**
- **Content performance** metrics
- **User engagement** tracking
- **Search analytics** and popular queries
- **Download and export** statistics
- **Custom date range** reporting

### **Content Workflow**
1. **Upload** → Files uploaded via File Management
2. **Categorise** → Admin manually assigns pillar, sub-section, metadata
3. **Review** → Content reviewed in Portal Content Manager
4. **Publish** → Content made live to patients
5. **Monitor** → Analytics track usage and engagement

---

## 🔧 TECHNICAL SPECIFICATIONS

### **Frontend Architecture**
- **Next.js 14** with App Router
- **TypeScript** with strict type checking
- **Tailwind CSS** with custom Downscale design system
- **shadcn/ui** component library
- **Mobile-responsive** design patterns

### **Backend & Database**
- **Supabase** for authentication and database
- **PostgreSQL** with full-text search capabilities
- **Row Level Security** (RLS) for data protection
- **Real-time subscriptions** for live updates
- **File storage** with signed URLs

### **Key Integrations**
- **Supabase Auth** for user management
- **Supabase Storage** for file uploads
- **Browser notifications** for water reminders
- **Full-text search** with PostgreSQL tsvector
- **Analytics tracking** with custom functions

### **Security Features**
- **Role-based access control** throughout
- **Encrypted data** transmission
- **Signed file URLs** for secure downloads
- **Session management** and timeout
- **CSRF protection** and input validation

---

## 🚀 USER JOURNEYS

### **Patient Journey**
1. **Login** → Secure authentication
2. **Dashboard** → Overview of 7 health pillars
3. **Browse Content** → Navigate by pillar or search
4. **Consume Resources** → View documents, watch videos, use tools
5. **Save Content** → Bookmark important resources
6. **Set Preferences** → Configure notifications and reminders
7. **Track Progress** → Use water tracker and other tools

### **Admin Journey**
1. **Admin Login** → Role-verified access
2. **Upload Content** → File Management system
3. **Categorise** → Manual assignment to pillars/sections
4. **Manage Content** → Portal Content Manager
5. **Monitor Usage** → Analytics and reporting
6. **User Management** → Patient oversight
7. **Content Creation** → JB&BB Feed and AI generation

---

## 📋 CURRENT LIMITATIONS & OPPORTUNITIES

### **Known Limitations**
- **Single pillar assignment** - content can only exist in one section
- **No cross-pillar tagging** for JB&BB feed content
- **Admin portal testing** requires separate browser sessions

### **Technical Debt**
- Some TypeScript `any` types in legacy components
- Build warnings in production (temporarily ignored)
- Could benefit from more comprehensive error boundaries

### **Future Enhancements**
- **Multiple pillar assignment** capability
- **Advanced analytics dashboard** with deeper insights
- **Patient progress tracking** integration
- **Telehealth appointment** booking system
- **Mobile app** development

---

## 🎯 SUCCESS METRICS

### **Patient Engagement**
- **Content views** and time spent
- **Search usage** and query success
- **Resource saves** and bookmarking
- **Water tracker** adoption and compliance
- **JB&BB feed** readership

### **Admin Efficiency**
- **Content upload** speed and success rate
- **Publishing workflow** time
- **User management** efficiency
- **Analytics usage** and insights generated

### **Clinical Outcomes**
- **Patient portal adoption** rate
- **Resource utilisation** across health pillars
- **Notification engagement** and behaviour change
- **Long-term patient retention** and success

---

**This system represents a comprehensive, professionally-designed telehealth platform that prioritises patient experience, clinical control, and Australian healthcare compliance while maintaining technical excellence and scalability.**