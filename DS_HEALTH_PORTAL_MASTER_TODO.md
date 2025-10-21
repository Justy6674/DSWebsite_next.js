# DS.H HEALTHCARE PORTAL - MASTER TODO
**Last Updated**: 2025-10-20  
**Database**: pooebqhsshfafkhvccrl.supabase.co  
**Status**: 30% Complete - BLOCKED ON SECURITY FIXES  
**Single Source of Truth**: All Halaxy Integration details consolidated here

---

## 🚨 PHASE 0: CRITICAL SECURITY BLOCKERS (MUST FIX FIRST - 7.5 hours)

### ❌ BLOCKER #1: ROLE ARCHITECTURE VULNERABILITY (2 hours)
**Status**: CRITICAL SECURITY RISK  
**Current State**: Roles stored in `user_profiles.role TEXT` column  
**Risk**: Privilege escalation - any UPDATE to `user_profiles` could change `role='patient'` → `role='admin'`  

**Required Fix**:
1. Create `app_role` enum: `'admin' | 'practitioner' | 'patient'`
2. Create separate `user_roles` table with `(user_id, role)` unique constraint
3. Create `has_role(_user_id uuid, _role app_role)` SECURITY DEFINER function
4. Update ALL RLS policies to use `has_role(auth.uid(), 'admin')` instead of `get_user_role(auth.uid()) = 'admin'`
5. Migrate existing `user_profiles.role` data to `user_roles` table
6. Remove `role` column from `user_profiles` table

**Files to Change**:
- New migration: `create_user_roles_table.sql`
- Update: All RLS policies using `get_user_role()`
- Update: Admin panel queries checking role

**Testing**:
- Create test patient account
- Verify patient cannot UPDATE their own `user_roles` record to 'admin'
- Verify admin can still access admin panel

**Go/No-Go**: ❌ Cannot launch without this fix

---

### ❌ BLOCKER #2: NO MULTI-FACTOR AUTHENTICATION (3 hours)
**Status**: CRITICAL COMPLIANCE RISK  
**Current State**: `input-otp` package installed but **NEVER USED**  
**Risk**: Healthcare data access without MFA violates Australian Privacy Principles  

**Required Fix**:

**Step 1: Add MFA Enrollment to Signup** (1.5 hours)
```typescript
// In AuthPage.tsx after successful signup
const enrollMFA = async () => {
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
    friendlyName: 'DS.H Portal MFA'
  });
  
  if (error) {
    toast({ title: "MFA setup failed", variant: "destructive" });
    return;
  }
  
  // Show QR code to user
  setQrCode(data.totp.qr_code);
  setMfaSecret(data.totp.secret);
};
```

**Step 2: Add MFA Verification** (1 hour)
```typescript
// After user scans QR and enters code
const verifyMFA = async (code: string) => {
  const { data, error } = await supabase.auth.mfa.challenge({
    factorId: mfaFactorId
  });
  
  const { data: verified, error: verifyError } = await supabase.auth.mfa.verify({
    factorId: mfaFactorId,
    challengeId: data.id,
    code: code
  });
  
  if (verified) {
    // Update user_profiles.mfa_enabled_at
    await supabase.from('user_profiles')
      .update({ mfa_enabled_at: new Date().toISOString() })
      .eq('id', user.id);
  }
};
```

**Step 3: Enforce MFA on Login** (0.5 hours)
```typescript
// In AuthContext.tsx onAuthStateChange
if (session?.user && !session.user.mfa_enabled) {
  navigate('/setup-mfa');
  return;
}
```

**Files to Create**:
- `src/pages/SetupMFA.tsx` - MFA enrollment wizard
- `src/components/auth/MFAVerification.tsx` - Code entry component

**Files to Update**:
- `src/pages/AuthPage.tsx` - Add MFA enrollment after signup
- `src/contexts/AuthContext.tsx` - Check MFA status on login
- Migration: `ALTER TABLE user_profiles ADD COLUMN mfa_enabled_at TIMESTAMPTZ;`

**Testing**:
- Signup new user → forced to set up MFA
- Login without MFA → redirected to setup
- Login with MFA → verify code required

**Go/No-Go**: ❌ Cannot launch without this fix

---

### ⚠️ BLOCKER #3: NO CONSENT FLOW (2 hours)
**Status**: LEGAL COMPLIANCE RISK  
**Current State**: Privacy policy exists but no explicit consent capture  
**Risk**: Cannot legally connect to Halaxy without documented patient consent  

**Required Fix**:

**Step 1: Create Consent Page** (1 hour)
```typescript
// src/pages/ConsentPage.tsx
export default function ConsentPage() {
  const [consents, setConsents] = useState({
    halaxyAccess: false,
    dataEncryption: false,
    practitionerView: false
  });
  
  const handleSubmit = async () => {
    if (!allConsentsGiven) {
      toast({ title: "All consents required", variant: "destructive" });
      return;
    }
    
    await supabase.from('user_profiles')
      .update({ consent_given_at: new Date().toISOString() })
      .eq('id', user.id);
      
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'consent_granted',
      resource_type: 'patient_consent',
      details: { consents }
    });
    
    navigate('/portal');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Sharing Consent</CardTitle>
        <CardDescription>
          We need your permission to access your healthcare records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Checkbox checked={consents.halaxyAccess} />
          <Label>I consent to Downscale accessing my Halaxy medical records</Label>
          
          <Checkbox checked={consents.dataEncryption} />
          <Label>I understand my data is encrypted and access-logged</Label>
          
          <Checkbox checked={consents.practitionerView} />
          <Label>I consent to my practitioner viewing my health tracking data</Label>
        </div>
        
        <Button onClick={handleSubmit} disabled={!allConsentsGiven}>
          I Agree - Continue to Portal
        </Button>
      </CardContent>
    </Card>
  );
}
```

**Step 2: Update Routes** (0.5 hours)
```typescript
// In App.tsx
<Route path="/consent" element={
  <ProtectedRoute>
    <ConsentPage />
  </ProtectedRoute>
} />
```

**Step 3: Block Portal Access Until Consent** (0.5 hours)
```typescript
// In AuthContext.tsx or ProtectedRoute component
useEffect(() => {
  if (user && !profile?.consent_given_at) {
    navigate('/consent');
  }
}, [user, profile]);
```

**Files to Create**:
- `src/pages/ConsentPage.tsx`

**Files to Update**:
- `src/App.tsx` - Add `/consent` route
- `src/components/ProtectedRoute.tsx` - Check consent status
- Migration: `ALTER TABLE user_profiles ADD COLUMN consent_given_at TIMESTAMPTZ;`

**Testing**:
- New signup → redirected to consent page
- Reject consent → cannot access portal
- Accept consent → logged in `audit_logs`

**Go/No-Go**: ⚠️ High legal risk without this

---

### ⚠️ BLOCKER #4: HALAXY WEBHOOK SECRET NOT CONFIGURED (30 min)
**Status**: OPERATIONAL RISK  
**Current State**: `halaxy-webhook` edge function exists but webhook signature verification will fail  
**Risk**: Cannot receive real-time Halaxy updates, data will be stale  

**Required Fix**:

**Step 1: Add Secret to Supabase**
1. Navigate to Supabase Dashboard → Settings → Edge Functions → Secrets
2. Add `HALAXY_WEBHOOK_SECRET` with value from Halaxy

