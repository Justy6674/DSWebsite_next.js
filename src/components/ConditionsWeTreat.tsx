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
      description: 'Structured plans that combine nutrition, movement, sleep, and behaviour change, with clinical review and ongoing follow-up.',
      extendedDescription: 'Our comprehensive approach addresses the underlying causes through evidence-based medical management, personalised nutrition strategies, and progressive fitness programs tailored to your individual needs.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Evidence-based medical treatment options' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Personalised dietary strategies' },
        { name: 'Activity & Muscle Building', url: '/services/activity-muscle-building', description: 'Progressive fitness programs' }
      ]
    },
    {
      name: 'Type 2 Diabetes / Insulin Resistance',
      description: 'Metabolic assessments, nutrition strategies, activity planning, and regular monitoring to improve blood-sugar control.',
      extendedDescription: 'Comprehensive diabetes management combining medical supervision with targeted nutrition therapy and lifestyle interventions to optimise glucose control and reduce complications.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Clinically supervised diabetes management' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Diabetes-specific nutrition counselling' }
      ]
    },
    {
      name: 'Hypertension (High Blood Pressure)',
      description: 'Lifestyle interventions, home monitoring, and cardiovascular risk reduction with regular reviews.',
      extendedDescription: 'Evidence-based blood pressure management through targeted lifestyle modifications, regular monitoring, and professional medical oversight to reduce cardiovascular risk.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Medical hypertension management' },
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Comprehensive cardiovascular care' }
      ]
    },
    {
      name: 'High Cholesterol / Dyslipidaemia',
      description: 'Diet and activity changes; monitoring of lipid trends; personalised prevention goals.',
      extendedDescription: 'Comprehensive lipid management through evidence-based nutrition interventions and lifestyle modifications to improve cardiovascular health outcomes.',
      relatedServices: [
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Heart-healthy nutrition strategies' },
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Lipid monitoring and management' }
      ]
    },
    {
      name: 'Metabolic Syndrome',
      description: 'Coordinated plan addressing waist circumference, blood pressure, glucose, and lipids; staged reviews.',
      extendedDescription: 'Comprehensive metabolic syndrome management targeting multiple risk factors through coordinated medical care, nutrition therapy, and structured physical activity programs.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Metabolic health optimisation' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Metabolic nutrition therapy' },
        { name: 'Activity & Muscle Building', url: '/services/activity-muscle-building', description: 'Metabolic fitness programs' }
      ]
    },
    {
      name: 'Fatty Liver (NAFLD/NASH risk)',
      description: 'Gradual weight reduction targets, nutrition guidance, and liver-health monitoring.',
      extendedDescription: 'Specialised fatty liver management through targeted weight loss, liver-friendly nutrition strategies, and regular monitoring to prevent disease progression.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Medical fatty liver treatment' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Liver-protective nutrition plans' }
      ]
    },
    {
      name: 'Polycystic Ovary Syndrome (PCOS)',
      description: 'Menstrual, fertility, and metabolic support with weight-centred lifestyle planning.',
      extendedDescription: 'Comprehensive PCOS management addressing hormonal balance, insulin resistance, and reproductive health through targeted medical and lifestyle interventions.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'PCOS-specific medical management' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'PCOS nutrition therapy' }
      ]
    },
    {
      name: 'Thyroid Concerns',
      description: 'Symptom review, appropriate testing, and whole-health strategies to support energy, mood, and weight.',
      extendedDescription: 'Comprehensive thyroid health assessment and management addressing energy, metabolism, and weight concerns through evidence-based medical care.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Thyroid-informed weight management' },
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Thyroid monitoring and care' }
      ]
    },
    {
      name: 'Sleep Apnoea & Snoring',
      description: 'Screening, weight-linked risk management, and coordination with sleep services when needed.',
      extendedDescription: 'Comprehensive sleep apnoea management combining weight reduction strategies with sleep optimisation techniques to improve breathing and sleep quality.',
      relatedServices: [
        { name: 'Sleep Optimisation', url: '/services/sleep', description: 'Comprehensive sleep apnoea management' },
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Weight-focused sleep apnoea treatment' }
      ]
    },
    {
      name: 'Low Energy, Fatigue & Brain Fog',
      description: 'Holistic review of sleep, nutrition, iron/thyroid/metabolic markers, and stress.',
      extendedDescription: 'Comprehensive fatigue assessment addressing underlying metabolic, nutritional, and lifestyle factors to restore energy and cognitive function.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Comprehensive fatigue assessment' },
        { name: 'Mental Health Support', url: '/services/mental-health', description: 'Energy and mood optimisation' }
      ]
    },
    {
      name: 'Perimenopause & Menopause Support',
      description: 'Symptom mapping, bone-health and weight-gain prevention, lifestyle strategies, and regular check-ins.',
      extendedDescription: 'Comprehensive menopause care addressing hormonal changes, weight management, and health optimisation during this important life transition.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Menopause health management' },
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Menopause weight management' }
      ]
    },
    {
      name: 'Weight Regain After Past Programs or Surgery',
      description: 'Root-cause review, relapse-prevention strategies, and sustainable maintenance plans.',
      extendedDescription: 'Specialised weight maintenance support addressing psychological and physiological factors contributing to weight regain with evidence-based prevention strategies.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Weight regain prevention' },
        { name: 'Mental Health Support', url: '/services/mental-health', description: 'Weight maintenance psychology' }
      ]
    },
    {
      name: 'Emotional / Binge Eating Patterns',
      description: 'Non-judgemental coaching, trigger management, and practical meal-timing routines.',
      extendedDescription: 'Compassionate support for emotional eating challenges through evidence-based behavioural strategies, stress management techniques, and structured nutrition planning.',
      relatedServices: [
        { name: 'Mental Health Support', url: '/services/mental-health', description: 'Emotional eating psychology support' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Mindful eating strategies' }
      ]
    },
    {
      name: 'Prediabetes',
      description: 'Early intervention with targeted weight goals and habit coaching to prevent progression.',
      extendedDescription: 'Proactive prediabetes management through lifestyle intervention, targeted weight loss, and metabolic monitoring to prevent type 2 diabetes development.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Prediabetes medical management' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Diabetes prevention nutrition' }
      ]
    },
    {
      name: 'Joint & Musculoskeletal Strain from Excess Weight',
      description: 'Low-impact movement programs and pacing strategies to protect knees, hips, and back.',
      extendedDescription: 'Specialised joint health management combining weight reduction with therapeutic exercise programs designed to reduce pain and improve mobility.',
      relatedServices: [
        { name: 'Activity & Muscle Building', url: '/services/activity-muscle-building', description: 'Joint-friendly exercise programs' },
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Musculoskeletal health assessment' }
      ]
    },
    {
      name: 'Reflux & Gut Discomfort Linked to Weight',
      description: 'Meal-pattern review, trigger identification, and weight-aware gut strategies.',
      extendedDescription: 'Comprehensive digestive health management addressing weight-related reflux and gut symptoms through targeted nutrition interventions and lifestyle modifications.',
      relatedServices: [
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Digestive-friendly nutrition plans' },
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Gastrointestinal health assessment' }
      ]
    },
    {
      name: 'Cardiovascular Risk Prevention',
      description: 'Personalised risk scoring, lifestyle planning, and routine follow-up to track improvements.',
      extendedDescription: 'Proactive cardiovascular health management through comprehensive risk assessment, targeted lifestyle interventions, and regular monitoring to prevent heart disease.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Cardiovascular risk reduction' },
        { name: 'Activity & Muscle Building', url: '/services/activity-muscle-building', description: 'Heart-healthy exercise programs' }
      ]
    },
    {
      name: 'Mood Changes Related to Metabolic Health',
      description: 'Integrated approach to sleep, activity, routine, and supportive counselling.',
      extendedDescription: 'Comprehensive mood and metabolic health management addressing the bidirectional relationship between mental health and metabolic function.',
      relatedServices: [
        { name: 'Mental Health Support', url: '/services/mental-health', description: 'Metabolic mood management' },
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Mood-aware weight management' }
      ]
    },
    {
      name: 'Body Composition Optimisation',
      description: 'Goal-setting around fat loss and strength, with realistic tracking and review.',
      extendedDescription: 'Scientific body composition improvement through targeted exercise programming, nutrition optimisation, and evidence-based monitoring techniques.',
      relatedServices: [
        { name: 'Activity & Muscle Building', url: '/services/activity-muscle-building', description: 'Body composition training programs' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Body composition nutrition strategies' }
      ]
    },
    {
      name: 'Post-Weight-Loss Maintenance',
      description: '"Keep-it-off" plans, relapse-prevention skills, and scheduled check-ins.',
      extendedDescription: 'Specialised weight maintenance support combining ongoing medical monitoring with psychological strategies to sustain long-term weight loss success.',
      relatedServices: [
        { name: 'Medical Weight Management', url: '/services/weight-loss-medication', description: 'Weight maintenance medical support' },
        { name: 'Mental Health Support', url: '/services/mental-health', description: 'Weight maintenance psychology' }
      ]
    }
  ];

  const generalHealthConditions = [
    {
      name: 'Mental Health (Anxiety, Low Mood, Stress)',
      description: 'Supportive consults, practical coping plans, and stepped-care follow-up.',
      extendedDescription: 'Comprehensive mental health support providing evidence-based treatments for anxiety, depression, and stress management through professional counselling and therapeutic interventions.',
      relatedServices: [
        { name: 'Mental Health Support', url: '/services/mental-health', description: 'Professional mental health counselling' },
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Mental health assessment and care' }
      ]
    },
    {
      name: 'Paediatric Care',
      description: 'Safe, family-friendly care for common childhood conditions (respiratory, skin, ear/ENT, tummy upsets) and development checks.',
      extendedDescription: 'Comprehensive paediatric healthcare providing gentle, family-centred care for children including routine check-ups, immunisations, and treatment of common childhood illnesses.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Comprehensive paediatric healthcare' }
      ]
    },
    {
      name: 'Women\'s Health',
      description: 'Menstrual, perimenopause/menopause, pelvic and general wellbeing; respectful, evidence-based advice.',
      extendedDescription: 'Comprehensive women\'s health services addressing reproductive health, hormonal concerns, and gender-specific healthcare needs with respectful, evidence-based care.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Women\'s health consultations' }
      ]
    },
    {
      name: 'Men\'s Health',
      description: 'Screening, performance and wellbeing discussions, cardiovascular risk checks, and routine follow-up.',
      extendedDescription: 'Comprehensive men\'s health services including preventive screening, cardiovascular health assessment, and lifestyle counselling tailored to men\'s specific health needs.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Men\'s health consultations' }
      ]
    },
    {
      name: 'Respiratory Illnesses & Asthma',
      description: 'Assessment, action plans, and prevention strategies; inhaler technique education where relevant.',
      extendedDescription: 'Comprehensive respiratory health management including asthma care, breathing assessments, and therapeutic interventions to optimise lung function and quality of life.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Respiratory health assessment' }
      ]
    },
    {
      name: 'Skin Conditions',
      description: 'Eczema, dermatitis, acne, infections, and routine skin checks; trigger and routine care planning.',
      extendedDescription: 'Comprehensive dermatological care addressing common skin conditions through evidence-based treatments, preventive strategies, and ongoing monitoring.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Skin health assessment and treatment' }
      ]
    },
    {
      name: 'Musculoskeletal Pain & Injury',
      description: 'Strain, arthritis, and back/neck pain management with pacing, movement, and recovery plans.',
      extendedDescription: 'Comprehensive musculoskeletal care combining medical assessment with therapeutic exercise strategies to reduce pain and improve function.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Musculoskeletal assessment' },
        { name: 'Activity & Muscle Building', url: '/services/activity-muscle-building', description: 'Therapeutic exercise programs' }
      ]
    },
    {
      name: 'Gastrointestinal Issues',
      description: 'Reflux, IBS-type symptoms, and bowel habit concerns with diet patterns and symptom tracking.',
      extendedDescription: 'Comprehensive digestive health management addressing gastrointestinal symptoms through medical assessment, dietary interventions, and lifestyle modifications.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Gastrointestinal health assessment' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Digestive health nutrition plans' }
      ]
    },
    {
      name: 'Cardiovascular Screening',
      description: 'Blood pressure, lipids, glucose, and lifestyle risks; personalised prevention plans.',
      extendedDescription: 'Comprehensive cardiovascular health assessment including risk factor analysis, preventive screening, and personalised lifestyle interventions to promote heart health.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Cardiovascular health screening' }
      ]
    },
    {
      name: 'Pathology & Preventive Testing',
      description: 'Sensible, guideline-aligned testing and clear interpretation; follow-up on results.',
      extendedDescription: 'Comprehensive health screening and diagnostic testing services with professional interpretation and follow-up care to monitor and maintain optimal health.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Health screening and pathology' }
      ]
    },
    {
      name: 'Immunisations & Preventive Health',
      description: 'Age- and risk-appropriate vaccinations and screening reminders.',
      extendedDescription: 'Comprehensive immunisation services and preventive health programs designed to protect against infectious diseases and maintain optimal health throughout life.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Immunisation and preventive care' }
      ]
    },
    {
      name: 'Endocrine Concerns',
      description: 'Thyroid and other hormone-related symptoms reviewed in context of energy, mood, and weight.',
      extendedDescription: 'Comprehensive endocrine health assessment addressing hormonal imbalances and their effects on metabolism, mood, and overall wellbeing.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Endocrine health assessment' }
      ]
    },
    {
      name: 'Sexual Health & STI Care',
      description: 'Confidential screening, treatment, and education; respectful, stigma-free care.',
      extendedDescription: 'Comprehensive sexual health services providing confidential screening, treatment, and education in a respectful, non-judgmental environment.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Sexual health consultations' }
      ]
    },
    {
      name: 'Fertility & Pre-Pregnancy Planning',
      description: 'Pre-conception wellbeing, nutrition, and risk factor review.',
      extendedDescription: 'Comprehensive pre-conception care supporting fertility and healthy pregnancy through nutritional guidance, health optimisation, and risk factor management.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Fertility and pre-pregnancy care' },
        { name: 'Nutrition Optimisation', url: '/services/nutrition', description: 'Pre-conception nutrition planning' }
      ]
    },
    {
      name: 'Sleep Problems',
      description: 'Practical routines, light/screen hygiene, and stepwise plans to improve sleep quality.',
      extendedDescription: 'Comprehensive sleep health management addressing insomnia, sleep hygiene, and sleep disorders through evidence-based interventions and lifestyle modifications.',
      relatedServices: [
        { name: 'Sleep Optimisation', url: '/services/sleep', description: 'Comprehensive sleep health programs' },
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Sleep disorder assessment' }
      ]
    },
    {
      name: 'Migraine & Headache',
      description: 'Identification of triggers, daily-routine adjustments, and stepped-care management.',
      extendedDescription: 'Comprehensive headache and migraine management through trigger identification, lifestyle modifications, and evidence-based treatment strategies to reduce frequency and severity.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Headache and migraine assessment' }
      ]
    },
    {
      name: 'Wound & Minor Infection Care',
      description: 'Safe assessment, home-care planning, and monitoring.',
      extendedDescription: 'Professional wound care and minor infection management providing safe assessment, appropriate treatment, and ongoing monitoring to promote healing.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Wound care and infection management' }
      ]
    },
    {
      name: 'Urinary / Bladder Issues',
      description: 'UTI assessment and management; hydration and prevention advice.',
      extendedDescription: 'Comprehensive urinary health management addressing infections, bladder concerns, and preventive strategies through evidence-based medical care.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Urinary health assessment and treatment' }
      ]
    },
    {
      name: 'Ear, Nose & Throat Infections',
      description: 'Evidence-based care for sinus, ear, and throat illnesses; safety-netting and review.',
      extendedDescription: 'Comprehensive ENT care providing evidence-based treatment for ear, nose, and throat conditions with appropriate follow-up and safety monitoring.',
      relatedServices: [
        { name: 'General Practice Services', url: '/services/general-practice', description: 'ENT health assessment and treatment' }
      ]
    },
    {
      name: 'Lifestyle & Behavioural Health',
      description: 'Support for stress, alcohol moderation, screen time, and sustainable habit change.',
      extendedDescription: 'Comprehensive lifestyle counselling supporting sustainable behaviour change, stress management, and healthy habit formation through evidence-based interventions.',
      relatedServices: [
        { name: 'Mental Health Support', url: '/services/mental-health', description: 'Behavioural health counselling' },
        { name: 'General Practice Services', url: '/services/general-practice', description: 'Lifestyle health assessment' }
      ]
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
              href="/clinical-services"
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
                    <div className="space-y-4">
                      <p>{condition.description}</p>
                      {condition.extendedDescription && (
                        <p className="text-sm opacity-90">{condition.extendedDescription}</p>
                      )}
                      {condition.relatedServices && condition.relatedServices.length > 0 && (
                        <div className="pt-2">
                          <p className="text-sm font-medium text-cream mb-2">For further details see:</p>
                          <div className="flex flex-wrap gap-2">
                            {condition.relatedServices.map((service, serviceIndex) => (
                              <Link
                                key={serviceIndex}
                                href={service.url}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/90 rounded-lg text-sm font-medium transition-all duration-200 border border-primary/20 hover:border-primary/30"
                                title={service.description}
                              >
                                🔗 {service.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
                    <div className="space-y-4">
                      <p>{condition.description}</p>
                      {condition.extendedDescription && (
                        <p className="text-sm opacity-90">{condition.extendedDescription}</p>
                      )}
                      {condition.relatedServices && condition.relatedServices.length > 0 && (
                        <div className="pt-2">
                          <p className="text-sm font-medium text-cream mb-2">For further details see:</p>
                          <div className="flex flex-wrap gap-2">
                            {condition.relatedServices.map((service, serviceIndex) => (
                              <Link
                                key={serviceIndex}
                                href={service.url}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/90 rounded-lg text-sm font-medium transition-all duration-200 border border-primary/20 hover:border-primary/30"
                                title={service.description}
                              >
                                🔗 {service.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
            {compact && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};