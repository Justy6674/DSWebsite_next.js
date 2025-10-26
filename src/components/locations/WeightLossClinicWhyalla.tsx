'use client';

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, Phone, Clock, CreditCard } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function WeightLossClinicWhyalla() {
  const handleBooking = (type: 'initial' | 'followup' | 'gp') => {
    const urls = {
      initial: EXTERNAL_LINKS.BOOKING_INITIAL,
      followup: EXTERNAL_LINKS.BOOKING_FOLLOWUP,
      gp: EXTERNAL_LINKS.BOOKING_GP
    };
    window.open(urls[type], '_blank', 'noopener,noreferrer');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div
          className="relative min-h-[60vh] flex items-center justify-center text-center text-white"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(/weight-loss-clinic-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
                Weight Loss Clinic <span style={{ color: '#f7f2d3' }}>Whyalla</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: '#f8fafc' }}>
              Professional telehealth weight loss support for Whyalla and the Spencer Gulf. Consultations from $45 for industrial community health.
            </p>
          </div>
          {/* Breadcrumbs overlaid on hero */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="container mx-auto">
              <PageNavigation />
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Industrial Town Care</h3>
                  <p className="text-sm text-muted-foreground">Only $45 consultations</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Shift Work Friendly</h3>
                  <p className="text-sm text-muted-foreground">Steel worker schedules</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Spencer Gulf Expertise</h3>
                  <p className="text-sm text-muted-foreground">Industrial community</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">No Adelaide Travel</h3>
                  <p className="text-sm text-muted-foreground">3.5hr drive saved</p>
                </CardContent>
              </Card>
            </div>

            {/* Industrial Community Health */}
            <div className="bg-muted/30 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4 text-center">Industrial Community Health Challenges</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Whyalla Health Facts:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Steel industry shift work patterns</li>
                    <li>• Limited specialist healthcare access</li>
                    <li>• 3.5 hours from Adelaide specialists</li>
                    <li>• Industrial work stress factors</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Our Industrial-Focused Solutions:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Shift-worker meal planning</li>
                    <li>• High-protein diets for steelworkers</li>
                    <li>• Stress management strategies</li>
                    <li>• No need to travel to Adelaide</li>
                  </ul>
                </div>
              </div>
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

        {/* Whyalla Specific Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center" style={{ color: '#f7f2d3' }}>
              Serving the Spencer Gulf Industrial Community
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Areas We Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>✓ Whyalla & Port Pirie</p>
                  <p>✓ Port Augusta & Port Lincoln</p>
                  <p>✓ Roxby Downs & Andamooka</p>
                  <p>✓ Coober Pedy mining area</p>
                  <p>✓ Eyre Peninsula towns</p>
                  <p>✓ All Spencer Gulf region</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Downscale Whyalla?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>✓ Industrial worker health understanding</p>
                  <p>✓ Shift work schedule accommodation</p>
                  <p>✓ Same quality care as Adelaide</p>
                  <p>✓ Prescription delivery to industrial sites</p>
                  <p>✓ Blue-collar worker focused plans</p>
                  <p>✓ Medicare bulk billing available</p>
                </CardContent>
              </Card>
            </div>

            {/* Booking CTA */}
            <div className="bg-primary/5 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-muted-foreground mb-6">
                Expert weight loss care designed for industrial community lifestyles.
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
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#f7f2d3' }}>
              Expert Weight Loss Care for the Spencer Gulf
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              South Australia's first dedicated industrial town telehealth weight loss clinic
            </p>
            <Button
              onClick={() => handleBooking('initial')}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Book Your $45 Consultation
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Industrial-focused care • No travel to Adelaide • Medicare rebates available
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}