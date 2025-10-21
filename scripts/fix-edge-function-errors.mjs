#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const functionsDir = path.join(__dirname, '..', 'supabase', 'functions');

// Fix TypeScript error patterns in edge functions
const fixErrorPatterns = (content) => {
  // Fix: 'error' is of type 'unknown'
  content = content.replace(
    /error\.message/g, 
    '(error instanceof Error ? error.message : String(error))'
  );
  
  content = content.replace(
    /error\.stack/g, 
    '(error instanceof Error ? error.stack : "")'
  );
  
  content = content.replace(
    /error\.name/g, 
    '(error instanceof Error ? error.name : "Error")'
  );
  
  // Fix: value is of type unknown in Object.entries mapping
  content = content.replace(
    /value >= 2/g,
    '(typeof value === "number" ? value >= 2 : false)'
  );
  
  return content;
};

// Process all TypeScript files in functions directory
const processFiles = (dir) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processFiles(filePath);
    } else if (file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const fixedContent = fixErrorPatterns(content);
      
      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent);
        console.log(`Fixed TypeScript errors in: ${filePath}`);
      }
    }
  });
};

console.log('Fixing TypeScript errors in edge functions...');
processFiles(functionsDir);
console.log('TypeScript error fixes complete!');