import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/rss+xml; charset=utf-8',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch recent blog posts
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error

    // Generate RSS XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Downscale Weight Loss Clinic Blog</title>
    <link>https://www.downscale.com.au/blog</link>
    <description>Evidence-based weight loss insights from Australia's supportive Nurse Practitioner-led clinic</description>
    <language>en-AU</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.downscale.com.au/blog/rss.xml" rel="self" type="application/rss+xml" />
${posts?.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://www.downscale.com.au/blog/${post.slug}</link>
      <guid isPermaLink="true">https://www.downscale.com.au/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || post.meta_description}]]></description>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <author>noreply@downscale.com.au (${post.author || 'Downscale Weight Loss Clinic'})</author>
      <category>${post.category}</category>
    </item>`).join('\n') || ''}
  </channel>
</rss>`

    return new Response(xml, { headers: corsHeaders })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})