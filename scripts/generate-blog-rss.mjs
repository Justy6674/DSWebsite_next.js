#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get Supabase credentials from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://pooebqhsshfafkhvccrl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvb2VicWhzc2hmYWZraHZjY3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjA4MzYsImV4cCI6MjA2Nzc5NjgzNn0.HfHAScs024qp9rsm289FzwQ7vr22z_uk48VS9jlxjE8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateBlogRSS() {
  try {
    console.log('🔍 Fetching published blog posts for RSS feed...');

    // Fetch all published blog posts with full content
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(20); // RSS feeds typically limit to recent posts

    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }

    console.log(`✅ Found ${posts?.length || 0} blog posts for RSS feed`);

    // Generate RSS XML
    const baseUrl = 'https://www.downscale.com.au';
    const currentDate = new Date().toUTCString();

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Downscale Weight Loss Clinic Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Expert insights on weight loss, nutrition, and health from Downscale Weight Loss Clinic. Your trusted partner in sustainable weight management.</description>
    <language>en-AU</language>
    <copyright>Copyright ${new Date().getFullYear()} Downscale Weight Loss Clinic</copyright>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Downscale Weight Loss Clinic Blog</title>
      <link>${baseUrl}</link>
    </image>

    ${posts?.map(post => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.created_at).toUTCString();
      const excerpt = post.excerpt || post.content?.substring(0, 200) || '';

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(excerpt)}</description>
      <content:encoded><![CDATA[${post.content || ''}]]></content:encoded>
      <dc:creator>${escapeXml(post.author || 'Downscale Team')}</dc:creator>
      <pubDate>${pubDate}</pubDate>
      ${post.categories ? `<category>${escapeXml(post.categories)}</category>` : ''}
      ${post.featured_image ? `<enclosure url="${escapeXml(post.featured_image)}" type="image/jpeg" />` : ''}
    </item>`;
    }).join('') || ''}
  </channel>
</rss>`;

    // Write RSS feed to public directory (Next.js serves this statically)
    const publicBlogPath = path.join(__dirname, '..', 'public', 'blog');
    await fs.mkdir(publicBlogPath, { recursive: true });
    const publicRssPath = path.join(publicBlogPath, 'rss.xml');
    await fs.writeFile(publicRssPath, rss, 'utf-8');
    console.log(`✅ RSS feed generated at ${publicRssPath}`);

    return rss;
  } catch (error) {
    console.error('❌ Error generating RSS feed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateBlogRSS();
}

export default generateBlogRSS;