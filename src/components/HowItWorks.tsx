'use client';

import Head from "next/head";
import howHero from '@/assets/how-it-works-hero.jpg';
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Video, FileText, MessageSquare, Calendar, CreditCard } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function HowItWorks() {
  const handleBooking = () => {
    window.open(EXTERNAL_LINKS.BOOKING_INITIAL, '_blank', 'noopener,noreferrer');
  };

  const steps = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "1. Book Your Consultation",
      description: "Choose a convenient time for your telehealth appointment. Initial consultations are 100% bulk billed with Medicare.",
      details: [
        "Book online 24/7",
        "Same-day appointments available",
        "Choose phone or video consultation",
        "Receive confirmation instantly"
      ]
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "2. Complete Health Assessment",
      description: "Fill out our comprehensive health questionnaire before your appointment to help us understand your needs.",
      details: [
        "Medical history review",
        "Current medications",
        "Weight history and goals",
        "Lifestyle assessment"
      ]
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "3. Telehealth Consultation",
      description: "Meet with Justin Black, our experienced Nurse Practitioner, via secure video call from the comfort of your home.",
      details: [
        "45-minute initial consultation",
        "Comprehensive health review",
        "Personalised treatment plan",
        "All questions answered"
      ]
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "4. Ongoing Support",
      description: "Regular follow-ups and continuous support throughout your weight management journey.",
      details: [
        "Regular check-ins",
        "Plan adjustments as needed",
        "Email support between visits",
        "Progress monitoring"
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>How It Works - Telehealth Weight Loss Process | Downscale Weight Loss Clinic</title>
        <meta name="description" content="Learn how our affordable holistic telehealth weight loss consultations work. Simple 4-step process: Book $45 consultation, health assessment, video consultation, ongoing whole-person support." />
        <meta name="keywords" content="how telehealth works, online weight loss consultation process, bulk billed telehealth, weight loss clinic process, medicare telehealth consultations" />
        <link rel="canonical" href="https://www.downscale.com.au/how-it-works" />
        
        <meta property="og:title" content="How Our Telehealth Weight Loss Process Works" />
        <meta property="og:description" content="Simple 4-step process to start your weight loss journey. Book online, complete assessment, video consultation, ongoing support. Medicare bulk billed." />
        <meta property="og:url" content="https://www.downscale.com.au/how-it-works" />
        <meta property="og:type" content="website" />
      </Head>
      <Layout>
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <div 
            className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: `url(${howHero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <img 
              src={howHero} 
              alt="" 
              className="hidden" 
              fetchPriority="high"
              loading="eager"
            />
            
            <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}>
                How Our Telehealth Process Works
              </h1>
              <p className="text-xl mb-8" style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}>
                Start your weight loss journey in 4 simple steps. 
                No travel required, consult from anywhere in Australia.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-2">
            <PageNavigation />
          </div>

          {/* Steps Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-primary/5 p-8 flex items-center justify-center md:w-48">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <CardHeader>
                          <CardTitle className="text-2xl">{step.title}</CardTitle>
                          <p className="text-muted-foreground">{step.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-3">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* What to Expect Section */}
          <section className="py-16 px-4 bg-muted/50">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-12">
                What to Expect During Your Consultation
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Initial Consultation (45 mins)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p>✓ Comprehensive health assessment</p>
                    <p>✓ Discussion of your weight history</p>
                    <p>✓ Review of current medications</p>
                    <p>✓ Explanation of treatment options</p>
                    <p>✓ Personalised plan development</p>
                    <p>✓ Q&A - all questions answered</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Follow-up Consultations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p>✓ Progress review and monitoring</p>
                    <p>✓ Treatment plan adjustments</p>
                    <p>✓ Address any concerns</p>
                    <p>✓ Prescription management</p>
                    <p>✓ Ongoing motivation & support</p>
                    <p>✓ Next steps planning</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Technology Requirements */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-12">
                Simple Technology Requirements
              </h2>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                      <Video className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Device</h3>
                      <p className="text-sm text-muted-foreground">
                        Computer, tablet or smartphone with camera
                      </p>
                    </div>
                    <div>
                      <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Internet</h3>
                      <p className="text-sm text-muted-foreground">
                        Stable internet connection for video calls
                      </p>
                    </div>
                    <div>
                      <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">Location</h3>
                      <p className="text-sm text-muted-foreground">
                        Quiet, private space for your consultation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Medicare & Billing */}
          <section className="py-16 px-4 bg-primary/5">
            <div className="container mx-auto max-w-4xl text-center">
              <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-6">
                Medicare Bulk Billing Available
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your initial consultation is 100% bulk billed with a valid Medicare card. 
                No out-of-pocket expenses for your first appointment.
              </p>
              <Button 
                onClick={handleBooking}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Book Your Free Initial Consultation
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Follow-up consultations may have a small gap payment
              </p>
            </div>
          </section>

          {/* FAQ Preview */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-12">
                Common Questions
              </h2>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How long before I can get an appointment?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We often have same-day appointments available. Most patients can be seen within 24-48 hours of booking.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do I need a referral from my GP?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No referral needed. As a Nurse Practitioner, Justin can see you directly and bulk bill your consultation.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What if I'm not tech-savvy?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Don't worry! We can do phone consultations if video is challenging. Our team can also help you with the technology.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <a href="/faq">View All FAQs</a>
                </Button>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 px-4 bg-gradient-to-b from-background to-primary/5">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of Australians who have chosen Downscale Weight Loss Clinic
              </p>
              <Button 
                onClick={handleBooking}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Book Your Consultation Now
              </Button>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}