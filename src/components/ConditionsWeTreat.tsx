import Link from 'next/link';
import React from 'react';
import { 
  Heart, 
  Brain, 
  Activity, 
  Moon, 
  Zap,
  Target,
  Scale,
  ArrowRight,
  Stethoscope,
  Users
} from 'lucide-react';

interface ConditionsWeTreatProps {
  compact?: boolean;
}

export const ConditionsWeTreat: React.FC<ConditionsWeTreatProps> = ({ compact = false }) => {
  const conditions = [
    {
      name: 'Obesity & Overweight',
      description: 'Evidence-based medical weight management with sustainable strategies',
      benefits: 'Reduced diabetes risk, improved cardiovascular health, enhanced mobility',
      icon: Scale,
      accent: 'hsl(221, 83%, 53%)',
      bg: 'hsl(221, 83%, 97%)'
    },
    {
      name: 'Weight Maintenance',
      description: 'Long-term weight management to prevent regain and maintain healthy lifestyle',
      benefits: 'Sustained weight loss, improved metabolic health, lifestyle maintenance',
      icon: Target,
      accent: 'hsl(142, 76%, 36%)',
      bg: 'hsl(142, 76%, 97%)'
    },
    {
      name: 'PCOS',
      description: 'Polycystic Ovary Syndrome management through weight loss and hormone balance',
      benefits: 'Improved fertility, regulated periods, reduced insulin resistance',
      icon: Heart,
      accent: 'hsl(346, 87%, 43%)',
      bg: 'hsl(346, 87%, 97%)'
    },
    {
      name: 'Perimenopause & Menopause',
      description: 'Weight management during hormonal transitions with targeted support',
      benefits: 'Reduced hot flashes, better bone health, improved mood stability',
      icon: Activity,
      accent: 'hsl(271, 91%, 65%)',
      bg: 'hsl(271, 91%, 97%)'
    },
    {
      name: 'ADHD',
      description: 'Managing weight challenges associated with ADHD medications and behaviours',
      benefits: 'Better focus, improved medication effectiveness, enhanced self-esteem',
      icon: Brain,
      accent: 'hsl(25, 95%, 53%)',
      bg: 'hsl(25, 95%, 97%)'
    },
    {
      name: 'Sleep Apnoea',
      description: 'Weight loss to improve sleep quality and reduce apnoea severity',
      benefits: 'Better sleep quality, reduced snoring, improved daytime energy',
      icon: Moon,
      accent: 'hsl(198, 93%, 60%)',
      bg: 'hsl(198, 93%, 97%)'
    },
    {
      name: 'Chronic Pain',
      description: 'Weight management to reduce joint stress and inflammation',
      benefits: 'Reduced pain levels, improved mobility, better quality of life',
      icon: Zap,
      accent: 'hsl(14, 100%, 57%)',
      bg: 'hsl(14, 100%, 97%)'
    },
    {
      name: 'Hypertension',
      description: 'Blood pressure management through sustainable weight loss strategies',
      benefits: 'Lower blood pressure, reduced medication needs, heart protection',
      icon: Heart,
      accent: 'hsl(173, 80%, 40%)',
      bg: 'hsl(173, 80%, 97%)'
    }
  ];

  const displayConditions = compact ? conditions.slice(0, 6) : conditions;

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Medical Conditions Treated",
    "description": "Comprehensive medical conditions treated through professional telehealth weight management",
    "numberOfItems": conditions.length,
    "itemListElement": conditions.map((condition, index) => ({
      "@type": "MedicalCondition",
      "position": index + 1,
      "name": condition.name,
      "description": condition.description,
      "possibleComplication": condition.benefits,
      "url": "https://www.downscale.com.au/conditions"
    }))
  };

  if (compact) {
    return (
      <>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl mobile-card-spacing my-6 border border-primary/10">
          <h3 className="mobile-heading font-bold mb-4 text-center heading-beach">
            Medical Conditions We Treat
          </h3>
          <p className="mobile-text text-center text-foreground/80 mb-6 max-w-2xl mx-auto">
            Professional weight management leads to improved health outcomes across multiple conditions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {displayConditions.map((condition, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 mobile-button rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border-2"
                style={{
                  backgroundColor: condition.bg,
                  borderColor: condition.accent + '40'
                }}
              >
                <condition.icon 
                  className="h-5 w-5 transition-transform group-hover:scale-110" 
                  style={{ color: condition.accent }} 
                />
                <span className="mobile-small-text font-bold text-gray-900 dark:text-white">
                  {condition.name}
                </span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link 
              href="/conditions" 
              className="text-primary hover:text-primary/80 font-medium text-sm transition-colors inline-flex items-center gap-2"
            >
              Learn more about all conditions we treat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl mobile-card-spacing my-8 border border-primary/10">
        <div className="text-center mb-8">
          <h2 className="heading-beach font-bold mb-4">
            Medical Conditions We Treat
          </h2>
          <p className="mobile-text text-foreground/80 max-w-3xl mx-auto">
            Weight loss isn't just about appearance - it's powerful medicine. Our evidence-based approach 
            treats the root causes of weight gain while addressing associated health conditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {displayConditions.map((condition, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 mobile-card"
              style={{
                backgroundColor: condition.bg,
                borderColor: condition.accent + '60'
              }}
            >
              <div className="mobile-card-spacing">
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="p-3 rounded-lg transition-transform group-hover:scale-110"
                    style={{ backgroundColor: condition.accent + '20' }}
                  >
                    <condition.icon 
                      className="h-5 w-5" 
                      style={{ color: condition.accent }} 
                    />
                  </div>
                  <h3 
                    className="mobile-subheading font-bold transition-colors"
                    style={{ color: condition.accent }}
                  >
                    {condition.name}
                  </h3>
                </div>
                <p className="mobile-small-text text-gray-800 dark:text-gray-200 mb-3 leading-relaxed">
                  {condition.description}
                </p>
                <div className="pill-beach text-xs">
                  Benefits: {condition.benefits}
                </div>
              </div>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: condition.accent }}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-8 sm:mt-12 mobile-card-spacing bg-gradient-to-r from-primary/90 to-accent/90 rounded-2xl text-gray-900 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="mobile-heading font-bold mb-4 flex items-center justify-center gap-3 heading-beach text-gray-900">
              <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800" />
              Weight Loss as Medicine
            </h3>
            <p className="mobile-text mb-6 leading-relaxed text-gray-900">
              <strong>Evidence shows weight loss improves:</strong> Diabetes control, blood pressure, 
              sleep quality, joint pain, fertility, mood, energy levels, and reduces medication needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 mobile-small-text">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
                <span className="font-medium">Evidence-Based Treatment</span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
                <span className="font-medium">Holistic Health Approach</span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
                <span className="font-medium">Personalized Treatment Plans</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link 
                href="/conditions" 
                className="mobile-button bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                Learn About All Conditions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/medical-weight-management" 
                className="mobile-button bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                Our Treatment Approach
                <Stethoscope className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};