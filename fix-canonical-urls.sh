#!/bin/bash

# Fix all canonical URLs to use www subdomain
echo "Fixing canonical URLs to use www.downscale.com.au..."

# List of files to update
files=(
  "src/pages/BlogPage.tsx"
  "src/pages/ComplaintsPage.tsx" 
  "src/pages/FaqPage.tsx"
  "src/pages/HowItWorks.tsx"
  "src/pages/MedicareBillingPage.tsx"
  "src/pages/PrivacyPolicyPage.tsx"
  "src/pages/TermsAndConditionsPage.tsx"
  "src/pages/ToolsPage.tsx"
  "src/pages/locations/WeightLossClinicAdelaide.tsx"
  "src/pages/locations/WeightLossClinicBrisbane.tsx"
  "src/pages/locations/WeightLossClinicCanberra.tsx"
  "src/pages/locations/WeightLossClinicGoldCoast.tsx"
  "src/pages/locations/WeightLossClinicMelbourne.tsx"
  "src/pages/locations/WeightLossClinicNewcastle.tsx"
  "src/pages/locations/WeightLossClinicPerth.tsx"
  "src/pages/locations/WeightLossClinicSydney.tsx"
)

# Replace non-www with www in canonical URLs
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    sed -i 's|https://downscale\.com\.au|https://www.downscale.com.au|g' "$file"
    echo "Updated: $file"
  fi
done

echo "All canonical URLs updated to use www subdomain!"