'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, Scale, GripVertical, Menu, X, Settings, 
  ChevronDown, Stethoscope, Leaf, Dumbbell, Brain, Moon, Target,
  Calculator, ShoppingBag
} from "lucide-react";
import { EXTERNAL_LINKS } from "@/lib/constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const clinicalServices = [
  { name: 'Medical Weight Management', icon: Stethoscope, href: '/medical-weight-management' },
  { name: 'Nutrition & Meal Planning', icon: Leaf, href: '/nutrition-meal-planning' },
  { name: 'Movement & Activity', icon: Dumbbell, href: '/movement-activity-programs' },
  { name: 'Mental Health Support', icon: Brain, href: '/mental-health-support' },
  { name: 'Sleep & Recovery', icon: Moon, href: '/sleep-recovery-optimisation' },
  { name: 'Goal Setting & Maintenance', icon: Target, href: '/goal-setting-maintenance' }
];

const toolsMenu = [
  { name: 'All Tools', icon: '🔧', href: '/tools' },
  { name: 'Body Metrics Calculator', icon: Calculator, href: '/calculator' }
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clinicalMenuOpen, setClinicalMenuOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [portalsMenuOpen, setPortalsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const clinicalRef = useRef<HTMLDivElement | null>(null)
  const toolsRef = useRef<HTMLDivElement | null>(null)
  const portalsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced iOS-compatible body scroll lock
  useEffect(() => {
    if (mobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll (works on iOS)
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        const storedScrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(storedScrollY || '0') * -1);
      };
    }
  }, [mobileMenuOpen]);

  // Close dropdowns on outside click and on Escape key
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (clinicalRef.current && !clinicalRef.current.contains(e.target as Node)) {
        setClinicalMenuOpen(false)
      }
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsMenuOpen(false)
      }
      if (portalsRef.current && !portalsRef.current.contains(e.target as Node)) {
        setPortalsMenuOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
        setClinicalMenuOpen(false)
        setToolsMenuOpen(false)
        setPortalsMenuOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, []);

  const handleBookingRedirect = () => {
    window.open(EXTERNAL_LINKS.BOOKING_INITIAL, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/50 md:hidden animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav 
          role="navigation" 
          aria-label="Mobile navigation menu"
          className="fixed inset-0 z-[9999] bg-background md:hidden animate-in slide-in-from-right duration-300"
        >
          {/* Close Button - Visible and Fixed at Top Right */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="fixed top-4 right-4 z-10 p-3 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-all duration-200 touch-target shadow-lg"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          
          <div className="pt-[73px] h-full overflow-y-auto">
            <div className="container mx-auto px-4 py-6 space-y-4 pb-[calc(2rem+env(safe-area-inset-bottom))]">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary block py-3 text-lg font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-foreground hover:text-primary block py-3 text-lg font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/pricing" 
                className="text-foreground hover:text-primary block py-3 text-lg font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/blog" 
                className="text-foreground hover:text-primary block py-3 text-lg font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/faq" 
                className="text-foreground hover:text-primary block py-3 text-lg font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/locations" 
                className="text-foreground hover:text-primary block py-3 text-lg font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Locations
              </Link>
              
              {/* Portals Section */}
              <div className="pt-4 border-t border-border">
                <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-3">Portals</div>
                <div className="space-y-2">
                  <a
                    href="https://www.halaxy.com/a/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary block py-2 text-base font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ExternalLink className="h-4 w-4 mr-3" />
                    Halaxy Portal
                  </a>
                  <Link
                    href="/portal/login"
                    className="text-foreground hover:text-primary block py-2 text-base font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Clinical Portal
                  </Link>
                </div>
              </div>
              
              {/* Clinical Services */}
              <div className="pt-4 border-t border-border">
                <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-3">Clinical Services</div>
                <div className="space-y-2">
                  {clinicalServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="text-foreground hover:text-primary block py-2 text-base font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {service.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Tools */}
              <div className="pt-4 border-t border-border">
                <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-3">Tools</div>
                <div className="space-y-2">
                  {toolsMenu.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="text-foreground hover:text-primary block py-2 text-base font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all flex items-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {typeof Icon === 'string' ? (
                          <span className="mr-3">{Icon}</span>
                        ) : (
                          <Icon className="h-4 w-4 mr-3" />
                        )}
                        {tool.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Shop */}
              <div className="pt-4 border-t border-border">
                <a 
                  href="https://www.downscale.shop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary block py-3 text-lg font-medium border-l-4 border-transparent hover:border-primary hover:pl-3 transition-all flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4 mr-3" />
                  DOWNLOADABLE RESOURCES
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </div>
              
              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-border pb-8">
                <Button 
                  onClick={() => {
                    handleBookingRedirect();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium text-lg shadow-md py-3"
                >
                  Book Consultation
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border shadow-lg' : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border shadow-lg'
      }`}>
        {/* Main Header */}
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 flex justify-between items-center gap-2 lg:gap-4">
          <div className="cursor-pointer flex-shrink-0 flex items-center space-x-3 relative h-12">
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-1 rounded-lg bg-primary/10">
                <img 
                  src="/lovable-uploads/a0c37573-face-441d-8873-97dfc850d27c.png" 
                  alt="Downscale Australian Weight Loss Clinic Logo" 
                  className="h-8 w-8 object-contain"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Downscale</h1>
                <p className="text-sm text-muted-foreground">Weight Loss Clinic</p>
              </div>
            </Link>
            {/* Discrete admin access - tiny cogwheel */}
            <Link
              href="/portal/admin"
              className="absolute -top-1 -right-1 text-primary/50 hover:text-primary/80 transition-colors"
              title="Admin Dashboard"
            >
              <Settings className="h-3 w-3" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6 flex-1 justify-center overflow-hidden">
            <Link
              href="/"
              className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
            >
              About
            </Link>
            
            {/* Clinical Dropdown */}
            <div 
              className="relative"
              ref={clinicalRef}
            >
              <button
                className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full flex items-center whitespace-nowrap"
                onClick={() => setClinicalMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={clinicalMenuOpen}
                aria-controls="clinical-menu"
              >
                Clinical
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {clinicalMenuOpen && (
                <div 
                  id="clinical-menu"
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-2xl z-[100] pointer-events-auto"
                >
                  {clinicalServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        role="menuitem"
                        className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-muted/80 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg border-b border-border/50 last:border-b-0"
                        onClick={() => setClinicalMenuOpen(false)}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        <span className="text-sm font-medium">{service.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
            >
              Blog
            </Link>
            <Link
              href="/faq"
              className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
            >
              FAQ
            </Link>
            <Link
              href="/locations"
              className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full whitespace-nowrap"
            >
              Locations
            </Link>
            
            {/* Tools Dropdown */}
            <div 
              className="relative"
              ref={toolsRef}
            >
              <button
                className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full flex items-center whitespace-nowrap"
                onClick={() => setToolsMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={toolsMenuOpen}
                aria-controls="tools-menu"
              >
                Tools
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {toolsMenuOpen && (
                <div 
                  id="tools-menu"
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-2xl z-[100] pointer-events-auto"
                >
                  {toolsMenu.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-muted/80 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg border-b border-border/50 last:border-b-0"
                        onClick={() => setToolsMenuOpen(false)}
                      >
                        {typeof Icon === 'string' ? (
                          <span className="mr-3 text-base">{Icon}</span>
                        ) : (
                          <Icon className="h-4 w-4 mr-3" />
                        )}
                        <span className="text-sm font-medium">{tool.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Shop Link */}
            <a
              href="https://www.downscale.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full flex items-center whitespace-nowrap"
            >
              <span className="hidden xl:inline">DOWNLOADABLE RESOURCES</span>
              <span className="xl:hidden">DOWNLOADS</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </nav>

          {/* Desktop Portals Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            <div
              className="relative"
              ref={portalsRef}
            >
              <button
                className="text-foreground hover:text-primary font-medium text-xs lg:text-sm tracking-wider uppercase relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full flex items-center whitespace-nowrap"
                onClick={() => setPortalsMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={portalsMenuOpen}
                aria-controls="portals-menu"
              >
                Portals
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              {portalsMenuOpen && (
                <div
                  id="portals-menu"
                  role="menu"
                  className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-2xl z-[100] pointer-events-auto"
                >
                  <a
                    href="https://www.halaxy.com/a/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    className="flex items-center px-4 py-3 text-foreground hover:text-primary hover:bg-muted/80 transition-all duration-200 first:rounded-t-lg border-b border-border/50"
                    onClick={() => setPortalsMenuOpen(false)}
                  >
                    <ExternalLink className="h-4 w-4 mr-3" />
                    <div>
                      <span className="text-sm font-medium block">Halaxy Portal</span>
                      <span className="text-xs text-muted-foreground">Appointments, payments, invoices</span>
                    </div>
                  </a>
                  <Link
                    href="/portal/login"
                    role="menuitem"
                    className="flex items-center px-4 py-3 text-foreground hover:bg-muted/80 transition-all duration-200 last:rounded-b-lg"
                    onClick={() => setPortalsMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    <div>
                      <span className="text-sm font-medium block">Clinical Portal</span>
                      <span className="text-xs text-muted-foreground">Patient education & tools platform</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button - Enhanced touch target */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden text-foreground hover:text-primary touch-target flex items-center justify-center rounded-lg transition-all duration-200 active:bg-primary/10"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
    </>
  );
}