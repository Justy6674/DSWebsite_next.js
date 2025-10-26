'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, TrendingUp, Target, Zap, ArrowRight } from 'lucide-react';

export const BodyMetricsShowcase: React.FC = () => {
  return (
    <section className="relative bg-slate-900 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #b68a71 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #b68a71 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-4">
              Calculate Your Health Metrics
            </h2>
            <p className="text-xl text-cream/80 max-w-3xl mx-auto">
              Get instant AI-powered analysis of your body composition, health goals, and personalised recommendations
            </p>
          </div>

          {/* Interactive Calculator Card */}
          <div className="relative group">
            <Link href="/calculator">
              <div className="metrics-card-showcase relative bg-slate-800 rounded-2xl p-8 border-2 border-brown/40 overflow-hidden cursor-pointer">
                {/* Pulsing Border Animation */}
                <div className="absolute inset-0 rounded-2xl border-2 border-brown/60 pulse-border"></div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content - Single Column Layout */}
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3 mb-8">
                    <Calculator className="h-10 w-10 text-brown" />
                    <h3 className="text-3xl font-bold text-cream">Comprehensive Body Metrics Calculator</h3>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center gap-3 p-6 bg-slate-900 rounded-xl border border-slate-700">
                      <Target className="h-8 w-8 text-brown" />
                      <span className="text-cream font-medium">Complete Body Analysis</span>
                      <span className="text-cream/70 text-sm">Beyond BMI - full composition metrics</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 bg-slate-900 rounded-xl border border-slate-700">
                      <TrendingUp className="h-8 w-8 text-brown" />
                      <span className="text-cream font-medium">Personalised Goals</span>
                      <span className="text-cream/70 text-sm">Custom weight & health targets</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 bg-slate-900 rounded-xl border border-slate-700">
                      <Zap className="h-8 w-8 text-brown" />
                      <span className="text-cream font-medium">AI Health Insights</span>
                      <span className="text-cream/70 text-sm">Professional analysis & recommendations</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 text-brown font-bold text-xl group-hover:gap-5 transition-all duration-300">
                    <span>Start Your Professional Health Assessment</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-brown/20 rounded-full blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-brown/30 rounded-full blur-sm opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-brown mb-2">2,000+</div>
              <div className="text-cream/80">Australians Assessed</div>
            </div>
            <div className="text-center p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-brown mb-2">30 Sec</div>
              <div className="text-cream/80">Average Completion Time</div>
            </div>
            <div className="text-center p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="text-3xl font-bold text-brown mb-2">AI-Powered</div>
              <div className="text-cream/80">Personalised Insights</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-border {
          0%, 100% {
            border-color: rgba(182, 138, 113, 0.4);
            box-shadow: 0 0 0 0 rgba(182, 138, 113, 0.3);
          }
          50% {
            border-color: rgba(182, 138, 113, 0.8);
            box-shadow: 0 0 0 4px rgba(182, 138, 113, 0.1);
          }
        }

        .pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }

        .metrics-card-showcase {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .metrics-card-showcase:hover {
          transform: translateY(-8px);
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(182, 138, 113, 0.5),
            0 0 20px rgba(182, 138, 113, 0.2);
        }

        @media (max-width: 768px) {
          .metrics-card-showcase:hover {
            transform: translateY(-4px);
          }
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .pulse-border {
            animation: none;
            border-color: rgba(182, 138, 113, 0.6);
          }

          .metrics-card-showcase,
          .metrics-card-showcase:hover {
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </section>
  );
};