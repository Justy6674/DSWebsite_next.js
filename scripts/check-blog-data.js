// Script to check what blog data exists in Supabase
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://pooebqhsshfafkhvccrl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function checkBlogData() {
  console.log('🔍 Checking blog post data...');

  try {
    // Get all blog posts
    const { data: allPosts, error: allError } = await supabase
      .from('blog_posts')
      .select('slug, title, published')
      .order('created_at', { ascending: false });

    if (allError) {
      console.error('❌ Error fetching all posts:', allError);
      return;
    }

    console.log(`📊 Total blog posts: ${allPosts?.length || 0}`);

    if (allPosts && allPosts.length > 0) {
      console.log('\n📝 Available blog posts:');
      allPosts.forEach((post, index) => {
        console.log(`   ${index + 1}. ${post.title}`);
        console.log(`      Slug: ${post.slug}`);
        console.log(`      Published: ${post.published}`);
        console.log('');
      });
    }

    // Test specific slug we're having trouble with
    const testSlug = 'choosing-the-right-weight-loss-clinic-in-australia-the-downscale-difference';
    console.log(`🔍 Testing specific slug: ${testSlug}`);

    const { data: specificPost, error: specificError } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', testSlug)
      .eq('published', true)
      .maybeSingle();

    if (specificError) {
      console.error('❌ Error fetching specific post:', specificError);
      return;
    }

    if (specificPost) {
      console.log('✅ Found specific post:', specificPost.title);
    } else {
      console.log('❌ Specific post not found');
    }

  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

checkBlogData();