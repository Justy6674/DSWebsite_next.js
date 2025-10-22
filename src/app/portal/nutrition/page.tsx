'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Download, Calculator, Book, Play, ExternalLink, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const nutritionContent = [
  {
    id: 'meal-plans',
    title: 'Downloadable Meal Plans',
    description: 'Lifestyle-integrated eating plans designed for sustainable weight management',
    type: 'pdf',
    items: [
      {
        title: 'Australian Family Meal Plan - Week 1',
        servings: '4 people',
        prep_time: '2 hours weekly',
        description: 'Complete 7-day meal plan with shopping lists and prep instructions for busy families'
      },
      {
        title: 'GLP-1 Friendly Meal Plan',
        servings: '2 people',
        prep_time: '1.5 hours weekly',
        description: 'Specially designed meals to complement GLP-1 medication therapy and minimise side effects'
      },
      {
        title: 'Mediterranean-Style Weekly Plan',
        servings: '2-4 people',
        prep_time: '2.5 hours weekly',
        description: 'Heart-healthy Mediterranean approach adapted for Australian ingredients and preferences'
      },
      {
        title: 'Quick & Simple Meal Plan',
        servings: '1-2 people',
        prep_time: '45 mins weekly',
        description: '30-minute meals for busy professionals with minimal cooking skills required'
      }
    ]
  },
  {
    id: 'recipe-library',
    title: 'Recipe Library',
    description: 'Family-friendly, realistic Australian recipes for sustainable eating',
    type: 'recipe',
    items: [
      {
        title: 'High-Protein Breakfast Collection',
        count: '24 recipes',
        rating: 4.8,
        description: 'Start your day with satisfying, protein-rich breakfast options'
      },
      {
        title: 'One-Pot Family Dinners',
        count: '18 recipes',
        rating: 4.9,
        description: 'Simple, nutritious dinner recipes that the whole family will enjoy'
      },
      {
        title: 'Meal Prep Containers',
        count: '15 recipes',
        rating: 4.7,
        description: 'Make-ahead meals perfect for busy weekdays and portion control'
      },
      {
        title: 'Healthy Snack Ideas',
        count: '32 recipes',
        rating: 4.6,
        description: 'Satisfying snacks that support your weight management goals'
      }
    ]
  },
  {
    id: 'macro-calculator',
    title: 'Macro Calculator',
    description: 'Personalised protein, carbohydrate and fat targets based on your goals',
    type: 'tool',
    items: [
      {
        title: 'Personal Macro Calculator',
        features: ['Weight loss targets', 'Activity level adjustment', 'GLP-1 optimization'],
        description: 'Calculate your daily macro targets based on current weight, goals and medication'
      },
      {
        title: 'Meal Macro Tracker',
        features: ['Food database', 'Barcode scanning', 'Progress tracking'],
        description: 'Track your daily intake and see how you\'re progressing towards your targets'
      }
    ]
  },
  {
    id: 'protein-tracking',
    title: 'Protein Tracking Tools',
    description: 'Tools and guides to help you meet your daily protein requirements',
    type: 'tracking',
    items: [
      {
        title: 'Daily Protein Tracker',
        target: '1.2g per kg body weight',
        description: 'Simple tool to track protein intake and ensure you\'re meeting daily requirements'
      },
      {
        title: 'High-Protein Food Guide',
        sources: '50+ protein sources',
        description: 'Comprehensive guide to protein-rich foods with serving sizes and preparation tips'
      },
      {
        title: 'Protein Timing Guide',
        meals: 'Pre/post workout',
        description: 'Optimise protein intake timing for muscle preservation during weight loss'
      }
    ]
  },
  {
    id: 'education-videos',
    title: 'Educational Videos',
    description: 'Learn nutrition basics and practical skills for long-term success',
    type: 'video',
    items: [
      {
        title: 'Reading Nutrition Labels',
        duration: '6:24',
        views: 2847,
        description: 'Decode nutrition labels and make informed food choices at the supermarket'
      },
      {
        title: 'Portion Control Without Measuring',
        duration: '4:18',
        views: 3156,
        description: 'Visual guides and hand measurements for portion control anywhere'
      },
      {
        title: 'Meal Prep Basics for Beginners',
        duration: '8:45',
        views: 4923,
        description: 'Step-by-step guide to meal prepping for busy lifestyles'
      }
    ]
  },
  {
    id: 'external-resources',
    title: 'External Resources',
    description: 'Credible Australian nutrition guidelines and evidence-based resources',
    type: 'links',
    items: [
      {
        title: 'Australian Dietary Guidelines',
        source: 'NHMRC',
        description: 'Official Australian government dietary recommendations for healthy eating'
      },
      {
        title: 'Nutrition Australia Resources',
        source: 'Nutrition Australia',
        description: 'Evidence-based nutrition information from Australia\'s leading nutrition organisation'
      },
      {
        title: 'Dietitians Australia',
        source: 'DAA',
        description: 'Professional resources and fact sheets from qualified dietitians'
      }
    ]
  },
  {
    id: 'real-world-guides',
    title: 'Real-World Eating Guides',
    description: 'Practical advice for eating out, social events and travel situations',
    type: 'guide',
    items: [
      {
        title: 'Restaurant Dining Guide',
        venues: '15+ restaurant types',
        description: 'Navigate menus and make healthy choices at popular restaurant chains'
      },
      {
        title: 'Social Event Survival',
        events: 'Parties, BBQs, celebrations',
        description: 'Enjoy social occasions while staying on track with your goals'
      },
      {
        title: 'Travel Nutrition Guide',
        scenarios: 'Flights, hotels, road trips',
        description: 'Maintain healthy eating habits while travelling for work or leisure'
      }
    ]
  },
  {
    id: 'podcast-library',
    title: 'Podcast Recommendations',
    description: 'Evidence-based nutrition podcasts (not fad diets)',
    type: 'podcast',
    items: [
      {
        title: 'Nutrition Science Podcast',
        episodes: '12 recommended',
        host: 'Dr. Rhonda Patrick',
        description: 'Deep dives into nutrition research and metabolic health'
      },
      {
        title: 'The Proof Podcast',
        episodes: '8 recommended',
        host: 'Simon Hill',
        description: 'Evidence-based nutrition with Australian perspective'
      }
    ]
  }
];

