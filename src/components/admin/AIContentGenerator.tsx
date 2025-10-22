'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Bot,
  Zap,
  FileText,
  Mail,
  MessageSquare,
  Globe,
  Stethoscope,
  Heart,
  Copy,
  Download,
  RefreshCw
} from 'lucide-react';

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  prompt: string;
  category: 'blog' | 'email' | 'social' | 'health' | 'seo';
}

const contentTemplates: ContentTemplate[] = [
  {
    id: 'blog-post',
    name: 'Blog Post',
    description: 'Generate comprehensive health and weight loss blog posts',
    icon: FileText,
    prompt: 'Write a comprehensive blog post about [TOPIC] for Australian patients interested in weight loss and health improvement. Include practical tips, scientific backing, and a professional medical tone.',
    category: 'blog'
  },
  {
    id: 'health-tip',
    name: 'Health Tip',
    description: 'Quick health tips for social media and newsletters',
    icon: Heart,
    prompt: 'Create a concise health tip about [TOPIC] for weight loss patients. Make it actionable, evidence-based, and suitable for Australian audiences.',
    category: 'health'
  },
  {
    id: 'patient-email',
    name: 'Patient Email',
    description: 'Professional patient communication emails',
    icon: Mail,
    prompt: 'Write a professional email to patients about [TOPIC]. Include helpful information, maintain a caring tone, and follow Australian healthcare communication standards.',
    category: 'email'
  },
  {
    id: 'social-media',
    name: 'Social Media Post',
    description: 'Engaging social media content for health platforms',
    icon: MessageSquare,
    prompt: 'Create an engaging social media post about [TOPIC] for a weight loss clinic. Include relevant hashtags, call-to-action, and Australian health guidelines.',
    category: 'social'
  },
  {
    id: 'seo-content',
    name: 'SEO Content',
    description: 'Search-optimized content for website pages',
    icon: Globe,
    prompt: 'Write SEO-optimized content about [TOPIC] for a weight loss clinic website. Include relevant keywords, meta descriptions, and local Australian SEO considerations.',
    category: 'seo'
  },
  {
    id: 'medical-explanation',
    name: 'Medical Explanation',
    description: 'Patient-friendly medical information',
    icon: Stethoscope,
    prompt: 'Explain [TOPIC] in patient-friendly language for Australian healthcare consumers. Include benefits, risks, and when to consult healthcare providers.',
    category: 'health'
  }
];

