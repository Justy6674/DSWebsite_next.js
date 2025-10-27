import { Metadata } from 'next';
import NutritionMealPlanning from '@/components/NutritionMealPlanning';

export const metadata: Metadata = {
  title: 'Personalised Nutrition & Meal Planning | Dietitian Support | Downscale Weight Loss',
  description: 'Professional nutrition counselling and personalised meal planning for sustainable weight loss. Evidence-based dietary guidance, meal prep strategies, and ongoing support from $45.',
  openGraph: {
    title: 'Personalised Nutrition & Meal Planning | Dietitian Support | Downscale Weight Loss',
    description: 'Professional nutrition counselling and personalised meal planning for sustainable weight loss. Evidence-based dietary guidance, meal prep strategies, and ongoing support from $45.',
    url: 'https://www.downscale.com.au/nutrition-meal-planning',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        secureUrl: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Personalised Nutrition and Meal Planning Services - Downscale Weight Loss Clinic',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personalised Nutrition & Meal Planning | Dietitian Support | Downscale Weight Loss',
    description: 'Professional nutrition counselling and personalised meal planning for sustainable weight loss. Evidence-based dietary guidance and meal prep strategies.',
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