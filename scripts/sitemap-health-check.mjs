#!/usr/bin/env node

/**
 * Comprehensive Sitemap Health Check Script
 * Tests all sitemap endpoints and validates their content
 */

const BASE_URL = 'https://www.downscale.com.au';

const SITEMAP_ENDPOINTS = [
  '/robots.txt',
  '/sitemap-index.xml', 
  '/sitemap.xml',
  '/sitemap-blog.xml',
  '/sitemap-locations.xml',
  '/sitemap-images.xml',
  '/blog/rss.xml'
];

async function checkEndpoint(endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    console.log(`\n🔍 Testing: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Downscale-Health-Check/1.0'
      }
    });
    
    const contentType = response.headers.get('content-type') || '';
    const contentLength = response.headers.get('content-length') || 'unknown';
    
    if (!response.ok) {
      console.log(`❌ ${endpoint}: HTTP ${response.status} ${response.statusText}`);
      return false;
    }
    
    const content = await response.text();
    
    // Validate content based on endpoint type
    let isValid = true;
    let validationMsg = '';
    
    if (endpoint.includes('.xml')) {
      if (!content.includes('<?xml')) {
        isValid = false;
        validationMsg = 'Missing XML declaration';
      } else if (endpoint.includes('sitemap') && !content.includes('<urlset') && !content.includes('<sitemapindex')) {
        isValid = false;
        validationMsg = 'Invalid sitemap structure';
      }
      
      // Count URLs in sitemaps
      if (endpoint.includes('sitemap') && isValid) {
        const urlCount = (content.match(/<loc>/g) || []).length;
        validationMsg = `${urlCount} URLs found`;
      }
    } else if (endpoint === '/robots.txt') {
      if (!content.includes('User-agent:') || !content.includes('Sitemap:')) {
        isValid = false;
        validationMsg = 'Missing required robots.txt directives';
      } else {
        validationMsg = 'Valid robots.txt format';
      }
    }
    
    const status = isValid ? '✅' : '⚠️';
    console.log(`${status} ${endpoint}: ${response.status} | ${contentType} | ${contentLength} bytes | ${validationMsg}`);
    
    return isValid;
    
  } catch (error) {
    console.log(`❌ ${endpoint}: ERROR - ${error.message}`);
    return false;
  }
}

async function runHealthCheck() {
  console.log('🚀 Starting Downscale Sitemap Health Check');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log('=' * 60);
  
  const results = [];
  
  for (const endpoint of SITEMAP_ENDPOINTS) {
    const isHealthy = await checkEndpoint(endpoint);
    results.push({ endpoint, healthy: isHealthy });
  }
  
  console.log('\n' + '=' * 60);
  console.log('📊 HEALTH CHECK SUMMARY');
  console.log('=' * 60);
  
  const healthyCount = results.filter(r => r.healthy).length;
  const totalCount = results.length;
  
  results.forEach(({ endpoint, healthy }) => {
    const status = healthy ? '✅' : '❌';
    console.log(`${status} ${endpoint}`);
  });
  
  console.log('\n' + '=' * 60);
  console.log(`🎯 OVERALL STATUS: ${healthyCount}/${totalCount} endpoints healthy`);
  
  if (healthyCount === totalCount) {
    console.log('🎉 ALL SYSTEMS GREEN - Your sitemaps are healthy!');
  } else {
    console.log('⚠️  ISSUES DETECTED - Check failed endpoints above');
    process.exit(1);
  }
  
  // Test Google ping endpoint
  console.log('\n🔔 Testing Google sitemap ping...');
  try {
    const pingResponse = await fetch(`${BASE_URL.replace('www.', '')}:54321/functions/v1/google-sitemap-ping`, {
      method: 'POST'
    });
    
    if (pingResponse.ok) {
      console.log('✅ Google ping endpoint working');
    } else {
      console.log('⚠️  Google ping endpoint may have issues');
    }
  } catch (error) {
    console.log('ℹ️  Google ping test skipped (local environment)');
  }
}

// Run the health check
runHealthCheck().catch(console.error);