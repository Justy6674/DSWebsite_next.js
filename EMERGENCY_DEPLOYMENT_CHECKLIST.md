# EMERGENCY DEPLOYMENT CHECKLIST

## Pre-Deployment
- [x] Static robots.txt fallback created
- [x] Sitemap timestamps updated
- [x] URL validation completed
- [ ] Commit all changes to git
- [ ] Push to main branch

## Deployment
- [ ] Deploy to Vercel
- [ ] Verify robots.txt accessibility
- [ ] Test sitemap.xml accessibility
- [ ] Confirm Google verification file

## Post-Deployment Testing
- [ ] curl https://www.downscale.com.au/robots.txt
- [ ] curl https://www.downscale.com.au/sitemap.xml
- [ ] curl https://www.downscale.com.au/google8f3a5b2c1d9e7f4a.html
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor for crawl errors (24-48 hours)

## Supabase Recovery
- [ ] Contact Supabase support
- [ ] Check function deployment status
- [ ] Test function restoration
- [ ] Revert to dynamic functions when stable

**TIMELINE: Complete within 2 hours to prevent SEO impact**