**Step 2: Configure Webhooks in Halaxy**
1. Log into Halaxy → Settings → Integrations → Webhooks
2. Add 3 webhooks all pointing to: `https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/halaxy-webhook`
   - Event: `appointment.created`
   - Event: `appointment.updated`
   - Event: `patient.updated`
3. Copy webhook secret and paste into Supabase secrets

**Step 3: Test Webhook**
1. Create test appointment in Halaxy
2. Check edge function logs: `https://supabase.com/dashboard/project/pooebqhsshfafkhvccrl/functions/halaxy-webhook/logs`
3. Verify `audit_logs` table has `halaxy_webhook_received` entry

**Testing**:
- Create appointment in Halaxy → verify webhook received
- Check `patient_data_cache` invalidated for patient
- Verify new appointment appears in portal

**Go/No-Go**: ⚠️ Can launch but data will be 5-min stale without webhooks

---

## ✅ WHAT'S ACTUALLY BUILT & WORKING (30% COMPLETE)

### Backend Infrastructure ✅ COMPLETE
- [x] **Halaxy Edge Functions** (5 functions):
  - `halaxy-auth` - OAuth2 flow with token refresh
  - `halaxy-api` - Secure API proxy with caching
  - `halaxy-webhook` - Real-time webhook receiver (needs secret configured)
  - `match-halaxy-patient` - Automatic patient matching
  - `test-real-halaxy` - Connection testing

- [x] **Database Schema** (11 tables):
  - `halaxy_links` - Patient OAuth tokens (encrypted)
  - `patient_data_cache` - Cached Halaxy responses (5-min TTL)
  - `user_profiles` - Extended user data (⚠️ has vulnerable `role` column)
  - `subscriptions` - Tier management
  - `quick_script_requests` - Prescription request queue
  - `clinical_tasks` - Internal task management
  - `practitioner_panels` - Patient-practitioner relationships
  - `documents_index` - Document metadata
  - `tracking_daily` - Weight/measurement logs
  - `audit_logs` - Audit trail
  - `portal_sessions` - Session tracking

- [x] **Security Functions** (6 functions):
  - `encrypt_token(text)` - AES encryption for tokens
  - `decrypt_token(text)` - Token decryption
  - `get_user_role(uuid)` - Role retrieval (⚠️ insecure implementation)
  - `get_user_subscription_tier(uuid)` - Tier checking
  - `has_active_subscription(uuid, tier)` - Subscription validation
  - `is_admin()` - Admin check (hardcoded to `admin@downscale.com.au`)

- [x] **RLS Policies**: All tables have RLS enabled with user-scoped access

### Authentication & Signup ✅ MOSTLY COMPLETE
- [x] **Signup Form** (`AuthPage.tsx`):
  - Email, password, first name, last name ✅
  - **Date of Birth field** ✅ (ADDED)
  - Email verification via Supabase Auth
  - Automatic redirect to `/portal` after login

- [x] **Automatic Patient Matching**:
  - `match-halaxy-patient` edge function searches Halaxy by email
  - Verifies DOB if provided
  - Updates `user_profiles.patient_id` on match
  - Logs match event in `audit_logs`
  - Runs automatically via `AuthContext` after signup

- [x] **AuthContext** (`src/contexts/AuthContext.tsx`):
  - Stores both `user` and `session` objects
  - `onAuthStateChange` listener with `setTimeout()` to prevent deadlock
  - Automatic patient matching on first sign-in

- [ ] ❌ **MFA Enrollment**: Not implemented (CRITICAL BLOCKER)

### Portal Dashboard ✅ COMPLETE
- [x] **Main Dashboard** (`/portal`):
  - 21 feature icons in responsive grid
  - Subscription tier-based access control
  - Dynamic sidebar with upgrade prompts
  - Mobile-first design

- [x] **Subscription Gating**:
  - `SubscriptionGate` component wraps premium features
  - `useSubscription` hook checks tier
  - Visual indicators for locked features

- [x] **Core Portal Pages**:
  - `/portal/appointments` - Halaxy appointments (needs OAuth connection)
  - `/portal/invoices` - Halaxy invoices (needs OAuth connection)
  - `/portal/prescriptions` - Prescription requests
  - `/portal/claims` - Medicare claims
  - `/portal/referrals` - Specialist referrals
  - `/portal/payments` - Payment history
  - `/portal/practitioners` - Care team
  - `/portal/shop` - Embedded downscale.shop iframe

- [ ] ⚠️ **Stub Pages** (layout exists, need full implementation):
  - `/portal/documents` - Document upload/viewing
  - `/portal/quick-scripts` - Script request forms
  - `/portal/tracking` - Weight charts
  - `/portal/resources` - Resource library
  - `/portal/family` - Family management
  - `/portal/account` - Account settings

### Halaxy Integration ✅ BACKEND COMPLETE, ⚠️ NEEDS OAUTH UI
- [x] **Backend**: Edge functions handle OAuth2 flow
- [x] **Frontend Hook**: `useHalaxyData.ts` fetches patient data
- [x] **Data Caching**: 5-minute TTL in `patient_data_cache`
- [x] **Token Management**: Auto-refresh expired tokens

- [ ] ⚠️ **Missing Frontend Components**:
  - `HalaxyAuthCard` component exists but not displayed on dashboard
  - "Connect to Halaxy" button flow not wired up
  - OAuth callback handling not implemented in UI
  - Connection status display missing

---

## 📋 PHASE 1: SIMPLE CONTENT PORTAL (3-4 weeks / ~18-23 days)

**Goal**: Build a simple CMS where you and Bec can upload PDFs, embed videos, and link to external resources (podcasts, articles, recipes). Each of the 8 pillars displays these resources in an organized way. **No tracking, no gamification, no complex features.**

**What Users Get**: Educational content library organized by health pillar - downloadable PDFs, embedded videos, external links to podcasts/articles/recipes.

---

### 1.1 DATABASE & STORAGE FOUNDATION (2-3 days)

**Create `portal_resources` Table**:
```sql
CREATE TABLE portal_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  pillar TEXT NOT NULL, -- 'medication', 'nutrition', 'activity', 'mental-health', 'sleep', 'shop'
  category TEXT NOT NULL, -- 'video', 'pdf', 'link', 'podcast', 'recipe', 'workout'
  type TEXT NOT NULL, -- 'file', 'url'
  file_path TEXT, -- For PDFs in storage
  url TEXT, -- For YouTube, external links, podcasts
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE portal_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published resources"
  ON portal_resources FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage resources"
  ON portal_resources FOR ALL
  USING (get_user_role(auth.uid()) = 'admin');
```

**Create Storage Bucket**:
```sql
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portal-resources', 'portal-resources', true);

-- RLS for storage
CREATE POLICY "Public can view portal resources"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portal-resources');

CREATE POLICY "Admins can upload portal resources"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'portal-resources' 
    AND get_user_role(auth.uid()) = 'admin'
  );
```

**Files to Create**:
- New migration: `create_portal_resources.sql`
- New migration: `create_portal_resources_bucket.sql`

**Deliverables**:
- ✅ `portal_resources` table with RLS
- ✅ `portal-resources` storage bucket with RLS
- ✅ Types regenerated in `src/integrations/supabase/types.ts`

---

### 1.2 ADMIN CMS FOR RESOURCE MANAGEMENT (3-4 days)

**Admin Resources List Page**:
**File**: `src/pages/admin/resources/index.tsx`

**Features**:
- Table listing all resources (title, pillar, category, type, published)
- Filter dropdown by pillar (medication/nutrition/activity/etc.)
- Search by title
- Edit/Delete buttons
- "Add New Resource" button → navigates to form

