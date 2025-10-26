#!/usr/bin/env node

/**
 * Canonical URL Consistency Validator
 * Ensures all canonical URLs use https://www.downscale.com.au
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const CORRECT_CANONICAL_BASE = 'https://www.downscale.com.au';
const INCORRECT_DOMAINS = ['downscale.health', 'http://downscale.com.au', 'https://downscale.com.au'];

let totalFiles = 0;
let filesWithIssues = 0;
let issues = [];

console.log('🔍 CANONICAL URL CONSISTENCY VALIDATOR');
console.log('=' .repeat(60));
console.log(`Correct canonical base: ${CORRECT_CANONICAL_BASE}`);
console.log('');

/**
 * Recursively scan directory for React/TS files
 */
function scanDirectory(dir, fileCallback) {
  const entries = readdirSync(dir);
  
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    
    // Skip node_modules, .next, and other build directories
    if (entry === 'node_modules' || entry === '.next' || entry === 'dist' || entry === '.git') {
      continue;
    }
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, fileCallback);
    } else if (stat.isFile() && (entry.endsWith('.tsx') || entry.endsWith('.ts') || entry.endsWith('.jsx') || entry.endsWith('.js'))) {
      fileCallback(fullPath);
    }
  }
}

/**
 * Check file for canonical URL issues
 */
function checkFile(filePath) {
  totalFiles++;
  const content = readFileSync(filePath, 'utf8');
  const fileIssues = [];
  
  // Check for incorrect domains in canonical URLs
  for (const incorrectDomain of INCORRECT_DOMAINS) {
    if (content.includes(`canonical" href="${incorrectDomain}`) || 
        content.includes(`canonical" href='${incorrectDomain}`) ||
        content.includes(`og:url" content="${incorrectDomain}`) ||
        content.includes(`og:url" content='${incorrectDomain}`)) {
      fileIssues.push(`Found incorrect domain: ${incorrectDomain}`);
    }
  }
  
  // Check for missing www in canonical URLs
  if (content.match(/canonical"\s+href="https:\/\/downscale\.com\.au/) && 
      !content.includes('https://www.downscale.com.au')) {
    fileIssues.push('Canonical URL missing www subdomain');
  }
  
  if (fileIssues.length > 0) {
    filesWithIssues++;
    issues.push({
      file: filePath.replace(projectRoot, ''),
      issues: fileIssues
    });
  }
}

/**
 * Check sitemap files
 */
function checkSitemaps() {
  console.log('📄 Checking Sitemap Files:');
  const sitemapFiles = ['sitemap.xml', 'sitemap-index.xml', 'sitemap-blog.xml', 'sitemap-locations.xml', 'sitemap-images.xml'];
  let sitemapIssues = 0;
  
  for (const sitemap of sitemapFiles) {
    const sitemapPath = join(projectRoot, 'public', sitemap);
    if (existsSync(sitemapPath)) {
      const content = readFileSync(sitemapPath, 'utf8');
      
      // Check for incorrect domains
      let hasIssue = false;
      for (const incorrectDomain of INCORRECT_DOMAINS) {
        if (content.includes(incorrectDomain)) {
          console.log(`  ❌ ${sitemap}: Contains incorrect domain ${incorrectDomain}`);
          hasIssue = true;
          sitemapIssues++;
        }
      }
      
      if (!hasIssue) {
        const urlCount = (content.match(/<loc>/g) || []).length;
        console.log(`  ✅ ${sitemap}: ${urlCount} URLs, all using correct domain`);
      }
    } else {
      console.log(`  ⚠️  ${sitemap}: Not found`);
    }
  }
  
  return sitemapIssues;
}

/**
 * Check robots.txt
 */
function checkRobotsTxt() {
  console.log('\n🤖 Checking robots.txt:');
  const robotsPath = join(projectRoot, 'public', 'robots.txt');
  
  if (existsSync(robotsPath)) {
    const content = readFileSync(robotsPath, 'utf8');
    const sitemapLines = content.split('\n').filter(line => line.startsWith('Sitemap:'));
    
    let hasIssue = false;
    for (const line of sitemapLines) {
      if (!line.includes(CORRECT_CANONICAL_BASE)) {
        console.log(`  ❌ Incorrect sitemap URL: ${line}`);
        hasIssue = true;
      }
    }
    
    if (!hasIssue) {
      console.log(`  ✅ All ${sitemapLines.length} sitemap entries use correct domain`);
    }
  } else {
    console.log('  ❌ robots.txt not found');
  }
}

// Run validation
console.log('🔎 Scanning source files...\n');
scanDirectory(join(projectRoot, 'src'), checkFile);

console.log(`\n📊 Scanned ${totalFiles} source files\n`);

const sitemapIssues = checkSitemaps();
checkRobotsTxt();

// Report issues
console.log('\n' + '=' .repeat(60));
if (issues.length > 0 || sitemapIssues > 0) {
  console.log('❌ ISSUES FOUND:\n');
  
  if (issues.length > 0) {
    console.log('Source File Issues:');
    for (const issue of issues) {
      console.log(`\n  📁 ${issue.file}`);
      for (const i of issue.issues) {
        console.log(`     - ${i}`);
      }
    }
  }
  
  console.log(`\n📈 Summary: ${filesWithIssues} files with issues, ${sitemapIssues} sitemap issues`);
  process.exit(1);
} else {
  console.log('✅ ALL CANONICAL URLs ARE CONSISTENT!');
  console.log(`   ${totalFiles} source files checked`);
  console.log(`   All URLs use: ${CORRECT_CANONICAL_BASE}`);
  console.log('');
  process.exit(0);
}
