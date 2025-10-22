'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Brain, Heart, Users, BookOpen, Target, Lightbulb, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";

const mentalHealthContent = [
  {
    id: 'stress-management',
    title: 'Stress Management Tools',
    description: 'Practical strategies to reduce stress and its impact on weight management',
    type: 'tools',
    items: [
      {
        title: 'Daily Stress Assessment',
        format: 'Interactive questionnaire',
        duration: '3 minutes',
        description: 'Quick daily check-in to identify stress levels and triggers affecting eating patterns'
      },
      {
        title: 'Breathing Techniques for Cravings',
        format: 'Audio guide + worksheet',
        duration: '5-10 minutes',
        description: 'Evidence-based breathing exercises to manage food cravings and emotional eating urges'
      },
      {
        title: 'Progressive Muscle Relaxation',
        format: 'Guided audio',
        duration: '15-20 minutes',
        description: 'Full-body relaxation technique to reduce cortisol and improve sleep quality'
      },
      {
        title: 'Workplace Stress Toolkit',
        format: 'PDF guide + strategies',
        items: '12 techniques',
        description: 'Discrete stress management strategies for busy work environments and lunch breaks'
      }
    ]
  },
  {
    id: 'emotional-eating',
    title: 'Emotional Eating Strategies',
    description: 'Identify triggers and develop healthier coping mechanisms for emotional eating',
    type: 'strategies',
    items: [
      {
        title: 'Emotional Eating Trigger Journal',
        format: 'Digital tracker',
        tracking_period: '2 weeks minimum',
        description: 'Identify patterns between emotions, situations, and eating behaviours'
      },
      {
        title: 'HALT Assessment Tool',
        acronym: 'Hungry, Angry, Lonely, Tired',
        duration: '2 minutes',
        description: 'Quick self-check to distinguish between physical hunger and emotional triggers'
      },
      {
        title: 'Alternative Coping Strategies',
        categories: '5 emotion types',
        alternatives: '30+ options',
        description: 'Practical alternatives to eating for different emotional states and situations'
      },
      {
        title: 'Mindful Eating Exercises',
        format: 'Step-by-step guide',
        sessions: '7-day program',
        description: 'Develop awareness around eating patterns and food relationships'
      }
    ]
  },
  {
    id: 'identity-change',
    title: 'Identity-Based Change Framework',
    description: 'Transform your self-image to support sustainable weight management',
    type: 'framework',
    items: [
      {
        title: 'Current Identity Assessment',
        format: 'Comprehensive questionnaire',
        completion_time: '15 minutes',
        description: 'Understand how you currently see yourself and identify limiting beliefs about weight'
      },
      {
        title: 'Future Self Visualisation',
        format: 'Guided exercise + worksheet',
        duration: '20 minutes',
        description: 'Create a clear vision of your healthiest self and align behaviours with that identity'
      },
      {
        title: 'Daily Identity Reinforcement',
        format: 'Morning routine template',
        duration: '5 minutes daily',
        description: 'Simple daily practices to reinforce your new healthy identity'
      },
      {
        title: 'Setback Recovery Protocol',
        scenarios: '8 common situations',
        response_time: 'Immediate use',
        description: 'Maintain identity alignment when life gets challenging or progress stalls'
      }
    ]
  },
  {
    id: 'maslow-assessment',
    title: 'Personal Needs Assessment',
    description: 'Understand which fundamental needs drive your eating behaviours',
    type: 'assessment',
    items: [
      {
        title: 'Maslow Hierarchy Health Check',
        categories: '5 need levels',
        completion_time: '10 minutes',
        description: 'Assess which unmet needs might be driving unhealthy eating patterns'
      },
      {
        title: 'Safety & Security Eating Patterns',
        focus: 'Food security mindset',
        interventions: '6 strategies',
        description: 'Address scarcity mindset and food hoarding behaviours common in chronic dieters'
      },
      {
        title: 'Social Connection & Food Relationships',
        focus: 'Belonging needs',
        strategies: '8 approaches',
        description: 'Navigate social eating situations while maintaining health goals and relationships'
      },
      {
        title: 'Self-Esteem & Food Confidence',
        focus: 'Confidence building',
        modules: '4 core areas',
        description: 'Build confidence in food choices and body image independent of scale weight'
      }
    ]
  },
  {
    id: 'cbt-resources',
    title: 'Cognitive Behavioural Therapy Tools',
    description: 'Evidence-based thought pattern work for sustainable behaviour change',
    type: 'cbt',
    items: [
      {
        title: 'Thought Record Worksheets',
        situations: '12 common scenarios',
        format: 'Fillable PDF',
        description: 'Challenge negative thought patterns that sabotage healthy eating and exercise'
      },
      {
        title: 'All-or-Nothing Thinking Intervention',
        cognitive_distortion: 'Black & white thinking',
        techniques: '5 reframing methods',
        description: 'Break the perfectionism cycle that leads to diet abandonment and binge eating'
      },
      {
        title: 'Catastrophising About Weight',
        focus: 'Realistic thinking',
        scenarios: '10 examples',
        description: 'Reduce anxiety about weight fluctuations and temporary setbacks'
      },
      {
        title: 'Body Image Cognitive Restructuring',
        duration: '4-week program',
        exercises: 'Daily practices',
        description: 'Develop a healthier relationship with your body independent of weight'
      }
    ]
  },
  {
    id: 'maintenance-psychology',
    title: 'Weight Maintenance Mindset',
    description: 'Psychological frameworks for long-term weight maintenance success',
    type: 'maintenance',
    items: [
      {
        title: 'Maintenance vs Weight Loss Mindset',
        comparison: 'Side-by-side guide',
        transition_time: '3-6 months',
        description: 'Shift from weight loss urgency to sustainable maintenance thinking patterns'
      },
      {
        title: 'Decision Fatigue Management',
        strategies: '8 simplification methods',
        focus: 'Habit automation',
        description: 'Reduce daily food and exercise decisions to prevent willpower depletion'
      },
      {
        title: 'Social Pressure Navigation',
        scenarios: '15 common situations',
        responses: 'Scripted options',
        description: 'Handle comments about weight, diet choices, and lifestyle changes from others'
      },
      {
        title: 'Long-Term Motivation Strategies',
        timeframes: '1, 5, 10+ years',
        motivation_sources: '12 categories',
        description: 'Maintain motivation for healthy habits when initial weight loss excitement fades'
      }
    ]
  }
];

