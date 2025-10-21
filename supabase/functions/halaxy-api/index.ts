/**
 * Halaxy API Proxy Edge Function
 * Secure proxy for real Halaxy API calls with token management and caching
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes
const cache = new Map<string, { data: any; expires: number }>()

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { endpoint, patient_id, params = {} } = await req.json()

    console.log(`Halaxy API request: ${endpoint}`, { patient_id, params })

    if (!endpoint || !patient_id) {
      return new Response(
        JSON.stringify({ error: 'Endpoint and patient_id required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check cache first
    const cacheKey = `${endpoint}_${patient_id}_${JSON.stringify(params)}`
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() < cached.expires) {
      console.log('Returning cached data for:', cacheKey)
      return new Response(
        JSON.stringify({ 
          success: true, 
          data: cached.data,
          cached: true,
          ttl: Math.floor((cached.expires - Date.now()) / 1000)
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get valid access token
    const accessToken = await getValidAccessToken(patient_id, supabase)
    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: 'Patient not authenticated with Halaxy' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Make API call to Halaxy
    const data = await makeHalaxyRequest(endpoint, accessToken, params)
    
    // Cache the response
    cache.set(cacheKey, {
      data,
      expires: Date.now() + CACHE_TTL
    })

    // Log the API call for audit
    await logApiCall(patient_id, endpoint, 'success', supabase)

    console.log(`Halaxy API call successful: ${endpoint}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        data,
        cached: false,
        ttl: CACHE_TTL / 1000
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Halaxy API error:', error)
    
    // Log failed API call
    try {
      const { patient_id } = await req.json()
      if (patient_id) {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )
        await logApiCall(patient_id, 'unknown', 'error', supabase, error instanceof Error ? error.message : 'Unknown error')
      }
    } catch (logError) {
      console.error('Failed to log API error:', logError)
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Halaxy API request failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

/**
 * Get valid access token for patient, refreshing if necessary
 */
async function getValidAccessToken(patientId: string, supabase: any): Promise<string | null> {
  try {
    // Get stored tokens using secure function
    const { data: tokenData, error } = await supabase.rpc('get_halaxy_tokens', {
      p_user_id: patientId
    })

    if (error || !tokenData || tokenData.length === 0) {
      console.error('No Halaxy link found for patient:', patientId, error)
      return null
    }

    const tokens = tokenData[0]
    
    if (!tokens.is_expired) {
      // Token is still valid
      return tokens.access_token
    }

    // Token expired, refresh it
    console.log('Token expired, refreshing for patient:', patientId)
    
    const authFunction = supabase.functions.invoke('halaxy-auth', {
      body: {
        action: 'refresh_token',
        refresh_token: tokens.refresh_token,
        patient_id: patientId
      }
    })

    const { data: refreshData, error: refreshError } = await authFunction
    
    if (refreshError || !refreshData?.success) {
      console.error('Failed to refresh token:', refreshError)
      return null
    }

    return refreshData.access_token

  } catch (error) {
    console.error('Error getting access token:', error)
    return null
  }
}

/**
 * Make authenticated request to Halaxy API
 */
async function makeHalaxyRequest(endpoint: string, accessToken: string, params: Record<string, any>) {
  const baseUrl = 'https://au-api.halaxy.com/main'
  
  // Build URL with query parameters
  const url = new URL(`${baseUrl}${endpoint}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  })

  console.log('Making request to Halaxy:', url.toString())

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error(`Halaxy API error (${response.status}):`, errorText)
    throw new Error(`Halaxy API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  console.log(`Halaxy API response for ${endpoint}:`, data)
  
  return data
}

/**
 * Log API call for audit trail
 */
async function logApiCall(
  patientId: string, 
  endpoint: string, 
  status: 'success' | 'error', 
  supabase: any,
  errorMessage?: string
) {
  try {
    await supabase
      .from('audit_logs')
      .insert({
        user_id: patientId,
        action: 'halaxy_api_call',
        resource_type: 'halaxy_api',
        resource_id: endpoint,
        details: {
          endpoint,
          status,
          error_message: errorMessage,
          timestamp: new Date().toISOString()
        }
      })
  } catch (error) {
    console.error('Failed to log API call:', error)
  }
}