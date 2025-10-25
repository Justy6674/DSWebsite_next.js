import { Metadata } from 'next';
import NutritionMealPlanning from '@/components/NutritionMealPlanning';

export const metadata: Metadata = {
  title: 'Nutrition Meal Planning',
  description: 'Nutrition Meal Planning page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/nutrition-meal-planning',
  },
};

export default function NutritionMealPlanningPage() {
  return <NutritionMealPlanning />;
}