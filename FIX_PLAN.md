# COMPLETE FIX PLAN - ALL HERO SECTIONS

## EXACT HomePage Hero Style To Match:
```tsx
color: '#f7f2d3'
textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)'
```

## Issues Found:
1. **fetchPriority="high"** - WRONG! Should be **fetchpriority="high"** (lowercase)
2. **text-cream class** - NOT matching HomePage's exact `#f7f2d3` color
3. **Text shadow** - not matching HomePage's exact shadow

## Pages To Fix:
1. LocationsPage.tsx - fetchpriority, exact color
2. AboutPage.tsx - fetchpriority, exact color  
3. ToolsPage.tsx - fetchpriority, exact color
4. MedicalWeightManagementPage.tsx - fetchpriority, exact color
5. BlogPage.tsx - fetchpriority, exact color
6. FaqPage.tsx - fetchpriority, exact color
7. PricingPage.tsx - fetchpriority, exact color
8. HowItWorks.tsx - fetchpriority, exact color
9. ConditionsPage.tsx - fetchpriority, exact color
10. GoalSettingMaintenance.tsx - fetchpriority, exact color
11. MentalHealthSupport.tsx - fetchpriority, exact color
12. MovementActivityPrograms.tsx - fetchpriority, exact color
13. NutritionMealPlanning.tsx - fetchpriority, exact color
14. SleepRecoveryOptimisation.tsx - fetchpriority, exact color

## Standard Pattern:
```tsx
<img 
  src="/image.webp" 
  alt="" 
  className="hidden" 
  fetchpriority="high"  // LOWERCASE!
  loading="eager"
/>
<h1 style={{ 
  color: '#f7f2d3',  // EXACT HomePage color!
  textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)'
}}>
<p style={{ 
  color: '#f7f2d3',
  textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)'
}}>
```
