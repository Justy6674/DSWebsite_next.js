'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Package, Star, ExternalLink, Shield, Truck, CreditCard } from 'lucide-react';
import { Button } from "@/components/ui/button";

const shopContent = [
  {
    id: 'pharmacy-products',
    title: 'Compounding Pharmacy Products',
    description: 'TGA-approved compounded medications and specialised formulations',
    type: 'pharmacy',
    items: [
      {
        title: 'Custom GLP-1 Formulations',
        availability: 'Prescription required',
        forms: 'Injection, oral',
        description: 'Personalised GLP-1 medications compounded to your specific needs and dosing requirements'
      },
      {
        title: 'Vitamin B12 Injections',
        dosage: 'Multiple strengths',
        frequency: 'Weekly/monthly',
        description: 'High-quality B12 injections to support energy and metabolism during weight loss'
      },
      {
        title: 'Thyroid Support Compounds',
        formulations: 'T3, T4, combination',
        testing: 'Blood work required',
        description: 'Customised thyroid medications when standard treatments aren\'t optimal'
      },
      {
        title: 'Appetite Suppressant Compounds',
        options: '5 active ingredients',
        duration: '30-90 day supplies',
        description: 'Compounded appetite suppressants for patients who need additional hunger control'
      }
    ]
  },
  {
    id: 'supplements',
    title: 'Evidence-Based Supplements',
    description: 'Practitioner-grade supplements to support weight management and overall health',
    type: 'supplements',
    items: [
      {
        title: 'Omega-3 Professional Grade',
        dosage: '2000mg EPA/DHA',
        quality: 'Third-party tested',
        description: 'High-potency fish oil to reduce inflammation and support cardiovascular health'
      },
      {
        title: 'Magnesium Glycinate Complex',
        dosage: '400mg elemental',
        benefits: 'Sleep, muscle, stress',
        description: 'Highly bioavailable magnesium for better sleep quality and stress management'
      },
      {
        title: 'Vitamin D3 + K2',
        dosage: '5000IU + 100mcg',
        form: 'Liquid or capsule',
        description: 'Optimal ratio for bone health, immune function, and hormone regulation'
      },
      {
        title: 'Probiotic Multi-Strain',
        strains: '15 billion CFU',
        stability: 'Shelf-stable',
        description: 'Support gut health and digestion during weight loss and medication changes'
      }
    ]
  },
  {
    id: 'devices-equipment',
    title: 'Health Monitoring Devices',
    description: 'Professional-grade devices for tracking progress and health metrics',
    type: 'devices',
    items: [
      {
        title: 'Body Composition Scale',
        metrics: 'Weight, BF%, muscle, water',
        connectivity: 'WiFi + Bluetooth',
        description: 'Track more than just weight with comprehensive body composition analysis'
      },
      {
        title: 'Continuous Glucose Monitor',
        brands: 'FreeStyle Libre, Dexcom',
        duration: '14-day sensors',
        description: 'Monitor glucose response to foods and optimise meal timing and choices'
      },
      {
        title: 'Blood Pressure Monitor',
        accuracy: 'Clinically validated',
        features: 'Memory, app sync',
        description: 'Professional-grade monitoring for patients with cardiovascular considerations'
      },
      {
        title: 'Smart Food Scale',
        database: '8000+ foods',
        connectivity: 'App integration',
        description: 'Accurate portion control with automatic macro calculation and tracking'
      }
    ]
  },
  {
    id: 'educational-products',
    title: 'Educational Product Guides',
    description: 'Learn which products you actually need and how to use them effectively',
    type: 'education',
    items: [
      {
        title: 'Supplement Needs Assessment',
        format: 'Interactive questionnaire',
        duration: '15 minutes',
        description: 'Personalised assessment to identify which supplements would benefit your specific situation'
      },
      {
        title: 'Device Selection Guide',
        categories: '6 device types',
        budget_ranges: '$50 to $500+',
        description: 'Choose the right monitoring devices based on your goals, budget, and tech comfort'
      },
      {
        title: 'Quality vs Price Analysis',
        products: '50+ reviewed items',
        criteria: 'Efficacy, value, safety',
        description: 'Understand when to invest in premium products vs when budget options are sufficient'
      },
      {
        title: 'Timing & Dosage Optimisation',
        categories: 'Medications, supplements',
        interactions: 'Food, timing, combinations',
        description: 'Maximise effectiveness by understanding optimal timing and dosage strategies'
      }
    ]
  },
  {
    id: 'affiliate-recommendations',
    title: 'Trusted Partner Products',
    description: 'Curated recommendations from verified Australian suppliers',
    type: 'affiliate',
    items: [
      {
        title: 'Amazon Australia Health',
        categories: 'Devices, books, equipment',
        shipping: 'Prime eligible',
        description: 'Carefully selected health and wellness products available with fast Australian shipping'
      },
      {
        title: 'Chemist Warehouse Partners',
        locations: '500+ stores nationwide',
        discounts: 'Exclusive pricing',
        description: 'In-store and online access to supplements and health products at practitioner rates'
      },
      {
        title: 'Fitness Equipment Suppliers',
        speciality: 'Home gym, resistance',
        warranty: '12-24 months',
        description: 'Quality exercise equipment specifically chosen for home-based weight loss programs'
      },
      {
        title: 'Meal Delivery Services',
        options: '3 vetted services',
        customisation: 'Macro-specific meals',
        description: 'Healthy meal delivery options that align with weight loss and medication requirements'
      }
    ]
  },
  {
    id: 'product-reviews',
    title: 'Evidence-Based Product Reviews',
    description: 'Honest reviews based on clinical evidence and patient feedback',
    type: 'reviews',
    items: [
      {
        title: 'GLP-1 Injection Devices Comparison',
        devices: '8 pen types reviewed',
        criteria: 'Ease, accuracy, comfort',
        description: 'Detailed comparison of injection pens to find the most user-friendly option'
      },
      {
        title: 'Meal Replacement Shake Analysis',
        products: '12 brands tested',
        testing: 'Nutrition, taste, mixability',
        description: 'Comprehensive review of meal replacement options that work with weight loss medications'
      },
      {
        title: 'Fitness Tracker Accuracy Study',
        devices: '15 popular models',
        metrics: 'Steps, calories, heart rate',
        description: 'Real-world accuracy testing to help you choose the most reliable tracking device'
      },
      {
        title: 'Supplement Third-Party Testing',
        brands: '25+ supplement companies',
        testing: 'Purity, potency, contaminants',
        description: 'Independent testing results to identify which supplement brands meet label claims'
      }
    ]
  }
];

