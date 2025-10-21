import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';

const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl!, supabaseKey!);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the JWT token and user ID for security
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authentication required');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Invalid authentication token');
    }

    const { url } = await req.json();

    if (!url) {
      throw new Error('URL is required');
    }

    if (!firecrawlApiKey) {
      throw new Error('Firecrawl API key not configured');
    }

    console.log('Crawling website:', url);

    // Call Firecrawl API
    const crawlResponse = await fetch('https://api.firecrawl.dev/v0/crawl', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        crawlerOptions: {
          excludes: [],
          includes: [],
          limit: 50,
          allowBackwardCrawling: false,
          allowExternalContentLinks: false
        },
        pageOptions: {
          onlyMainContent: true,
          includeHtml: false,
          screenshot: false
        }
      }),
    });

    if (!crawlResponse.ok) {
      const errorText = await crawlResponse.text();
      console.error('Firecrawl API error:', crawlResponse.status, errorText);
      throw new Error(`Firecrawl API error: ${crawlResponse.status}`);
    }

    const crawlData = await crawlResponse.json();
    console.log('Crawl initiated:', crawlData);

    // Store crawl job info with user_id for security
    const { data: crawlJob, error: crawlJobError } = await supabase
      .from('website_crawls')
      .insert({
        url: url,
        job_id: crawlData.jobId,
        status: 'processing',
        user_id: user.id
      })
      .select()
      .single();

    if (crawlJobError) {
      console.error('Error storing crawl job:', crawlJobError);
      throw crawlJobError;
    }

    // Check crawl status
    const statusResponse = await fetch(`https://api.firecrawl.dev/v0/crawl/status/${crawlData.jobId}`, {
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
      },
    });

    if (!statusResponse.ok) {
      throw new Error(`Status check failed: ${statusResponse.status}`);
    }

    const statusData = await statusResponse.json();
    console.log('Crawl status:', statusData);

    if (statusData.status === 'completed' && statusData.data) {
      // Store the crawled content with user_id for security
      const pages = statusData.data.map((page: any, index: number) => ({
        crawl_id: crawlJob.id,
        url: page.metadata?.sourceURL || page.url,
        title: page.metadata?.title || `Page ${index + 1}`,
        content: page.markdown || page.content,
        metadata: page.metadata || {},
        user_id: user.id
      }));

      const { error: pagesError } = await supabase
        .from('crawled_pages')
        .insert(pages);

      if (pagesError) {
        console.error('Error storing pages:', pagesError);
        throw pagesError;
      }

      // Update crawl status
      await supabase
        .from('website_crawls')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', crawlJob.id);

      return new Response(JSON.stringify({
        success: true,
        jobId: crawlData.jobId,
        status: statusData.status,
        pages: statusData.data.length,
        message: `Successfully crawled ${statusData.data.length} pages`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      jobId: crawlData.jobId,
      status: statusData.status,
      message: 'Crawl in progress, check back later'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in website-crawler function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal server error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});