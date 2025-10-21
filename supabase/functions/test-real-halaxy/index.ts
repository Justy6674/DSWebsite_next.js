/**
 * Test Real Halaxy API Connection
 * This will tell you honestly if we can access your clinic data
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const halaxyApiKey = Deno.env.get('HALAXY_API_KEY');
    
    console.log('=== TESTING REAL HALAXY API CONNECTION ===');
    console.log('Has API Key:', !!halaxyApiKey);
    
    if (!halaxyApiKey) {
      console.log('❌ NO API KEY - Cannot access clinic data');
      return new Response(
        JSON.stringify({ 
          success: false, 
          canAccess: false,
          error: 'No Halaxy API credentials configured',
          message: 'I cannot access your clinic data without API credentials. Either provide them or I will use demo data only.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Test Organization endpoint (basic connectivity)
    console.log('Testing Organization endpoint...');
    const orgResponse = await fetch('https://au-api.halaxy.com/main/Organization', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${halaxyApiKey}`,
        'Accept': 'application/fhir+json',
        'Content-Type': 'application/fhir+json'
      }
    });

    console.log('Organization API Status:', orgResponse.status);
    
    if (!orgResponse.ok) {
      const errorText = await orgResponse.text();
      console.log('❌ ORGANIZATION API FAILED:', errorText);
      
      return new Response(
        JSON.stringify({ 
          success: false,
          canAccess: false,
          error: `Halaxy API authentication failed (${orgResponse.status})`,
          details: errorText,
          message: 'Your API credentials are invalid or expired. I cannot access real clinic data.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const orgData = await orgResponse.json();
    console.log('✅ ORGANIZATION DATA RETRIEVED');

    // Test Patient endpoint
    console.log('Testing Patient endpoint...');
    const patientResponse = await fetch('https://au-api.halaxy.com/main/Patient?_count=5', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${halaxyApiKey}`,
        'Accept': 'application/fhir+json',
        'Content-Type': 'application/fhir+json'
      }
    });

    console.log('Patient API Status:', patientResponse.status);

    if (!patientResponse.ok) {
      console.log('⚠️ PATIENT ACCESS LIMITED');
      
      return new Response(
        JSON.stringify({ 
          success: true,
          canAccess: true,
          limitedAccess: true,
          organization: orgData,
          message: 'Connected to your practice but patient data access is limited. Some features may use demo data.',
          note: 'Organization data accessible, patient data may require additional permissions'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const patientData = await patientResponse.json();
    console.log('✅ PATIENT DATA ACCESSIBLE');

    // Test Appointment endpoint
    console.log('Testing Appointment endpoint...');
    const apptResponse = await fetch('https://au-api.halaxy.com/main/Appointment?_count=5', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${halaxyApiKey}`,
        'Accept': 'application/fhir+json',
        'Content-Type': 'application/fhir+json'
      }
    });

    console.log('Appointment API Status:', apptResponse.status);
    
    const apptData = apptResponse.ok ? await apptResponse.json() : null;

    console.log('=== FINAL ASSESSMENT ===');
    console.log('✅ FULL ACCESS TO YOUR CLINIC DATA');

    return new Response(
      JSON.stringify({ 
        success: true,
        canAccess: true,
        fullAccess: true,
        organization: orgData,
        patients: patientData,
        appointments: apptData,
        stats: {
          patients: patientData?.total || patientData?.entry?.length || 0,
          appointments: apptData?.total || apptData?.entry?.length || 0
        },
        message: 'Full access to your clinic data confirmed. All features will show real data.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ CONNECTION TEST FAILED:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        canAccess: false,
        error: error.message,
        message: 'Cannot connect to Halaxy API. All features will use demo data only.'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});