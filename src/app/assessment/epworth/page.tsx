"use client";

import { Metadata } from 'next';
import { Layout } from "@/components/layout/Layout";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: 'Epworth Sleepiness Scale - Daytime Sleepiness Assessment | Downscale Weight Loss Clinic',
  description: 'Professional Epworth Sleepiness Scale assessment. Clinical tool for measuring daytime sleepiness and evaluating sleep disorder risk in Australian patients.',
  keywords: 'Epworth Sleepiness Scale, daytime sleepiness assessment, sleep disorder screening, excessive daytime sleepiness, ESS evaluation, Australian healthcare',
  alternates: {
    canonical: 'https://www.downscale.com.au/assessment/epworth',
  },
  openGraph: {
    title: 'Epworth Sleepiness Scale - Daytime Sleepiness Assessment',
    description: 'Professional clinical assessment tool for measuring daytime sleepiness using the validated Epworth Sleepiness Scale.',
    url: 'https://www.downscale.com.au/assessment/epworth',
    type: 'website',
  },
};

const epworthQuestions = [
  {
    id: 'sitting_reading',
    question: 'Sitting and reading',
    description: 'How likely are you to doze off or fall asleep while sitting and reading?'
  },
  {
    id: 'watching_tv',
    question: 'Watching television',
    description: 'How likely are you to doze off or fall asleep while watching television?'
  },
  {
    id: 'sitting_inactive',
    question: 'Sitting inactive in a public place',
    description: 'How likely are you to doze off or fall asleep while sitting inactive in a public place (e.g., theatre or meeting)?'
  },
  {
    id: 'passenger_car',
    question: 'As a passenger in a car for an hour',
    description: 'How likely are you to doze off or fall asleep as a passenger in a car for an hour without a break?'
  },
  {
    id: 'lying_afternoon',
    question: 'Lying down to rest in the afternoon',
    description: 'How likely are you to doze off or fall asleep when lying down to rest in the afternoon when circumstances permit?'
  },
  {
    id: 'sitting_talking',
    question: 'Sitting and talking to someone',
    description: 'How likely are you to doze off or fall asleep while sitting and talking to someone?'
  },
  {
    id: 'sitting_lunch',
    question: 'Sitting quietly after a lunch without alcohol',
    description: 'How likely are you to doze off or fall asleep while sitting quietly after a lunch without alcohol?'
  },
  {
    id: 'car_traffic',
    question: 'In a car while stopped for a few minutes in traffic',
    description: 'How likely are you to doze off or fall asleep in a car while stopped for a few minutes in the traffic?'
  }
];

const sleepinessOptions = [
  { value: 0, label: 'Would never doze' },
  { value: 1, label: 'Slight chance of dozing' },
  { value: 2, label: 'Moderate chance of dozing' },
  { value: 3, label: 'High chance of dozing' }
];

