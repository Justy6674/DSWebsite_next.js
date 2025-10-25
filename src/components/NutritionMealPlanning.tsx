import Head from "next/head";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { OptimizedBackground } from '@/components/ui/optimized-background';
// Image served from /public/ for instant CDN loading
import { PageNavigation } from '@/components/navigation/PageNavigation';

export default function NutritionMealPlanning() {
  const nutritionPillars = [
    {
      icon: "🧬",
      title: "Metabolic Nutrition",
      description: "Evidence-based macronutrient optimisation for improved metabolic health",
      features: ["Protein requirements for muscle preservation", "Carbohydrate timing for energy balance", "Healthy fat integration", "Metabolic flexibility training"]
    },
    {
      icon: "🌿",
      title: "Anti-Inflammatory Protocols",
      description: "Nutrition strategies to reduce inflammation and support weight management",
      features: ["Omega-3 optimisation", "Antioxidant-rich food selection", "Gut health support", "Inflammatory food identification"]
    },
    {
      icon: "💊",
      title: "Supplement Protocols",
      description: "Evidence-based supplementation to support your weight loss journey",
      features: ["Nutritional deficiency assessment", "Metabolic support supplements", "Vitamin D optimisation", "Personalised supplement plans"]
    },
    {
      icon: "🍽️", 
      title: "Real-World Meal Solutions",
      description: "No calorie counting. Tailored to YOUR lifestyle. Ready-made options for busy parents",
      features: ["5-kids-household tested meals", "Great breakfast solutions", "Ready-made better options", "Set up as a way of living"]
    }
  ];

  const mealPrepStrategies = [
    {
      title: "Office Worker Solutions",
      description: "Nutrition strategies for busy professionals",
      icon: "💼",
      tips: ["Desk-friendly meal prep containers", "Quick breakfast protocols", "Healthy snack planning", "Meeting-day nutrition"]
    },
    {
      title: "Busy Parent Solutions", 
      description: "Realistic nutrition for families with 5 kids and no time",
      icon: "👨‍👩‍👧‍👦",
      tips: ["Ready-made better options", "10-minute breakfast wins", "One-pot family meals", "No guilt, just progress"]
    },
    {
      title: "Budget-Conscious Nutrition",
      description: "Healthy eating without breaking the bank",
      icon: "💰",
      tips: ["Affordable protein sources", "Seasonal produce planning", "Bulk buying strategies", "Minimal waste meal prep"]
    },
    {
      title: "Cultural Integration",
      description: "Honoring your cultural food preferences",
      icon: "🌏",
      tips: ["Traditional recipe modifications", "Cultural spice benefits", "Festival food planning", "Heritage diet optimisation"]
    }
  ];

  return (
    <>
      <Head>
        <title>Nutrition & Meal Planning | Evidence-Based Weight Loss Nutrition | Downscale Weight Loss Clinic</title>
        <meta name="description" content="Professional nutrition guidance and meal planning for sustainable weight loss. Evidence-based protocols, supplement advice, and practical meal prep strategies that fit your lifestyle." />
        <meta name="keywords" content="nutrition weight loss Australia, meal planning telehealth, evidence-based nutrition, supplement protocols, metabolic nutrition, anti-inflammatory diet" />
        <link rel="canonical" href="https://www.downscale.health/nutrition-meal-planning" />
        
        <meta property="og:title" content="Nutrition & Meal Planning | Evidence-Based Weight Loss Nutrition" />
        <meta property="og:description" content="Professional nutrition guidance with practical meal planning strategies for sustainable weight loss success." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.downscale.health/nutrition-meal-planning" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              "name": "Nutrition & Meal Planning",
              "description": "Evidence-based nutrition guidance and meal planning for weight management",
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
            backgroundImage: "url(/food-hero.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img 
            src="/food-hero.jpg" 
            alt="Evidence-based nutrition and meal planning for sustainable weight management" 
            className="hidden" 
            loading="eager"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{ color: '#f7f2d3', textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 3px rgba(0,0,0,0.8)' }}
              >
                Nutrition & Meal Planning
              </h1>
              <div className="w-20 h-1 bg-cream/80 mx-auto mb-6"></div>
              <p 
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                Evidence-based nutrition guidance that works in the real world. No food shaming, no banned foods - 
                just practical, sustainable nutrition strategies that fit your life.
              </p>
              <a 
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brown hover:bg-brown/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-xl hover-scale animate-fade-in"
              >
                <i className="fas fa-utensils mr-3"></i>
                Discuss All Pillars - Regular Reviews
                <i className="fas fa-arrow-right ml-3"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-2">
          <PageNavigation />
        </div>

        {/* Core Nutrition Principles */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Our Nutrition Philosophy
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                We believe in flexible, evidence-based nutrition that respects your culture, budget, and lifestyle
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-slate-900 rounded-xl p-8 border border-slate-700">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <i className="fas fa-heart text-brown text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold text-cream mb-3">No Food Shaming</h3>
                  <p className="text-cream opacity-80 text-sm">We work with your food preferences, not against them</p>
                </div>
                <div>
                  <i className="fas fa-chart-line text-brown text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold text-cream mb-3">Evidence-Based</h3>
                  <p className="text-cream opacity-80 text-sm">Every recommendation backed by current nutrition science</p>
                </div>
                <div>
                  <i className="fas fa-home text-brown text-4xl mb-4"></i>
                  <h3 className="text-xl font-bold text-cream mb-3">Real-World Practical</h3>
                  <p className="text-cream opacity-80 text-sm">Strategies that work with your actual life, not perfect conditions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nutrition Pillars */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Comprehensive Nutrition Support
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {nutritionPillars.map((pillar, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-xl p-8 hover:bg-slate-750 transition-colors border border-slate-700"
                >
                  <div className="flex items-start mb-6">
                    <div className="text-4xl mr-4">{pillar.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-cream mb-2">{pillar.title}</h3>
                      <p className="text-cream opacity-80 mb-4">{pillar.description}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {pillar.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start text-cream opacity-70"
                      >
                        <i className="fas fa-check text-brown mr-3 mt-1"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Meal Strategies */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                Real-World Meal Planning
              </h2>
              <div className="w-16 h-1 bg-brown mx-auto mb-6"></div>
              <p className="text-cream opacity-90 text-lg max-w-3xl mx-auto">
                Practical meal planning strategies that work with your lifestyle, not against it
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {mealPrepStrategies.map((strategy, index) => (
                <div
                  key={index}
                  className="bg-slate-900 rounded-xl p-6 hover:bg-slate-750 transition-colors border border-slate-700"
                >
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{strategy.icon}</div>
                    <h3 className="text-xl font-bold text-cream mb-2">{strategy.title}</h3>
                    <p className="text-cream opacity-80 text-sm">{strategy.description}</p>
                  </div>
                  
                  <ul className="space-y-2">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li
                        key={tipIndex}
                        className="flex items-start text-sm text-cream opacity-70"
                      >
                        <i className="fas fa-circle text-brown mr-2 mt-2 text-xs"></i>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hydration & Supplements */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Hydration */}
                <div className="bg-blue/10 rounded-xl p-8 border border-blue/20">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">💧</div>
                    <h3 className="text-2xl font-bold text-cream mb-3">Hydration Optimisation</h3>
                    <p className="text-cream opacity-80">Strategic hydration for metabolic support</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start text-cream opacity-80">
                      <i className="fas fa-tint text-blue mr-3 mt-1"></i>
                      Personalised daily water targets
                    </li>
                    <li className="flex items-start text-cream opacity-80">
                      <i className="fas fa-tint text-blue mr-3 mt-1"></i>
                      Electrolyte balance protocols
                    </li>
                    <li className="flex items-start text-cream opacity-80">
                      <i className="fas fa-tint text-blue mr-3 mt-1"></i>
                      Timing strategies for appetite control
                    </li>
                    <li className="flex items-start text-cream opacity-80">
                      <i className="fas fa-tint text-blue mr-3 mt-1"></i>
                      Quality water source guidance
                    </li>
                  </ul>
                </div>

                {/* Supplements */}
                <div className="bg-brown/10 rounded-xl p-8 border border-brown/20">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">💊</div>
                    <h3 className="text-2xl font-bold text-cream mb-3">Supplement Protocols</h3>
                    <p className="text-cream opacity-80">Evidence-based supplementation support</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start text-cream opacity-80">
                      <i className="fas fa-capsules text-brown mr-3 mt-1"></i>
                      Nutritional deficiency assessment
                    </li>
                    <li className="flex items-start text-cream opacity-80">
                      <i className="fas fa-capsules text-brown mr-3 mt-1"></i>
                      Metabolic support supplements
                    </li>
                    <li className="flex items-start text-cream opacity-80">
                      <i className="fas fa-capsules text-brown mr-3 mt-1"></i>
                      Quality brand recommendations
                    </li>
                    <li className="flex items-start text-cream opacity-80">
                      <i className="fas fa-capsules text-brown mr-3 mt-1"></i>
                      Timing and dosage optimisation
                    </li>
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
                Ready for Ongoing Nutrition Support?
              </h2>
              <p className="text-cream opacity-90 text-lg mb-6">
                Get evidence-based nutrition strategies tailored to your lifestyle, preferences, and weight loss goals
              </p>
              <a 
                href="https://www.halaxy.com/book/nurse-practitioner/mr-justin-black/1488401/1198131" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brown hover:bg-brown/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                <i className="fas fa-apple-alt mr-3"></i>
                Start Your Nutrition Journey
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}