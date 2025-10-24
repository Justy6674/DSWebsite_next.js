import { Layout } from "@/components/layout/Layout";
import Link from "next/link";
import { Stethoscope, Leaf, Dumbbell, Brain, Moon, Target } from "lucide-react";

const clinicalServices = [
  { name: 'Medical Weight Management', icon: Stethoscope, href: '/medical-weight-management', description: 'Evidence-based medical approaches to sustainable weight loss' },
  { name: 'Nutrition & Meal Planning', icon: Leaf, href: '/nutrition-meal-planning', description: 'Personalised nutrition strategies and meal planning support' },
  { name: 'Movement & Activity', icon: Dumbbell, href: '/movement-activity-programs', description: 'Tailored exercise programs for your fitness level and goals' },
  { name: 'Mental Health Support', icon: Brain, href: '/mental-health-support', description: 'Psychological support for sustainable lifestyle changes' },
  { name: 'Sleep & Recovery', icon: Moon, href: '/sleep-recovery-optimisation', description: 'Optimise sleep patterns for better weight management' },
  { name: 'Goal Setting & Maintenance', icon: Target, href: '/goal-setting-maintenance', description: 'Structured approach to setting and maintaining health goals' }
];

export default function ClinicalServicesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-background text-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Clinical Services
            </h1>
            <p className="text-xl text-muted-foreground mb-12 text-center">
              Comprehensive weight management services tailored to your individual needs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinicalServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="group bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      <Icon className="h-8 w-8 text-primary mr-3" />
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}