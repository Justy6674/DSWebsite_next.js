#!/usr/bin/env node

/**
 * Bulk Background Image Optimization Script
 * Updates all pages with background images to use OptimizedBackground component
 */

import fs from 'fs/promises';
import path from 'path';

const PAGE_UPDATES = [
  {
    file: 'src/pages/MedicalWeightManagementPage.tsx',
    backgroundPath: '/lovable-uploads/c697303a-f18b-4c1c-9a36-a656da85d2bb.png',
    overlay: 'linear-gradient(rgba(15, 23, 42, 0.4), rgba(30, 41, 59, 0.4))'
  },
  {
    file: 'src/pages/BlogPage.tsx', 
    backgroundPath: '/lovable-uploads/464632cf-e9a0-4b46-bb06-58754bc63a0b.png',
    overlay: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.8))'
  },
  {
    file: 'src/pages/ToolsPage.tsx',
    backgroundPath: '/lovable-uploads/6fe1a9b0-3661-49d7-83d7-246ec1d97f80.png', 
    overlay: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.8))'
  },
  {
    file: 'src/pages/FaqPage.tsx',
    backgroundPath: '/lovable-uploads/ece37871-573a-4956-ae79-33ce5cf35c23.png',
    overlay: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.8))'
  }
];

const HERO_PAGES = [
  {
    file: 'src/pages/MovementActivityPrograms.tsx',
    assetImport: 'realisticFitnessHero',
    overlay: 'linear-gradient(rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7))'
  },
  {
    file: 'src/pages/GoalSettingMaintenance.tsx', 
    assetImport: 'goalSettingHero',
    overlay: 'linear-gradient(rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7))'
  },
  {
    file: 'src/pages/MentalHealthSupport.tsx',
    assetImport: 'worriedWomanHero', 
    overlay: 'linear-gradient(rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7))'
  },
  {
    file: 'src/pages/NutritionMealPlanning.tsx',
    assetImport: 'foodHero',
    overlay: 'linear-gradient(rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7))'
  },
  {
    file: 'src/pages/SleepRecoveryOptimisation.tsx',
    assetImport: 'sleepCpapHero',
    overlay: 'linear-gradient(rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7))'
  }
];

async function updatePageWithOptimizedBackground(pageInfo) {
  const filePath = pageInfo.file;
  
  try {
    console.log(`🔄 Updating ${filePath}...`);
    let content = await fs.readFile(filePath, 'utf-8');
    
    // Add OptimizedBackground import if not present
    if (!content.includes('OptimizedBackground')) {
      content = content.replace(
        /import.*from.*@\/components\/ui\/optimized-image.*;\n/,
        `$&import { OptimizedBackground } from '@/components/ui/optimized-background';\n`
      );
      
      // If that didn't work, try adding after layout import
      if (!content.includes('OptimizedBackground')) {
        content = content.replace(
          /import.*Layout.*;\n/,
          `$&import { OptimizedBackground } from '@/components/ui/optimized-background';\n`
        );
      }
    }
    
    // Replace background image style with OptimizedBackground component
    if (pageInfo.backgroundPath) {
      // For lovable-uploads paths
      const backgroundPattern = /style=\{\{[^}]*backgroundImage:[^}]*url\([^)]*\)[^}]*\}\}/g;
      const sectionPattern = /<section([^>]*className="[^"]*")([^>]*)style=\{\{[^}]*backgroundImage:[^}]*\}\}([^>]*)>/g;
      
      content = content.replace(sectionPattern, (match, className, beforeStyle, afterStyle) => {
        return `<OptimizedBackground
          src="${pageInfo.backgroundPath}"
          ${className}${beforeStyle}${afterStyle}
          overlay="${pageInfo.overlay}"
          priority={true}
        >`;
      });
    }
    
    // For asset imports (hero images)
    if (pageInfo.assetImport) {
      const heroPattern = new RegExp(`backgroundImage: \`url\\(\\\${${pageInfo.assetImport}}\\)\``, 'g');
      const sectionPattern = new RegExp(`<section([^>]*style=\\{\\{[^}]*backgroundImage: \`url\\(\\\${${pageInfo.assetImport}}\\)\`[^}]*\\}\\}[^>]*)>`, 'g');
      
      content = content.replace(sectionPattern, (match, attributes) => {
        // Extract className from attributes
        const classMatch = attributes.match(/className="([^"]*)"/);
        const className = classMatch ? classMatch[1] : '';
        
        return `<OptimizedBackground
          src={${pageInfo.assetImport}}
          className="${className}"
          overlay="${pageInfo.overlay}"
          priority={true}
        >`;
      });
    }
    
    // Replace </section> with </OptimizedBackground> in hero sections
    // This is a bit crude but should work for most cases
    content = content.replace(/(\s*<\/div>\s*<\/div>\s*)<\/section>/g, '$1</OptimizedBackground>');
    
    await fs.writeFile(filePath, content);
    console.log(`✅ Updated ${filePath}`);
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting bulk background image optimization...');
  
  // Update pages with lovable-uploads background images
  for (const pageInfo of PAGE_UPDATES) {
    await updatePageWithOptimizedBackground(pageInfo);
  }
  
  // Update pages with hero asset imports
  for (const pageInfo of HERO_PAGES) {
    await updatePageWithOptimizedBackground(pageInfo);
  }
  
  console.log('\n🎉 Bulk optimization complete!');
  console.log('\n📝 Manual review recommended:');
  console.log('1. Check that all <section> tags have matching </OptimizedBackground> tags');
  console.log('2. Verify imports are correctly added');
  console.log('3. Test build with: npm run build');
}

main().catch(console.error);