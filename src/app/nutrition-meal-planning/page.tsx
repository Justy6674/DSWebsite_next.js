import { Metadata } from 'next';
import NutritionMealPlanning from '@/components/NutritionMealPlanning';

export const metadata: Metadata = {
  title: 'Nutrition & Meal Planning | Personalized Diet Support',
  description: 'Expert nutrition and meal planning support for sustainable weight loss. Personalized dietary guidance, meal plans, and ongoing nutritional support.',
  keywords: 'nutrition meal planning, weight loss diet, personalized meal plans, nutritional support, healthy eating plans',
  openGraph: {
    title: 'Nutrition & Meal Planning | Personalized Diet Support',
    description: 'Expert nutrition and meal planning support for sustainable weight loss. Personalized dietary guidance and ongoing nutritional support.',
    url: 'https://www.downscale.com.au/nutrition-meal-planning',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Nutrition and Meal Planning at Downscale Weight Loss Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nutrition & Meal Planning | Personalized Diet Support',
    description: 'Expert nutrition and meal planning support for sustainable weight loss.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/nutrition-meal-planning',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function NutritionMealPlanningPage() {
  return <NutritionMealPlanning />;
}