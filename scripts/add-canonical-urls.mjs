#!/usr/bin/env node

/**
 * Add canonical URLs to pages missing them
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const pagesToFix = [
  '/about',
  '/calculator',
  '/clinical-services',
  '/conditions',
  '/facts',
  '/goal-setting-maintenance',
  '/medical-weight-management',
  '/medicare',
  '/meet-the-team',
  '/mental-health-support',
  '/movement-activity-programs',
  '/nutrition-meal-planning',
  '/portal/activity',
  '/portal/jb-bb-feed',
  '/portal/login',
  '/portal/medication',
  '/portal/mental-health',
  '/portal/nutrition',
  '/portal/saved',
  '/portal/shop',
  '/portal/sleep-recovery',
  '/portal/water',
  '/sleep-recovery-optimisation',
  '/tools'
];

console.log('\n=== ADDING CANONICAL URLs ===\n');

let fixed = 0;

for (const route of pagesToFix) {
  const pagePath = path.join(projectRoot, 'src', 'app', route, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    console.log(`⚠ Page not found: ${route}`);
    continue;
  }
  
  let content = fs.readFileSync(pagePath, 'utf-8');
  
  // Skip if already has canonical
  if (content.includes('alternates') && content.includes('canonical')) {
    continue;
  }
  
  // Find the metadata export
  const metadataMatch = content.match(/(export const metadata: Metadata = \{[\s\S]*?)(\n};)/);
  if (!metadataMatch) {
    console.log(`⚠ No metadata found: ${route}`);
    continue;
  }
  
  const beforeClosing = metadataMatch[1];
  const closing = metadataMatch[2];
  
  // Add canonical URL before closing
  const canonicalUrl = `https://www.downscale.com.au${route}`;
  let newMetadata = beforeClosing;
  
  // Add comma if needed
  if (!newMetadata.trim().endsWith(',')) {
    newMetadata += ',';
  }
  
  newMetadata += `\n  alternates: {\n    canonical: '${canonicalUrl}',\n  },`;
  newMetadata += closing;
  
  content = content.replace(metadataMatch[0], newMetadata);
  fs.writeFileSync(pagePath, content, 'utf-8');
  
  console.log(`✓ Fixed: ${route}`);
  fixed++;
}

console.log(`\n=== SUMMARY ===`);
console.log(`Fixed: ${fixed} pages`);
console.log('\nCanonical URLs added!\n');
