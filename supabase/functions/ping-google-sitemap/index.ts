import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Ping Google about sitemap update
    const sitemapUrl = 'https://www.downscale.com.au/sitemap.xml'
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    
    const response = await fetch(googlePingUrl)
    
    if (!response.ok) {
      throw new Error('Failed to ping Google')
    }

    // Also ping Bing
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    await fetch(bingPingUrl)

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Successfully pinged Google and Bing about sitemap update' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})