'use client';

import Head from "next/head";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Heart, Clock, Shield, AlertCircle } from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { Layout } from '@/components/layout/Layout';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function PricingPage() {
  const handleBookingRedirect = () => {
    window.open(EXTERNAL_LINKS.BOOKING, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      <Head>
        <title>Transparent Pricing $45 Per Consultation | Telehealth Weight Loss Clinic Australia</title>
        <meta name="description" content="All consultations $45 upfront. Medicare-eligible patients receive instant rebates ($51.25 initial, $27.05 reviews). Non-eligible patients still pay $45 — we absorb the difference." />
        <meta name="keywords" content="telehealth pricing australia, medicare rebate weight loss, nurse practitioner telehealth cost, australian healthcare pricing, weight management consultation fees, telehealth consultation australia" />
        <link rel="canonical" href="https://www.downscale.com.au/pricing" />
        <link rel="preload" as="image" href="/pricing-hero-mobile.webp" type="image/webp" />
        
        <meta property="og:title" content="Transparent Pricing $45 Per Consultation | Downscale Australia" />
        <meta property="og:description" content="All consultations $45 maximum out-of-pocket. Medicare-eligible patients receive instant rebate processing." />
        <meta property="og:url" content="https://www.downscale.com.au/pricing" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Downscale Weight Loss Clinic",
            "url": "https://www.downscale.com.au/pricing",
            "description": "Australian telehealth weight management services with transparent $45 pricing",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Telehealth Consultation Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "MedicalProcedure",
                    "name": "Initial Weight Loss Consultation",
                    "description": "30-minute telehealth consultation — $45 maximum out-of-pocket. Medicare-eligible patients receive $51.25 rebate back.",
                    "procedureType": "Telehealth Consultation"
                  },
                  "price": "45",
                  "priceCurrency": "AUD",
                  "availability": "https://schema.org/InStock",
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": "45",
                    "priceCurrency": "AUD",
                    "description": "Maximum out-of-pocket cost for all patients"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "MedicalProcedure",
                    "name": "Review Weight Loss Consultation",
                    "description": "15-minute telehealth follow-up — $45 maximum out-of-pocket. Medicare-eligible patients receive $27.05 rebate back.",
                    "procedureType": "Telehealth Consultation"
                  },
                  "price": "45",
                  "priceCurrency": "AUD",
                  "availability": "https://schema.org/InStock"
                }
              ]
            }
          })}
        </script>
      </Head>
      {/* Hero Section - Optimized for instant loading */}
      <section 
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/pricing-hero-mobile.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <img 
          src="/pricing-hero-mobile.webp" 
          alt="" 
          className="hidden" 
          loading="eager"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Professional Weight Loss Consultations — Only $45 Per Consultation
            </h1>
            <p style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }} className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Accessible, evidence-based weight management for all Australians. Medicare-eligible patients receive instant rebate processing — non-eligible patients still pay $45.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch max-w-6xl mx-auto px-4 pb-4 md:pb-6">
              <a 
                href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-80 min-h-[80px] md:min-h-[100px] border-4 border-amber-200 inline-flex flex-col items-center justify-center bg-gradient-to-br from-[#f5deb3] to-[#f7e7c5] md:hover:from-[#f7e7c5] md:hover:to-[#f5deb3] px-4 py-4 rounded-2xl shadow-2xl md:transition-all md:duration-300 md:hover:scale-105 md:hover:shadow-amber-500/50"
              >
                <span className="text-center mb-1 md:mb-2 text-lg md:text-xl text-slate-900 font-black">Initial Consultation</span>
                <span className="text-xs font-bold text-slate-800">30 Min Weight Loss Assessment</span>
              </a>
              
              <a 
                href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=472181"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-80 min-h-[80px] md:min-h-[100px] border-4 border-amber-700 inline-flex flex-col items-center justify-center bg-gradient-to-br from-[#b68a71] to-[#a87d64] md:hover:from-[#a87d64] md:hover:to-[#b68a71] px-4 py-4 rounded-2xl shadow-2xl md:transition-all md:duration-300 md:hover:scale-105 md:hover:shadow-amber-900/50"
              >
                <span className="text-center mb-1 md:mb-2 text-lg md:text-xl text-white font-black drop-shadow-md">Review Consultation</span>
                <span className="text-xs font-bold text-white drop-shadow-sm">15 Min Progress Check</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-2">
        <PageNavigation />
      </div>
      <div className="container mx-auto mobile-container space-y-16 py-12">
        {/* Main Pricing Cards */}
        <section className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="heading-beach font-bold mb-6">
              Transparent Pricing for All Australians
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Every consultation: $45 maximum out-of-pocket
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* CARD 1: INITIAL CONSULTATION */}
            <Card className="border-success/20 min-h-[400px]">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6">Initial Weight Loss Consultation</h3>
                
                <div className="mb-6">
                  <div className="text-5xl font-black text-primary mb-2">$45</div>
                  <p className="text-sm text-muted-foreground">Your maximum out-of-pocket cost</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <h4 className="font-semibold text-success mb-2">Medicare-Eligible Patients:</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Pay $96.25 upfront</li>
                      <li>✓ We process your Medicare rebate instantly</li>
                      <li>✓ Medicare deposits $51.25 into your account (1-2 days)</li>
                      <li><strong>✓ Your final cost: $45</strong></li>
                    </ul>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Non-Medicare-Eligible Patients:</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Pay $45 private fee</li>
                      <li>✓ We absorb the $51.25 rebate difference ourselves</li>
                      <li><strong>✓ Your cost: $45</strong></li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  30 minutes • Comprehensive health assessment • Personalised care plan
                </p>
              </CardContent>
            </Card>

            {/* CARD 2: REVIEW CONSULTATION */}
            <Card className="border-primary/20 min-h-[400px]">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6">Review Weight Loss Consultation</h3>
                
                <div className="mb-6">
                  <div className="text-5xl font-black text-primary mb-2">$45</div>
                  <p className="text-sm text-muted-foreground">Your maximum out-of-pocket cost</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <h4 className="font-semibold text-success mb-2">Medicare-Eligible Patients:</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Pay $72.05 upfront</li>
                      <li>✓ We process your Medicare rebate instantly</li>
                      <li>✓ Medicare deposits $27.05 into your account (1-2 days)</li>
                      <li><strong>✓ Your final cost: $45</strong></li>
                    </ul>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Non-Medicare-Eligible Patients:</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Pay $45 private fee</li>
                      <li>✓ We absorb the $27.05 rebate difference ourselves</li>
                      <li><strong>✓ Your cost: $45</strong></li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  15 minutes • Progress review • Treatment adjustments
                </p>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Our Philosophy Section */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center mb-6">Why We Structure Pricing This Way</h2>
              
              <div className="max-w-3xl mx-auto space-y-6">
                <p className="text-lg text-center">
                  As Nurse Practitioners, Bec and I believe healthcare should be <strong>accessible, transparent, and professional</strong>.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-background/80 p-6 rounded-lg border border-border">
                    <h3 className="font-semibold mb-3 text-lg">✓ Accessible</h3>
                    <p className="text-base text-muted-foreground">All consultations only $45 — we absorb costs for non-eligible patients</p>
                  </div>
                  <div className="bg-background/80 p-6 rounded-lg border border-border">
                    <h3 className="font-semibold mb-3 text-lg">✓ Transparent</h3>
                    <p className="text-base text-muted-foreground">You know exactly what you&apos;re paying upfront with instant Medicare processing</p>
                  </div>
                  <div className="bg-background/80 p-6 rounded-lg border border-border">
                    <h3 className="font-semibold mb-3 text-lg">✓ Professional</h3>
                    <p className="text-base text-muted-foreground">Evidence-based clinical care worth $96.25/$72.05 but accessible at $45</p>
                  </div>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 my-8">
                  <h3 className="font-semibold text-destructive mb-3 text-xl">The Reality:</h3>
                  <p className="text-base">
                    For non-Medicare-eligible patients, we&apos;re absorbing between <strong>$27.05 and $51.25 per consultation</strong> ourselves. Why? Because we prioritise patient accessibility over profit.
                  </p>
                </div>

                <p className="text-base">
                  We&apos;re building a sustainable clinic that puts patients first, allowing us to:
                </p>
                <ul className="space-y-2 ml-6 text-base">
                  <li>→ Develop free downloadable resources for our Downscale family</li>
                  <li>→ Create innovative tech tools and apps (coming 2026!)</li>
                  <li>→ Maintain clinical quality without forcing patients to choose between healthcare and affordability</li>
                </ul>

                <p className="text-center font-semibold mt-8 text-lg">
                  Your support helps us help more Australians. Thank you for being part of our Downscale family.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Medicare Eligibility Section */}
        <div className="mt-12">
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">Medicare Eligibility — Check if You Qualify for Instant Rebates</h3>
                <p className="text-muted-foreground max-w-3xl mx-auto mb-4">
                  From November 1st, 2025, Medicare rebates for telehealth weight loss consultations are only available under specific conditions. <strong>If you're not eligible, you still pay only $45</strong> — we absorb the rebate difference ourselves.
                </p>
              </div>

              {/* Eligibility Accordions */}
              <Accordion type="multiple" className="w-full space-y-4">
                
                {/* Sensitive/Sexual/Reproductive Health */}
                <AccordionItem value="sensitive-health" className="border border-pink-200 dark:border-pink-800 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-pink-500" />
                      <span className="font-semibold">Sensitive/Sexual/Reproductive Health — BROAD Exemption</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Medicare created an <strong>intentionally broad exemption</strong> for sensitive health issues. If weight is affecting your sexual function, fertility, or reproductive health, you likely qualify for Medicare rebates without a prior face-to-face visit.
                      </p>
                      
                      <div className="bg-pink-50 dark:bg-pink-950/20 p-4 rounded-lg">
                        <p className="text-sm text-pink-600 dark:text-pink-400">
                          <strong>Weight affecting fertility/sexual function ✅</strong> — If weight is impacting your sex life, libido, or fertility, this likely qualifies.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Disaster Zones */}
                <AccordionItem value="disaster-zones" className="border border-orange-200 dark:border-orange-800 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <span className="font-semibold">Disaster Zones</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Currently <strong>10 million people in Australia</strong> are in open disaster zones. We will check this properly during your appointment.
                      </p>
                      
                      <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg">
                        <p className="text-sm text-orange-600 dark:text-orange-400">
                          <strong>Feel free to check if you may be eligible at</strong> <a href="https://www.telecheck.com.au" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">www.telecheck.com.au</a>
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Seen in Person */}
                <AccordionItem value="seen-in-person" className="border border-green-200 dark:border-green-800 rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-semibold">Seen in Person Last 12 Months?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 pb-2">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        If you've seen any doctor in person in the last 12 months for any reason, you're eligible for Medicare rebates via telehealth.
                      </p>
                      
                      <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                        <p className="text-sm text-green-600 dark:text-green-400">
                          <strong>Special Note:</strong> If you are a patient of Justin at his General Practice job and have seen him in the last 12 months, you are eligible for a Medicare rebate.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Justin's Message */}
        <section className="space-y-6">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <h2 className="mobile-heading font-bold text-foreground">
                    A Message from Justin Black, Nurse Practitioner & Founder
                  </h2>
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <div className="prose prose-lg max-w-4xl mx-auto text-muted-foreground space-y-6">
                <p className="text-lg leading-relaxed">
                  The new Medicare rules from November 1st limit who can access rebates for telehealth weight loss care. I fundamentally disagree with this decision, but we've found a solution:
                </p>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 my-6">
                  <p className="text-xl font-bold text-center">
                    We're keeping all consultations at ONLY $45 — regardless of your Medicare eligibility.
                  </p>
                </div>

                <div className="space-y-4">
                  <p>
                    <strong>For eligible patients:</strong> You'll pay $96.25 (initial) or $72.05 (review) upfront, and Medicare will deposit your rebate directly into your account within 1-2 days. Your final cost: <strong>$45</strong>.
                  </p>
                  
                  <p>
                    <strong>For non-eligible patients:</strong> You'll pay only <strong>$45</strong> — we're absorbing the $27.05-$51.25 rebate difference ourselves.
                  </p>
                </div>

                <p className="mt-4">
                  <strong>Why?</strong> Because accessibility matters. As Nurse Practitioners, Bec and I are committed to keeping quality healthcare within reach for all Australians. We're taking a financial hit on every non-eligible consultation, but we believe it's the right thing to do.
                </p>

                <p className="mt-4">
                  Your support allows us to continue building free resources, innovative tech tools, and a sustainable clinic that prioritises patients over profit.
                </p>

                <p className="mt-6 text-center font-semibold">
                  Thank you for being part of our Downscale family.<br/>
                  — Justin
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={handleBookingRedirect}
            size="lg"
            className="text-lg px-8 py-6"
          >
            Book Your $45 Consultation Now
          </Button>
        </div>
      </div>
    </Layout>
  );
}