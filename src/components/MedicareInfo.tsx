import Head from "next/head";
import { Layout } from '@/components/layout/Layout';

export default function MedicareInfo() {
  return (
    <>
      <Head>
        <title>Medicare Information | Downscale Australia</title>
        <meta name="description" content="Affordable $45 consultations. Holistic care for all Australians - Medicare processed where applicable. Learn about accessing our kind, whole-person telehealth weight management services." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://downscale.health/medicare" />
        
        {/* Enhanced SEO metadata */}
        <meta name="keywords" content="Medicare bulk billing weight loss, telehealth Medicare rebate, weight management Medicare, Downscale Medicare eligibility, weight loss clinic Medicare Australia, nurse practitioner Medicare" />
        <meta name="author" content="Downscale Weight Loss Clinic" />
        <meta name="language" content="en-AU" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Medicare Information | Downscale Weight Loss Clinic Australia" />
        <meta property="og:description" content="Learn about Medicare bulk billing and eligibility for Downscale's clinical weight management services. Find out how to access our telehealth appointments through Medicare and what costs may be covered." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://downscale.health/medicare" />
        <meta property="og:image" content="https://downscale.health/og-medicare.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:site_name" content="Downscale Weight Loss Clinic" />
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Medicare Information | Downscale Weight Loss Clinic" />
        <meta name="twitter:description" content="Learn about Medicare bulk billing and eligibility for Downscale's clinical weight management services." />
        <meta name="twitter:image" content="https://downscale.health/og-medicare.jpg" />
        
        {/* Structured Data - Medical Information */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Medicare Information | Downscale Weight Loss Clinic",
              "description": "Information about Medicare bulk billing and eligibility for Downscale's clinical weight management services. Includes details on accessing telehealth appointments through Medicare.",
              "about": {
                "@type": "MedicalBusiness",
                "name": "Downscale Weight Loss Clinic",
                "url": "https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131"
              },

              "publisher": {
                "@type": "Organization",
                "name": "Downscale Weight Loss Clinic",
                "logo": "https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131/og-image.jpg"
              },
              "specialty": "Weight Management"
            }
          `}
        </script>
      </Head>
      <Layout>
        <main className="flex-grow bg-slate-900">
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold text-cream mb-8">Medicare Information</h1>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="bg-slate-800/90 rounded-xl p-8 shadow-lg border border-slate-700/30 mb-8">
                  <h2 className="text-2xl font-bold text-cream mb-4">Medicare Bulk Billing</h2>
                  <p className="text-white/80 mb-4">
                    Downscale is committed to making weight management care accessible to all Australians. 
                    We offer bulk billed initial consultations for eligible Medicare card holders.
                  </p>
                  <p className="text-white/80 mb-4">
                    This means there is no out-of-pocket cost for your first appointment if you have a valid Medicare card
                    and meet the clinical criteria for weight management support.
                  </p>
                </div>
                
                <div className="bg-slate-800/90 rounded-xl p-8 shadow-lg border border-slate-700/30 mb-8">
                  <h2 className="text-2xl font-bold text-cream mb-4">Eligibility Requirements</h2>
                  <p className="text-white/80 mb-4">
                    To be eligible for Medicare bulk billing with Downscale, you need:
                  </p>
                  <ul className="list-disc pl-6 text-white/80 mb-4 space-y-2">
                    <li>A valid Medicare card</li>
                    <li>A BMI over 27 with weight-related health conditions, or a BMI over 30</li>
                    <li>To be physically located in Australia during your telehealth appointment</li>
                  </ul>
                  <p className="text-white/80">
                    Our clinicians will assess your eligibility during your initial consultation.
                  </p>
                </div>
                
                <div className="bg-slate-800/90 rounded-xl p-8 shadow-lg border border-slate-700/30 mb-8">
                  <h2 className="text-2xl font-bold text-cream mb-4">Follow-up Appointments</h2>
                  <p className="text-white/80 mb-4">
                    Follow-up appointments are typically not bulk billed, but we offer competitive rates to ensure
                    ongoing care is accessible.
                  </p>
                  <p className="text-white/80">
                    Please discuss your specific circumstances with your clinical provider during your initial consultation.
                  </p>
                </div>
                
                <div className="bg-slate-800/90 rounded-xl p-8 shadow-lg border border-slate-700/30">
                  <h2 className="text-2xl font-bold text-cream mb-4">Booking Your Medicare Appointment</h2>
                  <p className="text-white/80 mb-6">
                    Ready to book your bulk billed initial consultation? Click the button below to access our online booking system.
                  </p>
                  <a 
                    href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-brown hover:bg-brown/90 text-white text-lg font-medium px-8 py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <i className="fas fa-calendar-check mr-3"></i>
                    <span>Book Your Bulk Billed Consultation</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}