#!/usr/bin/env node

const SUPABASE_URL = 'https://pooebqhsshfafkhvccrl.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8';

console.log('=== TESTING SUPABASE FUNCTIONS ===\n');

const functionsToTest = [
  'generate-sitemap',
  'sitemap-xml',
  'robots-txt',
  'blog-ai-optimizer',
  'generate-blog-sitemap',
  'blog-rss',
  'ping-google-sitemap'
];

async function testFunction(name) {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
      headers: {
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    const status = response.status;
    const contentType = response.headers.get('content-type');
    
    if (status === 200) {
      console.log(`✅ ${name}: WORKS (${contentType})`);
      if (contentType?.includes('xml')) {
        const text = await response.text();
        console.log(`   First 100 chars: ${text.substring(0, 100)}...`);
      }
    } else if (status === 404) {
      console.log(`❌ ${name}: NOT DEPLOYED`);
    } else if (status === 401) {
      console.log(`🔒 ${name}: EXISTS but needs auth`);
    } else {
      console.log(`⚠️  ${name}: Status ${status}`);
    }
  } catch (error) {
    console.log(`❌ ${name}: ERROR - ${error.message}`);
  }
  console.log('');
}

async function main() {
  for (const func of functionsToTest) {
    await testFunction(func);
  }
  
  console.log('\n=== TESTING BLOG POSTS TABLE ===\n');
  
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,title,slug,published&limit=5`, {
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`
      }
    });
    
    if (response.ok) {
      const posts = await response.json();
      console.log(`Found ${posts.length} blog posts:`);
      posts.forEach(post => {
        console.log(`- ${post.title} (${post.slug}) - Published: ${post.published}`);
      });
    } else {
      console.log('Could not fetch blog posts:', response.status);
    }
  } catch (error) {
    console.log('Error fetching blog posts:', error.message);
  }
}

main();