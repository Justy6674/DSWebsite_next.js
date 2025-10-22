# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Downscale Weight Loss Clinic Next.js platform - an Australian telehealth medical website with SEO optimization, blog system, and location-based pages. The project migrated from Vite to Next.js specifically to resolve SEO issues and enable server-side rendering.

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

## Architecture

### Framework & Stack
- **Next.js 14** with App Router (migrated from Vite for SEO)
- **TypeScript** with strict type checking
- **Tailwind CSS** with custom Downscale design system
- **Supabase** for authentication and database
- **shadcn/ui** + Radix UI for components

### Key Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth routes)      # Authentication pages
│   ├── blog/              # Blog system with [slug] routing
│   ├── weight-loss-clinic-*/  # 26+ location pages
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Header, Footer, Layout
│   ├── locations/         # Location-specific components
│   └── blog/              # Blog admin and rendering
├── contexts/
│   └── AuthContext.tsx    # Supabase authentication
└── integrations/
    └── supabase/          # Database client and types
```

### Critical Features
1. **Location Pages**: 26+ Australian city pages for local SEO
2. **Blog System**: Admin panel with markdown editor and preview
3. **Authentication**: Supabase auth with patient matching
4. **SEO Optimization**: SSR/SSG for all content pages
5. **Australian Compliance**: AHPRA, Medicare, TGA compliance throughout

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
- Environment variables for Supabase URL and key

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
--deep-blue-grey: #2c3e50    /* Hero sections */
--muted-bronze: #8B6F47      /* Accent highlights */
--soft-cream: #f7f2d3        /* Primary text */
```

### Typography
- Font: Inter with system fallbacks
- Headlines: Responsive clamp() sizing
- Medical professional aesthetic
- High contrast for accessibility

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

### Performance Considerations
- Images must be optimized (see scripts/)
- Critical CSS inlined for above-fold content
- Lazy loading for location pages
- Supabase connection pooling for database queries

This codebase prioritizes Australian healthcare compliance, local SEO, and professional medical presentation while maintaining modern web development practices.