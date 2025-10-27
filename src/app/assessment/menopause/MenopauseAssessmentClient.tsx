"use client";

import { Layout } from "@/components/layout/Layout";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, AlertTriangle, CheckCircle, Users } from "lucide-react";

const menopauseQuestions = [
  // Psychological Impact (Items 1-11)
  // Anxiety subscale (1-6)
  {
    id: 'heart_beating',
    category: 'psychological',
    subcategory: 'anxiety',
    question: 'Heart beating quickly or strongly',
    description: 'Episodes of rapid or forceful heartbeat'
  },
  {
    id: 'feeling_tense',
    category: 'psychological',
    subcategory: 'anxiety',
    question: 'Feeling tense or nervous',
    description: 'General feelings of tension or nervousness'
  },
  {
    id: 'difficulty_sleeping',
    category: 'psychological',
    subcategory: 'anxiety',
    question: 'Difficulty in sleeping',
    description: 'Problems falling asleep or staying asleep'
  },
  {
    id: 'excitable',
    category: 'psychological',
    subcategory: 'anxiety',
    question: 'Excitable',
    description: 'Feeling easily excited or overstimulated'
  },
  {
    id: 'panic_attacks',
    category: 'psychological',
    subcategory: 'anxiety',
    question: 'Attacks of panic',
    description: 'Episodes of sudden intense fear or anxiety'
  },
  {
    id: 'difficulty_concentrating',
    category: 'psychological',
    subcategory: 'anxiety',
    question: 'Difficulty in concentrating',
    description: 'Problems focusing on tasks or thoughts'
  },
  // Depression subscale (7-11)
  {
    id: 'feeling_tired',
    category: 'psychological',
    subcategory: 'depression',
    question: 'Feeling tired or lacking in energy',
    description: 'Persistent fatigue or low energy levels'
  },
  {
    id: 'loss_of_interest',
    category: 'psychological',
    subcategory: 'depression',
    question: 'Loss of interest in most things',
    description: 'Reduced interest in activities you used to enjoy'
  },
  {
    id: 'feeling_unhappy',
    category: 'psychological',
    subcategory: 'depression',
    question: 'Feeling unhappy or depressed',
    description: 'Persistent feelings of sadness or depression'
  },
  {
    id: 'crying_spells',
    category: 'psychological',
    subcategory: 'depression',
    question: 'Crying spells',
    description: 'Episodes of crying or feeling tearful'
  },
  {
    id: 'irritability',
    category: 'psychological',
    subcategory: 'depression',
    question: 'Irritability',
    description: 'Feeling easily annoyed or frustrated'
  },
  // Physical/Somatic Symptoms (Items 12-18)
  {
    id: 'feeling_dizzy',
    category: 'physical',
    subcategory: 'somatic',
    question: 'Feeling dizzy or faint',
    description: 'Episodes of dizziness or feeling like you might faint'
  },
  {
    id: 'pressure_tightness',
    category: 'physical',
    subcategory: 'somatic',
    question: 'Pressure or tightness in the head or body',
    description: 'Sensations of pressure or tightness'
  },
  {
    id: 'numbness_tingling',
    category: 'physical',
    subcategory: 'somatic',
    question: 'Parts of body feeling numb or tingling',
    description: 'Numbness, tingling, or pins and needles sensations'
  },
  {
    id: 'headaches',
    category: 'physical',
    subcategory: 'somatic',
    question: 'Headaches',
    description: 'Frequency and severity of headaches'
  },
  {
    id: 'muscle_joint_pain',
    category: 'physical',
    subcategory: 'somatic',
    question: 'Muscle and joint pain',
    description: 'Aches and pains in muscles and joints'
  },
  {
    id: 'loss_of_feeling',
    category: 'physical',
    subcategory: 'somatic',
    question: 'Loss of feeling in the hands or feet',
    description: 'Reduced sensation in hands or feet'
  },
  {
    id: 'breathing_difficulties',
    category: 'physical',
    subcategory: 'somatic',
    question: 'Breathing difficulties',
    description: 'Problems with breathing or shortness of breath'
  },
  // Vasomotor Symptoms (Items 19-20)
  {
    id: 'hot_flushes',
    category: 'vasomotor',
    subcategory: 'vasomotor',
    question: 'Hot flushes',
    description: 'Episodes of sudden heat and sweating'
  },
  {
    id: 'night_sweats',
    category: 'vasomotor',
    subcategory: 'vasomotor',
    question: 'Sweating at night',
    description: 'Night sweats that may disturb sleep'
  },
  // Sexual Function (Item 21)
  {
    id: 'loss_sexual_interest',
    category: 'sexual',
    subcategory: 'sexual',
    question: 'Loss of interest in sex',
    description: 'Reduced interest in sexual activity'
  }
];

