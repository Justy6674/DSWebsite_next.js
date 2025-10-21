# Vercel Domain Setup Guide for downscale.com.au

## Step 1: Add Your Main Domain to Vercel

1. **In Vercel Dashboard:**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `downscale.com.au`
   - Click "Add"

2. **Vercel will show you DNS records to add**

## Step 2: DNS Records You Need to Add

### For the Main Domain (downscale.com.au)

**Option A: Using A Records (Recommended)**
```
Type: A
Name: @
Value: 76.76.21.21

Type: A  
Name: www
Value: 76.76.21.21
```

**Option B: Using CNAME (Alternative)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

### For Subdomains (Based on Your Code)

Add these CNAME records for each subdomain:

```
Type: CNAME
Name: booking
Value: cname.vercel-dns.com

Type: CNAME
Name: medicare
Value: cname.vercel-dns.com

Type: CNAME
Name: clinic
Value: cname.vercel-dns.com

Type: CNAME
Name: prescription
Value: cname.vercel-dns.com

Type: CNAME
Name: protein
Value: cname.vercel-dns.com

Type: CNAME
Name: water
Value: cname.vercel-dns.com

Type: CNAME
Name: skin
Value: cname.vercel-dns.com

Type: CNAME
Name: neora
Value: cname.vercel-dns.com

Type: CNAME
Name: muscle
Value: cname.vercel-dns.com

Type: CNAME
Name: prices
Value: cname.vercel-dns.com

Type: CNAME
Name: faq
Value: cname.vercel-dns.com

Type: CNAME
Name: script
Value: cname.vercel-dns.com

Type: CNAME
Name: shop
Value: cname.vercel-dns.com
```

## Step 3: Configure Domains in Vercel

After adding DNS records, in Vercel:

1. **Add each subdomain:**
   - Click "Add Domain" for each
   - Enter: `booking.downscale.com.au`, `medicare.downscale.com.au`, etc.
   - Vercel will verify DNS automatically

2. **Set redirect rules (if needed):**
   - Your `_redirects` file should handle this
   - But you can also set in Vercel UI

## Step 4: SSL Certificates

- Vercel automatically provisions SSL certificates
- This happens after DNS verification
- Takes 10-30 minutes usually

## Step 5: Verify Everything Works

```bash
# Test main domain
curl -I https://downscale.com.au

# Test www redirect
curl -I https://www.downscale.com.au

# Test a subdomain
curl -I https://booking.downscale.com.au
```

## Common DNS Providers

### If using Cloudflare:
- Set "Proxy status" to DNS only (grey cloud) initially
- Can enable proxy (orange cloud) after verification

### If using GoDaddy:
- Use their DNS management interface
- TTL can be set to 600 (10 minutes)

### If using Route53 (AWS):
- Create a hosted zone for downscale.com.au
- Add records as "Simple routing"

## Troubleshooting

### "Invalid Configuration" Error:
- Make sure DNS has propagated (can take up to 48 hours)
- Check DNS with: `nslookup downscale.com.au`

### SSL Certificate Issues:
- Ensure CAA records don't block Let's Encrypt
- Add if needed:
  ```
  Type: CAA
  Name: @
  Value: 0 issue "letsencrypt.org"
  ```

### Subdomain Not Working:
- Verify CNAME is pointing to `cname.vercel-dns.com`
- Check no conflicting A records exist

## Quick Commands to Check DNS

```bash
# Check main domain
dig downscale.com.au

# Check specific subdomain
dig booking.downscale.com.au

# Check current DNS provider
whois downscale.com.au | grep "Name Server"
```

## Next Steps After Domain Setup

1. **Update environment variables in Vercel:**
   - Add `NEXT_PUBLIC_SITE_URL=https://downscale.com.au`
   - Update any hardcoded URLs

2. **Test all redirects:**
   - Verify your `_redirects` file works
   - Check subdomain behavior

3. **Submit to Google:**
   - Update Search Console with new domain
   - Submit new sitemap

Need help? The Vercel dashboard will show specific DNS instructions for your domain provider.