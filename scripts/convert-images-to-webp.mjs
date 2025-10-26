#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts PNG and JPG images to WebP format for better performance
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('\n=== IMAGE OPTIMIZATION - WEBP CONVERSION ===\n');

/**
 * Find all images that need WebP conversion
 */
function findImagesToConvert() {
  const publicDir = path.join(projectRoot, 'public');
  const images = [];
  
  function scanImages(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !['blog', 'lovable-uploads', 'node_modules'].includes(entry.name)) {
        scanImages(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
          const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
          if (!fs.existsSync(webpPath)) {
            images.push({
              source: fullPath,
              target: webpPath,
              name: entry.name
            });
          }
        }
      }
    }
  }
  
  scanImages(publicDir);
  return images;
}

/**
 * Convert image to WebP
 */
async function convertToWebP(sourcePath, targetPath) {
  try {
    const stats = fs.statSync(sourcePath);
    const originalSize = stats.size;
    
    await sharp(sourcePath)
      .webp({ quality: 85, effort: 6 })
      .toFile(targetPath);
    
    const newStats = fs.statSync(targetPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    return {
      success: true,
      originalSize,
      newSize,
      savings
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Main conversion function
 */
async function runConversion() {
  console.log('Step 1: Finding images to convert...');
  const images = findImagesToConvert();
  console.log(`Found ${images.length} images needing WebP conversion\n`);
  
  if (images.length === 0) {
    console.log('✓ All images already have WebP versions!\n');
    return;
  }
  
  console.log('Step 2: Converting images to WebP...\n');
  
  let converted = 0;
  let failed = 0;
  let totalOriginal = 0;
  let totalNew = 0;
  
  for (const image of images) {
    process.stdout.write(`Converting ${image.name}... `);
    
    const result = await convertToWebP(image.source, image.target);
    
    if (result.success) {
      console.log(`✓ ${(result.originalSize/1024).toFixed(1)}KB → ${(result.newSize/1024).toFixed(1)}KB (${result.savings}% savings)`);
      converted++;
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
    } else {
      console.log(`✗ Failed: ${result.error}`);
      failed++;
    }
  }
  
  console.log(`\n=== CONVERSION SUMMARY ===`);
  console.log(`Total images: ${images.length}`);
  console.log(`Converted: ${converted}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total size before: ${(totalOriginal/1024/1024).toFixed(2)} MB`);
  console.log(`Total size after: ${(totalNew/1024/1024).toFixed(2)} MB`);
  console.log(`Total savings: ${((totalOriginal-totalNew)/totalOriginal*100).toFixed(1)}%`);
  console.log(`Space saved: ${((totalOriginal-totalNew)/1024/1024).toFixed(2)} MB`);
  console.log('\nImage optimization complete!\n');
}

// Run the conversion
runConversion().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
