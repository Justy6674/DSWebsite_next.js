## Water Reminders – PRD (Downscale Patient Portal)

### Purpose
Help patients maintain optimal hydration to support weight management outcomes by delivering tailored water reminders with Australian spelling, patient‑first language, and configurable tones/themes.

### Goals
- Enable patients to configure hydration reminders (interval, wake/sleep window, custom times, tone, vibrate).
- Persist settings securely under `public.user_profiles.metadata` with RLS.
- Provide immediate local notifications and scaffold web push for background delivery (with service worker).
- Ensure brand design: dark theme, slate backgrounds, brown accents.

### Scope (MVP)
- UI: `SimpleWaterReminders` in `WaterSubDashboardClient`.
- Settings: reminder interval, wake/sleep times, custom times, tone style, vibrate toggle.
- Themed messaging catalogue (encouraging, funny, kind, clinical, Australian, motivational, gentle, crass).
- Persistence: Supabase `user_profiles.metadata.water_reminders`.
- Push readiness: service worker `public/sw.js`, client subscribe/unsubscribe, subscriptions saved to `metadata.push_subscriptions`.
- Local test: in‑page Notification with vibrate fallback via `navigator.vibrate`.

Out of scope (phase 2):
- Scheduled background push delivery via server (requires VAPID keys + CRON/Edge function sender).
- iOS PWA install prompts and end‑to‑end mobile push QA.

### User Stories
- As a patient, I can turn on reminders and choose a tone that suits me.
- As a patient, I can set wake/sleep times and add custom times.
- As a patient, I can enable vibration for subtle prompts.
- As a patient, I can test a reminder immediately.
- As a patient, my preferences persist across sessions and devices.

### UX Requirements
- Mobile‑first; touch targets ≥44px.
- Dark theme (`bg-slate-800` cards, `#b68a71` accents).
- Australian spelling (optimise, personalise, litres).
- Patient‑first language in tones; no white/light cards.

### Data Model
`public.user_profiles.metadata` (JSONB):
- `water_reminders`: `{ enabled, reminderInterval, toneStyle, customTimes[], wakeTime, sleepTime, vibrate }`
- `push_subscriptions`: `[{ endpoint, keys:{p256dh,auth}, created_at, device? }]`

Rationale: Per repo rules, all user data/preferences live in `user_profiles.metadata` (single user table).

### Security & RLS
- Read/write only for `auth.uid() = user_profiles.id`.
- No PHI; preferences only. No third‑party trackers.

### Technical Design
- Component: `src/components/portal/SimpleWaterReminders.tsx`
  - Loads metadata on mount; falls back to localStorage.
  - Saves metadata with Supabase client; localStorage fallback if offline.
  - Test notification uses Web Notifications API; vibrate via Notification options and `navigator.vibrate` fallback.
  - Push subscription: uses `navigator.serviceWorker` and PushManager. Saves subscription in metadata when VAPID public key is configured.

- Service Worker: `public/sw.js`
  - Handles `push` and `notificationclick` events.
  - Shows notification with vibrate pattern; deep‑links to `/portal/water`.

- Registration: `registerServiceWorker()` called from `PortalLayout` once on portal load.

### Configuration
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` (Base64 URL‑safe). Required for actual push subscription.
- Icons: `/favicon-32x32.png` used for push badge/icon.

### Edge Functions (Phase 2 proposal)
- `water-reminder-sender` (scheduled): fetch users due for reminders and send web push using VAPID private key.
- `water-reminders-ai` (on‑demand): generate tone‑appropriate copy with Australian spelling (template‑based or model‑backed).

### Compliance & Content
- Non‑clinical nudges only; no emergency advice.
- Disclaimers: Hydration guidance only; consult GP for medical concerns.

### Acceptance Criteria (MVP)
- Toggle reminders on; save settings; reload: settings persist from Supabase.
- Switch tones; test notification shows tone text.
- Vibrate toggle changes behaviour of test notification and triggers device vibration where supported.
- Service worker registers without error in portal.
- Push buttons: If VAPID key absent, shows clear “not configured” message; if present, subscription is saved to metadata.

### QA Checklist
- Dark theme verified on mobile and desktop.
- Notifications permission flow handled gracefully.
- Supabase RLS respected; updates scoped to current user.
- Lighthouse performance >90 unaffected by SW registration.

### Rollout Plan
1) Deploy code to main.
2) Add `NEXT_PUBLIC_VAPID_PUBLIC_KEY` in Vercel env when ready for push.
3) Phase‑2: Add sender (Edge function + schedule) and VAPID private secret.

### Known Limitations
- Background delivery requires VAPID keys and PWA install on iOS.
- Some browsers ignore `vibrate` in page‑initiated notifications; SW push improves support.


