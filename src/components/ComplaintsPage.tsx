import Head from "next/head";
import { Layout } from '@/components/layout/Layout';
import { MessageSquare, ArrowRight, Phone, Mail, Building, AlertTriangle } from 'lucide-react';

export default function Complaints() {
  return (
    <>
      <Head>
        <title>Complaints and Feedback | Downscale Weight Loss Clinic Australia</title>
        <meta name="description" content="How to provide feedback or make a complaint about Downscale Weight Loss Clinic services. Information about AHPRA, health complaints bodies, and privacy complaint processes in Australia." />
        <meta name="keywords" content="complaints Downscale Australia, healthcare complaints, AHPRA complaints, health feedback, medical complaints Australia, telehealth complaints" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.downscale.com.au/complaints" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Complaints and Feedback",
            "description": "Complaint and feedback process for healthcare services",
            "url": "https://www.downscale.com.au/complaints"
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
                    <MessageSquare className="h-12 w-12 text-brown" />
                  </div>
                </div>
                <h1 className="mb-6">
                  Complaints and Feedback
                </h1>
                <p className="text-xl text-cream/80 mb-8">
                  We take all concerns seriously and aim to respond within 2 business days
                </p>
                <div className="text-sm text-cream/60">
                  Your feedback helps us improve our services
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                
                {/* Step 1: Contact Us */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <div className="p-3 bg-brown/20 rounded-full mr-4 flex-shrink-0">
                      <span className="text-brown font-bold text-xl">1</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Step 1: Contact Us</h2>
                      <p className="text-cream/90 mb-6">
                        We encourage you to contact us directly first. Most concerns can be resolved quickly through direct communication.
                      </p>
                      
                      <div className="bg-brown/10 border border-brown/30 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <Mail className="h-6 w-6 text-brown mr-3" />
                          <h3 className="text-lg font-semibold text-cream">Primary Contact</h3>
                        </div>
                        <div className="space-y-2 text-cream/90">
                          <p><strong>Email:</strong> office@downscale.com.au</p>
                          <p><strong>Contact Person:</strong> Justin Black (Clinic Director)</p>
                          <p><strong>Response Time:</strong> Within 2 business days</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-slate-700/50 rounded-lg p-4">
                        <p className="text-cream/80 text-sm">
                          <strong>What to include in your email:</strong> Your name, appointment date (if applicable), 
                          details of your concern, and how you'd like us to resolve the issue.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Escalate to Health Agencies */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <div className="p-3 bg-brown/20 rounded-full mr-4 flex-shrink-0">
                      <span className="text-brown font-bold text-xl">2</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Step 2: Escalate to Health Agencies (if unresolved)</h2>
                      <p className="text-cream/90 mb-6">
                        If your concern relates to clinical care or conduct, you may contact:
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-slate-700/50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <Building className="h-6 w-6 text-brown mr-3" />
                            <h3 className="text-lg font-semibold text-cream">AHPRA</h3>
                          </div>
                          <p className="text-cream/90 mb-3">Australian Health Practitioner Regulation Agency</p>
                          <div className="space-y-2 text-sm text-cream/80">
                            <p><strong>Website:</strong> ahpra.gov.au</p>
                            <p><strong>Phone:</strong> 1300 419 495</p>
                            <p><strong>For:</strong> Clinical conduct, professional standards</p>
                          </div>
                        </div>
                        
                        <div className="bg-slate-700/50 rounded-lg p-6">
                          <div className="flex items-center mb-4">
                            <AlertTriangle className="h-6 w-6 text-brown mr-3" />
                            <h3 className="text-lg font-semibold text-cream">State Health Complaints</h3>
                          </div>
                          <p className="text-cream/90 mb-3">State-based health complaint bodies</p>
                          <div className="space-y-2 text-sm text-cream/80">
                            <p><strong>NSW:</strong> Health Care Complaints Commission</p>
                            <p><strong>QLD:</strong> Health Ombudsman</p>
                            <p><strong>VIC:</strong> Health Complaints Commissioner</p>
                            <p><strong>Others:</strong> Contact your state health department</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Concerns */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Building className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Privacy Concerns</h2>
                      <p className="text-cream/90 mb-6">
                        Privacy-related complaints may be submitted to the:
                      </p>
                      
                      <div className="bg-brown/10 border border-brown/30 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-cream mb-3">Office of the Australian Information Commissioner (OAIC)</h3>
                        <div className="space-y-2 text-cream/90">
                          <p><strong>Website:</strong> oaic.gov.au</p>
                          <p><strong>Phone:</strong> 1300 363 992</p>
                          <p><strong>For:</strong> Privacy breaches, data handling concerns</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Halaxy Data */}
                <div className="bg-slate-800 rounded-xl p-8 mb-8 border border-slate-700">
                  <div className="flex items-start mb-6">
                    <Building className="h-8 w-8 text-brown mr-4 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold text-cream mb-4">Halaxy Data</h2>
                      <div className="space-y-4 text-cream/90">
                        <p>
                          Halaxy securely stores all clinical records. If you believe Halaxy has mishandled your data, 
                          complaints can be made directly to Halaxy or via the OAIC.
                        </p>
                        
                        <div className="bg-slate-700/50 rounded-lg p-4">
                          <div className="space-y-2 text-sm">
                            <p><strong>Halaxy Contact:</strong> support@halaxy.com</p>
                            <p><strong>Halaxy Website:</strong> halaxy.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-brown/10 border border-brown/30 rounded-xl p-8 text-center">
                  <h3 className="text-xl font-semibold text-cream mb-4">Our Commitment to You</h3>
                  <p className="text-cream/80 mb-6">
                    We value your feedback and are committed to continuously improving our services. 
                    Every complaint is taken seriously and helps us provide better care.
                  </p>
                  <div className="space-y-2 text-cream/90">
                    <p><strong>Downscale Weight Loss Clinic</strong></p>
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