export default function EpworthAssessmentPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const getResultInterpretation = (score: number) => {
    if (score <= 6) {
      return {
        level: 'Normal Range',
        color: 'text-green-600',
        bgColor: 'bg-green-50 border-green-200',
        icon: CheckCircle,
        description: 'Getting enough sleep with minimal daytime sleepiness.'
      };
    } else if (score <= 9) {
      return {
        level: 'Mild Sleepiness',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50 border-yellow-200',
        icon: AlertTriangle,
        description: 'Mild excessive daytime sleepiness. Consider sleep hygiene improvements.'
      };
    } else if (score <= 15) {
      return {
        level: 'Moderate Sleepiness',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 border-orange-200',
        icon: AlertTriangle,
        description: 'Moderate excessive daytime sleepiness. Professional evaluation recommended.'
      };
    } else {
      return {
        level: 'Severe Sleepiness',
        color: 'text-red-600',
        bgColor: 'bg-red-50 border-red-200',
        icon: AlertTriangle,
        description: 'Severe excessive daytime sleepiness. Urgent professional evaluation needed.'
      };
    }
  };

  const allQuestionsAnswered = epworthQuestions.every(q => answers[q.id] !== undefined);
  const score = calculateScore();
  const result = getResultInterpretation(score);
  const ResultIcon = result.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[40vh] flex items-center justify-center text-center text-white bg-slate-800">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-cream">
            Epworth Sleepiness Scale
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300">
            Daytime Sleepiness Assessment Tool
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
                    The Epworth Sleepiness Scale is a validated questionnaire for measuring daytime sleepiness. Results should be interpreted by qualified healthcare professionals.
                    This tool does not provide medical diagnosis and should not replace professional sleep evaluation.
                  </p>
                </div>
              </div>
            </div>

            {!showResults ? (
              /* Assessment Questions */
              <div className="bg-slate-900 rounded-lg p-4 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-cream">
                  Epworth Sleepiness Scale Questions
                </h2>
                <p className="text-sm md:text-base text-cream opacity-90 mb-8 leading-relaxed">
                  How likely are you to doze off or fall asleep in the following situations, in contrast to feeling just tired?
                  This refers to your usual way of life in recent times. Even if you haven't done some of these things recently,
                  try to work out how they would have affected you.
                </p>

                <div className="space-y-6 md:space-y-8">
                  {epworthQuestions.map((question, index) => (
                    <div key={question.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                      <h3 className="text-base md:text-lg font-semibold mb-2 text-cream">
                        {index + 1}. {question.question}
                      </h3>
                      <p className="text-sm text-cream opacity-80 mb-4 leading-relaxed">
                        {question.description}
                      </p>

                      <div className="space-y-2">
                        {sleepinessOptions.map((option) => (
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
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-primary group-hover:text-primary/80">
                                {option.value}
                              </span>
                              <span className="text-sm md:text-base text-cream group-hover:text-white transition-colors leading-relaxed">
                                {option.label}
                              </span>
                            </div>
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
                    {allQuestionsAnswered ? 'View Results' : `Answer All Questions (${Object.keys(answers).length}/${epworthQuestions.length})`}
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
                    Epworth Score: {score}/24 - {result.description}
                  </p>
                </div>

                {/* Score Interpretation */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg font-bold mb-4 text-cream">Score Interpretation</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                      <span className="text-cream">0-6: Normal range</span>
                      <span className="text-green-400 font-medium">✓ Adequate sleep</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                      <span className="text-cream">7-9: Mild sleepiness</span>
                      <span className="text-yellow-400 font-medium">⚠ Monitor sleep habits</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                      <span className="text-cream">10-15: Moderate sleepiness</span>
                      <span className="text-orange-400 font-medium">⚠ Professional evaluation</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                      <span className="text-cream">16-24: Severe sleepiness</span>
                      <span className="text-red-400 font-medium">🚨 Urgent evaluation</span>
                    </div>
                  </div>
                  <p className="text-xs text-cream opacity-70 mt-4 leading-relaxed">
                    Your score: <strong>{score}/24</strong> - This indicates {result.level.toLowerCase()}
                  </p>
                </div>

                {/* Professional Consultation CTA */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-cream">Next Steps</h3>
                  <p className="text-sm md:text-base text-cream opacity-90 mb-6 leading-relaxed">
                    For professional sleep evaluation and treatment options, consider booking a consultation with our qualified healthcare team.
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
                      href="/sleep-recovery-optimisation"
                      className="inline-flex items-center justify-center px-4 md:px-6 py-3 border border-slate-600 text-cream rounded-lg hover:bg-slate-800 transition-colors font-semibold text-sm md:text-base"
                    >
                      Learn About Sleep Recovery
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
              <h3 className="text-lg md:text-xl font-bold mb-4 text-cream">About the Epworth Sleepiness Scale</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-cream mb-2">Validated Assessment</h4>
                  <ul className="space-y-1 text-cream opacity-90">
                    <li>• Internationally recognised sleep assessment tool</li>
                    <li>• Measures subjective daytime sleepiness</li>
                    <li>• Used in clinical sleep medicine practice</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-cream mb-2">Clinical Applications</h4>
                  <ul className="space-y-1 text-cream opacity-90">
                    <li>• Sleep disorder screening and monitoring</li>
                    <li>• Treatment effectiveness evaluation</li>
                    <li>• Research and clinical assessment protocols</li>
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