**Add/Edit Resource Form**:
**File**: `src/pages/admin/resources/form.tsx`

**Form Fields**:
- Title (text input, required)
- Description (textarea, optional)
- Pillar (dropdown: medication, nutrition, activity, mental-health, sleep, shop)
- Category (dropdown: video, pdf, link, podcast, recipe, workout)
- Type (radio: "Upload File" OR "Paste URL")
- File Upload (if type = file) → uploads to `portal-resources` bucket
- URL Input (if type = url) → validates URL format
- Published (toggle, default true)
- Sort Order (number input, default 0)

**Validation**:
- If type = file, require file upload (PDF only)
- If type = url, require valid URL
- If category = video, validate YouTube URL format (youtube.com or youtu.be)

**Actions**:
- Save → Insert/update `portal_resources` table
- Upload → Store in `portal-resources` bucket, save path to DB
- Cancel → Navigate back to list

**Files to Create**:
- `src/pages/admin/resources/index.tsx` - List view
- `src/pages/admin/resources/form.tsx` - Add/edit form
- `src/hooks/usePortalResources.ts` - Data fetching hook
- `src/components/admin/ResourceCard.tsx` - Display resource in list

**Files to Update**:
- `src/App.tsx` - Add routes for `/admin/resources` and `/admin/resources/new`, `/admin/resources/edit/:id`
- `src/pages/admin/index.tsx` - Add link to Resources management

**Deliverables**:
- ✅ Admin can view all resources in table
- ✅ Admin can add new resources (upload PDF or paste URL)
- ✅ Admin can edit existing resources
- ✅ Admin can delete resources
- ✅ Admin can publish/unpublish resources
- ✅ File uploads work and store in bucket
- ✅ URLs validate before saving

---

### 1.3 MEDICATION PILLAR CONTENT PAGES (2-3 days)

**Expand Medication Dashboard**:
**File**: `src/pages/portal/pillars/medication-dashboard.tsx`

**New Tiles to Add**:
- 📹 Educational Videos
- 📄 Product Information (Mounjaro, Wegovy)
- 🔬 Research Articles
- 📋 Side Effects Guide
- 📊 Medication Comparison

**Create Resource Display Pages**:

**File**: `src/pages/portal/medication/videos.tsx`
- Fetch `portal_resources` WHERE `pillar='medication'` AND `category='video'`
- Embed YouTube videos using iframe
- Display title and description
- Responsive grid layout

**File**: `src/pages/portal/medication/product-info.tsx`
- Fetch `portal_resources` WHERE `pillar='medication'` AND `category='pdf'`
- Display downloadable PDFs with title, description
- Download button for each PDF

**File**: `src/pages/portal/medication/research.tsx`
- Fetch `portal_resources` WHERE `pillar='medication'` AND `category='link'`
- Display external links to research articles (PubMed, etc.)
- Open in new tab

**File**: `src/pages/portal/medication/side-effects.tsx`
- Fetch side effect guides (PDFs)
- Display downloadable guides

**File**: `src/pages/portal/medication/comparison.tsx`
- Fetch comparison charts (PDFs or static content)
- Display Mounjaro vs Wegovy comparison

**Files to Create**:
- `src/pages/portal/medication/videos.tsx`
- `src/pages/portal/medication/product-info.tsx`
- `src/pages/portal/medication/research.tsx`
- `src/pages/portal/medication/side-effects.tsx`
- `src/pages/portal/medication/comparison.tsx`
- `src/components/portal/ResourceList.tsx` - Reusable component for displaying resources

**Files to Update**:
- `src/pages/portal/pillars/medication-dashboard.tsx` - Add new tiles linking to pages
- `src/App.tsx` - Add routes for medication subpages

**Deliverables**:
- ✅ Medication dashboard shows 5 new tiles
- ✅ Each tile links to resource page
- ✅ Videos embed and play
- ✅ PDFs download correctly
- ✅ External links open in new tab

**Content Population** (You/Bec do this manually):
- [ ] Upload Mounjaro product info PDF
- [ ] Upload Wegovy product info PDF
- [ ] Add YouTube video: "How to use Mounjaro pen"
- [ ] Add YouTube video: "How to use Wegovy pen"
- [ ] Add PubMed links to GLP-1 research (3-5 articles)
- [ ] Upload side effect management guide PDF
- [ ] Upload medication comparison chart PDF

---

### 1.4 NUTRITION PILLAR CONTENT PAGES (2-3 days)

**Expand Nutrition Dashboard**:
**File**: `src/pages/portal/pillars/nutrition-dashboard.tsx`

**New Tiles**:
- 📋 Meal Plans
- 🍳 Recipe Library
- 🧮 Macro Calculator (simple form)
- 🎙️ Podcasts
- 📚 Educational Content
- 🌍 Real-World Eating Guides

**Create Pages**:

**File**: `src/pages/portal/nutrition/meal-plans.tsx`
- Display downloadable meal plan PDFs
- Filter by lifestyle (busy parent, shift worker, etc.)

**File**: `src/pages/portal/nutrition/recipes.tsx`
- Display links to external recipe sites
- Australian-focused recipes

**File**: `src/pages/portal/nutrition/macro-calculator.tsx`
- Simple form: weight (kg), activity level, goal
- Calculate protein/carbs/fats targets
- Display results with option to download PDF

**Macro Calculator Logic**:
```typescript
const calculateMacros = (weight: number, activityLevel: string, goal: string) => {
  const activityMultiplier = {
    sedentary: 24,
    moderate: 28,
    active: 32
  };
  
  const goalAdjustment = {
    lose: -500,
    maintain: 0,
    gain: 300
  };
  
  const baseCalories = weight * activityMultiplier[activityLevel];
  const calories = baseCalories + goalAdjustment[goal];
  
  return {
    protein: weight * 2.0, // 2g per kg bodyweight
    carbs: Math.round((calories * 0.4) / 4),
    fats: Math.round((calories * 0.3) / 9),
    totalCalories: calories
  };
};
```

**File**: `src/pages/portal/nutrition/podcasts.tsx`
- Display podcast episode links
- Huberman, Attia, etc.

**File**: `src/pages/portal/nutrition/education.tsx`
- Videos and articles about nutrition

**File**: `src/pages/portal/nutrition/real-world.tsx`
- Practical eating guides (eating out, busy schedules, etc.)

**Files to Create**:
- `src/pages/portal/nutrition/meal-plans.tsx`
- `src/pages/portal/nutrition/recipes.tsx`
- `src/pages/portal/nutrition/macro-calculator.tsx`
- `src/pages/portal/nutrition/podcasts.tsx`
- `src/pages/portal/nutrition/education.tsx`
- `src/pages/portal/nutrition/real-world.tsx`

**Files to Update**:
- `src/pages/portal/pillars/nutrition-dashboard.tsx`
- `src/App.tsx` - Add routes

**Deliverables**:
- ✅ Nutrition dashboard shows 6 new tiles
- ✅ Macro calculator works and displays results
- ✅ Resource pages display content

**Content Population**:
- [ ] Upload 3 meal plan PDFs (breakfast/lunch/dinner templates)
- [ ] Add links to 5-10 Australian recipe sites
- [ ] Add 5 podcast episode links (Huberman, Attia, etc.)
- [ ] Upload "eating out" guide PDF
- [ ] Upload "reading nutrition labels" guide PDF

