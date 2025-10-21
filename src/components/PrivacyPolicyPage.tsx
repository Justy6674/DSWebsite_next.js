'use client';

import Head from "next/head";
import { Layout } from '@/components/layout/Layout';
import { Shield, Database, UserCheck, Lock, FileText, Eye, Clock, Cookie } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Downscale Weight Loss Clinic Australia</title>
        <meta name="description" content="Privacy policy for Downscale Weight Loss Clinic's telehealth services. Learn how we collect, use, store and protect your personal health information in compliance with the Privacy Act 1988 and Australian Privacy Principles." />
        <meta name="keywords" content="privacy policy Downscale Australia, health data privacy, telehealth privacy, medical records security, AHPRA privacy, Australian healthcare privacy" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.downscale.com.au/privacy" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            "name": "Downscale Weight Loss Clinic Privacy Policy",
            "description": "Privacy policy covering collection, use and protection of personal health information",
            "url": "https://www.downscale.com.au/privacy",
            "provider": {
              "@type": "Organization",
              "@id": "https://www.downscale.com.au"
            },
            "dateModified": "2025-01-12",
            "inLanguage": "en-AU"
          })}
        </script>
      </Head>
      <Layout>
        <div className="min-h-screen bg-slate-900 text-white">
          {/* Hero Section */}
          <section className="pt-24 pb-16 bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-brown/20 rounded-full">
                    <Shield className="h-12 w-12 text-brown" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Privacy Policy
                </h1>
                <p className="text-xl text-cream/80 mb-8">
                  Your privacy and data security are our highest priorities
                </p>
                <div className="text-sm text-cream/60">
                  Last updated: January 12, 2025
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                
                {/* Introduction */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Shield className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Our Commitment to Privacy</h2>
                      <p className="text-cream/90 mb-4">
                        Downscale Weight Loss Clinic complies with the <strong>Privacy Act 1988</strong> and the <strong>Australian Privacy Principles (APPs)</strong>. We handle your personal and health data only as needed to deliver healthcare.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Information We Collect */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Database className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Information We Collect</h2>
                      <p className="text-cream/90 mb-4">We collect:</p>
                      <ul className="space-y-3 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Name, contact information, date of birth
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Medical history, health status, weight and medication data
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Medicare details
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Notes from consultations (via phone, video or online form)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* How We Use It */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <UserCheck className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">How We Use It</h2>
                      <p className="text-cream/90 mb-4">Your information is used to:</p>
                      <ul className="space-y-3 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Create and manage treatment plans
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Issue prescriptions and referrals
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Send appointment reminders
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Submit Medicare claims
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Data Storage and Security */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Lock className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Data Storage and Security</h2>
                      <ul className="space-y-3 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          All clinical data is stored via <strong>Halaxy</strong>, a secure Australian clinical software platform.
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Records are encrypted and access-controlled.
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          No other third-party platforms are used to store your data.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sharing of Information */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <FileText className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Sharing of Information</h2>
                      <ul className="space-y-3 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          We do not share your data except as required for your care, or if legally required.
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          With your consent, we may refer information to other treating providers.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Access and Correction */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Eye className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Access and Correction</h2>
                      <ul className="space-y-3 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          You can request to access or correct your information at any time.
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Contact us via email at <strong>office@downscale.com.au</strong>.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* My Health Record */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <FileText className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">My Health Record</h2>
                      <ul className="space-y-3 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          With your consent, we may contribute to or access your My Health Record.
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          You may opt out at any time.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cookies */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Cookie className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Cookies</h2>
                      <p className="text-cream/90">
                        Our website may use cookies for performance tracking. You may disable these in your browser settings.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Retention */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Clock className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Retention</h2>
                      <p className="text-cream/90">
                        We retain your records in line with healthcare obligations. When no longer required, records are securely deleted or anonymised.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-brown/10 border border-brown/30 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-cream mb-4">Privacy Questions?</h3>
                  <p className="text-cream/80 mb-6">
                    If you have concerns about how we handle your personal information, please contact us.
                  </p>
                  <div className="space-y-2 text-cream/90">
                    <p><strong>Email:</strong> office@downscale.com.au</p>
                    <p><strong>ABN:</strong> 120 481 481 74</p>
                    <p><strong>Clinic Director:</strong> Justin Black</p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}