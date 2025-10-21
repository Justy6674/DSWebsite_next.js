export const SEO_CONFIG = {
  // Page-specific SEO configurations
  pages: {
    '/': {
      title: 'Telehealth Weight Loss & Weight Maintenance Clinic Australia - Justin Black',
      description: 'Affordable, holistic weight loss clinic. $45 consultations with Justin Black, Nurse Practitioner. Whole-person care approach - kind, evidence-based treatment. Not a massive clinic - you\'ll always see the same practitioner.',
      keywords: 'telehealth weight loss clinic Australia, weight maintenance clinic, online weight loss clinic Australia, telehealth weight loss Australia, online weight management'
    },
    '/about': {
      title: 'About Downscale Weight Loss Clinic - Meet Justin Black, Nurse Practitioner',
      description: 'Led by Justin Black, an experienced Nurse Practitioner with 25+ years in healthcare. Personal weight loss journey from 116kg to 78kg. AHPRA registered.',
      keywords: 'weight loss nurse practitioner, Justin Black, AHPRA registered, weight loss specialist'
    },
    '/services': {
      title: 'Weight Loss Services - Medical, Nutrition, Exercise & Mental Health',
      description: 'Affordable holistic weight loss services - $45 consultations. Medical management, nutrition, exercise, mental health support. Whole-person care approach with Justin Black, Nurse Practitioner.',
      keywords: 'weight loss services, medical weight management, nutrition counselling, exercise programs'
    },
    '/blog': {
      title: 'Weight Loss Blog - Evidence-Based Articles & Tips',
      description: 'Expert weight loss advice, latest research, success stories, and practical tips from healthcare professionals. Updated weekly.',
      keywords: 'weight loss blog, weight management tips, obesity research, healthy lifestyle'
    },
    '/faq': {
      title: 'Frequently Asked Questions - Weight Loss Clinic FAQ',
      description: 'Common questions about our weight loss services, Medicare billing, telehealth consultations, and treatment options answered.',
      keywords: 'weight loss FAQ, Medicare bulk billing questions, telehealth FAQ'
    },
    '/how-it-works': {
      title: 'How Telehealth Weight Loss Works - 4 Simple Steps',
      description: 'Start your affordable weight loss journey in 4 steps: Book $45 consultation, meet Justin Black via telehealth, get personalised holistic plan, receive ongoing whole-person support.',
      keywords: 'how telehealth works, online weight loss process, book weight loss consultation'
    },
    '/terms': {
      title: 'Terms and Conditions',
      description: 'Terms and conditions for Downscale Weight Loss Clinic weight loss clinic services.',
      noindex: true
    },
    '/privacy': {
      title: 'Privacy Policy',
      description: 'Privacy policy for Downscale Weight Loss Clinic. How we collect, use, and protect your personal information.',
      noindex: true
    },
    '/data-deletion': {
      title: 'Data Deletion Request',
      description: 'Request deletion of your personal data from Downscale Weight Loss Clinic systems.',
      noindex: true
    },
    '/complaints': {
      title: 'Complaints and Feedback',
      description: 'How to provide feedback or lodge a complaint about Downscale Weight Loss Clinic services.',
      noindex: true
    }
  },
  
  // Location page SEO template
  locationTemplate: (city: string) => ({
    title: `Telehealth Weight Loss Clinic ${city} - Professional Medicare`,
    description: `Affordable, holistic weight loss clinic serving ${city}. $45 consultations with Justin Black, Nurse Practitioner. Whole-person care approach - not a massive clinic. Kind, evidence-based treatment for all Australians.`,
    keywords: `telehealth weight loss clinic ${city}, weight loss clinic ${city}, ${city} telehealth weight management, weight loss clinic ${city}`
  }),
  
  // Service page SEO template
  serviceTemplate: (service: string) => ({
    title: `${service} - Downscale Weight Loss Clinic Services`,
    description: `Affordable ${service.toLowerCase()} with holistic whole-person approach. $45 consultations with Justin Black, Nurse Practitioner. Kind, evidence-based care - not a massive clinic.`,
    keywords: `${service.toLowerCase()}, weight loss ${service.toLowerCase()}, ${service.toLowerCase()} Australia`
  }),
  
  // Default meta tags
  defaults: {
    title: 'Telehealth Weight Loss & Weight Maintenance Clinic Australia - Professional',
    description: 'Affordable, holistic telehealth weight loss clinic. $45 consultations with Justin Black, Nurse Practitioner. Whole-person care - kind, evidence-based treatment. Not a massive clinic.',
    keywords: 'telehealth weight loss clinic Australia, weight maintenance clinic, telehealth Australia, weight loss online',
    image: 'https://www.downscale.com.au/og-image.png',
    twitterCard: 'summary_large_image'
  },
  
  // Structured data templates
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'MedicalBusiness',
      name: 'Downscale Weight Loss Clinic - Online Weight Loss Clinic',
      alternateName: 'Virtual Weight Loss Clinic Australia',
      url: 'https://www.downscale.com.au',
      logo: 'https://www.downscale.com.au/logo.png',
      founder: {
        '@type': 'Person',
        'name': 'Justin Black',
        'jobTitle': 'Nurse Practitioner & Founder',
        'hasCredential': 'Masters Nursing Science (Nurse Practitioner)'
      },
      
      email: 'office@downscale.com.au',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AU',
        addressRegion: 'Australia'
      },
      medicalSpecialty: 'Online Weight Management and Virtual Healthcare',
      priceRange: '$0-$80',
      openingHours: 'Mo-Fr 09:00-17:00',
      serviceType: 'Virtual Healthcare',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Online Weight Loss Services',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Virtual Initial Consultation',
            price: '0',
            priceCurrency: 'AUD',
            description: 'Affordable holistic consultation - whole-person care approach'
          },
          {
            '@type': 'Offer',
            name: 'Telehealth Follow-up Consultation',
            price: '38.60',
            priceCurrency: 'AUD',
            description: '$45 affordable telehealth follow-up - kind, personalized care'
          }
        ]
      }
    }
  }
};