export default function AIContentGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [topic, setTopic] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate AI content generation (replace with actual AI service)
  const generateContent = async () => {
    if (!selectedTemplate || !topic) {
      setError('Please select a template and enter a topic');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate sample content based on template
      const sampleContent = generateSampleContent(selectedTemplate, topic, additionalContext);
      setGeneratedContent(sampleContent);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate sample content (replace with actual AI integration)
  const generateSampleContent = (template: ContentTemplate, topic: string, context: string) => {
    const basePrompt = template.prompt.replace('[TOPIC]', topic);

    switch (template.id) {
      case 'blog-post':
        return `# ${topic}: A Comprehensive Guide

## Introduction
Understanding ${topic.toLowerCase()} is crucial for anyone on their weight loss journey. At Downscale Weight Loss Clinic, we believe in providing evidence-based information to help our patients make informed decisions about their health.

## What You Need to Know About ${topic}
${context ? `Based on current research and clinical experience, ${context.toLowerCase()}` : 'Current research shows that understanding this topic is essential for long-term health success.'}

## Key Benefits
- Improved overall health outcomes
- Enhanced weight loss results
- Better long-term maintenance
- Increased patient satisfaction

## Practical Tips for Australian Patients
1. Consult with your GP or healthcare provider
2. Consider your individual health circumstances
3. Follow Australian dietary guidelines
4. Monitor your progress regularly

## Conclusion
${topic} plays a vital role in achieving sustainable weight loss. If you're interested in learning more, book a consultation with our team at Downscale Weight Loss Clinic.

*Disclaimer: This information is for educational purposes only and should not replace professional medical advice.*`;

      case 'health-tip':
        return `💡 Health Tip: ${topic}

${context || 'Here\'s what you need to know:'}

✅ Quick Action: [Specific actionable step]
📊 Research shows: [Evidence-based fact]
🇦🇺 Australian Guidelines: [Local health authority recommendation]

#HealthTip #WeightLoss #AustralianHealth #DownscaleClinic`;

      case 'patient-email':
        return `Subject: Important Information About ${topic}

Dear [Patient Name],

I hope this email finds you well. I wanted to share some important information about ${topic.toLowerCase()} that may be relevant to your health journey.

${context || 'Based on recent developments in healthcare and your current treatment plan, I thought you should be aware of the following:'}

Key Points:
• [Important point 1]
• [Important point 2]
• [Important point 3]

Next Steps:
Please don't hesitate to contact our clinic if you have any questions or would like to discuss this further during your next appointment.

Best regards,
The Downscale Weight Loss Clinic Team

P: (07) 1234 5678
E: info@downscale.com.au
W: www.downscale.com.au

*This email contains confidential medical information intended only for the recipient.*`;

      case 'social-media':
        return `🌟 Did you know that ${topic.toLowerCase()} can significantly impact your weight loss journey?

${context || 'Our expert team at Downscale Weight Loss Clinic is here to guide you through evidence-based approaches that work for Australian lifestyles.'}

💪 Ready to take the next step? Book your consultation today!

#WeightLoss #HealthyLifestyle #AustralianHealth #DownscaleClinic #${topic.replace(/\s+/g, '')} #Nutrition #Wellness #HealthJourney`;

      case 'seo-content':
        return `# ${topic} in Australia: Complete Guide for 2024

## What is ${topic}?
${topic} is an important consideration for Australians seeking effective weight loss solutions. At Downscale Weight Loss Clinic, we specialise in providing comprehensive ${topic.toLowerCase()} guidance across Australia.

## ${topic} Benefits for Australian Patients
${context || 'Our evidence-based approach to ' + topic.toLowerCase() + ' has helped thousands of Australian patients achieve their health goals.'}

### Key Benefits Include:
- Sustainable weight loss results
- Improved metabolic health
- Enhanced quality of life
- Long-term health maintenance

## Why Choose Downscale Weight Loss Clinic for ${topic}?
✅ Australian healthcare compliance
✅ Evidence-based treatments
✅ Experienced medical professionals
✅ Personalised treatment plans

## Locations Across Australia
We provide ${topic.toLowerCase()} services in major Australian cities including Sydney, Melbourne, Brisbane, Perth, Adelaide, and regional centres.

## Contact Information
Ready to learn more about ${topic}? Contact Downscale Weight Loss Clinic today.

**Meta Description:** Comprehensive ${topic.toLowerCase()} guide for Australian patients. Expert weight loss clinic with locations across Australia. Book consultation today.

**Keywords:** ${topic.toLowerCase()}, weight loss Australia, ${topic.toLowerCase()} clinic, Australian weight loss, medical weight loss Australia`;

      case 'medical-explanation':
        return `# Understanding ${topic}: A Patient Guide

## What is ${topic}?
${topic} is a medical concept that affects many Australians. Understanding this topic is important for making informed decisions about your health.

## How Does ${topic} Work?
${context || 'The mechanism behind ' + topic.toLowerCase() + ' involves several biological processes that impact weight management and overall health.'}

## Benefits and Considerations
**Potential Benefits:**
- Improved health outcomes
- Enhanced quality of life
- Better weight management
- Reduced health risks

**Important Considerations:**
- Individual results may vary
- Consultation with healthcare provider recommended
- Follow Australian medical guidelines
- Monitor progress regularly

## When to Consult Your Healthcare Provider
You should discuss ${topic.toLowerCase()} with your doctor if:
- You have existing health conditions
- You're taking medications
- You experience any side effects
- You have questions about suitability

## Australian Healthcare Guidelines
According to Australian health authorities, ${topic.toLowerCase()} should be approached with proper medical supervision and evidence-based protocols.

*Always consult with a qualified healthcare professional before making health-related decisions.*`;

      default:
        return `Generated content about ${topic} would appear here. This is a placeholder for the ${template.name.toLowerCase()} template.`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate?.name.toLowerCase().replace(/\s+/g, '-')}-${topic.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-2">AI Content Generator</h1>
          <p className="text-[#fef5e7]">Create professional healthcare content with AI assistance</p>
        </div>
        <div className="flex items-center space-x-2 text-[#b68a71]">
          <Bot className="h-5 w-5" />
          <span className="text-sm">Powered by AI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Templates */}
        <div className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-[#f8fafc]">Content Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {contentTemplates.map((template) => {
                  const Icon = template.icon;
                  const isSelected = selectedTemplate?.id === template.id;

                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-[#b68a71] bg-[#b68a71]/10'
                          : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${isSelected ? 'text-[#b68a71]' : 'text-[#fef5e7]'}`} />
                        <div>
                          <h3 className={`font-medium ${isSelected ? 'text-[#b68a71]' : 'text-[#f8fafc]'}`}>
                            {template.name}
                          </h3>
                          <p className="text-sm text-[#fef5e7] mt-1">{template.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Input Form */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-[#f8fafc]">Content Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="topic" className="text-[#fef5e7]">Topic *</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Intermittent Fasting, Exercise Guidelines, Nutrition Tips"
                  className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>

              <div>
                <Label htmlFor="context" className="text-[#fef5e7]">Additional Context (Optional)</Label>
                <Textarea
                  id="context"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Provide additional context, specific requirements, or target audience details..."
                  className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  rows={3}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              <Button
                onClick={generateContent}
                disabled={!selectedTemplate || !topic || loading}
                className="w-full bg-[#b68a71] hover:bg-[#8B6F47] text-white disabled:bg-slate-600"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Generated Content */}
        <div>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#f8fafc]">Generated Content</CardTitle>
                {generatedContent && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={copyToClipboard}
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={downloadContent}
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <pre className="whitespace-pre-wrap text-[#f8fafc] text-sm leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="bg-slate-900 rounded-lg p-8 border border-slate-700 text-center">
                  <Bot className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-[#fef5e7] mb-2">Select a template and topic to generate content</p>
                  <p className="text-sm text-slate-400">AI-generated content will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}