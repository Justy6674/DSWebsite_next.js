'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Weight,
  Ruler,
  TrendingDown,
  Calendar,
  Pill,
  Edit,
  Save,
  X,
  Plus,
  Calculator
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHealthMetrics } from '@/hooks/useHealthMetrics';
import { useDailyTracking } from '@/hooks/useDailyTracking';

interface HealthMetrics {
  startingWeight: number;
  currentWeight: number;
  startingWaist: number;
  currentWaist: number;
  programStartDate: string;
  height?: number;
  age?: number;
  gender?: 'male' | 'female';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal?: 'weight_loss' | 'maintenance' | 'muscle_gain';
}

interface ClinicalData {
  targetWeight: number;
  targetWaist: number;
  currentMedication: string;
  currentDose: string;
  prescribingPhysician: string;
  lastReview: string;
}

export default function HealthMetricsDashboard() {
  const { user } = useAuth();
  const {
    metrics,
    loading,
    saveMetrics
  } = useHealthMetrics();
  const {
    trackingData,
    loading: trackingLoading,
    saveTrackingData
  } = useDailyTracking();

  const [isEditing, setIsEditing] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    startingWeight: 0,
    currentWeight: 0,
    startingWaist: 0,
    currentWaist: 0,
    programStartDate: '',
    height: undefined,
    age: undefined,
    gender: undefined,
    activityLevel: undefined,
    goal: undefined
  });

  // State for calculation results and preview
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  // Clinical data should come from healthcare provider records
  const [clinicalData, setClinicalData] = useState<ClinicalData>({
    targetWeight: 0,
    targetWaist: 0,
    currentMedication: '',
    currentDose: '',
    prescribingPhysician: '',
    lastReview: ''
  });

  // Check for admin testing session
  const [portalUser, setPortalUser] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('portal_user');
      if (storedUser) {
        setPortalUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const currentUser = user || portalUser;

  // Load data from Supabase hooks
  useEffect(() => {
    if (supabaseHealthMetrics) {
      // Map Supabase health metrics to local state
      setHealthMetrics({
        startingWeight: 0, // Will need to track this separately
        currentWeight: supabaseHealthMetrics.weight || 0,
        startingWaist: 0, // Will need to track this separately
        currentWaist: supabaseHealthMetrics.waist_circumference || 0,
        programStartDate: supabaseHealthMetrics.created_at?.split('T')[0] || '',
        height: supabaseHealthMetrics.height || undefined,
        age: supabaseHealthMetrics.age || undefined,
        gender: supabaseHealthMetrics.sex as 'male' | 'female' || undefined,
        activityLevel: supabaseHealthMetrics.activity_level as any || undefined,
        goal: supabaseHealthMetrics.goal as any || undefined
      });

      // Map clinical targets
      setClinicalData({
        targetWeight: supabaseHealthMetrics.goal_weight || 0,
        targetWaist: supabaseHealthMetrics.sex === 'female' ? 75 : 90,
        currentMedication: '',
        currentDose: '',
        prescribingPhysician: '',
        lastReview: ''
      });
    }
  }, [supabaseHealthMetrics]);

  // BMR Calculator (Mifflin-St Jeor Equation)
  const calculateBMR = (weight: number, height: number, age: number, gender: 'male' | 'female') => {
    if (!weight || !height || !age || !gender) return 0;

    if (gender === 'male') {
      return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else {
      return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    }
  };

  // TDEE Calculator (Total Daily Energy Expenditure)
  const calculateTDEE = (bmr: number, activityLevel: string) => {
    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very_active': 1.9
    };

    return Math.round(bmr * (activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2));
  };

  // Target Weight Calculator
  const calculateTargetWeight = (height: number, age: number, gender: 'male' | 'female', activityLevel: string) => {
    if (!height || !age || !gender) return 0;

    let targetBMI = 22; // Default healthy BMI
    if (age > 65) targetBMI = 24;
    else if (age > 50) targetBMI = 23;

    const activityAdjustments = {
      'sedentary': 0,
      'light': -0.5,
      'moderate': -1,
      'active': -1.5,
      'very_active': -2
    };

    targetBMI += activityAdjustments[activityLevel as keyof typeof activityAdjustments] || 0;

    const heightInMeters = height / 100;
    return Math.round(targetBMI * heightInMeters * heightInMeters);
  };

  // Target Waist Calculator
  const calculateTargetWaist = (gender: 'male' | 'female') => {
    return gender === 'female' ? 75 : 90;
  };

  // Macro Calculator
  const calculateMacros = (calories: number, goal: string) => {
    let proteinRatio = 0.25;
    let fatRatio = 0.25;
    let carbRatio = 0.5;

    if (goal === 'weight_loss') {
      proteinRatio = 0.3;
      fatRatio = 0.25;
      carbRatio = 0.45;
    } else if (goal === 'muscle_gain') {
      proteinRatio = 0.3;
      fatRatio = 0.2;
      carbRatio = 0.5;
    }

    return {
      protein: Math.round((calories * proteinRatio) / 4), // 4 calories per gram
      fat: Math.round((calories * fatRatio) / 9), // 9 calories per gram
      carbs: Math.round((calories * carbRatio) / 4) // 4 calories per gram
    };
  };

  // Goal-based calorie adjustment
  const adjustCaloriesForGoal = (tdee: number, goal: string) => {
    switch (goal) {
      case 'weight_loss':
        return Math.round(tdee * 0.8); // 20% deficit
      case 'muscle_gain':
        return Math.round(tdee * 1.1); // 10% surplus
      default:
        return tdee; // maintenance
    }
  };

  // Auto-calculate targets when patient data changes
  useEffect(() => {
    if (healthMetrics.height && healthMetrics.age && healthMetrics.gender && healthMetrics.activityLevel) {
      const calculatedTargetWeight = calculateTargetWeight(
        healthMetrics.height,
        healthMetrics.age,
        healthMetrics.gender,
        healthMetrics.activityLevel
      );
      const calculatedTargetWaist = calculateTargetWaist(healthMetrics.gender);

      setClinicalData(prev => ({
        ...prev,
        targetWeight: calculatedTargetWeight,
        targetWaist: calculatedTargetWaist
      }));
    }
  }, [healthMetrics.height, healthMetrics.age, healthMetrics.gender, healthMetrics.activityLevel]);

  const saveMetrics = async () => {
    if (!user) return;

    try {
      // Save to Supabase using the hook
      await updateHealthMetrics({
        weight: healthMetrics.currentWeight,
        height: healthMetrics.height,
        age: healthMetrics.age,
        sex: healthMetrics.gender,
        activity_level: healthMetrics.activityLevel,
        goal: healthMetrics.goal,
        waist_circumference: healthMetrics.currentWaist,
        goal_weight: clinicalData.targetWeight
      });

      // Save daily tracking data
      const today = new Date().toISOString().split('T')[0];
      await saveTrackingData({
        tracking_date: today,
        weight_kg: healthMetrics.currentWeight,
        waist_cm: healthMetrics.currentWaist,
        daily_notes: 'Updated via dashboard'
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error saving metrics:', error);
    }
  };

  const calculatePercentageLoss = () => {
    if (healthMetrics.startingWeight && healthMetrics.currentWeight) {
      const loss = ((healthMetrics.startingWeight - healthMetrics.currentWeight) / healthMetrics.startingWeight) * 100;
      return Math.round(loss * 10) / 10;
    }
    return 0;
  };

  const calculateDaysOnProgram = () => {
    if (healthMetrics.programStartDate) {
      const startDate = new Date(healthMetrics.programStartDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-AU');
  };

  const MetricCard = ({
    title,
    value,
    unit,
    icon: Icon,
    trend,
    color = 'text-[#b68a71]'
  }: {
    title: string;
    value: string | number;
    unit?: string;
    icon: any;
    trend?: string;
    color?: string;
  }) => (
    <Card className="bg-slate-800 border-slate-700 hover:border-[#b68a71] transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#fef5e7] mb-1">{title}</p>
            <div className="flex items-baseline space-x-1">
              <span className={`text-2xl font-bold ${color}`}>{value}</span>
              {unit && <span className="text-sm text-[#fef5e7]">{unit}</span>}
            </div>
            {trend && (
              <p className="text-xs text-[#b68a71] mt-1">{trend}</p>
            )}
          </div>
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (!currentUser) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8 text-center">
          <p className="text-[#fef5e7]">Please sign in to view your health metrics dashboard.</p>
        </CardContent>
      </Card>
    );
  }

  if (loadingHealthMetrics || loadingTracking) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8 text-center">
          <p className="text-[#fef5e7]">Loading your health metrics...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Edit Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-2">Health Metrics Dashboard</h1>
          <p className="text-[#fef5e7]">Track your progress and stay motivated on your weight loss journey</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className={isEditing
            ? "border-slate-600 text-[#fef5e7] hover:bg-slate-700"
            : "bg-[#b68a71] hover:bg-[#8B6F47] text-white"
          }
        >
          {isEditing ? (
            <>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Update Metrics
            </>
          )}
        </Button>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Current Weight"
          value={healthMetrics.currentWeight || 'Not set'}
          unit="kg"
          icon={Weight}
          trend={healthMetrics.startingWeight ? `Started at ${healthMetrics.startingWeight}kg` : undefined}
        />

        <MetricCard
          title="Waist Measurement"
          value={healthMetrics.currentWaist || 'Not set'}
          unit="cm"
          icon={Ruler}
          trend={healthMetrics.startingWaist ? `Started at ${healthMetrics.startingWaist}cm` : undefined}
        />

        <MetricCard
          title="Weight Loss %"
          value={calculatePercentageLoss() || 'Not available'}
          unit="%"
          icon={TrendingDown}
          trend={clinicalData.targetWeight ? `Clinical Target: ${clinicalData.targetWeight}kg` : 'Target being calculated'}
          color="text-green-400"
        />

        <MetricCard
          title="Days on Program"
          value={calculateDaysOnProgram() || 'Not set'}
          unit="days"
          icon={Calendar}
          trend={healthMetrics.programStartDate ? `Started ${formatDate(healthMetrics.programStartDate)}` : undefined}
          color="text-blue-400"
        />
      </div>

      {/* Body Metrics Calculator - Using Real Calculator Logic */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-[#f8fafc]">
            <Calculator className="h-5 w-5 mr-2 text-[#b68a71]" />
            Body Metrics Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            // Input Form - Using Real Calculator Inputs
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-[#b68a71] mb-3">Enter Your Details</h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="age-calc" className="text-xs text-[#fef5e7]">Age</Label>
                    <Input
                      id="age-calc"
                      type="number"
                      value={healthMetrics.age || ''}
                      onChange={(e) => setHealthMetrics(prev => ({
                        ...prev,
                        age: parseFloat(e.target.value) || undefined
                      }))}
                      placeholder="35"
                      className="bg-slate-900 border-slate-700 text-[#f8fafc] text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender-calc" className="text-xs text-[#fef5e7]">Biological Sex</Label>
                    <select
                      id="gender-calc"
                      value={healthMetrics.gender || ''}
                      onChange={(e) => setHealthMetrics(prev => ({
                        ...prev,
                        gender: e.target.value as 'male' | 'female' | undefined
                      }))}
                      className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">Select sex</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="current-weight-calc" className="text-xs text-[#fef5e7]">Weight (kg)</Label>
                    <Input
                      id="current-weight-calc"
                      type="number"
                      value={healthMetrics.currentWeight || ''}
                      onChange={(e) => setHealthMetrics(prev => ({
                        ...prev,
                        currentWeight: parseFloat(e.target.value) || 0
                      }))}
                      placeholder="70"
                      className="bg-slate-900 border-slate-700 text-[#f8fafc] text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height-calc" className="text-xs text-[#fef5e7]">Height (cm)</Label>
                    <Input
                      id="height-calc"
                      type="number"
                      value={healthMetrics.height || ''}
                      onChange={(e) => setHealthMetrics(prev => ({
                        ...prev,
                        height: parseFloat(e.target.value) || undefined
                      }))}
                      placeholder="170"
                      className="bg-slate-900 border-slate-700 text-[#f8fafc] text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="waist-calc" className="text-xs text-[#fef5e7]">Waist (cm)</Label>
                    <Input
                      id="waist-calc"
                      type="number"
                      value={healthMetrics.currentWaist || ''}
                      onChange={(e) => setHealthMetrics(prev => ({
                        ...prev,
                        currentWaist: parseFloat(e.target.value) || 0
                      }))}
                      placeholder="80"
                      className="bg-slate-900 border-slate-700 text-[#f8fafc] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="activity-calc" className="text-xs text-[#fef5e7]">Activity Level</Label>
                  <select
                    id="activity-calc"
                    value={healthMetrics.activityLevel || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      activityLevel: e.target.value as any
                    }))}
                    className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select activity level</option>
                    <option value="sedentary">Mostly Sitting - Desk job, watching TV, minimal walking</option>
                    <option value="light">Lightly Active - Some walking, light housework, maybe 1-2 gym sessions per week</option>
                    <option value="moderate">Moderately Active - Regular exercise 3-4x/week, or active job like teaching, retail</option>
                    <option value="very">Very Active - Daily exercise, active job, or sports training most days</option>
                    <option value="extra">Extremely Active - Professional athlete, construction worker + daily training, or similar</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="goal-calc" className="text-xs text-[#fef5e7]">Primary Goal</Label>
                  <select
                    id="goal-calc"
                    value={healthMetrics.goal || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      goal: e.target.value as any
                    }))}
                    className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Select your health goal</option>
                    <option value="maintain">Maintain Current Weight</option>
                    <option value="lose-safe">Lose Weight Safely</option>
                    <option value="lose-preserve">Lose Weight (Preserve Muscle)</option>
                    <option value="lose-build">Lose Fat & Build Muscle</option>
                    <option value="build">Build Muscle</option>
                  </select>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-[#b68a71] mb-3">Calculate Your Analysis</h4>

                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 text-center">
                  <p className="text-sm text-[#fef5e7] mb-4">
                    Get your complete metabolic analysis including BMR, TDEE, BMI, waist analysis, goal weight, and macro recommendations.
                  </p>

                  <Button
                    onClick={async () => {
                      const age = healthMetrics.age;
                      const weight = healthMetrics.currentWeight;
                      const height = healthMetrics.height;
                      const waist = healthMetrics.currentWaist;
                      const sex = healthMetrics.gender;
                      const activityLevel = healthMetrics.activityLevel;
                      const goal = healthMetrics.goal;

                      if (!age || !weight || !height || !sex || !activityLevel || !goal) {
                        return;
                      }

                      try {
                        // Use the Supabase hook to calculate and save
                        const results = await calculateAndSaveMetrics({
                          weight,
                          height,
                          age,
                          sex,
                          activity_level: activityLevel,
                          goal,
                          waist_circumference: waist
                        });

                        if (results) {
                          // Format for display
                          const displayResults = {
                            bmr: results.bmr,
                            tdee: results.tdee,
                            goalCalories: results.goal_calories,
                            bmi: Math.round((weight / ((height / 100) ** 2)) * 10) / 10,
                            goalWeight: results.goal_weight,
                            weightToLose: Math.max(0, weight - results.goal_weight),
                            waistRisk: waist ? (
                              sex === 'female'
                                ? (waist >= 88 ? 'Substantially increased health risk' :
                                   waist >= 80 ? 'Increased health risk' : 'Lower risk')
                                : (waist >= 102 ? 'Substantially increased health risk' :
                                   waist >= 94 ? 'Increased health risk' : 'Lower risk')
                            ) : '',
                            protein: Math.round(weight * 1.6),
                            fat: Math.round((results.goal_calories * 0.3) / 9),
                            carbs: Math.round((results.goal_calories * 0.4) / 4),
                            timestamp: new Date().toLocaleString('en-AU')
                          };

                          setCalculationResults(displayResults);
                          setShowResults(true);

                          // Update clinical data
                          setClinicalData(prev => ({
                            ...prev,
                            targetWeight: results.goal_weight,
                            targetWaist: sex === 'female' ? 75 : 90
                          }));
                        }
                      } catch (error) {
                        console.error('Error calculating metrics:', error);
                      }
                    }}
                    disabled={!healthMetrics.height || !healthMetrics.age || !healthMetrics.gender ||
                             !healthMetrics.activityLevel || !healthMetrics.currentWeight || !healthMetrics.goal}
                    className="w-full bg-[#b68a71] hover:bg-[#8B6F47] text-white text-sm disabled:bg-slate-600"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate My Health Metrics
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Results Preview - Using Real Calculator Results
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-[#f8fafc]">Your Personal Health Assessment</h4>
                <span className="text-xs text-[#b68a71] bg-slate-900 px-2 py-1 rounded border border-slate-700">
                  {calculationResults?.timestamp}
                </span>
              </div>

              {/* BMI Analysis */}
              {calculationResults?.bmi && (
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <h5 className="text-sm font-medium text-[#b68a71] mb-3">Body Mass Index (BMI)</h5>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-[#f8fafc]">BMI: {calculationResults.bmi}</span>
                    <span className={`text-sm font-medium ${
                      calculationResults.bmi < 18.5 ? 'text-blue-400' :
                      calculationResults.bmi < 25 ? 'text-green-400' :
                      calculationResults.bmi < 30 ? 'text-yellow-400' :
                      calculationResults.bmi < 35 ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {calculationResults.bmi < 18.5 ? 'Underweight' :
                       calculationResults.bmi < 25 ? 'Healthy Weight' :
                       calculationResults.bmi < 30 ? 'Above Healthy Weight' :
                       calculationResults.bmi < 35 ? 'Obesity Class I' : 'Obesity Class II'}
                    </span>
                  </div>
                </div>
              )}

              {/* Waist Analysis */}
              {calculationResults?.waistRisk && (
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <h5 className="text-sm font-medium text-[#b68a71] mb-3">Waist Circumference Analysis</h5>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#f8fafc]">{healthMetrics.currentWaist}cm</span>
                    <span className={`text-sm font-medium ${
                      calculationResults.waistRisk === 'Lower risk' ? 'text-green-400' :
                      calculationResults.waistRisk === 'Increased health risk' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {calculationResults.waistRisk}
                    </span>
                  </div>
                </div>
              )}

              {/* Energy Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <h5 className="text-sm font-medium text-[#b68a71] mb-2">Basal Metabolic Rate</h5>
                  <p className="text-2xl font-bold text-[#f8fafc]">{calculationResults?.bmr}</p>
                  <p className="text-xs text-[#fef5e7]">calories/day at rest</p>
                </div>

                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <h5 className="text-sm font-medium text-[#b68a71] mb-2">Total Daily Energy</h5>
                  <p className="text-2xl font-bold text-[#f8fafc]">{calculationResults?.tdee}</p>
                  <p className="text-xs text-[#fef5e7]">calories/day with activity</p>
                </div>

                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <h5 className="text-sm font-medium text-[#b68a71] mb-2">Target Calories</h5>
                  <p className="text-2xl font-bold text-green-400">{calculationResults?.goalCalories}</p>
                  <p className="text-xs text-[#fef5e7]">calories/day for goal</p>
                </div>
              </div>

              {/* Goal Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <h5 className="text-sm font-medium text-[#b68a71] mb-2">Goal Weight</h5>
                  <p className="text-2xl font-bold text-[#f8fafc]">{calculationResults?.goalWeight}kg</p>
                  <p className="text-xs text-[#fef5e7]">
                    {calculationResults?.weightToLose > 0 ? `${calculationResults.weightToLose}kg to lose` : 'At goal weight'}
                  </p>
                </div>

                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <h5 className="text-sm font-medium text-[#b68a71] mb-3">Daily Macro Targets</h5>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <p className="font-bold text-red-400">{calculationResults?.protein}g</p>
                      <p className="text-[#fef5e7]">Protein</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-yellow-400">{calculationResults?.fat}g</p>
                      <p className="text-[#fef5e7]">Fat</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-blue-400">{calculationResults?.carbs}g</p>
                      <p className="text-[#fef5e7]">Carbs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowResults(false)}
                  variant="outline"
                  className="flex-1 border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                >
                  ← Recalculate
                </Button>
                <Button
                  onClick={async () => {
                    await saveMetrics();
                    setShowResults(false);
                  }}
                  className="flex-1 bg-[#b68a71] hover:bg-[#8B6F47] text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Results
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Form Modal - Patient Metrics Only */}
      {isEditing && (
        <Card className="bg-slate-800 border-[#b68a71]">
          <CardHeader>
            <CardTitle className="text-[#f8fafc]">Update Your Health Metrics</CardTitle>
            <p className="text-sm text-[#fef5e7]">
              Update your current measurements. Target weights and medication information are set by your healthcare provider.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Measurements */}
            <div>
              <h3 className="text-lg font-medium text-[#f8fafc] mb-4 pb-2 border-b border-slate-700">
                Current Measurements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startingWeight" className="text-[#fef5e7]">Starting Weight (kg)</Label>
                  <Input
                    id="startingWeight"
                    type="number"
                    value={healthMetrics.startingWeight || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      startingWeight: parseFloat(e.target.value) || 0
                    }))}
                    className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  />
                </div>
                <div>
                  <Label htmlFor="currentWeight" className="text-[#fef5e7]">Current Weight (kg)</Label>
                  <Input
                    id="currentWeight"
                    type="number"
                    value={healthMetrics.currentWeight || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      currentWeight: parseFloat(e.target.value) || 0
                    }))}
                    className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  />
                </div>
                <div>
                  <Label htmlFor="programStartDate" className="text-[#fef5e7]">Program Start Date</Label>
                  <Input
                    id="programStartDate"
                    type="date"
                    value={healthMetrics.programStartDate}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      programStartDate: e.target.value
                    }))}
                    className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  />
                </div>
              </div>
            </div>

            {/* Waist Measurements */}
            <div>
              <h3 className="text-lg font-medium text-[#f8fafc] mb-4 pb-2 border-b border-slate-700">
                Waist Measurements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startingWaist" className="text-[#fef5e7]">Starting Waist (cm)</Label>
                  <Input
                    id="startingWaist"
                    type="number"
                    value={healthMetrics.startingWaist || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      startingWaist: parseFloat(e.target.value) || 0
                    }))}
                    className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  />
                </div>
                <div>
                  <Label htmlFor="currentWaist" className="text-[#fef5e7]">Current Waist (cm)</Label>
                  <Input
                    id="currentWaist"
                    type="number"
                    value={healthMetrics.currentWaist || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      currentWaist: parseFloat(e.target.value) || 0
                    }))}
                    className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  />
                </div>
              </div>
            </div>

            {/* Body Metrics Calculator */}
            <div>
              <h3 className="text-lg font-medium text-[#f8fafc] mb-4 pb-2 border-b border-slate-700">
                Body Metrics Calculator
                <span className="text-sm text-[#b68a71] ml-2">(For automatic target calculation)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height" className="text-[#fef5e7]">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={healthMetrics.height || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      height: parseFloat(e.target.value) || undefined
                    }))}
                    placeholder="e.g., 170"
                    className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-[#fef5e7]">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={healthMetrics.age || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      age: parseFloat(e.target.value) || undefined
                    }))}
                    placeholder="e.g., 35"
                    className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="text-[#fef5e7]">Gender</Label>
                  <select
                    id="gender"
                    value={healthMetrics.gender || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      gender: e.target.value as 'male' | 'female' | undefined
                    }))}
                    className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
                  >
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="activityLevel" className="text-[#fef5e7]">Activity Level</Label>
                  <select
                    id="activityLevel"
                    value={healthMetrics.activityLevel || ''}
                    onChange={(e) => setHealthMetrics(prev => ({
                      ...prev,
                      activityLevel: e.target.value as any
                    }))}
                    className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
                  >
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary (desk job, no exercise)</option>
                    <option value="light">Light (light exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                    <option value="active">Active (hard exercise 6-7 days/week)</option>
                    <option value="very_active">Very Active (physical job + exercise)</option>
                  </select>
                </div>
              </div>

              {/* Calculator Results */}
              {clinicalData.targetWeight > 0 && (
                <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <h4 className="text-sm font-medium text-[#b68a71] mb-2">🧮 Calculated Targets</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[#fef5e7]">Target Weight: </span>
                      <span className="text-[#f8fafc] font-medium">{clinicalData.targetWeight}kg</span>
                    </div>
                    <div>
                      <span className="text-[#fef5e7]">Target Waist: </span>
                      <span className="text-[#f8fafc] font-medium">{clinicalData.targetWaist}cm</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Clinical Data Notice */}
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
              <h4 className="text-sm font-medium text-[#b68a71] mb-2">🔒 Clinical Information</h4>
              <p className="text-xs text-[#fef5e7]">
                Target weights, medication, and dosing information are automatically calculated or set by your healthcare provider.
                These cannot be modified by patients for safety reasons.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setIsEditing(false)}
                variant="outline"
                className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={async () => await saveMetrics()}
                className="bg-[#b68a71] hover:bg-[#8B6F47] text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Metrics
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}