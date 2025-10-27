# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Downscale Weight Loss Clinic Next.js platform with TWO MAIN SYSTEMS:

### 1. PUBLIC FRONT-FACING WEBSITE (Primary)
**MASSIVE SCALE: 79+ TOTAL PAGES**

#### Page Breakdown:
- **13 main website pages** (homepage, about, pricing, team, etc.)
- **6 clinical/service pillar pages** (nutrition, movement, mental health, etc.)
- **2 tools/calculator pages** (BMI calculator, goal setting)
- **3 blog system pages** + **24 dynamic blog posts** ([slug] routing)
- **27 location pages** (26 Australian cities + locations directory)
- **2 system pages** (auth, 404)
- **5 legacy redirects**

#### Total Website Scale:
- **55 static route pages** defined in Next.js App Router
- **24 dynamic blog posts** from Supabase
- **79+ accessible URLs** total
- **Deployed at**: ds-website-next-js.vercel.app

### 2. PATIENT PORTAL SYSTEM (Secondary)
- **7 health pillars** portal for authenticated patients
- **Admin management system** for content and users
- **Role-based access** (admin/practitioner/patient)
- **Internal JB&BB feed** and water tracking

## Core Commands

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Production build
npm run start                  # Start production server
npm run type-check            # TypeScript type checking
npm run lint                  # ESLint code quality check

# SEO & Content
npm run seo:check             # Run SEO validation
npm run seo:audit             # Comprehensive SEO audit
npm run seo:qa                # SEO quality assurance
npm run generate:sitemaps     # Generate blog sitemaps and RSS

# Performance & Analytics
npm run lighthouse            # Run Lighthouse performance test
npm run lhci                  # Lighthouse CI with assertions
npm run benchmark             # Performance benchmarking

# Health & Monitoring
npm run crawl:health          # Supabase health check
npm run crawl:test           # Test site crawlability
```

## Assessment Tools (Mobile-Optimized)

The platform includes professional clinical assessment tools with dedicated pages:

### Available Assessments
- **BED Assessment** (`/assessment/bed`) - Binge Eating Disorder screening questionnaire
- **ADHD Assessment** (`/assessment/adhd`) - Adult ADHD clinical screening tool
- **STOP-BANG Assessment** (`/assessment/stop-bang`) - Sleep apnoea risk evaluation
- **Epworth Sleepiness Scale** (`/assessment/epworth`) - Daytime sleepiness measurement
- **Body Metrics Calculator** (`/calculator`) - BMI and health metrics calculation

### Assessment Features
- **Mobile-First Design**: Touch-friendly interfaces with responsive layouts
- **Clinical Validation**: Evidence-based scoring and interpretation
- **Professional Integration**: Direct booking links to healthcare consultations
- **SEO Optimized**: Individual pages for search engine indexing
- **Compliance Ready**: TGA/AHPRA compliant disclaimers and language
- **Results Tracking**: Comprehensive scoring with risk stratification
- **User Journey**: Clear pathways from assessment to professional consultation

## Architecture

### Framework & Stack
- **Next.js 14** with App Router (migrated from Vite for SEO)
- **TypeScript** with strict type checking
- **Tailwind CSS** with custom Downscale dark theme design system
- **Supabase** for authentication, database, and file storage
- **shadcn/ui** + Radix UI for comprehensive component library
- **React Hook Form** with Zod validation
- **Wouter** for routing in portal components
- **React Markdown** for content rendering

### Key Directory Structure
```
src/
├── app/                           # Next.js App Router pages
│   ├── portal/                   # Patient portal with 7 health pillars
│   │   ├── admin/               # Full admin management system
│   │   ├── nutrition/           # Health pillar pages
│   │   ├── water/               # Gamified hydration tracking
│   │   ├── jb-bb-feed/         # Internal member blog
│   │   └── page.tsx             # Portal dashboard
│   ├── blog/                    # Public blog with [slug] routing
│   ├── weight-loss-clinic-*/    # 26+ location pages for SEO
│   └── page.tsx                 # Public homepage
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── portal/                  # Patient portal components
│   ├── admin/                   # Admin management components
│   ├── layout/                  # Header, Footer, Layout
│   └── locations/               # Location-specific components
├── contexts/
│   └── AuthContext.tsx          # Supabase authentication
└── integrations/
    └── supabase/                # Database client and types
