import { Metadata } from 'next';
import NutritionMealPlanning from '@/components/NutritionMealPlanning';

export const metadata: Metadata = {
  title: 'Nutrition Meal Planning',
  description: 'Nutrition Meal Planning page - Access and manage your content',
  openGraph: {
    title: 'Nutrition Meal Planning',
    description: 'Nutrition Meal Planning page - Access and manage your content',
    url: 'https://www.downscale.com.au/nutrition-meal-planning',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Nutrition Meal Planning',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nutrition Meal Planning',
    description: 'Nutrition Meal Planning page - Access and manage your content',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/nutrition-meal-planning',
  },
};

export default function NutritionMealPlanningPage() {
  return <NutritionMealPlanning />;
}