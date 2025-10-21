# Google Search Console Testing Checklist

## Pre-Deployment Testing (Local)

### 1. Code Review Checklist ✅
- [x] **robots.txt** - No subdomain allows
- [x] **sitemap.xml** - Only contains real URLs (no subdomains)
- [x] **_redirects** - Removed redirects for valuable subdomains
- [x] **SEOHelmet.tsx** - No automatic noindex for subdomains
- [x] **Google verification** - Removed broken file

### 2. Run Local Tests
```bash
# Run comprehensive test suite
./test-crawlability-comprehensive.sh

# Quick validation
./test-crawlability.sh
```

## Post-Deployment Testing (Production)

### 1. Immediate Tests (Within 1 Hour)

#### A. Manual URL Tests
Test these URLs in your browser - they should ALL return 200 OK:
- [ ] https://downscale.com.au/
- [ ] https://downscale.com.au/robots.txt
- [ ] https://downscale.com.au/sitemap.xml
- [ ] https://downscale.com.au/about
- [ ] https://downscale.com.au/medical-weight-management

#### B. Google Tools Testing
1. **robots.txt Tester** (in Search Console)
   - [ ] Go to: Search Console > Settings > robots.txt tester
   - [ ] Test URL: https://downscale.com.au/
   - [ ] Should show: "Allowed"

2. **URL Inspection Tool**
   - [ ] Test: https://downscale.com.au/
   - [ ] Click "Test Live URL"
   - [ ] Check for: "URL is available to Google"
   - [ ] Check robots.txt: "Allowed"
   - [ ] Check indexing: "Page can be indexed"

3. **Mobile-Friendly Test**
   - [ ] Go to: https://search.google.com/test/mobile-friendly
   - [ ] Test: https://downscale.com.au/
   - [ ] Should show: "Page is mobile friendly"

4. **Rich Results Test**
   - [ ] Go to: https://search.google.com/test/rich-results
   - [ ] Test: https://downscale.com.au/
   - [ ] Check for valid structured data

### 2. Search Console Actions (Do Immediately)

1. **Submit Updated Sitemap**
   - [ ] Go to: Search Console > Sitemaps
   - [ ] Remove old sitemap if exists
   - [ ] Add new sitemap: https://downscale.com.au/sitemap.xml
   - [ ] Click "Submit"
   - [ ] Status should show: "Success"

2. **Request Indexing**
   - [ ] Use URL Inspection on homepage
   - [ ] Click "Request Indexing"
   - [ ] Do this for top 5 pages

3. **Check Coverage Report**
   - [ ] Go to: Search Console > Coverage
   - [ ] Look for errors (should decrease)
   - [ ] Check "Excluded" pages

### 3. Monitoring Schedule

#### Day 1-3 (Daily Checks)
- [ ] Coverage report - errors decreasing?
- [ ] Crawl stats - requests increasing?
- [ ] URL Inspection - pages indexed?

#### Week 1 (Every 2 Days)
- [ ] Search Analytics - impressions returning?
- [ ] Sitemaps - all URLs discovered?
- [ ] Core Web Vitals - passing?

#### Week 2-4 (Weekly)
- [ ] Rankings recovering?
- [ ] All pages indexed?
- [ ] No new errors?

## Command Line Testing

```bash
# Test robots.txt
curl -I https://downscale.com.au/robots.txt

# Test sitemap
curl -I https://downscale.com.au/sitemap.xml

# Check for redirect loops
curl -IL https://downscale.com.au/ | grep -E "HTTP|Location"

# Test page load time
time curl -s https://downscale.com.au/ > /dev/null

# Check meta tags
curl -s https://downscale.com.au/ | grep -E "robots|canonical|noindex"
```

## Success Indicators

### Within 48 Hours:
- ✅ No new crawl errors in Search Console
- ✅ Sitemap shows "Success" status
- ✅ URL Inspection shows "URL is available to Google"

### Within 1 Week:
- ✅ Coverage report shows pages being indexed
- ✅ Crawl stats show increased activity
- ✅ No "Duplicate without canonical" errors

### Within 2-4 Weeks:
- ✅ Search impressions increasing
- ✅ Rankings recovering
- ✅ All important pages indexed

## Red Flags to Watch For

- 🚨 Crawl errors increasing
- 🚨 Pages marked as "Excluded"
- 🚨 "Duplicate content" warnings
- 🚨 Sitemap errors
- 🚨 Mobile usability issues

## Emergency Contacts

If issues persist after 72 hours:
1. Check Google Search Central Help
2. Post in Google Search Central Community
3. Use Search Console feedback option

Remember: Changes can take 2-4 weeks to fully reflect in search results. Be patient but monitor daily!