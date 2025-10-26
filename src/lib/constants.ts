// Medical Constants
'use client';
export const BMI_CATEGORIES = {
  UNDERWEIGHT: { min: 0, max: 18.5, label: 'Underweight', status: 'underweight' as const },
  NORMAL: { min: 18.5, max: 25, label: 'Normal weight', status: 'normal' as const },
  OVERWEIGHT: { min: 25, max: 30, label: 'Overweight', status: 'overweight' as const },
  OBESE_I: { min: 30, max: 35, label: 'Obese Class I', status: 'obese' as const },
  OBESE_II: { min: 35, max: 40, label: 'Obese Class II', status: 'obese' as const },
  OBESE_III: { min: 40, max: Infinity, label: 'Obese Class III', status: 'obese' as const }
};

export const ACTIVITY_LEVELS = {
  SEDENTARY: { multiplier: 1.2, label: 'Sedentary (little/no exercise)' },
  LIGHT: { multiplier: 1.375, label: 'Light activity (light exercise 1-3 days/week)' },
  MODERATE: { multiplier: 1.55, label: 'Moderate activity (moderate exercise 3-5 days/week)' },
  ACTIVE: { multiplier: 1.725, label: 'Very active (hard exercise 6-7 days/week)' },
  VERY_ACTIVE: { multiplier: 1.9, label: 'Super active (very hard exercise, physical job)' }
};

// URLs and Links
export const EXTERNAL_LINKS = {
  BOOKING: 'https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131',
  BOOKING_INITIAL: 'https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131?appointmentTypeId=452491',
  BOOKING_FOLLOWUP: 'https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131?appointmentTypeId=472181',
  BOOKING_GP: 'https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131?appointmentTypeId=544473',
  BOOKING_WIDGET: 'https://www.halaxy.com/book/widget/nurse-practitioner/mr-justin-black/1488401/1198131',
  BOOKING_LOCATION: 'https://www.halaxy.com/book/downscale/location/1198131',
  INSTAGRAM: 'https://www.instagram.com/downscale_weightloss',
  FACEBOOK: 'https://www.facebook.com/445168355337624',
  EMAIL: 'office@downscale.com.au'
};

// Navigation
export const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Tools', href: '/tools' },
  { name: 'Blog', href: '/blog' }
];

// Medical Categories
export const MEDICAL_CATEGORIES = [
  'Weight Management',
  'Nutrition',
  'Mental Health',
  'Movement & Activity',
  'Sleep & Recovery',
  'Medical Treatment'
] as const;