---

### 1.5 ACTIVITY PILLAR CONTENT PAGES (2 days)

**Expand Activity Dashboard**:
**File**: `src/pages/portal/pillars/activity-dashboard.tsx`

**New Tiles**:
- 🏋️ Workout Programs
- 🎥 Exercise Videos
- 📖 Movement Guides
- 🎙️ Podcasts

**Create Pages**:

**File**: `src/pages/portal/activity/programs.tsx`
- Display downloadable workout PDFs
- Resistance band programs, home workouts

**File**: `src/pages/portal/activity/videos.tsx`
- Embed exercise demonstration videos
- 5-min desk exercises, etc.

**File**: `src/pages/portal/activity/guides.tsx`
- No-gym movement guides
- Walking programs, bodyweight exercises

**File**: `src/pages/portal/activity/podcasts.tsx`
- Podcast episode links about movement

**Files to Create**:
- `src/pages/portal/activity/programs.tsx`
- `src/pages/portal/activity/videos.tsx`
- `src/pages/portal/activity/guides.tsx`
- `src/pages/portal/activity/podcasts.tsx`

**Files to Update**:
- `src/pages/portal/pillars/activity-dashboard.tsx`
- `src/App.tsx` - Add routes

**Content Population**:
- [ ] Upload resistance band workout PDF
- [ ] Upload "5-minute desk exercises" PDF
- [ ] Add YouTube links to 5-10 exercise demos
- [ ] Add 3 podcast episode links about movement

---

### 1.6 MENTAL HEALTH PILLAR CONTENT PAGES (2 days)

**Expand Mental Health Dashboard**:
**File**: `src/pages/portal/pillars/mental-health-dashboard.tsx`

**New Tiles**:
- 🧘 Stress Management
- 🍽️ Emotional Eating
- 🧠 CBT Worksheets
- 📱 Mindfulness Apps

**Create Pages**:

**File**: `src/pages/portal/mental-health/stress.tsx`
- Stress management guides (PDFs)
- Relaxation techniques

**File**: `src/pages/portal/mental-health/emotional-eating.tsx`
- Emotional eating guides
- Behavior change resources

**File**: `src/pages/portal/mental-health/cbt.tsx`
- Downloadable CBT worksheets
- Identity-based change tools

**File**: `src/pages/portal/mental-health/mindfulness.tsx`
- Links to meditation apps (Headspace, Calm, Insight Timer)
- Mindfulness videos

**Files to Create**:
- `src/pages/portal/mental-health/stress.tsx`
- `src/pages/portal/mental-health/emotional-eating.tsx`
- `src/pages/portal/mental-health/cbt.tsx`
- `src/pages/portal/mental-health/mindfulness.tsx`

**Files to Update**:
- `src/pages/portal/pillars/mental-health-dashboard.tsx`
- `src/App.tsx` - Add routes

**Content Population**:
- [ ] Upload 3 CBT worksheet PDFs
- [ ] Upload emotional eating guide PDF
- [ ] Add links to Headspace, Calm, Insight Timer
- [ ] Upload identity-based change worksheet PDF

---

### 1.7 SLEEP PILLAR CONTENT PAGES (1-2 days)

**Expand Sleep Dashboard**:
**File**: `src/pages/portal/pillars/sleep-dashboard.tsx`

**New Tiles**:
- 🛏️ Sleep Hygiene
- 📚 Educational Content
- 🎧 Relaxation Resources
- 🔬 Research

**Create Pages**:

**File**: `src/pages/portal/sleep/hygiene.tsx`
- Sleep hygiene guide PDFs
- Parent-specific strategies

**File**: `src/pages/portal/sleep/education.tsx`
- Educational videos about sleep
- Research articles

**File**: `src/pages/portal/sleep/relaxation.tsx`
- Relaxation video links
- Meditation resources

**File**: `src/pages/portal/sleep/research.tsx`
- Research articles about sleep + metabolism

**Files to Create**:
- `src/pages/portal/sleep/hygiene.tsx`
- `src/pages/portal/sleep/education.tsx`
- `src/pages/portal/sleep/relaxation.tsx`
- `src/pages/portal/sleep/research.tsx`

**Files to Update**:
- `src/pages/portal/pillars/sleep-dashboard.tsx`
- `src/App.tsx` - Add routes

**Content Population**:
- [ ] Upload sleep hygiene guide PDF
- [ ] Upload "busy parent sleep strategies" PDF
- [ ] Add YouTube links to 3-5 relaxation videos
- [ ] Add 2-3 research article links

---

### 1.8 SHOP PILLAR STATIC PAGES (1 day)

**Create Shop Pages**:

**File**: `src/pages/portal/shop/supplements.tsx`
- Recommended supplements with Amazon affiliate links
- Product descriptions

**File**: `src/pages/portal/shop/devices.tsx`
- Recommended devices (scales, resistance bands, etc.)
- Amazon links

**File**: `src/pages/portal/shop/guides.tsx`
- "What you actually need" buying guides (PDFs)
- Product recommendations

**File**: `src/pages/portal/shop/compounding.tsx`
- Bec's compounding pharmacy contact details
- Services offered
- How to order

**Files to Create**:
- `src/pages/portal/shop/supplements.tsx`
- `src/pages/portal/shop/devices.tsx`
- `src/pages/portal/shop/guides.tsx`
- `src/pages/portal/shop/compounding.tsx`

**Files to Update**:
- `src/pages/portal/pillars/shop-dashboard.tsx` (if exists, or create)
- `src/App.tsx` - Add routes

**Content Population**:
- [ ] Add Amazon affiliate links for supplements
- [ ] Add Amazon affiliate links for devices
- [ ] Upload product guide PDFs
- [ ] Add Bec's compounding pharmacy contact details

---

### 1.9 BILLING & APPOINTMENTS DASHBOARDS - HALAXY INTEGRATION (1 day)

**Verify Existing Implementation**:

**File**: `src/pages/portal/pillars/billing-dashboard.tsx`
- Should already use `useHalaxyData` hook
- Display: invoices, payments, claims, fee schedule
- Verify data displays correctly

**File**: `src/pages/portal/pillars/appointments-dashboard.tsx`
- Should already use `useHalaxyData` hook
- Display: upcoming appointments, past appointments, practitioners
- Verify data displays correctly

**Tasks**:
- [ ] Test Halaxy integration with real patient account
- [ ] Verify invoices display correctly
- [ ] Verify appointments display correctly
- [ ] Add HalaxyAuthCard to main portal dashboard (if not already present)
- [ ] Test OAuth connection flow

**No new files needed** - these should already be built.

---

### 1.10 OPTIONAL: APPOINTMENT BOOKING WRITE OPERATIONS (2-3 days)

**Create Edge Functions**:

**File**: `supabase/functions/halaxy-create-appointment/index.ts`
**Purpose**: Create new appointment in Halaxy
**Accepts**: `{ patient_id, practitioner_id, appointment_type_id, start_time, duration }`
**Returns**: `{ appointment_id, confirmation }`

**File**: `supabase/functions/halaxy-update-appointment/index.ts`
**Purpose**: Update/reschedule existing appointment
**Accepts**: `{ appointment_id, new_start_time }`
**Returns**: `{ updated_appointment }`

**Update Appointments Page**:

**File**: `src/pages/portal/appointments.tsx`
**Add Booking UI**:
- Date/time picker
- Practitioner dropdown (from `useHalaxyData.practitioners`)
- Appointment type dropdown (from `useHalaxyData.appointmentTypes`)
- Confirmation flow

