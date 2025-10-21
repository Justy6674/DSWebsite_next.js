// External URLs configuration for better security and maintainability
'use client';
export const EXTERNAL_URLS = {
  // Booking and consultation URLs
  BOOK_ONLINE: 'https://www.downscale.com.au/book-online',
  HALAXY_BOOKING: 'https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131',
  
  // Calculator and tools
  CALCULATOR: 'https://www.downscale.com.au/calculator',
  
  // Information pages
  FAQ: 'https://www.downscale.com.au/frequent-questions',
  
  // External assets
  HALAXY_LOGO: 'https://cdn.halaxy.com/h/images/logo.png',
  
  // Patient portal login
  HALAXY_PATIENT_PORTAL: 'https://www.halaxy.com/a/login',
} as const;

// Validate external URLs on startup (development only)
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  console.log('External URLs configured:', Object.keys(EXTERNAL_URLS).length);
}