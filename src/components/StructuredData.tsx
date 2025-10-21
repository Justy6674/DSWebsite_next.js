'use client';

import React from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

/**
 * JSON-LD Structured Data Component
 * Renders structured data as JSON-LD script tag
 */
export const StructuredData: React.FC<{
  children?: React.ReactNode;
}> = ({
  data,
  children
}) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
    />
  );
};

// Predefined structured data schemas for Downscale Weight Loss Clinic

/**
 * Organization Schema for homepage
 */
export const OrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Downscale Weight Loss Clinic",
    "alternateName": "Downscale Weight Loss Clinic",
    "url": "https://www.downscale.com.au/",
    "logo": "https://www.downscale.com.au/og-image.jpg",
    "image": "https://www.downscale.com.au/og-image.jpg",
    "description": "Medicare bulk billed weight loss clinic led by experienced Nurse Practitioner. Evidence-based medical weight management via telehealth across Australia.",
    "email": "office@downscale.com.au",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "QLD",
      "addressLocality": "Brisbane",
      "postalCode": "4000"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "medicalSpecialty": ["Weight Management", "General Practice", "Telehealth"],
    "priceRange": "$0-$80",
    "paymentAccepted": ["Medicare", "Credit Card", "Debit Card"],
    "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
    "sameAs": [
      "https://www.facebook.com/445168355337624",
      "https://www.instagram.com/downscale_weightloss",
      "https://www.downscale.com.au/about",
      "https://www.downscale.com.au/justin-black-nurse-practitioner"
    ]
  };

  return <StructuredData data={organizationData} />;
};

/**
 * WebSite Schema with SearchAction for homepage
 */
export const WebSiteSchema = () => {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Downscale Weight Loss Clinic",
    "url": "https://www.downscale.com.au/",
    "description": "Professional telehealth weight loss clinic offering Medicare bulk billed consultations with experienced healthcare professionals.",
    "publisher": {
      "@type": "MedicalBusiness",
      "name": "Downscale Weight Loss Clinic"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.downscale.com.au/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return <StructuredData data={websiteData} />;
};

/**
 * Speakable Schema for AI voice assistants - Key Q&A
 */
interface SpeakableSchemaProps {
  mainTopic: string;
  keyFacts: string[];
}

export const SpeakableSchema: React.FC<{
  children?: React.ReactNode;
}> = ({
  mainTopic,
  keyFacts,
  children
}) => {
  const speakableData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": mainTopic,
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".ai-speakable", ".key-facts"],
      "xpath": [
        "//div[@class='ai-speakable']",
        "//ul[@class='key-facts']"
      ]
    },
    "mainEntity": {
      "@type": "Question",
      "name": mainTopic,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": keyFacts.join(". ")
      }
    }
  };

  return <StructuredData data={speakableData} />;
};

/**
 * MedicalClinic Schema for service/clinic pages
 */
export const MedicalClinicSchema = () => {
  const medicalClinicData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Downscale Weight Loss Clinic",
    "url": "https://www.downscale.com.au/",
    "description": "Specialised weight management clinic providing telehealth services across Australia with Medicare bulk billing available.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Brisbane",
      "addressRegion": "QLD", 
      "addressCountry": "AU",
      "postalCode": "4000"
    },
    "areaServed": "AU",
    "telemedicineService": true,
    "medicalSpecialty": ["Weight Management", "General Practice", "Clinical Assessment"],
    "availableService": [
      {
        "@type": "MedicalTherapy",
        "name": "Weight Management Assessment",
        "description": "Comprehensive clinical assessment and individualised care planning"
      },
      {
        "@type": "MedicalTherapy", 
        "name": "Nutrition Assessment",
        "description": "Evidence-based nutrition guidance and dietary assessment"
      },
      {
        "@type": "MedicalTherapy",
        "name": "Lifestyle Support",
        "description": "Behavioural support for sustainable health improvements"
      }
    ],
    "email": "office@downscale.com.au",
    "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
    "paymentAccepted": ["Medicare", "Credit Card", "Debit Card"]
  };

  return <StructuredData data={medicalClinicData} />;
};

