import Head from "next/head";
import { Layout } from '@/components/layout/Layout';
import { CreditCard, Shield, CheckCircle, Info, FileText } from 'lucide-react';

export default function MedicareBilling() {
  return (
    <>
      <Head>
        <title>Transparent $45 Pricing Policy — Accessible Care for All Australians | Downscale</title>
        <meta name="description" content="Understanding our transparent $45 maximum out-of-pocket pricing model. Simple, affordable healthcare for all Australians with clear pricing structure." />
        <meta name="keywords" content="Medicare billing Downscale, mixed billing telehealth, Medicare rebates weight loss, transparent pricing Australia, telehealth Medicare policy" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.downscale.com.au/medicare" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Downscale Weight Loss Clinic Medicare Billing Policy",
            "description": "Medicare billing information for telehealth weight loss services",
            "url": "https://downscale.com.au/medicare",
            "paymentAccepted": ["Medicare", "Credit Card"],
            "priceRange": "$45-$96.25"
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
                    <CreditCard className="h-12 w-12 text-brown" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Transparent $45 Pricing Policy — Accessible Care for All Australians
                </h1>
                <p className="text-xl text-cream/80 mb-8">
                  Understanding our transparent $45 maximum out-of-pocket pricing model
                </p>
                <div className="text-sm text-cream/60">
                  Last updated: January 13, 2025
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Section 1: How Our Pricing Works */}
                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Shield className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">How Our Mixed-Billing Model Works</h2>
                      
                      <div className="mb-6">
                        <p className="text-cream/90 text-lg font-semibold mb-4">
                          Consultation Fee: $45 maximum out-of-pocket (all appointments)
                        </p>
                      </div>

                      {/* FOR MEDICARE-ELIGIBLE */}
                      <div className="bg-brown/10 border border-brown/30 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-cream mb-3">FOR MEDICARE-ELIGIBLE PATIENTS:</h3>
                        <ul className="space-y-2 text-cream/90">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            You pay the full consultation fee upfront at booking ($96.25 initial, $72.05 review)
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            We process your Medicare claim as "Patient Claim (Private)"
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            Medicare deposits your rebate directly into your bank account within 1-2 business days
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            <strong>Initial consultations:</strong> You receive $51.25 back → Your final cost: <strong>$45</strong>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            <strong>Follow-up consultations:</strong> You receive $27.05 back → Your final cost: <strong>$45</strong>
                          </li>
                        </ul>
                      </div>

                      {/* FOR NON-MEDICARE-ELIGIBLE */}
                      <div className="bg-slate-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-cream mb-3">FOR NON-MEDICARE-ELIGIBLE PATIENTS:</h3>
                        <ul className="space-y-2 text-cream/90">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            You pay <strong>$45 total</strong> (no Medicare claim lodged)
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            We absorb the Medicare rebate difference ourselves ($27.05-$51.25 per consultation)
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            Simple, straightforward pricing with no hidden fees
                          </li>
                        </ul>
                      </div>

                      <p className="text-cream/70 text-sm mt-4 italic">
                        This is called "mixed billing" — it's completely legal, transparent, and allows us to keep care accessible for everyone.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Why This Approach? */}
                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <CheckCircle className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Patient-First Healthcare</h2>
                      <div className="space-y-4 text-cream/90">
                        <p>As Nurse Practitioners, we believe:</p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            Quality clinical care should be accessible to all Australians, regardless of Medicare eligibility
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            Transparency builds trust — you know exactly what you're paying upfront
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            Healthcare should never force patients to choose between quality and affordability
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                            Supporting our patients means we're building a sustainable, patient-centred clinic
                          </li>
                        </ul>

                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mt-4">
                          <p className="font-semibold text-cream">THE FINANCIAL REALITY:</p>
                          <p className="text-sm">
                            We're absorbing between <strong>$27.05 and $51.25 per consultation</strong> for non-Medicare-eligible patients. This is our commitment to accessibility over profit.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Medicare Compliance & November 1st Changes */}
                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Info className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Medicare Changes & Our Response</h2>
                      <p className="text-cream/90 mb-4">
                        Following Medicare telehealth changes effective November 1st, 2025, we've implemented a transparent $45 maximum out-of-pocket pricing model for all weight loss consultations.
                      </p>

                      <div className="bg-blue/10 border border-blue/20 rounded-lg p-4 mt-4">
                        <p className="text-sm text-cream/90">
                          <strong>Our Commitment:</strong> All consultations are $45 maximum out-of-pocket for transparent, accessible healthcare regardless of Medicare eligibility status.
                        </p>
                      </div>

                      <p className="text-cream/70 text-sm mt-4 italic">
                        This pricing model ensures compliance with current Medicare regulations while maintaining accessible care for all Australians.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 4: Compliance & Transparency */}
                <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <FileText className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Compliance & Transparency</h2>
                      <p className="text-cream/90 mb-4">We comply with all MBS requirements:</p>
                      <ul className="space-y-2 text-cream/90">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Document eligibility carefully for every Medicare claim
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Obtain informed financial consent before consultations
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Follow all AHPRA advertising and billing regulations
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-brown rounded-full mr-3 mt-2"></div>
                          Provide itemised receipts for all consultations
                        </li>
                      </ul>

                      <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                        <p className="text-sm text-cream/90 font-semibold mb-2">Before booking, we inform you:</p>
                        <p className="text-sm text-cream/80 italic">
                          "Our telehealth fee is $45 maximum out-of-pocket. If you are eligible under Medicare telehealth rules, we will charge the full consultation fee ($96.25 or $72.05) and process your Medicare rebate so you receive $27.05-$51.25 back within 1-2 days. If you are not eligible, you will pay $45 and no rebate applies."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-brown/10 border border-brown/30 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-cream mb-4">Medicare Questions?</h3>
                  <p className="text-cream/80 mb-6">
                    Our team can help you understand your Medicare entitlements and billing processes.
                  </p>
                  <div className="space-y-2 text-cream/90">
                    <p><strong>Email:</strong> office@downscale.com.au</p>
                    <p><strong>ABN:</strong> 120 481 481 74</p>
                    <p><strong>Medicare Provider Number:</strong> Available upon request</p>
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