**Add Reschedule Button**:
- "Reschedule" button on each upcoming appointment
- Date/time picker modal
- Calls `halaxy-update-appointment` edge function

**Files to Create**:
- `supabase/functions/halaxy-create-appointment/index.ts`
- `supabase/functions/halaxy-update-appointment/index.ts`
- `src/components/portal/AppointmentBookingForm.tsx`

**Files to Update**:
- `src/pages/portal/appointments.tsx` - Add booking UI

**Deliverables**:
- ✅ Patients can book new appointments from portal
- ✅ Patients can reschedule existing appointments
- ✅ Confirmation displayed after booking
- ✅ Edge functions call Halaxy API correctly

---

## TIMELINE ESTIMATE

| Phase | Task | Days |
|-------|------|------|
| 1.1 | Database & Storage | 2-3 |
| 1.2 | Admin CMS | 3-4 |
| 1.3 | Medication Pillar | 2-3 |
| 1.4 | Nutrition Pillar | 2-3 |
| 1.5 | Activity Pillar | 2 |
| 1.6 | Mental Health Pillar | 2 |
| 1.7 | Sleep Pillar | 1-2 |
| 1.8 | Shop Pillar | 1 |
| 1.9 | Billing/Appointments (verify) | 1 |
| 1.10 | Appointment Booking (optional) | 2-3 |
| **TOTAL** | **18-23 days (~3-4 weeks)** | |

---

## SUCCESS CRITERIA FOR PHASE 1

✅ **Admin CMS**:
- Admin can upload PDFs to storage bucket
- Admin can add external links (YouTube, podcasts, recipes)
- Admin can organize resources by pillar and category
- Admin can publish/unpublish resources

✅ **Portal Content Pages**:
- Each pillar has dedicated resource pages
- PDFs download correctly
- YouTube videos embed and play
- External links open in new tabs
- Mobile-responsive design

✅ **Halaxy Integration** (Billing & Appointments):
- Real invoice data displays
- Real appointment data displays
- OAuth connection works
- Data refreshes correctly

✅ **Content Population**:
- You/Bec have populated each pillar with initial content
- At least 3-5 resources per pillar
- All content displays correctly

❌ **NOT IN SCOPE**:
- User progress tracking
- Engagement analytics
- Complex calculators with saved data
- Wearable integrations
- AI chat features
- E-commerce functionality

**Implementation**:
- Create basic tile structure
- Add "Coming Soon" tiles
- No Halaxy data integration (these are self-tracking pillars)
- Use local storage or new tables for patient-entered data

---

### 1.7 Complete Document Management (1 hour)
**Files**:
- `src/pages/portal/documents.tsx` - Add file upload and PDF viewer

**Features**:
- List documents from `documents_index` table
- Fetch documents from Halaxy via `useHalaxyData.documents`
- Display document type, date, practitioner
- Add upload button for patient-provided documents
- Categorize: lab results, imaging, letters, prescriptions
- PDF viewer modal

---

### 1.8 Complete Health Tracking (1 hour)
**Files**:
- `src/pages/portal/tracking.tsx` - Add weight entry form and charts

**Features**:
- Form to log weight, waist, hydration
- Store in `tracking_daily` table
- Chart visualization using Recharts
- Goal setting interface
- Export to CSV
- Integration point for Activity pillar

---

## 📋 PHASE 2: ADMIN PANEL (3 hours)

### 2.1 Patient Onboarding Dashboard (1.5 hours)
**File**: `src/pages/admin/onboarding.tsx` (create new)

**Metrics to Display**:
- Total patients: 1100 (from Halaxy export)
- Signed up: `COUNT(user_profiles WHERE id IS NOT NULL)`
- MFA enabled: `COUNT(user_profiles WHERE mfa_enabled_at IS NOT NULL)`
- Consent given: `COUNT(user_profiles WHERE consent_given_at IS NOT NULL)`
- Halaxy connected: `COUNT(halaxy_links WHERE verified_at IS NOT NULL)`
- Webhook status: Last received event timestamp

### 2.2 Manual Patient Linking Tool (1 hour)
**File**: `src/pages/admin/link-patient.tsx` (create new)

**Features**:
- Search by email/name/DOB
- Show unmatched users (WHERE patient_id IS NULL)
- Manually assign `patient_id` after verifying identity
- Log manual link in `audit_logs`

### 2.3 Audit Log Viewer (0.5 hours)
**File**: `src/pages/admin/audit.tsx` (exists but empty)

**Features**:
- Filter by action type, user, date range
- Export to CSV
- Highlight security events (login failures, role changes)

---

---

## 🔴 PHASE 3: REAL-TIME UPDATES & WEBHOOKS (2 hours)

### 3.1 Supabase Realtime Subscriptions (1 hour)
**Goal**: Use webhooks to instantly update portal when Halaxy data changes

**Implementation**:
1. Add Supabase Realtime subscription to each pillar dashboard
2. Subscribe to `patient_data_cache` table changes
3. When webhook invalidates cache (sets `expires_at` to past), trigger refetch
4. Show toast notification for updates

**Code Pattern** (add to each pillar dashboard):
```typescript
useEffect(() => {
  const channel = supabase
    .channel('patient-data-updates')
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'patient_data_cache',
      filter: `patient_id=eq.${patientId}`
    }, (payload) => {
      // Cache was invalidated by webhook
      if (new Date(payload.new.expires_at) < new Date()) {
        refetch(); // Trigger useHalaxyData refetch
        toast({
          title: "Data Updated",
          description: "Your healthcare data has been refreshed from Halaxy"
        });
      }
    })
    .subscribe();

  return () => { channel.unsubscribe(); };
}, [patientId]);
```

**Files to Update**:
- `src/pages/portal/pillars/billing-dashboard.tsx`
- `src/pages/portal/pillars/appointments-dashboard.tsx`
- `src/pages/portal/pillars/medication-dashboard.tsx`

### 3.2 Real-Time Notifications (1 hour)
**Goal**: Show toast notifications when specific events occur

**Events to Notify**:
- `appointment.created` → "New appointment booked for [date]"
- `appointment.updated` → "Your appointment on [date] has been updated"
- `patient.updated` → "Your profile information has been updated"
- New invoice created → "New invoice available: $[amount]"
- Payment received → "Payment of $[amount] processed"

**Implementation**:
- Subscribe to `audit_logs` table for webhook events
- Parse event payload and show relevant notification
- Add notification preferences in account settings

---

## 🧪 PHASE 4: SECURITY TESTING (2 hours)

### 4.1 Security Testing (1 hour)
**Test Cases**:
1. Create test patient account
2. Try to UPDATE `user_roles` to 'admin' → should fail
3. Try to access admin panel as patient → should 403
4. Try to view another patient's appointments → should fail
5. Verify audit log captures all attempts

### 4.2 Halaxy Integration Testing (0.5 hours)
**Test Cases**:
1. Connect Halaxy account via OAuth
2. Verify tokens stored encrypted
3. View appointments, invoices, documents
4. Create test appointment in Halaxy → verify webhook updates portal
5. Wait 5 minutes → verify cache expires and refreshes

### 4.3 MFA Testing (0.5 hours)
**Test Cases**:
1. Signup new user → forced to enroll MFA
2. Scan QR code with authenticator app
3. Enter wrong code → should fail
4. Enter correct code → should succeed
5. Logout and login → requires MFA code

