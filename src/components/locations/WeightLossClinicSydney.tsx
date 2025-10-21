'use client';

import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, Phone, Clock, CreditCard } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function WeightLossClinicSydney() {
  const handleBooking = (type: 'initial' | 'followup' | 'gp') => {
    const urls = {
      initial: EXTERNAL_LINKS.BOOKING_INITIAL,
      followup: EXTERNAL_LINKS.BOOKING_FOLLOWUP,
      gp: EXTERNAL_LINKS.BOOKING_GP
    };
    window.open(urls[type], '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Head>
        <title>Weight Loss Clinic Sydney | $45 Affordable Holistic Telehealth | Downscale</title>
        <meta name="description" content="Affordable holistic weight loss clinic serving Sydney. $45 consultations with Justin Black, Nurse Practitioner. Whole-person care approach - not a massive clinic. Kind, evidence-based programs. Book online today." />
        <meta name="keywords" content="weight loss clinic sydney, weight loss clinic near me sydney, weight loss clinic bondi, weight loss clinic parramatta, weight loss clinic north shore, weight loss clinic eastern suburbs, bulk billed weight loss sydney, medicare weight loss doctor sydney, online weight loss consultation sydney, telehealth weight loss sydney" />
        <link rel="canonical" href="https://www.downscale.com.au/weight-loss-clinic-sydney" />
        
        <meta property="og:title" content="Weight Loss Clinic Sydney | $45 Affordable Holistic Care | Book Online" />
        <meta property="og:description" content="Affordable holistic weight loss clinic serving Sydney. $45 consultations with Justin Black, Nurse Practitioner. Whole-person care - kind, evidence-based treatment. Not a massive clinic." />
        <meta property="og:url" content="https://www.downscale.com.au/weight-loss-clinic-sydney" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.downscale.com.au/public/og-services.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weight Loss Clinic Sydney | Professional Telehealth Medicare" />
        <meta name="twitter:description" content="Professional telehealth weight loss clinic offering telehealth consultations. Consultations from only $45 with instant Medicare rebate processing." />
        <meta name="twitter:image" content="https://www.downscale.com.au/og-services.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalClinic", "LocalBusiness"],
            "name": "Downscale Weight Loss Clinic - Weight Loss Clinic Sydney",
            "description": "Professional telehealth weight loss clinic offering telehealth consultations and online appointments for weight management across NSW",
            "url": "https://www.downscale.com.au/weight-loss-clinic-sydney",
            
            "email": "office@downscale.com.au",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Sydney",
              "addressRegion": "NSW", 
              "addressCountry": "AU",
              "postalCode": "2000"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -33.8688,
              "longitude": 151.2093
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Sydney",
                "containedIn": {
                  "@type": "State",
                  "name": "New South Wales"
                }
              },
              {
                "@type": "Place",
                "name": "Greater Sydney"
              },
              {
                "@type": "Place", 
                "name": "Sydney CBD"
              },
              {
                "@type": "Place",
                "name": "Eastern Suburbs Sydney"
              },
              {
                "@type": "Place",
                "name": "Western Sydney"
              },
              {
                "@type": "Place",
                "name": "Northern Beaches Sydney"
              },
              {
                "@type": "Place",
                "name": "Inner West Sydney"
              }
            ],
            "medicalSpecialty": ["Weight Loss", "Weight Management", "Obesity Treatment"],
            "availableService": [
              {
                "@type": "MedicalProcedure",
                "name": "Weight Loss Clinic Consultation Sydney",
                "description": "Medicare bulk-billed weight management consultations via telehealth for Sydney residents"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Telehealth Weight Loss Assessment Sydney",
                "description": "Comprehensive telehealth weight loss assessments for Sydney patients"
              },
              {
                "@type": "MedicalProcedure",
                "name": "Online Weight Management Sydney",
                "description": "Ongoing telehealth weight management support for Sydney residents"
              }
            ],
            "priceRange": "$0-$80",
            "paymentAccepted": ["Medicare", "Private Health Insurance", "Credit Card"],
            "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
            "sameAs": [
              "https://www.facebook.com/445168355337624",
              "https://www.instagram.com/downscale_weightloss"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Weight Loss Clinic Services Sydney",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "MedicalTherapy",
                    "name": "Weight Loss Clinic Consultation Sydney"
                  },
                  "price": "0",
                  "priceCurrency": "AUD",
                  "availability": "https://schema.org/InStock"
                }
              ]
            }
          })}
        </script>
      </Head>
      <Layout>
        <div className="min-h-screen bg-background">
          {/* Location Hero */}
          <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h1 className="heading-beach">
                    Weight Loss Clinic <span className="heading-beach">Sydney</span>
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Professional telehealth weight loss support for Sydney residents. Consultations from $45 — Medicare-eligible patients receive instant rebates 
                  with experienced healthcare professionals. No travel required - consult from home.
                </p>
              </div>

              {/* Key Benefits */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Accessible Pricing — Only $45</h3>
                    <p className="text-sm text-muted-foreground">All consultations from $45</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Same Day Booking</h3>
                    <p className="text-sm text-muted-foreground">Available 7 days</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Telehealth</h3>
                    <p className="text-sm text-muted-foreground">Consult from home</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Evidence Based</h3>
                    <p className="text-sm text-muted-foreground">Clinical excellence</p>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => handleBooking('initial')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  Book Initial Consultation (Max $45 Out-of-Pocket)
                </Button>
                <Button 
                  onClick={() => handleBooking('followup')}
                  size="lg"
                  variant="outline"
                >
                  Book Follow-up
                </Button>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 py-2">
            <PageNavigation />
          </div>

          {/* Google Maps Section - CRITICAL FOR LOCAL SEO */}
          <section className="py-12 px-4 bg-muted/30" aria-label="Sydney service area map">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-centre">Our Sydney Service Area</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106357.77892668055!2d151.10909084999998!3d-33.8688197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d681632ccc0!2sSydney%20NSW!5e0!3m2!1sen!2sau!4v1234567890"
                  width="100%"
                  height="450"
                  style={{border:0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Downscale Weight Loss Clinic Sydney service area"
                  className="w-full"
                />
              </div>
              <p className="text-centre text-sm text-muted-foreground mt-4">
                Telehealth service available across all Sydney suburbs • No travel required
              </p>
            </div>
          </section>

          {/* Sydney Specific Content */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-centre heading-beach">
                Serving All Sydney Areas via Telehealth
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas We Service</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>✓ Sydney CBD & Inner West</p>
                    <p>✓ Eastern Suburbs & Beaches</p>
                    <p>✓ North Shore & Northern Beaches</p>
                    <p>✓ Western Sydney & Hills District</p>
                    <p>✓ South Sydney & Sutherland Shire</p>
                    <p>✓ Greater Sydney Region</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Downscale Sydney?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>✓ No traffic or parking hassles</p>
                    <p>✓ Flexible appointment times</p>
                    <p>✓ Same quality care as in-person</p>
                    <p>✓ Prescription delivery available</p>
                    <p>✓ Ongoing support between visits</p>
                    <p>✓ Sydney-based support team</p>
                  </CardContent>
                </Card>
              </div>

              {/* Booking CTA */}
              <div className="bg-primary/5 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Book your consultation today and take the first step towards your weight loss goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => handleBooking('initial')}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Book Initial Consultation
                  </Button>
                  <Button 
                    onClick={() => handleBooking('followup')}
                    size="lg"
                    variant="outline"
                  >
                    Book Follow-up
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 px-4 bg-primary/5">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-4 heading-beach">
                Start Your Weight Loss Journey Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Sydney's most caring weight loss clinic is just a click away
              </p>
              <Button 
                onClick={() => handleBooking('initial')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Book Your Bulk Billed Consultation
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Medicare rebates available • Same-day appointments • 100% online
              </p>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}