'use client';

import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/sections/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, Phone, Clock, CreditCard } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function WeightLossClinicNewcastle() {
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
        <title>Weight Loss Clinic Newcastle | $45 Affordable Holistic Telehealth | Downscale</title>
        <meta name="description" content="Affordable holistic weight loss clinic serving Newcastle. $45 consultations with Justin Black, Nurse Practitioner. Whole-person care approach - not a massive clinic. Kind, evidence-based programs. Book online today." />
        <meta name="keywords" content="weight loss clinic newcastle, bulk billed weight loss newcastle, medicare weight loss doctor newcastle, online weight loss consultation newcastle, weight loss clinic near me newcastle, affordable weight loss clinic newcastle, telehealth weight loss newcastle, prescription weight loss newcastle, nurse practitioner newcastle" />
        <link rel="canonical" href="https://www.downscale.com.au/weight-loss-clinic-newcastle" />
        
        <meta property="og:title" content="Weight Loss Clinic Newcastle | $45 Affordable Holistic Care | Book Online" />
        <meta property="og:description" content="Affordable holistic weight loss clinic serving Newcastle. $45 consultations with Justin Black, Nurse Practitioner. Whole-person care - kind, evidence-based treatment. Not a massive clinic." />
        <meta property="og:url" content="https://www.downscale.com.au/weight-loss-clinic-newcastle" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "Downscale Weight Loss Clinic - Newcastle Weight Loss Clinic",
            "description": "$45 maximum out-of-pocket weight loss clinic serving Newcastle with telehealth consultations for Medicare-eligible patients",
            "url": "https://www.downscale.com.au/weight-loss-clinic-newcastle",
            
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Newcastle",
              "addressRegion": "NSW",
              "addressCountry": "AU"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-32.9283",
              "longitude": "151.7817"
            },
            "areaServed": {
              "@type": "City",
              "name": "Newcastle",
              "containedIn": {
                "@type": "State",
                "name": "New South Wales"
              }
            },
            "medicalSpecialty": "Weight Management",
            "availableService": {
              "@type": "MedicalProcedure",
              "name": "Telehealth Weight Loss Consultation",
              "description": "$45 maximum out-of-pocket weight management consultations via telehealth for Medicare-eligible patients"
            },
            "sameAs": [
              "https://www.facebook.com/445168355337624",
              "https://www.instagram.com/downscale_weightloss"
            ]
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
                    Weight Loss Clinic <span className="heading-beach">Newcastle</span>
                  </h1>
                </div>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Professional telehealth weight loss support for Newcastle residents. Consultations from $45 — Medicare-eligible patients receive instant rebates 
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

          {/* Google Maps Section */}
          <section className="py-12 px-4 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Newcastle Service Area</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107102.56473648282!2d151.77830!3d-32.9283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b7334c3e64e3e1f%3A0x5017d681632bfc0!2sNewcastle%20NSW!5e0!3m2!1sen!2sau!4v1234567890"
                  width="100%"
                  height="450"
                  style={{border:0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Downscale Weight Loss Clinic Newcastle service area"
                  className="w-full"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Telehealth service available across all Newcastle & Hunter Region • No travel required
              </p>
            </div>
          </section>

          {/* Newcastle Specific Content */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center heading-beach">
                Serving All Newcastle Areas via Telehealth
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas We Service</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>✓ Newcastle CBD & Inner City</p>
                    <p>✓ Lake Macquarie</p>
                    <p>✓ Port Stephens</p>
                    <p>✓ Maitland & Hunter Valley</p>
                    <p>✓ Charlestown & Kotara</p>
                    <p>✓ Greater Newcastle Region</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Downscale Newcastle?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>✓ No traffic or parking hassles</p>
                    <p>✓ Flexible appointment times</p>
                    <p>✓ Same quality care as in-person</p>
                    <p>✓ Prescription delivery available</p>
                    <p>✓ Ongoing support between visits</p>
                    <p>✓ Newcastle-based support team</p>
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
                Newcastle's most caring weight loss clinic is just a click away
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