#!/bin/bash

# Comprehensive Crawlability Test Suite for downscale.com.au
# Run this after deployment to verify all fixes are working

echo "🔍 COMPREHENSIVE CRAWLABILITY TEST SUITE"
echo "======================================="
echo "Testing: downscale.com.au"
echo "Date: $(date)"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="https://downscale.com.au"

# Test counter
PASS=0
FAIL=0

# Function to test URL
test_url() {
    local url=$1
    local expected_status=$2
    local description=$3
    
    echo -n "Testing: $description... "
    
    # Get HTTP status code
    status=$(curl -s -o /dev/null -w "%{http_code}" -L "$url")
    
    if [ "$status" == "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Status: $status)"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected: $expected_status, Got: $status)"
        ((FAIL++))
    fi
}

# Function to check robots.txt
check_robots() {
    echo -e "\n${YELLOW}1. ROBOTS.TXT TESTS${NC}"
    echo "==================="
    
    # Test robots.txt accessibility
    test_url "$BASE_URL/robots.txt" "200" "robots.txt accessibility"
    
    # Check robots.txt content
    echo -n "Checking robots.txt content... "
    robots_content=$(curl -s "$BASE_URL/robots.txt")
    
    # Check for problematic subdomain allows
    if echo "$robots_content" | grep -q "Allow: \*://.*\.downscale\.com\.au"; then
        echo -e "${RED}✗ FAIL${NC} - Still contains subdomain allows!"
        ((FAIL++))
    else
        echo -e "${GREEN}✓ PASS${NC} - No subdomain allows found"
        ((PASS++))
    fi
    
    # Check for sitemap declaration
    echo -n "Checking sitemap declaration... "
    if echo "$robots_content" | grep -q "Sitemap: https://downscale.com.au/sitemap.xml"; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC} - Sitemap not declared!"
        ((FAIL++))
    fi
}

# Function to check sitemap
check_sitemap() {
    echo -e "\n${YELLOW}2. SITEMAP.XML TESTS${NC}"
    echo "===================="
    
    # Test sitemap accessibility
    test_url "$BASE_URL/sitemap.xml" "200" "sitemap.xml accessibility"
    
    # Download sitemap
    curl -s "$BASE_URL/sitemap.xml" > /tmp/sitemap.xml
    
    # Check for subdomain URLs in sitemap
    echo -n "Checking for subdomain URLs... "
    if grep -q "https://[^.]*\.downscale\.com\.au" /tmp/sitemap.xml; then
        echo -e "${RED}✗ FAIL${NC} - Sitemap still contains subdomain URLs!"
        ((FAIL++))
    else
        echo -e "${GREEN}✓ PASS${NC} - No subdomain URLs found"
        ((PASS++))
    fi
    
    # Validate XML structure
    echo -n "Validating XML structure... "
    if xmllint --noout /tmp/sitemap.xml 2>/dev/null; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠ WARN${NC} - XML validation failed (xmllint not installed?)"
    fi
    
    # Test all URLs in sitemap
    echo -e "\n${YELLOW}Testing all sitemap URLs:${NC}"
    urls=$(grep -o '<loc>[^<]*</loc>' /tmp/sitemap.xml | sed 's/<[^>]*>//g')
    
    for url in $urls; do
        test_url "$url" "200" "$url"
    done
}

# Function to check redirects
check_redirects() {
    echo -e "\n${YELLOW}3. REDIRECT TESTS${NC}"
    echo "================"
    
    # Test problematic subdomains that should no longer redirect
    echo "Testing subdomains that were causing issues:"
    
    # These should NOT exist (no DNS records)
    subdomains=("weightloss" "sleep" "adhd" "menopause" "perimenopause" "nutrition" "exercise" "mental-health" "booking")
    
    for subdomain in "${subdomains[@]}"; do
        echo -n "Checking $subdomain.downscale.com.au... "
        
        # Check DNS resolution
        if host "$subdomain.downscale.com.au" >/dev/null 2>&1; then
            echo -e "${YELLOW}⚠ DNS exists${NC} - checking redirect..."
            
            # If DNS exists, check if it redirects
            redirect_location=$(curl -s -I -L "https://$subdomain.downscale.com.au" | grep -i "location:" | head -1)
            if [ -n "$redirect_location" ]; then
                echo -e "${RED}  ✗ FAIL${NC} - Still redirecting to: $redirect_location"
                ((FAIL++))
            else
                echo -e "${GREEN}  ✓ PASS${NC} - Not redirecting"
                ((PASS++))
            fi
        else
            echo -e "${GREEN}✓ PASS${NC} - No DNS record (good!)"
            ((PASS++))
        fi
    done
}

