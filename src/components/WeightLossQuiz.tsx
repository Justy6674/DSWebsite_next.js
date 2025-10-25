'use client';

import React, { useState, Suspense } from 'react';
import { ChevronRight, CheckCircle2, Brain, Heart, Activity, TrendingUp } from 'lucide-react';
import { EXTERNAL_URLS } from '@/config/urls';

interface QuizOption {
  value: string;
  label: string;
  correct?: boolean;
}

interface QuizQuestion {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  question?: string;
  multiSelect?: boolean;
  maxSelect?: number;
  options: QuizOption[];
  fact: string;
}

interface QuizAnswers {
  [key: string]: string | string[];
}

const WeightLossQuiz: React.FC<{
  children?: React.ReactNode;
}> = (
  {
    children
  }
) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const questions: QuizQuestion[] = [
    {
      id: 'metrics',
      title: 'Know Your Numbers',
      icon: <Activity className="w-6 h-6" />,
      content: (
        <div>
          <p className="mb-4 text-muted-foreground">First, let's calculate your body metrics. This helps us understand your starting point.</p>
          <a 
            href={EXTERNAL_URLS.CALCULATOR}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors mb-4"
          >
            Open Body Metrics Calculator <ChevronRight className="w-4 h-4" />
          </a>
          <p className="text-sm text-muted-foreground italic mb-4">Opens in new tab - complete it then return to continue</p>
        </div>
      ),
      options: [
        { value: 'completed', label: "Yes, I've calculated my metrics" },
        { value: 'later', label: "I'll do it later" }
      ],
      fact: "BMI and waist circumference are key health indicators recognised by the NHMRC¹"
    },
    {
      id: 'health',
      title: 'Health Impact Assessment',
      icon: <Heart className="w-6 h-6" />,
      question: 'How is your current weight affecting your physical health?',
      options: [
        { value: 'none', label: 'No health issues' },
        { value: 'minor', label: 'Minor issues (occasional joint pain, breathlessness)' },
        { value: 'moderate', label: 'Moderate issues (pre-diabetes, high blood pressure, sleep problems)' },
        { value: 'significant', label: 'Significant issues (diabetes, heart disease, severe mobility problems)' }
      ],
      fact: "Research shows even 5-10% weight loss can significantly improve health markers²"
    },
    {
      id: 'mental',
      title: 'Mental Health Check',
      icon: <Brain className="w-6 h-6" />,
      question: 'How does your weight affect your mental wellbeing?',
      options: [
        { value: 'none', label: "It doesn't - I feel confident and happy" },
        { value: 'sometimes', label: 'Sometimes affects my mood or confidence' },
        { value: 'often', label: 'Often impacts my daily happiness and activities' },
        { value: 'significantly', label: 'Significantly affects my mental health and relationships' }
      ],
      fact: "Studies show weight and mental health are closely connected - addressing both improves outcomes³"
    },
    {
      id: 'vision',
      title: 'Your 15% Lighter Vision',
      icon: <TrendingUp className="w-6 h-6" />,
      question: "Imagine you're 15% lighter. Which THREE benefits excite you most?",
      multiSelect: true,
      maxSelect: 3,
      options: [
        { value: 'energy', label: 'More energy for daily activities' },
        { value: 'sleep', label: 'Better sleep quality' },
        { value: 'medication', label: 'Reduced medication needs' },
        { value: 'confidence', label: 'Improved confidence' },
        { value: 'movement', label: 'Easier physical movement' },
        { value: 'mood', label: 'Better mood and mental clarity' },
        { value: 'pain', label: 'Reduced pain' },
        { value: 'relationships', label: 'Improved intimate relationships' }
      ],
      fact: "Research shows visualising specific benefits increases success rates⁴"
    },
    {
      id: 'medical',
      title: 'Medical Support Consideration',
      question: 'Have you considered medical weight loss options before?',
      options: [
        { value: 'never', label: 'Never - I thought diet and exercise were the only ways' },
        { value: 'briefly', label: "Briefly, but didn't know where to start" },
        { value: 'worried', label: 'Yes, but worried about safety or cost' },
        { value: 'researching', label: "Yes, I'm actively researching options now" }
      ],
      fact: "Modern obesity medicine recognises weight loss as a complex medical condition requiring comprehensive support⁵"
    },
    {
      id: 'experience',
      title: 'Previous Treatment Experience',
      question: 'Have you used prescribed weight loss medications before?',
      options: [
        { value: 'never', label: 'Never' },
        { value: 'good-stopped', label: 'Yes, with good results but stopped' },
        { value: 'side-effects', label: 'Yes, but had side effects' },
        { value: 'plateau', label: 'Yes, but hit a plateau' },
        { value: 'current', label: 'Currently using them' }
      ],
      fact: "If you've used medications before, proper support and adjustments often make the difference⁶"
    },
    {
      id: 'setpoint',
      title: 'Set Point Theory Knowledge',
      question: "Do you know about 'set point theory' - your body's weight thermostat?",
      options: [
        { value: 'never', label: 'Never heard of it' },
        { value: 'heard', label: "Heard the term but don't understand it" },
        { value: 'understand', label: 'Yes, I understand my body fights to maintain its weight' },
        { value: 'expert', label: 'Yes, and I know it can be adjusted with proper treatment' }
      ],
      fact: 'Your body has a "set point" it defends. Understanding this explains why diets alone often fail⁷'
    },
    {
      id: 'hormones',
      title: 'Hunger Hormone Awareness',
      question: 'Did you know your hypothalamus controls hunger through hormones? Which sounds right?',
      options: [
        { value: 'willpower', label: 'Willpower alone controls eating' },
        { value: 'correct', label: 'Ghrelin increases hunger, GLP-1 increases fullness', correct: true },
        { value: 'habit', label: 'Hunger is just a habit' },
        { value: 'exercise', label: 'Exercise is the main hunger controller' }
      ],
      fact: "Correct answer: Ghrelin increases hunger, GLP-1 increases fullness. Medical treatments can help balance these⁸"
    },
    {
      id: 'success',
      title: 'Long-Term Success Understanding',
      question: 'What do you think is MOST important for maintaining weight loss?',
      options: [
        { value: 'calories', label: 'Strict calorie counting forever' },
        { value: 'exercise', label: 'Intense exercise programs' },
        { value: 'support', label: 'Regular professional support and monitoring', correct: true },
        { value: 'eliminate', label: 'Eliminating all favourite foods' }
      ],
      fact: "Evidence shows regular professional support is the strongest predictor of long-term success⁹"
    },
    {
      id: 'maintenance',
      title: 'The Maintenance Truth',
      icon: <TrendingUp className="w-6 h-6" />,
      question: 'What do you think happens when people reach goal weight and stop treatment?',
      options: [
        { value: 'maintain', label: 'They maintain their new weight easily' },
        { value: 'regain-some', label: 'They regain some weight' },
        { value: 'regain-most', label: 'They regain most or all weight within 2 years', correct: true },
        { value: 'depends', label: 'It depends on willpower' }
      ],
      fact: "Research shows 80-95% regain weight within 2 years when treatment stops. Your set point hasn't changed - it's just been overridden by treatment¹⁰"
    },
    {
      id: 'discharge',
      title: 'Previous Discharge Experience',
      question: 'Have you been discharged from a weight loss clinic after reaching goal?',
      options: [
        { value: 'never', label: 'No, never reached goal before' },
        { value: 'yes-regained', label: 'Yes, and I regained the weight' },
        { value: 'yes-struggling', label: 'Yes, currently struggling with regain' },
        { value: 'multiple', label: 'Yes, multiple times with regain each time' }
      ],
      fact: "Most clinics discharge at goal weight, but set point theory means your brain still defends your old weight. Maintenance support is crucial¹¹"
    },
    {
      id: 'readiness',
      title: 'Your Situation Today',
      question: 'Which best describes your current situation?',
      options: [
        { value: 'starting', label: 'Want to start my weight loss journey' },
        { value: 'plateau', label: 'Currently on treatment but plateaued' },
        { value: 'discharged', label: 'Was discharged at goal, now regaining' },
        { value: 'maintenance', label: 'At/near goal, want maintenance support' }
      ],
      fact: "Downscale specialises in ALL stages - initial loss, plateaus, and crucially, long-term maintenance¹²"
    }
  ];

  const handleAnswer = (value: string) => {
    const question = questions[currentQuestion];
    
    if (question.multiSelect) {
      const currentAnswers = (answers[question.id] as string[]) || [];
      if (currentAnswers.includes(value)) {
        setAnswers({
          ...answers,
          [question.id]: currentAnswers.filter(v => v !== value)
        });
      } else if (currentAnswers.length < (question.maxSelect || 1)) {
        setAnswers({
          ...answers,
          [question.id]: [...currentAnswers, value]
        });
      }
    } else {
      setAnswers({
        ...answers,
        [question.id]: value
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getResults = () => {
    const knowledgeGaps = !answers.setpoint || answers.setpoint === 'never' || answers.setpoint === 'heard';
    const healthImpact = answers.health !== 'none' || answers.mental !== 'none';
    const wasDischarged = answers.discharge && typeof answers.discharge === 'string' && answers.discharge.includes('yes');
    const needsMaintenance = answers.readiness === 'maintenance' || answers.readiness === 'discharged';
    const ready = answers.readiness !== 'exploring' && answers.readiness !== 'thinking';
    
    return { knowledgeGaps, healthImpact, wasDischarged, needsMaintenance, ready };
  };

  const ResultsSection: React.FC<{
    children?: React.ReactNode;
  }> = (
    {
      children
    }
  ) => {
    const { knowledgeGaps, healthImpact, wasDischarged, needsMaintenance, ready } = getResults();
    
    return (
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold heading-beach">Your Personalised Results</h2>
        
        {wasDischarged && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3 text-destructive">
              You're Not Alone - Discharge Doesn't Equal Success
            </h3>
            <p className="text-muted-foreground mb-3">
              Being discharged at goal weight without maintenance support is like stopping antibiotics 
              mid-course - the problem comes back. Your set point hasn't changed.
            </p>
            <p className="font-medium text-foreground">
              At Downscale, we NEVER discharge at goal. We transition to maintenance support because 
              we understand the science.
            </p>
          </div>
        )}

        {needsMaintenance && (
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3 text-secondary">Critical: Maintenance Is Treatment Too</h3>
            <p className="text-muted-foreground">
              Your brain still defends your old weight. Stopping treatment at goal is why 80-95% regain. 
              Maintenance medication at lower doses keeps your new set point stable.
            </p>
          </div>
        )}
        
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3 text-primary">Your Knowledge Score</h3>
          {knowledgeGaps ? (
            <p className="text-muted-foreground">
              You're not alone! Understanding set point theory and hunger hormones is crucial for success. 
              This knowledge gap often explains why previous attempts failed.
            </p>
          ) : (
            <p className="text-muted-foreground">
              Great knowledge base! You understand the science behind weight loss, 
              which puts you ahead in your journey.
            </p>
          )}
        </div>

        {healthImpact && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3 text-green-900">Health Impact Assessment</h3>
            <p className="text-green-700">
              Since weight affects your physical or mental health, medical support can address both simultaneously 
              for better overall outcomes.
            </p>
          </div>
        )}

        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3 text-secondary">Your Next Step</h3>
          {needsMaintenance ? (
            <div>
              <p className="text-muted-foreground mb-4 font-medium">
                Don't let another clinic's discharge policy undo your hard work. 
                Get proper maintenance support now.
              </p>
              <a 
                href={EXTERNAL_URLS.HALAXY_BOOKING}
                className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-6 py-3 rounded-lg hover:bg-destructive/90 transition-colors"
              >
                <img src={EXTERNAL_URLS.HALAXY_LOGO} alt="Book Australian Weight Loss Consultation" className="h-4 sm:h-5" />
              </a>
            </div>
          ) : ready ? (
            <div>
              <p className="text-muted-foreground mb-4">
                You're ready to take action! Let's get you started with evidence-based support.
              </p>
              <a 
                href={EXTERNAL_URLS.BOOK_ONLINE}
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Book Your $45 Consultation <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div>
              <p className="text-muted-foreground mb-4">
                Take your time to explore. When you're ready, we're here with evidence-based support.
              </p>
              <a 
                href={EXTERNAL_URLS.FAQ}
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
              >
                Learn About Our Approach <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
          <p className="text-lg font-medium text-foreground mb-2">
            At Downscale: Weight Loss AND Maintenance - No Discharge at Goal
          </p>
          <p className="text-muted-foreground">
            See Justin Black, your dedicated Nurse Practitioner, through your entire journey.
          </p>
        </div>
      </div>
    );
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-card rounded-xl shadow-lg" itemScope itemType="https://schema.org/Quiz">
        <ResultsSection />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-card rounded-xl shadow-lg" itemScope itemType="https://schema.org/Quiz">
      <meta itemProp="name" content="Weight Loss IQ Assessment - Downscale Weight Loss Clinic" />
      <meta itemProp="description" content="Science-based quiz to assess your weight loss knowledge and readiness" />
      
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {question.icon && <div className="text-secondary flex-shrink-0">{question.icon}</div>}
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">{question.title}</h2>
        </div>
        
        {question.content || (
          <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4">{question.question}</p>
        )}

        {/* Options */}
        <div className="space-y-2 sm:space-y-3">
          {question.options.map((option) => {
            const isSelected = question.multiSelect 
              ? (answers[question.id] as string[] || []).includes(option.value)
              : answers[question.id] === option.value;
            
            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-all duration-200 ${
                  isSelected 
                    ? 'border-secondary bg-secondary/10 text-secondary-foreground' 
                    : 'border-border bg-background hover:border-secondary/50 hover:bg-secondary/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-secondary bg-secondary' : 'border-muted-foreground'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-secondary-foreground" />}
                  </div>
                  <span className="text-sm sm:text-base">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <div className="mt-6 sm:mt-8">
          <button
            onClick={nextQuestion}
            disabled={!answers[question.id] || (question.multiSelect && !(answers[question.id] as string[])?.length)}
            className="w-full bg-secondary text-secondary-foreground py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/90 disabled:hover:bg-secondary"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Your Results'}
            <ChevronRight className="w-4 h-4 inline ml-2" />
          </button>
        </div>
      </div>

      {/* Fact Box */}
      <div className="bg-muted/50 border-l-4 border-secondary p-4 sm:p-6 rounded-r-lg">
        <p className="text-xs sm:text-sm text-muted-foreground font-medium italic">
          💡 {question.fact}
        </p>
      </div>
    </div>
  );
};

export { WeightLossQuiz as default, WeightLossQuiz };