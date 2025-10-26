# Performance Optimization Tools

This directory contains scripts for comprehensive performance optimization and auditing.

## Available Scripts

### Performance Audit
```bash
npm run perf:audit
```
Runs a comprehensive audit of all pages checking:
- Image optimization (WebP usage)
- Meta tags and SEO
- Canonical URLs
- Preload hints
- Soft 404 issues

Generates `performance-audit-report.json` with detailed findings.

### Optimize Page Metadata
```bash
npm run perf:optimize
```
Automatically adds missing metadata to pages:
- OpenGraph tags
- Twitter cards
- Canonical URLs

Processes all public pages (skips portal/auth pages).

### Convert Images to WebP
```bash
npm run perf:images
```
Converts PNG and JPG images to WebP format using Sharp:
- Quality: 85%
- Effort: 6 (high compression)
- Reports size savings
- Preserves original images

### Add Canonical URLs
```bash
npm run perf:canonical
```
Adds canonical URLs to pages missing them for proper SEO.

## Usage Examples

### Full Optimization Workflow
```bash
# 1. Run initial audit
npm run perf:audit

# 2. Convert images to WebP
npm run perf:images

# 3. Optimize metadata
npm run perf:optimize

# 4. Add canonical URLs
npm run perf:canonical

# 5. Run final audit
npm run perf:audit

# 6. Build and test
npm run build
```

### Quick Check
```bash
npm run perf:audit
```

## Script Details

### comprehensive-performance-audit.mjs
- Scans all pages in src/app
- Checks metadata completeness
- Validates image optimization
- Detects missing canonical URLs
- Generates performance score (0-100)

### optimize-page-metadata.mjs
- Adds OpenGraph tags for social sharing
- Adds Twitter card metadata
- Ensures canonical URLs present
- Maintains existing metadata

### convert-images-to-webp.mjs
- Uses Sharp library for conversion
- 85% quality maintains visual fidelity
- Reports before/after sizes
- Calculates percentage savings

### add-canonical-urls.mjs
- Adds canonical URLs to metadata
- Uses proper URL structure
- Maintains existing metadata

## Performance Metrics

Current optimization status:
- **Optimized Pages**: 49% (33/68)
- **WebP Images**: 63
- **Size Reduction**: 90.1% (28.27 MB saved)
- **Missing WebP**: 1 (ocean-waves.jpg - conversion failed due to unsupported format)

Target goals:
- **Optimized Pages**: 85%+
- **All critical images**: WebP format
- **LCP**: <2.5s
- **Performance Score**: 90+

## Dependencies

- `sharp`: Image processing library
- Node.js 18+ recommended

## Notes

- Portal pages are auth-protected and may not need full SEO
- Dynamic routes need code-level changes for metadata
- Run build after optimizations to verify changes
- Use Lighthouse CI for production testing
