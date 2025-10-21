/**
 * Halaxy OAuth2 Authentication Edge Function
 * Handles OAuth2 flow and token management for Halaxy API integration
 * Uses encrypted token storage for enhanced security
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface HalaxyTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

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

    const { action, code, refresh_token, patient_id } = await req.json()

    console.log(`Halaxy Auth: ${action} request`, { patient_id, hasCode: !!code, hasRefreshToken: !!refresh_token })

    switch (action) {
      case 'get_auth_url':
        return handleGetAuthUrl()
      
      case 'exchange_code':
        return await handleExchangeCode(code, patient_id, supabase)
      
      case 'refresh_token':
        return await handleRefreshToken(refresh_token, patient_id, supabase)
      
      case 'get_stored_token':
        return await handleGetStoredToken(patient_id, supabase)
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Halaxy Auth error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

/**
 * Generate Halaxy OAuth2 authorization URL
 */
function handleGetAuthUrl() {
  const clientId = Deno.env.get('HALAXY_CLIENT_ID')
  const redirectUri = `${Deno.env.get('SUPABASE_URL')}/functions/v1/halaxy-auth`
  
  if (!clientId) {
    return new Response(
      JSON.stringify({ error: 'Halaxy client ID not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const authUrl = new URL('https://api.halaxy.com/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('scope', 'read:appointments read:patients read:invoices read:documents')

  console.log('Generated Halaxy auth URL:', authUrl.toString())

  return new Response(
    JSON.stringify({ 
      success: true, 
      auth_url: authUrl.toString(),
      redirect_uri: redirectUri 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

/**
 * Exchange authorization code for access token
 */
async function handleExchangeCode(code: string, patientId: string, supabase: any) {
  if (!code || !patientId) {
    return new Response(
      JSON.stringify({ error: 'Authorization code and patient ID required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const clientId = Deno.env.get('HALAXY_CLIENT_ID')
  const clientSecret = Deno.env.get('HALAXY_CLIENT_SECRET')
  const redirectUri = `${Deno.env.get('SUPABASE_URL')}/functions/v1/halaxy-auth`

  if (!clientId || !clientSecret) {
    return new Response(
      JSON.stringify({ error: 'Halaxy credentials not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    console.log('Exchanging code for token with Halaxy API')
    
    const tokenResponse = await fetch('https://api.halaxy.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Halaxy token exchange failed:', tokenResponse.status, errorText)
      throw new Error(`Token exchange failed: ${tokenResponse.status} ${errorText}`)
    }

    const tokens: HalaxyTokenResponse = await tokenResponse.json()
    console.log('Successfully received tokens from Halaxy')

    // Store tokens securely using encrypted database function
    const expiresAt = new Date(Date.now() + (tokens.expires_in * 1000))
    
    const { error: insertError } = await supabase.rpc('insert_halaxy_link', {
      p_user_id: patientId,
      p_halaxy_patient_id: patientId, // Will be updated with real patient ID from API
      p_access_token: tokens.access_token,
      p_refresh_token: tokens.refresh_token,
      p_expires_at: expiresAt.toISOString(),
    })

    if (insertError) {
      console.error('Error storing Halaxy tokens:', insertError)
      throw new Error('Failed to store authentication data')
    }

    console.log('Tokens stored successfully for patient:', patientId)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Authentication successful',
        expires_at: expiresAt.toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Code exchange error:', error)
    return new Response(
      JSON.stringify({ error: 'Token exchange failed', details: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

/**
 * Refresh expired access token
 */
async function handleRefreshToken(refreshToken: string, patientId: string, supabase: any) {
  if (!refreshToken || !patientId) {
    return new Response(
      JSON.stringify({ error: 'Refresh token and patient ID required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  const clientId = Deno.env.get('HALAXY_CLIENT_ID')
  const clientSecret = Deno.env.get('HALAXY_CLIENT_SECRET')

  if (!clientId || !clientSecret) {
    return new Response(
      JSON.stringify({ error: 'Halaxy credentials not configured' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    console.log('Refreshing Halaxy token for patient:', patientId)
    
    const tokenResponse = await fetch('https://api.halaxy.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Halaxy token refresh failed:', tokenResponse.status, errorText)
      throw new Error(`Token refresh failed: ${tokenResponse.status} ${errorText}`)
    }

    const tokens: HalaxyTokenResponse = await tokenResponse.json()
    console.log('Successfully refreshed tokens from Halaxy')

    // Update stored tokens using encrypted database function
    const expiresAt = new Date(Date.now() + (tokens.expires_in * 1000))
    
    const { error: updateError } = await supabase.rpc('update_halaxy_tokens', {
      p_user_id: patientId,
      p_access_token: tokens.access_token,
      p_refresh_token: tokens.refresh_token,
      p_expires_at: expiresAt.toISOString(),
    })

    if (updateError) {
      console.error('Error updating Halaxy tokens:', updateError)
      throw new Error('Failed to update authentication data')
    }

    console.log('Tokens refreshed successfully for patient:', patientId)

    return new Response(
      JSON.stringify({ 
        success: true,
        access_token: tokens.access_token,
        expires_at: expiresAt.toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Token refresh error:', error)
    return new Response(
      JSON.stringify({ error: 'Token refresh failed', details: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

/**
 * Get stored access token for patient
 */
async function handleGetStoredToken(patientId: string, supabase: any) {
  if (!patientId) {
    return new Response(
      JSON.stringify({ error: 'Patient ID required' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const { data, error } = await supabase.rpc('get_halaxy_tokens', {
      p_user_id: patientId
    })

    if (error) {
      console.error('Error fetching stored token:', error)
      throw new Error('Failed to fetch authentication data')
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'No authentication found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const tokenData = data[0]
    
    return new Response(
      JSON.stringify({ 
        success: true,
        has_token: true,
        is_expired: tokenData.is_expired,
        expires_at: tokenData.expires_at,
        needs_refresh: tokenData.is_expired
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Get stored token error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to check authentication', details: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}