# Function to check meta tags
check_meta_tags() {
    echo -e "\n${YELLOW}4. META TAG TESTS${NC}"
    echo "================"
    
    # Download homepage
    curl -s "$BASE_URL" > /tmp/homepage.html
    
    # Check for robots meta tag
    echo -n "Checking robots meta tag... "
    if grep -q 'content="index, follow' /tmp/homepage.html; then
        echo -e "${GREEN}✓ PASS${NC} - Homepage is indexable"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC} - Homepage might be noindex!"
        ((FAIL++))
    fi
    
    # Check canonical tag
    echo -n "Checking canonical tag... "
    canonical=$(grep -o '<link rel="canonical"[^>]*>' /tmp/homepage.html | grep -o 'href="[^"]*"' | sed 's/href="//;s/"$//')
    if [ "$canonical" == "https://downscale.com.au/" ]; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC} - Canonical: $canonical"
        ((FAIL++))
    fi
}

# Function to check Google verification
check_google_verification() {
    echo -e "\n${YELLOW}5. GOOGLE VERIFICATION TESTS${NC}"
    echo "=========================="
    
    # Check for proper verification file
    test_url "$BASE_URL/google8f3a5b2c1d9e7f4a.html" "200" "Google verification file"
    
    # Check that old broken file is gone
    echo -n "Checking old verification file removed... "
    status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/google-site-verification.html")
    if [ "$status" == "404" ]; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC} - Old file still exists!"
        ((FAIL++))
    fi
}

# Function to test performance
check_performance() {
    echo -e "\n${YELLOW}6. PERFORMANCE TESTS${NC}"
    echo "==================="
    
    # Test page load time
    echo -n "Testing homepage load time... "
    start_time=$(date +%s.%N)
    curl -s -o /dev/null "$BASE_URL"
    end_time=$(date +%s.%N)
    
    load_time=$(echo "$end_time - $start_time" | bc)
    
    if (( $(echo "$load_time < 3" | bc -l) )); then
        echo -e "${GREEN}✓ PASS${NC} - Load time: ${load_time}s"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠ WARN${NC} - Load time: ${load_time}s (slow!)"
    fi
}

# Run all tests
echo "Starting comprehensive crawlability tests..."
echo ""

check_robots
check_sitemap
check_redirects
check_meta_tags
check_google_verification
check_performance

# Summary
echo -e "\n${YELLOW}TEST SUMMARY${NC}"
echo "============"
echo -e "Total Tests: $((PASS + FAIL))"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"

if [ $FAIL -eq 0 ]; then
    echo -e "\n${GREEN}✓ ALL TESTS PASSED!${NC} Your site is ready for Google crawling."
else
    echo -e "\n${RED}✗ SOME TESTS FAILED!${NC} Please fix the issues above."
fi

# Generate report
REPORT_FILE="crawlability-test-report-$(date +%Y%m%d-%H%M%S).txt"
echo -e "\nGenerating detailed report: $REPORT_FILE"

{
    echo "Crawlability Test Report"
    echo "======================="
    echo "Date: $(date)"
    echo "Site: $BASE_URL"
    echo ""
    echo "Test Results:"
    echo "- Total Tests: $((PASS + FAIL))"
    echo "- Passed: $PASS"
    echo "- Failed: $FAIL"
    echo ""
    echo "Recommendations:"
    if [ $FAIL -eq 0 ]; then
        echo "✓ Site is properly configured for crawling"
        echo "✓ Submit updated sitemap to Google Search Console"
        echo "✓ Request re-crawling of homepage"
    else
        echo "✗ Fix failed tests before submitting to Google"
        echo "✗ Review error messages above"
    fi
} > "$REPORT_FILE"

echo -e "\n${YELLOW}NEXT STEPS:${NC}"
echo "1. Deploy these changes to production"
echo "2. Run this test script again on production"
echo "3. Submit sitemap to Google Search Console"
echo "4. Use URL Inspection tool on key pages"
echo "5. Monitor crawl stats daily for 2 weeks"