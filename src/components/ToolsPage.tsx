'use client';

import Head from "next/head";
import Link from 'next/link';
import { Layout } from "@/components/layout/Layout";
import { OptimizedBackground } from '@/components/ui/optimized-background';
import Calculator from "@/components/medical/Calculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator as CalculatorIcon, Activity, Heart, Brain, Moon, Stethoscope } from "lucide-react";
import { useState } from "react";
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'calculator',
      title: 'Health Calculator',
      description: 'Calculate BMI, BMR, TDEE, body composition and get AI-powered personalised nutrition recommendations',
      icon: CalculatorIcon,
      component: Calculator,
      path: '/calculator',
      category: 'Metabolic Health'
    },
    {
      id: 'sleep-assessments',
      title: 'Sleep Assessments',
      description: 'STOP-BANG Sleep Apnea Screening & Epworth Sleepiness Scale - Professional sleep disorder screening tools',
      icon: Moon,
      component: null,
      path: '/sleep-recovery-optimisation',
      category: 'Sleep Health'
    },
    {
      id: 'mental-health',
      title: 'Mental Health Assessments',
      description: 'BEDS-7 Binge Eating & ASRS-v1.1 ADHD Screening - Validated clinical assessment tools with GP integration',
      icon: Brain,
      component: null,
      path: '/mental-health-support',
      category: 'Mental Health'
    },
    {
      id: 'audit-assessment',
      title: 'AUDIT-C Alcohol Assessment',
      description: 'WHO-validated alcohol screening questionnaire to identify hazardous drinking patterns and alcohol misuse',
      icon: Stethoscope,
      component: null,
      path: '/mental-health-support',
      category: 'Mental Health'
    },
    {
      id: 'tracker',
      title: 'Progress Tracker',
      description: 'Track your weight management journey, appointments, and health metrics (Coming Soon)',
      icon: Activity,
      component: null,
      path: null,
      category: 'Tracking'
    }
  ];

  if (activeTool) {
    const tool = tools.find(t => t.id === activeTool);
    if (tool && tool.component) {
      const ToolComponent = tool.component;
      return <ToolComponent />;
    }
  }

  const handleToolAccess = (tool: any) => {
    if (tool.component) {
      setActiveTool(tool.id);
    } else if (tool.path) {
      window.location.href = tool.path;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Clinical Assessment Tools | Health Calculator | Sleep & Mental Health Screening | Australia</title>
        <meta name="description" content="Professional clinical assessment tools: BMI calculator, STOP-BANG sleep apnea screening, Epworth sleepiness scale, BEDS-7 binge eating assessment, ADHD screening. Free, validated tools for Australian patients." />
        <meta name="keywords" content="clinical assessment tools Australia, health calculator BMI, sleep apnea screening STOP-BANG, Epworth sleepiness scale, ADHD screening ASRS, binge eating assessment BEDS-7, mental health screening tools, professional health assessments" />
        <link rel="canonical" href="https://www.downscale.com.au/tools" />
        
        <meta property="og:title" content="Clinical Assessment Tools | Health Calculator | Sleep & Mental Health Screening" />
        <meta property="og:description" content="Professional clinical assessment tools: BMI calculator, STOP-BANG sleep apnea screening, Epworth sleepiness scale, BEDS-7 binge eating assessment, ADHD screening." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/tools" />
        <meta property="og:image" content="https://www.downscale.com.au/public/og-tools.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clinical Assessment Tools | Health Calculator | Sleep & Mental Health Screening" />
        <meta name="twitter:description" content="Professional clinical assessment tools: BMI calculator, STOP-BANG sleep apnea screening, Epworth sleepiness scale, BEDS-7 binge eating assessment, ADHD screening." />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": "Clinical Assessment Tools",
            "description": "Professional health screening and assessment tools for Australian patients",
            "url": "https://www.downscale.com.au/tools",
            "mainContentOfPage": {
              "@type": "WebPageElement",
              "description": "Comprehensive collection of validated clinical assessment tools including metabolic health calculators, sleep disorder screening, and mental health assessments."
            },
            "about": [
              {
                "@type": "MedicalTest",
                "name": "BMI Calculator"
              },
              {
                "@type": "MedicalTest", 
                "name": "STOP-BANG Sleep Apnea Screening"
              },
              {
                "@type": "MedicalTest",
                "name": "Epworth Sleepiness Scale"
              },
              {
                "@type": "MedicalTest",
                "name": "BEDS-7 Binge Eating Assessment"
              },
              {
                "@type": "MedicalTest",
                "name": "ASRS-v1.1 ADHD Screening"
              }
            ],
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.downscale.com.au"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Tools",
                  "item": "https://www.downscale.com.au/tools"
                }
              ]
            }
          })}
        </script>
      </Head>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: 'url(/lovable-uploads/6fe1a9b0-3661-49d7-83d7-246ec1d97f80.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img 
            src="/lovable-uploads/6fe1a9b0-3661-49d7-83d7-246ec1d97f80.png" 
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
                Clinical Assessment Tools
              </h1>
              <div className="w-20 h-1 bg-cream/80 mx-auto mb-6"></div>
              <p 
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                Professional health screening tools including sleep assessments, mental health screening, and metabolic health calculators used by healthcare professionals across Australia
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-2">
          <PageNavigation />
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Category Introduction */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Validated Clinical Assessment Suite
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Access the same professional screening tools used by healthcare providers. All assessments include downloadable results, 
              GP integration options, and follow-up appointment booking.
            </p>
          </div>

          {/* Tools Grid - Responsive and Aligned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
            {tools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-primary/20 h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit">
                    <tool.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground mb-3">
                    {tool.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed min-h-[60px] flex items-center">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-0 mt-auto">
                  <Button 
                    onClick={() => handleToolAccess(tool)}
                    disabled={!tool.component && !tool.path}
                    className="w-full h-12 font-medium transition-all duration-200 hover:scale-105 shadow-lg"
                    variant={tool.component || tool.path ? "default" : "secondary"}
                  >
                    {tool.component || tool.path ? 'Access Tool' : 'Coming Soon'}
                    {(tool.component || tool.path) && <Stethoscope className="ml-2 h-4 w-4" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Information - Responsive Cards */}
          <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 border border-slate-700">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              Professional Clinical Integration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-green-500/10 w-fit">
                  <Heart className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Validated Tools</h4>
                <p className="text-muted-foreground text-sm">
                  All assessments use internationally validated clinical screening instruments
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-blue-500/10 w-fit">
                  <Stethoscope className="h-8 w-8 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">GP Integration</h4>
                <p className="text-muted-foreground text-sm">
                  Results can be downloaded and shared directly with your healthcare provider
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-purple-500/10 w-fit">
                  <Activity className="h-8 w-8 text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Follow-up Care</h4>
                <p className="text-muted-foreground text-sm">
                  Direct booking links to discuss results with qualified nurse practitioners
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action - Mobile Optimized */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6 text-base md:text-lg">
              Need help interpreting your results or want to discuss treatment options?
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white font-medium px-6 md:px-8 py-3 h-12 text-base">
              <Link href="/">Book Professional Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}