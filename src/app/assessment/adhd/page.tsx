"use client";

import { Metadata } from 'next';
import { Layout } from "@/components/layout/Layout";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: 'ADHD Assessment - Adult ADHD Screening Tool | Downscale Weight Loss Clinic',
  description: 'Professional Adult ADHD screening questionnaire. Clinical assessment tool for healthcare providers to evaluate attention deficit hyperactivity disorder symptoms.',
  keywords: 'ADHD assessment, adult ADHD screening, attention deficit hyperactivity disorder, clinical evaluation, Australian healthcare',
  alternates: {
    canonical: 'https://www.downscale.com.au/assessment/adhd',
  },
  openGraph: {
    title: 'ADHD Assessment - Adult ADHD Screening Tool',
    description: 'Professional clinical assessment tool for evaluating adult ADHD symptoms and attention patterns.',
    url: 'https://www.downscale.com.au/assessment/adhd',
    type: 'website',
  },
};

const adhdQuestions = [
  {
    id: 'attention_detail',
    question: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'organisation',
    question: 'How often do you have difficulty getting things in order when you have to do a task that requires organisation?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'memory',
    question: 'How often do you have problems remembering appointments or obligations?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'procrastination',
    question: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'fidgeting',
    question: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ]
  },
  {
    id: 'restlessness',
    question: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Very Often' }
    ]
  }
];

export default function ADHDAssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const getResultInterpretation = (score: number) => {
    if (score <= 8) {
      return {
        level: 'Low Likelihood',
        color: 'text-green-600',
        bgColor: 'bg-green-50 border-green-200',
        icon: CheckCircle,
        description: 'Your responses suggest minimal symptoms consistent with ADHD.'
      };
    } else if (score <= 14) {
      return {
        level: 'Moderate Likelihood',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50 border-yellow-200',
        icon: AlertTriangle,
        description: 'Your responses suggest some symptoms that may warrant professional evaluation.'
      };
    } else {
      return {
        level: 'Higher Likelihood',
        color: 'text-red-600',
        bgColor: 'bg-red-50 border-red-200',
        icon: AlertTriangle,
        description: 'Your responses suggest symptoms that warrant professional clinical assessment for ADHD.'
      };
    }
  };

  const allQuestionsAnswered = adhdQuestions.every(q => answers[q.id] !== undefined);
  const score = calculateScore();
  const result = getResultInterpretation(score);
  const ResultIcon = result.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[40vh] flex items-center justify-center text-center text-white bg-slate-800">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-cream">
            ADHD Assessment
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300">
            Adult ADHD Clinical Screening Questionnaire
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-2">
        <PageNavigation />
      </div>

      {/* Assessment Content */}
      <div className="bg-slate-800 text-foreground py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {/* Back to Tools */}
            <Link
              href="/tools"
              className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tools
            </Link>

            {/* Clinical Disclaimer */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 md:p-6 mb-8">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-cream">
                  <p className="font-semibold mb-2">Clinical Assessment Tool</p>
                  <p className="opacity-90 leading-relaxed">
                    This screening questionnaire is for clinical evaluation purposes. Results should be interpreted by qualified healthcare professionals.
                    This tool does not provide medical diagnosis and should not replace professional clinical assessment.
                  </p>
                </div>
              </div>
            </div>

            {!showResults ? (
              /* Assessment Questions */
              <div className="bg-slate-900 rounded-lg p-4 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-cream">
                  Adult ADHD Screening Questions
                </h2>

                <div className="space-y-6 md:space-y-8">
                  {adhdQuestions.map((question, index) => (
                    <div key={question.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                      <h3 className="text-base md:text-lg font-semibold mb-4 text-cream leading-relaxed">
                        {index + 1}. {question.question}
                      </h3>

                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <label
                            key={option.value}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group"
                          >
                            <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              onChange={() => handleAnswerChange(question.id, option.value)}
                              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-slate-600 bg-slate-700 flex-shrink-0"
                            />
                            <span className="text-sm md:text-base text-cream group-hover:text-white transition-colors leading-relaxed">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowResults(true)}
                    disabled={!allQuestionsAnswered}
                    className="px-6 md:px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm md:text-base"
                  >
                    {allQuestionsAnswered ? 'View Results' : `Answer All Questions (${Object.keys(answers).length}/${adhdQuestions.length})`}
                  </button>
                </div>
              </div>
            ) : (
              /* Results Display */
              <div className="space-y-6">
                <div className={`border rounded-lg p-4 md:p-6 ${result.bgColor}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <ResultIcon className={`h-6 w-6 ${result.color}`} />
                    <h2 className={`text-xl md:text-2xl font-bold ${result.color}`}>
                      Assessment Result: {result.level}
                    </h2>
                  </div>
                  <p className={`text-sm md:text-base ${result.color} opacity-90 leading-relaxed`}>
                    Score: {score}/24 - {result.description}
                  </p>
                </div>

                {/* Professional Consultation CTA */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-cream">Next Steps</h3>
                  <p className="text-sm md:text-base text-cream opacity-90 mb-6 leading-relaxed">
                    For professional evaluation and personalised treatment options, consider booking a consultation with our qualified healthcare team.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 md:px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm md:text-base"
                    >
                      Book Professional Consultation
                    </a>

                    <Link
                      href="/mental-health-support"
                      className="inline-flex items-center justify-center px-4 md:px-6 py-3 border border-slate-600 text-cream rounded-lg hover:bg-slate-800 transition-colors font-semibold text-sm md:text-base"
                    >
                      Learn About Mental Health Support
                    </Link>
                  </div>
                </div>

                {/* Retake Assessment */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setAnswers({});
                    }}
                    className="text-primary hover:text-primary/80 transition-colors font-semibold text-sm md:text-base"
                  >
                    Retake Assessment
                  </button>
                </div>
              </div>
            )}

            {/* Professional Resources */}
            <div className="mt-8 md:mt-12 bg-slate-900 border border-slate-700 rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-cream">Professional Resources</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-cream mb-2">Clinical Support</h4>
                  <ul className="space-y-1 text-cream opacity-90">
                    <li>• Evidence-based assessment protocols</li>
                    <li>• Qualified healthcare supervision</li>
                    <li>• Confidential consultation process</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-cream mb-2">Treatment Approach</h4>
                  <ul className="space-y-1 text-cream opacity-90">
                    <li>• Personalised treatment planning</li>
                    <li>• Multidisciplinary care coordination</li>
                    <li>• Ongoing progress monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}