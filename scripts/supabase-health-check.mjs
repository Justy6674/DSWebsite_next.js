#!/usr/bin/env node

/**
 * Supabase Function Health Check for Crawlability
 * Tests all critical SEO-related Supabase functions
 */

const SUPABASE_BASE = 'https://pooebqhsshfafkhvccrl.supabase.co/functions/v1';

const CRITICAL_FUNCTIONS = [
  'robots-txt',
  'generate-main-sitemap',
  'generate-blog-sitemap',
  'generate-sitemap-index',
  'generate-sitemap-locations',
  'generate-sitemap-images',
  'blog-rss'
];

async function testFunction(functionName) {
  const url = `${SUPABASE_BASE}/${functionName}`;
  console.log(`🔍 Testing: ${functionName}`);
  
  try {
    const startTime = Date.now();
    const response = await fetch(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Downscale-Health-Bot/1.0 (Crawlability-Audit)'
      }
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    const status = response.status;
    const contentType = response.headers.get('content-type');
    
    if (status === 200) {
      console.log(`✅ ${functionName}: OK (${responseTime}ms) - ${contentType}`);
      
      // Additional validation for specific content types
      if (functionName === 'robots-txt') {
        const text = await response.text();
        if (text.includes('User-agent:') && text.includes('Sitemap:')) {
          console.log(`   📋 robots.txt validation: PASS`);
        } else {
          console.log(`   ⚠️  robots.txt validation: FAIL - Missing required directives`);
        }
      }
      
      if (functionName.includes('sitemap')) {
        const text = await response.text();
        if (text.includes('<?xml') && text.includes('<urlset')) {
          console.log(`   📋 Sitemap XML validation: PASS`);
        } else {
          console.log(`   ⚠️  Sitemap XML validation: FAIL - Invalid XML structure`);
        }
      }
      
      return { functionName, status: 'OK', responseTime, details: null };
    } else {
      console.log(`❌ ${functionName}: ERROR ${status} (${responseTime}ms)`);
      return { functionName, status: 'ERROR', responseTime, details: `HTTP ${status}` };
    }
    
  } catch (error) {
    console.log(`💥 ${functionName}: FAILED - ${error.message}`);
    return { functionName, status: 'FAILED', responseTime: null, details: error.message };
  }
}

async function runHealthCheck() {
  console.log('🏥 SUPABASE FUNCTION HEALTH CHECK');
  console.log('=' .repeat(50));
  console.log(`Base URL: ${SUPABASE_BASE}`);
  console.log(`Testing ${CRITICAL_FUNCTIONS.length} critical functions...\n`);
  
  const results = [];
  
  for (const functionName of CRITICAL_FUNCTIONS) {
    const result = await testFunction(functionName);
    results.push(result);
    console.log(''); // spacing
  }
  
  // Summary
  console.log('📊 HEALTH CHECK SUMMARY');
  console.log('=' .repeat(50));
  
  const healthy = results.filter(r => r.status === 'OK').length;
  const total = results.length;
  const healthPercentage = Math.round((healthy / total) * 100);
  
  console.log(`✅ Healthy: ${healthy}/${total} (${healthPercentage}%)`);
  
  if (healthPercentage === 100) {
    console.log('🎉 ALL SYSTEMS OPERATIONAL - Crawlability is excellent!');
  } else if (healthPercentage >= 80) {
    console.log('⚠️  MOSTLY OPERATIONAL - Some issues detected');
  } else if (healthPercentage >= 50) {
    console.log('🔴 DEGRADED PERFORMANCE - Multiple failures detected');
  } else {
    console.log('💥 CRITICAL FAILURE - Immediate attention required!');
  }
  
  // Failed functions
  const failed = results.filter(r => r.status !== 'OK');
  if (failed.length > 0) {
    console.log('\n❌ FAILED FUNCTIONS:');
    failed.forEach(f => {
      console.log(`   • ${f.functionName}: ${f.details || f.status}`);
    });
  }
  
  // Performance analysis
  const successfulRequests = results.filter(r => r.responseTime !== null);
  if (successfulRequests.length > 0) {
    const avgResponseTime = Math.round(
      successfulRequests.reduce((sum, r) => sum + r.responseTime, 0) / successfulRequests.length
    );
    console.log(`\n⏱️  Average Response Time: ${avgResponseTime}ms`);
    
    if (avgResponseTime < 1000) {
      console.log('   📈 Performance: EXCELLENT');
    } else if (avgResponseTime < 3000) {
      console.log('   📊 Performance: GOOD');
    } else if (avgResponseTime < 5000) {
      console.log('   📉 Performance: SLOW');
    } else {
      console.log('   🐌 Performance: VERY SLOW - Optimization needed');
    }
  }
  
  // Recommendations
  console.log('\n🎯 RECOMMENDATIONS:');
  if (healthPercentage < 100) {
    console.log('   1. Verify Supabase service status');
    console.log('   2. Check function deployments');
    console.log('   3. Review function logs in Supabase dashboard');
    console.log('   4. Consider implementing static fallback files');
  } else {
    console.log('   1. Monitor function performance regularly');
    console.log('   2. Set up automated health checks');
    console.log('   3. Consider implementing caching layer');
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log(`Health Check completed at ${new Date().toISOString()}`);
  
  // Exit with error code if critical functions are down
  if (healthPercentage < 80) {
    process.exit(1);
  }
}

// Run the health check
runHealthCheck().catch(console.error);