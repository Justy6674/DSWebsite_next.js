#!/bin/bash

echo "=== DEPLOYING SUPABASE FUNCTIONS ==="
echo ""

# Deploy blog sitemap generator
echo "1. Deploying blog sitemap generator..."
supabase functions deploy generate-blog-sitemap

# Deploy Google ping function
echo "2. Deploying Google ping function..."
supabase functions deploy ping-google-sitemap

# Deploy RSS feed
echo "3. Deploying RSS feed..."
supabase functions deploy blog-rss

# Run database migration
echo "4. Running database migration for triggers..."
supabase db push

echo ""
echo "=== DEPLOYMENT COMPLETE ==="
echo ""
echo "Test these URLs after deployment:"
echo "- https://www.downscale.com.au/blog-sitemap.xml"
echo "- https://www.downscale.com.au/blog/rss.xml"