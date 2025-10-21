'use client';

import Head from "next/head";
import { Layout } from '@/components/layout/Layout';
import { Button } from "@/components/ui/button";
import medicalHero from '@/assets/medical-hero.jpg';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function MedicalWeightManagement() {
  const clinicalServices = [
    {
      icon: "🔬",
      title: "Comprehensive Health Assessment",
      description: "Evidence-based obesity classification using BMI, body composition, and metabolic markers",
      features: ["Complete medical history review", "Metabolic syndrome screening", "Comorbidity assessment", "Risk stratification protocols"]
    },
    {
      icon: "📊",
      title: "Metabolic Optimisation",
      description: "Advanced metabolic health evaluation and management protocols",
      features: ["Insulin resistance assessment", "Hormonal evaluation", "Thyroid function optimisation", "Lipid profile management"]
    },
    {
      icon: "💊",
      title: "Best-Fit Dosing & Maintenance",
      description: "Individualised clinical approach with ongoing monitoring and treatment adjustment as clinically appropriate",
      features: ["Individual assessment protocols", "Clinical monitoring systems", "Evidence-based adjustments", "Ongoing healthcare partnership"]
    },
    {
      icon: "🫀",
      title: "Comorbidity Management",
      description: "Integrated care for obesity-related health conditions",
      features: ["Diabetes management", "Hypertension control", "Sleep apnea screening", "Cardiovascular risk reduction"]
    }
  ];

  const evidencePoints = [
    {
      title: "Chronic Disease Approach",
      description: "Following evidence-based clinical guidelines, we provide comprehensive weight management as an ongoing healthcare service",
      icon: "🏥"
    },
    {
      title: "Evidence-Based Protocols",
      description: "All clinical decisions based on peer-reviewed research and established Australian healthcare guidelines",
      icon: "📚"
    },
    {
      title: "Individualised Care",
      description: "Treatment plans tailored to your unique health profile, medical history, and lifestyle factors",
      icon: "👤"
    },
    {
      title: "Regular Monitoring",
      description: "Systematic follow-up protocols to track progress and adjust treatment as needed",
      icon: "📈"
    }
  ];

  return (
    <>
      <Head>
        <title>Weight Loss Medication & Medical Management | Virtual Clinic Australia</title>
        <meta name="description" content="Affordable $45 medical weight management. Holistic whole-person approach with Justin Black, Nurse Practitioner. Professional weight management clinic Australia with evidence-based clinical assessment. Telehealth consultations available." />
        <meta name="keywords" content="Medicare bulk billing weight management, professional weight management clinic australia, telehealth weight consultation medicare, medical weight management Australia, clinical weight assessment, evidence-based healthcare" />
        <link rel="canonical" href="https://www.downscale.com.au/medical-weight-management" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Medical Weight Management | Professional Clinical Assessment" />
        <meta property="og:description" content="Professional medical weight management from qualified Nurse Practitioner using evidence-based clinical protocols." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/medical-weight-management" />
        
        {/* Schema Markup */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Medical Weight Management",
              "description": "Evidence-based medical weight management and obesity treatment protocols",
              "publisher": {
                "@type": "Organization",
                "name": "Downscale Weight Loss Clinic"
              },
              "mainEntity": {
                "@type": "MedicalProcedure",
                "name": "Medical Weight Management",
                "description": "Comprehensive clinical approach to obesity treatment following evidence-based protocols"
              }
            }
          `}
        </script>
      </Head>
      <Layout>
        <main className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <div 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${medicalHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img 
            src={medicalHero} 
            alt="" 
            className="hidden" 
            loading="eager"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}
              >
                Medical Weight Management
              </h1>
              <div className="w-20 h-1 bg-cream/80 mx-auto mb-6"></div>
              <p 
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                Evidence-based clinical weight management following established Australian clinical guidelines. 
                Professional healthcare assessment from a qualified Nurse Practitioner.
              </p>
              <a 
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  onClick={() => window.open('https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131', '_blank')}
                  className="bg-secondary hover:bg-secondary/90 text-white font-medium text-sm shadow-md"
                  size="sm"
                >
                  Book Medical Assessment
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-2">
          <PageNavigation />
        </div>

        {/* Evidence-Based Approach */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Evidence-Based Clinical Approach
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Following evidence-based clinical guidelines and best practices for comprehensive weight management
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {evidencePoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-xl p-6 text-center hover:bg-slate-750 transition-colors border border-slate-700"
                >
                  <div className="text-4xl mb-4">{point.icon}</div>
                  <h3 className="text-xl font-bold text-cream mb-3">{point.title}</h3>
                  <p className="text-cream opacity-80 text-sm leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clinical Services */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Comprehensive Clinical Services
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Professional medical weight management addressing health and wellbeing through comprehensive clinical assessment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {clinicalServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-xl p-8 hover:bg-slate-750 transition-colors border border-slate-700"
                >
                  <div className="flex items-start mb-6">
                    <div className="text-4xl mr-4">{service.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-cream mb-2">{service.title}</h3>
                      <p className="text-cream opacity-80 mb-4">{service.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-cream opacity-70"
                      >
                        <i className="fas fa-check text-brown mr-3 mt-1"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Medical Process */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Clinical Assessment Process
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="w-16 h-16 bg-brown rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-cream mb-3">Initial Assessment</h3>
                  <p className="text-cream opacity-80 text-sm">
                    Comprehensive health evaluation including medical history, metabolic screening, and risk assessment
                  </p>
                </div>

                <div className="text-center bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="w-16 h-16 bg-brown rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-cream mb-3">Treatment Planning</h3>
                  <p className="text-cream opacity-80 text-sm">
                    Individualised clinical treatment plan based on evidence-based protocols and your health profile
                  </p>
                </div>

                <div className="text-center bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="w-16 h-16 bg-brown rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-cream mb-3">Ongoing Care</h3>
                  <p className="text-cream opacity-80 text-sm">
                    Regular monitoring, treatment adjustments, and long-term management for sustainable results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Medicare & Accessibility */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="bg-brown/10 rounded-xl p-8 max-w-4xl mx-auto text-center border border-brown/20">
              <h2 className="text-3xl font-bold text-cream mb-4">
                Medicare Bulk-Billed Initial Consultations
              </h2>
              <p className="text-cream opacity-90 text-lg mb-6">
                Your first comprehensive assessment is 100% covered under Medicare with no out-of-pocket costs
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
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  onClick={() => window.open('https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131', '_blank')}
                  className="bg-secondary hover:bg-secondary/90 text-white font-medium text-sm shadow-md"
                  size="sm"
                >
                  Start Your Medical Assessment
                </Button>
              </a>
            </div>
          </div>
        </section>
        </main>
      </Layout>
    </>
  );
}