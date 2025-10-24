'use client';

import Head from "next/head";
import Link from 'next/link';
import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Users, Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { OptimizedBackground } from '@/components/ui/optimized-background';
import { PageNavigation } from '@/components/navigation/PageNavigation';
// Hero image served from /public/ for instant CDN loading
import { Layout } from "@/components/layout/Layout";
import { EXTERNAL_LINKS } from '@/lib/constants';

const locationCities = [
  { name: 'Sydney', path: '/weight-loss-clinic-sydney', state: 'NSW' },
  { name: 'Melbourne', path: '/weight-loss-clinic-melbourne', state: 'VIC' },
  { name: 'Brisbane', path: '/weight-loss-clinic-brisbane', state: 'QLD' },
  { name: 'Perth', path: '/weight-loss-clinic-perth', state: 'WA' },
  { name: 'Adelaide', path: '/weight-loss-clinic-adelaide', state: 'SA' },
  { name: 'Gold Coast', path: '/weight-loss-clinic-gold-coast', state: 'QLD' },
  { name: 'Canberra', path: '/weight-loss-clinic-canberra', state: 'ACT' },
  { name: 'Newcastle', path: '/weight-loss-clinic-newcastle', state: 'NSW' },
  { name: 'Hobart', path: '/weight-loss-clinic-hobart', state: 'TAS' },
  { name: 'Darwin', path: '/weight-loss-clinic-darwin', state: 'NT' },
  { name: 'Geelong', path: '/weight-loss-clinic-geelong', state: 'VIC' },
  { name: 'Sunshine Coast', path: '/weight-loss-clinic-sunshine-coast', state: 'QLD' },
  { name: 'Wollongong', path: '/weight-loss-clinic-wollongong', state: 'NSW' }
];

const statesAndTerritories = [
  { name: 'New South Wales', abbreviation: 'NSW' },
  { name: 'Victoria', abbreviation: 'VIC' },
  { name: 'Queensland', abbreviation: 'QLD' },
  { name: 'Western Australia', abbreviation: 'WA' },
  { name: 'South Australia', abbreviation: 'SA' },
  { name: 'Tasmania', abbreviation: 'TAS' },
  { name: 'Australian Capital Territory', abbreviation: 'ACT' },
  { name: 'Northern Territory', abbreviation: 'NT' }
];

