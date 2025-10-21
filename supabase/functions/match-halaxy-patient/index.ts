import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, email, dateOfBirth } = await req.json();
    
    if (!userId || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get Halaxy credentials
    const clientId = Deno.env.get('HALAXY_CLIENT_ID');
    const clientSecret = Deno.env.get('HALAXY_CLIENT_SECRET');
    
    if (!clientId || !clientSecret) {
      throw new Error('Halaxy credentials not configured');
    }

    // Get an access token for API calls
    const tokenResponse = await fetch('https://au-api.halaxy.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Halaxy access token');
    }

    const { access_token } = await tokenResponse.json();

    // Search for patient by email
    const searchResponse = await fetch(
      `https://au-api.halaxy.com/main/Patient?email=${encodeURIComponent(email)}`,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Accept': 'application/fhir+json',
        },
      }
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to search Halaxy patients');
    }

    const searchResults = await searchResponse.json();
    
    // Check if we found a matching patient
    if (!searchResults.entry || searchResults.entry.length === 0) {
      return new Response(
        JSON.stringify({ 
          matched: false, 
          message: 'No matching patient record found in Halaxy. Please contact the clinic to set up your account.' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const patient = searchResults.entry[0].resource;
    const halaxyPatientId = patient.id;
    
    // Verify DOB if provided
    if (dateOfBirth && patient.birthDate) {
      if (patient.birthDate !== dateOfBirth) {
        return new Response(
          JSON.stringify({ 
            matched: false, 
            message: 'Date of birth does not match our records. Please contact the clinic.' 
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Update user profile with patient_id
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ 
        patient_id: halaxyPatientId,
        date_of_birth: dateOfBirth || patient.birthDate,
      })
      .eq('id', userId);

    if (updateError) {
      throw updateError;
    }

    // Log the successful match
    await supabase.from('audit_logs').insert({
      user_id: userId,
      action: 'patient_matched',
      resource_type: 'halaxy_patient',
      resource_id: halaxyPatientId,
      details: {
        email,
        matched_by: 'email' + (dateOfBirth ? '_and_dob' : ''),
      },
    });

    return new Response(
      JSON.stringify({ 
        matched: true, 
        patientId: halaxyPatientId,
        message: 'Successfully matched to your Halaxy patient record' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Patient matching error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
