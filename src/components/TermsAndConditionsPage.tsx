'use client';

import Head from "next/head";
import { Layout } from '@/components/layout/Layout';
import { FileText, Shield, CreditCard, RefreshCw, AlertTriangle, Scale } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions | Downscale Weight Loss Clinic Australia</title>
        <meta name="description" content="Terms and conditions for Downscale's nurse practitioner-led telehealth weight loss services. Learn about fees, Medicare billing, cancellations, and liability policies for Australian patients." />
        <meta name="keywords" content="terms conditions Downscale Australia, telehealth terms, Medicare billing terms, weight loss clinic terms, healthcare terms Australia" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.downscale.com.au/terms" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TermsOfService",
            "name": "Downscale Weight Loss Clinic Terms and Conditions",
            "description": "Terms and conditions for telehealth weight loss services in Australia",
            "url": "https://www.downscale.com.au/terms",
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
                    <FileText className="h-12 w-12 text-brown" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Terms and Conditions
                </h1>
                <p className="text-xl text-cream/80 mb-8">
                  Understanding our service terms and your responsibilities as a patient
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
                      <h2 className="text-2xl font-bold text-cream mb-4">Service Agreement</h2>
                      <div className="space-y-4 text-cream/90">
                        <p>
                          <strong>Downscale</strong> (ABN 120 481 481 74) is operated by Justin Black and provides nurse practitioner–led telehealth services for weight loss and general health. By using this website or booking services through it, you agree to the terms below.
                        </p>
                        <p>
                          All Downscale clinicians are registered with AHPRA and comply with Australian medical standards. You must be aged 18 years or older to use our services.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-cream mb-3">Our Services Include:</h3>
                    <ul className="space-y-2 text-cream/90">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-brown rounded-full mr-3"></div>
                        Weight loss and lifestyle management
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-brown rounded-full mr-3"></div>
                        General medical concerns
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-brown rounded-full mr-3"></div>
                        Medication prescriptions (e-scripts)
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-brown rounded-full mr-3"></div>
                        Referrals and follow-up care
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Fees and Payment */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <CreditCard className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Fees and Payment</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-cream mb-3">Standard Weight Loss Consultations:</h3>
                          <ul className="space-y-3 text-cream/90">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                              <strong>Initial consultation:</strong> $96.25 (Medicare-eligible) or $45 (non-eligible private fee)
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                              <strong>Review consultation:</strong> $72.05 (Medicare-eligible) or $45 (non-eligible private fee)
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                              Medicare-eligible patients receive rebates of $51.25 (initial) or $27.05 (review), resulting in $45 final out-of-pocket
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                              For non-Medicare-eligible patients, we charge a private fee of $45 and absorb the rebate difference
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-cream mb-3">Bulk-Billing (Case-by-Case):</h3>
                          <ul className="space-y-3 text-cream/90">
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                              Certain consultations may be bulk-billed at the practitioner's discretion, including side effects discussions, children's consultations, and some existing Dakabin GP patients for non-weight-related appointments
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                              Bulk-billing eligibility is assessed during booking and confirmed during consultation
                            </li>
                            <li className="flex items-start">
                              <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                              We comply with all MBS requirements and document eligibility carefully
                            </li>
                          </ul>
                        </div>

                        <p className="text-cream/90">
                          All payments are due at time of booking. We provide itemised receipts for all consultations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medicare Rebates */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Shield className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Medicare Rebates & Mixed-Billing</h2>
                      <ul className="space-y-3 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          All weight loss consultations: $45 maximum out-of-pocket
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Medicare-eligible patients: Pay full consultation fee upfront, receive instant Medicare rebate processing, final cost $45
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Non-Medicare-eligible patients: Pay $45 private fee, we absorb rebate difference
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Receipts are provided for Medicare rebate claiming via Services Australia
                        </li>
                      </ul>
                      
                      <div className="bg-brown/10 border border-brown/30 rounded-lg p-4 mt-4">
                        <p className="text-sm text-cream/90">
                          Our pricing structure prioritises accessibility — we absorb significant costs for non-Medicare-eligible patients to keep care affordable for all Australians.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancellations and Refunds */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <RefreshCw className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Cancellations and Refunds</h2>
                      <ul className="space-y-3 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          To cancel or reschedule, provide 24 hours' notice.
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Late cancellations or missed appointments may result in a cancellation fee.
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Refunds are only issued if services cannot be provided as agreed.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Liability and Medical Advice */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <AlertTriangle className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Liability and Medical Advice</h2>
                      <ul className="space-y-3 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          While care is delivered to a high standard, outcomes may vary.
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Services do not replace in-person medical advice.
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Seek in-person review where clinically indicated.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Governing Law */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Scale className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Governing Law</h2>
                      <p className="text-cream/90">
                        These terms are governed by Australian law and any disputes will be handled in Australian jurisdictions.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-brown/10 border border-brown/30 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-cream mb-4">Need to Discuss Our Terms?</h3>
                  <p className="text-cream/80 mb-6">
                    If you have questions about these terms and conditions, please don't hesitate to contact us.
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