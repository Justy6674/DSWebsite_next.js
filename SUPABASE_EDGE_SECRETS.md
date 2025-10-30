# Supabase Edge Secrets Setup

## Adding Mux Credentials to Supabase Edge Functions

### Method 1: Using Supabase CLI

```bash
# First, link your project
npx supabase link --project-ref pooebqhsshfafkhvccrl

# Add each secret one by one
npx supabase secrets set MUX_ENV_ID="0tab53"
npx supabase secrets set MUX_ENV_KEY="u7k4lc4rptpli1ag2r1hgoakk"
npx supabase secrets set MUX_ENV_NAME="Production"
npx supabase secrets set MUX_TOKEN_ID="fc52c111-e7a6-4cc5-89c2-a01d28748f28"
npx supabase secrets set MUX_SECRET_KEY="yy7m/bx5Q0WxjnUjV6Jsvk35tS5h37BNd+yruxG9wsq+4Rsz5RrGxQc9I6Q7nrxLpXr/+rYRD0n"
npx supabase secrets set MUX_SIGNING_KEY_ID="BccCfBqZchAdkvquuK7NZ00HUbL01Q2Q600yjDy6ouxLE8"
npx supabase secrets set MUX_SIGNING_SECRET_KEY="LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBNlUvUWRCamZNMzRDaVFNK2pLM09wRWhQMGxSU2tPWUxJT3J4ckpSa1B6Zzl6Y0VwCmhJdWR1ZU5SaGpXWkZpWEMvK0pKa0JSenlZQTdyZ3pGUTRFeEhmU293UllIaWs1RlZ4WE9qbEdhOWxDZitJK3AKMzVnaWhHb2N4M2UzcVlUdzFzZFZxLzRJMFhjNnZEV0pSQWtTeU9IYUZpK2dwNlRpcjNuV0ttMkRPcmdHZ0J5UgpiejlyZkJkMkh6KzdxNE1ESjRhbHhyRVZZckpJcGUrMVZRb2NvWGw3eFRMMm1CaDE3TWJzT0hBVFk5M3RuaFNmCmpoS2tqVHJ3VHdaeWloZ0Y5WUNuQUpGN2w0M2xicWFrRFE2aGQzUEt4R09rN0Rqdkp3cldUYjN6Y1dNaDg2aEoKdjlsNGFIVXkwSWFXajE2T2NZZmdrcjI0Z3diaGhsMUNqV1A3ZVFJREFRQUJBb0lCQUR1cGZGM2o2bGZwbGs1aApOUUtXZzZ4QkRhQjBqYlNlRHlSNDBCcFl6QlhhbFB0anRQRS9Ick5sYlBpTUJqekNwVTM0R09XdVJUbTNBQXZ2CkdoYThGOHBZUVRzM0hmQ0JPWHdlaUhhZWFha3BUdThxRmIrbTBOVFpxY2hjVmV3VW9kM2FsWTdvNUdwa09mSGQKSXQveURncXVycTFUdXBxRU1LKzgwVWFDUUxlbjBISUFSWGlJRTZDWExXU0ZicEdKOGN6YTVsOC9OUnVvbC9hegpodmRGdmpnVWVOOEY5YnJpOVhyOVhFT1JRSFliT241UmlwblpOWjBxaDBCd0h3alV1bnBaN1Q5RGVTS3dIZ2kxCjdvNDdzbEhhODM0cDU4MDBnTGhyUUhCdFByV3BNOHhoVGJpOXZzMFB6MWJLNmFmVCtQTjZleXR2cEx1SHFCV0gKR1lYQTUyMENnWUVBNnRXYzEvY3d4am5DNW5Ha3Rlc1VSa2dpMFVFQjY0UXo0SHNaS3lzL1d6VFhVQ1hrNjFlVQpQcWxyRnNkOHZOTGlEYnIydHR0SnlpdFRNbCs4U3JSb0RGcndBVWNSUzB5TEVleWtOWkd0aTFJRzdaRkgycTlDClhlMGVZbklhK2pCUkdseDRTSExkZW1JVzZQajZMRXp4Q3BCMC8zYU00N3lUVWxDZzJYS0t2NGNDZ1lFQS9sY1IKdER1SEhyZjc5dDR2RmRaTWo4UjZ0WTZJL0NiblV1NFlmUk5IMHFSMFZHcE5TTEVobTVQSk40S2R3OXN1WGFRWApFUnh1bFhSSGd4d2FGNUV5UFJxOENScHhTZisrMHhGSEd3ZXg2bFAzRmVwVW9WUTVEK2Y0d0Z5b1FjQ20xZGhWCjN3V29ENlBzcWdHc2xBTFRxanFReU1zQlJyMzduNEdEcVdxY0xQOENnWUFYam1IelQvcDJoK2pERVBkQ3dGZ0MKVE00aFMzSVQyK2tRUllqYXliWExRbHV1MEg1TUZUYnJxamJ4ekFUNU0vWTFCbUlsS1k0WFY0MDY2bHVLNnRuZApFMm9yMXFNbmVJQWl4aWdhcjRoSEIyMW1lMEpINzNpcXoxUlM3N3RCQ1lPNUx6bHBtd3dZY0twM3FESUFLNStxClBaOWUyTmQ5S0xkbWRHd09JKzFERlFLQmdRQysveVcxWWtxYS8vRkFOeVBHMDFKVldHZ0o5WXJiU0YvSXdESTEKb3dmNW9EUVh2R2hqSVZtcW1uV3RzUEhHeGM3dzFTdlpWcStZbm1TaGliWHlZc0FHY1JBcUNlaHZlSldWclZEbgpkSVRnQXNQM2VpeXBwalRmeEFUaWQvS0d4aVREVEIxWVNNZ25UcU9JRzQrODZzNkc5RW9MNzU3NnYrcTRvcXI3Cnk2cVNnd0tCZ1FDaW9jbTZYaEtrcXluWGZuLytLR01va2FpanJTM1VXUFdIV3VUcmRRVlAweWZoQmI5VHFqQWYKL2V0T0tmbSs0WloyK3VpSitYbFZZcGx2ZjlUUGtmc2xSaG1qVk13cmdoUHdETXhUYi9hbGRHVWVBK1pNalY1ZQp4WVQ1blRaRzNER0U1Q1dNNm1ZSlBIL21KTmhEU3YvQ3RwZGx2UWFHbnFCOW93YmExVjNISnc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo="

# List all secrets to verify
npx supabase secrets list
```

### Method 2: Using Supabase Dashboard

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/pooebqhsshfafkhvccrl
2. Navigate to **Settings** → **Edge Functions** → **Secrets**
3. Click **Add Secret** and add each secret one by one

### Usage in Edge Functions

In your Edge Function code, access these secrets using `Deno.env.get()`:

```typescript
// supabase/functions/your-function/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  // Access Mux credentials
  const muxEnvId = Deno.env.get('MUX_ENV_ID')
  const muxEnvKey = Deno.env.get('MUX_ENV_KEY')
  const muxTokenId = Deno.env.get('MUX_TOKEN_ID')
  const muxSecretKey = Deno.env.get('MUX_SECRET_KEY')
  const muxSigningKeyId = Deno.env.get('MUX_SIGNING_KEY_ID')
  const muxSigningSecretKey = Deno.env.get('MUX_SIGNING_SECRET_KEY')

  // Use credentials for Mux API calls
  // ...
})
```

### Important Notes

1. **Never commit secrets** to version control
2. **Use environment variables** in development (`.env.local`)
3. **Use Edge Secrets** in production (Supabase Dashboard or CLI)
4. **Rotate keys regularly** for security
5. **The signing key is Base64 encoded** - decode it when using in your application

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