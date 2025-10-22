'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Download, ExternalLink, Clock, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

const medicationContent = [
  {
    id: 'device-videos',
    title: 'Device Usage Videos',
    description: 'Step-by-step injection demonstrations for Mounjaro and Wegovy pen devices',
    type: 'video',
    items: [
      {
        title: 'Mounjaro Pen Injection Guide',
        duration: '4:32',
        thumbnail: '/api/placeholder/320/180',
        description: 'Complete guide to using your Mounjaro pen injector safely and effectively'
      },
      {
        title: 'Wegovy Injection Technique',
        duration: '3:45',
        thumbnail: '/api/placeholder/320/180',
        description: 'Proper injection technique and rotation sites for Wegovy administration'
      },
      {
        title: 'Pen Storage and Handling',
        duration: '2:18',
        thumbnail: '/api/placeholder/320/180',
        description: 'Best practices for storing and handling your GLP-1 medication pens'
      }
    ]
  },
  {
    id: 'product-info',
    title: 'Product Information',
    description: 'Official medication sheets and prescribing information for Mounjaro and Wegovy',
    type: 'pdf',
    items: [
      {
        title: 'Mounjaro Product Information',
        size: '2.4 MB',
        pages: 24,
        description: 'Complete prescribing information, dosing guidelines and safety information'
      },
      {
        title: 'Wegovy Product Information',
        size: '1.8 MB',
        pages: 18,
        description: 'Official product monograph with clinical data and administration guidelines'
      },
      {
        title: 'GLP-1 Medication Comparison Chart',
        size: '0.8 MB',
        pages: 4,
        description: 'Side-by-side comparison of available GLP-1 medications and their profiles'
      }
    ]
  },
  {
    id: 'research',
    title: 'Research Articles',
    description: 'Peer-reviewed studies on GLP-1 medications and weight management',
    type: 'research',
    items: [
      {
        title: 'Semaglutide for Weight Management: STEP Trial Results',
        journal: 'New England Journal of Medicine',
        year: '2024',
        description: 'Landmark clinical trial demonstrating efficacy of semaglutide for weight loss'
      },
      {
        title: 'Tirzepatide in Adults with Overweight or Obesity',
        journal: 'The Lancet',
        year: '2024',
        description: 'Phase 3 trial results showing superior weight loss with dual GIP/GLP-1 agonism'
      },
      {
        title: 'Long-term Safety of GLP-1 Receptor Agonists',
        journal: 'Diabetes Care',
        year: '2024',
        description: 'Comprehensive review of cardiovascular and safety outcomes with GLP-1 therapies'
      }
    ]
  },
  {
    id: 'side-effects',
    title: 'Side Effect Management',
    description: 'Practical guides for managing common GLP-1 medication side effects',
    type: 'guide',
    items: [
      {
        title: 'Nausea Management Strategies',
        rating: 4.8,
        downloads: 1247,
        description: 'Evidence-based approaches to minimise and manage nausea during treatment'
      },
      {
        title: 'Digestive Health During GLP-1 Therapy',
        rating: 4.6,
        downloads: 892,
        description: 'Dietary modifications and supplements to support digestive comfort'
      },
      {
        title: 'Injection Site Care and Rotation',
        rating: 4.9,
        downloads: 756,
        description: 'Preventing injection site reactions and proper rotation techniques'
      }
    ]
  },
  {
    id: 'expectations',
    title: 'What to Expect',
    description: 'Week-by-week treatment guides and realistic timeline expectations',
    type: 'timeline',
    items: [
      {
        title: 'First 4 Weeks: Starting Treatment',
        phase: 'Initiation',
        description: 'What to expect during dose escalation and early treatment phase'
      },
      {
        title: 'Weeks 5-12: Finding Your Dose',
        phase: 'Titration',
        description: 'Optimising your medication dose and establishing routines'
      },
      {
        title: 'Months 3-6: Active Weight Loss',
        phase: 'Active Phase',
        description: 'Maximising weight loss during the most effective treatment period'
      },
      {
        title: 'Beyond 6 Months: Maintenance',
        phase: 'Maintenance',
        description: 'Sustaining weight loss and preventing regain long-term'
      }
    ]
  },
  {
    id: 'comparison',
    title: 'Medication Comparison',
    description: 'Decision-making tools to understand which medication might be right for you',
    type: 'tool',
    items: [
      {
        title: 'Interactive Medication Selector',
        features: ['Personalised recommendations', 'Side effect comparison', 'Cost analysis'],
        description: 'Answer questions about your health goals to receive medication guidance'
      },
      {
        title: 'Efficacy Comparison Calculator',
        features: ['Weight loss projections', 'Timeline estimates', 'Success probability'],
        description: 'Compare expected outcomes between different GLP-1 medications'
      }
    ]
  }
];

export default function MedicationPillar() {
  const renderContentTile = (category: any) => {
    const typeIcons: any = {
      video: Play,
      pdf: Download,
      research: ExternalLink,
      guide: Star,
      timeline: Clock,
      tool: Star
    };

    const Icon = typeIcons[category.type] || Star;

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
                    {item.duration && <span>Duration: {item.duration}</span>}
                    {item.size && <span>Size: {item.size}</span>}
                    {item.pages && <span>Pages: {item.pages}</span>}
                    {item.journal && <span>{item.journal} ({item.year})</span>}
                    {item.rating && <span>Rating: {item.rating}/5</span>}
                    {item.downloads && <span>{item.downloads} downloads</span>}
                    {item.phase && <span className="bg-[#b68a71] text-white px-2 py-1 rounded">{item.phase}</span>}
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
                  {category.type === 'video' ? 'Watch' :
                   category.type === 'pdf' ? 'Download' :
                   category.type === 'tool' ? 'Use Tool' : 'View'}
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
              <h1 className="text-4xl font-bold text-[#f8fafc] mb-2">Medication Pillar 💊</h1>
              <p className="text-[#fef5e7]">Evidence-based resources for GLP-1 medication management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {medicationContent.map(renderContentTile)}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-[#b68a71] hover:bg-[#8B6F47] text-white justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download All PDFs
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Play className="h-4 w-4 mr-2" />
              Watch Video Playlist
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Star className="h-4 w-4 mr-2" />
              Mark Section Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}