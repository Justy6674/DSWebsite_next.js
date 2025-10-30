# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Downscale Weight Loss Clinic - Australian telehealth platform with two main systems:

### 1. PUBLIC WEBSITE (Primary)
- **120+ pages**: Homepage, 26+ location pages, blog system, assessment tools, legal pages
- **Deployed**: www.downscale.com.au
- **Focus**: SEO, Australian healthcare compliance, lead generation

### 2. PATIENT PORTAL (Secondary)
- **Dashboard + 7 health pillars**: Medication, Nutrition, Activity, Mental Health/Goal Setting, Sleep, Water
- **Admin content management system** (fully operational)
- **Role-based access**: admin/practitioner/patient

## 🚨 MANDATORY DEVELOPMENT WORKFLOW

**NEVER patch and guess. If broken, follow this exact process:**

1. **ASSESS**: Use Playwright to examine the actual issue on production URL
2. **CONSIDER**: Understand root cause, not symptoms
3. **FIX**: Implement proper solution using best practices
4. **PUSH**: Commit to git main automatically
5. **TEST**: Use Playwright on production URL to verify fix
6. **VERIFY**: Confirm the fix actually worked
7. **REPEAT**: If not fixed, repeat entire process until perfect

## Essential Commands

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Production build
npm run type-check            # TypeScript type checking
npm run lint                  # ESLint code quality check

# Quality Gates (run before marking complete)
npm run lint && npm run type-check && npm run seo:check

# SEO & Performance
npm run seo:audit             # Comprehensive SEO audit
npm run seo:qa                # Quality assurance validation
npm run lighthouse            # Lighthouse performance test
npm run perf:audit            # Comprehensive performance audit

# Blog Management
npm run generate:sitemaps     # Generate blog sitemap & RSS feed
npm run sitemap:generate      # Generate optimized sitemaps

# Content Optimization
npm run perf:images           # Convert images to WebP format
npm run perf:optimize         # Optimize page metadata
npm run perf:canonical        # Add canonical URLs
```

## Architecture

**Framework**: Next.js 14 App Router + TypeScript
**Database**: Supabase PostgreSQL with Row Level Security
**Styling**: Tailwind CSS + shadcn/ui components
**Authentication**: Supabase Auth with role-based access

### Key Directory Structure
```
src/
├── app/                     # Next.js App Router pages
│   ├── portal/             # Patient portal + admin system
│   ├── blog/               # Public blog with [slug] routing
│   ├── weight-loss-clinic-*/ # 26+ location pages for SEO
│   └── assessment/         # Clinical assessment tools
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── portal/             # Patient portal components
│   └── admin/              # Admin management components
└── integrations/supabase/  # Database client and types
```

## 🚨 CRITICAL DESIGN RULES

### Downscale Brand System
- **NO WHITE OR LIGHT CARDS** - Always use `bg-slate-800` or darker
- **NO EMOJIS** - Professional medical aesthetic only
- **Dark theme throughout** - `#334155` background, `#475569` for cards
- **Brown accents** - `#b68a71` for headers, buttons, CTAs
- **Mobile-first responsive design** required

### Component Patterns
- Use shadcn/ui components as base
- Follow PascalCase naming: `WeightLossClinic[City].tsx`
- Location pages use consistent SEO structure
- All cards use dark slate backgrounds only

## Australian Healthcare Compliance

### Critical Requirements
- **Australian spelling**: colour, centre, optimisation, realise
- **Medical terms**: GP (not PCP), chemist (not pharmacy), Medicare
- **CRITICAL**: Never mention "bulk billing" - billing changed 1st November
- **TGA/AHPRA compliance** in all medical content
- **Evidence-based claims** only

### Supabase Integration
- **Client**: `src/integrations/supabase/client.ts`
- **Database URL**: `https://pooebqhsshfafkhvccrl.supabase.co`
- **Project ID**: `pooebqhsshfafkhvccrl`
- **Authentication**: Supabase Auth with role-based access
- **Storage Buckets**:
  - `portal-files`: Public bucket for portal content
  - `patient-documents`: Private bucket with RLS for patient files