export default function NutritionPillar() {
  const renderContentTile = (category: any) => {
    const typeIcons: any = {
      pdf: Download,
      recipe: Book,
      tool: Calculator,
      tracking: Calculator,
      video: Play,
      links: ExternalLink,
      guide: Book,
      podcast: Play
    };

    const Icon = typeIcons[category.type] || Book;

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
                    {item.servings && <span>Serves: {item.servings}</span>}
                    {item.prep_time && <span>Prep: {item.prep_time}</span>}
                    {item.count && <span>{item.count}</span>}
                    {item.rating && <span>Rating: {item.rating}/5</span>}
                    {item.target && <span>Target: {item.target}</span>}
                    {item.sources && <span>{item.sources}</span>}
                    {item.meals && <span>{item.meals}</span>}
                    {item.duration && <span>Duration: {item.duration}</span>}
                    {item.views && <span>{item.views} views</span>}
                    {item.source && <span>Source: {item.source}</span>}
                    {item.venues && <span>{item.venues}</span>}
                    {item.events && <span>{item.events}</span>}
                    {item.scenarios && <span>{item.scenarios}</span>}
                    {item.episodes && <span>{item.episodes}</span>}
                    {item.host && <span>Host: {item.host}</span>}
                  </div>
                  {item.features && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.features.map((feature: string, i: number) => (
                        <span key={i} className="bg-slate-800 text-[#fef5e7] px-2 py-1 rounded text-xs border border-slate-700">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  className="bg-[#b68a71] hover:bg-[#8B6F47] text-white ml-4"
                >
                  {category.type === 'video' || category.type === 'podcast' ? 'Watch' :
                   category.type === 'pdf' ? 'Download' :
                   category.type === 'tool' || category.type === 'tracking' ? 'Use Tool' :
                   category.type === 'links' ? 'Visit' : 'View'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <PortalLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-2">Nutrition Pillar 🥗</h1>
          <p className="text-[#fef5e7]">Practical nutrition resources for sustainable weight management</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {nutritionContent.map(renderContentTile)}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-[#b68a71] hover:bg-[#8B6F47] text-white justify-start">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Macros
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download Meal Plans
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Book className="h-4 w-4 mr-2" />
              Browse Recipes
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Users className="h-4 w-4 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}