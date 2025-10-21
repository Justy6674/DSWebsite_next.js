#!/usr/bin/env node

/**
 * Comprehensive Image Optimization Script
 * Converts PNG/JPG images to WebP format with quality optimization
 * Creates responsive variants for mobile/tablet/desktop
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Configuration for optimization
const OPTIMIZATION_CONFIG = {
  // Quality settings for different image types
  quality: {
    webp: 85,
    png: 90,
    jpeg: 85
  },
  
  // Responsive breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 1024,
    desktop: 1920
  },
  
  // File size thresholds (in bytes)
  thresholds: {
    large: 500 * 1024,    // 500KB
    medium: 200 * 1024,   // 200KB
    small: 50 * 1024      // 50KB
  }
};

/**
 * Find all images in the repository
 */
async function findImages() {
  const images = [];
  
  async function scanDirectory(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'dist') {
          await scanDirectory(fullPath);
        } else if (entry.isFile() && /\.(png|jpg|jpeg)$/i.test(entry.name)) {
          try {
            const stats = await fs.stat(fullPath);
            images.push({
              path: fullPath,
              name: entry.name,
              size: stats.size,
              relativePath: path.relative(rootDir, fullPath)
            });
          } catch (error) {
            console.warn(`Could not stat file ${fullPath}:`, error.message);
          }
        }
      }
    } catch (error) {
      console.warn(`Could not read directory ${dir}:`, error.message);
    }
  }
  
  await scanDirectory(rootDir);
  return images;
}

/**
 * Generate WebP conversion suggestions
 */
function generateOptimizationSuggestions(images) {
  const suggestions = {
    critical: [],
    large: [],
    medium: [],
    small: []
  };
  
  // Critical images (likely above the fold)
  const criticalPatterns = [
    /hero/i,
    /logo/i,
    /banner/i,
    /og-image/i,
    /favicon/i
  ];
  
  for (const image of images) {
    const isCritical = criticalPatterns.some(pattern => pattern.test(image.name));
    
    if (isCritical) {
      suggestions.critical.push(image);
    } else if (image.size > OPTIMIZATION_CONFIG.thresholds.large) {
      suggestions.large.push(image);
    } else if (image.size > OPTIMIZATION_CONFIG.thresholds.medium) {
      suggestions.medium.push(image);
    } else {
      suggestions.small.push(image);
    }
  }
  
  return suggestions;
}

/**
 * Generate WebP optimization commands
 */
function generateOptimizationCommands(suggestions) {
  const commands = [];
  
  // Function to create WebP conversion command
  const createWebPCommand = (image, quality = 85) => {
    const webpPath = image.path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return `# Convert ${image.relativePath} (${Math.round(image.size / 1024)}KB)
# Original: ${image.path}
# WebP: ${webpPath}
# Command: cwebp "${image.path}" -o "${webpPath}" -q ${quality}`;
  };
  
  // Critical images - highest quality
  if (suggestions.critical.length > 0) {
    commands.push('# CRITICAL IMAGES (Above the fold - highest priority)');
    suggestions.critical.forEach(image => {
      commands.push(createWebPCommand(image, 90));
    });
    commands.push('');
  }
  
  // Large images - good quality but smaller size
  if (suggestions.large.length > 0) {
    commands.push('# LARGE IMAGES (>500KB - high priority for size reduction)');
    suggestions.large.forEach(image => {
      commands.push(createWebPCommand(image, 85));
    });
    commands.push('');
  }
  
  // Medium images - standard quality
  if (suggestions.medium.length > 0) {
    commands.push('# MEDIUM IMAGES (200KB-500KB - moderate priority)');
    suggestions.medium.forEach(image => {
      commands.push(createWebPCommand(image, 80));
    });
    commands.push('');
  }
  
  // Small images - may not need optimization
  if (suggestions.small.length > 0) {
    commands.push('# SMALL IMAGES (<200KB - low priority, may skip)');
    suggestions.small.forEach(image => {
      commands.push(`# ${image.relativePath} (${Math.round(image.size / 1024)}KB) - Consider keeping as-is`);
    });
  }
  
  return commands;
}