export default function MentalHealthPillar() {
  const renderContentTile = (category: any) => {
    const typeIcons: any = {
      tools: Brain,
      strategies: Heart,
      framework: Target,
      assessment: Users,
      cbt: Lightbulb,
      maintenance: Shield
    };

    const Icon = typeIcons[category.type] || Brain;

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
                    {item.format && <span>Format: {item.format}</span>}
                    {item.duration && <span>Duration: {item.duration}</span>}
                    {item.completion_time && <span>Complete in: {item.completion_time}</span>}
                    {item.tracking_period && <span>Track for: {item.tracking_period}</span>}
                    {item.acronym && <span>Method: {item.acronym}</span>}
                    {item.categories && <span>Categories: {item.categories}</span>}
                    {item.alternatives && <span>Options: {item.alternatives}</span>}
                    {item.sessions && <span>Program: {item.sessions}</span>}
                    {item.scenarios && <span>Scenarios: {item.scenarios}</span>}
                    {item.response_time && <span>Response: {item.response_time}</span>}
                    {item.interventions && <span>Strategies: {item.interventions}</span>}
                    {item.strategies && <span>Approaches: {item.strategies}</span>}
                    {item.modules && <span>Modules: {item.modules}</span>}
                    {item.techniques && <span>Techniques: {item.techniques}</span>}
                    {item.exercises && <span>Exercises: {item.exercises}</span>}
                    {item.transition_time && <span>Transition: {item.transition_time}</span>}
                    {item.timeframes && <span>Timeframes: {item.timeframes}</span>}
                    {item.motivation_sources && <span>Sources: {item.motivation_sources}</span>}
                    {item.comparison && <span>Format: {item.comparison}</span>}
                    {item.focus && <span>Focus: {item.focus}</span>}
                    {item.cognitive_distortion && <span>Addresses: {item.cognitive_distortion}</span>}
                    {item.responses && <span>Responses: {item.responses}</span>}
                    {item.items && <span>Items: {item.items}</span>}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#b68a71] hover:bg-[#8B6F47] text-white ml-4"
                >
                  {category.type === 'assessment' ? 'Start Assessment' :
                   category.type === 'tools' ? 'Use Tool' :
                   category.type === 'cbt' ? 'Download' : 'View Guide'}
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
              <h1 className="text-4xl font-bold text-[#f8fafc] mb-2">Mental Health Pillar 🧠</h1>
              <p className="text-[#fef5e7]">Psychological tools and frameworks for sustainable behaviour change</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mentalHealthContent.map(renderContentTile)}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-slate-800 rounded-xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-[#f8fafc] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="bg-[#b68a71] hover:bg-[#8B6F47] text-white justify-start">
              <Brain className="h-4 w-4 mr-2" />
              Start Assessment
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Heart className="h-4 w-4 mr-2" />
              Track Emotions
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Download Worksheets
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-700 text-[#f8fafc] border border-slate-700 justify-start">
              <Target className="h-4 w-4 mr-2" />
              Set Identity Goals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}