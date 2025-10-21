// Medical Types
export interface BMICategory {
  range: string;
  category: string;
  status: 'normal' | 'overweight' | 'obese' | 'underweight';
}

export interface CalculatorInputs {
  age: string;
  weight: string;
  height: string;
  gender: 'male' | 'female';
  activityLevel: string;
  goal: string;
  waist?: string;
  neck?: string;
  hip?: string;
}

export interface CalculatorResults {
  bmi: number;
  bmiCategory: BMICategory;
  bmr: number;
  tdee: number;
  goalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  bodyFatPercentage?: number;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  meta_description?: string;
}

// Booking Types
export interface BookingOption {
  title: string;
  description: string;
  duration: string;
  price: string;
  icon: any; // Lucide icon component
  variant: 'primary' | 'secondary' | 'wellness' | 'general' | 'specialty' | 'urgent';
}

// Medical Service Types
export interface MedicalService {
  title: string;
  description: string;
  features: string[];
  category: 'weight-management' | 'nutrition' | 'mental-health' | 'movement' | 'sleep-recovery';
}