/**
 * FAQPage Schema for FAQ sections
 */
interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQPageSchema: React.FC<{
  children?: React.ReactNode;
}> = ({
  faqs,
  children
}) => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <StructuredData data={faqData} />;
};

/**
 * Service Schema for individual service pages
 */
interface ServiceSchemaProps {
  serviceName: string;
  description: string;
  serviceType?: string;
}

export const ServiceSchema: React.FC<{
  children?: React.ReactNode;
}> = ({
  serviceName,
  description,
  serviceType = "MedicalTherapy",
  children
}) => {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": serviceType,
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Downscale Weight Loss Clinic",
      "url": "https://www.downscale.com.au/"
    },
    "areaServed": {
      "@type": "Country", 
      "name": "Australia"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceType": "Telehealth",
      "availableLanguage": "en-AU"
    }
  };

  return <StructuredData data={serviceData} />;
};

/**
 * BreadcrumbList Schema for navigation
 */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema: React.FC<{
  children?: React.ReactNode;
}> = ({
  items,
  children
}) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <StructuredData data={breadcrumbData} />;
};

/**
 * LocalBusiness Schema for location-specific pages
 */
interface LocalBusinessSchemaProps {
  city: string;
  state: string;
  postalCode?: string;
}

export const LocalBusinessSchema: React.FC<{
  children?: React.ReactNode;
}> = ({
  city,
  state,
  postalCode,
  children
}) => {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": `Downscale Weight Loss Clinic - ${city}`,
    "url": `https://www.downscale.com.au/weight-loss-clinic-${city.toLowerCase().replace(/\s+/g, '-')}`,
    "description": `Telehealth weight loss clinic serving ${city}, ${state}. Medicare bulk billed consultations available.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": "AU",
      ...(postalCode && { "postalCode": postalCode })
    },
    "areaServed": {
      "@type": "City",
      "name": city,
      "containedInPlace": {
        "@type": "State",
        "name": state,
        "containedInPlace": {
          "@type": "Country",
          "name": "Australia"
        }
      }
    },
    "telemedicineService": true,
    "medicalSpecialty": ["Weight Management", "General Practice"],
    
    "email": "office@downscale.com.au"
  };

  return <StructuredData data={localBusinessData} />;
};

/**
 * Enhanced Article Schema for Blog Posts - AI Optimized
 */
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
}

export const ArticleSchema: React.FC<{
  children?: React.ReactNode;
}> = ({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  category,
  tags,
  featuredImage,
  children
}) => {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://www.downscale.com.au/about",
      "jobTitle": "Nurse Practitioner",
      "sameAs": [
        "https://www.downscale.com.au/justin-black-nurse-practitioner"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Downscale Weight Loss Clinic",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.downscale.com.au/og-image.jpg"
      },
      "url": "https://www.downscale.com.au"
    },
    "image": featuredImage || "https://www.downscale.com.au/og-image.jpg",
    "articleSection": category,
    "keywords": tags.join(", "),
    "reviewedBy": {
      "@type": "Person",
      "name": "Justin Black",
      "jobTitle": "Nurse Practitioner",
      "affiliation": {
        "@type": "Organization",
        "name": "Downscale Weight Loss Clinic"
      }
    },
    "citation": [
      {
        "@type": "WebPage",
        "name": "Australian Government Department of Health",
        "url": "https://www.health.gov.au"
      },
      {
        "@type": "WebPage", 
        "name": "Royal Australian College of General Practitioners",
        "url": "https://www.racgp.org.au"
      }
    ]
  };

  return <StructuredData data={articleData} />;
};

// Utility function to validate structured data
export const validateStructuredData = (data: Record<string, any>) => {
  const required = ['@context', '@type'];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    console.warn('Structured data missing required fields:', missing);
    return false;
  }
  
  return true;
};

export default StructuredData;