#!/usr/bin/env node

/**
 * Comprehensive Page Optimization Script
 * Systematically fixes common optimization issues across all pages:
 * - Adds missing OpenGraph tags
 * - Ensures canonical URLs
 * - Optimizes metadata
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n=== COMPREHENSIVE PAGE OPTIMIZATION ===\n');

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
 * Optimize metadata for a page
 */
function optimizePageMetadata(pageInfo) {
  let content = fs.readFileSync(pageInfo.file, 'utf-8');
  let modified = false;
  
  // Skip if already has comprehensive metadata
  if (content.includes('openGraph') && 
      content.includes('twitter') && 
      content.includes('canonical')) {
    return { modified: false, reason: 'Already optimized' };
  }
  
  // Extract existing metadata - Using simpler non-backtracking approach
  // Find the start of metadata export
  const startMatch = content.indexOf('export const metadata: Metadata = {');
  if (startMatch === -1) {
    return { modified: false, reason: 'No metadata found' };
  }
  
  // Find the matching closing brace - simple brace counting
  let braceCount = 0;
  let inString = false;
  let stringChar = '';
  let endIndex = -1;
  
  for (let i = startMatch + 'export const metadata: Metadata = '.length; i < content.length; i++) {
    const char = content[i];
    
    // Handle strings to avoid counting braces in strings
    if ((char === '"' || char === "'" || char === '`') && content[i-1] !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }
    
    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
      
      if (braceCount === 0 && char === '}') {
        endIndex = i;
        break;
      }
    }
  }
  
  if (endIndex === -1) {
    return { modified: false, reason: 'Could not find metadata end' };
  }
  
  const metadataMatch = content.substring(startMatch, endIndex + 2); // +2 for };\n
  const existingMetadata = metadataMatch;
  const metadataContent = content.substring(startMatch + 'export const metadata: Metadata = {'.length, endIndex);
  
  // Extract title and description
  const titleMatch = metadataContent.match(/title:\s*['"]([^'"]+)['"]/);
  const descMatch = metadataContent.match(/description:\s*['"]([^'"]+)['"]/);
  
  if (!titleMatch || !descMatch) {
    return { modified: false, reason: 'Missing title or description' };
  }
  
  const title = titleMatch[1];
  const description = descMatch[1];
  const canonicalUrl = `https://www.downscale.com.au${pageInfo.route}`;
  
  // Build enhanced metadata
  let newMetadata = `export const metadata: Metadata = {
  title: '${title}',
  description: '${description}',`;
  
  // Add keywords if they exist
  const keywordsMatch = metadataContent.match(/keywords:\s*['"]([^'"]+)['"]/);
  if (keywordsMatch) {
    newMetadata += `\n  keywords: '${keywordsMatch[1]}',`;
  }
  
  // Add canonical
  if (!metadataContent.includes('alternates')) {
    newMetadata += `\n  alternates: {
    canonical: '${canonicalUrl}',
  },`;
    modified = true;
  }
  
  // Add OpenGraph
  if (!metadataContent.includes('openGraph')) {
    newMetadata += `\n  openGraph: {
    title: '${title}',
    description: '${description}',
    url: '${canonicalUrl}',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: '${title}',
      },
    ],
  },`;
    modified = true;
  }
  
  // Add Twitter
  if (!metadataContent.includes('twitter')) {
    newMetadata += `\n  twitter: {
    card: 'summary_large_image',
    title: '${title}',
    description: '${description}',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },`;
    modified = true;
  }
  
  newMetadata += '\n};';
  
  if (modified) {
    content = content.replace(existingMetadata, newMetadata);
    fs.writeFileSync(pageInfo.file, content, 'utf-8');
    return { modified: true, reason: 'Added missing metadata' };
  }
  
  return { modified: false, reason: 'No changes needed' };
}

/**
 * Main optimization function
 */
function runOptimization() {
  console.log('Step 1: Finding all pages...');
  const pages = findAllPages();
  console.log(`Found ${pages.length} pages\n`);
  
  console.log('Step 2: Optimizing metadata...');
  let optimized = 0;
  let skipped = 0;
  
  for (const pageInfo of pages) {
    // Skip portal pages - they may need authentication
    if (pageInfo.route.startsWith('/portal')) {
      skipped++;
      continue;
    }
    
    // Skip dynamic routes
    if (pageInfo.route.includes('[')) {
      skipped++;
      continue;
    }
    
    const result = optimizePageMetadata(pageInfo);
    if (result.modified) {
      console.log(`✓ Optimized: ${pageInfo.route}`);
      optimized++;
    } else {
      skipped++;
    }
  }
  
  console.log(`\n=== OPTIMIZATION SUMMARY ===`);
  console.log(`Total pages: ${pages.length}`);
  console.log(`Optimized: ${optimized}`);
  console.log(`Skipped: ${skipped}`);
  console.log('\nOptimization complete!\n');
}

// Run the optimization
runOptimization();
