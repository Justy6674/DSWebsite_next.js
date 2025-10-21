# GoDaddy to Vercel DNS Setup Guide

## Step 1: Login to GoDaddy

1. Go to godaddy.com
2. Login → My Products → Domains
3. Click "Manage" next to downscale.com.au
4. Click "DNS" or "Manage DNS"

## Step 2: Remove/Update Existing Records

### IMPORTANT: Before making changes, screenshot your current DNS records!

### For Main Domain (downscale.com.au)

**Delete these if they exist:**
- Any A record with Name "@" pointing to old IP
- Any A record with Name "www" pointing to old IP
- Any CNAME record for "www"

**Add these NEW records:**

```
Type: A
Name: @
Value: 76.76.21.21
TTL: 600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 600
```

### What This Does:
- `@` record = handles https://downscale.com.au
- `www` CNAME = handles https://www.downscale.com.au (redirects to main)
- Vercel automatically handles www → non-www redirect

## Step 3: Update ALL Subdomain Records

### Easy Method: Change Each Subdomain from A to CNAME

**For EACH subdomain, DELETE the old A record and ADD:**

```
Type: CNAME
Name: booking
Value: cname.vercel-dns.com
TTL: 600
```

**Repeat for ALL these subdomains:**
- booking → cname.vercel-dns.com
- medicare → cname.vercel-dns.com  
- clinic → cname.vercel-dns.com
- prescription → cname.vercel-dns.com
- protein → cname.vercel-dns.com
- water → cname.vercel-dns.com
- skin → cname.vercel-dns.com
- neora → cname.vercel-dns.com
- muscle → cname.vercel-dns.com
- prices → cname.vercel-dns.com
- faq → cname.vercel-dns.com
- script → cname.vercel-dns.com
- shop → cname.vercel-dns.com

### GoDaddy Quick Tips:
1. Click "Add" to create new record
2. Select "CNAME" from Type dropdown
3. Enter subdomain name (just "booking", not "booking.downscale.com.au")
4. Enter "cname.vercel-dns.com" as Points to
5. Set TTL to 600 (10 minutes)
6. Click Save

## Step 4: In Vercel Dashboard

1. **Add Main Domain:**
   - Go to your project Settings → Domains
   - Add: `downscale.com.au`
   - Add: `www.downscale.com.au`

2. **Add Each Subdomain:**
   - Add: `booking.downscale.com.au`
   - Add: `medicare.downscale.com.au`
   - (Add all others you want to use)

3. **Vercel will show "Valid Configuration" when DNS propagates**

## Step 5: HTTPS/SSL Configuration

**Good news: Vercel handles ALL of this automatically!**
- SSL certificates auto-generated
- HTTPS forced on all domains
- www → non-www redirect automatic
- HTTP → HTTPS redirect automatic

## Common Issues & Fixes

### "Invalid Configuration" in Vercel?
```bash
# Check if DNS has propagated (from terminal):
nslookup downscale.com.au
nslookup booking.downscale.com.au

# Should show Vercel IPs/CNAME
```

### Old Site Still Showing?
- Clear browser cache
- Try incognito/private window
- DNS can take 24-48 hours to fully propagate
- Try: https://dnschecker.org to check global propagation

### Subdomains Not Working?
In GoDaddy, make sure:
- No A records exist for that subdomain
- CNAME points to: cname.vercel-dns.com
- Not pointing to old server

## Quick Reference: What Goes Where

| What You Type | DNS Record | Points To |
|--------------|------------|-----------|
| downscale.com.au | A record "@" | 76.76.21.21 |
| www.downscale.com.au | CNAME "www" | cname.vercel-dns.com |
| booking.downscale.com.au | CNAME "booking" | cname.vercel-dns.com |
| (all other subdomains) | CNAME "[name]" | cname.vercel-dns.com |

## After DNS Changes

1. **Wait 10-30 minutes** for propagation
2. **In Vercel**, all domains should show "Valid Configuration"
3. **Test each domain:**
   - https://downscale.com.au ✓
   - https://www.downscale.com.au → redirects to above ✓
   - https://booking.downscale.com.au ✓

## Need to Keep Some Subdomains on Old Server?

Just leave those A records pointing to old IP. Only change the ones you want on Vercel.

## Emergency Rollback

If something goes wrong:
1. Screenshot your NEW settings first
2. Change A records back to old IP
3. Delete CNAME records
4. Restore from your original screenshot

---

**Remember: Changes can take up to 48 hours to propagate globally, but usually work within 10-30 minutes.**