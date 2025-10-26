import Link from 'next/link';
import React from 'react';
import {
  Stethoscope,
  Users,
  Heart,
  Target,
  ArrowRight
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ConditionsWeTreatProps {
  compact?: boolean;
}

export const ConditionsWeTreat: React.FC<ConditionsWeTreatProps> = ({ compact = false }) => {
  const weightRelatedConditions = [
    {
      name: 'Obesity & Overweight',
      description: 'Structured plans that combine nutrition, movement, sleep, and behaviour change, with clinical review and ongoing follow-up.'
    },
    {
      name: 'Type 2 Diabetes / Insulin Resistance',
      description: 'Metabolic assessments, nutrition strategies, activity planning, and regular monitoring to improve blood-sugar control.'
    },
    {
      name: 'Hypertension (High Blood Pressure)',
      description: 'Lifestyle interventions, home monitoring, and cardiovascular risk reduction with regular reviews.'
    },
    {
      name: 'High Cholesterol / Dyslipidaemia',
      description: 'Diet and activity changes; monitoring of lipid trends; personalised prevention goals.'
    },
    {
      name: 'Metabolic Syndrome',
      description: 'Coordinated plan addressing waist circumference, blood pressure, glucose, and lipids; staged reviews.'
    },
    {
      name: 'Fatty Liver (NAFLD/NASH risk)',
      description: 'Gradual weight reduction targets, nutrition guidance, and liver-health monitoring.'
    },
    {
      name: 'Polycystic Ovary Syndrome (PCOS)',
      description: 'Menstrual, fertility, and metabolic support with weight-centred lifestyle planning.'
    },
    {
      name: 'Thyroid Concerns',
      description: 'Symptom review, appropriate testing, and whole-health strategies to support energy, mood, and weight.'
    },
    {
      name: 'Sleep Apnoea & Snoring',
      description: 'Screening, weight-linked risk management, and coordination with sleep services when needed.'
    },
    {
      name: 'Low Energy, Fatigue & Brain Fog',
      description: 'Holistic review of sleep, nutrition, iron/thyroid/metabolic markers, and stress.'
    },
    {
      name: 'Perimenopause & Menopause Support',
      description: 'Symptom mapping, bone-health and weight-gain prevention, lifestyle strategies, and regular check-ins.'
    },
    {
      name: 'Weight Regain After Past Programs or Surgery',
      description: 'Root-cause review, relapse-prevention strategies, and sustainable maintenance plans.'
    },
    {
      name: 'Emotional / Binge Eating Patterns',
      description: 'Non-judgemental coaching, trigger management, and practical meal-timing routines.'
    },
    {
      name: 'Prediabetes',
      description: 'Early intervention with targeted weight goals and habit coaching to prevent progression.'
    },
    {
      name: 'Joint & Musculoskeletal Strain from Excess Weight',
      description: 'Low-impact movement programs and pacing strategies to protect knees, hips, and back.'
    },
    {
      name: 'Reflux & Gut Discomfort Linked to Weight',
      description: 'Meal-pattern review, trigger identification, and weight-aware gut strategies.'
    },
    {
      name: 'Cardiovascular Risk Prevention',
      description: 'Personalised risk scoring, lifestyle planning, and routine follow-up to track improvements.'
    },
    {
      name: 'Mood Changes Related to Metabolic Health',
      description: 'Integrated approach to sleep, activity, routine, and supportive counselling.'
    },
    {
      name: 'Body Composition Optimisation',
      description: 'Goal-setting around fat loss and strength, with realistic tracking and review.'
    },
    {
      name: 'Post-Weight-Loss Maintenance',
      description: '"Keep-it-off" plans, relapse-prevention skills, and scheduled check-ins.'
    }
  ];

  const generalHealthConditions = [
    {
      name: 'Mental Health (Anxiety, Low Mood, Stress)',
      description: 'Supportive consults, practical coping plans, and stepped-care follow-up.'
    },
    {
      name: 'Paediatric Care',
      description: 'Safe, family-friendly care for common childhood conditions (respiratory, skin, ear/ENT, tummy upsets) and development checks.'
    },
    {
      name: 'Women\'s Health',
      description: 'Menstrual, perimenopause/menopause, pelvic and general wellbeing; respectful, evidence-based advice.'
    },
    {
      name: 'Men\'s Health',
      description: 'Screening, performance and wellbeing discussions, cardiovascular risk checks, and routine follow-up.'
    },
    {
      name: 'Respiratory Illnesses & Asthma',
      description: 'Assessment, action plans, and prevention strategies; inhaler technique education where relevant.'
    },
    {
      name: 'Skin Conditions',
      description: 'Eczema, dermatitis, acne, infections, and routine skin checks; trigger and routine care planning.'
    },
    {
      name: 'Musculoskeletal Pain & Injury',
      description: 'Strain, arthritis, and back/neck pain management with pacing, movement, and recovery plans.'
    },
    {
      name: 'Gastrointestinal Issues',
      description: 'Reflux, IBS-type symptoms, and bowel habit concerns with diet patterns and symptom tracking.'
    },
    {
      name: 'Cardiovascular Screening',
      description: 'Blood pressure, lipids, glucose, and lifestyle risks; personalised prevention plans.'
    },
    {
      name: 'Pathology & Preventive Testing',
      description: 'Sensible, guideline-aligned testing and clear interpretation; follow-up on results.'
    },
    {
      name: 'Immunisations & Preventive Health',
      description: 'Age- and risk-appropriate vaccinations and screening reminders.'
    },
    {
      name: 'Endocrine Concerns',
      description: 'Thyroid and other hormone-related symptoms reviewed in context of energy, mood, and weight.'
    },
    {
      name: 'Sexual Health & STI Care',
      description: 'Confidential screening, treatment, and education; respectful, stigma-free care.'
    },
    {
      name: 'Fertility & Pre-Pregnancy Planning',
      description: 'Pre-conception wellbeing, nutrition, and risk factor review.'
    },
    {
      name: 'Sleep Problems',
      description: 'Practical routines, light/screen hygiene, and stepwise plans to improve sleep quality.'
    },
    {
      name: 'Migraine & Headache',
      description: 'Identification of triggers, daily-routine adjustments, and stepped-care management.'
    },
    {
      name: 'Wound & Minor Infection Care',
      description: 'Safe assessment, home-care planning, and monitoring.'
    },
    {
      name: 'Urinary / Bladder Issues',
      description: 'UTI assessment and management; hydration and prevention advice.'
    },
    {
      name: 'Ear, Nose & Throat Infections',
      description: 'Evidence-based care for sinus, ear, and throat illnesses; safety-netting and review.'
    },
    {
      name: 'Lifestyle & Behavioural Health',
      description: 'Support for stress, alcohol moderation, screen time, and sustainable habit change.'
    }
  ];

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Medical Conditions Treated",
    "description": "Comprehensive medical conditions treated through professional telehealth weight management and general practice",
    "numberOfItems": weightRelatedConditions.length + generalHealthConditions.length,
    "itemListElement": [...weightRelatedConditions, ...generalHealthConditions].map((condition, index) => ({
      "@type": "MedicalCondition",
      "position": index + 1,
      "name": condition.name,
      "description": condition.description,
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
            Professional weight management and general practice care for adults and families
          </p>
          <div className="text-center">
            <p className="text-cream mb-4">Over 40+ conditions including:</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className="px-3 py-1 bg-slate-900 rounded-full text-sm text-cream">Weight Loss</span>
              <span className="px-3 py-1 bg-slate-900 rounded-full text-sm text-cream">Diabetes</span>
              <span className="px-3 py-1 bg-slate-900 rounded-full text-sm text-cream">PCOS</span>
              <span className="px-3 py-1 bg-slate-900 rounded-full text-sm text-cream">Mental Health</span>
              <span className="px-3 py-1 bg-slate-900 rounded-full text-sm text-cream">Paediatrics</span>
              <span className="px-3 py-1 bg-slate-900 rounded-full text-sm text-cream">Women's Health</span>
            </div>
            <Link
              href="/conditions"
              className="text-primary hover:text-primary/80 font-medium text-sm transition-colors inline-flex items-center gap-2"
            >
              View all conditions we treat
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
      <div className="bg-card rounded-xl p-8 shadow-lg border border-border mb-8">
        <div className="text-center mb-8">
          <h2 className="text-cream font-bold mb-4 text-3xl md:text-4xl">
            Conditions Managed at Downscale Weight Loss Clinic
          </h2>
          <p className="text-cream opacity-90 max-w-3xl mx-auto mb-6">
            At Downscale Weight Loss Clinic, Justin Black, Nurse Practitioner, provides whole-person care for adults and families.
            With 25+ years across general practice, paediatrics, emergency departments, and telehealth, Justin delivers safe,
            evidence-based care that's practical for busy lives.
          </p>
        </div>

        <div className="space-y-8">
          {/* Weight-Related Section */}
          <div>
            <h3 className="text-2xl font-bold text-cream mb-4">Weight-Related & Metabolic Conditions</h3>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {weightRelatedConditions.map((condition, index) => (
                <AccordionItem key={index} value={`weight-${index}`} className="border-b border-border/50 pb-2">
                  <AccordionTrigger className="text-foreground text-lg font-medium hover:text-primary py-2">
                    {condition.name}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {condition.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* General Health Section */}
          <div>
            <h3 className="text-2xl font-bold text-cream mb-4">General Practice & Family Health</h3>
            <Accordion type="single" collapsible className="w-full space-y-2">
              {generalHealthConditions.map((condition, index) => (
                <AccordionItem key={`general-${index}`} value={`general-${index}`} className="border-b border-border/50 pb-2">
                  <AccordionTrigger className="text-foreground text-lg font-medium hover:text-primary py-2">
                    {condition.name}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2">
                    {condition.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 mobile-card-spacing bg-slate-900 rounded-2xl text-center border border-brown/20">
          <div className="max-w-4xl mx-auto">
            <h3 className="mobile-heading font-bold mb-4 flex items-center justify-center gap-3 text-cream">
              <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-brown" />
              Our Care Principles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 mobile-small-text">
              <div className="flex flex-col items-center gap-2 text-center">
                <Users className="h-6 w-6 text-brown" />
                <span className="font-medium text-cream">Evidence-Based</span>
                <span className="text-xs text-cream/70">Following current Australian guidelines</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Heart className="h-6 w-6 text-brown" />
                <span className="font-medium text-cream">Whole-Person</span>
                <span className="text-xs text-cream/70">Physical, mental & family wellbeing</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Target className="h-6 w-6 text-brown" />
                <span className="font-medium text-cream">Personal & Practical</span>
                <span className="text-xs text-cream/70">Clear plans with regular follow-up</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Stethoscope className="h-6 w-6 text-brown" />
                <span className="font-medium text-cream">Safe & Respectful</span>
                <span className="text-xs text-cream/70">Stigma-free, patient-centred care</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/conditions"
                className="mobile-button bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                View Full Conditions Page
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