export default function ShopPillar() {
  const renderContentTile = (category: any) => {
    const typeIcons: any = {
      pharmacy: Package,
      supplements: Shield,
      devices: Truck,
      education: Star,
      affiliate: ExternalLink,
      reviews: CreditCard
    };

    const Icon = typeIcons[category.type] || ShoppingBag;

    return (
      <div key={category.id} className="bg-slate-800 rounded-xl p-8 border border-slate-700 hover:border-[#b68a71] transition-all duration-300">
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
            <Icon className="h-6 w-6 text-[#b68a71]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#f8fafc] mb-2">{category.title}</h3>
            <p className="text-[#fef5e7] text-sm">{category.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {category.items.map((item: any, index: number) => (
            <div key={index} className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-[#b68a71]/50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-[#f8fafc] mb-1">{item.title}</h4>
                  <p className="text-sm text-[#fef5e7] mb-2">{item.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-[#b68a71]">
                    {item.availability && <span>Availability: {item.availability}</span>}
                    {item.forms && <span>Forms: {item.forms}</span>}
                    {item.dosage && <span>Dosage: {item.dosage}</span>}
                    {item.frequency && <span>Frequency: {item.frequency}</span>}
                    {item.formulations && <span>Types: {item.formulations}</span>}
                    {item.testing && <span>Requires: {item.testing}</span>}
                    {item.options && <span>Options: {item.options}</span>}
                    {item.duration && <span>Duration: {item.duration}</span>}
                    {item.quality && <span>Quality: {item.quality}</span>}
                    {item.benefits && <span>Benefits: {item.benefits}</span>}
                    {item.form && <span>Form: {item.form}</span>}
                    {item.strains && <span>Potency: {item.strains}</span>}
                    {item.stability && <span>Storage: {item.stability}</span>}
                    {item.metrics && <span>Measures: {item.metrics}</span>}
                    {item.connectivity && <span>Connectivity: {item.connectivity}</span>}
                    {item.brands && <span>Brands: {item.brands}</span>}
                    {item.accuracy && <span>Accuracy: {item.accuracy}</span>}
                    {item.features && <span>Features: {item.features}</span>}
                    {item.database && <span>Database: {item.database}</span>}
                    {item.format && <span>Format: {item.format}</span>}
                    {item.categories && <span>Categories: {item.categories}</span>}
                    {item.budget_ranges && <span>Budget: {item.budget_ranges}</span>}
                    {item.products && <span>Products: {item.products}</span>}
                    {item.criteria && <span>Criteria: {item.criteria}</span>}
                    {item.interactions && <span>Covers: {item.interactions}</span>}
                    {item.shipping && <span>Shipping: {item.shipping}</span>}
                    {item.locations && <span>Locations: {item.locations}</span>}
                    {item.discounts && <span>Pricing: {item.discounts}</span>}
                    {item.speciality && <span>Speciality: {item.speciality}</span>}
                    {item.warranty && <span>Warranty: {item.warranty}</span>}
                    {item.customisation && <span>Options: {item.customisation}</span>}
                    {item.devices && <span>Devices: {item.devices}</span>}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#b68a71] hover:bg-[#8B6F47] text-white ml-4"
                >
                  {category.type === 'pharmacy' ? 'Contact Pharmacy' :
                   category.type === 'supplements' || category.type === 'devices' ? 'View Product' :
                   category.type === 'education' ? 'Start Guide' :
                   category.type === 'affiliate' ? 'Shop Now' : 'Read Review'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#334155]">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/portal" className="text-[#b68a71] hover:text-[#8B6F47] transition-colors">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-[#f8fafc] mb-2">Shop Pillar 🛒</h1>
              <p className="text-[#fef5e7]">Evidence-based products and trusted recommendations for your health journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {shopContent.map(renderContentTile)}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-[#b68a71] hover:bg-[#8B6F47] text-white justify-start">
              <Package className="h-4 w-4 mr-2" />
              Pharmacy Consult
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Star className="h-4 w-4 mr-2" />
              Product Assessment
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              Partner Stores
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Read Reviews
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-slate-900 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-[#f8fafc] mb-3">Important Disclaimer</h3>
          <div className="text-sm text-[#fef5e7] space-y-2">
            <p>• All pharmaceutical products require valid prescriptions and professional consultation</p>
            <p>• Supplement recommendations are general guidance - consult your healthcare provider before starting</p>
            <p>• Product links may include affiliate commissions that support continued platform development</p>
            <p>• Independent reviews are based on available evidence and patient feedback, not marketing claims</p>
            <p>• TGA compliance: Always follow prescribed medication guidelines and report adverse effects</p>
          </div>
        </div>
      </div>
    </div>
  );
}