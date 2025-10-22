'use client';

import React from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Play, Download, Book, Activity, Smartphone, ExternalLink, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";

const activityContent = [
  {
    id: 'home-workouts',
    title: 'Home Workout Programs',
    description: 'No-gym required resistance band and bodyweight routines for busy lifestyles',
    type: 'program',
    items: [
      {
        title: 'Resistance Band Full Body Program',
        duration: '4 weeks',
        sessions: '3x per week',
        description: 'Complete strength training program using only resistance bands - perfect for home or travel'
      },
      {
        title: 'Bodyweight HIIT Routines',
        duration: '20-30 minutes',
        sessions: '4x per week',
        description: 'High-intensity interval training using only bodyweight exercises for maximum fat burning'
      },
      {
        title: 'Desk Worker Strength Program',
        duration: '15 minutes',
        sessions: 'Daily',
        description: 'Combat desk posture and build strength with exercises designed for office workers'
      },
      {
        title: 'Parent-Friendly Quick Workouts',
        duration: '10-15 minutes',
        sessions: 'Flexible',
        description: 'Short, effective workouts that can be done while kids are nearby or napping'
      }
    ]
  },
  {
    id: 'exercise-videos',
    title: 'Exercise Video Library',
    description: 'Follow-along workout videos and technique demonstrations',
    type: 'video',
    items: [
      {
        title: 'Resistance Band Technique Series',
        count: '12 videos',
        duration: '5-8 minutes each',
        description: 'Master proper form for all major resistance band exercises with detailed demonstrations'
      },
      {
        title: '5-Minute Desk Break Workouts',
        count: '8 videos',
        duration: '5 minutes each',
        description: 'Quick movement breaks to combat sitting all day - no equipment needed'
      },
      {
        title: 'Core Strengthening Progressions',
        count: '10 videos',
        duration: '10-15 minutes',
        description: 'Build a strong core with progressive exercises from beginner to advanced'
      },
      {
        title: 'Posture Correction Routines',
        count: '6 videos',
        duration: '12-18 minutes',
        description: 'Combat forward head posture and rounded shoulders with targeted exercises'
      }
    ]
  },
  {
    id: 'movement-guides',
    title: 'Life-Proof Movement Plans',
    description: 'Backup exercise strategies for when life gets in the way',
    type: 'guide',
    items: [
      {
        title: 'Plan A: Ideal Workout Schedule',
        scenario: '45-60 minutes available',
        frequency: '4-5x per week',
        description: 'Full workout program for when you have optimal time and energy'
      },
      {
        title: 'Plan B: Time-Crunched Alternative',
        scenario: '20-30 minutes available',
        frequency: '3-4x per week',
        description: 'Condensed but effective workouts for busy periods'
      },
      {
        title: 'Plan C: Survival Mode',
        scenario: '5-10 minutes available',
        frequency: 'Daily movement',
        description: 'Minimum effective dose to maintain fitness during chaotic life periods'
      },
      {
        title: 'Hotel Room Workout Plan',
        scenario: 'Travel accommodation',
        frequency: 'As needed',
        description: 'Complete workout using only luggage and hotel room space'
      }
    ]
  },
  {
    id: 'tracking-tools',
    title: 'Activity Tracking & Integration',
    description: 'Connect wearable devices and track progress effectively',
    type: 'tool',
    items: [
      {
        title: 'Apple Health Integration',
        compatibility: 'iPhone users',
        features: ['Step tracking', 'Workout sync', 'Heart rate data'],
        description: 'Sync workouts and daily activity data from Apple Watch and iPhone'
      },
      {
        title: 'Fitbit Data Sync',
        compatibility: 'Fitbit devices',
        features: ['Activity tracking', 'Sleep data', 'Heart rate zones'],
        description: 'Connect Fitbit data for comprehensive activity and recovery tracking'
      },
      {
        title: 'Progress Photo Tool',
        method: 'Phone camera',
        features: ['Consistent poses', 'Monthly comparisons', 'Private storage'],
        description: 'Structured photo tracking system for visual progress monitoring'
      }
    ]
  },
  {
    id: 'education-content',
    title: 'Exercise Science Education',
    description: 'Understand the why behind effective exercise for weight management',
    type: 'education',
    items: [
      {
        title: 'Resistance Training for Weight Loss',
        format: 'Article + infographic',
        reading_time: '8 minutes',
        description: 'Why lifting weights accelerates fat loss and preserves muscle during weight loss'
      },
      {
        title: 'NEAT: Non-Exercise Activity Thermogenesis',
        format: 'Video + worksheet',
        duration: '12 minutes',
        description: 'How daily movement outside of exercise impacts your metabolism and weight loss'
      },
      {
        title: 'Exercise Timing and GLP-1 Medications',
        format: 'Research summary',
        reading_time: '6 minutes',
        description: 'Optimising exercise timing and intensity when using weight loss medications'
      },
      {
        title: 'Building Sustainable Exercise Habits',
        format: 'Interactive guide',
        completion_time: '15 minutes',
        description: 'Behaviour change strategies to make exercise a natural part of your routine'
      }
    ]
  },
  {
    id: 'recovery-active',
    title: 'Active Recovery & Mobility',
    description: 'Gentle movement and mobility work for rest days and recovery',
    type: 'recovery',
    items: [
      {
        title: 'Daily Mobility Routine',
        duration: '10 minutes',
        focus: 'Full body',
        description: 'Essential daily stretches and mobility work for joint health and movement quality'
      },
      {
        title: 'Post-Workout Recovery Sequences',
        duration: '5-8 minutes',
        focus: 'Targeted stretching',
        description: 'Specific cool-down routines for different workout types to reduce soreness'
      },
      {
        title: 'Foam Rolling Guide',
        duration: '15 minutes',
        equipment: 'Foam roller',
        description: 'Self-massage techniques to improve recovery and reduce muscle tension'
      },
      {
        title: 'Active Rest Day Activities',
        duration: '20-45 minutes',
        intensity: 'Low',
        description: 'Gentle activities like walking, yoga, or swimming for active recovery days'
      }
    ]
  }
];

