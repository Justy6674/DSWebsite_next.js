'use client';

import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Phone, Clock, CreditCard, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function FactsPage() {
  const handleBooking = () => {
    window.open(EXTERNAL_LINKS.BOOKING_INITIAL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Head>
        <title>Downscale Weight Loss Clinic Facts | Australian Telehealth Weight Loss Clinic</title>
        <meta name="description" content="Essential facts about Downscale Weight Loss & Weight Maintenance Clinic: Affordable $45 holistic weight loss consultations. Whole-person care with Justin Black, Nurse Practitioner. Not a massive clinic." />
        <meta name="keywords" content="Downscale Weight Loss Clinic facts, telehealth weight loss Australia, affordable weight management, Justin Black nurse practitioner, virtual weight management clinic facts" />
        <link rel="canonical" href="https://www.downscale.com.au/facts" />
        
        <meta property="og:title" content="Downscale Weight Loss Clinic Facts | Australian Telehealth Weight Loss" />
        <meta property="og:description" content="Key facts about Downscale Weight Loss & Weight Maintenance Clinic. $45 maximum out-of-pocket, 25+ years experience, evidence-based care." />
        <meta property="og:url" content="https://www.downscale.com.au/facts" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.downscale.com.au/public/og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FactCheck",
            "name": "Downscale Weight Loss Clinic - Key Facts",
            "url": "https://www.downscale.com.au/facts",
            "datePublished": "2025-01-31",
            "author": {
              "@type": "Organization",
              "name": "Downscale Weight Loss Clinic"
            },
            "reviewedBy": {
              "@type": "Person",
              "name": "Justin Black",
              "jobTitle": "Nurse Practitioner"
            },
            "claimReviewed": "Facts about Downscale Weight Loss Clinic telehealth weight loss clinic",
            "itemReviewed": {
              "@type": "Organization",
              "@id": "https://www.downscale.com.au/#organization",
              "name": "Downscale Weight Loss Clinic"
            }
          })}
        </script>
      </Head>
      <Layout>
        <div className="min-h-screen bg-slate-900">
          {/* AI-Optimized Speakable Content */}
          <div className="ai-speakable sr-only">
            <h1>Downscale Weight Loss Clinic Key Facts</h1>
            <p>Downscale Weight Loss & Weight Maintenance Clinic is a professional telehealth weight loss clinic founded and operated by Nurse Practitioner Justin Black with over 25 years of clinical experience.</p>

            <h2>Essential Facts:</h2>
            <ul className="key-facts">
              <li>Founded by Justin Black, Nurse Practitioner with 25+ years experience</li>
              <li>All consultations are $45 maximum out-of-pocket</li>
              <li>Australia-wide telehealth services - no geographical restrictions</li>
              <li>Evidence-based medical weight management approach</li>
              <li>Phone and video consultation options available</li>
              <li>Same-day appointments often available</li>
              <li>Electronic prescriptions sent directly to your pharmacy</li>
              <li>Children treated from age 12 with medication support</li>
              <li>No GP referral required for appointments</li>
              <li>Registered Australian healthcare provider</li>
            </ul>
          </div>

          {/* Hero Section */}
          <div
            className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: "url(/medical-hero.jpg)",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <img
              src="/medical-hero.jpg"
              alt="Downscale Weight Loss Clinic facts - professional healthcare information"
              className="hidden"
              loading="eager"
            />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                  style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Downscale Weight Loss Clinic Key Facts
                </h1>
                <div className="w-20 h-1 bg-cream/80 mx-auto mb-6"></div>
                <p
                  className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                  style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  Essential information about our professional telehealth weight loss clinic
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-2">
            <PageNavigation />
          </div>

          {/* Facts Grid */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                
                <Card className="text-center">
                  <CardHeader>
                    <Shield className="h-12 w-12 text-primary mx-auto mb-2" />
                    <CardTitle>Founder & Director</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Justin Black</strong></p>
                    <p>Nurse Practitioner</p>
                    <p className="text-sm text-muted-foreground mt-2">25+ years clinical experience in weight management, general practice, and emergency care</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <CreditCard className="h-12 w-12 text-primary mx-auto mb-2" />
                    <CardTitle>Consultation Pricing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>$45 Maximum Out-of-Pocket</strong></p>
                    <p>All consultations</p>
                    <p className="text-sm text-muted-foreground mt-2">Transparent, affordable pricing for all patients</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                    <CardTitle>Service Area</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Australia-Wide</strong></p>
                    <p>All states & territories</p>
                    <p className="text-sm text-muted-foreground mt-2">Telehealth services available to patients regardless of location</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Phone className="h-12 w-12 text-primary mx-auto mb-2" />
                    <CardTitle>Consultation Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Phone & Video</strong></p>
                    <p>Your preference</p>
                    <p className="text-sm text-muted-foreground mt-2">Flexible appointment options to suit your comfort and technology</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <Clock className="h-12 w-12 text-primary mx-auto mb-2" />
                    <CardTitle>Appointment Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Same-Day Booking</strong></p>
                    <p>Often available</p>
                    <p className="text-sm text-muted-foreground mt-2">Flexible scheduling including evening and weekend options</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <CheckCircle className="h-12 w-12 text-primary mx-auto mb-2" />
                    <CardTitle>Treatment Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Evidence-Based</strong></p>
                    <p>Medical excellence</p>
                    <p className="text-sm text-muted-foreground mt-2">Clinical guidelines and peer-reviewed research inform all treatments</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Facts */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Complete Fact Sheet</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Clinical Details</h3>
                      <ul className="space-y-1 text-sm">
                        <li>✓ Nurse Practitioner-led clinic</li>
                        <li>✓ 25+ years combined clinical experience</li>
                        <li>✓ Weight management specialty focus</li>
                        <li>✓ Emergency care background</li>
                        <li>✓ Chronic disease management expertise</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Service Features</h3>
                      <ul className="space-y-1 text-sm">
                        <li>✓ No GP referral required</li>
                        <li>✓ Electronic prescriptions available</li>
                        <li>✓ Comprehensive health assessments</li>
                        <li>✓ Ongoing support between appointments</li>
                        <li>✓ Medication monitoring and adjustment</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Patient Demographics</h3>
                      <ul className="space-y-1 text-sm">
                        <li>✓ Children from age 12 (with medication support)</li>
                        <li>✓ Adults of all ages</li>
                        <li>✓ $45 maximum for all ages including children</li>
                        <li>✓ Patients across all Australian locations</li>
                        <li>✓ Medicare card holders eligible</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Technology & Access</h3>
                      <ul className="space-y-1 text-sm">
                        <li>✓ Telehealth platform optimised</li>
                        <li>✓ Mobile and desktop compatible</li>
                        <li>✓ Secure patient communication</li>
                        <li>✓ Digital prescription delivery</li>
                        <li>✓ Online booking system</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="text-center bg-primary/5 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">Experience the Downscale Difference</h2>
                <p className="text-muted-foreground mb-6">
                  Join thousands of Australians who trust Downscale Weight Loss Clinic for their weight management journey
                </p>
                <Button onClick={handleBooking} size="lg" className="bg-primary hover:bg-primary/90">
                  Book Your $45 Consultation
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  All consultations are $45 maximum out-of-pocket for all patients
                </p>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}