'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Moon, Smartphone, Book, Clock, Brain, Shield, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

const sleepRecoveryContent = [
  {
    id: 'sleep-hygiene',
    title: 'Sleep Hygiene Fundamentals',
    description: 'Evidence-based strategies to improve sleep quality for better weight management',
    type: 'guide',
    items: [
      {
        title: 'The Perfect Sleep Environment',
        checklist_items: '12 optimisation steps',
        cost: 'Under $50',
        description: 'Transform your bedroom into a sleep sanctuary with practical, budget-friendly changes'
      },
      {
        title: 'Pre-Sleep Routine Template',
        duration: '30-60 minutes',
        phases: '4 wind-down stages',
        description: 'Step-by-step evening routine to signal your body it\'s time for restorative sleep'
      },
      {
        title: 'Blue Light Management Guide',
        devices: 'Phone, tablet, TV, computer',
        solutions: '8 practical strategies',
        description: 'Reduce screen-induced sleep disruption without eliminating technology entirely'
      },
      {
        title: 'Caffeine & Alcohol Impact Assessment',
        tracking_period: '2 weeks',
        variables: 'Timing, quantity, quality',
        description: 'Understand how your consumption patterns affect sleep quality and weight loss'
      }
    ]
  },
  {
    id: 'sleep-tracking',
    title: 'Sleep Tracking & Monitoring',
    description: 'Use technology and simple methods to understand and improve your sleep patterns',
    type: 'tracking',
    items: [
      {
        title: 'Wearable Device Integration',
        compatible_devices: 'Apple Watch, Fitbit, Oura',
        metrics: 'Duration, quality, stages',
        description: 'Connect sleep data from wearable devices to understand patterns and trends'
      },
      {
        title: 'Sleep Diary Template',
        method: 'Manual tracking',
        duration: '14-day minimum',
        description: 'Simple pen-and-paper method to identify sleep patterns and improvement opportunities'
      },
      {
        title: 'Sleep Quality Assessment',
        frequency: 'Weekly check-in',
        duration: '5 minutes',
        description: 'Self-assessment tool to monitor improvements and identify ongoing challenges'
      },
      {
        title: 'Sleep & Weight Correlation Tracker',
        variables: 'Sleep, hunger, energy, weight',
        insights: 'Personalised patterns',
        description: 'Discover how your sleep quality directly impacts weight management success'
      }
    ]
  },
  {
    id: 'parent-strategies',
    title: 'Sleep Strategies for Busy Parents',
    description: 'Realistic sleep improvement for parents juggling family responsibilities',
    type: 'parent',
    items: [
      {
        title: 'Power Nap Protocols',
        duration: '10-20 minutes',
        timing: 'Optimal windows',
        description: 'Strategic napping to combat sleep deprivation without disrupting night sleep'
      },
      {
        title: 'Co-Sleeping Transition Guide',
        phases: '4-step process',
        timeframe: '2-4 weeks',
        description: 'Gentle strategies to reclaim your bed and improve sleep quality for the whole family'
      },
      {
        title: 'Early Morning Routine Optimisation',
        wake_times: '5:00-6:30 AM options',
        benefits: 'Personal time',
        description: 'Create peaceful morning routines that support sleep quality and personal wellbeing'
      },
      {
        title: 'Partner Sleep Coordination',
        scenarios: '8 common situations',
        solutions: 'Negotiation strategies',
        description: 'Coordinate sleep schedules and responsibilities with your partner for mutual benefit'
      }
    ]
  },
  {
    id: 'recovery-resources',
    title: 'Active Recovery & Relaxation',
    description: 'Tools and techniques to enhance physical and mental recovery',
    type: 'recovery',
    items: [
      {
        title: 'Progressive Muscle Relaxation Audio',
        duration: '15-25 minutes',
        versions: 'Short, medium, extended',
        description: 'Guided audio sessions to release physical tension and prepare for deeper sleep'
      },
      {
        title: 'Breathing Techniques for Sleep',
        techniques: '5 evidence-based methods',
        duration: '3-10 minutes each',
        description: 'Simple breathing exercises to calm the nervous system and induce sleepiness'
      },
      {
        title: 'Meditation App Recommendations',
        categories: 'Sleep-specific content',
        apps: '6 top-rated options',
        description: 'Curated list of meditation apps with excellent sleep-focused programs'
      },
      {
        title: 'Gentle Yoga for Sleep',
        poses: '8 restorative positions',
        duration: '10-15 minutes',
        description: 'Simple yoga sequence to release physical tension and calm the mind before bed'
      }
    ]
  },
  {
    id: 'sleep-education',
    title: 'Sleep Science & Weight Connection',
    description: 'Understand how sleep impacts metabolism, hormones, and weight management',
    type: 'education',
    items: [
      {
        title: 'Sleep & Metabolism Masterclass',
        format: 'Video + infographic',
        duration: '18 minutes',
        description: 'How sleep deprivation disrupts leptin, ghrelin, and cortisol affecting weight loss'
      },
      {
        title: 'GLP-1 Medications & Sleep Quality',
        research: 'Latest clinical findings',
        reading_time: '8 minutes',
        description: 'Understanding how weight loss medications can affect sleep patterns and what to expect'
      },
      {
        title: 'Shift Work Sleep Strategies',
        schedules: '6 common shift patterns',
        adaptations: 'Evidence-based adjustments',
        description: 'Specialised sleep strategies for healthcare workers, hospitality, and rotating shifts'
      },
      {
        title: 'Sleep Disorders & Weight Gain',
        conditions: 'Sleep apnea, insomnia, restless leg',
        screening: 'When to seek help',
        description: 'Recognise when sleep issues require medical attention and how they impact weight'
      }
    ]
  },
  {
    id: 'technology-tools',
    title: 'Sleep Technology & Apps',
    description: 'Leverage technology to optimise sleep quality and recovery',
    type: 'technology',
    items: [
      {
        title: 'Sleep Tracking App Comparison',
        apps: '8 popular options',
        features: 'Accuracy, ease of use, insights',
        description: 'Comprehensive comparison of sleep tracking apps to find the best fit for your needs'
      },
      {
        title: 'Smart Home Sleep Optimisation',
        devices: 'Thermostats, lights, sound',
        automation: 'Scheduled routines',
        description: 'Use smart home technology to automatically create optimal sleep conditions'
      },
      {
        title: 'White Noise & Sleep Sound Guide',
        categories: 'Natural, mechanical, ambient',
        duration: 'All-night options',
        description: 'Find the perfect background sounds to mask disruptive noise and improve sleep'
      },
      {
        title: 'Blue Light Filtering Solutions',
        options: 'Apps, glasses, screen filters',
        cost_range: 'Free to $100',
        description: 'Comprehensive guide to reducing blue light exposure from all your devices'
      }
    ]
  }
];

