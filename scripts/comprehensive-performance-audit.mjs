#!/usr/bin/env node

/**
 * Comprehensive Performance Audit Script
 * Audits all pages for:
 * - Image optimization (WebP usage)
 * - Preload hints
 * - Meta tags and SEO
 * - Mobile readiness
 * - Proper routing (no soft 404s)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

const issues = {
  critical: [],
  warning: [],
  info: []
};

let totalPages = 0;
let optimizedPages = 0;

console.log(`\n${colors.bold}${colors.blue}=== COMPREHENSIVE PERFORMANCE AUDIT ===${colors.reset}\n`);

/**
 * Find all page.tsx files
 */
function findAllPages() {
  const pagesDir = path.join(projectRoot, 'src', 'app');
  const pages = [];
  
  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip certain directories
        if (!['api', 'auth'].includes(entry.name)) {
          scanDirectory(fullPath);
        }
      } else if (entry.name === 'page.tsx') {
        const relativePath = path.relative(pagesDir, fullPath);
        const routePath = '/' + path.dirname(relativePath).replace(/\\/g, '/');
        pages.push({
          file: fullPath,
          route: routePath === '/.' ? '/' : routePath
        });
      }
    }
  }
  
  scanDirectory(pagesDir);
  return pages;
}

/**
 * Audit a single page file
 */
