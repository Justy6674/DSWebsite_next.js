import { Layout } from "@/components/layout/Layout";
import Link from "next/link";
import { Calculator, ExternalLink } from "lucide-react";

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
      <div className="min-h-screen bg-background text-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Health & Weight Loss Tools
            </h1>
            <p className="text-xl text-muted-foreground mb-12 text-center">
              Interactive tools to support your weight loss journey
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      {typeof Icon === 'string' ? (
                        <span className="text-3xl mr-3">{Icon}</span>
                      ) : (
                        <Icon className="h-8 w-8 text-primary mr-3" />
                      )}
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {tool.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
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
              <p className="text-muted-foreground mb-4">
                Looking for professional consultation?
              </p>
              <Link
                href="/start-project"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Book a Consultation
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
