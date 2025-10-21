#!/usr/bin/env node

/**
 * SEO Quality Assurance and Monitoring Script
 * Comprehensive validation for production deployment
 */

import { promises as fs, readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Google PageSpeed Insights Recommendations Implementation
 */
console.log('🚀 SEO PRODUCTION READINESS CHECK');
console.log('=' .repeat(50));

const publicDir = path.join(__dirname, '../public');
const distDir = path.join(__dirname, '../dist');

/**
 * Validate sitemap XML quality
 */
async function validateSitemapQuality() {
  console.log('\n🗺️  SITEMAP QUALITY VALIDATION:');
  
  const sitemaps = [
    'sitemap-index.xml',
    'sitemap.xml', 
    'sitemap-blog.xml',
    'sitemap-locations.xml',
    'sitemap-images.xml'
  ];
  
  let totalUrls = 0;
  let qualityScore = 100;
  
  for (const sitemap of sitemaps) {
    const sitemapPath = path.join(publicDir, sitemap);
    if (existsSync(sitemapPath)) {
      const content = readFileSync(sitemapPath, 'utf8');
      
      // Count URLs
      const urlCount = (content.match(/<loc>/g) || []).length;
      totalUrls += urlCount;
      
      // Quality checks
      const hasValidXML = content.startsWith('<?xml version="1.0"');
      const hasProperNamespace = content.includes('xmlns="http://www.sitemaps.org');
      const hasWWWUrls = content.includes('www.downscale.com.au');
      const hasLastMod = content.includes('<lastmod>');
      const hasValidPriority = content.includes('<priority>');
      
      if (!hasValidXML) qualityScore -= 5;
      if (!hasProperNamespace) qualityScore -= 5;
      if (!hasWWWUrls) qualityScore -= 10;
      if (!hasLastMod) qualityScore -= 3;
      if (!hasValidPriority) qualityScore -= 2;
      
      console.log(`  ✅ ${sitemap}: ${urlCount} URLs - ${hasValidXML && hasProperNamespace && hasWWWUrls ? 'VALID' : 'ISSUES'}`);
    } else {
      console.log(`  ❌ ${sitemap}: MISSING`);
      qualityScore -= 15;
    }
  }
  
  console.log(`\n📊 Sitemap Summary: ${totalUrls} total URLs, Quality Score: ${qualityScore}/100`);
  return { totalUrls, qualityScore };
}

/**
 * Validate robots.txt for Google compliance
 */
function validateRobotsCompliance() {
  console.log('\n🤖 ROBOTS.TXT COMPLIANCE CHECK:');
  
  const robotsPath = path.join(publicDir, 'robots.txt');
  if (!existsSync(robotsPath)) {
    console.log('  ❌ robots.txt missing');
    return { score: 0, issues: ['robots.txt missing'] };
  }
  
  const robots = readFileSync(robotsPath, 'utf8');
  let score = 100;
  const issues = [];
  
  // Essential checks
  if (!robots.includes('User-agent: *')) {
    issues.push('Missing default user-agent rule');
    score -= 10;
  }
  
  if (!robots.includes('Sitemap:')) {
    issues.push('No sitemap declarations');
    score -= 15;
  }
  
  if (!robots.includes('www.downscale.com.au')) {
    issues.push('Wrong domain in sitemap URLs');
    score -= 10;
  }
  
  // Google-specific optimizations
  if (robots.includes('User-agent: Googlebot\nAllow: /\nCrawl-delay: 0')) {
    console.log('  ✅ Googlebot optimized rules');
  } else {
    issues.push('Googlebot rules not optimized');
    score -= 5;
  }
  
  // Medical site security
  if (robots.includes('Disallow: /admin/') && robots.includes('Disallow: /api/')) {
    console.log('  ✅ Admin areas protected');
  } else {
    issues.push('Admin areas not properly protected');
    score -= 8;
  }
  
  // Count sitemap declarations
  const sitemapCount = (robots.match(/Sitemap:/g) || []).length;
  console.log(`  ✅ ${sitemapCount} sitemap declarations found`);
  
  if (issues.length === 0) {
    console.log(`  🌟 robots.txt compliance: ${score}/100 - EXCELLENT`);
  } else {
    console.log(`  ⚠️  robots.txt compliance: ${score}/100 - Issues found`);
    issues.forEach(issue => console.log(`    - ${issue}`));
  }
  
  return { score, issues };
}

/**
 * Check for SEO regression in build output
 */
async function validateBuildSEO() {
  console.log('\n🏗️  BUILD OUTPUT SEO VALIDATION:');
  
  if (!existsSync(distDir)) {
    console.log('  ⚠️  Build directory not found - run npm run build first');
    return { score: 0, issues: ['No build output'] };
  }
  
  const distIndexPath = path.join(distDir, 'index.html');
  if (!existsSync(distIndexPath)) {
    console.log('  ❌ Built index.html not found');
    return { score: 0, issues: ['No built index.html'] };
  }
  
  const builtContent = readFileSync(distIndexPath, 'utf8');
  let score = 100;
  const issues = [];
  
  // Critical SEO elements should survive build
  const buildChecks = [
    { test: /<title>/.test(builtContent), name: 'Title tag preserved', points: 10 },
    { test: /<meta name="description"/.test(builtContent), name: 'Meta description preserved', points: 10 },
    { test: /<link rel="canonical"/.test(builtContent), name: 'Canonical URL preserved', points: 8 },
    { test: /application\/ld\+json/.test(builtContent), name: 'Structured data preserved', points: 8 },
    { test: /<meta property="og:/.test(builtContent), name: 'Open Graph preserved', points: 6 },
    { test: /hreflang="en-AU"/.test(builtContent), name: 'Hreflang preserved', points: 4 }
  ];
  
  buildChecks.forEach(check => {
    if (check.test) {
      console.log(`  ✅ ${check.name}`);
    } else {
      console.log(`  ❌ ${check.name}`);
      issues.push(check.name);
      score -= check.points;
    }
  });
  
  // Check bundle size impact
  const jsFiles = builtContent.match(/src="[^"]*\.js"/g) || [];
  const cssFiles = builtContent.match(/href="[^"]*\.css"/g) || [];
  
  console.log(`  📦 JS files in build: ${jsFiles.length}`);
  console.log(`  🎨 CSS files in build: ${cssFiles.length}`);
  
  if (jsFiles.length > 5) {
    issues.push('Too many JS files - consider bundling');
    score -= 5;
  }
  
  console.log(`  🌟 Build SEO preservation: ${score}/100`);
  return { score, issues };
}

/**
 * Generate SEO recommendations report
 */
function generateRecommendations(sitemapData, robotsData, buildData) {
  console.log('\n📋 SEO RECOMMENDATIONS REPORT');
  console.log('=' .repeat(50));
  
  const overallScore = Math.round((sitemapData.qualityScore + robotsData.score + buildData.score) / 3);
  
  console.log('🎯 GOOGLE DEVELOPER PERSPECTIVE:');
  if (overallScore >= 95) {
    console.log('  🌟 EXCELLENT - Site follows Google\'s SEO best practices');
    console.log('  📈 Expected ranking: Strong organic visibility');
    console.log('  🕐 Crawl frequency: Daily for high-priority pages');
  } else if (overallScore >= 85) {
    console.log('  👍 GOOD - Minor optimizations will improve ranking');
    console.log('  📈 Expected ranking: Good organic visibility with room for growth');
  } else {
    console.log('  ⚠️  NEEDS WORK - Address critical issues before expecting ranking improvements');
  }
  
  console.log('\n🔧 SENIOR WEB DEVELOPER PERSPECTIVE:');
  console.log('  📊 Technical Implementation Quality:');
  console.log(`    - Sitemap Architecture: ${sitemapData.qualityScore}/100`);
  console.log(`    - robots.txt Compliance: ${robotsData.score}/100`);
  console.log(`    - Build Process SEO: ${buildData.score}/100`);
  
  console.log('\n💡 IMMEDIATE ACTION ITEMS:');
  
  if (robotsData.issues.length > 0) {
    console.log('  🤖 robots.txt fixes needed:');
    robotsData.issues.forEach(issue => console.log(`    - ${issue}`));
  }
  
  if (buildData.issues.length > 0) {
    console.log('  🏗️  Build process improvements:');
    buildData.issues.forEach(issue => console.log(`    - ${issue}`));
  }
  
  console.log('\n🎯 NEXT STEPS FOR GOOGLE SEARCH CONSOLE:');
  console.log('  1. Submit https://www.downscale.com.au/sitemap-index.xml');
  console.log('  2. Request indexing for key medical service pages');
  console.log('  3. Monitor Core Web Vitals and mobile usability');
  console.log('  4. Set up Performance monitoring for medical compliance');
  
  console.log(`\n🏆 FINAL SEO GRADE: ${overallScore}/100 (${getGrade(overallScore)})`);
  
  return overallScore;
}

function getGrade(score) {
  if (score >= 97) return 'A+';
  if (score >= 93) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 83) return 'B';
  if (score >= 80) return 'B-';
  if (score >= 77) return 'C+';
  if (score >= 70) return 'C';
  return 'D';
}

/**
 * Main audit execution
 */
async function runComprehensiveAudit() {
  const sitemapData = await validateSitemapQuality();
  const robotsData = validateRobotsCompliance();
  const buildData = await validateBuildSEO();
  
  const finalScore = generateRecommendations(sitemapData, robotsData, buildData);
  
  console.log('\n🎊 AUDIT COMPLETE!');
  console.log(`Generated: ${new Date().toISOString()}`);
  
  return finalScore >= 95 ? 0 : 1;
}

runComprehensiveAudit()
  .then(code => process.exit(code))
  .catch(error => {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  });