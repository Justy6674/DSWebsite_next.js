import Head from "next/head";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OptimizedBackground } from '@/components/ui/optimized-background';
// Image served from /public/ for instant CDN loading
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function GoalSettingMaintenance() {
  const goalFrameworks = [
    {
      framework: "Maslow-Based Individual Assessment",
      description: "Assess where individuals are in their life hierarchy - can't expect nutrition/exercise optimisation if at lower Maslow level",
      icon: "🏔️",
      components: [
        "Assess current life state: Where is this person right now?",
        "Lower hierarchy: Focus on maintenance when stressed/struggling", 
        "Stability first: Can't optimise if basic needs aren't met",
        "When stress lifts: Then push forward with progression",
        "Individual context: What's realistic for THEIR life right now?"
      ],
      example: "If dealing with sick kids/work stress: maintain current habits. When life stabilizes: add new goals"
    },
    {
      framework: "Real-World Process Goals",
      description: "Focus on what actually works in busy, chaotic, real life",
      icon: "🔄",
      components: [
        "Micro-habits: 5-minute wins that fit anywhere",
        "No-excuse alternatives: Plan A, B, C for every goal",
        "Life-proof systems: Works during school holidays, sick kids, work stress",
        "Progress not perfection: Celebrate small wins",
        "Flexibility: Adapt to what life throws at you"
      ],
      example: "Resistance bands between meetings, office lunch walks, weekend family active time"
    },
    {
      framework: "Sustainable Life Integration",
      description: "Goals that become part of your life, not additions to it",
      icon: "⚡",
      components: [
        "Stack with existing habits: Link to what you already do",
        "Family-friendly: Include kids, partner, real obligations",
        "Energy-giving: Goals that add energy, not drain it",
        "Identity-based: Become the person who does these things",
        "Maintenance mindset: Built for long-term, not short sprints"
      ],
      example: "Morning coffee = resistance band time, office breaks = desk exercises, family time = active play"
    }
  ];

  const habitFormation = [
    {
      stage: "Cue Design",
      description: "Create environmental triggers for healthy behaviours",
      duration: "Week 1-2",
      strategies: ["Stack habits with existing routines", "Use visual reminders", "Optimize your environment", "Time-based triggers"],
      example: "Put workout clothes by your bed for morning exercise"
    },
    {
      stage: "Routine Building", 
      description: "Establish the actual behaviour patterns",
      duration: "Week 3-8",
      strategies: ["Start ridiculously small", "Focus on consistency over intensity", "Track daily completion", "Celebrate small wins"],
      example: "5 push-ups every morning before coffee"
    },
    {
      stage: "Reward Integration",
      description: "Create positive reinforcement loops",
      duration: "Week 4-12",
      strategies: ["Immediate rewards", "Progress celebration", "Social accountability", "Identity reinforcement"],
      example: "Favorite podcast only during walks"
    },
    {
      stage: "Automaticity",
      description: "Behaviors become automatic and effortless",
      duration: "Week 12+",
      strategies: ["Monitor and adjust", "Environmental maintenance", "Identity integration", "Continuous refinement"],
      example: "Exercise feels wrong to skip, like not brushing teeth"
    }
  ];

  const maintenanceStrategies = [
    {
      strategy: "Identity-Based Change",
      description: "Shift from 'I want to lose weight' to 'I am a healthy person'",
      icon: "👤",
      techniques: [
        "Ask 'What would a healthy person do?'",
        "Use identity-affirming language",
        "Focus on being, not just doing",
        "Align actions with desired identity"
      ]
    },
    {
      strategy: "Flexible Boundary Setting",
      description: "Create sustainable rules that bend but don't break",
      icon: "📏",
      techniques: [
        "80/20 rule for consistency",
        "Minimum effective habits",
        "Recovery protocols for setbacks",
        "Seasonal adjustments"
      ]
    },
    {
      strategy: "Environmental Design",
      description: "Engineer your surroundings to support success",
      icon: "🏠",
      techniques: [
        "Remove friction for good habits",
        "Add friction for bad habits",
        "Visual cues and reminders",
        "Social environment optimisation"
      ]
    },
    {
      strategy: "Continuous Calibration",
      description: "Regular assessment and adjustment of goals and methods",
      icon: "⚖️",
      techniques: [
        "Monthly review sessions",
        "Quarterly goal adjustments",
        "Annual lifestyle audits",
        "Real-time feedback loops"
      ]
    }
  ];

  const plateauStrategies = [
    {
      type: "Weight Loss Plateau",
      causes: ["Metabolic adaptation", "Caloric creep", "Exercise adaptation", "Hormonal changes"],
      solutions: ["Diet breaks", "Exercise variation", "Sleep optimisation", "Stress management"],
      mindset: "Plateaus are normal and temporary - focus on non-scale victories"
    },
    {
      type: "Motivation Plateau",
      causes: ["Goal fatigue", "Lack of novelty", "Insufficient rewards", "Life stress"],
      solutions: ["Goal refinement", "New challenges", "Social support", "Professional guidance"],
      mindset: "Motivation fluctuates - rely on systems and habits, not feelings"
    },
    {
      type: "Habit Plateau",
      causes: ["Complacency", "Environmental changes", "Competing priorities", "Perfectionism"],
      solutions: ["Habit stacking", "Environment redesign", "Priority clarification", "Flexibility building"],
      mindset: "Progress isn't always linear - small steps compound over time"
    }
  ];

  return (
    <>
      <Head>
        <title>Goal Setting & Maintenance | Sustainable Weight Loss Goals | Downscale Weight Loss Clinic</title>
        <meta name="description" content="Professional goal setting and habit formation for sustainable weight loss. SMART goals, habit psychology, and long-term maintenance strategies for lasting success." />
        <meta name="keywords" content="weight loss goals Australia, habit formation telehealth, SMART goals, goal setting psychology, weight maintenance, sustainable habits" />
        <link rel="canonical" href="https://www.downscale.com.au/goal-setting-maintenance" />
        
        <meta property="og:title" content="Goal Setting & Maintenance | Sustainable Weight Loss Goals" />
        <meta property="og:description" content="Professional goal setting strategies and habit formation for sustainable weight management success." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/goal-setting-maintenance" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Goal Setting & Maintenance",
              "description": "Evidence-based goal setting and habit formation strategies for sustainable weight management",
              "publisher": {
                "@type": "Organization",
                "name": "Downscale Weight Loss Clinic"
              }
            }
          `}
        </script>
      </Head>
      <Header />
      <main className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <div 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url(/goal-setting-hero.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img 
            src="/goal-setting-hero.jpg" 
            alt="Goal setting and maintenance strategies for long-term weight management success" 
            className="hidden" 
            loading="eager"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}
              >
                Goal Setting & Maintenance
              </h1>
              <div className="w-20 h-1 bg-cream/80 mx-auto mb-6"></div>
              <p 
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                Master the psychology of sustainable change. Learn evidence-based goal setting, habit formation, 
                and long-term maintenance strategies for lasting weight management success.
              </p>
              <a 
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brown hover:bg-brown/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-xl hover-scale animate-fade-in"
              >
                <i className="fas fa-bullseye mr-3"></i>
                Set Sustainable Goals
                <i className="fas fa-arrow-right ml-3"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-2">
          <PageNavigation />
        </div>

        {/* Goal Setting Philosophy */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Evidence-Based Goal Setting
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Successful weight management requires strategic goal setting that addresses both behaviour change and psychological factors
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
              {goalFrameworks.map((framework, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-xl p-8 border border-slate-700"
                >
                  <div className="flex items-start mb-6">
                    <div className="text-4xl mr-4">{framework.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-cream mb-2">{framework.framework}</h3>
                      <p className="text-cream opacity-80 mb-4">{framework.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-cream mb-4">Components:</h4>
                      <ul className="space-y-3">
                        {framework.components.map((component, componentIndex) => (
                          <li
                            key={componentIndex}
                            className="flex items-start text-cream opacity-70 text-sm"
                          >
                            <i className="fas fa-check text-brown mr-3 mt-1"></i>
                            {component}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-cream mb-4">Example Application:</h4>
                      <div className="bg-brown/10 rounded-lg p-4 border border-brown/20">
                        <p className="text-brown font-semibold text-sm">{framework.example}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Habit Formation Science */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                The Science of Habit Formation
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Understanding how habits form helps you build sustainable behaviours that support long-term weight management
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {habitFormation.map((stage, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-xl p-8 hover:bg-slate-750 transition-colors border border-slate-700"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-brown rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-cream">{stage.stage}</h3>
                        <p className="text-cream opacity-60 text-sm">{stage.duration}</p>
                      </div>
                    </div>
                    <p className="text-cream opacity-80 mb-4">{stage.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-cream mb-2">Strategies:</h4>
                        <ul className="space-y-2">
                          {stage.strategies.map((strategy, strategyIndex) => (
                            <li key={strategyIndex} className="text-cream opacity-70 text-sm">
                              <i className="fas fa-lightbulb text-brown mr-2"></i>
                              {strategy}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-slate-900 rounded-lg p-4 border border-slate-600">
                        <h4 className="text-sm font-semibold text-cream mb-2">Example:</h4>
                        <p className="text-brown text-sm">{stage.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Maintenance Strategies */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Long-Term Maintenance Strategies
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Sustainable weight management requires ongoing strategies that evolve with your life and goals
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {maintenanceStrategies.map((strategy, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-xl p-8 hover:bg-slate-750 transition-colours border border-slate-700"
                >
                  <div className="flex items-start mb-6">
                    <div className="text-4xl mr-4">{strategy.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-cream mb-2">{strategy.strategy}</h3>
                      <p className="text-cream opacity-80 mb-4">{strategy.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {strategy.techniques.map((technique, techniqueIndex) => (
                      <li
                        key={techniqueIndex}
                        className="flex items-start text-cream opacity-70"
                      >
                        <i className="fas fa-check text-brown mr-3 mt-1"></i>
                        {technique}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plateau Management */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Overcoming Plateaus & Setbacks
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Plateaus are normal parts of the weight management journey - here's how to navigate them successfully
              </p>
            </div>

            <div className="max-w-6xl mx-auto space-y-8">
              {plateauStrategies.map((plateau, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-xl p-8 border border-slate-700"
                >
                  <h3 className="text-2xl font-bold text-cream mb-6">{plateau.type}</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-cream mb-3">Common Causes</h4>
                      <ul className="space-y-2">
                        {plateau.causes.map((cause, causeIndex) => (
                          <li key={causeIndex} className="text-cream opacity-70 text-sm">
                            <i className="fas fa-exclamation-triangle text-orange-400 mr-2"></i>
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-cream mb-3">Solutions</h4>
                      <ul className="space-y-2">
                        {plateau.solutions.map((solution, solutionIndex) => (
                          <li key={solutionIndex} className="text-cream opacity-70 text-sm">
                            <i className="fas fa-lightbulb text-brown mr-2"></i>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-cream mb-3">Mindset Shift</h4>
                      <div className="bg-brown/10 rounded-lg p-4 border border-brown/20">
                        <p className="text-brown text-sm font-medium">{plateau.mindset}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Progress Tracking */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                  Comprehensive Progress Tracking
                </h2>
                <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
                <p className="text-cream opacity-90 text-lg">
                  Track multiple metrics to get a complete picture of your progress and maintain motivation
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
                  <h3 className="text-xl font-bold text-cream mb-6">Quantitative Measures</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <span className="text-cream opacity-80">Body Weight</span>
                      <span className="text-brown text-sm">Weekly trends, not daily fluctuations</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-cream opacity-80">Body Measurements</span>
                      <span className="text-brown text-sm">Monthly circumference tracking</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-cream opacity-80">Fitness Metrics</span>
                      <span className="text-brown text-sm">Strength, endurance, flexibility</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-cream opacity-80">Health Markers</span>
                      <span className="text-brown text-sm">Blood pressure, sleep quality</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
                  <h3 className="text-xl font-bold text-cream mb-6">Qualitative Measures</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <span className="text-cream opacity-80">Energy Levels</span>
                      <span className="text-brown text-sm">Daily 1-10 scale</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-cream opacity-80">Mood & Confidence</span>
                      <span className="text-brown text-sm">Weekly reflection</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-cream opacity-80">Clothing Fit</span>
                      <span className="text-brown text-sm">Non-scale victory tracking</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-cream opacity-80">Habit Consistency</span>
                      <span className="text-brown text-sm">Daily habit completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goal Setting Workshop */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl p-8 border border-slate-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-cream mb-4">Your Goal Setting Workshop</h2>
                <p className="text-cream opacity-80">Follow this framework to create your personalised weight management goals</p>
              </div>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-cream mb-2">Vision Clarification</h3>
                    <p className="text-cream opacity-70 text-sm">Define your why and long-term vision</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-cream mb-2">SMART Goal Setting</h3>
                    <p className="text-cream opacity-70 text-sm">Create specific, measurable objectives</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brown rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-cream mb-2">System Design</h3>
                    <p className="text-cream opacity-70 text-sm">Build habits and processes to support goals</p>
                  </div>
                </div>

                <div className="text-center">
                  <a 
                    href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-brown hover:bg-brown/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                  >
                    <i className="fas fa-clipboard-list mr-3"></i>
                    Book Appointment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="bg-brown/10 rounded-xl p-8 max-w-4xl mx-auto text-center border border-brown/20">
              <h2 className="text-3xl font-bold text-cream mb-4">
                Ready to Set Sustainable Goals?
              </h2>
              <p className="text-cream opacity-90 text-lg mb-6">
                Get professional guidance on goal setting, habit formation, and long-term maintenance strategies
              </p>
              <a 
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brown hover:bg-brown/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                <i className="fas fa-rocket mr-3"></i>
                Book Appointment
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}