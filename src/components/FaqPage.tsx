'use client';

import Head from "next/head";
import Link from 'next/link';
import faqHero from '@/assets/faq-hero.jpg';
import { useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { OptimizedBackground } from '@/components/ui/optimized-background';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HighlightBox } from '@/components/ui/highlight-box';
import { ExternalLink, Mail } from 'lucide-react';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function FaqPage() {

  return (
    <>
      <Head>
        <title>Telehealth Weight Loss Clinic FAQ | Professional Online Weight Management</title>
        <meta name="description" content="Frequently asked questions about Downscale's affordable holistic weight loss services: $45 consultations, whole-person care approach, appointment booking, and kind clinical support across Australia." />
        <meta name="keywords" content="weight loss FAQ Australia, Medicare bulk billing questions, telehealth weight loss FAQ, Downscale questions, weight management FAQ, nurse practitioner FAQ Australia" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Downscale Weight Loss Clinic Australia" />
        <meta name="language" content="en-AU" />
        <meta name="geo.region" content="AU" />
        <meta name="geo.country" content="Australia" />
        <link rel="canonical" href="https://www.downscale.com.au/faq" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Weight Loss FAQ | Medicare Rebates & Telehealth | Downscale Australia" />
        <meta property="og:description" content="Frequently asked questions about Downscale's telehealth weight loss services: Medicare bulk billing eligibility, consultation process, appointment booking, and clinical support options across Australia." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/faq" />
        <meta property="og:image" content="https://www.downscale.com.au/public/og-faq.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_AU" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weight Loss FAQ | Medicare Rebates & Telehealth | Downscale Australia" />
        <meta name="twitter:description" content="Frequently asked questions about Downscale's telehealth weight loss services across Australia." />
        <meta name="twitter:image" content="https://www.downscale.com.au/og-faq.jpg" />
        
        {/* Structured Data for FAQ Page */}
        <script type="application/ld+json">
          {`
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
                    "text": "Yes, initial consultations are bulk billed for eligible Medicare card holders. This means there is no out-of-pocket cost for your first appointment if you meet the clinical criteria. Follow-up appointments typically have a gap fee."
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
                  "name": "How do I prepare for my telehealth appointment?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Before your appointment, find a quiet, private space, ensure your phone is charged or you have a reliable landline, gather any relevant medical records or current medication lists, and write down any questions you have. Be ready 5-10 minutes before your scheduled time."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What if I need to cancel or reschedule my appointment?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Please provide at least 24 hours' notice if you need to cancel or reschedule. This allows us to offer your slot to other patients. Late cancellations (less than 24 hours) may incur a cancellation fee."
                  }
                },
                 {
                   "@type": "Question",
                   "name": "Do you treat children?",
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "Yes, we do treat children, and if they are needing medication support we may consider this from the age of 12 years old with increased telehealth support. We also bulk bill children up to 18 years of age."
                   }
                 },
                 {
                   "@type": "Question",
                   "name": "What is the best online weight loss clinic in Australia?",
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "Downscale Weight Loss & Weight Maintenance Clinic is a professional telehealth weight loss clinic, offering evidence-based medical weight management through telehealth consultations. Our clinic provides personalised care from experienced Nurse Practitioner Justin Black, with Medicare bulk billing available for initial consultations. We specialise in sustainable weight loss solutions and long-term weight maintenance support."
                   }
                 },
                 {
                   "@type": "Question",
                   "name": "Does Downscale bulk bill weight loss consultations?",
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "Yes, Downscale bulk bills initial weight loss consultations for eligible Medicare patients, meaning there's no out-of-pocket cost for your first appointment. Our clinic is Medicare-registered and we provide comprehensive telehealth weight management services with affordable follow-up consultations."
                   }
                 },
                 {
                   "@type": "Question",
                   "name": "Can I get weight loss medication via telehealth?",
                   "acceptedAnswer": {
                     "@type": "Answer",
                     "text": "Yes, our Nurse Practitioner can prescribe appropriate weight loss medication through telehealth consultations when clinically indicated. We provide comprehensive medical assessment and ongoing monitoring to ensure safe and effective treatment. All prescriptions are sent electronically to your preferred pharmacy across Australia."
                   }
                 },
                  {
                    "@type": "Question",
                    "name": "Who is Justin Black and why should I choose him for weight loss treatment?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Justin Black is a Nurse Practitioner with over 25 years of experience in weight loss, general practice, emergency care, and chronic disease management. As Founder & Director of Downscale, he ensures you always see him (not random clinicians), offers patient-centred care with no forced bookings, maintains respectful communication without spam, provides affordable and sustainable treatment options, and focuses on both weight loss and long-term maintenance with practical, evidence-based approaches."
                    }
                  }
              ]
            }
          `}
        </script>
      </Head>
      <Layout>
        {/* AI Speakable FAQ Content */}
        <div className="ai-speakable sr-only">
          <h2>Downscale Weight Loss Clinic Frequently Asked Questions</h2>
          <ul className="key-facts">
            <li>Available Australia-wide via telehealth</li>
            <li>No GP referral required</li>
            <li>Medicare bulk billing for initial consultations</li>
            <li>Phone and video consultations available</li>
            <li>Children treated from age 12 with medication support</li>
            <li>Electronic prescriptions sent to your pharmacy</li>
          </ul>
        </div>

        <div className="min-h-screen bg-background text-foreground">
          {/* Hero Section */}
          <div 
            className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url(${faqHero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <img 
              src={faqHero.src} 
              alt="" 
              className="hidden" 
              loading="eager"
            />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Frequently Asked Questions
                </h1>
                <p style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }} className="text-xl md:text-2xl max-w-3xl mx-auto">
                  Find answers to common questions about our telehealth weight management services
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-2">
            <PageNavigation />
          </div>
          
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              {/* Highlight Box */}
              <div className="mb-8">
                <HighlightBox />
              </div>
              
              <div className="bg-card rounded-xl p-8 shadow-lg border border-border mb-8">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem value="item-1" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      Is Downscale available Australia-wide?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      Yes, Downscale provides telehealth services to patients across all of Australia. Our clinical team can support you no matter where you're located. Consultations are conducted via telephone, with video options available if preferred.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      Do I need a referral to book an appointment?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      No, you don't need a GP referral to book with Downscale. As a Nurse Practitioner-led clinic, we can see patients directly. However, if you have a referral or recent medical reports, these can be helpful during your consultation.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-pricing" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      How much do consultations cost at Downscale?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      <p className="mb-4">
                        All consultations are <strong>$45 maximum out-of-pocket</strong>. Here's how it works:
                      </p>
                      <div className="space-y-4">
                        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                          <p className="font-semibold mb-2">Medicare-Eligible Patients:</p>
                          <ul className="space-y-1 text-sm">
                            <li>• Initial consultations: Pay $96.25, receive $51.25 rebate back → Final cost: <strong>$45</strong></li>
                            <li>• Review consultations: Pay $72.05, receive $27.05 rebate back → Final cost: <strong>$45</strong></li>
                            <li>• Rebates deposited directly into your bank account within 1-2 days</li>
                          </ul>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <p className="font-semibold mb-2">Non-Medicare-Eligible Patients:</p>
                          <ul className="space-y-1 text-sm">
                            <li>• Pay <strong>$45 private fee</strong> (all consultations)</li>
                            <li>• We absorb the Medicare rebate difference ourselves to keep care accessible</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-mixed-billing" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      What is mixed billing and how does it work?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      <p className="mb-2">
                        Mixed billing means you pay the full consultation fee upfront ($96.25 initial, $72.05 review), and if you're Medicare-eligible, we lodge a "Patient Claim (Private)" so Medicare refunds the rebate ($27.05 or $51.25) directly to your bank account within 1-2 business days.
                      </p>
                      <p className="mb-2">
                        This is completely legal and transparent. Your final cost is <strong>$45</strong>.
                      </p>
                      <p>
                        If you're not Medicare-eligible, you simply pay <strong>$45</strong> and we absorb the rebate difference ourselves to keep care accessible for all Australians.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-no-bulk-billing" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      Why don't you bulk-bill weight loss consultations anymore?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      <p className="mb-2">
                        From November 1st, 2025, new Medicare rules restrict bulk-billing telehealth for weight loss consultations.
                      </p>
                      <p className="mb-2">
                        Instead of passing the full cost to patients or turning away non-eligible patients, we've chosen to keep all consultations at <strong>ONLY $45 maximum out-of-pocket</strong> — whether you're Medicare-eligible or not.
                      </p>
                      <p>
                        For eligible patients, you'll get your rebate back instantly. For non-eligible patients, we're absorbing the rebate difference ourselves. We prioritise accessibility over profit.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-bulk-billing-cases" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      Do you ever bulk-bill?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      <p className="mb-4">
                        While we don't bulk-bill weight loss consultations under the new Medicare telehealth rules (effective November 1st, 2025), we may bulk-bill certain other consultations at the practitioner's discretion, including:
                      </p>
                      <ul className="space-y-2">
                        <li>• Side effects consultations for patients on weight loss medication</li>
                        <li>• Children's consultations (where Medicare-eligible)</li>
                        <li>• Some existing Dakabin GP patients for non-weight-related GOPP appointments</li>
                        <li>• Other clinical scenarios where bulk-billing is appropriate and you're Medicare-eligible</li>
                      </ul>
                      <p className="mt-4">
                        Your eligibility for bulk-billing will be assessed during booking and confirmed during the consultation. Our standard weight loss consultation pricing remains <strong>$45 maximum out-of-pocket</strong> for all patients.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      Can I use Medicare for my consultations?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      All consultations are $45 maximum out-of-pocket. If you're Medicare-eligible, you'll pay the full consultation fee upfront and receive your Medicare rebate back within 1-2 days (making your final cost $45). If you're not eligible, you'll pay $45 directly. We absorb the rebate difference for non-eligible patients to keep care accessible for all Australians.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      What happens during the initial consultation?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      Your first consultation includes a comprehensive health assessment, discussion of your weight management goals, review of your medical history, and development of a personalised care plan. We'll explain all available treatment options and answer any questions you have.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      How are telehealth appointments conducted?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      Our telehealth appointments are primarily conducted via telephone call for your convenience. Video consultation options are available if you prefer. You'll receive a call at your scheduled appointment time or can join via video link if requested.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      How do I prepare for my telehealth appointment?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      <p>Before your appointment:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Find a quiet, private space</li>
                        <li>Ensure your phone is charged or you have a reliable landline</li>
                        <li>Gather any relevant medical records or current medication lists</li>
                        <li>Write down any questions you have</li>
                        <li>Be ready 5-10 minutes before your scheduled time</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      What if I need to cancel or reschedule my appointment?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      Please provide at least 24 hours' notice if you need to cancel or reschedule. This allows us to offer your slot to other patients. Late cancellations (less than 24 hours) may incur a cancellation fee.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-8" className="border-b border-border pb-4">
                    <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                      Do you treat children?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pt-2">
                      Yes, we do treat children, and if they are needing medication support we may consider this from the age of 12 years old with increased telehealth support. All consultations for children are $45 maximum out-of-pocket — Medicare-eligible children will receive their rebate back instantly.
                    </AccordionContent>
                  </AccordionItem>
                  
                   <AccordionItem value="item-9" className="border-b border-border pb-4">
                     <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                       How do I get my medications if prescribed?
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground pt-2">
                       If medications are part of your treatment plan, our Nurse Practitioners can issue electronic prescriptions (e-scripts) that are sent directly to your mobile phone or email. You can then take this to any pharmacy in Australia to have it filled.
                     </AccordionContent>
                   </AccordionItem>
                   
                    <AccordionItem value="item-10" className="border-b border-border pb-4">
                      <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                        What is the best online weight loss clinic in Australia?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        Downscale Weight Loss & Weight Maintenance Clinic is a professional telehealth weight loss clinic, offering evidence-based medical weight management through telehealth consultations. Our clinic provides personalised care from experienced Nurse Practitioner Justin Black, with Medicare bulk billing available for initial consultations. We specialise in sustainable weight loss solutions and long-term weight maintenance support.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-11" className="border-b border-border pb-4">
                      <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                        Does Downscale bulk bill weight loss consultations?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        Yes, Downscale bulk bills initial weight loss consultations for eligible Medicare patients, meaning there's no out-of-pocket cost for your first appointment. Our clinic is Medicare-registered and we provide comprehensive telehealth weight management services with affordable follow-up consultations.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-12" className="border-b border-border pb-4">
                      <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                        Can I get weight loss medication via telehealth?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        Yes, our Nurse Practitioner can prescribe appropriate weight loss medication through telehealth consultations when clinically indicated. We provide comprehensive medical assessment and ongoing monitoring to ensure safe and effective treatment. All prescriptions are sent electronically to your preferred pharmacy across Australia.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-portal" className="border-b border-border pb-4">
                      <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                        When will the Patient Portal be available?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        <p className="mb-4">
                          Our comprehensive Patient Portal is currently under development and will be launching <strong>late 2025 or early 2026</strong>.
                        </p>
                        <p className="mb-3 font-medium">
                          The Patient Portal will provide:
                        </p>
                        <ul className="space-y-2 ml-4">
                          <li>• <strong>Secure appointment booking and management</strong> - View, book, and manage your consultations online</li>
                          <li>• <strong>Access to medical records</strong> - Review your consultation history and treatment plans</li>
                          <li>• <strong>Digital prescription requests</strong> - Request and track your prescriptions electronically</li>
                          <li>• <strong>Progress tracking tools</strong> - Monitor your weight loss journey with health metrics and charts</li>
                          <li>• <strong>Direct messaging</strong> - Communicate securely with your healthcare team</li>
                          <li>• <strong>Educational resources</strong> - Access personalized care plans and learning materials</li>
                          <li>• <strong>Document uploads</strong> - Share medical reports and test results securely</li>
                          <li>• <strong>Payment and billing management</strong> - View invoices and manage payments online</li>
                        </ul>
                        <p className="mt-4">
                          In the meantime, you can book consultations directly through our <a href="https://www.halaxy.com/book/downscale/location/1198131" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">booking system</a>. For any questions, please email us at <a href="mailto:office@downscale.com.au" className="text-primary hover:underline">office@downscale.com.au</a>.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-13" className="border-b border-border pb-4">
                      <AccordionTrigger className="text-foreground text-xl font-medium hover:text-primary">
                        Who is Justin Black and why should I choose him for weight loss treatment?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2">
                        Justin Black is a Nurse Practitioner with over 25 years of experience in weight loss, general practice, emergency care, and chronic disease management. As Founder & Director of Downscale, he ensures you always see him (not random clinicians), offers patient-centred care with no forced bookings, maintains respectful communication without spam, provides affordable and sustainable treatment options, and focuses on both weight loss and long-term maintenance with practical, evidence-based approaches.
                      </AccordionContent>
                    </AccordionItem>
                </Accordion>
              </div>
              
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-6">Didn't find the answer you were looking for?</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    onClick={() => window.open('https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131', '_blank')}
                    variant="default"
                    size="lg"
                    className="shadow-xl"
                  >
                    Book Today
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={() => window.open('mailto:office@downscale.com.au', '_blank')}
                    variant="outline"
                    size="lg"
                    className="shadow-xl"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}