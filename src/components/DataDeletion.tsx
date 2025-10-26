import Head from "next/head";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/ui/contact-form';

export default function DataDeletion() {
  return (
    <>
      <Head>
        <title>Data Deletion Instructions | Downscale Weight Loss Clinic</title>
        <meta name="description" content="Learn how to request deletion of your personal data from Downscale Weight Loss Clinic. We comply with Australian Privacy Principles and your rights to data portability and erasure." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.downscale.com.au/data-deletion" />
        
        {/* Enhanced SEO metadata */}
        <meta name="keywords" content="data deletion, privacy rights Australia, personal data removal, Downscale data deletion, Australian privacy principles" />
        <meta name="author" content="Downscale Weight Loss Clinic" />
        <meta name="language" content="en-AU" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Data Deletion Instructions | Downscale Weight Loss Clinic" />
        <meta property="og:description" content="Learn how to request deletion of your personal data from Downscale Weight Loss Clinic in compliance with Australian privacy laws." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/data-deletion" />
        <meta property="og:image" content="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131/og-image.jpg" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:site_name" content="Downscale Weight Loss Clinic" />
      </Head>
      <Header />
      <main className="min-h-screen bg-cream pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Data Deletion Instructions
              </h1>
              <div className="w-20 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-slate-600 text-lg max-w-3xl mx-auto">
                Your privacy is important to us. Here's how you can request deletion of your personal data from Downscale Weight Loss Clinic.
              </p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
              {/* Your Rights Section */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <i className="fas fa-shield-alt text-brown mr-3"></i>
                  Your Data Rights
                </h2>
                <div className="bg-slate-50 rounded-lg p-6 mb-6">
                  <p className="text-slate-700 text-lg leading-relaxed mb-4">
                    Under Australian Privacy Principles, you have the right to:
                  </p>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <i className="fas fa-check text-brown mt-1 mr-3"></i>
                      <span>Request access to your personal information</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-brown mt-1 mr-3"></i>
                      <span>Request correction of inaccurate information</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-brown mt-1 mr-3"></i>
                      <span>Request deletion of your personal data</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-check text-brown mt-1 mr-3"></i>
                      <span>Request portability of your data</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* How to Request Deletion */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <i className="fas fa-trash-alt text-brown mr-3"></i>
                  How to Request Data Deletion
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-brown/10 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      <i className="fas fa-envelope text-brown mr-2"></i>
                      Email Request
                    </h3>
                    <p className="text-slate-700 mb-4">
                      Send your deletion request to:
                    </p>
                    <div className="space-y-3">
                      <p className="text-brown font-semibold text-lg">
                        office@downscale.com.au
                      </p>
                      <ContactForm
                        triggerText="Send Data Deletion Request"
                        triggerClassName="bg-brown hover:bg-brown/90 text-white inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue/10 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">
                      <i className="fas fa-phone text-blue mr-2"></i>
                      Clinical Contact
                    </h3>
                    <p className="text-slate-700 mb-4">
                      Contact our main clinical site:
                    </p>
                    <a 
                      href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue hover:text-blue/80 font-semibold text-lg"
                    >
                      www.downscale.com.au
                    </a>
                  </div>
                </div>
              </section>

              {/* What to Include */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <i className="fas fa-list-check text-brown mr-3"></i>
                  Information to Include in Your Request
                </h2>
                
                <div className="bg-slate-50 rounded-lg p-6">
                  <p className="text-slate-700 mb-4">
                    To process your request efficiently, please include:
                  </p>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <i className="fas fa-user text-brown mt-1 mr-3"></i>
                      <span>Full name as provided to Downscale Weight Loss Clinic</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-envelope text-brown mt-1 mr-3"></i>
                      <span>Email address used for your account</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-calendar text-brown mt-1 mr-3"></i>
                      <span>Approximate dates of service</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-id-card text-brown mt-1 mr-3"></i>
                      <span>Verification of your identity (for security purposes)</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-file-alt text-brown mt-1 mr-3"></i>
                      <span>Specific data you wish to have deleted (if not all)</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Processing Timeline */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <i className="fas fa-clock text-brown mr-3"></i>
                  Processing Timeline
                </h2>
                
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="text-center bg-slate-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-brown mb-2">1-2</div>
                    <div className="text-slate-600">Days</div>
                    <div className="text-sm text-slate-700 mt-2">Initial acknowledgment</div>
                  </div>
                  <div className="text-center bg-slate-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-brown mb-2">7-14</div>
                    <div className="text-slate-600">Days</div>
                    <div className="text-sm text-slate-700 mt-2">Identity verification</div>
                  </div>
                  <div className="text-center bg-slate-50 rounded-lg p-6">
                    <div className="text-3xl font-bold text-brown mb-2">30</div>
                    <div className="text-slate-600">Days</div>
                    <div className="text-sm text-slate-700 mt-2">Complete deletion</div>
                  </div>
                </div>
              </section>

              {/* Important Notes */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <i className="fas fa-info-circle text-brown mr-3"></i>
                  Important Notes
                </h2>
                
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg">
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start">
                      <i className="fas fa-exclamation-triangle text-amber-500 mt-1 mr-3"></i>
                      <span>Some data may be retained for legal compliance requirements</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-hospital text-amber-500 mt-1 mr-3"></i>
                      <span>Clinical records may have specific retention requirements under health regulations</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-backup text-amber-500 mt-1 mr-3"></i>
                      <span>Backup systems may take additional time to fully process deletions</span>
                    </li>
                    <li className="flex items-start">
                      <i className="fas fa-share text-amber-500 mt-1 mr-3"></i>
                      <span>Data shared with third parties (like pathology providers) requires separate requests</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <i className="fas fa-headset text-brown mr-3"></i>
                  Need Help?
                </h2>
                
                <div className="bg-brown/10 rounded-lg p-6">
                  <p className="text-slate-700 mb-4">
                    If you have questions about data deletion or our privacy practices:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="fas fa-envelope text-brown mr-3"></i>
                      <span className="text-slate-700">Privacy Officer: </span>
                      <span className="text-brown ml-2">
                        office@downscale.com.au
                      </span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-globe text-brown mr-3"></i>
                      <span className="text-slate-700">Main Clinic: </span>
                      <a 
                        href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brown hover:text-brown/80 ml-2"
                      >
                        www.downscale.com.au
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer CTA */}
            <div className="text-center bg-slate-800 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h3>
              <p className="text-slate-300 mb-6">
                We're committed to protecting your personal information and respecting your privacy rights.
              </p>
              <a 
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brown hover:bg-brown/90 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center"
              >
                <i className="fas fa-arrow-right mr-2"></i>
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}