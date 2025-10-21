import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const evermedApiKey = Deno.env.get('EVERMED_API_KEY');
    const evermedBaseUrl = Deno.env.get('EVERMED_BASE_URL') || 'https://api.evermed.com.au';
    
    if (!evermedApiKey) {
      console.log('Evermed API key not configured - using stub response');
      return new Response(JSON.stringify({ 
        success: true,
        data: [],
        message: 'Evermed API key not configured. Please add EVERMED_API_KEY to your Supabase secrets.',
        isStub: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { action, patientId, prescriptionData } = await req.json();

    let response;
    let result;

    switch (action) {
      case 'getPrescriptions':
        response = await fetch(`${evermedBaseUrl}/prescriptions?patient_id=${patientId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${evermedApiKey}`,
            'Content-Type': 'application/json',
          },
        });
        result = await response.json();
        break;

      case 'createPrescription':
        response = await fetch(`${evermedBaseUrl}/prescriptions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${evermedApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prescriptionData),
        });
        result = await response.json();
        break;

      case 'getPrescriptionHistory':
        response = await fetch(`${evermedBaseUrl}/prescriptions/history?patient_id=${patientId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${evermedApiKey}`,
            'Content-Type': 'application/json',
          },
        });
        result = await response.json();
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    if (!response.ok) {
      throw new Error(`Evermed API error: ${response.status} ${response.statusText}`);
    }

    return new Response(JSON.stringify({ 
      success: true,
      data: result,
      message: 'Connected to Evermed API successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Evermed API request failed:', error);
    
    // Return graceful fallback for development
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message,
      data: [],
      message: 'Evermed service temporarily unavailable. This is a development stub.',
      isStub: true
    }), {
      status: 200, // Return 200 to prevent frontend errors during development
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});