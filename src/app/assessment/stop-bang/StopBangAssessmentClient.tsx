"use client";

import { Layout } from "@/components/layout/Layout";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle } from "lucide-react";

const stopBangQuestions = [
  {
    id: 'snoring',
    question: 'Snoring: Do you snore loudly (louder than talking or loud enough to be heard through closed doors)?',
    type: 'yesno'
  },
  {
    id: 'tired',
    question: 'Tired: Do you often feel tired, fatigued, or sleepy during daytime?',
    type: 'yesno'
  },
  {
    id: 'observed',
    question: 'Observed: Has anyone observed you stop breathing during your sleep?',
    type: 'yesno'
  },
  {
    id: 'pressure',
    question: 'Blood Pressure: Do you have or are you being treated for high blood pressure?',
    type: 'yesno'
  },
  {
    id: 'bmi',
    question: 'BMI: Is your BMI more than 35 kg/m²?',
    type: 'yesno'
  },
  {
    id: 'age',
    question: 'Age: Are you older than 50 years?',
    type: 'yesno'
  },
  {
    id: 'neck',
    question: 'Neck size: Is your neck circumference greater than 40cm (16 inches)?',
    type: 'yesno'
  },
  {
    id: 'gender',
    question: 'Gender: Are you male?',
    type: 'yesno'
  }
];

export default function StopBangAssessmentClient() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    return Object.values(answers).filter(Boolean).length;
  };

  const getResultInterpretation = (score: number) => {
    if (score <= 2) {
      return {
        level: 'Low Risk',
        color: 'text-green-600',
        bgColor: 'bg-green-50 border-green-200',
        icon: CheckCircle,
        description: 'Low risk for obstructive sleep apnoea. Consider other causes if sleep symptoms persist.'
      };
    } else if (score <= 4) {
      return {
        level: 'Intermediate Risk',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50 border-yellow-200',
        icon: AlertTriangle,
        description: 'Intermediate risk for obstructive sleep apnoea. Professional sleep evaluation may be beneficial.'
      };
    } else {
      return {
        level: 'High Risk',
        color: 'text-red-600',
        bgColor: 'bg-red-50 border-red-200',
        icon: AlertTriangle,
        description: 'High risk for obstructive sleep apnoea. Professional sleep study evaluation is recommended.'
      };
    }
  };

  const allQuestionsAnswered = stopBangQuestions.every(q => answers[q.id] !== undefined);
  const score = calculateScore();
  const result = getResultInterpretation(score);
  const ResultIcon = result.icon;

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[40vh] flex items-center justify-center text-center text-white bg-slate-800">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-cream">
            STOP-BANG Assessment
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300">
            Sleep Apnoea Screening Questionnaire
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
                    This STOP-BANG questionnaire is a validated screening tool for obstructive sleep apnoea. Results should be interpreted by qualified healthcare professionals.
                    This tool does not provide medical diagnosis and should not replace professional sleep study evaluation.
                  </p>
                </div>
              </div>
            </div>

            {!showResults ? (
              /* Assessment Questions */
              <div className="bg-slate-900 rounded-lg p-4 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-cream">
                  STOP-BANG Sleep Apnoea Screening
                </h2>
                <p className="text-sm md:text-base text-cream opacity-90 mb-8 leading-relaxed">
                  Please answer Yes or No to each of the following questions:
                </p>

                <div className="space-y-6 md:space-y-8">
                  {stopBangQuestions.map((question, index) => (
                    <div key={question.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                      <h3 className="text-base md:text-lg font-semibold mb-4 text-cream leading-relaxed">
                        {question.question}
                      </h3>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group flex-1">
                          <input
                            type="radio"
                            name={question.id}
                            value="yes"
                            onChange={() => handleAnswerChange(question.id, true)}
                            className="h-4 w-4 text-primary focus:ring-primary border-slate-600 bg-slate-700 flex-shrink-0"
                          />
                          <span className="text-sm md:text-base text-cream group-hover:text-white transition-colors font-medium">
                            Yes
                          </span>
                        </label>

                        <label className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group flex-1">
                          <input
                            type="radio"
                            name={question.id}
                            value="no"
                            onChange={() => handleAnswerChange(question.id, false)}
                            className="h-4 w-4 text-primary focus:ring-primary border-slate-600 bg-slate-700 flex-shrink-0"
                          />
                          <span className="text-sm md:text-base text-cream group-hover:text-white transition-colors font-medium">
                            No
                          </span>
                        </label>
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
                    {allQuestionsAnswered ? 'View Results' : `Answer All Questions (${Object.keys(answers).length}/${stopBangQuestions.length})`}
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
                    STOP-BANG Score: {score}/8 - {result.description}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg font-bold mb-4 text-cream">Score Breakdown</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {stopBangQuestions.map((question, index) => {
                      const answered = answers[question.id];
                      const questionKey = question.question.split(':')[0];
                      return (
                        <div key={question.id} className="flex justify-between items-center p-2 rounded bg-slate-800">
                          <span className="text-cream font-medium">{questionKey}</span>
                          <span className={`font-semibold ${answered ? 'text-red-400' : 'text-green-400'}`}>
                            {answered ? 'Yes (+1)' : 'No (0)'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
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
              <h3 className="text-lg md:text-xl font-bold mb-4 text-cream">About STOP-BANG</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-cream mb-2">Validated Tool</h4>
                  <ul className="space-y-1 text-cream opacity-90">
                    <li>• Clinically validated screening questionnaire</li>
                    <li>• High sensitivity for detecting sleep apnoea</li>
                    <li>• Widely used in medical practice</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-cream mb-2">Next Steps</h4>
                  <ul className="space-y-1 text-cream opacity-90">
                    <li>• Sleep study evaluation for high-risk patients</li>
                    <li>• Lifestyle modification recommendations</li>
                    <li>• Treatment planning if indicated</li>
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