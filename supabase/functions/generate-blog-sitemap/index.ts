import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Generating clean blog sitemap - no query parameters')

    // Fetch all published blog posts with proper slug validation
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, title')
      .eq('published', true)
      .not('slug', 'is', null)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching blog posts:', error)
      throw error
    }

    console.log(`Found ${posts?.length || 0} published blog posts`)

    // Filter out any posts with invalid slugs (containing query params, /f/, etc.)
    const validPosts = posts?.filter(post => {
      const slug = post.slug
      // Exclude posts with query parameters, /f/ prefixes, or invalid characters
      if (!slug || slug.includes('?') || slug.includes('#') || slug.includes('/f/') || slug.includes('/home/')) {
        console.log(`Excluding invalid slug: ${slug}`)
        return false
      }
      // Ensure slug is URL-safe
      if (!/^[a-zA-Z0-9\-_]+$/.test(slug)) {
        console.log(`Excluding non-URL-safe slug: ${slug}`)
        return false
      }
      return true
    }) || []

    console.log(`Filtered to ${validPosts.length} valid blog posts`)

    // Generate clean sitemap XML with only valid blog URLs
    const urlEntries = validPosts.map(post => 
      `  <url>
    <loc>https://www.downscale.com.au/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    ).join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.downscale.com.au/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
${urlEntries}
</urlset>`

    console.log('Generated clean blog sitemap successfully')

    return new Response(xml, { 
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/xml; charset=utf-8' 
      } 
    })
  } catch (error) {
    console.error('Blog sitemap generation error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})