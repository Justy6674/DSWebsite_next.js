import Link from 'next/link';
import { Scale, Settings } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/10 py-4 sm:py-6 mobile-container">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/20">
                <img 
                  src="/lovable-uploads/a0c37573-face-441d-8873-97dfc850d27c.png" 
                  alt="Downscale Australian Weight Loss Clinic Logo" 
                  className="h-5 w-5 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">Downscale Weight Loss Clinic</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Professional weight management support through qualified Australian healthcare providers.
            </p>
            <p className="text-muted-foreground text-xs">
              ABN: 120 481 481 74
            </p>
            
            {/* Enhanced Social Proof Section */}
            <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-sm font-semibold mb-3 text-foreground">Join 2,000+ Australians</p>
              <div className="flex flex-col gap-3">
                <a 
                  href="https://www.facebook.com/445168355337624" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Facebook</p>
                    <p className="text-xs text-muted-foreground">1,500+ followers</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.instagram.com/downscale_weightloss" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 rounded hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Instagram</p>
                    <p className="text-xs text-muted-foreground">@downscale_weightloss</p>
                  </div>
                </a>
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Real Australian weight loss journeys, daily tips & clinical insights
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-3 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors touch-target block py-1">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-foreground transition-colors touch-target block py-1">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors touch-target block py-1">FAQ</Link></li>
              <li><Link href="/tools" className="hover:text-foreground transition-colors touch-target block py-1">Tools</Link></li>
              <li><Link href="/calculator" className="hover:text-foreground transition-colors touch-target block py-1">Calculator</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-3 text-sm sm:text-base">Coverage</h4>
            <p className="text-muted-foreground text-sm mb-2">
              🇦🇺 All of Australia
            </p>
            <Link
              href="/locations"
              className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
            >
              View 26+ Locations →
            </Link>
          </div>
          
          <div>
            <h4 className="text-foreground font-semibold mb-3 text-sm sm:text-base">Legal & Policies</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-foreground transition-colors touch-target block py-1">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors touch-target block py-1">Privacy Policy</Link></li>
              <li><Link href="/medicare" className="hover:text-foreground transition-colors touch-target block py-1">Medicare Billing</Link></li>
              <li><Link href="/complaints" className="hover:text-foreground transition-colors touch-target block py-1">Complaints & Feedback</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/20 text-center">
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
            © 2025 Downscale Weight Loss Clinic. Registered healthcare provider in Australia.
            All clinical services subject to professional assessment and eligibility.
          </p>
          <Link
            href="/blog-admin"
            className="text-muted-foreground/50 hover:text-muted-foreground transition-colors inline-flex items-center gap-1 text-xs mt-2"
            title="Admin"
          >
            <Settings className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}