```

### Critical Features

#### Public Website (Primary Focus)
1. **Location SEO Pages**: 26+ Australian city pages (weight-loss-clinic-[city])
2. **Navigation Dropdowns**: Clinical and Tools dropdown menus
3. **Public Blog**: Dynamic blog with [slug] routing and SSR
4. **Homepage Sections**: Hero, services, pricing, team, testimonials, contact
5. **Healthcare Pages**: Medicare, privacy, terms, complaints, FAQ
6. **Australian Compliance**: AHPRA, Medicare, TGA compliance throughout

#### Portal System (Secondary)
7. **Patient Portal**: 7 health pillars with content management
8. **Admin System**: Full-screen admin dashboard with file management
9. **Authentication**: Role-based access (admin/practitioner/patient)
10. **Water Tracking**: Gamified hydration with 8 notification personalities
11. **JB&BB Feed**: Internal member blog with media attachments
12. **Global Search**: Full-text search across all portal content

## Development Guidelines

### Australian Spelling & Terminology
- Always use Australian English: colour, centre, optimisation, realise
- Medical terms: GP (not PCP), chemist (not pharmacy), Medicare
- Currency: AUD formatting with $1,234.56

### Component Patterns
- Use shadcn/ui components as base
- Follow existing file naming: PascalCase for components
- Location components: `WeightLossClinic[City].tsx` pattern
- Page components match route structure

### Supabase Integration
- Client configured in `src/integrations/supabase/client.ts`
- Authentication context provides user state globally
- Database types auto-generated in `types.ts`
- Public keys exposed directly in client (anon key is safe for client-side)
- Portal content stored in `portal_content` table with pillar/section organization
- User profiles and preferences managed through Supabase Auth
- File uploads handled through Supabase Storage with signed URLs

### SEO Requirements
- All pages must have proper metadata
- Location pages need local SEO optimization
- Blog posts generate dynamic sitemap
- Structured data for medical content

### Content Management
- Blog posts stored in Supabase with markdown
- Admin panel for content editing
- Image optimization required for performance
- Australian healthcare compliance in all copy

## Design System (Downscale Brand)

### Color Palette
```css
--dark-slate: #334155        /* Main background */
--card-slate: #475569        /* Card backgrounds (ALL cards use dark slate) */
--deep-blue-grey: #2c3e50    /* Hero sections */
--muted-bronze: #8B6F47      /* Accent highlights */
--primary-brown: #b68a71     /* Headers, buttons, CTAs */
--soft-cream: #f7f2d3        /* Primary text */
--foreground: #f8fafc        /* Light text on dark backgrounds */
```

### Critical Design Rules
- **NO WHITE CARDS** - All cards must use `bg-slate-800` or darker
- **NO LIGHT CARDS** - Professional medical dark theme throughout
- **NO EMOJIS** - Professional medical aesthetic only
- **Brown Accents** - Use #b68a71 for all interactive elements
- **Dark Theme** - Consistent dark backgrounds with light text

### Typography
- Font: Inter with system fallbacks
- Headlines: Responsive clamp() sizing
- Medical professional aesthetic
- High contrast for accessibility (white text on dark backgrounds)

## Testing & Quality

### Build Process
- TypeScript errors MUST be fixed before deployment
- ESLint warnings should be addressed
- Lighthouse score target: >90
- Mobile-first responsive design required

### SEO Validation
Run `npm run seo:audit` before major releases to ensure:
- Proper meta tags on all pages
- Structured data validation
- Sitemap generation
- Australian local SEO compliance

## Healthcare Compliance

### Australian Regulations
- AHPRA registration displayed prominently
- TGA medication compliance
- Medicare provider information
- Privacy Act (APP) compliance
- Telehealth consultation protocols

### Content Requirements
- Evidence-based medical claims only
- Professional but approachable tone
- Telehealth accessibility focus
- State-based service variations (26 cities)

## Known Issues & Configurations

### Next.js Configuration
- `ignoreBuildErrors: true` in production (temporary)
- `ignoreDuringBuilds: true` for ESLint in production
- Typed routes enabled experimentally
- CSP headers configured for Vercel deployment
- Security headers (X-Frame-Options, X-Content-Type-Options) enabled

### Performance Considerations
- Images must be optimized (see scripts/)
- Critical CSS inlined for above-fold content
- Lazy loading for location pages
- Supabase connection pooling for database queries
- Bundle analysis available via `npm run build:analyze`

### Public Website Architecture
- **Homepage**: Hero section, services overview, pricing, team, testimonials, contact
- **Location Pages**: 26+ city-specific SEO pages with local healthcare info
- **Blog System**: Public blog with markdown rendering and dynamic routing
- **Navigation**: Header with Clinical and Tools dropdown menus
- **Healthcare Compliance**: Medicare, AHPRA, TGA information and policies

### Portal-Specific Architecture
- **7 Health Pillars**: nutrition, activity, mental-health, sleep-recovery, water, shop, medication
- **Role-Based Access**: Different views for admin, practitioner, and patient roles
- **Content Organization**: Two-level structure (pillar → sub-section)
- **Water Tracking**: Gamified system with 8 notification personalities
- **Global Search**: Cross-pillar content search functionality
- **Save System**: Patient bookmarking and annotation capabilities

### Known Critical Issues ⚠️
**PRODUCTION WEBSITE AT ds-website-next-js.vercel.app HAS MAJOR FAILURES:**

- **Navigation Dropdowns**: Clinical and Tools dropdowns NOT WORKING - buttons click but no dropdown appears
- **Blog Rendering**: All 24 blog posts show RAW HTML instead of rendered React components
- **SSR/Hydration**: Next.js server-side rendering and client hydration COMPLETELY BROKEN
- **React Components**: Not rendering properly on production site
- **User Experience**: UNUSABLE in current state

**URGENT**: These are not minor bugs - they are core functionality failures affecting the entire 79+ page website.

This codebase prioritizes Australian healthcare compliance, public website SEO performance, role-based portal functionality, and professional medical presentation while maintaining modern web development practices.