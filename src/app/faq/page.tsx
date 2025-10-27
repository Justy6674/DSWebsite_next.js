import { Metadata } from 'next';
import FaqPage from '@/components/FaqPage';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Downscale Weight Loss Clinic',
  description: 'Find answers to common questions about our telehealth weight loss services, Medicare rebates, consultations, and treatments.',
  alternates: {
    canonical: 'https://www.downscale.com.au/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | Downscale Weight Loss Clinic',
    description: 'Find answers to common questions about our telehealth weight loss services, Medicare rebates, consultations, and treatments.',
    url: 'https://www.downscale.com.au/faq',
    type: 'website',
    siteName: 'Downscale Weight Loss Clinic',
    images: [
      {
        url: 'https://www.downscale.com.au/og-faq.jpg?v=2',
        secureUrl: 'https://www.downscale.com.au/og-faq.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - Downscale Weight Loss Clinic',
        type: 'image/jpeg',
      },
    ],
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | Downscale Weight Loss Clinic',
    description: 'Find answers to common questions about our telehealth weight loss services, Medicare rebates, consultations, and treatments.',
    images: [
      {
        url: 'https://www.downscale.com.au/og-faq.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions - Downscale Weight Loss Clinic',
      },
    ],
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
  other: {
    'script:ld+json': JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Downscale Weight Loss Clinic",
        "url": "https://www.downscale.com.au",
        "logo": "https://www.downscale.com.au/logo.png",
        "description": "Professional telehealth weight loss clinic offering affordable consultations from $45 with Medicare rebates available across Australia.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AU",
          "addressRegion": "Australia"
        },
        "telephone": "+61-0-example",
        "email": "office@downscale.com.au",
        "sameAs": [
          "https://www.halaxy.com/book/downscale"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Weight Loss Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "MedicalService",
                "name": "Telehealth Weight Loss Consultation",
                "description": "Professional weight management consultation via telehealth"
              },
              "price": "45",
              "priceCurrency": "AUD"
            }
          ]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Downscale Weight Loss Clinic",
        "url": "https://www.downscale.com.au",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.downscale.com.au/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is Downscale available Australia-wide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Downscale provides telehealth services to patients across all of Australia. Our clinical team can support you no matter where you're located. Consultations are conducted via telephone, with video options available if preferred."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need a referral to book an appointment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, you don't need a GP referral to book with Downscale. As a Nurse Practitioner-led clinic, we can see patients directly. However, if you have a referral or recent medical reports, these can be helpful during your consultation."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use Medicare for my consultations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All consultations are $45 maximum out-of-pocket. If you're Medicare-eligible, you'll pay the full consultation fee upfront and receive your Medicare rebate back within 1-2 days. If you're not eligible, you pay $45 directly."
            }
          },
          {
            "@type": "Question",
            "name": "What happens during the initial consultation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Your first consultation includes a comprehensive health assessment, discussion of your weight management goals, review of your medical history, and development of a personalised care plan. We'll explain all available treatment options and answer any questions you have."
            }
          },
          {
            "@type": "Question",
            "name": "How are telehealth appointments conducted?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our telehealth appointments are primarily conducted via telephone call for your convenience. Video consultation options are available if you prefer. You'll receive a call at your scheduled appointment time or can join via video link if requested."
            }
          },
          {
            "@type": "Question",
            "name": "Can I get weight loss medication via telehealth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our Nurse Practitioner can prescribe appropriate weight loss medication through telehealth consultations when clinically indicated. We provide comprehensive medical assessment and ongoing monitoring to ensure safe and effective treatment. All prescriptions are sent electronically to your preferred pharmacy across Australia."
            }
          }
        ]
      }
    ])
  },
};

export default function FaqPagePage() {
  return <FaqPage />;
}