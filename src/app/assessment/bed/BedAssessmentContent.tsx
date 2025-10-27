"use client";

import { Layout } from "@/components/layout/Layout";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";

const bedQuestions = [
  {
    id: 'frequency',
    question: 'How often do you have episodes where you eat large amounts of food in a short period (within 2 hours)?',
    options: [
      { value: 0, label: 'Never or rarely' },
      { value: 1, label: 'Once a month or less' },
      { value: 2, label: '2-3 times a month' },
      { value: 3, label: 'Once a week' },
      { value: 4, label: 'Multiple times per week' }
    ]
  },
  {
    id: 'control',
    question: 'During these episodes, do you feel a sense of lack of control over your eating?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Always' }
    ]
  },
  {
    id: 'distress',
    question: 'How distressed do you feel about your eating episodes?',
    options: [
      { value: 0, label: 'Not at all' },
      { value: 1, label: 'Slightly' },
      { value: 2, label: 'Moderately' },
      { value: 3, label: 'Considerably' },
      { value: 4, label: 'Extremely' }
    ]
  },
  {
    id: 'speed',
    question: 'During these episodes, do you eat much more rapidly than normal?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Always' }
    ]
  },
  {
    id: 'fullness',
    question: 'Do you eat until you feel uncomfortably full during these episodes?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Always' }
    ]
  },
  {
    id: 'alone',
    question: 'Do you eat alone during these episodes because you are embarrassed?',
    options: [
      { value: 0, label: 'Never' },
      { value: 1, label: 'Rarely' },
      { value: 2, label: 'Sometimes' },
      { value: 3, label: 'Often' },
      { value: 4, label: 'Always' }
    ]
  }
];

export default function BedAssessmentContent() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const getResultInterpretation = (score: number) => {
    if (score <= 8) {
      return {
        level: 'Low Risk',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle,
        description: 'Your responses suggest a low likelihood of Binge Eating Disorder. However, if you have concerns about your eating patterns, consider discussing them with a healthcare professional.'
      };
    } else if (score <= 16) {
      return {
        level: 'Moderate Risk',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: AlertTriangle,
        description: 'Your responses suggest some concerning eating patterns that may warrant further evaluation. Consider speaking with a healthcare professional about your eating behaviors.'
      };
    } else {
      return {
        level: 'High Risk',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertTriangle,
        description: 'Your responses suggest patterns consistent with Binge Eating Disorder. It is strongly recommended that you speak with a healthcare professional for a comprehensive evaluation and potential treatment options.'
      };
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === bedQuestions.length) {
      setShowResults(true);
    }
  };

  const isComplete = Object.keys(answers).length === bedQuestions.length;
  const score = calculateScore();
  const result = getResultInterpretation(score);

  return (
    <Layout>
      {/* Hero Section */}
      <div
        className="relative min-h-[50vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(/medical-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              color: '#f7f2d3',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)'
            }}
          >
            Binge Eating Disorder Assessment
          </h1>
          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ color: '#f8fafc' }}
          >
            Professional screening questionnaire for Binge Eating Disorder (BED)
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-2">
        <PageNavigation />
      </div>

      {/* Content Section */}
      <div className="bg-slate-800 text-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            {!showResults ? (
              <>
                {/* Instructions */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8">
                  <h2 className="text-2xl font-bold text-cream mb-4">Assessment Instructions</h2>
                  <div className="text-cream opacity-90 space-y-2">
                    <p>This assessment is designed to help identify potential symptoms of Binge Eating Disorder (BED).</p>
                    <p>Please answer each question honestly based on your experiences over the past month.</p>
                    <p><strong>Important:</strong> This is a screening tool only and does not replace professional diagnosis.</p>
                  </div>
                </div>

                {/* Questions */}
                <div className="space-y-6">
                  {bedQuestions.map((question, index) => (
                    <div key={question.id} className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-cream mb-4">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <label key={option.value} className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              onChange={() => handleAnswerChange(question.id, option.value)}
                              className="mr-3 text-primary"
                            />
                            <span className="text-cream opacity-90">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
                      isComplete
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isComplete ? 'View Results' : `Complete All Questions (${Object.keys(answers).length}/${bedQuestions.length})`}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Results */}
                <div className={`${result.bgColor} border ${result.borderColor} rounded-lg p-8 mb-8`}>
                  <div className="flex items-center mb-4">
                    <result.icon className={`h-8 w-8 ${result.color} mr-3`} />
                    <h2 className={`text-2xl font-bold ${result.color}`}>
                      Assessment Results: {result.level}
                    </h2>
                  </div>
                  <p className={`text-lg mb-4 ${result.color}`}>
                    Your total score: {score} out of 24
                  </p>
                  <p className={`${result.color} opacity-90`}>
                    {result.description}
                  </p>
                </div>

                {/* Next Steps */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-cream mb-4">Next Steps</h3>
                  <div className="text-cream opacity-90 space-y-2">
                    <p>• Consider discussing your results with a healthcare professional</p>
                    <p>• Keep track of your eating patterns and triggers</p>
                    <p>• Seek support from qualified mental health professionals if needed</p>
                    <p>• Remember that help is available and recovery is possible</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setAnswers({});
                    }}
                    className="px-6 py-3 bg-slate-700 text-cream rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Retake Assessment
                  </button>
                  <a
                    href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <img src="https://cdn.halaxy.com/h/images/logo.png" alt="Halaxy" className="h-5 w-5 mr-2" />
                    Book a Consultation
                  </a>
                </div>
              </>
            )}

            {/* Back to Tools */}
            <div className="mt-12 text-center">
              <Link
                href="/tools"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Assessment Tools
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}