# Sitemap & Page Configuration - Quick Reference

**Last Updated:** October 27, 2025  
**Total Public Pages:** 88

---

## 📊 Page Count Summary

| Category | Count | Source |
|----------|-------|--------|
| Core Pages | 25 | `src/app/*/page.tsx` |
| Assessment Tools | 5 | `src/app/assessment/*/page.tsx` |
| Location Pages | 34 | `src/app/weight-loss-clinic-*/page.tsx` |
| Blog Posts | 24 | Supabase `blog_posts` table |
| **TOTAL** | **88** | |

---

## 📁 Key Configuration Files

### 1. Next.js Dynamic Sitemap
**File:** `src/app/sitemap.ts`

Generates the main sitemap at `/sitemap.xml` with:
- 25 core pages (homepage + 24 static pages)
- 34 location pages (Australian cities)
- 5 assessment tools
- ~24 blog posts (fetched dynamically from Supabase)

**URL:** https://www.downscale.com.au/sitemap.xml

---

### 2. Robots.txt Configuration
**File:** `src/app/robots.ts`

Generates `/robots.txt` with:
- ✅ Allow all public pages
- ❌ Block `/admin/`, `/portal/`, `/api/`, `/blog-admin`
- References all sitemap files

**URL:** https://www.downscale.com.au/robots.txt

---

### 3. Static Sitemaps (Backup)
**Location:** `public/sitemap-*.xml`

Pre-generated sitemaps for redundancy:
- `sitemap-static.xml` (28 URLs)
- `sitemap-locations.xml` (34 URLs)
- `sitemap-blog.xml` (24 blog posts + 6 static)
- `sitemap-images.xml` (image sitemap)
- `sitemap-index.xml` (sitemap index)

---

## 🔍 How to Verify

### Check all pages exist:
```bash
# Count public page files (should be 65: 25 core + 5 assessment + 34 location + 1 blog template)
find src/app -name "page.tsx" | grep -v -E "(portal|admin|auth|test-upload|f/\[slug\])" | wc -l
```

### Check sitemap generation:
```bash
# Build the project to generate sitemap
npm run build

# Check generated sitemap
curl https://www.downscale.com.au/sitemap.xml
```

### Check robots.txt:
```bash
curl https://www.downscale.com.au/robots.txt
```

---

## 📝 Core Pages List (25)

1. `/` - Homepage
2. `/about` - About page
3. `/blog` - Blog index
4. `/blogs/news` - News blog (legacy route)
5. `/calculator` - BMI/Health calculator
6. `/clinical-services` - Clinical services
7. `/complaints` - Complaints policy
8. `/conditions` - Conditions we treat
9. `/data-deletion` - Data deletion policy
10. `/facts` - Health facts
11. `/faq` - Frequently asked questions
12. `/goal-setting-maintenance` - Goal setting
13. `/how-it-works` - How it works
14. `/locations` - Locations index
15. `/medical-weight-management` - Medical weight management
16. `/medicare` - Medicare information
17. `/meet-the-team` - Team page
18. `/mental-health-support` - Mental health services
19. `/movement-activity-programs` - Activity programs
20. `/nutrition-meal-planning` - Nutrition services
21. `/pricing` - Pricing page
22. `/privacy` - Privacy policy
23. `/sleep-recovery-optimisation` - Sleep services
24. `/terms` - Terms of service
25. `/tools` - Health tools

---

## 🔬 Assessment Tools (5)

1. `/assessment/adhd` - ADHD assessment
2. `/assessment/bed` - Binge Eating Disorder assessment
3. `/assessment/epworth` - Epworth Sleepiness Scale
4. `/assessment/menopause` - Menopause assessment
5. `/assessment/stop-bang` - STOP-BANG questionnaire

---

## 📍 Location Pages (34 Australian Cities)

All formatted as `/weight-loss-clinic-{city-name}`:

1. Adelaide
2. Albury Wodonga
3. Alice Springs
4. Ballarat
5. Bendigo
6. Brisbane
7. Bunbury
8. Cairns
9. Canberra
10. Central Coast
11. Darwin
12. Devonport
13. Dubbo
14. Geelong
15. Gold Coast
16. Hobart
17. Kalgoorlie
18. Launceston
19. Mackay
20. Mandurah
21. Melbourne
22. Mildura
23. Mount Gambier
24. Mount Isa
25. Newcastle
26. Perth
27. Rockhampton
28. Sunshine Coast
29. Sydney
30. Toowoomba
31. Townsville
32. Wagga Wagga
33. Whyalla
34. Wollongong

---

## 📰 Blog Posts (24)

Blog posts are stored in Supabase and dynamically rendered via `/blog/[slug]`.

Current published posts:
1. adhd-and-weight-gain
2. choosing-the-best-medical-weight-loss-clinic-in-australia
3. choosing-the-best-weight-loss-support-gp-or-specialist
4. choosing-the-right-weight-loss-clinic-in-australia-the-downscale-difference
5. ending-weight-loss-stigma-why-are-our-health-professionals-so-biased
6. evidence-based-nutrition-strategies-for-sustainable-weight-loss
7. evidence-based-obesity-management-in-telehealth-how-downscale-integrates-australian-international-guidelines
8. losing-weight-after-40
9. medicare-telehealth-changes-essential-information-for-weight-loss
10. my-journey-founding-downscale-health-for-sustainable-care
11. navigating-your-weight-loss-journey-why-downscale-patients-thrive-both-in-clinic-and-online
12. overcoming-weight-loss-plateaus-proven-strategies-for-success
13. physical-activity-for-weight-management-evidence-based-guidelines
14. science-of-hydration
15. sustainable-nutrition
16. the-hidden-costs-of-bmi-discharge-sustainable-weight-loss-in-australia
17. the-hidden-impact-of-weight-on-intimacy-in-australia
18. the-importance-of-weight-maintenance-in-obesity-management-don-t-stop
19. the-psychology-of-sustainable-behavior-change
20. understanding-glp-1-medications-for-weight-management
21. understanding-insulin-resistance-a-systemic-health-issue
22. understanding-insulin-resistance-links-to-adhd-pcos-and-weight
23. weight-bias-and-weight-stigma
24. weight-loss-medications-an-evidence-based-approach

---

## 🚫 Excluded Pages (Private)

These pages exist but are correctly excluded from sitemaps:

- `/portal/*` - Patient portal (auth required)
- `/blog-admin` - Blog admin (auth required)
- `/auth` - Authentication page
- `/test-upload` - Testing page
- `/f/[slug]` - File serving routes
- `/home/f/[slug]` - Alternative file routes

---

## ✅ Everything is Configured Correctly

All 88 public pages are:
- ✅ Present in the repository
- ✅ Included in sitemap.ts
- ✅ Properly configured in robots.ts
- ✅ Accessible on the live site

**No changes needed!**

---

For detailed audit information, see `COMPLETE_PAGE_AUDIT.md`.
