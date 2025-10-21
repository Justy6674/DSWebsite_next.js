#!/usr/bin/env node

/**
 * Sitemap Architecture Verification Script
 * Verifies no duplicate URLs across all sitemaps and validates blog sitemap
 */

const BASE_URL = 'https://www.downscale.com.au';

const SITEMAP_ENDPOINTS = [
  '/sitemap.xml',
  '/sitemap-blog.xml',
  '/sitemap-locations.xml',
  '/sitemap-images.xml'
];

async function fetchSitemap(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error(`❌ Failed to fetch ${url}:`, error.message);
    return null;
  }
}

function extractUrls(xmlContent) {
  const urlMatches = xmlContent.match(/<loc>(.*?)<\/loc>/g);
  if (!urlMatches) return [];
  return urlMatches.map(match => match.replace(/<\/?loc>/g, ''));
}

async function verifySitemapArchitecture() {
  console.log('🔍 SITEMAP ARCHITECTURE VERIFICATION\n');
  console.log('=' .repeat(60));
  console.log('\n');

  const allUrls = new Map(); // URL -> sitemap source
  let totalUrls = 0;
  let duplicateCount = 0;
  const duplicates = [];

  // Fetch and analyze each sitemap
  for (const endpoint of SITEMAP_ENDPOINTS) {
    const url = `${BASE_URL}${endpoint}`;
    console.log(`📄 Checking: ${endpoint}`);
    
    const xmlContent = await fetchSitemap(url);
    if (!xmlContent) {
      console.log(`   ⚠️  Failed to fetch\n`);
      continue;
    }

    const urls = extractUrls(xmlContent);
    console.log(`   ✅ Found ${urls.length} URLs`);

    // Check for duplicates
    const duplicatesInThisSitemap = [];
    urls.forEach(urlEntry => {
      if (allUrls.has(urlEntry)) {
        duplicateCount++;
        duplicatesInThisSitemap.push(urlEntry);
        duplicates.push({
          url: urlEntry,
          sitemaps: [allUrls.get(urlEntry), endpoint]
        });
      } else {
        allUrls.set(urlEntry, endpoint);
      }
      totalUrls++;
    });

    if (duplicatesInThisSitemap.length > 0) {
      console.log(`   ⚠️  ${duplicatesInThisSitemap.length} duplicates found in this sitemap`);
    }

    // Special validation for blog sitemap
    if (endpoint === '/sitemap-blog.xml') {
      const blogUrls = urls.filter(u => u.includes('/blog/'));
      const blogIndexUrl = urls.find(u => u === `${BASE_URL}/blog`);
      
      console.log(`   📝 Blog posts: ${blogUrls.length}`);
      console.log(`   📍 Blog index: ${blogIndexUrl ? 'Yes' : 'No'}`);
      
      // Sample a few blog URLs for validation
      const sampleUrls = blogUrls.slice(0, 3);
      console.log(`   🔗 Sample URLs:`);
      sampleUrls.forEach(u => {
        const slug = u.split('/blog/')[1];
        console.log(`      - ${slug}`);
      });
    }

    console.log('');
  }

  console.log('=' .repeat(60));
  console.log('\n📊 VERIFICATION RESULTS:\n');
  
  console.log(`Total URLs discovered: ${allUrls.size}`);
  console.log(`Total URL entries (with duplicates): ${totalUrls}`);
  console.log(`Duplicate URLs: ${duplicateCount}`);
  console.log('');

  if (duplicates.length > 0) {
    console.log('❌ DUPLICATE URLs FOUND:\n');
    duplicates.forEach(({ url, sitemaps }) => {
      console.log(`   ${url}`);
      console.log(`   Found in: ${sitemaps.join(', ')}\n`);
    });
    console.log(`\n⚠️  CRITICAL: ${duplicates.length} duplicate URLs must be fixed!\n`);
    process.exit(1);
  } else {
    console.log('✅ NO DUPLICATES FOUND - Sitemap architecture is clean!\n');
  }

  // Expected totals check
  console.log('📈 EXPECTED TOTALS:\n');
  console.log('   sitemap.xml: ~22 URLs (core pages + services)');
  console.log('   sitemap-blog.xml: ~24-25 URLs (blog posts + index)');
  console.log('   sitemap-locations.xml: 26 URLs (location pages)');
  console.log('   sitemap-images.xml: 4-5 URLs (image metadata)');
  console.log('   ─────────────────────────────────────────');
  console.log(`   Expected total: ~76-78 unique URLs`);
  console.log(`   Actual total: ${allUrls.size} unique URLs`);
  console.log('');

  const variance = Math.abs(allUrls.size - 77);
  if (variance > 5) {
    console.log(`⚠️  Warning: URL count variance is ${variance} (expected ~77)`);
  } else {
    console.log(`✅ URL count is within expected range`);
  }

  console.log('\n' + '=' .repeat(60));
  console.log('\n✅ VERIFICATION COMPLETE\n');
  
  process.exit(0);
}

// Run verification
verifySitemapArchitecture().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
