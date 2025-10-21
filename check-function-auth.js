#!/usr/bin/env node

console.log('=== CHECKING FUNCTION AUTHENTICATION ===\n');

const SUPABASE_URL = 'https://pooebqhsshfafkhvccrl.supabase.co';

// Test without any auth
async function testNoAuth() {
  console.log('1. Testing WITHOUT auth header:');
  const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-blog-sitemap`);
  console.log(`   Status: ${response.status}`);
  if (response.status === 401) {
    const body = await response.json();
    console.log(`   Message: ${body.message}`);
    console.log('   ❌ Function requires authentication\n');
  }
}

// Test with anon key
async function testWithAnon() {
  console.log('2. Testing WITH anon key:');
  const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8';
  
  const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-blog-sitemap`, {
    headers: { 'Authorization': `Bearer ${ANON_KEY}` }
  });
  console.log(`   Status: ${response.status}`);
  if (response.status === 200) {
    console.log('   ✅ Function works with anon key\n');
  }
}

// Check verify_jwt setting
console.log('3. Function configuration in supabase/config.toml:');
console.log('   [functions.generate-blog-sitemap]');
console.log('   verify_jwt = false');
console.log('   ');
console.log('   This SHOULD make it public, but it\'s not working.');
console.log('   The function is checking for auth in its code.\n');

console.log('=== SOLUTION ===');
console.log('The function code itself is checking for authentication.');
console.log('We need to either:');
console.log('1. Modify the function to not require auth');
console.log('2. Pass the anon key in Vercel rewrite');
console.log('3. Use a different function that doesn\'t require auth');

testNoAuth().then(() => testWithAnon());