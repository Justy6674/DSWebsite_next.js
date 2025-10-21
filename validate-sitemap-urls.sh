#!/bin/bash

# Validate that all URLs in sitemap.xml match actual routes in the application

echo "🔍 Validating Sitemap URLs Against Application Routes"
echo "===================================================="
echo ""

# Extract URLs from sitemap
echo "Extracting URLs from sitemap.xml..."
sitemap_urls=$(grep -o '<loc>[^<]*</loc>' public/sitemap.xml | sed 's/<[^>]*>//g' | sed 's|https://downscale.com.au||g' | sort)

# Extract routes from App.tsx
echo "Extracting routes from App.tsx..."
app_routes=$(grep -o 'path="[^"]*"' src/App.tsx | sed 's/path="//g' | sed 's/"//g' | grep -v '\*' | sort | uniq)

# Add root route
app_routes="/$'\n'$app_routes"

echo ""
echo "SITEMAP URLs:"
echo "============="
echo "$sitemap_urls"

echo ""
echo "APP ROUTES:"
echo "==========="
echo "$app_routes"

echo ""
echo "VALIDATION RESULTS:"
echo "=================="

# Check each sitemap URL
while IFS= read -r url; do
    # Skip empty lines
    [ -z "$url" ] && continue
    
    # Remove trailing slash for comparison
    url_normalized=$(echo "$url" | sed 's|/$||')
    
    # Check if URL exists in routes
    if echo "$app_routes" | grep -q "^${url_normalized}$"; then
        echo "✅ $url - EXISTS in routes"
    else
        echo "❌ $url - NOT FOUND in routes!"
    fi
done <<< "$sitemap_urls"

echo ""
echo "CHECKING FOR MISSING ROUTES:"
echo "==========================="
echo "Routes in App.tsx but NOT in sitemap:"

while IFS= read -r route; do
    # Skip empty lines and special routes
    [ -z "$route" ] && continue
    [[ "$route" == *":slug"* ]] && continue
    [[ "$route" == *"*"* ]] && continue
    [[ "$route" == "/admin"* ]] && continue
    [[ "$route" == "/blog-admin"* ]] && continue
    [[ "$route" == "/index.html" ]] && continue
    [[ "$route" == "/calculator" ]] && continue  # Subpage, not main nav
    
    # Check if route exists in sitemap
    if ! echo "$sitemap_urls" | grep -q "^${route}$"; then
        echo "⚠️  $route - Missing from sitemap"
    fi
done <<< "$app_routes"

echo ""
echo "✅ Validation complete!"