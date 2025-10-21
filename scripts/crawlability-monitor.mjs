#!/usr/bin/env node

/**
 * Automated Crawlability Monitoring System
 * Continuous monitoring for Google crawlability issues
 */

import { writeFileSync } from 'fs';

const SITE_URL = 'https://www.downscale.com.au';
const SUPABASE_BASE = 'https://pooebqhsshfafkhvccrl.supabase.co/functions/v1';

// Critical endpoints to monitor
const CRITICAL_ENDPOINTS = [
  { url: `${SITE_URL}/robots.txt`, type: 'robots', critical: true },
  { url: `${SITE_URL}/sitemap.xml`, type: 'sitemap', critical: true },
  { url: `${SITE_URL}/sitemap-index.xml`, type: 'sitemap', critical: true },
  { url: `${SITE_URL}/sitemap-blog.xml`, type: 'sitemap', critical: false },
  { url: `${SITE_URL}/sitemap-locations.xml`, type: 'sitemap', critical: true },
  { url: `${SITE_URL}/google8f3a5b2c1d9e7f4a.html`, type: 'verification', critical: true },
  { url: `${SITE_URL}/`, type: 'homepage', critical: true },
  { url: `${SITE_URL}/blog`, type: 'blog', critical: true }
];

async function testEndpoint(endpoint) {
  try {
    const startTime = Date.now();
    const response = await fetch(endpoint.url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    const result = {
      url: endpoint.url,
      type: endpoint.type,
      critical: endpoint.critical,
      status: response.status,
      responseTime,
      timestamp: new Date().toISOString(),
      success: response.status === 200,
      contentType: response.headers.get('content-type'),
      contentLength: response.headers.get('content-length')
    };
    
    // Additional validation based on type
    if (result.success && endpoint.type === 'robots') {
      const text = await response.text();
      result.hasUserAgent = text.includes('User-agent:');
      result.hasSitemap = text.includes('Sitemap:');
      result.valid = result.hasUserAgent && result.hasSitemap;
    } else if (result.success && endpoint.type === 'sitemap') {
      const text = await response.text();
      result.isXML = text.includes('<?xml');
      result.hasUrls = text.includes('<loc>');
      result.urlCount = (text.match(/<loc>/g) || []).length;
      result.valid = result.isXML && result.hasUrls;
    } else if (result.success && endpoint.type === 'verification') {
      const text = await response.text();
      result.hasVerification = text.includes('google-site-verification');
      result.valid = result.hasVerification;
    } else if (result.success) {
      result.valid = true;
    }
    
    return result;
    
  } catch (error) {
    return {
      url: endpoint.url,
      type: endpoint.type,
      critical: endpoint.critical,
      status: 0,
      responseTime: null,
      timestamp: new Date().toISOString(),
      success: false,
      error: error.message,
      valid: false
    };
  }
}

async function runMonitoring() {
  console.log('🔍 CRAWLABILITY MONITORING STARTED');
  console.log('=' .repeat(50));
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Monitoring ${CRITICAL_ENDPOINTS.length} endpoints...\n`);
  
  const results = [];
  
  for (const endpoint of CRITICAL_ENDPOINTS) {
    console.log(`Testing: ${endpoint.url}`);
    const result = await testEndpoint(endpoint);
    results.push(result);
    
    if (result.success && result.valid) {
      console.log(`✅ ${endpoint.type}: OK (${result.responseTime}ms)`);
      if (result.urlCount) {
        console.log(`   📊 ${result.urlCount} URLs found`);
      }
    } else if (result.success && !result.valid) {
      console.log(`⚠️  ${endpoint.type}: ACCESSIBLE but INVALID`);
    } else {
      console.log(`❌ ${endpoint.type}: FAILED - ${result.error || `HTTP ${result.status}`}`);
    }
    
    console.log('');
  }
  
  // Calculate health scores
  const totalEndpoints = results.length;
  const criticalEndpoints = results.filter(r => r.critical);
  const successfulEndpoints = results.filter(r => r.success && r.valid);
  const successfulCritical = criticalEndpoints.filter(r => r.success && r.valid);
  
  const overallHealth = Math.round((successfulEndpoints.length / totalEndpoints) * 100);
  const criticalHealth = Math.round((successfulCritical.length / criticalEndpoints.length) * 100);
  
  console.log('📊 HEALTH SUMMARY');
  console.log('=' .repeat(30));
  console.log(`Overall Health: ${overallHealth}% (${successfulEndpoints.length}/${totalEndpoints})`);
  console.log(`Critical Health: ${criticalHealth}% (${successfulCritical.length}/${criticalEndpoints.length})`);
  
  // Performance analysis
  const responseTimeResults = results.filter(r => r.responseTime !== null);
  if (responseTimeResults.length > 0) {
    const avgResponseTime = Math.round(
      responseTimeResults.reduce((sum, r) => sum + r.responseTime, 0) / responseTimeResults.length
    );
    console.log(`Average Response Time: ${avgResponseTime}ms`);
  }
  
  // Alert levels
  if (criticalHealth === 100) {
    console.log('🟢 STATUS: ALL SYSTEMS OPERATIONAL');
  } else if (criticalHealth >= 80) {
    console.log('🟡 STATUS: MINOR ISSUES DETECTED');
  } else if (criticalHealth >= 60) {
    console.log('🟠 STATUS: SIGNIFICANT PROBLEMS');
  } else {
    console.log('🔴 STATUS: CRITICAL FAILURES - IMMEDIATE ACTION REQUIRED');
  }
  
  // Failed endpoints
  const failed = results.filter(r => !r.success || !r.valid);
  if (failed.length > 0) {
    console.log('\n❌ FAILED ENDPOINTS:');
    failed.forEach(f => {
      const reason = f.error || (f.success ? 'Invalid content' : `HTTP ${f.status}`);
      console.log(`   • ${f.url} - ${reason}`);
    });
  }
  
  // Generate monitoring report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      overallHealth,
      criticalHealth,
      totalEndpoints,
      successfulEndpoints: successfulEndpoints.length,
      failedEndpoints: failed.length,
      avgResponseTime: responseTimeResults.length > 0 ? 
        Math.round(responseTimeResults.reduce((sum, r) => sum + r.responseTime, 0) / responseTimeResults.length) : null
    },
    endpoints: results,
    alerts: failed.length > 0 ? failed.map(f => ({
      url: f.url,
      type: f.type,
      critical: f.critical,
      issue: f.error || (f.success ? 'Invalid content' : `HTTP ${f.status}`)
    })) : []
  };
  
  // Save report
  const reportFilename = `crawlability-report-${new Date().toISOString().slice(0, 10)}.json`;
  writeFileSync(reportFilename, JSON.stringify(report, null, 2));
  console.log(`\n📊 Report saved: ${reportFilename}`);
  
  // Recommendations
  console.log('\n🎯 RECOMMENDATIONS:');
  if (criticalHealth === 100) {
    console.log('   • Continue regular monitoring');
    console.log('   • Consider performance optimization');
  } else if (criticalHealth >= 80) {
    console.log('   • Investigate non-critical failures');
    console.log('   • Monitor for patterns');
  } else {
    console.log('   • URGENT: Fix critical endpoint failures');
    console.log('   • Check Supabase function status');
    console.log('   • Verify Vercel deployment');
    console.log('   • Contact support if issues persist');
  }
  
  // Exit with error if critical health is poor
  if (criticalHealth < 80) {
    console.log('\n🚨 EXITING WITH ERROR CODE - Critical failures detected');
    process.exit(1);
  }
  
  console.log(`\n✅ Monitoring completed at ${new Date().toISOString()}`);
}

// CLI mode check
if (process.argv.includes('--continuous')) {
  console.log('🔄 Starting continuous monitoring (every 5 minutes)...');
  setInterval(runMonitoring, 5 * 60 * 1000); // 5 minutes
  runMonitoring(); // Run immediately
} else {
  runMonitoring().catch(console.error);
}