'use client';

import Link from 'next/link';
import React from 'react';
import { MapPin, ArrowRight, Stethoscope, Users, Calendar } from 'lucide-react';
interface WeightLossClinicLinksProps {
  currentLocation?: string;
  compact?: boolean;
}
export const WeightLossClinicLinks: React.FC<WeightLossClinicLinksProps> = ({
  currentLocation,
  compact = false
}) => {
  const locations = [{
    name: 'Sydney',
    path: '/weight-loss-clinic-sydney',
    state: 'NSW',
    accent: 'hsl(221, 83%, 53%)',
    bg: 'hsl(221, 83%, 97%)'
  }, {
    name: 'Melbourne',
    path: '/weight-loss-clinic-melbourne',
    state: 'VIC',
    accent: 'hsl(142, 76%, 36%)',
    bg: 'hsl(142, 76%, 97%)'
  }, {
    name: 'Brisbane',
    path: '/weight-loss-clinic-brisbane',
    state: 'QLD',
    accent: 'hsl(25, 95%, 53%)',
    bg: 'hsl(25, 95%, 97%)'
  }, {
    name: 'Perth',
    path: '/weight-loss-clinic-perth',
    state: 'WA',
    accent: 'hsl(271, 91%, 65%)',
    bg: 'hsl(271, 91%, 97%)'
  }, {
    name: 'Adelaide',
    path: '/weight-loss-clinic-adelaide',
    state: 'SA',
    accent: 'hsl(346, 87%, 43%)',
    bg: 'hsl(346, 87%, 97%)'
  }, {
    name: 'Gold Coast',
    path: '/weight-loss-clinic-gold-coast',
    state: 'QLD',
    accent: 'hsl(48, 96%, 53%)',
    bg: 'hsl(48, 96%, 97%)'
  }, {
    name: 'Canberra',
    path: '/weight-loss-clinic-canberra',
    state: 'ACT',
    accent: 'hsl(198, 93%, 60%)',
    bg: 'hsl(198, 93%, 97%)'
  }, {
    name: 'Newcastle',
    path: '/weight-loss-clinic-newcastle',
    state: 'NSW',
    accent: 'hsl(14, 100%, 57%)',
    bg: 'hsl(14, 100%, 97%)'
  }, {
    name: 'Geelong',
    path: '/weight-loss-clinic-geelong',
    state: 'VIC',
    accent: 'hsl(120, 100%, 25%)',
    bg: 'hsl(120, 100%, 97%)'
  }, {
    name: 'Sunshine Coast',
    path: '/weight-loss-clinic-sunshine-coast',
    state: 'QLD',
    accent: 'hsl(292, 84%, 61%)',
    bg: 'hsl(292, 84%, 97%)'
  }, {
    name: 'Wollongong',
    path: '/weight-loss-clinic-wollongong',
    state: 'NSW',
    accent: 'hsl(262, 83%, 58%)',
    bg: 'hsl(262, 83%, 97%)'
  }, {
    name: 'Hobart',
    path: '/weight-loss-clinic-hobart',
    state: 'TAS',
    accent: 'hsl(173, 80%, 40%)',
    bg: 'hsl(173, 80%, 97%)'
  }, {
    name: 'Darwin',
    path: '/weight-loss-clinic-darwin',
    state: 'NT',
    accent: 'hsl(35, 91%, 62%)',
    bg: 'hsl(35, 91%, 97%)'
  }];
  const filteredLocations = currentLocation ? locations.filter(loc => loc.name.toLowerCase() !== currentLocation.toLowerCase()) : locations;
  const displayLocations = compact ? filteredLocations.slice(0, 4) : filteredLocations;

  // JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Weight Loss Clinic Services Australia",
    "description": "Professional weight loss clinic services available across all Australian cities via telehealth",
    "numberOfItems": locations.length,
    "itemListElement": locations.map((location, index) => ({
      "@type": "MedicalOrganization",
      "position": index + 1,
      "name": `Weight Loss Clinic ${location.name}`,
      "description": `Professional weight loss clinic services for ${location.name}, ${null} residents via secure telehealth consultations`,
      "url": `https://www.downscale.com.au${location.path}`,
      "areaServed": {
        "@type": "City",
        "name": location.name,
        "addressRegion": null,
        "addressCountry": "AU"
      },
      "medicalSpecialty": "Weight Management",
      "serviceType": "Telehealth Weight Loss Consultations"
    }))
  };
  if (compact) {
    return (
      <>
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl mobile-card-spacing my-6 border border-primary/10">
            <h3 className="mobile-heading font-bold mb-4 text-center heading-beach">
              Weight Loss Clinic Services Across Australia
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {displayLocations.map(location => <Link key={location.name} href={location.path} className="group flex items-center justify-between mobile-button rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border-2" style={{
              backgroundColor: location.bg,
              borderColor: location.accent + '40'
            }}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 transition-transform group-hover:scale-110" style={{
                  color: location.accent
                }} />
                    <span className="mobile-small-text font-bold text-gray-900 dark:text-white">
                      {location.name}
                    </span>
                  </div>
                  <ArrowRight className="h-3 w-3 transition-all group-hover:translate-x-1" style={{
                color: location.accent
              }} />
                </Link>)}
            </div>
            {compact && filteredLocations.length > 4 && <div className="text-center mt-4">
                <Link href="/locations" className="text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                  View all Australian weight loss clinic locations →
                </Link>
              </div>}
          </div>
        </>
    );
  }
  return (
    <>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl mobile-card-spacing my-8 border border-primary/10">
          <div className="text-center mb-8">
            <h2 className="heading-beach font-bold mb-4">
              Weight Loss Clinic Services Across Australia
            </h2>
            <p className="mobile-text text-foreground/80 max-w-2xl mx-auto">
              Access professional weight loss clinic services from any location. Our virtual telehealth 
              consultations bring expert weight loss care directly to you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {displayLocations.map(location => <Link key={location.name} href={location.path} className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 mobile-card" style={{
            backgroundColor: location.bg,
            borderColor: location.accent + '60'
          }}>
                <div className="mobile-card-spacing">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg transition-transform group-hover:scale-110" style={{
                  backgroundColor: location.accent + '20'
                }}>
                      <MapPin className="h-5 w-5" style={{
                    color: location.accent
                  }} />
                    </div>
                    <div>
                      <h3 className="mobile-subheading font-bold transition-colors" style={{
                    color: location.accent
                  }}>
                        {location.name}
                      </h3>
                      <p className="mobile-small-text font-bold text-gray-800 dark:text-gray-200">{null}</p>
                    </div>
                  </div>
                  <p className="mobile-small-text text-gray-800 dark:text-gray-200 mb-4 leading-relaxed font-medium">
                    Weight Loss Clinic {location.name} — Book telehealth consultations for professional weight management care
                  </p>
                  <div className="flex items-center font-semibold mobile-small-text group-hover:gap-2 transition-all" style={{
                color: location.accent
              }}>
                    <span>Book Telehealth Appointment</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{
              backgroundColor: location.accent
            }} />
              </Link>)}
          </div>
          
          <div className="mt-8 sm:mt-12 mobile-card-spacing bg-gradient-to-r from-primary/90 to-accent/90 rounded-2xl text-gray-900 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="mobile-heading font-bold mb-4 flex items-center justify-center gap-3 heading-beach">
                <Stethoscope className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                Australia-Wide Weight Loss Clinic Access
              </h3>
              <p className="mobile-text mb-6 leading-relaxed text-gray-900">
                Can't find your location? Our weight loss clinic serves <strong>every corner of Australia</strong> through secure telehealth consultations. 
                From remote farms to city centers, boats to campsites — we're here for you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 mobile-small-text">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
                  <span className="font-medium">Rural & Remote Areas</span>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
                  <span className="font-medium">Medicare Bulk Billed 1st Appt</span>
                </div>
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
                  <span className="font-medium">All Australian Locations</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link href="/about" className="mobile-button bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
                  Learn About Our Australia-Wide Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/locations" className="mobile-button bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/10 transition-colors">
                  View All Locations
                  <MapPin className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};