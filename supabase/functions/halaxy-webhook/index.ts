/**
 * Halaxy Webhook Receiver
 * Receives real-time updates from Halaxy (appointment.created, appointment.updated, patient.updated)
 * Updates patient_data_cache and triggers real-time refresh
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5'
import { createErrorResponse } from '../_shared/error-utils.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-halaxy-signature',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verify webhook signature
    const signature = req.headers.get('x-halaxy-signature');
    const webhookSecret = Deno.env.get('HALAXY_WEBHOOK_SECRET');
    
    if (webhookSecret && signature) {
      const isValid = await verifyWebhookSignature(req, signature, webhookSecret);
      if (!isValid) {
        console.error('❌ Invalid webhook signature');
        return new Response(
          JSON.stringify({ error: 'Invalid signature' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const payload = await req.json();
    console.log('📨 Halaxy webhook received:', payload.event, payload);

    const { event, data } = payload;

    // Handle different event types
    switch (event) {
      case 'appointment.created':
      case 'appointment.updated':
        await handleAppointmentEvent(data, supabase);
        break;
      
      case 'patient.updated':
        await handlePatientEvent(data, supabase);
        break;
      
      default:
        console.log(`⚠️ Unhandled webhook event: ${event}`);
    }

    // Log webhook receipt
    await supabase
      .from('audit_logs')
      .insert({
        action: 'halaxy_webhook_received',
        resource_type: 'halaxy_webhook',
        resource_id: event,
        details: {
          event,
          data_id: data?.id,
          timestamp: new Date().toISOString()
        }
      });

    return new Response(
      JSON.stringify({ success: true, event, processed: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    return createErrorResponse(error, corsHeaders, 500);
  }
});

/**
 * Verify Halaxy webhook signature
 */
async function verifyWebhookSignature(req: Request, signature: string, secret: string): Promise<boolean> {
  try {
    const body = await req.clone().text();
    const encoder = new TextEncoder();
    const data = encoder.encode(body);
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const signatureBuffer = await crypto.subtle.sign('HMAC', key, data);
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return computedSignature === signature;
  } catch (error) {
    console.error('❌ Signature verification error:', error);
    return false;
  }
}

/**
 * Handle appointment created/updated events
 */
async function handleAppointmentEvent(appointmentData: any, supabase: any) {
  console.log('🗓️ Processing appointment event:', appointmentData);

  const patientId = appointmentData.patient?.reference?.split('/').pop();
  
  if (!patientId) {
    console.error('❌ No patient ID in appointment data');
    return;
  }

  // Invalidate cached appointments for this patient
  await supabase
    .from('patient_data_cache')
    .delete()
    .match({ 
      patient_id: patientId, 
      data_type: 'appointments' 
    });

  console.log(`✅ Invalidated appointment cache for patient ${patientId}`);

  // Optionally: Store the new appointment directly in cache
  const cacheEntry = {
    patient_id: patientId,
    data_type: 'appointments',
    data: { entry: [{ resource: appointmentData }] },
    expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 min TTL
  };

  await supabase
    .from('patient_data_cache')
    .insert(cacheEntry);

  console.log(`✅ Updated appointment cache for patient ${patientId}`);
}

/**
 * Handle patient updated events
 */
async function handlePatientEvent(patientData: any, supabase: any) {
  console.log('👤 Processing patient update event:', patientData);

  const patientId = patientData.id;
  
  if (!patientId) {
    console.error('❌ No patient ID in patient data');
    return;
  }

  // Invalidate all cached data for this patient
  await supabase
    .from('patient_data_cache')
    .delete()
    .match({ patient_id: patientId });

  console.log(`✅ Invalidated all cache for patient ${patientId}`);

  // Update patient profile if they have an account
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('patient_id', patientId)
    .single();

  if (profile) {
    await supabase
      .from('user_profiles')
      .update({
        first_name: patientData.name?.[0]?.given?.[0],
        last_name: patientData.name?.[0]?.family,
        phone: patientData.telecom?.find((t: any) => t.system === 'phone')?.value,
        updated_at: new Date().toISOString()
      })
      .eq('patient_id', patientId);

    console.log(`✅ Updated user profile for patient ${patientId}`);
  }
}