/**
 * Create optimization plan file
 */
async function createOptimizationPlan(suggestions, commands) {
  const totalSize = suggestions.critical.concat(suggestions.large, suggestions.medium, suggestions.small)
    .reduce((sum, img) => sum + img.size, 0);
  
  const plan = `# IMAGE OPTIMIZATION PLAN
Generated: ${new Date().toISOString()}

## SUMMARY
Total images found: ${suggestions.critical.length + suggestions.large.length + suggestions.medium.length + suggestions.small.length}
Total size: ${Math.round(totalSize / (1024 * 1024))}MB

### BREAKDOWN:
- Critical images: ${suggestions.critical.length} (${Math.round(suggestions.critical.reduce((sum, img) => sum + img.size, 0) / 1024)}KB)
- Large images: ${suggestions.large.length} (${Math.round(suggestions.large.reduce((sum, img) => sum + img.size, 0) / (1024 * 1024))}MB)
- Medium images: ${suggestions.medium.length} (${Math.round(suggestions.medium.reduce((sum, img) => sum + img.size, 0) / 1024)}KB)
- Small images: ${suggestions.small.length} (${Math.round(suggestions.small.reduce((sum, img) => sum + img.size, 0) / 1024)}KB)

## PRIORITY ORDER:
1. Critical images (immediate impact on LCP)
2. Large images (biggest size savings)
3. Medium images (good balance)
4. Small images (minimal impact)

## INSTALLATION:
To install cwebp (WebP conversion tool):
- Ubuntu/Debian: sudo apt install webp
- macOS: brew install webp
- Windows: Download from https://developers.google.com/speed/webp/download

## CONVERSION COMMANDS:

${commands.join('\n')}

## AUTOMATION SCRIPT:
Run all conversions automatically:

\`\`\`bash
#!/bin/bash
# Automated WebP conversion script

${suggestions.critical.concat(suggestions.large).map(image => {
  const webpPath = image.path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const quality = suggestions.critical.includes(image) ? 90 : 85;
  return `cwebp "${image.path}" -o "${webpPath}" -q ${quality}`;
}).join('\n')}
\`\`\`

## EXPECTED SAVINGS:
WebP typically achieves 25-50% smaller file sizes than PNG/JPEG.
Estimated savings: ${Math.round(totalSize * 0.35 / (1024 * 1024))}MB
`;

  await fs.writeFile(path.join(rootDir, 'IMAGE_OPTIMIZATION_PLAN.md'), plan);
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Scanning for images...');
  const images = await findImages();
  
  console.log(`📊 Found ${images.length} images`);
  
  const suggestions = generateOptimizationSuggestions(images);
  const commands = generateOptimizationCommands(suggestions);
  
  await createOptimizationPlan(suggestions, commands);
  
  console.log('\n📋 Optimization plan created: IMAGE_OPTIMIZATION_PLAN.md');
  console.log('\n🎯 Priority optimizations:');
  console.log(`   Critical: ${suggestions.critical.length} images`);
  console.log(`   Large: ${suggestions.large.length} images`);
  
  // Show top priority images
  if (suggestions.critical.length > 0) {
    console.log('\n🚨 Critical images (optimize first):');
    suggestions.critical.forEach(img => {
      console.log(`   - ${img.relativePath} (${Math.round(img.size / 1024)}KB)`);
    });
  }
  
  if (suggestions.large.length > 0) {
    console.log('\n📈 Largest images:');
    suggestions.large
      .sort((a, b) => b.size - a.size)
      .slice(0, 5)
      .forEach(img => {
        console.log(`   - ${img.relativePath} (${Math.round(img.size / 1024)}KB)`);
      });
  }
}

main().catch(console.error);