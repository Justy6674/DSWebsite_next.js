#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get Supabase credentials from environment
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://pooebqhsshfafkhvccrl.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateBlogSitemap() {
  try {
    console.log('🔍 Fetching published blog posts from Supabase...');

    // Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, created_at')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }

    console.log(`✅ Found ${posts?.length || 0} published blog posts`);

    // Generate sitemap XML
    const baseUrl = 'https://www.downscale.com.au';

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${baseUrl}/prices</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>${baseUrl}/faq</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>${baseUrl}/start-project</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog Posts -->
  ${posts?.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${(post.updated_at || post.created_at || new Date().toISOString()).split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('') || ''}
</urlset>`;

    // Write sitemap to dist directory
    const distPath = path.join(__dirname, '..', 'dist');
    const sitemapPath = path.join(distPath, 'sitemap-blog.xml');

    // Ensure dist directory exists
    await fs.mkdir(distPath, { recursive: true });

    // Write the sitemap
    await fs.writeFile(sitemapPath, sitemap, 'utf-8');
    console.log(`✅ Blog sitemap generated at ${sitemapPath}`);

    // Also write to public directory for development
    const publicSitemapPath = path.join(__dirname, '..', 'public', 'sitemap-blog.xml');
    await fs.writeFile(publicSitemapPath, sitemap, 'utf-8');
    console.log(`✅ Development sitemap generated at ${publicSitemapPath}`);

    return sitemap;
  } catch (error) {
    console.error('❌ Error generating blog sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBlogSitemap();
}

export default generateBlogSitemap;