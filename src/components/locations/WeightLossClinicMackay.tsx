'use client';

import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, Phone, Clock, CreditCard } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";

export default function WeightLossClinicMackay() {
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
        <title>Weight Loss Clinic Mackay | Online Virtual Medicare Consultations</title>
        <meta name="description" content="Mackay telehealth weight loss clinic with Nurse Practitioner care. Consultations from only $45 with instant Medicare rebate processing for Mackay residents. Professional weight management support." />
        <meta name="keywords" content="weight loss clinic mackay, mackay weight loss clinic, telehealth weight loss clinic mackay, medicare weight loss clinic mackay, online weight management mackay" />
        <link rel="canonical" href="https://www.downscale.com.au/weight-loss-clinic-mackay" />
        
        <meta property="og:title" content="Weight Loss Clinic Mackay | Professional Telehealth Medicare Consultations" />
        <meta property="og:description" content="Professional telehealth weight loss clinic offering telehealth consultations. Consultations from only $45 with instant Medicare rebate processing for Mackay residents." />
        <meta property="og:url" content="https://www.downscale.com.au/weight-loss-clinic-mackay" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.downscale.com.au/public/hero-family-sunset.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weight Loss Clinic Mackay | Professional Telehealth Medicare" />
        <meta name="twitter:description" content="Professional telehealth weight loss clinic offering telehealth consultations. Consultations from only $45 with instant Medicare rebate processing." />
        <meta name="twitter:image" content="https://www.downscale.com.au/hero-family-sunset.png" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalClinic", "LocalBusiness"],
            "name": "Downscale Weight Loss Clinic - Weight Loss Clinic Mackay",
            "description": "Professional telehealth weight loss clinic offering telehealth consultations and online appointments for weight management across Central Queensland",
            "url": "https://www.downscale.com.au/weight-loss-clinic-mackay",
            "email": "office@downscale.com.au",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Mackay",
              "addressRegion": "QLD",
              "addressCountry": "AU",
              "postalCode": "4740"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -21.1410,
              "longitude": 149.1861
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Mackay",
                "containedIn": {
                  "@type": "State",
                  "name": "Queensland"
                }
              },
              {
                "@type": "Place",
                "name": "Central Queensland"
              }
            ],
            "medicalSpecialty": ["Weight Loss", "Weight Management", "Obesity Treatment"],
            "availableService": [
              {
                "@type": "MedicalProcedure",
                "name": "Weight Loss Clinic Consultation Mackay",
                "description": "Medicare affordable consultationed weight management consultations via telehealth for Mackay residents"
              }
            ],
            "priceRange": "$0-$80",
            "paymentAccepted": ["Medicare", "Private Health Insurance", "Credit Card"],
            "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
            "sameAs": [
              "https://www.facebook.com/445168355337624",
              "https://www.instagram.com/downscale_weightloss"
            ]
          })}
        </script>
      </Head>
      <Layout>
        <div className="min-h-screen bg-background">
          <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h1 className="heading-beach">
                    Weight Loss Clinic <span className="heading-beach">Mackay</span>
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Professional telehealth weight loss support for Mackay residents. Consultations from $45 — Medicare-eligible patients receive instant rebates 
                  with experienced healthcare professionals. No travel required - consult from home.
                </p>
              </div>

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

          {/* Google Maps Section */}
          <section className="py-12 px-4 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Mackay Service Area</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114632.87264891763!2d149.18610!3d-21.1410!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b93a9d7f3e1e1e1%3A0x5017d681632bfc0!2sMackay%20QLD!5e0!3m2!1sen!2sau!4v1234567890"
                  width="100%"
                  height="450"
                  style={{border:0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Downscale Weight Loss Clinic Mackay service area"
                  className="w-full"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Telehealth service available across all Mackay & Central Queensland • No travel required
              </p>
            </div>
          </section>

          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center heading-beach">
                Serving Mackay & Central Queensland via Telehealth
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas We Service</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>✓ Mackay CBD</p>
                    <p>✓ North Mackay</p>
                    <p>✓ Slade Point</p>
                    <p>✓ Ooralea</p>
                    <p>✓ Central Queensland</p>
                    <p>✓ Whitsunday Region</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Downscale Mackay?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>✓ No travel to Brisbane specialists</p>
                    <p>✓ Regional healthcare expertise</p>
                    <p>✓ Flexible appointment times</p>
                    <p>✓ Prescription delivery available</p>
                    <p>✓ Ongoing support between visits</p>
                    <p>✓ Evidence-based care</p>
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

          <section className="py-16 px-4 bg-primary/5">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-4 heading-beach">
                Start Your Weight Loss Journey Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Mackay's most caring weight loss clinic is just a click away
              </p>
              <Button 
                onClick={() => handleBooking('initial')}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Book Your $45 Consultation
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Affordable pricing • Same-day appointments • 100% online
              </p>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}