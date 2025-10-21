#!/usr/bin/env node

/**
 * Fix JSX Tag Mismatch Script
 * Fixes section/OptimizedBackground tag mismatches
 */

import fs from 'fs/promises';

const FILES_TO_FIX = [
  'src/pages/MedicalWeightManagementPage.tsx',
  'src/pages/BlogPage.tsx',
  'src/pages/ToolsPage.tsx',
  'src/pages/FaqPage.tsx',
  'src/pages/MovementActivityPrograms.tsx',
  'src/pages/GoalSettingMaintenance.tsx',
  'src/pages/MentalHealthSupport.tsx',
  'src/pages/NutritionMealPlanning.tsx',
  'src/pages/SleepRecoveryOptimisation.tsx'
];

async function fixFile(filePath) {
  try {
    console.log(`🔧 Fixing ${filePath}...`);
    let content = await fs.readFile(filePath, 'utf-8');
    
    // Strategy: Just revert problematic sections back to regular sections
    // and only optimize the hero sections that actually have background images
    
    // Fix: Change </OptimizedBackground> back to </section> where there's no matching OptimizedBackground opening
    const lines = content.split('\n');
    const fixedLines = [];
    const openTags = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Track opening tags
      if (line.trim().startsWith('<section')) {
        openTags.push('section');
      } else if (line.trim().startsWith('<OptimizedBackground')) {
        openTags.push('OptimizedBackground');
      }
      
      // Fix closing tags
      if (line.includes('</OptimizedBackground>')) {
        const lastOpenTag = openTags.pop();
        if (lastOpenTag === 'section') {
          // Mismatch - fix it
          fixedLines.push(line.replace('</OptimizedBackground>', '</section>'));
          console.log(`  Fixed line ${i + 1}: </OptimizedBackground> -> </section>`);
        } else {
          fixedLines.push(line);
        }
      } else if (line.includes('</section>')) {
        const lastOpenTag = openTags.pop();
        fixedLines.push(line);
      } else {
        fixedLines.push(line);
      }
    }
    
    const fixedContent = fixedLines.join('\n');
    
    // Only write if content changed
    if (fixedContent !== content) {
      await fs.writeFile(filePath, fixedContent);
      console.log(`✅ Fixed ${filePath}`);
    } else {
      console.log(`ℹ️  No changes needed for ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting JSX tag mismatch fixes...');
  
  for (const file of FILES_TO_FIX) {
    await fixFile(file);
  }
  
  console.log('\n🎉 Tag fixes complete!');
  console.log('📝 Next: Run npm run build to verify fixes');
}

main().catch(console.error);