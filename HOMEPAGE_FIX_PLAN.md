# Downscale Homepage Fix Plan

## Immediate Actions Required

### 1. Fix Homepage Identity Crisis
The main issue is that your HomePage component is named "Services" internally but serves as the homepage. This creates deployment confusion.

**Current Problem:**
- HomePage.tsx exports `function Services()` but is used as homepage
- Route "/" points to HomePage
- Route "/services" also points to HomePage
- This creates circular references and confuses Lovable

### 2. Performance Issues Causing Slow Loading

**Identified Problems:**
1. Hero images loading without optimization
2. Multiple large images in lovable-uploads (all PNG format, not WebP)
3. Inline JSON-LD schemas blocking render
4. No proper lazy loading for below-fold content
5. Heavy JavaScript bundle (73+ dependencies)

### 3. Deployment Configuration Issues

**Problems:**
- No deployment lock file (vercel.json, netlify.toml)
- No build optimization settings
- No cache headers configured
- Missing performance budgets

## Quick Fix Implementation

### Step 1: Rename HomePage Component
Change the HomePage export to properly identify as HomePage, not Services.

### Step 2: Create Proper Services Page
Create a dedicated services page if needed, separate from homepage.

### Step 3: Optimize Images
- Convert all PNGs to WebP format
- Implement proper lazy loading
- Add loading="eager" only for above-fold hero image

### Step 4: Fix Build Configuration
- Add deployment configuration
- Set up proper caching
- Implement build optimizations

### Step 5: Add Deployment Lock
Create a deployment configuration that prevents automatic overwrites.