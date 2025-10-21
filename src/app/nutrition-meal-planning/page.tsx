import { Metadata } from 'next';
import NutritionMealPlanning from '@/components/NutritionMealPlanning';

export const metadata: Metadata = {
  title: 'Nutrition Meal Planning',
  description: 'Nutrition Meal Planning page - Access and manage your content',
};

export default function NutritionMealPlanningPage() {
  return <NutritionMealPlanning />;
}