# @copilot_portals_setup.md

## GitHub Copilot Portals Configuration

This file configures GitHub Copilot portals for the DS.H (Downscale Healthcare) project, enabling AI-assisted development with spec-driven methodology.

### Portal Configuration

#### Primary Development Portal
- **Name**: DS.H Healthcare Platform
- **Type**: React/TypeScript Application
- **Domain**: Medical Weight Loss Platform
- **Target**: Australian Healthcare Market

#### AI Assistant Integration
- **Primary Agent**: GitHub Copilot
- **Secondary Support**: Claude Code, Cursor
- **Context Files**: 
  - `.github/copilot-instructions.md`
  - `memory/constitution.md` (when available)
  - `specs/*/spec.md` (feature specifications)

### Spec-Driven Development Workflow

#### 1. Constitution Phase
```bash
/constitution Create principles focused on healthcare compliance, telehealth regulations, patient data security, and Australian medical standards
```

#### 2. Specification Phase  
```bash
/specify Build a comprehensive telehealth platform that enables Australian patients to access weight management services with Medicare bulk billing, online consultations, and prescription management
```

#### 3. Planning Phase
```bash
/plan Implement using React 18 with TypeScript, Vite build system, Supabase backend, shadcn/ui components, Tailwind CSS with healthcare-appropriate styling, and comprehensive SEO optimization for Australian medical search terms
```

#### 4. Task Generation
```bash
/tasks Generate implementation tasks focusing on patient portal, provider dashboard, appointment scheduling, prescription management, and compliance features
```

#### 5. Implementation
```bash
/implement Execute the full development plan with healthcare compliance and Australian regulations in mind
```

### Project Context

#### Healthcare Domain Requirements
- **Compliance**: HIPAA, Australian healthcare regulations
- **Services**: Weight management, telehealth consultations, prescription services
- **Target Markets**: 13 Australian cities (Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Newcastle, Canberra, Sunshine Coast, Wollongong, Geelong, Hobart, Townsville)
- **Billing**: Medicare bulk billing integration
- **Provider**: Licensed Nurse Practitioner (Justin Black)

#### Technical Stack
- **Frontend**: React 18.3.1, TypeScript 5.5.3, Vite 5.4.1
- **UI**: shadcn/ui, Radix UI, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Edge Functions)
- **SEO**: Comprehensive sitemap generation, structured data
- **Performance**: Lighthouse CI, Core Web Vitals monitoring
- **Deployment**: Vercel with custom domain (downscale.com.au)

#### Current Features
1. **Homepage**: Hero section with booking CTA, service overview
2. **Location Pages**: City-specific landing pages for SEO
3. **About Page**: Provider credentials and philosophy
4. **Service Pages**: Weight management, prescription services, telehealth
5. **FAQ System**: Common questions about services and billing
6. **SEO Infrastructure**: Sitemaps, robots.txt, structured data
7. **Analytics**: Performance monitoring and user tracking

### Portal Guidelines

#### Code Quality Standards
- TypeScript strict mode enabled
- ESLint configuration for React/healthcare compliance
- Comprehensive error handling
- Responsive design (mobile-first)
- Accessibility compliance (WCAG 2.1)

#### SEO Requirements
- Every page requires proper meta tags
- Structured data for healthcare services
- Australian location-specific optimization
- Medical authority content (E-A-T)
- Core Web Vitals optimization

#### Security & Compliance
- Patient data encryption
- Secure API endpoints
- HIPAA-compliant data handling
- Australian healthcare regulation compliance
- PCI DSS for payment processing

### Development Commands

#### Daily Development
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Code quality check
npm run seo:check    # SEO validation
```

#### Quality Assurance
```bash
npm run seo:audit    # Comprehensive SEO audit
npm run lhci         # Lighthouse CI performance testing
npm run crawl:test   # Crawlability testing
```

#### Deployment Preparation
```bash
npm run build && npm run seo:qa  # Build and validate for production
```

### Portal Integration Notes

1. **Context Awareness**: Copilot should maintain awareness of healthcare compliance requirements
2. **Australian Focus**: All content and features should consider Australian healthcare system
3. **SEO Priority**: Search optimization is critical for organic patient acquisition
4. **Performance**: Healthcare users expect fast, reliable service
5. **Accessibility**: Medical platforms must be accessible to diverse user populations

### File Structure for Copilot Context

```
.github/
├── copilot-instructions.md     # Main AI context file
└── workflows/                  # CI/CD pipelines

memory/                         # Spec-kit memory system
├── constitution.md            # Project principles
└── constitution_update_checklist.md

specs/                         # Feature specifications
└── [feature-name]/
    ├── spec.md               # Detailed requirements
    ├── plan.md               # Technical implementation
    └── tasks.md              # Implementation tasks

src/                          # Application source
├── components/               # React components
├── pages/                    # Route components
├── lib/                      # Utilities
└── types/                    # TypeScript definitions
```

### Success Metrics

- **SEO**: Rank in top 3 for "weight loss clinic [city]" searches
- **Performance**: Core Web Vitals scores > 90
- **Conversion**: Online consultation booking rate > 5%
- **Compliance**: 100% healthcare regulation adherence
- **User Experience**: Mobile-responsive, accessible design

### Next Steps

1. Establish project constitution with healthcare-specific principles
2. Create detailed feature specifications for patient portal
3. Implement booking system with Medicare integration
4. Develop provider dashboard for consultation management
5. Integrate prescription management system
6. Implement comprehensive analytics and monitoring

---

*This file serves as the primary configuration for GitHub Copilot portals in the DS.H healthcare platform project. It should be updated as the project evolves and new features are added.*