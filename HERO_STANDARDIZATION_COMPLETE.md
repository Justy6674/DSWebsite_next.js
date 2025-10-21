# Complete Hero Standardization - All Pages

## Exact HomePage Hero Pattern To Match:
```tsx
// Main heading
style={{ 
  color: '#f7f2d3', 
  textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' 
}}

// Subheading/paragraph
style={{
  textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)'
}}

// Image preload
fetchpriority="high"  // LOWERCASE!
```

## Complete Fix List:

### 1. Change ALL `fetchPriority="high"` to `fetchpriority="high"` (lowercase)
- AboutPage.tsx (lines 23, 123)
- BlogPage.tsx (lines 106, 179, 248)
- FaqPage.tsx (line 182)
- HomePage.tsx (lines 25, 26)
- LocationsPage.tsx (line 115)
- MedicalWeightManagementPage.tsx (line 109)
- MentalHealthSupport.tsx (line 707)
- MovementActivityPrograms.tsx (line 151)
- NutritionMealPlanning.tsx (line 108)
- PricingPage.tsx (lines 23, 91)
- SleepRecoveryOptimisation.tsx (line 903)
- ToolsPage.tsx (line 165)
- GoalSettingMaintenance.tsx (need to check)
- ConditionsPage.tsx (need to check)
- HowItWorks.tsx (need to check)

### 2. Change ALL heading/text colors to exact HomePage colors:
Replace:
- `className="...text-cream..."` with `style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}`
- Paragraph text: `style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}`
- Remove className color classes, add inline styles

This affects ALL 14 pages listed above.