---

---

## 📊 PHASE 5: DATA MIGRATION (1 hour)

### 5.1 Export Patient List from Halaxy
**Using**: `test-real-halaxy` edge function or Halaxy API directly

```bash
# Call edge function to export all patient IDs
curl -X POST https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/halaxy-export-patients \
  -H "Authorization: Bearer <SUPABASE_ANON_KEY>"
```

**Expected Output**: CSV with columns:
- `patient_id` (Halaxy ID)
- `email`
- `first_name`
- `last_name`
- `date_of_birth`

### 5.2 Bulk Import to Supabase
**SQL Migration**:
```sql
-- 20241020_import_halaxy_patients.sql
INSERT INTO user_profiles (patient_id, email, first_name, last_name, date_of_birth, role)
VALUES
  ('12345', 'john@example.com', 'John', 'Doe', '1980-01-01', 'patient'),
  -- ... repeat for all 1100 patients
ON CONFLICT (email) DO NOTHING;
```

**Verification**:
```sql
SELECT COUNT(*) FROM user_profiles WHERE patient_id IS NOT NULL;
-- Should return 1100
```

---

---

## 🔧 PHASE 6: ADVANCED WRITE OPERATIONS (6 hours - Post-Launch)

### 6.1 Create Appointment Booking Endpoint (3 hours)
**Goal**: Allow patients to book appointments directly from portal

**Files to Create**:
- `supabase/functions/halaxy-create-appointment/index.ts`

