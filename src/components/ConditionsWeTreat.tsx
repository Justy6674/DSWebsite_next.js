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
      bg: '#1e293b'
    },
    {
      name: 'Weight Maintenance',
      description: 'Long-term weight management to prevent regain and maintain healthy lifestyle',
      benefits: 'Sustained weight loss, improved metabolic health, lifestyle maintenance',
      icon: Target,
      accent: 'hsl(142, 76%, 36%)',
      bg: '#1e293b'
    },
    {
      name: 'PCOS',
      description: 'Polycystic Ovary Syndrome management through weight loss and hormone balance',
      benefits: 'Improved fertility, regulated periods, reduced insulin resistance',
      icon: Heart,
      accent: 'hsl(346, 87%, 43%)',
      bg: '#1e293b'
    },
    {
      name: 'Perimenopause & Menopause',
      description: 'Weight management during hormonal transitions with targeted support',
      benefits: 'Reduced hot flashes, better bone health, improved mood stability',
      icon: Activity,
      accent: 'hsl(271, 91%, 65%)',
      bg: '#1e293b'
    },
    {
      name: 'ADHD',
      description: 'Managing weight challenges associated with ADHD medications and behaviours',
      benefits: 'Better focus, improved medication effectiveness, enhanced self-esteem',
      icon: Brain,
      accent: 'hsl(25, 95%, 53%)',
      bg: '#1e293b'
    },
    {
      name: 'Sleep Apnoea',
      description: 'Weight loss to improve sleep quality and reduce apnoea severity',
      benefits: 'Better sleep quality, reduced snoring, improved daytime energy',
      icon: Moon,
      accent: 'hsl(198, 93%, 60%)',
      bg: '#1e293b'
    },
    {
      name: 'Chronic Pain',
      description: 'Weight management to reduce joint stress and inflammation',
      benefits: 'Reduced pain levels, improved mobility, better quality of life',
      icon: Zap,
      accent: 'hsl(14, 100%, 57%)',
      bg: '#1e293b'
    },
    {
      name: 'Hypertension',
      description: 'Blood pressure management through sustainable weight loss strategies',
      benefits: 'Lower blood pressure, reduced medication needs, heart protection',
      icon: Heart,
      accent: 'hsl(173, 80%, 40%)',
      bg: '#1e293b'
    },
    {
      name: 'Type 2 Diabetes',
      description: 'Evidence-based weight management to improve glucose control and insulin sensitivity',
      benefits: 'Improved blood sugar control, reduced HbA1c levels, decreased medication requirements',
      icon: Target,
      accent: 'hsl(14, 91%, 54%)',
      bg: '#1e293b'
    },
    {
      name: 'Metabolic Syndrome',
      description: 'Comprehensive treatment addressing high blood pressure, high blood sugar, and excess abdominal fat',
      benefits: 'Reduced cardiovascular risk, improved insulin sensitivity, better lipid profiles',
      icon: Activity,
      accent: 'hsl(262, 83%, 58%)',
      bg: '#1e293b'
    },
    {
      name: 'Depression & Anxiety',
      description: 'Holistic approach recognising the bidirectional relationship between mental health and weight',
      benefits: 'Improved mood stability, better self-esteem, reduced emotional eating',
      icon: Brain,
      accent: 'hsl(195, 100%, 50%)',
      bg: '#1e293b'
    },
    {
      name: 'Fatty Liver Disease',
      description: 'Targeted weight loss to reduce liver fat and improve liver function',
      benefits: 'Reduced liver fat, improved liver function tests, decreased inflammation',
      icon: Heart,
      accent: 'hsl(45, 93%, 47%)',
      bg: '#1e293b'
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
        <div className="bg-slate-800 rounded-xl mobile-card-spacing my-6 border border-slate-700">
          <h3 className="mobile-heading font-bold mb-4 text-center text-cream">
            Medical Conditions We Treat
          </h3>
          <p className="mobile-text text-center text-cream opacity-90 mb-6 max-w-2xl mx-auto">
            Professional weight management leads to improved health outcomes across multiple conditions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {displayConditions.map((condition, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 mobile-button rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border-2"
                style={{
                  backgroundColor: condition.bg,
                  borderColor: condition.accent
                }}
              >
                <condition.icon 
                  className="h-5 w-5 transition-transform group-hover:scale-110" 
                  style={{ color: condition.accent }} 
                />
                <span className="mobile-small-text font-bold text-white">
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
      <div className="bg-slate-800 rounded-xl mobile-card-spacing my-8 border border-slate-700">
        <div className="text-center mb-8">
          <h2 className="text-cream font-bold mb-4 text-3xl md:text-4xl">
            Medical Conditions We Treat
          </h2>
          <p className="mobile-text text-cream opacity-90 max-w-3xl mx-auto">
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
                borderColor: condition.accent
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
                  <h3 className="mobile-subheading font-bold text-white transition-colors">
                    {condition.name}
                  </h3>
                </div>
                <p className="mobile-small-text text-gray-200 mb-3 leading-relaxed">
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
        
        <div className="mt-8 sm:mt-12 mobile-card-spacing bg-slate-900 rounded-2xl text-center border border-brown/20">
          <div className="max-w-4xl mx-auto">
            <h3 className="mobile-heading font-bold mb-4 flex items-center justify-center gap-3 text-cream">
              <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-brown" />
              Weight Loss as Medicine
            </h3>
            <p className="mobile-text mb-6 leading-relaxed text-cream opacity-90">
              <strong>Evidence shows weight loss improves:</strong> Diabetes control, blood pressure, 
              sleep quality, joint pain, fertility, mood, energy levels, and reduces medication needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 mobile-small-text">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-brown" />
                <span className="font-medium text-cream">Evidence-Based Treatment</span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-brown" />
                <span className="font-medium text-cream">Holistic Health Approach</span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-brown" />
                <span className="font-medium text-cream">Personalized Treatment Plans</span>
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
                className="mobile-button bg-transparent border border-brown text-cream hover:bg-brown/10 transition-colors inline-flex items-center justify-center gap-2"
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