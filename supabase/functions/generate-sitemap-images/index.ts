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
    const lastmod = new Date().toISOString().split('T')[0]
    
    // Generate image sitemap XML with key images
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://www.downscale.com.au/</loc>
    <image:image>
      <image:loc>https://www.downscale.com.au/og-image.jpg</image:loc>
      <image:caption>Downscale Health - Online Weight Loss Clinic Australia</image:caption>
      <image:title>Virtual Weight Loss Clinic</image:title>
    </image:image>
    <image:image>
      <image:loc>https://www.downscale.com.au/RocksHero.webp</image:loc>
      <image:caption>Virtual telehealth consultations for weight loss</image:caption>
      <image:title>Telehealth Weight Loss</image:title>
    </image:image>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.downscale.com.au/about</loc>
    <image:image>
      <image:loc>https://www.downscale.com.au/justin-black.jpg</image:loc>
      <image:caption>Justin Black, Nurse Practitioner and Weight Loss Specialist</image:caption>
      <image:title>Justin Black NP</image:title>
    </image:image>
    <image:image>
      <image:loc>https://www.downscale.com.au/justin-transformation.png</image:loc>
      <image:caption>Justin Black weight loss transformation before and after</image:caption>
      <image:title>Weight Loss Transformation</image:title>
    </image:image>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.downscale.com.au/pricing</loc>
    <image:image>
      <image:loc>https://www.downscale.com.au/100% BULK-BILLED.png</image:loc>
      <image:caption>100% Medicare bulk billed weight loss consultations</image:caption>
      <image:title>Medicare Bulk Billed</image:title>
    </image:image>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`

    return new Response(xml, { 
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/xml; charset=utf-8' 
      } 
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})