'use client';

import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle } from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";

export function Hero() {
  const handleBookingRedirect = () => {
    window.open(EXTERNAL_LINKS.BOOKING_INITIAL, "_blank", "noopener,noreferrer");
  };

  const benefits = [
    "Nurse Practitioner-led clinical care",
    "Evidence-based weight management approach", 
    "Ongoing support and monitoring",
    "Australian clinical guidelines compliance"
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 mobile-container">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8 animate-mobile-slide-up">
          <div className="pill-beach mb-4">
            🇦🇺 Telehealth Australia-wide
          </div>
          <h1 className="heading-beach font-bold mb-4 sm:mb-6 leading-tight">
            Professional Weight Management Support in{" "}
            <span className="text-accent">Australia</span>
          </h1>
          
          <p className="mobile-text text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
            Evidence-based clinical weight management consultations led by experienced 
            Australian Nurse Practitioners. Comprehensive support for your weight loss journey 
            with ongoing monitoring and personalised care plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 text-left animate-mobile-fade-in">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start sm:items-center space-x-3 p-2 rounded-lg hover:bg-card/30 transition-colors">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="text-foreground font-medium text-sm sm:text-base leading-relaxed">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4 animate-mobile-slide-up">
          <Button 
            onClick={handleBookingRedirect}
            size="lg"
            variant="booking"
            className="mobile-button text-lg sm:text-xl px-6 sm:px-8 py-4 sm:py-6 font-semibold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Start your weight loss consultation - Opens booking form in new window"
          >
            Start Your Consultation
            <ExternalLink className="ml-2 h-5 w-5" aria-hidden="true" />
          </Button>
          
          <p className="text-sm sm:text-base text-muted-foreground">
            Medicare bulk-billed initial consultation available
          </p>
        </div>
      </div>
    </section>
  );
}