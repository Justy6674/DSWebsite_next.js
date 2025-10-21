# DS.H Development Guidelines

Auto-generated from all feature plans. Last updated: 2024-09-20

## Active Technologies

- **Frontend**: React 18.3.1 with TypeScript 5.5.3
- **Build Tool**: Vite 5.4.1 with SWC plugin
- **UI Framework**: shadcn/ui with Radix UI components
- **Styling**: Tailwind CSS 3.4.11 with custom brown theme
- **Routing**: Wouter 3.7.1 (lightweight React router)
- **State Management**: React hooks and context
- **Forms**: React Hook Form 7.53.0 with Zod 3.23.8 validation
- **Backend**: Supabase 2.50.5 for database and functions
- **SEO**: React Helmet Async 2.0.5 for meta management
- **Analytics**: Web Vitals 5.0.3 monitoring
- **Testing**: Lighthouse CI for performance auditing

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui base components
│   ├── StructuredData.tsx  # SEO schema components
│   └── [feature-components]
├── pages/             # Route components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── config/            # Configuration files
└── types/             # TypeScript type definitions

public/                # Static assets
scripts/               # Build and SEO scripts
supabase/             # Database functions and config
```

## Commands

### Development
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### SEO & Performance
- `npm run seo:check` - Run SEO validation
- `npm run seo:audit` - Comprehensive SEO audit
- `npm run seo:qa` - Quality assurance validation
- `npm run sitemap:generate` - Generate optimized sitemaps
- `npm run lighthouse` - Run Lighthouse performance audit
- `npm run lhci` - Lighthouse CI with assertions

### Crawling & Monitoring
- `npm run crawl:health` - Check Supabase health
- `npm run crawl:test` - Test crawlability
- `npm run crawl:emergency` - Emergency crawlability fix

## Code Style

### TypeScript/React
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use const assertions for immutable data
- Implement proper error boundaries
- Follow React best practices for performance

### Styling
- Use Tailwind CSS utility classes
- Follow brown/earth tone color scheme (`text-brown`, `bg-brown`, etc.)
- Responsive design with mobile-first approach
- Use shadcn/ui components as base, customize with Tailwind

### SEO Requirements
- Every page must have proper meta tags via React Helmet
- Implement structured data using StructuredData component
- Optimize images with proper alt text and lazy loading
- Ensure proper heading hierarchy (h1 → h2 → h3)
- Include breadcrumbs for navigation

### File Naming
- Use PascalCase for React components (`HomePage.tsx`)
- Use camelCase for utilities and hooks (`useLocalStorage.ts`)
- Use kebab-case for directories (`src/components/ui/`)

## Recent Changes

1. **SEO Implementation** - Comprehensive sitemap generation, robots.txt optimization, and structured data implementation for Australian healthcare market
2. **Performance Optimization** - Image optimization with WebP conversion, code splitting, and Lighthouse CI integration
3. **Telehealth Features** - Location-specific landing pages for Australian cities with Medicare bulk billing information

## Slash Commands

Use these commands for spec-driven development:

### /constitution
Create or update project governing principles and development guidelines.

**Usage**: `/constitution Create principles focused on code quality, testing standards, user experience consistency, and performance requirements`

### /specify  
Define what you want to build (requirements and user stories). Focus on the **what** and **why**, not the tech stack.

**Usage**: `/specify Build a telehealth booking system that allows patients to schedule appointments with healthcare providers across Australia`

### /plan
Create technical implementation plans with your chosen tech stack and architecture.

**Usage**: `/plan Use React with TypeScript, implement real-time booking with Supabase, ensure HIPAA compliance`

### /tasks
Generate actionable task lists for implementation from your plan.

**Usage**: `/tasks`

### /implement
Execute all tasks to build the feature according to the plan.

**Usage**: `/implement`

<!-- MANUAL ADDITIONS START -->
## Healthcare Compliance
- Ensure HIPAA compliance for patient data handling
- Implement proper data encryption for sensitive information
- Follow Australian healthcare regulations for telehealth services
- Include Medicare bulk billing information where applicable

## Performance Requirements
- Maintain Core Web Vitals scores above 90
- Ensure mobile responsiveness across all devices
- Optimize for Australian healthcare search terms
- Implement proper caching strategies for static content
<!-- MANUAL ADDITIONS END -->