**Implementation**:
```typescript
// Edge function to create appointments in Halaxy
const createAppointment = async (req: Request) => {
  const { patientId, appointmentTypeId, practitionerId, startTime } = await req.json();
  
  // 1. Get valid access token
  const token = await getValidAccessToken(patientId, supabase);
  
  // 2. Call Halaxy API to create appointment
  const response = await fetch(`https://api.halaxyhealth.com/fhir/Appointment`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/fhir+json'
    },
    body: JSON.stringify({
      resourceType: 'Appointment',
      status: 'proposed',
      appointmentType: { reference: `AppointmentType/${appointmentTypeId}` },
      participant: [
        { actor: { reference: `Patient/${patientId}` } },
        { actor: { reference: `Practitioner/${practitionerId}` } }
      ],
      start: startTime,
      end: calculateEndTime(startTime, appointmentDuration)
    })
  });
  
  // 3. Log API call
  await logApiCall(patientId, 'create_appointment', 'success', supabase);
  
  // 4. Return confirmation
  return new Response(JSON.stringify({ success: true, appointmentId: data.id }));
};
```

**Security Considerations**:
- Validate user has permission (check `halaxy_links` table)
- Rate limiting: max 10 bookings per day per patient
- Audit all write operations
- Require appointment type and practitioner selection
- Validate appointment slot availability first

**UI Integration**:
- Add "Book Appointment" button in Appointments pillar
- Show available slots from `halaxy-api` (GET Slot endpoint)
- Confirmation modal before booking
- Success toast: "Appointment booked! You'll receive a confirmation email."

### 6.2 Update Appointment Functionality (1.5 hours)
**Goal**: Reschedule/cancel appointments

**Files to Create**:
- `supabase/functions/halaxy-update-appointment/index.ts`

**Features**:
- Reschedule: Update `start` and `end` times
- Cancel: Set `status: 'cancelled'`
- Add fees: Update invoice line items

**UI Integration**:
- Add "Reschedule" and "Cancel" buttons to appointment cards
- Confirmation dialog before making changes
- Webhook will sync changes back to portal

### 6.3 Automated Invoice Generation (1.5 hours)
**Goal**: Automatically create invoices when appointments are completed

**Implementation**:
- Listen for `appointment.updated` webhook with `status: 'fulfilled'`
- Call Halaxy API to create invoice with appropriate service codes
- Link invoice to appointment
- Send notification to patient

---

## 🚀 PHASE 7: ROLLOUT (4 weeks - Managed by You & Bec)

### 7.1 Communication Plan
**Week -1: Preparation**
- Disable email confirmation in Supabase Auth (for testing)
- Send test email to 5 pilot patients
- Monitor signups and manually assist with issues

**Week 1: Pilot Group (50 patients)**
- Email via Halaxy: "Your DS.H Portal is Live"
- Include signup instructions + support contact
- Monitor admin dashboard daily for stuck signups

**Week 2-3: Gradual Rollout (500 patients)**
- Batch emails every 2 days
- Check MFA enrollment rate
- Check Halaxy connection rate

**Week 4+: Full Rollout (remaining 550)**
- Enable email confirmation in Supabase
- Standard support process via email

### 7.2 Support AI Setup
**Tool**: Could use existing AI chatbot if you have one

**FAQ Answers**:
- Q: "I forgot my password" → A: Use "Forgot Password" link on login page
- Q: "MFA code not working" → A: Make sure device time is synced, try regenerating code
- Q: "Can't see my appointments" → A: Click "Connect to Halaxy" button on dashboard
- Q: "Wrong patient record linked" → A: Email admin@downscale.com.au with your DOB

**Escalation to Bec**:
- "I need to change my registered email/DOB"
- "My Halaxy account is locked"
- "I'm seeing someone else's data" (CRITICAL - immediate escalation)

---

## 📊 GO/NO-GO CHECKLIST

**Before Launch, ALL must be TRUE:**

### Security ✅/❌
- [ ] ❌ Roles stored in separate `user_roles` table (not inline)
- [ ] ❌ MFA mandatory for all accounts
- [ ] ❌ Consent page completed and enforced
- [ ] ✅ Halaxy keys in Supabase secrets only
- [ ] ✅ Audit log captures sign-in, data access, consent events
- [ ] ❌ Webhook secret configured and tested
- [ ] ❌ Test: Patient cannot escalate to admin
- [ ] ❌ Test: Patient cannot view another patient's data

### Functionality ✅/❌
- [ ] ✅ Signup form captures email, password, first/last name, DOB
- [ ] ✅ Automatic patient matching via `match-halaxy-patient` edge function
- [ ] ❌ Halaxy OAuth connection flow UI completed
- [ ] ❌ Appointments display from Halaxy
- [ ] ❌ Documents display and upload
- [ ] ❌ Health tracking with charts
- [ ] ❌ Admin onboarding dashboard

### Legal ✅/❌
- [ ] ✅ Privacy policy accessible at `/privacy-policy`
- [ ] ❌ Consent page captures explicit data-sharing agreement
- [ ] ❌ No clinical decision support claims in UI copy
- [ ] ✅ Terms & conditions accessible at `/terms`

### Operations ✅/❌
- [ ] ❌ 1100 patient records pre-loaded in `user_profiles`
- [ ] ❌ Webhooks configured in Halaxy dashboard
- [ ] ❌ Email template drafted for rollout announcement
- [ ] ❌ Support AI configured with FAQ answers
- [ ] ❌ Bec trained on admin dashboard usage

---

## ⏱️ TIMELINE

| Phase | Dev Time | Calendar Days | Status |
|-------|----------|---------------|--------|
| **Phase 0.1: Fix Roles** | 2 hours | 1 day | ❌ NOT STARTED |
| **Phase 0.2: MFA** | 3 hours | 1 day | ❌ NOT STARTED |
| **Phase 0.3: Consent** | 2 hours | 0.5 days | ❌ NOT STARTED |
| **Phase 0.4: Webhooks** | 0.5 hours | 0.5 days | ⚠️ PARTIALLY DONE (edge function exists, secret not configured) |
| **Phase 1: 8-Pillar UI** | 12 hours | 2-3 days | ⚠️ 40% DONE (Billing/Appointments/Medication need integration) |
| **Phase 2: Admin Panel** | 3 hours | 1 day | ⚠️ 20% DONE (stub pages exist) |
| **Phase 3: Real-Time** | 2 hours | 0.5 days | ❌ NOT STARTED (webhooks need Realtime subscriptions) |
| **Phase 4: Testing** | 2 hours | 1 day | ❌ NOT STARTED |
| **Phase 5: Migration** | 1 hour | 0.5 days | ❌ NOT STARTED |
| **Phase 6: Write Ops** | 6 hours | 1-2 days | ❌ POST-LAUNCH (optional) |
| **Phase 7: Rollout** | 0 hours (You & Bec) | 4 weeks | ❌ NOT STARTED |
| **TOTAL** | **31.5 hours dev (25.5 pre-launch)** | **8-10 days prep + 4 weeks rollout** | **~30% complete** |

---

## 🎯 CRITICAL PATH (MUST DO IN ORDER)

1. **Phase 0.1 (Fix Roles)** → Without this, privilege escalation risk
2. **Phase 0.2 (MFA)** → Without this, healthcare compliance violated
3. **Phase 0.3 (Consent)** → Without this, legally cannot access Halaxy
4. **Phase 4 (Security Testing)** → Verify fixes worked
5. **Phase 5 (Data Migration)** → Pre-load patient IDs
6. **Phase 0.4 (Webhooks)** → Can be done in parallel with Phase 1-3
7. **Phase 1 (8-Pillar UI)** → Integrate Halaxy data into Billing/Appointments/Medication dashboards
8. **Phase 2 (Admin Panel)** → Can be done in parallel with Phase 1
9. **Phase 3 (Real-Time)** → Add Supabase Realtime subscriptions for instant updates
10. **Phase 7 (Rollout)** → Only after 1-9 complete
11. **Phase 6 (Write Ops)** → POST-LAUNCH optional feature (appointment booking)

---

## 📁 FILES THAT NEED CHANGES

### Critical Security Fixes
- [ ] `supabase/migrations/20241020_fix_role_architecture.sql` - CREATE user_roles table
- [ ] ALL RLS policies - Update to use `has_role()` function
- [ ] `src/pages/AuthPage.tsx` - Add MFA enrollment
- [ ] `src/contexts/AuthContext.tsx` - Check MFA status on login
- [ ] `src/pages/ConsentPage.tsx` - Create consent page
- [ ] `src/components/ProtectedRoute.tsx` - Check consent before portal access

### UI Completion
- [ ] `src/pages/portal/index.tsx` - Display HalaxyAuthCard
- [ ] `src/pages/HalaxyCallback.tsx` - Handle OAuth redirect
- [ ] `src/pages/portal/documents.tsx` - Add file upload and viewer
- [ ] `src/pages/portal/tracking.tsx` - Add weight entry form and charts
- [ ] `src/pages/portal/account.tsx` - Add MFA management section

### Admin Panel
- [ ] `src/pages/admin/onboarding.tsx` - Patient onboarding metrics
- [ ] `src/pages/admin/link-patient.tsx` - Manual patient linking
- [ ] `src/pages/admin/audit.tsx` - Audit log viewer

### Configuration
- [ ] Supabase secrets - Add `HALAXY_WEBHOOK_SECRET`
- [ ] Halaxy dashboard - Configure 3 webhooks

---

## 🚀 WHAT TO DO NEXT

**Immediate Actions (Today)**:
1. Review this TODO with Bec
2. Prioritize Phase 0.1 (Roles) and 0.2 (MFA) as CRITICAL BLOCKERS
3. Decide: Launch with stale data (no webhooks) OR delay to implement Phase 0.4?
4. Schedule testing time (Phase 3) with real patient accounts

**This Week**:
- Complete Phase 0 (all 4 tasks)
- Complete Phase 3 (security testing)
- Start Phase 1 (UI completion)

**Next Week**:
- Complete Phase 1 & 2
- Run Phase 4 (data migration)
- Prepare rollout emails

**Week 3+**:
- Begin Phase 7 (pilot rollout)

---

## 📖 HALAXY API CAPABILITIES REFERENCE

### Available FHIR Data Types (Read-Only via `useHalaxyData` hook)

**1. Appointments** (`HalaxyAppointment[]`)
- **Endpoint**: `Appointment?patient=[patient_id]`
- **Data**: Upcoming/past appointments, telehealth vs in-person, practitioner, location, time, status
- **Use in**: Appointments Pillar Dashboard
- **Fields**: `id, start, end, status, appointmentType, participant (practitioner), serviceType, description`

**2. Invoices** (`HalaxyInvoice[]`)
- **Endpoint**: `Invoice?subject=[patient_id]`
- **Data**: Invoice details, amounts, due dates, line items (services), payment status
- **Use in**: Billing Pillar Dashboard
- **Fields**: `id, totalGross, totalNet, status, date, lineItem (serviceCode, quantity, unitPrice)`

**3. Documents** (`HalaxyDocument[]`)
- **Endpoint**: `DocumentReference?subject=[patient_id]`
- **Data**: Medical records, results, letters, prescriptions
- **Use in**: Documents page, Medication Pillar (prescriptions)
- **Fields**: `id, type, category, date, author (practitioner), content (attachment URL)`

**4. Patient Data** (`HalaxyPatient`)
- **Endpoint**: `Patient/[patient_id]`
- **Data**: Demographics (name, DOB, contact), address, Medicare number, emergency contacts
- **Use in**: Profile page, automatic matching
- **Fields**: `id, name, birthDate, telecom, address, identifier (Medicare)`

**5. Claims** (`HalaxyClaim[]`)
- **Endpoint**: `Claim?patient=[patient_id]`
- **Data**: Medicare/health fund claims, service codes, benefit amounts, patient contributions
- **Use in**: Billing Pillar (Medicare Claims tile), Medication Pillar (medication codes)
- **Fields**: `id, status, type, use, item (serviceCode, sequence), total, insurance (coverage)`

**6. Referrals** (`HalaxyReferral[]`)
- **Endpoint**: `ServiceRequest?subject=[patient_id]&category=referral`
- **Data**: Active referrals to specialists, referring practitioner, specialty, validity periods
- **Use in**: Referrals page
- **Fields**: `id, status, intent, category, code (specialty), requester (practitioner), authoredOn, validityPeriod`

**7. Payments** (`HalaxyPayment[]`)
- **Endpoint**: `PaymentReconciliation?request=[patient_id]`
- **Data**: Payment history, payment methods, transaction references
- **Use in**: Billing Pillar (Payment History tile)
- **Fields**: `id, created, amount, paymentIdentifier, paymentType, outcome`

**8. Practitioners** (`HalaxyPractitioner[]`)
- **Endpoint**: `Practitioner?organization=[org_id]`
- **Data**: Provider details, specialties, provider numbers, practice locations
- **Use in**: Appointments Pillar (My Practitioners tile)
- **Fields**: `id, name, qualification, identifier (providerNumber), address, telecom`

**9. Professional Contacts** (`HalaxyOrganization[]`)
- **Endpoint**: `Organization?type=specialist`
- **Data**: Specialist network, contact information
- **Use in**: Referrals page
- **Fields**: `id, name, type, address, telecom, contact`

**10. Appointment Types** (`HalaxyAppointmentType[]`)
- **Endpoint**: `Schedule?actor=[practitioner_id]`
- **Data**: Available consultation types, durations, costs, telehealth availability
- **Use in**: Appointments Pillar (Appointment Types tile, booking flow)
- **Fields**: `id, serviceType, code, duration, cost, availableTime`

**11. Organisation Details** (`HalaxyOrganization`)
- **Endpoint**: `Organization/[org_id]`
- **Data**: Practice information, practice numbers
- **Use in**: Admin panel, practice details
- **Fields**: `id, name, identifier (practiceNumber), address, telecom`

**12. Fee Schedule** (`HalaxyFeeSchedule`)
- **Endpoint**: `ChargeItemDefinition?context=[org_id]`
- **Data**: Service codes and pricing, Medicare schedule fees
- **Use in**: Billing Pillar (Fee Schedule tile)
- **Fields**: `id, code, pricing (amount, factor), applicability (billable)`

---

### Write Operations (Phase 6 - Post-Launch)

**1. Create Appointment**
- **Method**: `POST /fhir/Appointment`
- **Permissions**: Requires patient OAuth token
- **Use Case**: Book appointments directly from portal
- **Security**: Rate limiting, audit logging, slot validation

**2. Update Appointment**
- **Method**: `PUT /fhir/Appointment/[id]`
- **Permissions**: Requires patient OAuth token
- **Use Case**: Reschedule/cancel appointments, add fees
- **Security**: Audit all changes, webhook sync

**3. Create Invoice**
- **Method**: `POST /fhir/Invoice`
- **Permissions**: Practitioner-only (not implemented for patients)
- **Use Case**: Automated invoice generation after appointments
- **Security**: Practitioner role verification

---

### Webhook Events (Real-Time Updates)

**Configured Webhooks** (all point to `halaxy-webhook` edge function):
1. **`appointment.created`** → Invalidates appointment cache, shows "New appointment booked" notification
2. **`appointment.updated`** → Invalidates appointment cache, shows "Appointment updated" notification  
3. **`patient.updated`** → Invalidates all patient cache, updates `user_profiles` record

**Webhook Processing Flow**:
1. Halaxy sends POST to `https://pooebqhsshfafkhvccrl.supabase.co/functions/v1/halaxy-webhook`
2. Edge function verifies HMAC signature using `HALAXY_WEBHOOK_SECRET`
3. Parses event type and payload
4. Invalidates relevant `patient_data_cache` records (sets `expires_at` to past)
5. Logs event in `audit_logs` table
6. Supabase Realtime broadcasts change to connected clients
7. Portal receives realtime event, refetches data via `useHalaxyData`, shows toast notification

