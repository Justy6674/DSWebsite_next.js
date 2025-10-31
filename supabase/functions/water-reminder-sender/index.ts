import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5';
import webpush from 'npm:web-push@3.6.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY') || Deno.env.get('NEXT_PUBLIC_VAPID_PUBLIC_KEY');
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY');
const VAPID_SUBJECT = Deno.env.get('VAPID_SUBJECT') || 'mailto:admin@downscale.health';

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_SUBJECT!, VAPID_PUBLIC_KEY!, VAPID_PRIVATE_KEY!);
}

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

type UserProfile = {
  id: string;
  email: string;
  metadata: any;
};

function getNowSydney(): { hhmm: string; nowIso: string } {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit', hour12: false });
  const parts = fmt.formatToParts(now);
  const hour = parts.find(p => p.type === 'hour')?.value || '00';
  const minute = parts.find(p => p.type === 'minute')?.value || '00';
  return { hhmm: `${hour}:${minute}`, nowIso: new Date().toISOString() };
}

function isWithinWindow(hhmm: string, wake: string, sleep: string): boolean {
  // Handles ranges that do not cross midnight; if they do, allow full day for MVP
  if (!wake || !sleep) return true;
  if (wake <= sleep) {
    return hhmm >= wake && hhmm <= sleep;
  }
  // If window crosses midnight, allow all (simplify) or implement wrap-around
  return true;
}

function minutesSince(timestampIso?: string): number {
  if (!timestampIso) return Number.POSITIVE_INFINITY;
  const then = Date.parse(timestampIso);
  if (Number.isNaN(then)) return Number.POSITIVE_INFINITY;
  return (Date.now() - then) / 60000;
}

function pickToneMessage(tone: string): string {
  const map: Record<string, string> = {
    encouraging: "💪 You're crushing it! Time for hydration support!",
    funny: "🐫 Even camels drink water... just saying mate!",
    kind: "💙 Gentle reminder to nourish yourself with water",
    crass: "🔥 Oi! Drink some bloody water for fat burning!",
    clinical: "⚕️ Hydration checkpoint: Optimise lipolysis process",
    australian: "🇦🇺 Fair dinkum mate, time for a drink!",
    motivational: "🏆 Champions hydrate - fuel your fat burning!",
    gentle: "🌸 Your body deserves this hydration care",
  };
  return map[tone] || map.encouraging;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      return new Response(JSON.stringify({ error: 'VAPID keys not configured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Optional: allow manual trigger with query ?dryRun=1
    const url = new URL(req.url);
    const dryRun = url.searchParams.get('dryRun') === '1';

    const { data: rows, error } = await supabase
      .from('user_profiles')
      .select('id, email, metadata')
      .not('metadata', 'is', null);

    if (error) throw error;

    const { hhmm, nowIso } = getNowSydney();
    let sentCount = 0;
    let checked = 0;

    for (const row of (rows as UserProfile[])) {
      checked++;
      const meta = row.metadata || {};
      const settings = meta.water_reminders || {};
      const subs: any[] = Array.isArray(meta.push_subscriptions) ? meta.push_subscriptions : [];

      if (!settings.enabled || subs.length === 0) continue;

      const inWindow = isWithinWindow(hhmm, settings.wakeTime || '07:00', settings.sleepTime || '22:00');
      if (!inWindow) continue;

      const lastSent = meta.water_reminders_last_sent as string | undefined;
      const minsSince = minutesSince(lastSent);
      const intervalMins = Math.max(60, (settings.reminderInterval || 2) * 60);

      const matchCustom = Array.isArray(settings.customTimes) && settings.customTimes.includes(hhmm);
      const dueByInterval = minsSince >= intervalMins;

      if (!matchCustom && !dueByInterval) continue;

      const body = pickToneMessage(settings.toneStyle || 'encouraging');
      const payload = JSON.stringify({
        title: 'Water Reminder',
        body,
        icon: '/favicon-32x32.png',
        badge: '/favicon-32x32.png',
        vibrate: settings.vibrate ? [200, 100, 200] : undefined,
        tag: 'water-reminder',
        url: '/portal/water'
      });

      for (const s of subs) {
        try {
          if (!dryRun) {
            await webpush.sendNotification({ endpoint: s.endpoint, keys: s.keys }, payload, { TTL: 300 });
          }
          sentCount++;
        } catch (err: any) {
          const status = err?.statusCode || err?.status || 0;
          if (status === 404 || status === 410) {
            // prune invalid subscription
            const updated = subs.filter((x) => x.endpoint !== s.endpoint);
            const nextMeta = { ...meta, push_subscriptions: updated };
            await supabase.from('user_profiles').update({ metadata: nextMeta as any }).eq('id', row.id);
          } else {
            console.error('Push send error', status, err?.message);
          }
        }
      }

      // Update last sent
      const nextMeta = { ...meta, water_reminders_last_sent: nowIso };
      await supabase.from('user_profiles').update({ metadata: nextMeta as any }).eq('id', row.id);
    }

    return new Response(JSON.stringify({ ok: true, checked, sent: sentCount, now: nowIso, hhmm }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error in water-reminder-sender:', error);
    return new Response(JSON.stringify({ error: error?.message || 'Internal error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});


