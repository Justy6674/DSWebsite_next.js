'use client';

import Head from "next/head";
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Phone, Calendar, Heart, Award } from 'lucide-react';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function WeightLossClinicTownsville() {
  const handleBooking = (type: 'initial' | 'followup' | 'gp') => {
    const urls = {
      initial: 'https://www.halaxy.com/book/drjustinblack/nurse-practitioner/588841?service=4779433',
      followup: 'https://www.halaxy.com/book/drjustinblack/nurse-practitioner/588841?service=4779434',
      gp: 'https://www.halaxy.com/book/drjustinblack/nurse-practitioner/588841?service=4779432'
    };
    window.open(urls[type], '_blank');
  };

  return (
    <>
      <Head>
        <title>Weight Loss Clinic Townsville | $45 Affordable Holistic Telehealth | Downscale</title>
        <meta name="description" content="Affordable holistic weight loss clinic serving Townsville. $45 consultations with Justin Black, Nurse Practitioner. Whole-person care approach - not a massive clinic. Kind, evidence-based treatment." />
        <meta name="keywords" content="telehealth weight loss clinic Townsville, weight loss clinic Townsville, Townsville telehealth weight management, weight loss clinic Townsville QLD" />
        <link rel="canonical" href="https://www.downscale.com.au/weight-loss-clinic-townsville" />
        
        <meta property="og:title" content="Weight Loss Clinic Townsville | $45 Affordable Holistic Care" />
        <meta property="og:description" content="Affordable holistic weight loss clinic serving Townsville. $45 consultations with Justin Black, Nurse Practitioner. Whole-person care - kind, evidence-based treatment. Not a massive clinic." />
        <meta property="og:url" content="https://www.downscale.com.au/weight-loss-clinic-townsville" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.downscale.com.au/public/og-image.jpg" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "Downscale Weight Loss Clinic - Townsville Telehealth Services",
              "description": "Professional telehealth weight loss clinic serving Townsville, Queensland residents with consultations from only $45",
              "url": "https://www.downscale.com.au/weight-loss-clinic-townsville",
              "telephone": "1300-DOWNSCALE",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Townsville",
                "addressRegion": "Queensland", 
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-19.2590",
                "longitude": "146.8169"
              },
              "areaServed": {
                "@type": "City",
                "name": "Townsville",
                "addressRegion": "QLD",
                "addressCountry": "Australia"
              },
              "medicalSpecialty": "Weight Management and Telehealth Services",
              "availableService": {
                "@type": "MedicalProcedure",
                "name": "Telehealth Weight Loss Consultation",
                "description": "Professional weight loss consultation via telehealth for Townsville residents"
              },
              "sameAs": [
                "https://www.facebook.com/445168355337624",
                "https://www.instagram.com/downscale_weightloss"
              ]
            }
          `}
        </script>
      </Head>
      <Layout>
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="container mx-auto max-w-6xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Weight Loss Clinic Townsville
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Professional telehealth weight loss consultations for Townsville residents. Book with Nurse Practitioner Justin Black - consultations from only $45 with instant Medicare rebate processing.
              </p>
              
              {/* Key Benefits */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                <Card className="border-primary/20">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Accessible Pricing — Only $45</h3>
                    <p className="text-sm text-muted-foreground">All consultations from $45</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Same Day Booking</h3>
                    <p className="text-sm text-muted-foreground">Available appointments</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Telehealth</h3>
                    <p className="text-sm text-muted-foreground">No travel required</p>
                  </CardContent>
                </Card>
                <Card className="border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Evidence Based</h3>
                    <p className="text-sm text-muted-foreground">Proven treatments</p>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Button 
                  size="lg" 
                  onClick={() => handleBooking('initial')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                >
                  Book Initial Consultation (Max $45 Out-of-Pocket)
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => handleBooking('followup')}
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
                >
                  Book Follow-up Consultation
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
              <h2 className="text-2xl font-bold mb-6 text-center">Our Townsville Service Area</h2>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238435.82264891763!2d146.81806!3d-19.2590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6bd5e09e3f7e1e1f%3A0x5017d681632bfc0!2sTownsville%20QLD!5e0!3m2!1sen!2sau!4v1234567890"
                  width="100%"
                  height="450"
                  style={{border:0}}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Downscale Weight Loss Clinic Townsville service area"
                  className="w-full"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Telehealth service available across all Townsville & North QLD • No travel required
              </p>
            </div>
          </section>

          {/* Townsville Specific Content */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-foreground">Serving Townsville & North Queensland</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Our telehealth weight loss clinic proudly serves Townsville and the broader North Queensland region, bringing professional weight management care directly to your home.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Townsville CBD and all suburbs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Magnetic Island</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Ayr & Burdekin region</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Charters Towers & surrounds</span>
                    </div>
                  </div>
                </div>
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Our Townsville Service?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Heart className="h-5 w-5 text-red-500 mt-1" />
                        <div>
                          <h4 className="font-semibold">Regional Healthcare Access</h4>
                          <p className="text-sm text-muted-foreground">Bridging healthcare gaps for North Queensland residents</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Defense Community Support</h4>
                          <p className="text-sm text-muted-foreground">Supporting military families and defense personnel</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-semibold">Medicare affordable consultationing</h4>
                          <p className="text-sm text-muted-foreground">No out-of-pocket costs for initial consultations</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking CTA */}
              <Card className="bg-accent/5 border-accent/20">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
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
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Weight Loss Journey in Townsville?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Book your telehealth consultation today. No travel required - professional care from the comfort of your home.
              </p>
              <Button 
                size="lg" 
                onClick={() => handleBooking('initial')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-xl"
              >
                Book Your Consultation Now
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                ✓ Medicare affordable consultationed initial consultation ✓ Same-day bookings available ✓ Secure telehealth platform
              </p>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}