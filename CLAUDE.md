# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Downscale Weight Loss Clinic - Australian telehealth platform with two main systems:

### 1. PUBLIC WEBSITE (Primary)
- **120+ pages**: Homepage, 26+ location pages, blog system, assessment tools, legal pages
- **Deployed**: www.downscale.com.au
- **Focus**: SEO, Australian healthcare compliance, lead generation

### 2. PATIENT PORTAL (Secondary)
- **Dashboard + 6 health pillars**: Medication, Nutrition, Activity, Mental Health, Sleep, Water
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
npm run lighthouse            # Lighthouse performance test
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
- Client: `src/integrations/supabase/client.ts`
- Database: `https://pooebqhsshfafkhvccrl.supabase.co`
- Authentication context provides global user state
- Portal content in `portal_content` table
- File uploads via Supabase Storage with signed URLs

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

### Common Tasks
```bash
# Add new assessment tool
1. Create `/assessment/[tool]/page.tsx`
2. Mobile-first design with touch targets
3. Clinical validation and scoring
4. TGA/AHPRA compliant disclaimers

# Add location page
1. Create `/weight-loss-clinic-[city]/page.tsx`
2. Local SEO optimization
3. Australian healthcare info
4. Consistent template structure
```

## Critical Configuration Notes

### Next.js Setup
- **Production builds ignore TypeScript/ESLint errors** (temporary config)
- **Typed routes enabled experimentally**
- **SSG/ISR for blog posts** with 1-hour revalidation
- **Performance caching** headers for all page types

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

**Always follow the 7-step workflow. Never skip assessment or production testing.**