'use client';

import Head from "next/head";
import React from 'react';
import { Mail, Phone, MapPin, Award, User, GraduationCap } from 'lucide-react';
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { HighlightBox } from '@/components/ui/highlight-box';
import { OptimizedBackground } from '@/components/ui/optimized-background';
import { LazyImage } from '@/components/LazyImage';
// Heart hands sunset hero image optimized for instant loading
import { PageNavigation } from '@/components/navigation/PageNavigation';
// Placeholder images - will be replaced with actual team photos
// import justinPhoto from '../assets/justin-with-children.jpg';
// import becPhoto from '../assets/bec-profile.jpg';

export default function MeetTheTeam() {
  return (
    <>
      <Head>
        <title>About Our Telehealth Weight Loss & Weight Maintenance Clinic Team | Australia</title>
        <meta name="description" content="Meet our expert team of weight loss specialists, nurse practitioners, and health professionals. Personalised telehealth care from qualified Australian practitioners." />
        <meta name="keywords" content="weight loss team, nurse practitioner, Australian health professionals, telehealth specialists, medical team" />
        <link rel="canonical" href="https://www.downscale.com.au/about" />
        <link rel="preload" as="image" href="/heart-hands-sunset-mobile.webp" type="image/webp" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Justin Black",
            "jobTitle": "Nurse Practitioner & Founder",
            "description": "Founder and Director of Downscale Weight Loss Clinic with over 25 years of clinical experience in weight management, emergency medicine, and general practice.",
            "url": "https://www.downscale.com.au/about",
            "worksFor": {
              "@type": "MedicalBusiness",
              "name": "Downscale Weight Loss Clinic",
              "url": "https://www.downscale.com.au"
            },
            "hasCredential": [
              "Bachelor of Nursing Science",
              "Masters Nursing Science (Nurse Practitioner)",
              "SCOPE Certified"
            ],
            "knowsAbout": [
              "Weight Management",
              "Emergency Medicine", 
              "General Practice",
              "Intensive Care"
            ],
            "alumniOf": "Australian University (Nursing)",
            "award": "SCOPE Certification",
            "familyName": "Black",
            "givenName": "Justin",
            "gender": "Male",
            "nationality": "Australian"
          })}
        </script>
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Downscale Weight Loss Clinic",
            "description": "Meet Justin Black and the professional team of weight loss specialists and nurse practitioners",
            "url": "https://www.downscale.com.au/about",
            "mainEntity": [
              {
                "@type": "Person",
                "name": "Justin Black",
                "jobTitle": "Nurse Practitioner",
                "description": "Founder and Director of Downscale with over 25 years of clinical experience",
                "hasCredential": [
                  "Bachelor of Nursing Science",
                  "Masters Nursing Science (Nurse Practitioner)",
                  "SCOPE Certified"
                ],
                "knowsAbout": [
                  "Weight Management",
                  "Emergency Medicine",
                  "General Practice",
                  "Intensive Care"
                ]
              },
              {
                "@type": "Person",
                "name": "Bec",
                "jobTitle": "Clinical Nurse Specialist & Practice Manager",
                "description": "Highly experienced Registered Nurse and Cardiology clinician at Downscale",
                "hasCredential": [
                  "Registered Nurse",
                  "Cardiology Specialist",
                  "Emergency Nursing Background"
                ],
                "knowsAbout": [
                  "Clinical Precision",
                  "Cardiology",
                  "Emergency Nursing",
                  "Practice Management",
                  "Patient Care"
                ]
              }
            ]
          })}
        </script>
      </Head>
      <Layout>
        <div className="min-h-screen bg-slate-900 text-white">
          {/* Hero Section */}
          <div 
            className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: 'url(/heart-hands-sunset-mobile.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <img 
              src="/heart-hands-sunset-mobile.webp" 
              alt="" 
              className="hidden" 
              loading="eager"
            />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="mb-6 animate-fade-in" style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}>
                  Meet Our
                  <span className="block">Expert Team</span>
                </h1>
                <p className="text-xl mb-8 animate-fade-in" style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Dedicated professionals committed to your weight loss journey
                </p>
              </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-2">
          <PageNavigation />
        </div>

        {/* Team Section */}
        <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                
                {/* Main grid with Justin's profile and highlight box */}
                <div className="grid lg:grid-cols-4 gap-8 mb-12">
                  
                  {/* Justin Black - Team Member Card */}
                  <div className="lg:col-span-3 bg-card rounded-3xl p-8 border border-border shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                    
                      {/* Photo */}
                      <div className="text-center">
                         <div className="w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-brown shadow-2xl">
                           <LazyImage 
                             src="/lovable-uploads/850dfd41-0720-4ab2-91fb-b63d0d5e864e.png" 
                             alt="Justin Black - Australian Nurse Practitioner and Weight Loss Clinic Founder" 
                             className="w-full h-full object-cover"
                             priority={true}
                             style={{ objectPosition: '50% 40%' }}
                           />
                         </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h2 className="text-3xl font-bold heading-beach mb-2">Justin Black</h2>
                        <p className="text-brown text-lg font-semibold mb-4">Founder & Director — Nurse Practitioner</p>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          I'm Justin Black, a Nurse Practitioner with over 25 years of experience in weight loss, 
                          general practice, emergency care, paediatrics, intensive care, and chronic disease.
                        </p>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          After serving as Clinical Director at one of Australia's largest weight loss clinics — where 
                          patients could see one of more than 100 clinicians, each with a different approach — I started 
                          Downscale with a simple idea: you should always know who your clinician is. Here, you see me, every time.
                        </p>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          My approach is patient-centred, practical, and sustainable. I understand the realities of busy 
                          lives and the ups and downs of treatment. My focus is on getting people to their goal weight and, 
                          most importantly, helping them stay there — without pressure, without judgement, and without 
                          unnecessary appointments.
                        </p>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          I also believe treatment should be as affordable as possible. There are many ways to make this 
                          work (😉) and I'll always be upfront about the best options. Patients book their own follow-ups 
                          on their terms — because this is about your life, not my schedule.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-muted-foreground">
                            <Mail className="w-5 h-5 mr-3 text-brown" />
                            <span>🩺 Available via telehealth consultation</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-5 h-5 mr-3 text-brown" />
                            <span>🌏 Supporting patients across Australia</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Qualifications Section */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <div className="grid md:grid-cols-2 gap-8">
                        
                        {/* Qualifications */}
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                            <GraduationCap className="w-6 h-6 mr-3 text-brown" />
                            Qualifications
                          </h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              Bachelor of Nursing Science (General and Mental Health)
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              Post Graduate Certificate Intensive Care
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              Graduate Certificate Health Promotion
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              Masters Nursing Science (Nurse Practitioner)
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              SCOPE Certified
                            </li>
                          </ul>
                        </div>

                        {/* Specialisations */}
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                            <Award className="w-6 h-6 mr-3 text-brown" />
                            Specialisations
                          </h3>
                          <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              Weight and Obesity Management
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              Emergency Medicine
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              General Practice
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              Paediatric & Adult Emergency Care
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              AusMAT Disaster Response
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              Sexual Health
                            </li>
                            <li className="flex items-start">
                              <span className="text-brown mr-2">•</span>
                              Smoking Cessation
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Philosophy */}
                    <div className="mt-8 pt-8 border-t border-border text-center">
                      <blockquote className="text-lg text-muted-foreground italic mb-4">
                        "My approach to medical weight loss is practical, kind, and evidence-based — 
                        always focused on helping patients feel supported, not judged."
                      </blockquote>
                      <p className="text-brown font-semibold">— Justin Black, Nurse Practitioner</p>
                    </div>
                  </div>
                  
                  {/* Highlight Box */}
                  <div className="lg:col-span-1">
                    <HighlightBox className="sticky top-8" />
                  </div>
                </div>

                {/* Bec - Team Member Card */}
                <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    
                    {/* Photo */}
                    <div className="text-center">
                         <div className="w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-brown shadow-2xl">
                           <LazyImage 
                             src="/lovable-uploads/b1d32c79-ba80-48b5-83b4-3bf5e5e66bca.png" 
                             alt="Bec - Australian Registered Nurse and Weight Loss Clinic Practice Manager" 
                             className="w-full h-full object-cover"
                             style={{ objectPosition: '50% 0%' }}
                           />
                         </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h2 className="text-3xl font-bold heading-beach mb-2">Bec</h2>
                      <p className="text-brown text-lg font-semibold mb-4">Clinical Nurse Specialist & Practice Manager</p>
                      <p className="text-xl font-medium text-cream mb-6">Registered Nurse</p>
                      
                      <p className="text-cream/90 mb-6 leading-relaxed">
                        Bec is a highly experienced Registered Nurse, current Cardiology clinician, and Practice Manager 
                        at Downscale. With a strong background in Emergency Nursing and the lived experience of raising 
                        five children, she brings both clinical precision and everyday compassion to everything she does.
                      </p>

                      <p className="text-cream/90 mb-6 leading-relaxed">
                        Often described as the heart of the clinic and the go-to fixer, Bec is deeply committed to 
                        making every patient feel seen, supported, and understood.
                      </p>

                      {/* Contact Info */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-cream/80">
                          <User className="w-5 h-5 mr-3 text-brown" />
                          <span>Practice Manager & Clinical Support</span>
                        </div>
                        <div className="flex items-center text-cream/80">
                          <MapPin className="w-5 h-5 mr-3 text-brown" />
                          <span>Supporting patients across Australia</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Qualifications Section */}
                  <div className="mt-8 pt-8 border-t border-slate-700">
                    <div className="grid md:grid-cols-2 gap-8">
                      
                      {/* Experience */}
                      <div>
                        <h3 className="text-xl font-bold text-cream mb-4 flex items-center">
                          <GraduationCap className="w-6 h-6 mr-3 text-brown" />
                          Clinical Experience
                        </h3>
                        <ul className="space-y-2 text-cream/90">
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Registered Nurse (Current)
                          </li>
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Cardiology Specialist
                          </li>
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Emergency Nursing Background
                          </li>
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Practice Management
                          </li>
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Patient Care Coordination
                          </li>
                        </ul>
                      </div>

                      {/* Specialisations */}
                      <div>
                        <h3 className="text-xl font-bold text-cream mb-4 flex items-center">
                          <Award className="w-6 h-6 mr-3 text-brown" />
                          Core Strengths
                        </h3>
                        <ul className="space-y-2 text-cream/90">
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Clinical Precision
                          </li>
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Compassionate Care
                          </li>
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Practice Operations
                          </li>
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Patient Support
                          </li>
                          <li className="flex items-start">
                            <span className="text-brown mr-2">•</span>
                            Family-Centered Approach
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Philosophy */}
                  <div className="mt-8 pt-8 border-t border-slate-700 text-center">
                    <blockquote className="text-lg text-cream/90 italic">
                      "Making every patient feel seen, supported, and understood — that's what drives everything I do."
                    </blockquote>
                    <p className="text-brown font-semibold mt-4">— Bec, Clinical Nurse Specialist & Practice Manager</p>
                  </div>

                  {/* Social Media CTA */}
                  <div className="mt-8 pt-8 border-t border-slate-700 text-center">
                    <p className="text-cream/90 text-lg">
                      👉 Follow us on social media to see Bec in action — we keep our content real, relatable, 
                      and grounded in the everyday wins and struggles of health and family life.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-brown to-brown/80">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold heading-beach mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Book a consultation with Justin and take the first step towards sustainable weight loss
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
                  Book Your Consultation
                </Button>
              </a>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}