export default function LocationsPage() {
  const handleBookingRedirect = () => {
    window.open(EXTERNAL_LINKS.BOOKING_INITIAL, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      <Head>
        <title>Weight Loss Clinic Locations Australia-wide | Downscale Weight Loss Clinic</title>
        <meta name="description" content="Downscale Weight Loss Clinic serves all Australian states and territories via telehealth. Professional weight loss clinics covering metro, regional and remote areas nationwide." />
        <meta name="keywords" content="weight loss clinic Australia, telehealth weight loss, Australia-wide weight management, all states territories weight loss" />
        <link rel="canonical" href="https://www.downscale.com.au/locations" />
        <link rel="preload" href="/australian-outback-hero.jpg" as="image" type="image/jpeg" />
        
        <meta property="og:title" content="Weight Loss Clinic Locations Australia-wide | Downscale Weight Loss Clinic" />
        <meta property="og:description" content="Professional weight loss services available across all Australian states and territories via telehealth consultation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/locations" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Weight Loss Clinic Locations Australia",
            "description": "Professional weight loss clinics serving all Australian states and territories via telehealth",
            "url": "https://www.downscale.com.au/locations",
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": locationCities.length,
              "itemListElement": locationCities.map((city, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "MedicalBusiness",
                  "name": `Weight Loss Clinic ${city.name}`,
                  "url": `https://www.downscale.com.au${city.path}`,
                  "areaServed": {
                    "@type": "City",
                    "name": city.name,
                    "addressRegion": city.state,
                    "addressCountry": "AU"
                  }
                }
              }))
            },
            "provider": {
              "@type": "MedicalOrganization",
              "name": "Downscale Weight Loss Clinic",
              "url": "https://www.downscale.com.au",
              "areaServed": {
                "@type": "Country",
                "name": "Australia"
              },
              "medicalSpecialty": "Weight Management"
            }
          })}
        </script>
      </Head>
      {/* Hero Section - Camping/Outdoor Australia */}
      <div 
        className="relative min-h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: 'url(/locations-hero-camping.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Hidden preload for instant loading */}
        <img 
          src="/locations-hero-camping.webp" 
          alt="" 
          className="hidden" 
          fetchPriority="high" 
          loading="eager"
        />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" 
            style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}
          >
            Weight Loss Clinics
            <span className="block">Across Australia</span>
          </h1>
          <div className="w-20 h-1 bg-cream/80 mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}>
            We serve all of Australia (all states and territories), including <strong>regional and remote areas</strong> via telehealth. 
            Professional consultations for weight loss and general health issues for the <strong>whole family, including children</strong>.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full" style={{ color: '#f7f2d3', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              <MapPin className="h-4 w-4 mr-2" />
              All 8 States & Territories
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full" style={{ color: '#f7f2d3', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              <Phone className="h-4 w-4 mr-2" />
              Telehealth Consultations
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full" style={{ color: '#f7f2d3', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              <Clock className="h-4 w-4 mr-2" />
              7 Days a Week
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-2">
        <PageNavigation />
      </div>
      <div className="container mx-auto px-4 mt-8">
        {/* Major Cities Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 heading-beach">Major City Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationCities.map((city) => (
              <Card key={city.path} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {city.name}
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {city.state}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Professional weight loss clinic serving {city.name} and surrounding areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link 
                    href={city.path}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    View {city.name} Clinic
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Remote & Rural Australia */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 heading-beach">Remote & Rural Australia</h2>
          <div className="bg-card/95 backdrop-blur-sm rounded-lg p-8 border border-border/20">
            <div className="text-center mb-8">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">No Matter Where You Are</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Living in remote or rural Australia doesn't mean compromising on healthcare. Our telehealth platform 
                connects you with experienced professionals regardless of your location - from the Outback to coastal towns, 
                farming communities to mining sites.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  Remote Areas We Serve
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Outback communities</li>
                  <li>• Mining towns & FIFO workers</li>
                  <li>• Rural farming properties</li>
                  <li>• Coastal fishing villages</li>
                  <li>• Island communities</li>
                  <li>• Indigenous communities</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3 flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  Easy Access Requirements
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Basic internet connection</li>
                  <li>• Smartphone, tablet, or computer</li>
                  <li>• Medicare card</li>
                  <li>• No travel required</li>
                  <li>• Flexible appointment times</li>
                  <li>• Prescriptions sent to local pharmacy</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* States & Territories Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 heading-beach">Complete Australian Coverage</h2>
          <div className="bg-card rounded-lg p-6">
            <p className="text-center text-muted-foreground mb-6">
              Our telehealth services are available in all Australian states and territories:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {statesAndTerritories.map((state) => (
                <div key={state.abbreviation} className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="font-semibold text-foreground">{state.abbreviation}</div>
                  <div className="text-sm text-muted-foreground">{state.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Family Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 heading-beach">Whole Family Healthcare</h2>
          <div className="bg-card/95 backdrop-blur-sm rounded-lg p-8 border border-border/20">
            <div className="text-center mb-8">
              <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Not Just Weight Loss</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                While we specialise in weight management, our qualified Nurse Practitioners can help with a wide range 
                of health concerns for your entire family, including children and adolescents.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">General Health</h4>
                <p className="text-sm text-muted-foreground">Cold & flu, minor infections, skin conditions, routine health checks</p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Children's Health</h4>
                <p className="text-sm text-muted-foreground">Pediatric consultations, growth concerns, behavioral health, school health issues</p>
              </div>
              <div className="text-center">
                <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">Ongoing Care</h4>
                <p className="text-sm text-muted-foreground">Chronic disease management, prescription renewals, health monitoring</p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Information */}
        <section className="text-center bg-card/95 backdrop-blur-sm rounded-lg p-8 border border-border/20">
          <h2 className="text-2xl font-bold mb-4 heading-beach">Nationwide Telehealth Service</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're in a major city, regional town, or remote area, our experienced Nurse Practitioners 
            provide professional weight management consultations via secure telehealth technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Metro, Regional & Remote</h3>
              <p className="text-sm text-muted-foreground">Serving all areas across Australia</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Telehealth</h3>
              <p className="text-sm text-muted-foreground">AHPRA-compliant video consultations</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-muted-foreground">Appointments to suit your timezone</p>
            </div>
          </div>
          
          <a
            href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <img src="https://cdn.halaxy.com/h/images/logo.png" alt="Halaxy" className="h-5 w-5 mr-2" />
            Book Your Consultation Today
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </section>
      </div>
    </Layout>
  );
}