function auditPage(pageInfo) {
  totalPages++;
  const content = fs.readFileSync(pageInfo.file, 'utf-8');
  const issues = [];
  let isOptimized = true;
  
  // Check for metadata
  if (!content.includes('export const metadata')) {
    issues.push({ type: 'critical', message: 'Missing metadata export' });
    isOptimized = false;
  }
  
  // Check for title
  if (!content.match(/title:\s*['"`]/)) {
    issues.push({ type: 'critical', message: 'Missing page title' });
    isOptimized = false;
  }
  
  // Check for description
  if (!content.match(/description:\s*['"`]/)) {
    issues.push({ type: 'critical', message: 'Missing meta description' });
    isOptimized = false;
  }
  
  // Check for canonical URL
  if (!content.includes('canonical')) {
    issues.push({ type: 'warning', message: 'Missing canonical URL' });
    isOptimized = false;
  }
  
  // Check for OpenGraph tags
  if (!content.includes('openGraph')) {
    issues.push({ type: 'warning', message: 'Missing OpenGraph tags' });
  }
  
  return { issues, isOptimized };
}

/**
 * Find component file referenced by page
 */
function findComponentFile(pageContent, pageFile) {
  const importMatch = pageContent.match(/import\s+(\w+)\s+from\s+['"]@\/components\/([^'"]+)['"]/);
  if (importMatch) {
    const componentPath = path.join(projectRoot, 'src', 'components', importMatch[2] + '.tsx');
    if (fs.existsSync(componentPath)) {
      return componentPath;
    }
  }
  return null;
}

/**
 * Audit component for image usage
 */
function auditComponentImages(componentFile) {
  if (!componentFile || !fs.existsSync(componentFile)) return { hasImages: false, issues: [] };
  
  const content = fs.readFileSync(componentFile, 'utf-8');
  const imageIssues = [];
  
  // Check for PNG/JPG images that should be WebP
  const imageMatches = content.matchAll(/(?:src|backgroundImage|url)\s*[:=]\s*['"`]([^'"`]+\.(?:png|jpg|jpeg))['"]/gi);
  for (const match of imageMatches) {
    const imagePath = match[1];
    // Check if WebP version exists
    const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const publicPath = path.join(projectRoot, 'public', imagePath.replace(/^\//, ''));
    const webpPublicPath = path.join(projectRoot, 'public', webpPath.replace(/^\//, ''));
    
    if (fs.existsSync(publicPath) && !fs.existsSync(webpPublicPath)) {
      imageIssues.push({
        type: 'warning',
        message: `Image not optimized: ${imagePath} (WebP version missing)`
      });
    } else if (!content.includes(webpPath)) {
      imageIssues.push({
        type: 'info',
        message: `Consider using WebP: ${imagePath} → ${webpPath}`
      });
    }
  }
  
  // Check for preload hints
  const hasPreload = content.includes('rel="preload"') || content.includes('preload');
  const hasHeroImage = content.match(/hero.*\.(webp|png|jpg)/i);
  
  if (hasHeroImage && !hasPreload) {
    imageIssues.push({
      type: 'warning',
      message: 'Hero image detected but no preload hint found'
    });
  }
  
  return { hasImages: imageIssues.length > 0, issues: imageIssues };
}

/**
 * Check public images directory
 */
function auditPublicImages() {
  const publicDir = path.join(projectRoot, 'public');
  const images = {
    png: [],
    jpg: [],
    webp: []
  };
  
  function scanImages(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !['blog', 'lovable-uploads'].includes(entry.name)) {
        scanImages(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === '.png') images.png.push(fullPath);
        else if (ext === '.jpg' || ext === '.jpeg') images.jpg.push(fullPath);
        else if (ext === '.webp') images.webp.push(fullPath);
      }
    }
  }
  
  scanImages(publicDir);
  return images;
}

/**
 * Check for soft 404 issues
 */
function checkNotFoundPage() {
  const notFoundFile = path.join(projectRoot, 'src', 'app', 'not-found.tsx');
  if (!fs.existsSync(notFoundFile)) {
    issues.critical.push('Missing not-found.tsx - soft 404 risk!');
    return false;
  }
  
  const content = fs.readFileSync(notFoundFile, 'utf-8');
  
  // Check for proper 404 status
  if (!content.includes('404') && !content.includes('Not Found')) {
    issues.warning.push('not-found.tsx may not properly indicate 404 status');
  }
  
  return true;
}

/**
 * Main audit function
 */
function runAudit() {
  console.log(`${colors.cyan}Step 1: Finding all pages...${colors.reset}`);
  const pages = findAllPages();
  console.log(`Found ${colors.bold}${pages.length}${colors.reset} pages to audit\n`);
  
  console.log(`${colors.cyan}Step 2: Auditing each page...${colors.reset}`);
  
  const pageResults = [];
  
  for (const pageInfo of pages) {
    const result = auditPage(pageInfo);
    const pageContent = fs.readFileSync(pageInfo.file, 'utf-8');
    const componentFile = findComponentFile(pageContent, pageInfo.file);
    const imageAudit = auditComponentImages(componentFile);
    
    result.imageIssues = imageAudit.issues;
    result.route = pageInfo.route;
    
    if (result.isOptimized && imageAudit.issues.length === 0) {
      optimizedPages++;
    }
    
    pageResults.push(result);
    
    // Collect issues by severity
    result.issues.forEach(issue => {
      if (issue.type === 'critical') {
        issues.critical.push(`${pageInfo.route}: ${issue.message}`);
      } else if (issue.type === 'warning') {
        issues.warning.push(`${pageInfo.route}: ${issue.message}`);
      } else {
        issues.info.push(`${pageInfo.route}: ${issue.message}`);
      }
    });
    
    result.imageIssues.forEach(issue => {
      if (issue.type === 'critical') {
        issues.critical.push(`${pageInfo.route}: ${issue.message}`);
      } else if (issue.type === 'warning') {
        issues.warning.push(`${pageInfo.route}: ${issue.message}`);
      } else {
        issues.info.push(`${pageInfo.route}: ${issue.message}`);
      }
    });
  }
  
  console.log(`${colors.green}✓${colors.reset} Audited ${totalPages} pages\n`);
  
  console.log(`${colors.cyan}Step 3: Checking not-found page for soft 404s...${colors.reset}`);
  const hasNotFound = checkNotFoundPage();
  console.log(`${hasNotFound ? colors.green + '✓' : colors.red + '✗'}${colors.reset} Not-found page check ${hasNotFound ? 'passed' : 'failed'}\n`);
  
  console.log(`${colors.cyan}Step 4: Auditing public images...${colors.reset}`);
  const imageStats = auditPublicImages();
  console.log(`${colors.green}✓${colors.reset} Found ${imageStats.png.length} PNG, ${imageStats.jpg.length} JPG, ${imageStats.webp.length} WebP images\n`);
  
  // Check for PNG/JPG without WebP equivalent
  let missingWebP = 0;
  [...imageStats.png, ...imageStats.jpg].forEach(imgPath => {
    const webpPath = imgPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    if (!imageStats.webp.some(w => w === webpPath)) {
      const relativePath = path.relative(path.join(projectRoot, 'public'), imgPath);
      issues.warning.push(`Image missing WebP version: /${relativePath}`);
      missingWebP++;
    }
  });
  
  // Print summary
  console.log(`\n${colors.bold}${colors.blue}=== AUDIT SUMMARY ===${colors.reset}\n`);
  
  console.log(`${colors.bold}Pages Audited:${colors.reset} ${totalPages}`);
  console.log(`${colors.green}Fully Optimized:${colors.reset} ${optimizedPages} (${Math.round(optimizedPages/totalPages*100)}%)`);
  console.log(`${colors.yellow}Needs Optimization:${colors.reset} ${totalPages - optimizedPages}`);
  
  console.log(`\n${colors.bold}Image Statistics:${colors.reset}`);
  console.log(`  WebP Images: ${colors.green}${imageStats.webp.length}${colors.reset}`);
  console.log(`  PNG Images: ${imageStats.png.length}`);
  console.log(`  JPG Images: ${imageStats.jpg.length}`);
  console.log(`  Missing WebP: ${missingWebP > 0 ? colors.yellow : colors.green}${missingWebP}${colors.reset}`);
  
  if (issues.critical.length > 0) {
    console.log(`\n${colors.bold}${colors.red}CRITICAL ISSUES (${issues.critical.length}):${colors.reset}`);
    issues.critical.slice(0, 10).forEach(issue => console.log(`  ${colors.red}✗${colors.reset} ${issue}`));
    if (issues.critical.length > 10) {
      console.log(`  ... and ${issues.critical.length - 10} more`);
    }
  }
  
  if (issues.warning.length > 0) {
    console.log(`\n${colors.bold}${colors.yellow}WARNINGS (${issues.warning.length}):${colors.reset}`);
    issues.warning.slice(0, 10).forEach(issue => console.log(`  ${colors.yellow}⚠${colors.reset} ${issue}`));
    if (issues.warning.length > 10) {
      console.log(`  ... and ${issues.warning.length - 10} more`);
    }
  }
  
  if (issues.info.length > 0) {
    console.log(`\n${colors.bold}${colors.cyan}INFO (${issues.info.length}):${colors.reset}`);
    issues.info.slice(0, 5).forEach(issue => console.log(`  ${colors.cyan}ℹ${colors.reset} ${issue}`));
    if (issues.info.length > 5) {
      console.log(`  ... and ${issues.info.length - 5} more`);
    }
  }
  
  // Final verdict
  console.log(`\n${colors.bold}${colors.blue}=== PERFORMANCE VERDICT ===${colors.reset}\n`);
  
  const score = Math.round((optimizedPages / totalPages) * 100);
  let verdict = '';
  let verdictColor = '';
  
  if (score >= 90) {
    verdict = 'EXCELLENT - Site is highly optimized! 🚀';
    verdictColor = colors.green;
  } else if (score >= 70) {
    verdict = 'GOOD - Most pages optimized, some improvements needed';
    verdictColor = colors.cyan;
  } else if (score >= 50) {
    verdict = 'FAIR - Significant optimization needed';
    verdictColor = colors.yellow;
  } else {
    verdict = 'NEEDS WORK - Major optimization required';
    verdictColor = colors.red;
  }
  
  console.log(`${colors.bold}Overall Score: ${verdictColor}${score}/100${colors.reset}`);
  console.log(`${colors.bold}Verdict: ${verdictColor}${verdict}${colors.reset}\n`);
  
  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalPages,
      optimizedPages,
      score,
      verdict
    },
    images: {
      webp: imageStats.webp.length,
      png: imageStats.png.length,
      jpg: imageStats.jpg.length,
      missingWebP
    },
    issues: {
      critical: issues.critical.length,
      warning: issues.warning.length,
      info: issues.info.length
    },
    details: {
      critical: issues.critical,
      warning: issues.warning,
      info: issues.info
    }
  };
  
  const reportPath = path.join(projectRoot, 'performance-audit-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`${colors.green}✓${colors.reset} Detailed report saved to: performance-audit-report.json\n`);
  
  // Exit with error code if critical issues found
  if (issues.critical.length > 0) {
    process.exit(1);
  }
}

// Run the audit
runAudit();
