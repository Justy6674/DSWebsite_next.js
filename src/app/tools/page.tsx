import { Metadata } from 'next';
import { Layout } from "@/components/layout/Layout";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import Link from "next/link";
import { Calculator, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: 'Health & Weight Loss Tools | Downscale Weight Loss Clinic',
  description: 'Interactive tools to support your weight loss journey including BMI calculator, health assessments, progress tracking, and meal planning tools.',
  openGraph: {
    title: 'Health & Weight Loss Tools | Downscale Weight Loss Clinic',
    description: 'Interactive tools to support your weight loss journey including BMI calculator, health assessments, progress tracking, and meal planning tools.',
    url: 'https://www.downscale.com.au/tools',
    type: 'website',
    images: [
      {
        url: 'https://www.downscale.com.au/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Health & Weight Loss Tools | Downscale Weight Loss Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health & Weight Loss Tools | Downscale Weight Loss Clinic',
    description: 'Interactive tools to support your weight loss journey including BMI calculator, health assessments, progress tracking, and meal planning tools.',
    images: ['https://www.downscale.com.au/og-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.downscale.com.au/tools',
  },
};

const tools = [
  {
    name: 'Body Metrics Calculator',
    icon: Calculator,
    href: '/calculator',
    description: 'Calculate BMI, ideal weight, and other health metrics'
  },
  {
    name: 'Health Assessment Tools',
    icon: '📋',
    href: '/assessments',
    description: 'Comprehensive health and lifestyle assessments'
  },
  {
    name: 'Progress Tracking',
    icon: '📊',
    href: '/portal/health-metrics',
    description: 'Track your weight loss journey and health metrics'
  },
  {
    name: 'Meal Planner',
    icon: '🍽️',
    href: '/nutrition-meal-planning',
    description: 'Plan balanced meals for your weight loss goals'
  }
];

export default function ToolsPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="relative min-h-[60vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(/TOOLSHEROIMAGE.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              color: '#f7f2d3',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Health & Weight Loss Tools
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ color: '#f8fafc' }}
          >
            Interactive tools to support your weight loss journey
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-slate-800 text-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <PageNavigation />

            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group bg-slate-900 border border-slate-700 rounded-lg p-6 hover:border-primary transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      {typeof Icon === 'string' ? (
                        <span className="text-3xl mr-3">{Icon}</span>
                      ) : (
                        <Icon className="h-8 w-8 text-primary mr-3" />
                      )}
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors text-cream">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-cream opacity-90 text-sm mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center text-primary text-sm">
                      Access Tool
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 text-center">
              <p className="text-cream opacity-90 mb-4">
                Looking for professional consultation?
              </p>
              <a
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <img src="https://cdn.halaxy.com/h/images/logo.png" alt="Halaxy" className="h-5 w-5 mr-2" />
                Book a Consultation
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
