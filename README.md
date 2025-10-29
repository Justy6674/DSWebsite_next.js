# 🏥 Downscale Weight Loss Clinic Portal System

## Overview

Professional Australian telehealth platform combining patient portal, admin management, and evidence-based weight loss resources across 7 health pillars.

## 🚀 Quick Start

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Production build
npm run start                  # Start production server

# Quality Assurance
npm run type-check            # TypeScript type checking
npm run lint                  # ESLint code quality check

# SEO & Performance
npm run seo:check             # Run SEO validation
npm run lighthouse            # Run Lighthouse performance test
```

## 🏗️ Architecture

- **Framework**: Next.js 14 with App Router
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage

## 📱 Patient Portal Features

### Portal Navigation
- **Dashboard** - Central hub with global search, featured tools, health metrics, and water reminders
- **Medication** - GLP-1 and weight loss medication resources
- **Nutrition** - Evidence-based dietary resources
- **Activity** - Exercise and movement content
- **Mental Health / Goal Setting** - Psychology, mindset tools, and goal achievement resources
- **Sleep** - Sleep optimization protocols and recovery strategies
- **Water** - Gamified hydration tracking with 8 notification personalities

### Standard Content Sub-Sections (All Pillars Except Dashboard)
Every pillar uses the same 7 sub-sections for consistent content organization:
1. **Guides** - Step-by-step educational guides
2. **Research / Journal Articles** - Evidence-based research papers and studies
3. **Product Information** - Product details and recommendations
4. **Videos / Video Links** - Educational videos and external video resources
5. **Podcast Links** - Audio content and podcast recommendations
6. **Tools** - Interactive calculators, assessments, and trackers (also available on Dashboard)
7. **Other** - Additional resources and miscellaneous content

### Content Management
- **Admin Dashboard** → **Portal Content Manager** - Fully built system for adding, editing, and organizing all portal content
- Content is manually categorized by pillar and sub-section during upload
- Admin can preview content exactly as patients will see it before publishing
- All content types supported: videos, PDFs, external links, tools, and guides

### Access Model
- **Free Portal**: Available to all current Downscale patients at no cost
- **Future Paid Features**: Additional premium modules and features planned for future releases

### Core Functionality
- 🔍 **Global Search** - Full-text search across all content
- 💾 **Save Resources** - Bookmark and annotate content
- 📱 **Mobile Optimized** - Responsive design throughout
- 🔔 **Smart Notifications** - Configurable alerts and reminders
- 📊 **Usage Analytics** - Track engagement and progress

### JB&BB Feed (Internal Blog)
- Personal insights from Dr JB and Bec
- Member-only content with media attachments
- Configurable notification preferences
- Professional clinical updates

## ⚙️ Admin System

### Portal Content Management (Primary System)
- **Portal Content Manager** - Fully built and operational system for managing all portal content
- **Content Upload & Organization**: 
  - Select pillar (Medication, Nutrition, Activity, Mental Health/Goal Setting, Sleep, Water)
  - Select sub-section (Guides, Research/Journal Articles, Product Information, Videos/Video Links, Podcast Links, Tools, Other)
  - Add title, description, tags, and content data
  - Preview content exactly as patients will see it
  - Publish/unpublish with one click
- **Content Types Supported**: Videos, External Documents, Downscale Documents, Links, Tools, Program Guides
- **Content Preview**: Real-time preview showing exact patient-facing styling and layout

### File Management
- **Full-screen modal** with drag & drop upload
- **Manual categorization** - Admin assigns every piece of content to pillar and sub-section
- **Two-level organization** - Pillar → Sub-section selection
- **Rich metadata** - Title, description, tags, display order
- **Professional tile design** with progress tracking

### Additional Admin Features
- **JB&BB Feed Manager** - Internal blog post creation (member-only content)
- **User Management** - Patient profiles and access management
- **Analytics Dashboard** - Content performance and engagement tracking
- **AI Content Generator** - Automated resource creation assistance

### Admin Dashboard Features
- Role-based access control (admin/practitioner/patient)
- Real-time content preview before publishing
- Bulk operations for content management
- Search and filtering of admin content
- Comprehensive analytics and reporting

### File Preview System
- **PDF Thumbnails** - Browser-native iframe rendering (no JavaScript dependencies)
- **Reliable Previews** - Works across all modern browsers without SSR issues
- **Performance Optimized** - No external library overhead, direct Supabase integration
- **Error Handling** - Graceful fallbacks with refresh functionality
- **Mobile Compatible** - Responsive thumbnails on all device sizes

## 🗄️ Database Schema

### Core Tables
- `portal_content` - Main content repository (7 pillars)
- `jb_bb_feed` - Internal member blog posts
- `user_profiles` - Patient data and preferences
- `patient_notifications` - Notification settings
- `file_storage` - Uploaded documents and media
- `content_analytics` - Usage tracking
- `search_analytics` - Search behavior analysis

## 🔐 Security & Compliance

### Australian Healthcare Compliance
- **AHPRA** registration standards
- **Medicare** provider protocols
- **TGA** medication compliance
- **Privacy Act** (APP) compliance

### Technical Security
- Row Level Security (RLS) on all tables
- Encrypted data transmission
- Signed URLs for file access
- Session management and timeout
- CSRF protection and input validation

## 📱 Mobile Optimization

- **Responsive Tailwind CSS** breakpoints
- **Touch-friendly** interfaces and buttons
- **Mobile-first** design approach
- **Grid layouts** adapt 1-column (mobile) to 4-columns (desktop)
- **Optimized performance** for mobile networks

## 🎯 Key User Journeys

### Patient Experience
1. Secure login and authentication
2. Dashboard overview of 7 health pillars
3. Browse content by pillar or global search
4. View documents, videos, and interactive tools
5. Save and annotate important resources
6. Configure notifications and reminders
7. Track progress with gamified tools

### Admin Workflow
1. Admin authentication and role verification
2. Upload files via File Management system
3. Manual categorization into pillars/sections
4. Content review in Portal Content Manager
5. Publishing workflow and analytics monitoring
6. User management and engagement tracking
7. JB&BB Feed content creation

## 🔧 Development

### Environment Setup
```bash
# Install dependencies
npm install

