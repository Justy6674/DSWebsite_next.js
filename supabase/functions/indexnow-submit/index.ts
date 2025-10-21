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
    const { urls } = await req.json();
    console.log('IndexNow submission for URLs:', urls);
    
    if (!urls || !Array.isArray(urls)) {
      throw new Error('URLs array is required');
    }

    const baseUrl = 'https://www.downscale.com.au';
    const indexNowKey = '1a2b3c4d5e6f7g8h9i0j'; // Generate a unique key for your site
    
    // Submit to Bing IndexNow API
    const bingResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'www.downscale.com.au',
        key: indexNowKey,
        keyLocation: `${baseUrl}/${indexNowKey}.txt`,
        urlList: urls.map(url => url.startsWith('http') ? url : `${baseUrl}${url}`)
      })
    });

    const results = {
      bing: {
        status: bingResponse.status,
        statusText: bingResponse.statusText,
        success: bingResponse.ok
      }
    };

    // Also submit to Yandex
    try {
      const yandexResponse = await fetch('https://yandex.com/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          host: 'www.downscale.com.au',
          key: indexNowKey,
          keyLocation: `${baseUrl}/${indexNowKey}.txt`,
          urlList: urls.map(url => url.startsWith('http') ? url : `${baseUrl}${url}`)
        })
      });

      results.yandex = {
        status: yandexResponse.status,
        statusText: yandexResponse.statusText,
        success: yandexResponse.ok
      };
    } catch (error) {
      console.warn('Yandex IndexNow failed:', error);
      results.yandex = { error: error.message };
    }

    console.log('IndexNow submission results:', results);

    return new Response(JSON.stringify({
      success: true,
      results,
      submittedUrls: urls.length,
      timestamp: new Date().toISOString()
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('Error in IndexNow submission:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      }
    });
  }
});