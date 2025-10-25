import Head from "next/head";
import { Layout } from '@/components/layout/Layout';

export default function MedicareInfo() {
  return (
    <>
      <Head>
        <title>Transparent $45 Pricing | Downscale Australia</title>
        <meta name="description" content="Affordable $45 maximum out-of-pocket consultations for all Australians. Learn about accessing our transparent, whole-person telehealth weight management services." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://downscale.health/medicare" />
        
        {/* Enhanced SEO metadata */}
        <meta name="keywords" content="affordable weight loss, transparent pricing telehealth, $45 weight management, accessible weight loss clinic Australia, nurse practitioner affordable" />
        <meta name="author" content="Downscale Weight Loss Clinic" />
        <meta name="language" content="en-AU" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Transparent $45 Pricing | Downscale Weight Loss Clinic Australia" />
        <meta property="og:description" content="Learn about our transparent $45 maximum out-of-pocket pricing for all consultations. Accessible weight management care for all Australians." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://downscale.health/medicare" />
        <meta property="og:image" content="https://downscale.health/og-medicare.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:site_name" content="Downscale Weight Loss Clinic" />
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Transparent $45 Pricing | Downscale Weight Loss Clinic" />
        <meta name="twitter:description" content="Learn about our transparent $45 maximum out-of-pocket pricing for accessible weight management care." />
        <meta name="twitter:image" content="https://downscale.health/og-medicare.jpg" />
        
        {/* Structured Data - Medical Information */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Transparent Pricing Information | Downscale Weight Loss Clinic",
              "description": "Information about our transparent $45 maximum out-of-pocket pricing for all consultations. Accessible weight management care for all Australians.",
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
              <h1 className="text-4xl md:text-5xl font-bold text-cream mb-8">Transparent $45 Pricing</h1>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <div className="bg-slate-800/90 rounded-xl p-8 shadow-lg border border-slate-700/30 mb-8">
                  <h2 className="text-2xl font-bold text-cream mb-4">Transparent $45 Pricing</h2>
                  <p className="text-white/80 mb-4">
                    Downscale is committed to making weight management care accessible to all Australians.
                    All consultations are $45 maximum out-of-pocket for transparent, affordable healthcare.
                  </p>
                  <p className="text-white/80 mb-4">
                    This means you'll never pay more than $45 for any consultation, with no hidden fees or surprise costs.
                    Simple, straightforward pricing for everyone.
                  </p>
                </div>
                
                <div className="bg-slate-800/90 rounded-xl p-8 shadow-lg border border-slate-700/30 mb-8">
                  <h2 className="text-2xl font-bold text-cream mb-4">Simple Requirements</h2>
                  <p className="text-white/80 mb-4">
                    To access our $45 consultations, you simply need:
                  </p>
                  <ul className="list-disc pl-6 text-white/80 mb-4 space-y-2">
                    <li>To be physically located in Australia during your telehealth appointment</li>
                    <li>An internet connection for video consultation (or phone for audio-only)</li>
                    <li>Commitment to your health and weight management journey</li>
                  </ul>
                  <p className="text-white/80">
                    No complex eligibility requirements - our care is accessible to all Australians.
                  </p>
                </div>
                
                <div className="bg-slate-800/90 rounded-xl p-8 shadow-lg border border-slate-700/30 mb-8">
                  <h2 className="text-2xl font-bold text-cream mb-4">All Appointments</h2>
                  <p className="text-white/80 mb-4">
                    All appointments - initial, follow-up, check-ins - are $45 maximum out-of-pocket.
                    Consistent, transparent pricing throughout your entire weight management journey.
                  </p>
                  <p className="text-white/80">
                    No price increases, no surprise fees, no complicated billing structures.
                  </p>
                </div>
                
                <div className="bg-slate-800/90 rounded-xl p-8 shadow-lg border border-slate-700/30">
                  <h2 className="text-2xl font-bold text-cream mb-4">Booking Your $45 Consultation</h2>
                  <p className="text-white/80 mb-6">
                    Ready to book your $45 consultation? Click the button below to access our online booking system.
                  </p>
                  <a 
                    href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-brown hover:bg-brown/90 text-white text-lg font-medium px-8 py-4 rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <i className="fas fa-calendar-check mr-3"></i>
                    <span>Book Your $45 Consultation</span>
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