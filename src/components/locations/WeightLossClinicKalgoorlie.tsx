'use client';

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MapPin, Phone, Clock, CreditCard } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function WeightLossClinicKalgoorlie() {
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
                Weight Loss Clinic <span style={{ color: '#f7f2d3' }}>Kalgoorlie</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: '#f8fafc' }}>
              Professional telehealth weight loss support for Kalgoorlie and the Goldfields. Consultations from $45 for mining community health.
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
                  <h3 className="font-semibold">Mining Town Healthcare</h3>
                  <p className="text-sm text-muted-foreground">Only $45 consultations</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Shift Work Friendly</h3>
                  <p className="text-sm text-muted-foreground">FIFO scheduling</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Goldfields Expertise</h3>
                  <p className="text-sm text-muted-foreground">Mining-focused care</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">No Travel Required</h3>
                  <p className="text-sm text-muted-foreground">600km+ from Perth</p>
                </CardContent>
              </Card>
            </div>

            {/* Mining Community Health */}
            <div className="bg-muted/30 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold mb-4 text-center">Goldfields Mining Community Health</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Kalgoorlie Health Challenges:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Remote location 600km from Perth</li>
                    <li>• Shift work disrupting meal patterns</li>
                    <li>• High-stress mining environment</li>
                    <li>• Limited specialist healthcare access</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Our Mining-Focused Solutions:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• FIFO-friendly scheduling</li>
                    <li>• High-protein meal plans for miners</li>
                    <li>• Stress management for goldfields workers</li>
                    <li>• No need to travel to Perth</li>
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

        {/* Kalgoorlie Specific Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center" style={{ color: '#f7f2d3' }}>
              Serving the Goldfields Mining Community
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Areas We Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>✓ Kalgoorlie & Boulder</p>
                  <p>✓ Coolgardie & Kambalda</p>
                  <p>✓ Leonora & Laverton</p>
                  <p>✓ Menzies & Broad Arrow</p>
                  <p>✓ All Eastern Goldfields</p>
                  <p>✓ Remote mining sites</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Why Choose Downscale Kalgoorlie?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>✓ Mining industry health understanding</p>
                  <p>✓ FIFO worker schedule accommodation</p>
                  <p>✓ Same quality care as Perth</p>
                  <p>✓ Prescription delivery to mining sites</p>
                  <p>✓ High-income earner focused plans</p>
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
                Expert weight loss care designed for goldfields mining lifestyles.
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
              Expert Weight Loss Care for the Goldfields
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Western Australia's first dedicated mining town telehealth weight loss clinic
            </p>
            <Button
              onClick={() => handleBooking('initial')}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Book Your $45 Consultation
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Mining-focused care • No travel to Perth • Medicare rebates available
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}