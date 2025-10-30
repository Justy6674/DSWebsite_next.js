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
import { useDailyTracking } from '@/hooks/useDailyTracking';

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

  const {
    trackingData,
    loading: trackingLoading,
    saveTrackingData,
    getTrackingForDate
  } = useDailyTracking();

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
  const [dailyWeight, setDailyWeight] = useState('');
  const [dailyWaist, setDailyWaist] = useState('');
  const [trackingDate, setTrackingDate] = useState(new Date().toISOString().split('T')[0]);
  const [trackingNotes, setTrackingNotes] = useState('');

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
    if (!currentUser?.id) return;

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

  // Handle daily tracking data save
  const handleSaveTracking = async () => {
    if (!currentUser?.id) return;

    try {
      await saveTrackingData({
        tracking_date: trackingDate,
        weight_kg: dailyWeight ? parseFloat(dailyWeight) : undefined,
        waist_cm: dailyWaist ? parseFloat(dailyWaist) : undefined,
        daily_notes: trackingNotes || undefined
      });

      // Clear form
      setDailyWeight('');
      setDailyWaist('');
      setTrackingNotes('');
      alert('Daily tracking saved successfully!');
    } catch (error) {
      console.error('Error saving tracking data:', error);
      alert('Failed to save tracking data. Please try again.');
    }
  };

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
        <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
          <TabsTrigger value="calculator" className="data-[state=active]:bg-slate-700">
            <Target className="w-4 h-4 mr-2" />
            Body Metrics Calculator
          </TabsTrigger>
          <TabsTrigger value="tracking" className="data-[state=active]:bg-slate-700">
            <CalendarDays className="w-4 h-4 mr-2" />
            Daily Tracking
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
                    <Button onClick={handleSubmitMetrics} className="flex-1 bg-green-600 hover:bg-green-700" disabled={healthLoading}>
                      {healthLoading ? 'Saving…' : 'Save to Profile'}
                    </Button>
                    <Button
                      onClick={async () => {
                        try {
                          const today = new Date().toISOString().split('T')[0];
                          const weight = parseFloat(weightInput);
                          const waist = waistInput ? parseFloat(waistInput) : undefined;
                          if (!Number.isFinite(weight) && !Number.isFinite(waist as any)) {
                            alert('Enter weight and/or waist to save to Daily Tracking.');
                            return;
                          }
                          await saveTrackingData({
                            tracking_date: today,
                            weight_kg: Number.isFinite(weight) ? weight : undefined,
                            waist_cm: Number.isFinite(waist as any) ? (waist as number) : undefined,
                            daily_notes: 'Saved from calculator'
                          });
                          alert('Saved to Daily Tracking');
                        } catch (e) {
                          console.error(e);
                          alert('Failed to save to tracking');
                        }
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      Save to Daily Tracking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Daily Tracking Tab */}
        <TabsContent value="tracking" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                Daily Measurements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="trackingDate" className="text-slate-300">Date</Label>
                  <Input
                    id="trackingDate"
                    type="date"
                    value={trackingDate}
                    onChange={(e) => setTrackingDate(e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="dailyWeight" className="text-slate-300">Weight (kg)</Label>
                  <Input
                    id="dailyWeight"
                    type="number"
                    step="0.1"
                    value={dailyWeight}
                    onChange={(e) => setDailyWeight(e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white"
                    placeholder="Enter today's weight"
                  />
                </div>
                <div>
                  <Label htmlFor="dailyWaist" className="text-slate-300">Waist (cm)</Label>
                  <Input
                    id="dailyWaist"
                    type="number"
                    step="0.1"
                    value={dailyWaist}
                    onChange={(e) => setDailyWaist(e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white"
                    placeholder="Enter waist measurement"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="trackingNotes" className="text-slate-300">Notes (optional)</Label>
                <Input
                  id="trackingNotes"
                  value={trackingNotes}
                  onChange={(e) => setTrackingNotes(e.target.value)}
                  className="bg-slate-900 border-slate-600 text-white"
                  placeholder="Any notes about today's measurements..."
                />
              </div>

              <Button
                onClick={handleSaveTracking}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={trackingLoading || (!dailyWeight && !dailyWaist)}
              >
                {trackingLoading ? 'Saving...' : 'Save Daily Measurement'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Progress History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Progress History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {trackingData && trackingData.length > 0 ? (
                <div className="space-y-4">
                  {trackingData.slice(0, 10).map((entry) => (
                    <div key={entry.id} className="p-4 bg-slate-900 rounded-lg flex justify-between items-center">
                      <div>
                        <div className="text-white font-medium">{entry.tracking_date}</div>
                        <div className="text-slate-400 text-sm">
                          {entry.weight_kg && `Weight: ${entry.weight_kg}kg`}
                          {entry.weight_kg && entry.waist_cm && ' • '}
                          {entry.waist_cm && `Waist: ${entry.waist_cm}cm`}
                        </div>
                        {entry.daily_notes && (
                          <div className="text-slate-500 text-xs mt-1">{entry.daily_notes}</div>
                        )}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {new Date(entry.created_at!).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-slate-400 mb-4">No tracking data available yet</div>
                  <p className="text-slate-500 text-sm">Start tracking your daily measurements to see your progress here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}