#!/bin/bash

# 404 and Crawlability Test Script
# Tests all new location pages to ensure no 404 errors

echo "=== 404 ERROR TESTING FOR NEW AUSTRALIAN LOCATIONS ==="
echo "Date: $(date)"
echo "======================================================="

# Start the preview server in background
npm run preview &
PREVIEW_PID=$!

# Wait for server to start
echo "Starting preview server..."
sleep 5

# Test all new location pages
NEW_CITIES=("hobart" "darwin" "geelong" "sunshine-coast" "wollongong")

echo ""
echo "Testing new location pages for 404 errors:"
echo "==========================================="

ALL_PASSED=true

for city in "${NEW_CITIES[@]}"; do
    URL="http://localhost:4173/weight-loss-clinic-$city"
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
    
    if [ "$HTTP_STATUS" = "200" ]; then
        echo "✅ $city: HTTP $HTTP_STATUS - OK"
    else
        echo "❌ $city: HTTP $HTTP_STATUS - FAILED"
        ALL_PASSED=false
    fi
done

echo ""
echo "Testing sitemap inclusion:"
echo "========================="

for city in "${NEW_CITIES[@]}"; do
    if grep -q "weight-loss-clinic-$city" public/sitemap-locations.xml; then
        echo "✅ $city: Found in sitemap"
    else
        echo "❌ $city: Missing from sitemap"
        ALL_PASSED=false
    fi
done

echo ""
echo "Testing React routing:"
echo "====================="

# Test a few pages for proper React content loading
for city in "hobart" "darwin"; do
    CONTENT=$(curl -s "http://localhost:4173/weight-loss-clinic-$city" | grep -o "Weight Loss Clinic ${city^}" | head -1)
    if [ -n "$CONTENT" ]; then
        echo "✅ $city: React content loaded correctly"
    else
        echo "❌ $city: React content not loading"
        ALL_PASSED=false
    fi
done

# Stop the preview server
kill $PREVIEW_PID 2>/dev/null
wait $PREVIEW_PID 2>/dev/null

echo ""
if [ "$ALL_PASSED" = true ]; then
    echo "🎉 ALL TESTS PASSED - No 404 errors detected!"
    echo "✅ All new Australian location pages are working correctly"
    echo "✅ All pages included in sitemaps"
    echo "✅ React routing working properly"
else
    echo "❌ SOME TESTS FAILED - Check above for issues"
fi

echo ""
echo "📈 EXPANSION SUMMARY:"
echo "===================="
echo "• Original locations: 8 Australian cities"
echo "• New locations added: 5 Australian cities" 
echo "• Total locations now: 13 Australian cities"
echo ""
echo "New cities added for improved search coverage:"
echo "• Hobart (TAS) - Capital city, major oversight fixed"
echo "• Darwin (NT) - Capital city, major oversight fixed"  
echo "• Geelong (VIC) - 2nd largest Victorian city"
echo "• Sunshine Coast (QLD) - Major tourism/residential area"
echo "• Wollongong (NSW) - 3rd largest NSW city, Illawarra region"