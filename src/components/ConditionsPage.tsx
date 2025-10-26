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
      description: 'Specialised support for maintaining achieved weight loss through ongoing lifestyle coaching, metabolic monitoring, and behavioural strategies.',
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
    },
    {
      name: 'Type 2 Diabetes & Pre-diabetes',
      description: 'Evidence-based weight management to improve glucose control, insulin sensitivity, and reduce diabetes complications.',
      symptoms: ['Elevated blood glucose', 'Frequent urination', 'Increased thirst', 'Fatigue', 'Slow wound healing'],
      benefits: ['Improved blood sugar control', 'Reduced HbA1c levels', 'Decreased medication requirements', 'Prevention of complications'],
      icon: Target,
      color: 'hsl(14, 91%, 54%)'
    },
    {
      name: 'Metabolic Syndrome',
      description: 'Comprehensive treatment addressing the cluster of conditions including high blood pressure, high blood sugar, excess abdominal fat, and abnormal cholesterol levels.',
      symptoms: ['Central obesity', 'High triglycerides', 'Low HDL cholesterol', 'High blood pressure', 'Insulin resistance'],
      benefits: ['Reduced cardiovascular risk', 'Improved insulin sensitivity', 'Better lipid profiles', 'Weight redistribution'],
      icon: Activity,
      color: 'hsl(262, 83%, 58%)'
    },
    {
      name: 'Depression & Anxiety',
      description: 'Holistic approach recognising the bidirectional relationship between mental health and weight, incorporating psychological support with medical management.',
      symptoms: ['Persistent sadness', 'Anxiety', 'Emotional eating', 'Loss of motivation', 'Social withdrawal'],
      benefits: ['Improved mood stability', 'Better self-esteem', 'Reduced emotional eating', 'Enhanced quality of life'],
      icon: Brain,
      color: 'hsl(195, 100%, 50%)'
    },
    {
      name: 'Fatty Liver Disease (NAFLD)',
      description: 'Targeted weight loss to reduce liver fat, improve liver function, and prevent progression to more serious liver conditions.',
      symptoms: ['Elevated liver enzymes', 'Right upper abdominal discomfort', 'Fatigue', 'Often asymptomatic'],
      benefits: ['Reduced liver fat', 'Improved liver function tests', 'Decreased inflammation', 'Prevention of cirrhosis'],
      icon: Heart,
      color: 'hsl(45, 93%, 47%)'
    },
    {
      name: 'Osteoarthritis & Joint Health',
      description: 'Weight reduction to decrease joint loading, reduce inflammation, and improve mobility in weight-bearing joints.',
      symptoms: ['Joint pain and stiffness', 'Reduced mobility', 'Morning stiffness', 'Difficulty with daily activities'],
      benefits: ['Reduced joint pain', 'Improved mobility', 'Better quality of life', 'Delayed joint replacement needs'],
      icon: Zap,
      color: 'hsl(120, 100%, 25%)'
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
      <div
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url(/conditions-hero.jpg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <img
          src="/conditions-hero.jpg"
          alt="Medical conditions treatment - evidence-based weight management for comprehensive health"
          className="hidden"
          loading="eager"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}
            >
              Medical Conditions We Treat
            </h1>
            <div className="w-20 h-1 bg-cream/80 mx-auto mb-6"></div>
            <p
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Weight loss is powerful medicine. Our evidence-based approach treats multiple health conditions through sustainable weight management.
            </p>
            <a
              href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                onClick={() => window.open('https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491', '_blank')}
                className="bg-secondary hover:bg-secondary/90 text-white font-medium text-sm shadow-md"
                size="sm"
              >
                Book Initial Consultation
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-2">
        <PageNavigation />
      </div>
      <main className="min-h-screen bg-slate-900">
        
        {/* Conditions Overview */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <ConditionsWeTreat />
          </div>
        </section>

        {/* Detailed Conditions */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Detailed Treatment Approaches
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Each condition requires a tailored approach. Here's how we address specific health challenges through medical weight management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {detailedConditions.map((condition, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-8 hover:bg-slate-750 transition-colors border border-slate-700">
                  <div className="flex items-start mb-6">
                    <div className="text-4xl mr-4">
                      <condition.icon className="h-8 w-8 text-brown" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-cream mb-2">
                        {condition.name}
                      </h3>
                      <p className="text-cream opacity-80 mb-4">
                        {condition.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <h4 className="font-semibold text-cream mb-3">Common Symptoms/Signs:</h4>
                      <ul className="space-y-3">
                        {condition.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-start text-cream opacity-70">
                            <i className="fas fa-check text-brown mr-3 mt-1"></i>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cream mb-3">Treatment Benefits:</h4>
                      <ul className="space-y-3">
                        {condition.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start text-cream opacity-70">
                            <i className="fas fa-heart text-brown mr-3 mt-1"></i>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="bg-brown/10 rounded-xl p-8 max-w-4xl mx-auto text-center border border-brown/20">
              <h2 className="text-3xl font-bold text-cream mb-4">
                Ready to Address Your Health Condition?
              </h2>
              <p className="text-cream opacity-90 text-lg mb-6">
                Our evidence-based weight management approach can help improve your health condition.
                Book a consultation to discuss your personalized treatment plan.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <i className="fas fa-user-md text-brown text-3xl mb-2"></i>
                  <div className="font-semibold text-cream">Qualified Nurse Practitioner</div>
                </div>
                <div className="text-center">
                  <i className="fas fa-laptop-medical text-brown text-3xl mb-2"></i>
                  <div className="font-semibold text-cream">Telehealth Convenience</div>
                </div>
                <div className="text-center">
                  <i className="fas fa-heart text-brown text-3xl mb-2"></i>
                  <div className="font-semibold text-cream">Comprehensive Care</div>
                </div>
              </div>
              <a
                href="https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  onClick={() => window.open('https://www.halaxy.com/book/downscale/location/1198131?appointmentTypeId=452491', '_blank')}
                  className="bg-secondary hover:bg-secondary/90 text-white font-medium text-sm shadow-md"
                  size="sm"
                >
                  Start Your Health Assessment
                </Button>
              </a>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}