# Environment variables
cp .env.example .env.local
# Add Supabase URL and keys
```

### Supabase Configuration
**Database URL**: `https://pooebqhsshfafkhvccrl.supabase.co`
**Public Storage**: Direct access to portal files via signed URLs

**Key Technical Achievements**:
- ✅ **PDF Thumbnails Fixed** - Replaced broken react-pdf with iframe solution
- ✅ **SSR Compatible** - No hydration mismatches or server-side rendering issues
- ✅ **Browser Native** - Uses built-in PDF viewer, no external dependencies
- ✅ **Production Ready** - Deployed and working across all admin interfaces
- ✅ **Mobile Optimized** - Responsive thumbnails on all device sizes

**File Preview Architecture**:
```typescript
// Before (Broken) - react-pdf library
import { Document, Page } from 'react-pdf';
<Document file={url}>
  <Page pageNumber={1} />
</Document>

// After (Working) - iframe solution
<iframe
  src={`${fileUrl}#page=1&zoom=50&toolbar=0`}
  onLoad={handleLoad}
  onError={handleError}
/>
```

**Supabase Storage Access**:
- **Public bucket**: `portal-files/other/` - Direct public access
- **Signed URLs**: Automatic generation for secure file access
- **File types supported**: PDF (thumbnails), Excel, Word, images, videos
- **Upload handling**: Admin file management with drag-drop interface

### Key Commands
```bash
# Development with hot reload
npm run dev

# Type checking
npm run type-check

# Linting and formatting
npm run lint

# Build optimization
npm run build
npm run start

# SEO validation
npm run seo:check
npm run seo:audit
```

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── portal/            # Patient portal pages
│   │   ├── admin/         # Admin dashboard
│   │   ├── nutrition/     # Health pillar pages
│   │   ├── water/         # Gamified hydration
│   │   └── jb-bb-feed/    # Internal blog
│   └── page.tsx           # Homepage
├── components/
│   ├── admin/             # Admin management components
│   ├── portal/            # Patient portal components
│   └── ui/                # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx    # Supabase authentication
└── integrations/
    └── supabase/          # Database client and types
```

## 📊 Analytics & Monitoring

### Built-in Analytics
- Content view tracking with Supabase functions
- Search query analytics and click tracking
- User engagement metrics per pillar
- JB&BB Feed readership analytics
- Water tracker compliance monitoring

### Performance Monitoring
- Lighthouse CI integration
- SEO health checks
- Mobile performance optimization
- Database query performance tracking

## 🚀 Deployment

### Production Environment
- Deployed on Vercel with automatic deployments
- Supabase production database
- Environment-specific configurations
- CDN optimization for static assets

### Build Process
```bash
# Production build
npm run build

# Start production server
npm run start

# Performance audit
npm run lighthouse
```

## 🎯 Success Metrics

### Patient Engagement
- Portal adoption rate and daily active users
- Content consumption across health pillars
- Resource saving and annotation usage
- Water tracker compliance and notification response
- JB&BB Feed readership and engagement

### Clinical Outcomes
- Patient retention and success rates
- Resource utilization effectiveness
- Behavior change through gamification
- Long-term portal engagement trends

### Admin Efficiency
- Content upload and categorization speed
- Publishing workflow optimization
- User management effectiveness
- Analytics insight generation and utilization

---

## 📋 Current Features Summary

✅ **Complete patient portal** with Dashboard + 6 health pillars (Medication, Nutrition, Activity, Mental Health/Goal Setting, Sleep, Water)
✅ **Standardized content organization** - 7 sub-sections across all pillars (Guides, Research/Journal Articles, Product Information, Videos/Video Links, Podcast Links, Tools, Other)
✅ **Fully operational admin content management** - Portal Content Manager for adding, editing, and organizing all portal content
✅ **Free access portal** for all current Downscale patients (paid features planned)
✅ **Gamified water tracking** with 8 notification personalities
✅ **JB&BB internal blog** with media attachments
✅ **Global search** across all content
✅ **Mobile-responsive design** throughout
✅ **Australian healthcare compliance**
✅ **Comprehensive analytics** and user tracking
✅ **Role-based access control** and security
✅ **Professional file management** system

---

**Built with clinical excellence, technical precision, and patient-first design for the Australian healthcare market.**
