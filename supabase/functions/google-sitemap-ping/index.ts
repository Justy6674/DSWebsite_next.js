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
    console.log('Starting Google sitemap ping sequence...')
    
    const baseUrl = 'https://www.downscale.com.au'
    const sitemapIndexUrl = `${baseUrl}/sitemap-index.xml`
    
    // Primary ping to Google
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapIndexUrl)}`
    console.log('Pinging Google:', googlePingUrl)
    
    const googleResponse = await fetch(googlePingUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Downscale-Sitemap-Bot/1.0'
      }
    })
    
    if (!googleResponse.ok) {
      throw new Error(`Google ping failed: ${googleResponse.status}`)
    }
    
    // Also ping Bing
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapIndexUrl)}`
    console.log('Pinging Bing:', bingPingUrl)
    
    await fetch(bingPingUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Downscale-Sitemap-Bot/1.0'
      }
    })
    
    console.log('Successfully pinged both Google and Bing')
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Successfully notified Google and Bing about sitemap updates',
      sitemap_url: sitemapIndexUrl,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
    
  } catch (error) {
    console.error('Sitemap ping error:', error)
    
    return new Response(JSON.stringify({ 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})