const symptomOptions = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'A little' },
  { value: 2, label: 'Quite a bit' },
  { value: 3, label: 'Extremely' }
];

export default function MenopauseAssessmentClient() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const calculateSubscores = () => {
    const anxiety = menopauseQuestions
      .filter(q => q.subcategory === 'anxiety')
      .reduce((sum, q) => sum + (answers[q.id] || 0), 0);

    const depression = menopauseQuestions
      .filter(q => q.subcategory === 'depression')
      .reduce((sum, q) => sum + (answers[q.id] || 0), 0);

    const physical = menopauseQuestions
      .filter(q => q.category === 'physical')
      .reduce((sum, q) => sum + (answers[q.id] || 0), 0);

    const vasomotor = menopauseQuestions
      .filter(q => q.category === 'vasomotor')
      .reduce((sum, q) => sum + (answers[q.id] || 0), 0);

    const sexual = menopauseQuestions
      .filter(q => q.category === 'sexual')
      .reduce((sum, q) => sum + (answers[q.id] || 0), 0);

    return { anxiety, depression, physical, vasomotor, sexual };
  };

  const getResultInterpretation = (score: number) => {
    if (score <= 11) {
      return {
        level: 'Minimal Symptoms',
        color: 'text-green-600',
        bgColor: 'bg-green-50 border-green-200',
        icon: CheckCircle,
        description: 'Your symptoms are minimal and unlikely to significantly impact daily life.'
      };
    } else if (score <= 19) {
      return {
        level: 'Mild to Moderate Symptoms',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50 border-yellow-200',
        icon: AlertTriangle,
        description: 'You may be experiencing menopausal symptoms that could benefit from professional guidance.'
      };
    } else if (score <= 35) {
      return {
        level: 'Moderate to Severe Symptoms',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 border-orange-200',
        icon: AlertTriangle,
        description: 'Your symptoms suggest significant menopausal changes that may benefit from treatment.'
      };
    } else {
      return {
        level: 'Severe Symptoms',
        color: 'text-red-600',
        bgColor: 'bg-red-50 border-red-200',
        icon: AlertTriangle,
        description: 'Your symptoms are significant and professional evaluation is strongly recommended.'
      };
    }
  };

  const allQuestionsAnswered = menopauseQuestions.every(q => answers[q.id] !== undefined);
  const score = calculateScore();
  const subscores = calculateSubscores();
  const result = getResultInterpretation(score);
  const ResultIcon = result.icon;

  // Group questions by category for display
  const questionsByCategory = {
    psychological: menopauseQuestions.filter(q => q.category === 'psychological'),
    physical: menopauseQuestions.filter(q => q.category === 'physical'),
    vasomotor: menopauseQuestions.filter(q => q.category === 'vasomotor'),
    sexual: menopauseQuestions.filter(q => q.category === 'sexual')
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[40vh] flex items-center justify-center text-center text-white bg-slate-800">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-cream">
            AMS Menopause Assessment
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300">
            Greene Climacteric Scale - Official AMS Symptom Score Card
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
                  <p className="font-semibold mb-2">Clinical Assessment Tool - AMS Official</p>
                  <p className="opacity-90 leading-relaxed mb-2">
                    This is the official Australasian Menopause Society Symptom Score Card using the validated Greene Climacteric Scale.
                    This tool can document symptoms and monitor treatment response but should NOT be used to diagnose perimenopause or menopause.
                  </p>
                  <p className="opacity-90 leading-relaxed">
                    Results should be interpreted by qualified healthcare professionals as part of a comprehensive clinical assessment.
                  </p>
                </div>
              </div>
            </div>

            {!showResults ? (
              /* Assessment Questions */
              <div className="bg-slate-900 rounded-lg p-4 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-cream">
                  Menopause Symptom Assessment
                </h2>
                <p className="text-sm md:text-base text-cream opacity-90 mb-8 leading-relaxed">
                  Please rate how much each symptom has bothered you during the past month.
                  Rate each symptom from 0 (not at all) to 3 (extremely).
                </p>

                <div className="space-y-8 md:space-y-12">
                  {/* Psychological Symptoms */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-6 text-primary border-b border-slate-700 pb-2">
                      <Users className="inline-block h-5 w-5 mr-2" />
                      Psychological Symptoms
                    </h3>
                    <div className="space-y-6">
                      {questionsByCategory.psychological.map((question, index) => (
                        <div key={question.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                          <h4 className="text-base md:text-lg font-semibold mb-2 text-cream">
                            {index + 1}. {question.question}
                          </h4>
                          <p className="text-sm text-cream opacity-80 mb-4 leading-relaxed">
                            {question.description}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {symptomOptions.map((option) => (
                              <label
                                key={option.value}
                                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group border border-slate-700"
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.value}
                                  onChange={() => handleAnswerChange(question.id, option.value)}
                                  className="h-4 w-4 text-primary focus:ring-primary border-slate-600 bg-slate-700"
                                />
                                <div className="text-center">
                                  <span className="text-sm font-medium text-primary block">
                                    {option.value}
                                  </span>
                                  <span className="text-xs text-cream group-hover:text-white transition-colors">
                                    {option.label}
                                  </span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Physical Symptoms */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-6 text-primary border-b border-slate-700 pb-2">
                      Physical Symptoms
                    </h3>
                    <div className="space-y-6">
                      {questionsByCategory.physical.map((question, index) => (
                        <div key={question.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                          <h4 className="text-base md:text-lg font-semibold mb-2 text-cream">
                            {index + 12}. {question.question}
                          </h4>
                          <p className="text-sm text-cream opacity-80 mb-4 leading-relaxed">
                            {question.description}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {symptomOptions.map((option) => (
                              <label
                                key={option.value}
                                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group border border-slate-700"
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.value}
                                  onChange={() => handleAnswerChange(question.id, option.value)}
                                  className="h-4 w-4 text-primary focus:ring-primary border-slate-600 bg-slate-700"
                                />
                                <div className="text-center">
                                  <span className="text-sm font-medium text-primary block">
                                    {option.value}
                                  </span>
                                  <span className="text-xs text-cream group-hover:text-white transition-colors">
                                    {option.label}
                                  </span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vasomotor Symptoms */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-6 text-primary border-b border-slate-700 pb-2">
                      Vasomotor Symptoms
                    </h3>
                    <div className="space-y-6">
                      {questionsByCategory.vasomotor.map((question, index) => (
                        <div key={question.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                          <h4 className="text-base md:text-lg font-semibold mb-2 text-cream">
                            {index + 19}. {question.question}
                          </h4>
                          <p className="text-sm text-cream opacity-80 mb-4 leading-relaxed">
                            {question.description}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {symptomOptions.map((option) => (
                              <label
                                key={option.value}
                                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group border border-slate-700"
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.value}
                                  onChange={() => handleAnswerChange(question.id, option.value)}
                                  className="h-4 w-4 text-primary focus:ring-primary border-slate-600 bg-slate-700"
                                />
                                <div className="text-center">
                                  <span className="text-sm font-medium text-primary block">
                                    {option.value}
                                  </span>
                                  <span className="text-xs text-cream group-hover:text-white transition-colors">
                                    {option.label}
                                  </span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sexual Function */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-6 text-primary border-b border-slate-700 pb-2">
                      Sexual Function
                    </h3>
                    <div className="space-y-6">
                      {questionsByCategory.sexual.map((question) => (
                        <div key={question.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                          <h4 className="text-base md:text-lg font-semibold mb-2 text-cream">
                            21. {question.question}
                          </h4>
                          <p className="text-sm text-cream opacity-80 mb-4 leading-relaxed">
                            {question.description}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {symptomOptions.map((option) => (
                              <label
                                key={option.value}
                                className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer group border border-slate-700"
                              >
                                <input
                                  type="radio"
                                  name={question.id}
                                  value={option.value}
                                  onChange={() => handleAnswerChange(question.id, option.value)}
                                  className="h-4 w-4 text-primary focus:ring-primary border-slate-600 bg-slate-700"
                                />
                                <div className="text-center">
                                  <span className="text-sm font-medium text-primary block">
                                    {option.value}
                                  </span>
                                  <span className="text-xs text-cream group-hover:text-white transition-colors">
                                    {option.label}
                                  </span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowResults(true)}
                    disabled={!allQuestionsAnswered}
                    className="px-6 md:px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm md:text-base"
                  >
                    {allQuestionsAnswered ? 'View Results' : `Answer All Questions (${Object.keys(answers).length}/${menopauseQuestions.length})`}
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
                    Total Score: {score}/63 - {result.description}
                  </p>
                </div>

                {/* Detailed Score Breakdown */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg font-bold mb-4 text-cream">Detailed Score Breakdown</h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded bg-slate-800">
                        <span className="text-cream font-medium">Anxiety Symptoms</span>
                        <span className="text-primary font-bold">{subscores.anxiety}/18</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded bg-slate-800">
                        <span className="text-cream font-medium">Depression Symptoms</span>
                        <span className="text-primary font-bold">{subscores.depression}/15</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded bg-slate-800">
                        <span className="text-cream font-medium">Physical Symptoms</span>
                        <span className="text-primary font-bold">{subscores.physical}/21</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded bg-slate-800">
                        <span className="text-cream font-medium">Vasomotor Symptoms</span>
                        <span className="text-primary font-bold">{subscores.vasomotor}/6</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded bg-slate-800">
                        <span className="text-cream font-medium">Sexual Function</span>
                        <span className="text-primary font-bold">{subscores.sexual}/3</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded bg-primary/20 border border-primary">
                        <span className="text-cream font-bold">Total Score</span>
                        <span className="text-primary font-bold text-lg">{score}/63</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clinical Interpretation */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg font-bold mb-4 text-cream">Clinical Interpretation</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                      <span className="text-cream">0-11: Minimal symptoms</span>
                      <span className="text-green-400 font-medium">✓ Unlikely to need treatment</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                      <span className="text-cream">12-19: Mild to moderate</span>
                      <span className="text-yellow-400 font-medium">⚠ Consider professional guidance</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                      <span className="text-cream">20-35: Moderate to severe</span>
                      <span className="text-orange-400 font-medium">⚠ Treatment likely beneficial</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-slate-800">
                      <span className="text-cream">36+: Severe symptoms</span>
                      <span className="text-red-400 font-medium">🚨 Professional evaluation needed</span>
                    </div>
                  </div>
                  <p className="text-xs text-cream opacity-70 mt-4 leading-relaxed">
                    <strong>Your score: {score}/63</strong> - This tool monitors symptoms but does not diagnose menopause.
                    Scores above 12 suggest you may be experiencing menopausal symptoms.
                  </p>
                </div>

                {/* Professional Consultation CTA */}
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-cream">Next Steps</h3>
                  <p className="text-sm md:text-base text-cream opacity-90 mb-6 leading-relaxed">
                    For professional menopause assessment and treatment options, consider booking a consultation with our qualified healthcare team.
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
                      href="/services"
                      className="inline-flex items-center justify-center px-4 md:px-6 py-3 border border-slate-600 text-cream rounded-lg hover:bg-slate-800 transition-colors font-semibold text-sm md:text-base"
                    >
                      Learn About Our Services
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
              <h3 className="text-lg md:text-xl font-bold mb-4 text-cream">About the AMS Symptom Score Card</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-cream mb-2">Official AMS Tool</h4>
                  <ul className="space-y-1 text-cream opacity-90">
                    <li>• Australasian Menopause Society approved</li>
                    <li>• Based on validated Greene Climacteric Scale</li>
                    <li>• Used in clinical practice Australia-wide</li>
                    <li>• Monitors symptoms and treatment response</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-cream mb-2">Clinical Applications</h4>
                  <ul className="space-y-1 text-cream opacity-90">
                    <li>• Symptom monitoring over time</li>
                    <li>• Treatment effectiveness evaluation</li>
                    <li>• Professional consultation preparation</li>
                    <li>• Quality of life assessment</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-cream opacity-70 mt-4 leading-relaxed border-t border-slate-700 pt-4">
                <strong>Important:</strong> This assessment tool documents symptoms but does not diagnose menopause or perimenopause.
                Professional medical assessment is required for diagnosis and treatment planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}