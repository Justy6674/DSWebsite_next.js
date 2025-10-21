#!/usr/bin/env node

const SUPABASE_URL = 'https://pooebqhsshfafkhvccrl.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8';

console.log('=== TESTING SITEMAP TRIGGER ON BLOG PUBLISH ===\n');

async function testSitemapTrigger() {
  try {
    console.log('1. Creating test blog post...');
    
    // Create a test blog post
    const createResponse = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts`, {
      method: 'POST',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        title: 'TEST POST - Sitemap Trigger Test',
        slug: `test-sitemap-trigger-${Date.now()}`,
        content: 'This is a test post to verify sitemap triggers work.',
        excerpt: 'Test post for sitemap automation',
        published: false // Start unpublished
      })
    });

    if (!createResponse.ok) {
      throw new Error(`Failed to create test post: ${createResponse.status}`);
    }

    const newPost = await createResponse.json();
    const testPostId = newPost[0].id;
    console.log(`✅ Created test post: ${testPostId}`);

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n2. Publishing test blog post...');
    
    // Update the post to published (this should trigger sitemap update)
    const publishResponse = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${testPostId}`, {
      method: 'PATCH',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        published: true
      })
    });

    if (!publishResponse.ok) {
      throw new Error(`Failed to publish test post: ${publishResponse.status}`);
    }

    console.log('✅ Published test post - this should have triggered sitemap update');

    // Wait for trigger to execute
    console.log('\n3. Waiting 5 seconds for trigger to execute...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('\n4. Checking if sitemap contains new post...');
    
    // Check sitemap
    const sitemapResponse = await fetch(`${SUPABASE_URL}/functions/v1/sitemap-xml`);
    if (sitemapResponse.ok) {
      const sitemapContent = await sitemapResponse.text();
      const testSlug = `test-sitemap-trigger-${Date.now()}`;
      
      if (sitemapContent.includes(newPost[0].slug)) {
        console.log('✅ SUCCESS: New blog post found in sitemap!');
        console.log(`   Sitemap contains: /blog/${newPost[0].slug}`);
      } else {
        console.log('❌ FAIL: New blog post NOT found in sitemap');
        console.log('   This indicates the trigger may not be working');
      }
    } else {
      console.log('❌ Failed to fetch sitemap for verification');
    }

    console.log('\n5. Testing Google ping function...');
    
    // Test Google ping directly
    const pingResponse = await fetch(`${SUPABASE_URL}/functions/v1/ping-google-sitemap`, {
      method: 'POST',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (pingResponse.ok) {
      const pingResult = await pingResponse.json();
      console.log('✅ Google ping function works:', pingResult.message);
    } else {
      console.log('❌ Google ping function failed:', pingResponse.status);
    }

    console.log('\n6. Cleaning up test post...');
    
    // Delete test post
    const deleteResponse = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${testPostId}`, {
      method: 'DELETE',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`
      }
    });

    if (deleteResponse.ok) {
      console.log('✅ Test post deleted');
    } else {
      console.log('⚠️  Failed to delete test post - you may need to clean it up manually');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

console.log('🎯 WHAT THIS TEST DOES:');
console.log('1. Creates an unpublished blog post');
console.log('2. Publishes it (triggers database trigger)');
console.log('3. Trigger calls generate-sitemap edge function');
console.log('4. Trigger calls ping-google-sitemap edge function');
console.log('5. Verifies new post appears in sitemap');
console.log('6. Tests Google ping functionality');
console.log('7. Cleans up test data\n');

testSitemapTrigger();