export default function SleepRecoveryPillar() {
  const renderContentTile = (category: any) => {
    const typeIcons: any = {
      guide: Book,
      tracking: Smartphone,
      parent: Heart,
      recovery: Moon,
      education: Brain,
      technology: Clock
    };

    const Icon = typeIcons[category.type] || Moon;

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
                    {item.checklist_items && <span>Checklist: {item.checklist_items}</span>}
                    {item.cost && <span>Cost: {item.cost}</span>}
                    {item.duration && <span>Duration: {item.duration}</span>}
                    {item.phases && <span>Phases: {item.phases}</span>}
                    {item.devices && <span>Devices: {item.devices}</span>}
                    {item.solutions && <span>Solutions: {item.solutions}</span>}
                    {item.tracking_period && <span>Track for: {item.tracking_period}</span>}
                    {item.variables && <span>Variables: {item.variables}</span>}
                    {item.compatible_devices && <span>Compatible: {item.compatible_devices}</span>}
                    {item.metrics && <span>Metrics: {item.metrics}</span>}
                    {item.method && <span>Method: {item.method}</span>}
                    {item.frequency && <span>Frequency: {item.frequency}</span>}
                    {item.insights && <span>Insights: {item.insights}</span>}
                    {item.timing && <span>Timing: {item.timing}</span>}
                    {item.timeframe && <span>Timeframe: {item.timeframe}</span>}
                    {item.wake_times && <span>Wake times: {item.wake_times}</span>}
                    {item.benefits && <span>Benefits: {item.benefits}</span>}
                    {item.scenarios && <span>Scenarios: {item.scenarios}</span>}
                    {item.versions && <span>Versions: {item.versions}</span>}
                    {item.techniques && <span>Techniques: {item.techniques}</span>}
                    {item.categories && <span>Categories: {item.categories}</span>}
                    {item.apps && <span>Apps: {item.apps}</span>}
                    {item.poses && <span>Poses: {item.poses}</span>}
                    {item.format && <span>Format: {item.format}</span>}
                    {item.research && <span>Research: {item.research}</span>}
                    {item.reading_time && <span>Reading: {item.reading_time}</span>}
                    {item.schedules && <span>Schedules: {item.schedules}</span>}
                    {item.adaptations && <span>Adaptations: {item.adaptations}</span>}
                    {item.conditions && <span>Conditions: {item.conditions}</span>}
                    {item.screening && <span>Screening: {item.screening}</span>}
                    {item.features && <span>Features: {item.features}</span>}
                    {item.automation && <span>Automation: {item.automation}</span>}
                    {item.options && <span>Options: {item.options}</span>}
                    {item.cost_range && <span>Cost: {item.cost_range}</span>}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#b68a71] hover:bg-[#8B6F47] text-white ml-4"
                >
                  {category.type === 'tracking' ? 'Start Tracking' :
                   category.type === 'technology' ? 'Compare Options' :
                   category.type === 'recovery' ? 'Listen' :
                   category.type === 'education' ? 'Learn' : 'View Guide'}
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
              <h1 className="text-4xl font-bold text-[#f8fafc] mb-2">Sleep + Recovery Pillar 😴</h1>
              <p className="text-[#fef5e7]">Optimise sleep quality and recovery for enhanced weight management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sleepRecoveryContent.map(renderContentTile)}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-[#b68a71] hover:bg-[#8B6F47] text-white justify-start">
              <Moon className="h-4 w-4 mr-2" />
              Sleep Assessment
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Smartphone className="h-4 w-4 mr-2" />
              Start Sleep Tracking
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Book className="h-4 w-4 mr-2" />
              Download Guides
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Relaxation Audio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}