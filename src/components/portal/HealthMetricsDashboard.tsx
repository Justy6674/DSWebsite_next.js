'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Target, TrendingUp, Scale, Ruler, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHealthMetrics } from '@/hooks/useHealthMetrics';
// Daily tracking removed per product decision (avoid daily weigh-ins)

// Core interfaces for body metrics calculation
interface BodyMetricsInput {
  age: number;
  sex: 'male' | 'female';
  height_cm: number;
  weight_kg: number;
  waist_cm?: number;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  goal: 'lose-safe' | 'lose-preserve' | 'lose-build' | 'build';
}

interface CalculationResults {
  bmr: number;
  tdee: number;
  goal_calories: number;
  bmi: number;
  bmi_category: string;
  waist_risk?: string;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
}

export default function HealthMetricsDashboard() {
  const { user } = useAuth();

  // Rename saveMetrics to avoid conflict - use 'submitHealthMetrics' instead
  const {
    metrics,
    loading: healthLoading,
    error: healthError,
    saveMetrics: submitHealthMetrics,
    calculateMetrics
  } = useHealthMetrics();

  // Progress History now uses saved metric snapshots (health_metrics)

  // Input state (strings) so fields can be blank until user types
  const [ageInput, setAgeInput] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [heightInput, setHeightInput] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [waistInput, setWaistInput] = useState('');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'very' | 'extra'>('moderate');
  const [goal, setGoal] = useState<'lose-safe' | 'lose-preserve' | 'lose-build' | 'build'>('lose-safe');

  // Calculation results and UI state
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [activeTab, setActiveTab] = useState('calculator');
  // Daily tracking removed

  // Progress charts state
  const [range, setRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  const [selectedMetricsId, setSelectedMetricsId] = useState<string | null>(null);

  // Lightweight SVG sparkline renderer (no external deps)
  const Sparkline = ({ data, width = 180, height = 46, stroke = '#22c55e' }: { data: number[]; width?: number; height?: number; stroke?: string }) => {
    if (!data || data.length === 0) {
      return <svg width={width} height={height} />;
    }
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = Math.max(1e-6, max - min);
    const step = width / Math.max(1, data.length - 1);
    const points = data.map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / span) * (height - 4) - 2; // padding 2px
      return `${x},${y}`;
    });
    const path = `M ${points.join(' L ')}`;
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path d={path} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    );
  };

  const formatDelta = (current: number, prev?: number) => {
    if (prev === undefined) return '—';
    const d = Math.round((current - prev) * 10) / 10;
    if (d === 0) return '0';
    const sign = d > 0 ? '+' : '';
    return `${sign}${d}`;
  };

  // Check for admin testing session
  const [portalUser, setPortalUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('portal_user');
      if (storedUser) {
        setPortalUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const currentUser = user || portalUser;

  // Load latest metrics when component mounts
  useEffect(() => {
    if (metrics && metrics.length > 0) {
      const latest = metrics[0];
      setAgeInput(String(latest.age));
      setSex(latest.sex);
      setHeightInput(String(latest.height_cm));
      setWeightInput(String(latest.weight_kg));
      setWaistInput(latest.waist_cm ? String(latest.waist_cm) : '');
      setActivityLevel(latest.activity_level);
      setGoal(latest.goal);

      // Calculate and display results
      const calculatedResults = calculateMetrics({
        age: latest.age,
        sex: latest.sex,
        height_cm: latest.height_cm,
        weight_kg: latest.weight_kg,
        waist_cm: latest.waist_cm || undefined,
        activity_level: latest.activity_level,
        goal: latest.goal
      });
      setResults(calculatedResults);
    }
  }, [metrics]);

  // Calculate metrics when form changes
  const handleCalculate = () => {
    const age = parseInt(ageInput);
    const height = parseInt(heightInput);
    const weight = parseFloat(weightInput);
    const waist = waistInput ? parseFloat(waistInput) : undefined;

    if (!Number.isFinite(age) || !Number.isFinite(height) || !Number.isFinite(weight)) {
      alert('Please enter age, height and weight to calculate.');
      return;
    }

    const calculatedResults = calculateMetrics({
      age,
      sex,
      height_cm: height,
      weight_kg: weight,
      waist_cm: waist,
      activity_level: activityLevel,
      goal
    });
    setResults(calculatedResults);
  };

  // Save calculated metrics to database - renamed function to avoid conflict
  const handleSubmitMetrics = async () => {
    if (!user?.id) {
      alert('Please sign in to save your metrics.');
      return;
    }
    try {
      const age = parseInt(ageInput);
      const height = parseInt(heightInput);
      const weight = parseFloat(weightInput);
      const waist = waistInput ? parseFloat(waistInput) : undefined;
      if (!Number.isFinite(age) || !Number.isFinite(height) || !Number.isFinite(weight)) {
        alert('Please enter age, height and weight before saving.');
        return;
      }
      await submitHealthMetrics({
        age,
        sex,
        height_cm: height,
        weight_kg: weight,
        waist_cm: waist,
        activity_level: activityLevel,
        goal
      });
      alert('Health metrics saved successfully!');
    } catch (error) {
      console.error('Error saving metrics:', error);
      alert('Failed to save metrics. Please try again.');
    }
  };

  // Daily tracking removed

  // Get BMI category color
  const getBmiColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'text-blue-600';
      case 'Normal': return 'text-green-600';
      case 'Overweight': return 'text-yellow-600';
      case 'Obese': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Get waist risk color
  const getWaistRiskColor = (risk?: string) => {
    switch (risk) {
      case 'Low Risk': return 'text-green-600';
      case 'Increased Risk': return 'text-yellow-600';
      case 'High Risk': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (!currentUser) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <p className="text-center text-slate-400">Please log in to access your health metrics dashboard.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Health Metrics Dashboard</h1>
        <p className="text-slate-400">Track your body composition, calculate your metabolic needs, and monitor progress over time</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-slate-700">
          <TabsTrigger value="calculator" className="data-[state=active]:bg-slate-700">
            <Target className="w-4 h-4 mr-2" />
            Body Metrics Calculator
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">
            <TrendingUp className="w-4 h-4 mr-2" />
            Progress History
          </TabsTrigger>
        </TabsList>

        {/* Body Metrics Calculator Tab */}
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Scale className="w-5 h-5 mr-2" />
                  Body Metrics Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-slate-300">Age</Label>
                    <Input id="age" type="number" inputMode="numeric" placeholder="e.g. 35" value={ageInput}
                      onChange={(e) => setAgeInput(e.target.value)} className="bg-slate-900 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="sex" className="text-slate-300">Sex</Label>
                    <Select value={sex} onValueChange={(value: 'male' | 'female') => setSex(value)}>
                      <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-600">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" className="text-slate-300">Height (cm)</Label>
                    <Input id="height" type="number" inputMode="numeric" placeholder="e.g. 170" value={heightInput}
                      onChange={(e) => setHeightInput(e.target.value)} className="bg-slate-900 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-slate-300">Weight (kg)</Label>
                    <Input id="weight" type="number" inputMode="decimal" step="0.1" placeholder="e.g. 82.5" value={weightInput}
                      onChange={(e) => setWeightInput(e.target.value)} className="bg-slate-900 border-slate-600 text-white" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="waist" className="text-slate-300">Waist Circumference (cm) - Optional</Label>
                  <Input id="waist" type="number" inputMode="numeric" placeholder="e.g. 80" value={waistInput}
                    onChange={(e) => setWaistInput(e.target.value)} className="bg-slate-900 border-slate-600 text-white" />
                </div>

                <div>
                  <Label htmlFor="activity" className="text-slate-300">Activity Level</Label>
                  <Select value={activityLevel} onValueChange={(value: any) => setActivityLevel(value)}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-600">
                      <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                      <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="very">Very Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="extra">Extra Active (very hard exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="goal" className="text-slate-300">Goal</Label>
                  <Select value={goal} onValueChange={(value: any) => setGoal(value)}>
                    <SelectTrigger className="bg-slate-900 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-600">
                      <SelectItem value="lose-safe">Lose Weight (Safe)</SelectItem>
                      <SelectItem value="lose-preserve">Lose Weight (Preserve Muscle)</SelectItem>
                      <SelectItem value="lose-build">Lose Fat (Build Muscle)</SelectItem>
                      <SelectItem value="build">Build Muscle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleCalculate} className="w-full bg-blue-600 hover:bg-blue-700">
                    Calculate Metrics
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Display */}
            {results && (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Calculation Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="text-sm text-slate-400">BMR (Basal Metabolic Rate)</div>
                      <div className="text-lg font-semibold text-white">{results.bmr} cal/day</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="text-sm text-slate-400">TDEE (Total Daily Energy)</div>
                      <div className="text-lg font-semibold text-white">{results.tdee} cal/day</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg">
                    <div className="text-sm text-slate-400">Goal Calories</div>
                    <div className="text-xl font-bold text-green-400">{results.goal_calories} cal/day</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="text-sm text-slate-400">BMI</div>
                      <div className="text-lg font-semibold text-white">{results.bmi}</div>
                      <Badge variant="outline" className={`mt-1 ${getBmiColor(results.bmi_category)}`}>
                        {results.bmi_category}
                      </Badge>
                    </div>
                    {results.waist_risk && (
                      <div className="p-3 bg-slate-900 rounded-lg">
                        <div className="text-sm text-slate-400">Waist Risk</div>
                        <Badge variant="outline" className={`mt-1 ${getWaistRiskColor(results.waist_risk)}`}>
                          {results.waist_risk}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-300">Daily Macro Targets</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-slate-900 rounded text-center">
                        <div className="text-xs text-slate-400">Protein</div>
                        <div className="text-sm font-semibold text-red-400">{results.protein_g}g</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded text-center">
                        <div className="text-xs text-slate-400">Fat</div>
                        <div className="text-sm font-semibold text-yellow-400">{results.fat_g}g</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded text-center">
                        <div className="text-xs text-slate-400">Carbs</div>
                        <div className="text-sm font-semibold text-blue-400">{results.carbs_g}g</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button onClick={handleSubmitMetrics} className="w-full bg-green-600 hover:bg-green-700" disabled={healthLoading}>
                      {healthLoading ? 'Saving…' : 'Save Metrics'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Progress History Tab */}
        <TabsContent value="history" className="space-y-6">
          {/* New compact progress visuals */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>Progress Overview</span>
                <div className="flex items-center gap-2 text-sm">
                  <label className="text-slate-400">Range</label>
                  <select
                    value={range}
                    onChange={(e) => setRange(e.target.value as any)}
                    className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-2 py-1"
                  >
                    <option value="7d">7d</option>
                    <option value="30d">30d</option>
                    <option value="90d">90d</option>
                    <option value="all">All</option>
                  </select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const cutoff = (() => {
                  if (range === 'all') return 0;
                  const now = Date.now();
                  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
                  return now - days * 24 * 60 * 60 * 1000;
                })();
                const timeFiltered = metrics
                  .filter((m) => new Date(m.created_at).getTime() >= cutoff)
                  .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                const w = timeFiltered.map((m) => m.weight_kg);
                const wc = timeFiltered.map((m) => m.waist_cm || 0).filter((n) => n > 0);
                const bmi = timeFiltered.map((m) => m.bmi);
                const last = timeFiltered[timeFiltered.length - 1];
                const prev = timeFiltered[timeFiltered.length - 2];
                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-slate-400 text-sm">Weight (kg)</div>
                        <div className={`text-sm ${last && prev && last.weight_kg - prev.weight_kg <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {last ? formatDelta(last.weight_kg, prev?.weight_kg) : '—'}
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-semibold text-white">{last ? Math.round(last.weight_kg * 10) / 10 : '—'}</div>
                        <Sparkline data={w} stroke="#38bdf8" />
                      </div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-slate-400 text-sm">Waist (cm)</div>
                        <div className={`text-sm ${last && prev && (last.waist_cm||0) - (prev?.waist_cm||0) <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {last ? formatDelta(last.waist_cm || 0, prev?.waist_cm || undefined) : '—'}
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-semibold text-white">{last?.waist_cm ? Math.round((last.waist_cm) * 10) / 10 : '—'}</div>
                        <Sparkline data={wc} stroke="#f59e0b" />
                      </div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-slate-400 text-sm">BMI</div>
                        <div className={`text-sm ${last && prev && last.bmi - prev.bmi <= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {last ? formatDelta(last.bmi, prev?.bmi) : '—'}
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="text-2xl font-semibold text-white">{last ? Math.round(last.bmi * 10) / 10 : '—'}</div>
                        <Sparkline data={bmi} stroke="#a78bfa" />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Progress History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {metrics && metrics.length > 0 ? (
                <div className="space-y-4">
                  {metrics.slice(0, 10).map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMetricsId(m.id!)}
                      className={`text-left p-4 bg-slate-900 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-2 items-center w-full border ${selectedMetricsId === m.id ? 'border-[#b68a71]' : 'border-slate-700'} hover:border-[#b68a71]/60`}
                    >
                      <div className="text-white font-medium">{new Date(m.created_at).toLocaleDateString('en-AU')}</div>
                      <div className="text-slate-400 text-sm">Weight: {m.weight_kg}kg{m.waist_cm ? ` • Waist: ${m.waist_cm}cm` : ''}</div>
                      <div className="text-slate-400 text-sm">TDEE: {m.tdee}</div>
                      <div className="text-slate-400 text-sm">Goal cals: {m.goal_calories}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-slate-400 mb-4">No saved metrics yet</div>
                  <p className="text-slate-500 text-sm">Calculate your metrics and save them to see progress here.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Selected saved analysis */}
          {selectedMetricsId && (() => {
            const s = metrics.find(m => m.id === selectedMetricsId);
            if (!s) return null;
            return (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Saved Analysis — {new Date(s.created_at).toLocaleDateString('en-AU')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-lg">
                      <div className="text-slate-400 text-sm">BMR (Basal Metabolic Rate)</div>
                      <div className="text-2xl font-bold text-white">{s.bmr} cal/day</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-lg">
                      <div className="text-slate-400 text-sm">TDEE (Total Daily Energy)</div>
                      <div className="text-2xl font-bold text-white">{s.tdee} cal/day</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-lg md:col-span-2">
                      <div className="text-slate-400 text-sm">Goal Calories</div>
                      <div className="text-2xl font-bold text-emerald-400">{s.goal_calories} cal/day</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-lg">
                      <div className="text-slate-400 text-sm">BMI</div>
                      <div className="text-xl font-semibold text-white">{s.bmi}</div>
                      <div className="mt-1 inline-flex px-2 py-1 rounded text-xs border border-slate-700 text-slate-300">{s.bmi_category}</div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-lg">
                      <div className="text-slate-400 text-sm">Waist Risk</div>
                      <div className="mt-1 inline-flex px-2 py-1 rounded text-xs border border-slate-700 text-slate-300">{s.waist_risk || '—'}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm mb-2">Daily Macro Targets</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 bg-slate-900 rounded-lg text-center">
                        <div className="text-xs text-slate-400">Protein</div>
                        <div className="text-lg font-semibold text-red-400">{s.protein_g}g</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg text-center">
                        <div className="text-xs text-slate-400">Fat</div>
                        <div className="text-lg font-semibold text-yellow-400">{s.fat_g}g</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg text-center">
                        <div className="text-xs text-slate-400">Carbs</div>
                        <div className="text-lg font-semibold text-blue-400">{s.carbs_g}g</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}

          {/* Patient-first guidance */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Downscale Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-slate-300 text-sm">
              <p>
                Your numbers are tools, not labels. BMI and waist circumference help us estimate health risk, but they don’t capture muscle, fluid shifts, or your lived experience. We focus on trends over time and how you feel.
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li><span className="text-slate-400">Weight & waist</span>: small, steady changes (even 0.2–0.5 kg/week or 1–2 cm/month) are meaningful.</li>
                <li><span className="text-slate-400">BMI</span>: a screening tool only; we pair it with waist and clinical context.</li>
                <li><span className="text-slate-400">Goals</span>: energy targets and macros are personalised to preserve muscle and support daily life.</li>
              </ul>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <div className="font-semibold text-slate-200 mb-2">BMI guide (adults)</div>
                  <ul className="list-disc ml-5 space-y-1 text-slate-300">
                    <li>Underweight: <span className="text-slate-200">&lt; 18.5</span></li>
                    <li>Healthy range: <span className="text-slate-200">18.5–24.9</span></li>
                    <li>Overweight: <span className="text-slate-200">25.0–29.9</span></li>
                    <li>Obesity: <span className="text-slate-200">≥ 30.0</span> (classes used for clinical planning)</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-2">BMI is a population tool; individual assessment considers age, ethnicity, muscle mass and health conditions.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <div className="font-semibold text-slate-2 00 mb-2">Waist guide (health risk)</div>
                  <ul className="list-disc ml-5 space-y-1 text-slate-300">
                    <li>Women: increased risk <span className="text-slate-200">&gt; 80 cm</span>; high risk <span className="text-slate-200">&gt; 88 cm</span></li>
                    <li>Men: increased risk <span className="text-slate-200">&gt; 94 cm</span>; high risk <span className="text-slate-200">&gt; 102 cm</span></li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-2">Measure midway between the lowest rib and the top of the hip bone, after a normal breath out.</p>
                </div>
              </div>
              <p className="text-slate-400 mt-2">Language aligns with patient‑first guidance from recognised obesity organisations and Australian clinical practice.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}