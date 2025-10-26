'use client';

import Head from "next/head";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Downscale Australia</title>
        <meta name="description" content="Read Downscale's privacy policy to understand how we collect, store, and protect your personal health information. We're committed to your data security and privacy in compliance with the Privacy Act 1988 (Cth)." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.downscale.com.au/privacy" />
        
        {/* Enhanced SEO metadata */}
        <meta name="keywords" content="Downscale privacy policy, health data privacy Australia, telehealth privacy, medical information security, Australian privacy principles, privacy act compliance" />
        <meta name="author" content="Downscale Weight Loss Clinic" />
        <meta name="language" content="en-AU" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content="Privacy Policy | Downscale | Clinical Weight Loss Support Australia" />
        <meta property="og:description" content="Read Downscale's privacy policy to understand how we collect, store, and protect your personal health information in compliance with Australian privacy laws." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/privacy" />
        <meta property="og:image" content="https://www.downscale.com.au/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:site_name" content="Downscale Weight Loss Clinic" />
        
        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | Downscale | Clinical Weight Loss Support" />
        <meta name="twitter:description" content="Read Downscale's privacy policy to understand how we collect, store, and protect your personal health information." />
        <meta name="twitter:image" content="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131/og-image.jpg" />
        
        {/* Structured Data - Legal Document */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Privacy Policy | Downscale Weight Loss Clinic",
              "description": "Our privacy policy explains how we collect, store, and protect your personal health information in compliance with Australian privacy laws.",
              "publisher": {
                "@type": "Organization",
                "name": "Downscale Weight Loss Clinic",
                "logo": "https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131/og-image.jpg"
              },
              "datePublished": "2025-04-21",
              "dateModified": "2025-04-21",
              "inLanguage": "en-AU",
              "isPartOf": {
                "@type": "WebSite",
                "url": "https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131",
                "name": "Downscale Weight Loss Clinic"
              },
              "about": {
                "@type": "Thing",
                "name": "Privacy and Data Protection"
              },
              "specialty": "Healthcare Privacy"
            }
          `}
        </script>
      </Head>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header />
        <main className="flex-grow py-20">
          <div className="container mx-auto px-4 py-10">
            <div className="max-w-4xl mx-auto bg-slate-800/90 shadow-xl rounded-xl p-8 sm:p-12 text-cream">
              <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
              
              <div className="prose prose-invert prose-lg max-w-none prose-headings:text-brown prose-p:text-cream/90 prose-p:mb-6 prose-strong:text-white prose-li:text-cream/90">
                <p className="italic mb-8">Effective Date: April 2025</p>

                <p>At Downscale, we're committed to protecting your personal and health information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). This Privacy Policy explains how we collect, use, store, and share your information as a clinical healthcare provider in Australia.</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">1. Who We Are</h3>
                <p>Downscale is an Australian telehealth weight loss clinic offering evidence-based care, including medical assessments, pathology reviews, nutritional guidance, and treatment support for individuals aged 12 and up. Our care is provided by qualified Nurse Practitioners and allied health professionals.</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">2. What We Collect</h3>
                <p>We collect personal and sensitive health information that may include:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Name, address, contact details, date of birth</li>
                  <li>Medicare and private health fund details</li>
                  <li>Medical history, medications, allergies</li>
                  <li>Pathology results and progress notes</li>
                  <li>Lifestyle factors relevant to your treatment</li>
                  <li>Appointment and payment records</li>
                  <li>Communication preferences and consent forms</li>
                </ul>
                <p>We collect this information directly from you or with your consent from third parties such as GPs or pathology providers.</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">3. Clinical Records & Software – Halaxy</h3>
                <p>We securely store all clinical records using Halaxy, a healthcare platform that complies with Australian privacy legislation, including:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Australian Privacy Principles</li>
                  <li>ISO 27001 certification</li>
                  <li>AES-256 encryption</li>
                  <li>Medicare e-Claiming and e-Script functionality</li>
                </ul>
                <p>We use secure Australian-based servers to host all data, and only authorised practitioners at Downscale can access your records. All systems comply with Australian privacy regulations and healthcare data protection standards.</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">4. Why We Collect Your Information</h3>
                <p>We collect personal information to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Provide safe, personalised medical care</li>
                  <li>Assess your eligibility for treatment</li>
                  <li>Prescribe and send medications via e-script</li>
                  <li>Coordinate referrals and pathology</li>
                  <li>Issue certificates (e.g., medical or work leave)</li>
                  <li>Claim Medicare rebates</li>
                  <li>Communicate with you about your care (e.g., SMS, email)</li>
                  <li>Improve our services (de-identified data only)</li>
                </ul>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">5. Consent Before Treatment</h3>
                <p>Before starting any clinical care, we will ask you to sign a Consent Form, which includes:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Agreement to our clinical care model</li>
                  <li>Permission to store and access your health records</li>
                  <li>Consent to communicate with you via phone, SMS, or email</li>
                  <li>Acknowledgment of risks, benefits, and rights</li>
                </ul>
                <p>This is a Medicare requirement and ensures informed, safe care. You can withdraw consent at any time.</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">6. Sharing of Information</h3>
                <p>We only share your information:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>With your consent</li>
                  <li>With other treating professionals (e.g. your GP)</li>
                  <li>To send prescriptions or pathology forms</li>
                  <li>When legally required (e.g. court subpoena, public health risk)</li>
                  <li>To process payments (handled via Stripe, which is PCI-compliant)</li>
                  <li>In an emergency, with your nominated contact or emergency services</li>
                </ul>
                <p>We never sell or trade your information.</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">7. Storage, Security & Access</h3>
                <p>Your records are:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Stored securely via Halaxy (encrypted, Australian servers)</li>
                  <li>Protected by multi-factor authentication and strict access controls</li>
                  <li>Never transferred overseas without your written consent</li>
                </ul>
                <p>You may request to access or correct your information by contacting us below. We will respond within 30 days as per Australian law.</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">8. Marketing & Cookies</h3>
                <p>We may use cookies or analytics tools (e.g., Google Analytics) to improve our website. These do not identify you personally and you can opt-out via your browser settings.</p>
                <p>We do not use your clinical data for any marketing purposes unless you've explicitly opted in.</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">9. Your Rights</h3>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Access your health records</li>
                  <li>Correct inaccurate or outdated details</li>
                  <li>Withdraw your consent</li>
                  <li>Make a privacy complaint</li>
                </ul>
                <p>To do so, contact our Privacy Officer via the email below.</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">10. Complaints</h3>
                <p>If you have concerns about your privacy, contact:</p>
                <p><strong>Privacy Officer – Downscale</strong><br />
                📧 office@downscale.com.au</p>
                <p>We take complaints seriously and aim to resolve them within 30 days.</p>
                <p>If unresolved, you can contact:<br />
                Office of the Australian Information Commissioner (OAIC)<br />
                📞 1300 363 992 | 🌐 www.oaic.gov.au</p>

                <div className="w-full border-b border-slate-700 my-8"></div>

                <h3 className="text-xl font-semibold mb-4">11. Contact Us</h3>
                <p>If you have questions about this Privacy Policy or your personal data, please contact:</p>
                <p>📧 office@downscale.com.au<br />
                📍 Downscale Pty Ltd<br />
                🖥️ www.downscale.com.au</p>
              </div>
              
              <div className="mt-10 flex justify-center">
                <a 
                  href="/" 
                  className="bg-brown text-white px-8 py-3 rounded-md hover:bg-opacity-90 transition inline-flex items-center shadow-lg"
                >
                  <span>Back to Home</span>
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}