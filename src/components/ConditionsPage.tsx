'use client';

import Head from "next/head";
import React from 'react';
import { Layout } from "@/components/layout/Layout";
import { ConditionsWeTreat } from "@/components/ConditionsWeTreat";
import { OptimizedBackground } from "@/components/ui/optimized-background";
import { Button } from "@/components/ui/button";
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { 
  Heart, 
  Brain, 
  Activity, 
  Moon, 
  Zap,
  Target,
  Scale,
  Stethoscope,
  ArrowRight
} from 'lucide-react';
// Image served from /public/ for instant CDN loading

export default function ConditionsPage() {
  const detailedConditions = [
    {
      name: 'Obesity & Overweight',
      description: 'Comprehensive medical weight management using evidence-based approaches including lifestyle modification, nutritional counseling, and when appropriate, prescription medications.',
      symptoms: ['BMI ≥25 (overweight) or ≥30 (obese)', 'Difficulty losing weight', 'Weight-related health complications'],
      benefits: ['Reduced diabetes risk by up to 58%', 'Lower cardiovascular disease risk', 'Improved joint health and mobility', 'Better sleep quality'],
      icon: Scale,
      color: 'hsl(221, 83%, 53%)'
    },
    {
      name: 'Weight Maintenance',
      description: 'Specialised support for maintaining achieved weight loss through ongoing lifestyle coaching, metabolic monitoring, and behavioral strategies.',
      symptoms: ['Previous weight loss success', 'Fear of weight regain', 'Difficulty maintaining new habits'],
      benefits: ['Sustained weight loss results', 'Improved metabolic health', 'Enhanced quality of life', 'Reduced yo-yo dieting'],
      icon: Target,
      color: 'hsl(142, 76%, 36%)'
    },
    {
      name: 'PCOS (Polycystic Ovary Syndrome)',
      description: 'Targeted weight management for PCOS patients, addressing insulin resistance, hormone imbalances, and metabolic dysfunction.',
      symptoms: ['Irregular periods', 'Weight gain, especially around waist', 'Difficulty losing weight', 'Insulin resistance'],
      benefits: ['Improved fertility and ovulation', 'Regulated menstrual cycles', 'Reduced insulin resistance', 'Better hormone balance'],
      icon: Heart,
      color: 'hsl(346, 87%, 43%)'
    },
    {
      name: 'Perimenopause & Menopause',
      description: 'Hormone-aware weight management during menopause transition, addressing metabolic changes and weight distribution shifts.',
      symptoms: ['Weight gain during menopause', 'Increased abdominal fat', 'Slower metabolism', 'Hot flashes'],
      benefits: ['Reduced menopausal symptoms', 'Better bone health', 'Improved mood and energy', 'Maintained muscle mass'],
      icon: Activity,
      color: 'hsl(271, 91%, 65%)'
    },
    {
      name: 'ADHD & Weight Management',
      description: 'Specialised approaches for weight management in ADHD patients, considering medication effects, impulse control, and executive function.',
      symptoms: ['Weight changes from ADHD medications', 'Emotional eating', 'Difficulty with routine', 'Impulse control challenges'],
      benefits: ['Better medication effectiveness', 'Improved focus and concentration', 'Enhanced self-esteem', 'Stable mood regulation'],
      icon: Brain,
      color: 'hsl(25, 95%, 53%)'
    },
    {
      name: 'Sleep Apnoea',
      description: 'Weight loss strategies specifically targeting sleep apnoea improvement, with monitoring of sleep quality and breathing patterns.',
      symptoms: ['Loud snoring', 'Interrupted sleep', 'Daytime fatigue', 'Morning headaches'],
      benefits: ['Improved sleep quality', 'Reduced snoring and apnoea events', 'Better daytime energy', 'Reduced CPAP dependence'],
      icon: Moon,
      color: 'hsl(198, 93%, 60%)'
    },
    {
      name: 'Chronic Pain Management',
      description: 'Weight reduction to decrease joint stress and inflammation, improving pain management and mobility in chronic conditions.',
      symptoms: ['Joint pain and stiffness', 'Reduced mobility', 'Pain-related weight gain', 'Medication side effects'],
      benefits: ['Reduced pain levels', 'Improved joint function', 'Better mobility and independence', 'Reduced medication needs'],
      icon: Zap,
      color: 'hsl(14, 100%, 57%)'
    },
    {
      name: 'Hypertension (High Blood Pressure)',
      description: 'Comprehensive approach to blood pressure reduction through sustainable weight loss, dietary modifications, and lifestyle changes.',
      symptoms: ['Elevated blood pressure readings', 'Headaches', 'Shortness of breath', 'Medication dependence'],
      benefits: ['Lower blood pressure readings', 'Reduced cardiovascular risk', 'Potential medication reduction', 'Better heart health'],
      icon: Heart,
      color: 'hsl(173, 80%, 40%)'
    }
  ];

  return (
    <Layout>
      <Head>
        <title>Medical Conditions We Treat | Weight Loss Clinic Australia</title>
        <meta name="description" content="Comprehensive medical weight management for obesity, PCOS, menopause, ADHD, sleep apnoea, chronic pain, hypertension and more. Evidence-based treatment across Australia." />
        <meta name="keywords" content="medical conditions weight loss, obesity treatment Australia, PCOS weight management, menopause weight gain, ADHD weight loss, sleep apnoea treatment" />
        <link rel="canonical" href="https://www.downscale.com.au/conditions" />
        
        <meta property="og:title" content="Medical Conditions Treated - Weight Loss Clinic Australia" />
        <meta property="og:description" content="Professional medical weight management for obesity, PCOS, menopause, ADHD, and other health conditions. Evidence-based treatment via telehealth across Australia." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/conditions" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": "Medical Conditions Treated by Weight Loss Clinic",
            "description": "Comprehensive medical conditions treated through evidence-based weight management with professional telehealth weight loss clinic",
            "url": "https://www.downscale.com.au/conditions",
            "mainContentOfPage": {
              "@type": "WebPageElement",
              "description": "Detailed information about medical conditions treated through professional weight management including obesity, PCOS, menopause, ADHD, sleep apnoea, chronic pain, and hypertension"
            },
            "specialty": "Weight Loss Medicine and Metabolic Health",
            "about": detailedConditions.map(condition => ({
              "@type": "MedicalCondition",
              "name": condition.name,
              "description": condition.description
            })),
            "significantLink": "https://www.downscale.com.au/conditions",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.downscale.com.au/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Medical Conditions",
                  "item": "https://www.downscale.com.au/conditions"
                }
              ]
            }
          })}
        </script>
      </Head>
      {/* Hero Section */}
      <OptimizedBackground
        src="/australian-beach-hero.jpg"
        className="relative pt-24 pb-20 min-h-[50vh] flex items-center overflow-hidden"
        priority={true}
        overlay="linear-gradient(rgba(15, 23, 42, 0.6), rgba(30, 41, 59, 0.7))"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-beach font-bold mb-6 leading-tight">
              Medical Conditions We Treat
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg max-w-3xl mx-auto font-light leading-relaxed" style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)'
            }}>
              Weight loss is powerful medicine. Our evidence-based approach treats multiple health conditions through sustainable weight management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-button bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2"
              >
                Book Initial Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </OptimizedBackground>
      <div className="container mx-auto px-4 py-2">
        <PageNavigation />
      </div>
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
        
        {/* Conditions Overview */}
        <section className="mobile-section">
          <div className="container mx-auto px-4">
            <ConditionsWeTreat />
          </div>
        </section>

        {/* Detailed Conditions */}
        <section className="mobile-section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="heading-beach font-bold mb-4">
                Detailed Treatment Approaches
              </h2>
              <p className="mobile-text text-foreground/80 max-w-3xl mx-auto">
                Each condition requires a tailored approach. Here's how we address specific health challenges through medical weight management.
              </p>
            </div>

            <div className="space-y-8">
              {detailedConditions.map((condition, index) => (
                <div key={index} className="mobile-card bg-card/50 backdrop-blur-sm">
                  <div className="mobile-card-spacing">
                    <div className="flex items-start gap-4 mb-6">
                      <div 
                        className="p-4 rounded-xl flex-shrink-0"
                        style={{ backgroundColor: condition.color + '20' }}
                      >
                        <condition.icon 
                          className="h-6 w-6" 
                          style={{ color: condition.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 
                          className="mobile-subheading font-bold mb-3"
                          style={{ color: condition.color }}
                        >
                          {condition.name}
                        </h3>
                        <p className="mobile-text text-foreground/90 leading-relaxed">
                          {condition.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Common Symptoms/Signs:</h4>
                        <ul className="space-y-2">
                          {condition.symptoms.map((symptom, idx) => (
                            <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                              <span 
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: condition.color }}
                              />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Treatment Benefits:</h4>
                        <ul className="space-y-2">
                          {condition.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                              <span 
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: condition.color }}
                              />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mobile-section">
          <div className="container mx-auto px-4">
            <div className="mobile-card bg-gradient-to-r from-primary/90 to-accent/90 text-center">
              <div className="mobile-card-spacing">
                <h2 className="mobile-heading font-bold mb-4 text-gray-900">
                  Ready to Address Your Health Condition?
                </h2>
                <p className="mobile-text mb-8 text-gray-900 max-w-2xl mx-auto">
                  Our evidence-based weight management approach can help improve your health condition. 
                  Book a consultation to discuss your personalized treatment plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-button bg-secondary text-secondary-foreground hover:bg-secondary/90 inline-flex items-center justify-center gap-2"
                  >
                    Book Initial Consultation
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Button asChild variant="outline" className="mobile-button border-gray-800 text-gray-800 hover:bg-gray-800/10">
                    <a href="/about">
                      Learn About Our Approach
                      <Stethoscope className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}