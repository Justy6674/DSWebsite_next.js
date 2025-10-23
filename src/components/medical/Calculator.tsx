'use client';

import Head from "next/head";
import { useState } from 'react';
// Image served from /public/ for instant CDN loading
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { InfoIcon, Brain, Calculator as CalcIcon, Activity, Target, Scale, Heart, Droplets, Clock, TrendingUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CalculatorInputs {
  age: string;
  sex: string;
  weight: string;
  height: string;
  waist: string;
  activityLevel: string;
  goal: string;
  onGlp1: boolean;
  exerciseRegularly: boolean;
  hotClimate: boolean;
  proteinGoal: string;
  recentWeightLoss: boolean;
  showAdvanced: boolean;
}

interface CalculatorResults {
  bmr: number;
  tdee: number;
  goalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  bmi?: number;
  waistToHeightRatio?: number;
  waistRisk?: string;
  waistCircumference?: number;
  leanBodyMass?: number;
  fatMass?: number;
  proteinTarget?: number;
  hydrationNeeds?: number;
  tefCalories?: number;
  isLowCalorie?: boolean;
  goalWeight?: number;
  goalBmr?: number;
  goalTdee?: number;
  goalProtein?: number;
  goalCarbs?: number;
  goalFat?: number;
}

export default function Calculator() {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<CalculatorInputs>({
    age: '',
    sex: '',
    weight: '',
    height: '',
    waist: '',
    activityLevel: '',
    goal: '',
    onGlp1: false,
    exerciseRegularly: false,
    hotClimate: false,
    proteinGoal: 'general',
    recentWeightLoss: false,
    showAdvanced: false
  });
  
  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [aiInterpretation, setAiInterpretation] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const activityMultipliers = {
    sedentary: { 
      value: 1.2, 
      name: "Mostly Sitting",
      description: "Desk job, watching TV, minimal walking. Think: office worker who drives to work." 
    },
    light: { 
      value: 1.375, 
      name: "Lightly Active",
      description: "Some walking, light housework, maybe 1-2 gym sessions per week." 
    },
    moderate: { 
      value: 1.55, 
      name: "Moderately Active",
      description: "Regular exercise 3-4x/week, or active job like teaching, retail." 
    },
    very: { 
      value: 1.725, 
      name: "Very Active",
      description: "Daily exercise, active job, or sports training most days." 
    },
    extra: { 
      value: 1.9, 
      name: "Extremely Active",
      description: "Professional athlete, construction worker + daily training, or similar." 
    }
  };

  const proteinGoals = {
    general: { multiplier: 1.2, label: "🟡 General health", description: "Basic daily protein needs" },
    muscle: { multiplier: 1.6, label: "🔵 Muscle building", description: "Enhanced muscle repair and growth" },
    glp1: { multiplier: 2.0, label: "🔴 GLP-1 supportive", description: "Higher protein to prevent muscle loss" }
  };

  // Helper function to get BMI category with patient-first language
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return {
      category: "Underweight",
      status: "underweight",
      analysis: "Your BMI suggests you may benefit from gaining weight. This is common and manageable with the right approach.",
      color: "text-blue-400"
    };
    if (bmi < 25) return {
      category: "Healthy Weight",
      status: "normal", 
      analysis: "Your BMI falls within a healthy range. This is excellent for your overall health and wellbeing.",
      color: "text-green-400"
    };
    if (bmi < 30) return {
      category: "Above Healthy Weight",
      status: "overweight",
      analysis: "Your BMI suggests weight loss could benefit your health. Many people successfully achieve healthier weights with support.",
      color: "text-yellow-400"
    };
    if (bmi < 35) return {
      category: "Obesity Class I",
      status: "obese",
      analysis: "Your BMI indicates obesity, which can affect health. Professional support can help you achieve meaningful improvements.",
      color: "text-orange-400"
    };
    if (bmi < 40) return {
      category: "Obesity Class II",
      status: "obese",
      analysis: "Your BMI indicates obesity that may significantly impact health. Medical support can provide effective treatment options.",
      color: "text-red-400"
    };
    return {
      category: "Obesity Class III",
      status: "obese",
      analysis: "Your BMI indicates severe obesity. Medical intervention and support can help improve your health and quality of life.",
      color: "text-red-500"
    };
  };

  // Helper function to create BMI visualization
  const BMIVisualization = ({ bmi }: { bmi: number }) => {
    const categories = [
      { range: "< 18.5", label: "Underweight", color: "bg-blue-400", min: 0, max: 18.5 },
      { range: "18.5-24.9", label: "Healthy", color: "bg-green-400", min: 18.5, max: 24.9 },
      { range: "25-29.9", label: "Above Healthy", color: "bg-yellow-400", min: 25, max: 29.9 },
      { range: "30-34.9", label: "Obesity I", color: "bg-orange-400", min: 30, max: 34.9 },
      { range: "35-39.9", label: "Obesity II", color: "bg-red-400", min: 35, max: 39.9 },
      { range: "≥ 40", label: "Obesity III", color: "bg-red-500", min: 40, max: 50 }
    ];

    const getPosition = (bmi: number) => {
      const clampedBMI = Math.min(Math.max(bmi, 15), 45);
      return ((clampedBMI - 15) / 30) * 100;
    };

    return (
      <div className="space-y-4">
        <div className="relative h-8 bg-slate-800 rounded-full overflow-hidden">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`absolute top-0 h-full ${cat.color} opacity-80`}
              style={{
                left: `${((cat.min - 15) / 30) * 100}%`,
                width: `${((cat.max - cat.min) / 30) * 100}%`
              }}
            />
          ))}
          <div
            className="absolute top-0 w-1 h-full bg-white shadow-lg transform -translate-x-0.5"
            style={{ left: `${getPosition(bmi)}%` }}
          />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          {categories.map((cat, index) => (
            <div key={index} className="text-center">
              <div className={`w-4 h-4 ${cat.color} rounded mx-auto mb-1`} />
              <div className="text-slate-300">{cat.range}</div>
              <div className="text-slate-400">{cat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper function to get waist circumference analysis
  const getWaistAnalysis = (waist: number, sex: string) => {
    if (sex === 'female') {
      if (waist < 80) return {
        risk: "Lower Risk",
        analysis: "Your waist circumference is within a healthy range, indicating lower risk for health complications.",
        color: "text-green-400",
        healthy: "For women, a waist circumference under 80cm is considered lower risk."
      };
      if (waist < 88) return {
        risk: "Increased Risk", 
        analysis: "Your waist circumference indicates increased health risk. Reducing waist size can significantly improve your health.",
        color: "text-yellow-400",
        healthy: "For women, aim for a waist circumference under 80cm for optimal health."
      };
      return {
        risk: "Substantially Increased Risk",
        analysis: "Your waist circumference indicates substantially increased health risk. Professional support can help reduce this risk effectively.",
        color: "text-red-400",
        healthy: "For women, reducing waist circumference below 88cm (ideally under 80cm) significantly improves health outcomes."
      };
    } else {
      if (waist < 94) return {
        risk: "Lower Risk",
        analysis: "Your waist circumference is within a healthy range, indicating lower risk for health complications.",
        color: "text-green-400",
        healthy: "For men, a waist circumference under 94cm is considered lower risk."
      };
      if (waist < 102) return {
        risk: "Increased Risk",
        analysis: "Your waist circumference indicates increased health risk. Reducing waist size can significantly improve your health.",
        color: "text-yellow-400", 
        healthy: "For men, aim for a waist circumference under 94cm for optimal health."
      };
      return {
        risk: "Substantially Increased Risk",
        analysis: "Your waist circumference indicates substantially increased health risk. Professional support can help reduce this risk effectively.",
        color: "text-red-400",
        healthy: "For men, reducing waist circumference below 102cm (ideally under 94cm) significantly improves health outcomes."
      };
    }
  };

  const calculateMetrics = () => {
    const age = parseInt(inputs.age);
    const weight = parseFloat(inputs.weight);
    const height = parseFloat(inputs.height);
    const waist = inputs.waist ? parseFloat(inputs.waist) : undefined;

    if (!age || !weight || !height || !inputs.sex || !inputs.activityLevel || !inputs.goal) {
      toast({
        title: "Missing Information",
        description: "We need a few more details to give you helpful insights.",
        variant: "destructive",
      });
      return;
    }

    // Calculate BMR using Harris-Benedict equation
    let bmr: number;
    if (inputs.sex === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    // Calculate TDEE
    const activityMultiplier = activityMultipliers[inputs.activityLevel as keyof typeof activityMultipliers].value;
    const tdee = bmr * activityMultiplier;

    // Calculate goal calories
    let goalCalories: number;
    switch (inputs.goal) {
      case 'maintain':
        goalCalories = tdee;
        break;
      case 'lose-safe':
        goalCalories = tdee * 0.8; // -20%
        break;
      case 'lose-preserve':
        goalCalories = tdee * 0.85; // -15%
        break;
      case 'lose-build':
        goalCalories = tdee * 0.9; // -10%
        break;
      case 'build':
        goalCalories = tdee * 1.15; // +15%
        break;
      default:
        goalCalories = tdee;
    }

    // Check for very low calories
    const isLowCalorie = goalCalories < 1100;

    // Protein calculation
    let proteinMultiplier: number;
    if (inputs.onGlp1 || inputs.recentWeightLoss) {
      proteinMultiplier = 1.8;
    } else {
      proteinMultiplier = proteinGoals[inputs.proteinGoal as keyof typeof proteinGoals]?.multiplier || 1.2;
    }
    const proteinTarget = Math.round(weight * proteinMultiplier);

    // Calculate macros
    const protein = proteinTarget;
    const proteinCalories = protein * 4;
    const remainingCalories = goalCalories - proteinCalories;
    
    let fatPercentage: number;
    if (inputs.goal === 'lose-preserve' || inputs.goal === 'lose-build') {
      fatPercentage = 0.32;
    } else {
      fatPercentage = inputs.onGlp1 ? 0.35 : 0.40;
    }
    
    const fat = Math.round((remainingCalories * fatPercentage) / 9);
    const fatCalories = fat * 9;
    const carbCalories = remainingCalories - fatCalories;
    const carbs = Math.round(carbCalories / 4);

    // Goal weight calculations
    let goalWeight: number = weight;
    if (inputs.goal.includes('lose')) {
      const weeklyDeficit = (tdee - goalCalories) * 7;
      const weeksToGoal = 12;
      const expectedWeightLoss = (weeklyDeficit * weeksToGoal) / 7700;
      goalWeight = Math.max(weight - expectedWeightLoss, weight * 0.85);
    } else if (inputs.goal === 'build') {
      goalWeight = weight + 2;
    }

    // Goal BMR and TDEE
    let goalBmr: number;
    if (inputs.sex === 'male') {
      goalBmr = 88.362 + (13.397 * goalWeight) + (4.799 * height) - (5.677 * age);
    } else {
      goalBmr = 447.593 + (9.247 * goalWeight) + (3.098 * height) - (4.330 * age);
    }
    const goalTdee = goalBmr * activityMultiplier;

    // Goal macros
    const goalProteinTarget = Math.round(goalWeight * proteinMultiplier);
    const goalProtein = goalProteinTarget;
    const goalProteinCalories = goalProtein * 4;
    const goalRemainingCalories = goalCalories - goalProteinCalories;
    const goalFat = Math.round((goalRemainingCalories * fatPercentage) / 9);
    const goalFatCalories = goalFat * 9;
    const goalCarbCalories = goalRemainingCalories - goalFatCalories;
    const goalCarbs = Math.round(goalCarbCalories / 4);

    // Optional calculations
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const waistToHeightRatio = waist ? waist / height : undefined;

    // Waist risk assessment
    let waistRisk = '';
    if (waist) {
      if (inputs.sex === 'female') {
        if (waist >= 88) waistRisk = 'Substantially increased health risk';
        else if (waist >= 80) waistRisk = 'Increased health risk';
        else waistRisk = 'Lower risk';
      } else {
        if (waist >= 102) waistRisk = 'Substantially increased health risk';
        else if (waist >= 94) waistRisk = 'Increased health risk';
        else waistRisk = 'Lower risk';
      }
    }

    const calculatedResults: CalculatorResults = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      bmi: Math.round(bmi * 10) / 10,
      waistToHeightRatio: waistToHeightRatio ? Math.round(waistToHeightRatio * 100) / 100 : undefined,
      waistRisk,
      waistCircumference: waist,
      proteinTarget,
      isLowCalorie,
      goalWeight: Math.round(goalWeight * 10) / 10,
      goalBmr: Math.round(goalBmr),
      goalTdee: Math.round(goalTdee),
      goalProtein: Math.round(goalProtein),
      goalCarbs: Math.round(goalCarbs),
      goalFat: Math.round(goalFat),
    };

    setResults(calculatedResults);
    setAiInterpretation('');
  };

  const getAIInterpretation = async () => {
    if (!results) return;

    setIsLoadingAI(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-interpret-calculator', {
        body: {
          inputs,
          results
        }
      });

      if (error) {
        throw new Error('Failed to get AI interpretation');
      }

      setAiInterpretation(data.interpretation);
    } catch (error) {
      toast({
        title: "AI Interpretation Unavailable",
        description: "We couldn't generate an interpretation right now. Your results are still accurate!",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-900 text-cream">
        <Head>
        <title>Free Weight Loss Calculator | BMI & Health Assessment | Downscale Australia</title>
        <meta name="description" content="Free comprehensive weight loss calculator: BMI, BMR, TDEE, waist-to-height ratio, body composition analysis, protein targets, and personalised insights for Australians. No signup required." />
        </Head>

        <main className="pt-0">
        {/* Hero Section */}
        <div 
          className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "url(/calculator-hero.jpg)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <img 
            src="/calculator-hero.jpg" 
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
                Your Smart Weight & Metabolism Calculator
              </h1>
              <div className="w-20 h-1 bg-cream/80 mx-auto mb-6"></div>
              <p 
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                style={{ color: '#f7f2d3', textShadow: '2px 2px 4px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                Get personalised insights into your body's energy needs, optimal nutrition targets, and health metrics — with patient-first language and evidence-based recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer - After Hero */}
        <section className="py-8 bg-red-900/20 border-b border-red-700/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <InfoIcon className="text-red-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-lg font-semibold text-red-200 mb-2">Medical Disclaimer</h3>
                  <p className="text-red-100 text-sm opacity-90 mb-3">
                    This tool provides general health information only. Individual results may vary significantly based on genetics, hormones, medications, medical history, and other factors. These calculations are estimates only.
                  </p>
                  <p className="text-red-100 text-sm opacity-90">
                    These results are not medical advice, diagnosis, or treatment recommendations. Always consult your healthcare provider before making significant dietary, exercise, or lifestyle changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Form */}
        <section className="py-16 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-cream text-2xl">Let's Get Started</CardTitle>
                  <CardDescription className="text-slate-300">
                    Share some basic information so we can provide accurate, personalised recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-cream">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={inputs.age}
                        onChange={(e) => setInputs({...inputs, age: e.target.value})}
                        className="bg-slate-900 border-slate-600 text-cream"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sex" className="text-cream">Biological Sex</Label>
                      <Select onValueChange={(value) => setInputs({...inputs, sex: value})}>
                        <SelectTrigger className="bg-slate-900 border-slate-600 text-cream">
                          <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-cream">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={inputs.weight}
                        onChange={(e) => setInputs({...inputs, weight: e.target.value})}
                        className="bg-slate-900 border-slate-600 text-cream"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-cream">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="170"
                        value={inputs.height}
                        onChange={(e) => setInputs({...inputs, height: e.target.value})}
                        className="bg-slate-900 border-slate-600 text-cream"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waist" className="text-cream">Waist Circumference (cm)</Label>
                      <Input
                        id="waist"
                        type="number"
                        placeholder="80"
                        value={inputs.waist}
                        onChange={(e) => setInputs({...inputs, waist: e.target.value})}
                        className="bg-slate-900 border-slate-600 text-cream"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-cream">Activity Level</Label>
                    <Select onValueChange={(value) => setInputs({...inputs, activityLevel: value})}>
                      <SelectTrigger className="bg-slate-900 border-slate-600 text-cream min-h-[48px] touch-target">
                        <SelectValue placeholder="Tap to select your activity level" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto">
                        {Object.entries(activityMultipliers).map(([key, activity]) => (
                          <SelectItem key={key} value={key} className="min-h-[48px] cursor-pointer">
                            <div className="text-left py-1">
                              <div className="font-medium">{activity.name}</div>
                              <div className="text-xs text-slate-400 hidden sm:block">{activity.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-cream">Primary Goal</Label>
                    <Select onValueChange={(value) => setInputs({...inputs, goal: value})}>
                      <SelectTrigger className="bg-slate-900 border-slate-600 text-cream min-h-[48px] touch-target">
                        <SelectValue placeholder="Tap to select your health goal" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto">
                        <SelectItem value="maintain" className="min-h-[48px] cursor-pointer">Maintain Current Weight</SelectItem>
                        <SelectItem value="lose-safe" className="min-h-[48px] cursor-pointer">Lose Weight Safely</SelectItem>
                        <SelectItem value="lose-preserve" className="min-h-[48px] cursor-pointer">Lose Weight (Preserve Muscle)</SelectItem>
                        <SelectItem value="lose-build" className="min-h-[48px] cursor-pointer">Lose Fat & Build Muscle</SelectItem>
                        <SelectItem value="build" className="min-h-[48px] cursor-pointer">Build Muscle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Advanced Options */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="showAdvanced" 
                        checked={inputs.showAdvanced}
                        onCheckedChange={(checked) => setInputs({...inputs, showAdvanced: checked as boolean})}
                      />
                      <Label htmlFor="showAdvanced" className="text-cream">Show advanced options</Label>
                    </div>

                    {inputs.showAdvanced && (
                      <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="onGlp1" 
                              checked={inputs.onGlp1}
                              onCheckedChange={(checked) => setInputs({...inputs, onGlp1: checked as boolean})}
                            />
                            <Label htmlFor="onGlp1" className="text-cream">Currently using GLP-1 medication</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="exerciseRegularly" 
                              checked={inputs.exerciseRegularly}
                              onCheckedChange={(checked) => setInputs({...inputs, exerciseRegularly: checked as boolean})}
                            />
                            <Label htmlFor="exerciseRegularly" className="text-cream">Exercise regularly (3+ times/week)</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="recentWeightLoss" 
                              checked={inputs.recentWeightLoss}
                              onCheckedChange={(checked) => setInputs({...inputs, recentWeightLoss: checked as boolean})}
                            />
                            <Label htmlFor="recentWeightLoss" className="text-cream">Recent significant weight loss</Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={calculateMetrics} 
                    className="w-full bg-brown hover:bg-brown/80 active:bg-brown/70 text-cream text-lg py-6 min-h-[48px] touch-target scroll-mt-4"
                    size="lg"
                  >
                    Calculate My Health Metrics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {results && (
          <section className="py-16 bg-slate-800">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                    Your Personal Health Assessment
                  </h2>
                  <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                    Understanding your body's unique needs is the first step toward achieving your health goals.
                  </p>
                </div>

                <div className="grid gap-8">
                  {/* Section 1: Current Body Metrics */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Scale className="text-brown" size={24} />
                        <div>
                          <CardTitle className="text-cream text-2xl">Your Current Body Metrics</CardTitle>
                          <CardDescription className="text-slate-300">
                            Understanding where you are today - your body's current composition and energy needs
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      {/* BMI Section with Visualization */}
                      {results.bmi && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold text-cream flex items-center gap-2">
                            <Scale className="text-brown" size={20} />
                            Body Mass Index (BMI)
                          </h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-300 text-lg">Your BMI</span>
                                <span className={`text-3xl font-bold ${getBMICategory(results.bmi).color}`}>
                                  {results.bmi}
                                </span>
                              </div>
                              <div className={`text-lg font-medium ${getBMICategory(results.bmi).color} mb-3`}>
                                {getBMICategory(results.bmi).category}
                              </div>
                              <p className="text-slate-300 leading-relaxed">
                                {getBMICategory(results.bmi).analysis}
                              </p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-lg font-medium text-slate-300">BMI Scale Visualization</h4>
                              <BMIVisualization bmi={results.bmi} />
                              <p className="text-sm text-slate-400">
                                Your BMI is calculated using your height and weight. While useful as a general guide, 
                                it doesn't account for muscle mass, bone density, or body composition.
                              </p>
                            </div>
                          </div>
                        </div>
                       )}

                      {/* Waist Circumference Analysis */}
                      {results.waistCircumference && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold text-cream flex items-center gap-2">
                            <TrendingUp className="text-brown" size={20} />
                            Waist Circumference Analysis
                          </h3>
                          <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-slate-300 text-lg">Your Waist Measurement</span>
                              <span className="text-3xl font-bold text-cream">
                                {results.waistCircumference}cm
                              </span>
                            </div>
                            <div className="space-y-4">
                              <div className={`text-lg font-medium ${getWaistAnalysis(results.waistCircumference, inputs.sex).color}`}>
                                {getWaistAnalysis(results.waistCircumference, inputs.sex).risk}
                              </div>
                              <p className="text-slate-300 leading-relaxed">
                                {getWaistAnalysis(results.waistCircumference, inputs.sex).analysis}
                              </p>
                              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                                <h4 className="text-sm font-medium text-slate-300 mb-2">Healthy Waist Guidelines:</h4>
                                <div className="text-sm text-slate-400 space-y-1">
                                  <p>• <span className="text-blue-400">Men:</span> Less than 94cm (37 inches) - Low risk</p>
                                  <p>• <span className="text-blue-400">Men:</span> 94-102cm (37-40 inches) - Increased risk</p>
                                  <p>• <span className="text-pink-400">Women:</span> Less than 80cm (31.5 inches) - Low risk</p>
                                  <p>• <span className="text-pink-400">Women:</span> 80-88cm (31.5-34.5 inches) - Increased risk</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <Separator className="bg-slate-600" />

                      {/* Energy Metrics */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-cream flex items-center gap-2">
                          <Activity className="text-brown" size={20} />
                          Your Energy Systems
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-brown/50 transition-colors cursor-help">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Heart className="text-brown" size={24} />
                                    <span className="font-medium text-slate-300">Basal Metabolic Rate</span>
                                  </div>
                                  <div className="text-3xl font-bold text-cream mb-1">{results.bmr}</div>
                                  <div className="text-sm text-slate-400 mb-3">calories/day</div>
                                  <p className="text-xs text-slate-400">
                                    Energy needed for essential functions like breathing and circulation
                                  </p>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-4">
                                <p className="text-sm">
                                  Your BMR represents the minimum energy your body needs to function at rest.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-brown/50 transition-colors cursor-help">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Activity className="text-brown" size={24} />
                                    <span className="font-medium text-slate-300">Total Daily Energy</span>
                                  </div>
                                  <div className="text-3xl font-bold text-cream mb-1">{results.tdee}</div>
                                  <div className="text-sm text-slate-400 mb-3">calories/day</div>
                                  <p className="text-xs text-slate-400">
                                    Your complete daily energy expenditure including activity
                                  </p>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-4">
                                <p className="text-sm">
                                  Your TDEE includes your BMR plus calories burned through activity.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-brown/50 transition-colors cursor-help">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Scale className="text-brown" size={24} />
                                    <span className="font-medium text-slate-300">Maintenance Calories</span>
                                  </div>
                                  <div className="text-3xl font-bold text-cream mb-1">{results.tdee}</div>
                                  <div className="text-sm text-slate-400 mb-3">calories/day</div>
                                  <p className="text-xs text-slate-400">
                                    Calories needed to maintain your current weight
                                  </p>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs p-4">
                                <p className="text-sm">
                                  To maintain your current weight, consume approximately this many calories daily.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                    </CardContent>
                  </Card>

                  {/* Section 2: Your Goals */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Target className="text-brown" size={24} />
                        <div>
                          <CardTitle className="text-cream text-2xl">Your Energy Needs to Achieve your Weight Loss or Body Composition Goals</CardTitle>
                          <CardDescription className="text-slate-300 text-lg">
                            Selected Goal: <span className="font-semibold text-brown">
                              {inputs.goal === 'maintain' ? 'Maintain Current Weight' : 
                              inputs.goal === 'lose-safe' ? 'Lose Weight Safely' :
                              inputs.goal === 'lose-preserve' ? 'Lose Weight (Preserve Muscle)' :
                              inputs.goal === 'lose-build' ? 'Lose Fat & Build Muscle' :
                              inputs.goal === 'build' ? 'Build Muscle' : 'Your Goal'}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                          <div className="flex items-center gap-3 mb-4">
                            <Target className="text-brown" size={24} />
                            <span className="text-lg font-medium text-slate-300">Target Daily Calories</span>
                          </div>
                          <div className="text-4xl font-bold text-cream mb-2">{results.goalCalories}</div>
                          <div className="text-slate-400 mb-4">calories/day</div>
                          <div className="text-sm text-slate-400 p-3 bg-slate-800/50 rounded border border-slate-600">
                            {results.goalCalories < results.tdee ? 
                              `${Math.round(((results.tdee - results.goalCalories) / results.tdee) * 100)}% deficit from your maintenance calories for sustainable weight loss` :
                              results.goalCalories > results.tdee ?
                              `${Math.round(((results.goalCalories - results.tdee) / results.tdee) * 100)}% surplus above maintenance for muscle building` :
                              'Maintenance calories to sustain your current weight and composition'
                            }
                          </div>
                        </div>

                        <div className="p-6 bg-slate-900/50 rounded-lg border border-slate-700">
                          <h4 className="text-lg font-medium text-slate-300 mb-4 flex items-center gap-2">
                            <Droplets className="text-brown" size={20} />
                            Target Macro Breakdown
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                              <span className="text-slate-400">Protein</span>
                              <span className="font-medium text-cream">{results.goalProtein}g</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                              <span className="text-slate-400">Carbohydrates</span>
                              <span className="font-medium text-cream">{results.goalCarbs}g</span>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                              <span className="text-slate-400">Fats</span>
                              <span className="font-medium text-cream">{results.goalFat}g</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Insights Section - Above Goals Block */}
                      <div className="mt-8">
                        <Card className="bg-gradient-to-br from-brown/20 via-brown/10 to-brown/5 border-brown/40 shadow-xl shadow-brown/20">
                          <CardHeader className="pb-4">
                            <div className="flex items-center gap-4">
                              <div className="p-3 bg-brown rounded-full shadow-lg">
                                <Brain className="text-cream" size={28} />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-cream text-2xl font-bold">AI Health Insights & Analysis</CardTitle>
                                <CardDescription className="text-brown text-lg font-medium">
                                  Get personalised recommendations tailored to your unique health profile and goals
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            {!aiInterpretation ? (
                              <div className="text-center py-8">
                                <div className="mb-8">
                                  <div className="relative mx-auto w-24 h-24 mb-6">
                                    <div className="absolute inset-0 bg-brown/20 rounded-full animate-pulse"></div>
                                    <div className="absolute inset-2 bg-brown/30 rounded-full animate-pulse delay-300"></div>
                                    <div className="absolute inset-4 bg-brown rounded-full flex items-center justify-center">
                                      <Brain className="text-cream" size={32} />
                                    </div>
                                  </div>
                                  <h3 className="text-2xl font-bold mb-3 heading-beach">Ready for Your Personal Analysis?</h3>
                                  <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
                                    Our advanced AI will analyse your health metrics, lifestyle factors, and weight goals to provide 
                                    <span className="text-brown font-semibold"> evidence-based recommendations</span> tailored specifically for your journey.
                                  </p>
                                </div>
                                <div className="relative">
                                  <Button 
                                    onClick={getAIInterpretation} 
                                    disabled={isLoadingAI}
                                    className="bg-gradient-to-r from-brown to-brown/80 hover:from-brown/90 hover:to-brown/70 text-cream px-12 py-6 rounded-xl font-bold transition-all duration-300 text-xl shadow-xl shadow-brown/30 hover:shadow-brown/50 md:hover:scale-105 border-2 border-brown/50"
                                  >
                                    {isLoadingAI ? (
                                      <div className="flex items-center gap-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cream"></div>
                                        <span>Analyzing Your Profile...</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-4">
                                        <Brain size={28} />
                                        <span>Get My AI Health Insights</span>
                                      </div>
                                    )}
                                  </Button>
                                  <div className="absolute -inset-4 bg-gradient-to-r from-brown/20 to-transparent rounded-xl blur-xl -z-10"></div>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-6">
                                <div className="p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl border border-brown/30 shadow-inner">
                                  <div className="flex items-start gap-4 mb-6">
                                    <div className="p-2 bg-brown rounded-lg">
                                      <Brain className="text-cream" size={24} />
                                    </div>
                                    <div className="flex-1">
                                      <h3 className="text-xl font-bold text-cream mb-3 flex items-center gap-2">
                                        Your Personalized Health Analysis
                                        <Badge className="bg-brown/20 text-brown border-brown/30">AI-Generated</Badge>
                                      </h3>
                                      <div className="whitespace-pre-wrap text-slate-200 leading-relaxed text-lg">
                                        {aiInterpretation}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex justify-center">
                                  <Button 
                                    onClick={getAIInterpretation} 
                                    disabled={isLoadingAI}
                                    variant="outline"
                                    className="border-2 border-brown text-brown hover:bg-brown hover:text-cream px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 md:hover:scale-105"
                                  >
                                    {isLoadingAI ? (
                                      <div className="flex items-center gap-3">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brown"></div>
                                        <span>Refreshing Analysis...</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-3">
                                        <Brain size={20} />
                                        <span>Get Updated Analysis</span>
                                      </div>
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Goal projections */}
                      {results.goalWeight && Math.abs(results.goalWeight - parseFloat(inputs.weight)) > 0.5 && (
                        <div className="mt-6 p-6 bg-brown/10 border border-brown/30 rounded-lg">
                          <h4 className="text-lg font-medium text-brown mb-4 flex items-center gap-2">
                            <Target className="text-brown" size={20} />
                            Goals of Weight Loss Treatment
                          </h4>
                          <div className="space-y-4 text-slate-300">
                            <p className="leading-relaxed">
                              Here is a professionally written goal projection and treatment rationale for your Downscale patients, referencing current evidence from the SUSTAIN, SURMOUNT, and tirzepatide long-term trials, focused on achieving and sustaining clinically significant weight loss without muscle loss:
                            </p>
                            
                            <div className="border-l-4 border-brown/50 pl-4 bg-slate-900/30 p-4 rounded">
                              <h5 className="font-semibold text-cream mb-2">Goal Projection: Evidence-Based Weight Management at Downscale</h5>
                              <p className="text-sm leading-relaxed">
                                At Downscale, our first evidence-based target is <strong className="text-brown">15% total body weight loss</strong>, aligned with global clinical guidelines and leading trial outcomes. This is the threshold shown to significantly reverse or improve many obesity-related health conditions, including type 2 diabetes, fatty liver disease, sleep apnoea, PCOS, joint disease, and cardiometabolic risk factors.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <h5 className="font-semibold text-cream flex items-center gap-2">
                                📌 Evidence for 15% Target
                              </h5>
                              <ul className="space-y-2 text-sm pl-4">
                                <li>• The American Association of Clinical Endocrinologists (AACE) and international guidelines now recommend 10–15% or more weight loss for meaningful reversal of metabolic and inflammatory risks associated with obesity.</li>
                                <li>• A 2021 review in The Lancet found that a 15% weight loss can reverse early-stage type 2 diabetes, improve hepatic steatosis, and reduce inflammatory markers, blood pressure, insulin resistance, and triglycerides (Rubino et al., Lancet, 2021).</li>
                              </ul>
                            </div>

                            <div className="space-y-3">
                              <h5 className="font-semibold text-cream">How We Get There: GLP-1 & GIP-Based Treatments</h5>
                              <p className="text-sm leading-relaxed">
                                We use safe, modern, stepwise protocols — including GLP-1 receptor agonists (e.g., semaglutide) and dual GIP/GLP-1 agonists (tirzepatide) — alongside dietary tracking, accountability, and optional resistance training to maintain lean muscle mass during weight loss.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <h5 className="font-semibold text-cream flex items-center gap-2">
                                📊 Key Clinical Trial Results:
                              </h5>
                              <div className="grid gap-3">
                                <div className="bg-slate-900/50 p-3 rounded">
                                  <h6 className="text-green-400 font-medium mb-1">✅ SURMOUNT-1 (tirzepatide, non-diabetic participants)</h6>
                                  <p className="text-xs text-slate-400 mb-2">72 weeks, n≈2500</p>
                                  <ul className="text-xs space-y-1">
                                    <li>• Average weight loss: 15.0% with 5mg, 19.5% with 10mg, 20.9% with 15mg</li>
                                    <li>• 91% achieved ≥5% loss; over 50% achieved ≥20% total loss (JAMA, 2022)</li>
                                  </ul>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded">
                                  <h6 className="text-green-400 font-medium mb-1">✅ SURMOUNT-4 (tirzepatide, 36 months)</h6>
                                  <p className="text-xs">Participants who continued tirzepatide lost 24.3% of their body weight over 3 years, with sustained results and no regain (NEJM, 2024)</p>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded">
                                  <h6 className="text-green-400 font-medium mb-1">✅ SUSTAIN-1 to -8 (semaglutide)</h6>
                                  <ul className="text-xs space-y-1">
                                    <li>• At doses of 2.4mg/week, semaglutide achieved average ~14.9% weight loss at 68 weeks</li>
                                    <li>• Improvements were seen in blood sugar, blood pressure, liver enzymes, CRP, and quality of life</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h5 className="font-semibold text-cream">Downscale's Phased Approach</h5>
                              <div className="grid gap-2">
                                <div className="flex gap-3">
                                  <span className="text-brown font-bold">1.</span>
                                  <div>
                                    <span className="font-medium text-cream">Phase 1 – Reset:</span>
                                    <span className="text-sm"> Rapid but safe weight reduction to reach ≥15% body weight loss, guided by medication, structured nutrition, and optional exercise.</span>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <span className="text-brown font-bold">2.</span>
                                  <div>
                                    <span className="font-medium text-cream">Phase 2 – Refine & Strengthen:</span>
                                    <span className="text-sm"> After initial loss, we stabilise and maintain lean mass through protein intake and body metrics tracking.</span>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <span className="text-brown font-bold">3.</span>
                                  <div>
                                    <span className="font-medium text-cream">Phase 3 – Push to Goal (Optional):</span>
                                    <span className="text-sm"> For suitable patients, we support further targeted loss beyond 20% based on metabolic need and personal goals.</span>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <span className="text-brown font-bold">4.</span>
                                  <div>
                                    <span className="font-medium text-cream">Phase 4 – Defend and Sustain:</span>
                                    <span className="text-sm"> The real magic: preventing regain. We use long-term care, psychology-informed prompts, and maintenance therapy.</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-l-4 border-brown/50 pl-4 bg-brown/5 p-4 rounded">
                              <h5 className="font-semibold text-brown mb-2">Why It Matters</h5>
                              <p className="text-sm italic leading-relaxed">
                                "Losing 15–20% of body weight is the new standard for changing lives — not just numbers. And sustaining that loss long-term is what separates a diet from a cure." — Justin Black, Nurse Practitioner & Director, Downscale
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                </div>
              </div>
            </div>
          </section>
        )}
        </main>
      </div>
    </Layout>
  );
}