- **Key Tables**:
  - `portal_content`: Main content repository
  - `user_profiles`: User data with role management
  - `jb_bb_feed`: Internal blog posts
  - `patient_notifications`: Notification settings

### Edge Functions
- **AI Functions**: ai-interpret-calculator, blog-ai-optimizer, sleep-ai-analysis, claude-chat
- **SEO Functions**: generate-sitemap, sitemap-xml, robots-txt, blog-rss
- **Image Functions**: optimize-image
- **API Functions**: halaxy-auth, halaxy-api, website-crawler

## Key Development Patterns

### Testing Requirements
- **TypeScript errors MUST be fixed** before deployment
- **Mobile-first responsive design** required
- **Test on production URL**, not localhost
- **Lighthouse score target**: >90

### SEO Patterns
- Location pages: `/weight-loss-clinic-[city]/`
- Assessment tools: `/assessment/[tool-name]/`
- Blog system: `/blog/[slug]/` with SSG/ISR
- All pages need proper metadata and structured data

### Common Development Tasks

#### Adding a Location Page
```bash
# 1. Create the page component
src/app/weight-loss-clinic-[city]/page.tsx

# 2. Required elements:
- SEO metadata with city-specific keywords
- Structured data for LocalBusiness schema
- Medicare bulk billing information
- Australian healthcare compliance
- Mobile-first responsive design
```

#### Adding an Assessment Tool
```bash
# 1. Create the assessment page
src/app/assessment/[tool-name]/page.tsx

# 2. Required elements:
- Clinical validation logic
- Score calculation and interpretation
- TGA/AHPRA compliant disclaimers
- Touch-friendly UI (44px minimum targets)
- Results storage in Supabase
```

#### Portal Content Management
```bash
# 1. Access admin portal
/portal/admin

# 2. Navigate to Portal Content Manager
# 3. Select pillar and sub-section
# 4. Upload content with metadata
# 5. Preview and publish
```

## Critical Configuration Notes

### Next.js Configuration
- **Build Optimization**: Production builds temporarily ignore TypeScript/ESLint errors
- **Routing**: Typed routes enabled, trailing slashes enforced
- **Rendering Strategy**:
  - SSR enabled for blog posts from Supabase
  - ISR with 1-hour revalidation for dynamic content
  - Static generation for location and service pages
- **Caching Headers**:
  - Blog posts: 1hr cache, 24hr stale-while-revalidate
  - Location pages: 24hr cache, 1 week stale-while-revalidate
  - Assessment tools: 2hr cache, 24hr stale-while-revalidate
- **Image Optimization**: WebP/AVIF formats with responsive sizing

### File Preview System
- **PDF thumbnails**: Browser-native iframe rendering (no external libraries)
- **Universal previews**: FilePreviewClient component handles all file types
- **Supabase storage**: Public bucket `portal-files/other/` with signed URLs

## Best Practices Reminder

### Mobile-First Architecture
- Use CSS Grid with `100dvh` (dynamic viewport height)
- Component-scoped styles, never global CSS hacks
- Touch-friendly interfaces (44px minimum targets)
- Test on production URL with real devices

### Next.js Performance
- Use `next/image` with `priority` for above-fold images
- Implement proper `generateStaticParams()` for dynamic routes
- Apply semantic HTML structure
- Consider Google crawling and SEO in all implementations

## Database Schema Key Points

### User Profiles Pattern
- **Single user table**: `user_profiles` with `metadata` JSONB column
- **Never create separate user tables** for saved items
- **All user data in metadata**: saved_searches, saved_reports, preferences
- **RLS policies** enforce security at database level

### Storage Security
- **Public buckets**: portal-files for general content
- **Private buckets**: patient-documents with owner-based RLS
- **Signed URLs**: Required for all private file access
- **File organization**: Pillar-based folder structure

## Testing & Validation Workflow

**Always follow the 7-step workflow:**
1. **ASSESS**: Use Playwright to examine the issue
2. **CONSIDER**: Understand root cause, not symptoms
3. **FIX**: Implement proper solution
4. **PUSH**: Auto-commit to git main
5. **TEST**: Verify on production URL
6. **VERIFY**: Confirm fix worked
7. **REPEAT**: If not fixed, repeat entire process

**Never skip assessment or production testing.**