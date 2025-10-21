import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Generating robots.txt...');
    
    const baseUrl = 'https://www.downscale.com.au';
    const currentDate = new Date().toISOString().split('T')[0];

    // FIXED robots.txt - optimized rule ordering to prevent Google warnings
    const robotsContent = `# Downscale Weight Loss Clinic - SEO Optimized Robots.txt
# Updated: ${currentDate} - FIXED RULE ORDERING

# Default crawler rules
User-agent: *
Allow: /

# Block administrative and sensitive areas
Disallow: /admin/
Disallow: /blog-admin
Disallow: /api/
Disallow: /cart/
Disallow: /account/
Disallow: /customer_authentication/
Disallow: /search/suggest
Disallow: /private/
Disallow: /tmp/

# Block specific query parameters (more specific patterns)
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /*?source=*
Disallow: /*?campaign=*
Disallow: /*?gclid=*
Disallow: /*?fbclid=*

# Block URL fragments
Disallow: /*#*

# Explicit Allow rules for critical pages (placed AFTER Disallow rules)
Allow: /admin/login
Allow: /services
Allow: /about
Allow: /pricing
Allow: /blog
Allow: /blog/*?blogcategory=*
Allow: /faq
Allow: /tools
Allow: /calculator
Allow: /how-it-works
Allow: /medical-weight-management
Allow: /nutrition-meal-planning
Allow: /sleep-recovery-optimisation
Allow: /movement-activity-programs
Allow: /mental-health-support
Allow: /goal-setting-maintenance
Allow: /medicare
Allow: /weight-loss-clinic-*

# Legal pages - explicitly allowed
Allow: /privacy
Allow: /terms
Allow: /complaints
Allow: /data-deletion

# Major search engines - optimized settings
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 0.5

# Social media crawlers
User-agent: facebookexternalhit
Allow: /
Crawl-delay: 0

User-agent: Twitterbot
Allow: /
Crawl-delay: 0

# AI crawlers - OPTIMIZED for AI visibility
User-agent: GPTBot
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1

User-agent: ChatGPT-User
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1

User-agent: PerplexityBot
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1

User-agent: CCBot
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1

User-agent: ClaudeBot
Allow: /
Disallow: /admin/
Disallow: /api/
Crawl-delay: 1

User-agent: Google-Extended
Allow: /
Crawl-delay: 1

# Block bad bots completely
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: PetalBot
Disallow: /

User-agent: BLEXBot
Disallow: /

User-agent: YandexBot
Disallow: /

User-agent: SerpstatBot
Disallow: /

User-agent: MauiBot
Disallow: /

# SITEMAPS - Main domain only for efficient crawling
Sitemap: ${baseUrl}/sitemap-index.xml`;

    console.log('Robots.txt generated successfully');

    return new Response(robotsContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800', // 24h cache, 7d stale
        'X-Generated-At': new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error('Error generating robots.txt:', error);
    
    return new Response(`# Error generating robots.txt
# Downscale Weight Loss Clinic - Fallback robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.downscale.com.au/sitemap-index.xml`, {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'text/plain; charset=utf-8' 
      }
    });
  }
});