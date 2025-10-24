// SEO Prerendering Middleware for Search Engine Crawlability
// This enhances the SPA to be more crawler-friendly

export const botUserAgents = [
  'googlebot',
  'bingbot', 
  'slurp',
  'duckduckbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'applebot',
  'yandexbot',
  'baiduspider'
];

export const isBot = (userAgent: string): boolean => {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return botUserAgents.some(bot => ua.includes(bot));
};

// Enhanced meta tags for weight loss clinic targeting
export const getMetaTags = (path: string) => {
  const baseTitle = "Weight Loss Clinic Australia";
  const baseDomain = "https://www.downscale.com.au";
  
  const metaConfigs: Record<string, any> = {
    '/': {
      title: `${baseTitle} | Professional Telehealth Weight Loss & Weight Maintenance`,
      description: "Professional telehealth weight loss & weight maintenance clinic. Consultations with Justin Black, Nurse Practitioner. Medicare bulk billed initial consultations across Australia.",
      keywords: "telehealth weight loss clinic Australia, weight maintenance clinic, weight loss clinic Australia, online weight loss clinic Australia, telehealth weight loss Australia, Medicare weight loss clinic",
      canonical: baseDomain
    },
    '/weight-loss-clinic-sydney': {
      title: `Weight Loss Clinic Sydney | Telehealth Medicare Consultations`,
      description: "Sydney weight loss clinic offering telehealth consultations. Expert Nurse Practitioner-led weight management. Medicare bulk-billed initial appointments for Sydney residents.",
      keywords: "weight loss clinic sydney, sydney weight loss clinic, telehealth weight loss clinic sydney, telehealth weight loss sydney, weight loss clinic sydney",
      canonical: `${baseDomain}/weight-loss-clinic-sydney`
    },
    '/weight-loss-clinic-melbourne': {
      title: `Weight Loss Clinic Melbourne | Virtual Medicare Consultations`,
      description: "Melbourne weight loss clinic offering virtual telehealth consultations. Expert Nurse Practitioner-led weight management. Medicare bulk-billed appointments for Melbourne residents.",
      keywords: "weight loss clinic melbourne, melbourne weight loss clinic, virtual weight loss clinic melbourne, telehealth weight loss melbourne",
      canonical: `${baseDomain}/weight-loss-clinic-melbourne`
    },
    '/weight-loss-clinic-brisbane': {
      title: `Weight Loss Clinic Brisbane | Virtual Medicare Consultations`,
      description: "Brisbane weight loss clinic offering virtual telehealth consultations. Expert Nurse Practitioner-led weight management. Medicare bulk-billed appointments for Brisbane residents.",
      keywords: "weight loss clinic brisbane, brisbane weight loss clinic, virtual weight loss clinic brisbane, telehealth weight loss brisbane",
      canonical: `${baseDomain}/weight-loss-clinic-brisbane`
    },
    '/weight-loss-clinic-perth': {
      title: `Weight Loss Clinic Perth | Online Virtual Medicare Consultations`,
      description: "Perth's professional weight loss clinic offering virtual telehealth consultations. Expert Nurse Practitioner-led weight management. Medicare bulk-billed appointments across Perth WA.",
      keywords: "weight loss clinic perth, perth weight loss clinic, virtual weight loss clinic perth, telehealth weight loss perth",
      canonical: `${baseDomain}/weight-loss-clinic-perth`
    },
    '/weight-loss-clinic-adelaide': {
      title: `Weight Loss Clinic Adelaide | Online Virtual Medicare Consultations`,
      description: "Adelaide's professional weight loss clinic offering virtual telehealth consultations. Expert Nurse Practitioner-led weight management. Medicare bulk-billed appointments across Adelaide SA.",
      keywords: "weight loss clinic adelaide, adelaide weight loss clinic, virtual weight loss clinic adelaide, telehealth weight loss adelaide",
      canonical: `${baseDomain}/weight-loss-clinic-adelaide`
    },
    '/blog': {
      title: `Weight Loss Clinic Blog & Research | Downscale Weight Loss Clinic`,
      description: "Evidence-based articles and clinical insights from our professional weight loss clinic. Expert medical advice on weight management, nutrition, and health.",
      keywords: "weight loss clinic blog, weight loss research, clinical insights, weight management, nutrition, health blog australia",
      canonical: `${baseDomain}/blog`
    }
  };

  return metaConfigs[path] || metaConfigs['/'];
};

// Enhanced structured data for weight loss clinic
export const getStructuredData = (path: string) => {
  const baseDomain = "https://www.downscale.com.au";
  
  const baseOrganization = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Downscale Weight Loss Clinic - Australia",
    "alternateName": ["Downscale Weight Loss Clinic", "Professional Weight Loss Clinic"],
    "url": baseDomain,
    
    "email": "office@downscale.com.au",
    "description": "Professional weight loss & weight maintenance clinic providing Medicare bulk billed initial consultations. Expert Nurse Practitioner-led weight management via telehealth across Australia.",
    "medicalSpecialty": ["Weight Loss", "Weight Management", "Obesity Treatment", "Telehealth Medicine"],
    "priceRange": "$0-$80",
    "paymentAccepted": ["Medicare", "Credit Card", "Debit Card"],
    "serviceArea": {
      "@type": "Country", 
      "name": "Australia"
    }
  };

  if (path.includes('weight-loss-clinic-')) {
    const city = path.split('weight-loss-clinic-')[1];
    const cityCapitalized = city.charAt(0).toUpperCase() + city.slice(1);
    
    return {
      ...baseOrganization,
      "@type": ["MedicalClinic", "LocalBusiness"],
      "name": `Downscale Weight Loss Clinic - ${cityCapitalized}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cityCapitalized,
        "addressCountry": "AU"
      },
      "areaServed": {
        "@type": "City",
        "name": cityCapitalized
      }
    };
  }

  return baseOrganization;
};

// Weight loss clinic specific FAQ data
export const getWeightLossClinicFAQ = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What weight loss clinic services does Downscale Weight Loss Clinic provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Downscale Weight Loss Clinic is a professional weight loss & weight maintenance clinic, offering evidence-based telehealth consultations with experienced Nurse Practitioner Justin Black. We provide Medicare bulk billed initial consultations across all Australian states."
      }
    },
    {
      "@type": "Question",
      "name": "How much does a weight loss clinic cost in Australia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our initial weight loss clinic consultations are Medicare bulk billed, meaning initial appointments cost $0 to eligible patients. Follow-up consultations start from $80."
      }
    },
    {
      "@type": "Question",
      "name": "Can I access a weight loss clinic online in Australia?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Downscale Weight Loss Clinic operates as a professional telehealth weight loss & weight maintenance clinic. You can access our services via telehealth from anywhere in Australia."
      }
    }
  ]
});