**Cache Strategy**:
- Default TTL: 5 minutes
- Webhook invalidation: Immediate (sets `expires_at` to `NOW() - INTERVAL '1 second'`)
- Next API call: Fetches fresh data from Halaxy, updates cache

---

### Security Architecture

**Token Management**:
- Tokens stored in `halaxy_links` table with AES encryption via `encrypt_token()` function
- Access tokens expire after 3600 seconds (1 hour)
- Refresh tokens used to obtain new access tokens via `halaxy-auth` edge function
- All tokens retrieved via `get_halaxy_tokens()` RPC (returns decrypted tokens)

**RLS Policies**:
- `halaxy_links`: Users can only view/update their own links (`user_id = auth.uid()`)
- `patient_data_cache`: Users can only view cached data for their `patient_id`
- `audit_logs`: Users cannot view audit logs (admin-only)

**Audit Logging**:
- All API calls logged to `audit_logs` table
- Webhook events logged with event type and payload summary
- Patient matching events logged
- OAuth connection events logged
- Failed API calls logged with error messages

**Webhook Signature Verification**:
```typescript
const verifySignature = async (req: Request, signature: string, secret: string) => {
  const rawBody = await req.text();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const computed = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody));
  const computedHex = Array.from(new Uint8Array(computed))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return computedHex === signature;
};
```

---

### Integration Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         HALAXY API                          │
│  (OAuth2, FHIR Endpoints, Webhooks)                         │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        │ OAuth2 Flow      │ FHIR API Calls   │ Webhooks
        │                  │                  │
        ▼                  ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ halaxy-auth  │  │  halaxy-api  │  │halaxy-webhook│
│ Edge Fn      │  │  Edge Fn     │  │ Edge Fn      │
└──────────────┘  └──────────────┘  └──────────────┘
        │                  │                  │
        ├──────────────────┼──────────────────┤
        │                  │                  │
        ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE DATABASE                        │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ halaxy_links │  │patient_data_ │  │ audit_logs   │      │
│  │ (encrypted   │  │ cache        │  │              │      │
│  │  tokens)     │  │ (5-min TTL)  │  │ (all events) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│         ▲                  ▲                  ▲             │
│         │                  │                  │             │
│         │ Supabase Client  │ Realtime         │ Audit       │
│         │                  │ Subscriptions    │ Queries     │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    REACT PORTAL (FRONTEND)                  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ AuthContext → usePatientMatching                     │   │
│  │ (auto-match on signup via match-halaxy-patient)     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ useHalaxyData Hook                                   │   │
│  │ (fetches all 12 FHIR data types, 5-min cache)       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │  Billing   │  │Appointments│  │ Medication │           │
│  │  Pillar    │  │  Pillar    │  │  Pillar    │           │
│  │  Dashboard │  │ Dashboard  │  │ Dashboard  │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│       ▲               ▲               ▲                     │
│       │               │               │                     │
│       └───────────────┴───────────────┘                     │
│         Real-time Updates via Supabase Realtime            │
│         (webhook invalidates cache → refetch → toast)      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Mapping: Halaxy Data → 8 Pillars

| Halaxy FHIR Resource | Portal Pillar | Specific Dashboard Tile |
|----------------------|---------------|-------------------------|
| **Invoice** | 💰 Billing | Outstanding Invoices, Payment History |
| **Claim** | 💰 Billing | Medicare Claims |
| **ChargeItemDefinition** | 💰 Billing | Fee Schedule |
| **PaymentReconciliation** | 💰 Billing | Payment History |
| **Appointment** | 📅 Appointments | Upcoming/Past Appointments |
| **Schedule** | 📅 Appointments | Appointment Types, Booking Flow |
| **Practitioner** | 📅 Appointments | My Practitioners |
| **DocumentReference (prescriptions)** | 💊 Medication | Active Prescriptions, Prescription History |
| **Claim (medication codes)** | 💊 Medication | Medication Items |
| **DocumentReference (all)** | 📄 Documents | Document Library |
| **ServiceRequest** | 🔗 Referrals | Referrals Page |
| **Patient** | 👤 Account | Profile Settings |
| **Organization** | ℹ️ Admin | Practice Information |

**Pillars NOT using Halaxy data** (patient self-tracking):
- 🍎 Nutrition → Local food diary
- 🏃 Activity → Local exercise logs (could integrate with `tracking_daily`)
- 🧠 Mental Health → Local mood tracking
- 😴 Sleep → Local sleep logs
- 🛒 Shop → Embedded iframe (downscale.shop)

---

## 📝 ARCHIVED FILES

**Archived on 2025-10-20**:
- `archive/HALAXY_INTEGRATION_TODO_ARCHIVED_2025-10-20.md` - All Halaxy-specific content now consolidated into this master TODO (Phases 1.3-1.5, 3, 6)