export default function ActivityPillar() {
  const renderContentTile = (category: any) => {
    const typeIcons: any = {
      program: Activity,
      video: Play,
      guide: Book,
      tool: Smartphone,
      education: Book,
      recovery: TrendingUp
    };

    const Icon = typeIcons[category.type] || Activity;

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
                    {item.sessions && <span>Frequency: {item.sessions}</span>}
                    {item.count && <span>{item.count}</span>}
                    {item.scenario && <span>Scenario: {item.scenario}</span>}
                    {item.frequency && <span>Frequency: {item.frequency}</span>}
                    {item.compatibility && <span>Compatible: {item.compatibility}</span>}
                    {item.format && <span>Format: {item.format}</span>}
                    {item.reading_time && <span>Reading: {item.reading_time}</span>}
                    {item.completion_time && <span>Complete in: {item.completion_time}</span>}
                    {item.focus && <span>Focus: {item.focus}</span>}
                    {item.equipment && <span>Equipment: {item.equipment}</span>}
                    {item.intensity && <span>Intensity: {item.intensity}</span>}
                    {item.method && <span>Method: {item.method}</span>}
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
                   category.type === 'program' || category.type === 'guide' ? 'Download' :
                   category.type === 'tool' ? 'Connect' : 'View'}
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
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-2">Activity Pillar 🏃</h1>
          <p className="text-[#fef5e7]">Life-proof movement and exercise programs requiring no gym membership</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activityContent.map(renderContentTile)}
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-[#b68a71] hover:bg-[#8B6F47] text-white justify-start">
              <Play className="h-4 w-4 mr-2" />
              Start Quick Workout
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Download className="h-4 w-4 mr-2" />
              Download Programs
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Smartphone className="h-4 w-4 mr-2" />
              Connect Device
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Book className="h-4 w-4 mr-2" />
              View Progress
            </Button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}