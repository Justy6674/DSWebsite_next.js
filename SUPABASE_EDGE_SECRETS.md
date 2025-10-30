# Supabase Edge Secrets Setup

## Adding Mux Credentials to Supabase Edge Functions

⚠️ **IMPORTANT**: Use these exact variable names (case-sensitive). The app only reads these 4 variables:

### Method 1: Using Supabase CLI

```bash
# First, link your project
npx supabase link --project-ref pooebqhsshfafkhvccrl

# Add the 4 REQUIRED secrets (case-sensitive)
# Required for uploads
npx supabase secrets set MUX_TOKEN_ID="fc52c111-e7a6-4cc5-89c2-a01d28748f28"
npx supabase secrets set MUX_TOKEN_SECRET="yy7m/bx5Q0WxjnUjV6Jsvk35tS5h37BNd+yruxG9wsq+4Rsz5RrGxQc9I6Q7nrxLpXr/+rYRD0n"

# Required for signed playback
npx supabase secrets set MUX_SIGNING_KEY_ID="BccCfBqZchAdkvquuK7NZ00HUbL01Q2Q600yjDy6ouxLE8"
npx supabase secrets set MUX_SIGNING_PRIVATE_KEY="YOUR_ACTUAL_PRIVATE_KEY_HERE"

# List all secrets to verify
npx supabase secrets list
```

### Method 2: Using Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/pooebqhsshfafkhvccrl
2. Navigate to **Settings** → **Edge Functions** → **Secrets**
3. Click **Add Secret** and add each secret one by one with the exact names above

### Usage in Edge Functions

In your Edge Function code, access these secrets using `Deno.env.get()`:

```typescript
// supabase/functions/your-function/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  // Access Mux credentials (ONLY THESE 4 VARIABLES ARE READ BY THE APP)
  const muxTokenId = Deno.env.get('MUX_TOKEN_ID')           // Required for uploads
  const muxTokenSecret = Deno.env.get('MUX_TOKEN_SECRET')   // Required for uploads
  const muxSigningKeyId = Deno.env.get('MUX_SIGNING_KEY_ID') // Required for signed playback
  const muxSigningPrivateKey = Deno.env.get('MUX_SIGNING_PRIVATE_KEY') // Required for signed playback

  // Use credentials for Mux API calls
  // ...
})
```

## Quick Verification Steps

### For Production (Vercel/Hosting)
1. Add the 4 exact variables above to your hosting environment (e.g., Vercel)
2. Redeploy your application
3. Test the Mux upload flow:
   - Admin → Add to Portal → Content Type "Video" → choose a file
   - You should see "Uploading to Mux…", then "Video ready for portal"
4. Test playback: Open video tile → should route to `/portal/video/[playbackId]` and play with watermark
5. Test signing: Visit `/api/mux/sign-playback?playbackId=YOUR_ID`
   - ✅ Configured correctly: returns URL with `?token=...`
   - ❌ Not configured: returns public stream URL

### Important Notes

1. **Variable Names Matter**: The app only reads these 4 exact variable names (case-sensitive):
   - `MUX_TOKEN_ID`
   - `MUX_TOKEN_SECRET`
   - `MUX_SIGNING_KEY_ID`
   - `MUX_SIGNING_PRIVATE_KEY`

2. **Unused Variables**: These variables are NOT read by the app (you can keep them for reference):
   - `MUX_ENV_ID`
   - `MUX_ENV_KEY`
   - `MUX_ENV_NAME`
   - `MUX_SECRET_KEY`
   - `MUX_SIGNING_SECRET_KEY`

3. **Private Key Format**: The `MUX_SIGNING_PRIVATE_KEY` must include the full PEM format with `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----` lines

4. **Never commit secrets** to version control
5. **Use environment variables** in development (`.env.local`)
6. **Use Edge Secrets** in production (Supabase Dashboard or CLI)
7. **Rotate keys regularly** for security

### Testing Edge Functions Locally

```bash
# Test with local env variables
npx supabase functions serve your-function --env-file .env.local
```

### Deploying Edge Functions

```bash
# Deploy function with secrets
npx supabase functions deploy your-function
```

## Security Best Practices

1. **Principle of Least Privilege**: Only give Edge Functions the minimum secrets they need
2. **Audit Access**: Regularly review which functions have access to which secrets
3. **Monitor Usage**: Use Supabase logs to monitor secret access
4. **Rotate Regularly**: Update secrets periodically, especially after team changes
5. **Secure Storage**: Never store decoded signing keys in logs or databases