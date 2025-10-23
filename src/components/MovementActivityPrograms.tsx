import Head from "next/head";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OptimizedBackground } from '@/components/ui/optimized-background';
// Image served from /public/ for instant CDN loading
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function MovementActivityPrograms() {
  const activityPrograms = [
    {
      icon: "💼",
      title: "Office Warrior Strength",
      description: "Desk-based resistance training that builds muscle without leaving your workspace. Because your health can't wait for 'later'.",
      features: ["Resistance bands under desk", "Chair squats between meetings", "Wall push-ups in break rooms", "Calf raises during calls", "Stairwell power climbs"],
      difficulty: "Office ninja level",
      time: "5-15 mins per session",
      science: "Studies show desk workers lose 1% muscle mass annually - fight back with micro-workouts"
    },
    {
      icon: "🏠",
      title: "Home Strength Solutions", 
      description: "Transform your living space into a muscle-building zone. No gym membership required, maximum health benefits included.",
      features: ["Resistance band full-body routines", "Kitchen counter push-ups", "Lounge room strength circuits", "Water bottle weights", "TV time strength training"],
      difficulty: "Family-friendly",
      time: "10-20 mins max",
      science: "Home workouts show 85% adherence vs 65% gym attendance - convenience drives consistency"
    },
    {
      icon: "♿",
      title: "Adaptive Strength Training",
      description: "Strength building for every body. Modify, adapt, and thrive regardless of mobility or chronic conditions.",
      features: ["Chair-based resistance exercises", "Bed-bound strength options", "Chronic pain modifications", "Injury-adapted movements", "Assisted range-of-motion"],
      difficulty: "Adaptive & inclusive",
      time: "As tolerated",
      science: "Even seated strength training improves bone density and reduces sarcopenia by 15-25%"
    },
    {
      icon: "⚡",
      title: "Micro-Workout Magic",
      description: "Strength training in stolen moments. Prove that consistency trumps intensity for long-term muscle health.",
      features: ["2-minute bathroom squats", "Cooking time calf raises", "Morning coffee stretches", "Bedtime resistance bands", "Commercial break circuits"],
      difficulty: "Stealth mode",
      time: "2-10 mins per session",
      science: "Research shows 4x daily 5-minute sessions equal one 20-minute workout for strength gains"
    }
  ];

  const movementPrinciples = [
    {
      title: "Progressive Overload",
      description: "Systematic increases in exercise demands to drive adaptation",
      icon: "📈",
      details: ["Gradual intensity increases", "Volume progression", "Skill development", "Recovery optimisation"]
    },
    {
      title: "Metabolic Focus",
      description: "Exercise selection prioritizing metabolic health and weight management",
      icon: "🔥",
      details: ["Compound movements", "Interval training", "Strength preservation", "Caloric efficiency"]
    },
    {
      title: "Joint-Friendly Approach",
      description: "Movement modifications that respect your body's limitations",
      icon: "🦴",
      details: ["Low-impact alternatives", "Mobility integration", "Injury prevention", "Pain-free movement"]
    },
    {
      title: "Lifestyle Integration",
      description: "Exercise programs that fit seamlessly into your daily routine",
      icon: "⏰",
      details: ["Time-efficient workouts", "Flexible scheduling", "Minimal equipment needs", "Sustainable habits"]
    }
  ];

  const fitnessLevels = [
    {
      level: "Complete Beginner",
      description: "New to exercise or returning after a long break",
      color: "bg-green-600",
      activities: ["Walking programs", "Basic bodyweight movements", "Gentle stretching", "Balance training"],
      goals: ["Build movement confidence", "Establish routine", "Improve basic fitness", "Prevent injury"]
    },
    {
      level: "Active Beginner", 
      description: "Some exercise experience, ready to build consistency",
      color: "bg-blue-600",
      activities: ["Structured walking/jogging", "Resistance band training", "Basic strength exercises", "Flexibility work"],
      goals: ["Increase strength", "Improve endurance", "Build muscle mass", "Enhance mobility"]
    },
    {
      level: "Intermediate",
      description: "Regular exerciser looking to optimise for weight loss",
      color: "bg-purple-600", 
      activities: ["Weight training", "High-intensity intervals", "Complex movements", "Sport activities"],
      goals: ["Maximize fat loss", "Build lean muscle", "Improve performance", "Body composition"]
    },
    {
      level: "Advanced",
      description: "Experienced athlete wanting specialised protocols",
      color: "bg-red-600",
      activities: ["Olympic lifts", "Plyometric training", "Sport-specific drills", "Competition prep"],
      goals: ["Peak performance", "Body recomposition", "Strength gains", "Athletic excellence"]
    }
  ];

  return (
    <>
      <Head>
        <title>Movement & Activity Programs | Exercise for Weight Loss | Downscale Weight Loss Clinic</title>
        <meta name="description" content="Personalised exercise programs for every fitness level. From office worker fitness to athletic performance - movement solutions that support your weight loss goals." />
        <meta name="keywords" content="exercise weight loss Australia, fitness programs telehealth, strength training, office worker fitness, home workouts, metabolic training" />
        <link rel="canonical" href="https://www.downscale.com.au/movement-activity-programs" />
        
        <meta property="og:title" content="Movement & Activity Programs | Exercise for Weight Loss" />
        <meta property="og:description" content="Personalised exercise programs for every fitness level supporting sustainable weight loss." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.com.au/movement-activity-programs" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Movement & Activity Programs",
              "description": "Evidence-based exercise programs designed for weight management and metabolic health",
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
            backgroundImage: "url(/movement-hero.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img 
            src="/movement-hero.jpg" 
            alt="" 
            className="hidden" 
            loading="eager"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}
              >
                Movement & Activity Programs
              </h1>
              <div className="w-20 h-1 bg-cream/80 mx-auto mb-6"></div>
              <p 
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                Exercise programs designed for every fitness level and lifestyle. No bootcamps, no extremes - 
                just sustainable movement that supports your metabolism and mobility.
              </p>
              <a 
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brown hover:bg-brown/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-xl hover-scale animate-fade-in"
              >
                <i className="fas fa-calendar-check mr-3"></i>
                Book Appointment
                <i className="fas fa-arrow-right ml-3"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-2">
          <PageNavigation />
        </div>

        {/* Movement Philosophy */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Our Movement Philosophy
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Movement that matches your life, your joints, and your energy levels - building strength while protecting your body
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {movementPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-xl p-6 hover:bg-slate-750 transition-colours border border-slate-700 text-center"
                >
                  <div className="text-4xl mb-4">{principle.icon}</div>
                  <h3 className="text-xl font-bold text-cream mb-3">{principle.title}</h3>
                  <p className="text-cream opacity-80 text-sm mb-4">{principle.description}</p>
                  <ul className="space-y-2">
                    {principle.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-cream opacity-60 text-xs">
                        <i className="fas fa-check text-brown mr-2"></i>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fitness Level Programs */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Programs for Every Fitness Level
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Whether you're starting from zero or optimising athletic performance, we have evidence-based programs for you
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              {fitnessLevels.map((level, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-xl p-8 hover:bg-slate-750 transition-colours border border-slate-700"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-4 h-4 rounded-full ${level.color} mr-3`}></div>
                    <h3 className="text-2xl font-bold text-cream">{level.level}</h3>
                  </div>
                  <p className="text-cream opacity-80 mb-6">{level.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-cream mb-3">Activities</h4>
                      <ul className="space-y-2">
                        {level.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="text-cream opacity-70 text-sm">
                            <i className="fas fa-play text-brown mr-2"></i>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-cream mb-3">Goals</h4>
                      <ul className="space-y-2">
                        {level.goals.map((goal, goalIndex) => (
                          <li key={goalIndex} className="text-cream opacity-70 text-sm">
                            <i className="fas fa-target text-brown mr-2"></i>
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialised Programs */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Specialised Activity Programs
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {activityPrograms.map((program, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-xl p-8 hover:bg-slate-750 transition-colours border border-slate-700"
                >
                  <div className="flex items-start mb-6">
                    <div className="text-4xl mr-4">{program.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-cream mb-2">{program.title}</h3>
                      <p className="text-cream opacity-80 mb-4">{program.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-brown/20 text-brown text-sm rounded-full">
                          {program.difficulty}
                        </span>
                        <span className="px-3 py-1 bg-blue/20 text-blue text-sm rounded-full">
                          {program.time}
                        </span>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 mb-4">
                        <p className="text-cream opacity-60 text-xs italic">
                          <i className="fas fa-flask text-brown mr-2"></i>
                          {program.science}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {program.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-cream opacity-70"
                      >
                        <i className="fas fa-dumbbell text-brown mr-3 mt-1"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Muscle Building Science */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                  Why Building Muscle is Essential for Health & Fat Loss
                </h2>
                <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
                <p className="text-cream opacity-90 text-lg max-w-4xl mx-auto mb-8">
                  We know not everyone loves the idea of "muscle building" - but hear us out. This isn't about bodybuilding. 
                  This is about your bones, your metabolism, and your long-term health. Even 10 minutes here and there makes a real difference.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700">
                  <i className="fas fa-fire text-brown text-4xl mb-4"></i>
                  <h3 className="text-lg font-bold text-cream mb-3">Higher BMR During Fat Loss</h3>
                  <p className="text-cream opacity-80 text-sm">
                    Muscle burns 3x more calories than fat tissue, even at rest. Preserve muscle = preserve metabolism during weight loss
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700">
                  <i className="fas fa-bone text-brown text-4xl mb-4"></i>
                  <h3 className="text-lg font-bold text-cream mb-3">Bone Density Protection</h3>
                  <p className="text-cream opacity-80 text-sm">
                    Resistance training increases bone mineral density, crucial for preventing osteoporosis - especially important for women
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700">
                  <i className="fas fa-shield-alt text-brown text-4xl mb-4"></i>
                  <h3 className="text-lg font-bold text-cream mb-3">Sarcopenia Prevention</h3>
                  <p className="text-cream opacity-80 text-sm">
                    Fight age-related muscle loss (3-8% per decade after 30). Strength training is the only proven intervention
                  </p>
                </div>

                <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700">
                  <i className="fas fa-clock text-brown text-4xl mb-4"></i>
                  <h3 className="text-lg font-bold text-cream mb-3">Minimal Time Investment</h3>
                  <p className="text-cream opacity-80 text-sm">
                    Studies show significant benefits from just 2x20 minutes per week. Even 10-minute sessions add up
                  </p>
                </div>
              </div>

              {/* Accessible Strength Training Options */}
              <div className="bg-slate-800 rounded-xl p-8 mb-12 border border-slate-700">
                <h3 className="text-2xl font-bold text-cream mb-6 text-center">
                  Accessible Strength Training - For Everyone, Every Age, Every Ability
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Office Workers */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-brown mb-3">
                      <i className="fas fa-briefcase mr-2"></i>Office Workers
                    </h4>
                    <ul className="space-y-2 text-cream opacity-80 text-sm">
                      <li><i className="fas fa-check text-brown mr-2"></i>Desk chair squats (sit to stand)</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Calf raises during calls</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Resistance bands under desk</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Wall push-ups between meetings</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Stairwell power walks</li>
                    </ul>
                  </div>

                  {/* Busy Parents */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-brown mb-3">
                      <i className="fas fa-baby mr-2"></i>Busy Mums & Dads
                    </h4>
                    <ul className="space-y-2 text-cream opacity-80 text-sm">
                      <li><i className="fas fa-check text-brown mr-2"></i>Playground parent workouts</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Living room resistance bands</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Kitchen counter push-ups</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Baby weight squats (safely!)</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>TV commercial workouts</li>
                    </ul>
                  </div>

                  {/* Mobility Challenges */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-brown mb-3">
                      <i className="fas fa-wheelchair mr-2"></i>Chair-Based Options
                    </h4>
                    <ul className="space-y-2 text-cream opacity-80 text-sm">
                      <li><i className="fas fa-check text-brown mr-2"></i>Seated resistance band exercises</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Chair-based arm exercises</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Seated leg lifts & extensions</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Upper body with water bottles</li>
                      <li><i className="fas fa-check text-brown mr-2"></i>Seated core strengthening</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 10-Minute Strength Routines */}
              <div className="bg-gradient-to-r from-brown/20 to-slate-800 rounded-xl p-8 border border-brown/30">
                <h3 className="text-2xl font-bold text-cream mb-6 text-center">
                  🕐 10-Minute Strength Routines That Actually Work
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-brown mb-3">Morning Energy Boost</h4>
                    <ul className="space-y-2 text-cream opacity-80 text-sm">
                      <li>• Bodyweight squats (2 min)</li>
                      <li>• Wall or knee push-ups (2 min)</li>
                      <li>• Standing side leg lifts (2 min)</li>
                      <li>• Calf raises (2 min)</li>
                      <li>• Gentle stretching (2 min)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-brown mb-3">Lunch Break Power</h4>
                    <ul className="space-y-2 text-cream opacity-80 text-sm">
                      <li>• Resistance band pulls (3 min)</li>
                      <li>• Seated leg extensions (2 min)</li>
                      <li>• Arm circles & shoulder rolls (2 min)</li>
                      <li>• Desk push-ups (2 min)</li>
                      <li>• Deep breathing (1 min)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-brown mb-3">Evening Wind-Down</h4>
                    <ul className="space-y-2 text-cream opacity-80 text-sm">
                      <li>• Glute bridges (3 min)</li>
                      <li>• Side-lying leg lifts (2 min)</li>
                      <li>• Seated bicep curls (2 min)</li>
                      <li>• Gentle core work (2 min)</li>
                      <li>• Relaxation stretches (1 min)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activity Benefits */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                  The Science Behind Strength Training for Health
                </h2>
                <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
                <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                  Evidence-based benefits that go far beyond appearance - this is about lifelong health and independence
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
                  <i className="fas fa-chart-line text-brown text-5xl mb-4"></i>
                  <h3 className="text-xl font-bold text-cream mb-3">Metabolic Advantages</h3>
                  <ul className="text-cream opacity-80 text-sm space-y-2">
                    <li>• Muscle tissue burns 6-7 calories/pound/day at rest</li>
                    <li>• Fat tissue burns only 2-3 calories/pound/day</li>
                    <li>• EPOC: Continued calorie burn for 24-48 hours post-workout</li>
                    <li>• Improved insulin sensitivity</li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
                  <i className="fas fa-female text-brown text-5xl mb-4"></i>
                  <h3 className="text-xl font-bold text-cream mb-3">Women's Bone Health</h3>
                  <ul className="text-cream opacity-80 text-sm space-y-2">
                    <li>• Women lose 1-3% bone density annually after menopause</li>
                    <li>• Weight-bearing exercise increases bone formation</li>
                    <li>• Reduces fracture risk by up to 32%</li>
                    <li>• Load-bearing activities stimulate osteoblasts</li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
                  <i className="fas fa-user-clock text-brown text-5xl mb-4"></i>
                  <h3 className="text-xl font-bold text-cream mb-3">Healthy Ageing</h3>
                  <ul className="text-cream opacity-80 text-sm space-y-2">
                    <li>• Muscle loss: 3-8% per decade after age 30</li>
                    <li>• Strength training reverses age-related decline</li>
                    <li>• Improved balance reduces fall risk</li>
                    <li>• Enhanced cognitive function and mood</li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
                  <i className="fas fa-heart text-brown text-5xl mb-4"></i>
                  <h3 className="text-xl font-bold text-cream mb-3">Cardiovascular Benefits</h3>
                  <ul className="text-cream opacity-80 text-sm space-y-2">
                    <li>• Lowers resting blood pressure</li>
                    <li>• Improves cholesterol profile</li>
                    <li>• Reduces cardiovascular disease risk</li>
                    <li>• Enhanced circulation and heart efficiency</li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
                  <i className="fas fa-brain text-brown text-5xl mb-4"></i>
                  <h3 className="text-xl font-bold text-cream mb-3">Mental Health Benefits</h3>
                  <ul className="text-cream opacity-80 text-sm space-y-2">
                    <li>• Reduces symptoms of depression and anxiety</li>
                    <li>• Releases endorphins and growth factors</li>
                    <li>• Improves sleep quality</li>
                    <li>• Builds confidence and self-efficacy</li>
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
                  <i className="fas fa-clock text-brown text-5xl mb-4"></i>
                  <h3 className="text-xl font-bold text-cream mb-3">Time-Efficient Results</h3>
                  <ul className="text-cream opacity-80 text-sm space-y-2">
                    <li>• Minimum effective dose: 2 sessions/week</li>
                    <li>• Sessions can be as short as 15-20 minutes</li>
                    <li>• Compound movements work multiple muscles</li>
                    <li>• Progressive overload drives adaptation</li>
                  </ul>
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
                Ready to Start Moving?
              </h2>
              <p className="text-cream opacity-90 text-lg mb-6">
                Ongoing movement support during regular reviews to build sustainable activity habits
              </p>
              <a 
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brown hover:bg-brown/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                <i className="fas fa-running mr-3"></i>
                Discuss All Pillars - Regular Reviews
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}