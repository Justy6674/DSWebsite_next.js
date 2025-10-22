import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface HealthMetricsInput {
  age: number;
  sex: 'male' | 'female';
  height_cm: number;
  weight_kg: number;
  waist_cm?: number;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  goal: 'lose-safe' | 'lose-preserve' | 'lose-build' | 'build';
}

interface HealthMetricsResult {
  id?: string;
  user_id: string;
  age: number;
  sex: 'male' | 'female';
  height_cm: number;
  weight_kg: number;
  waist_cm?: number;
  activity_level: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  goal: 'lose-safe' | 'lose-preserve' | 'lose-build' | 'build';
  bmr: number;
  tdee: number;
  goal_calories: number;
  bmi: number;
  bmi_category: string;
  waist_risk?: string;
  protein_g: number;
  fat_g: number;
  carbs_g: number;
  created_at: string;
  updated_at: string;
}

export const useHealthMetrics = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<HealthMetricsResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // BMR Calculator (Harris-Benedict Equation)
  const calculateBMR = (weight: number, height: number, age: number, sex: 'male' | 'female') => {
    if (sex === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  // Calculate complete metrics
  const calculateMetrics = (input: HealthMetricsInput): Omit<HealthMetricsResult, 'id' | 'user_id' | 'created_at' | 'updated_at'> => {
    const bmr = calculateBMR(input.weight_kg, input.height_cm, input.age, input.sex);

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9
    };

    const tdee = bmr * activityMultipliers[input.activity_level];

    // Goal adjustments
    const goalAdjustments = {
      'lose-safe': -0.20,
      'lose-preserve': -0.15,
      'lose-build': -0.10,
      'build': 0.15
    };

    const goalCalories = tdee * (1 + goalAdjustments[input.goal]);

    // BMI calculation
    const heightInMeters = input.height_cm / 100;
    const bmi = input.weight_kg / (heightInMeters * heightInMeters);

    // BMI categories
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';

    // Waist risk assessment
    let waistRisk = undefined;
    if (input.waist_cm) {
      if (input.sex === 'male') {
        if (input.waist_cm > 102) waistRisk = 'High Risk';
        else if (input.waist_cm > 94) waistRisk = 'Increased Risk';
        else waistRisk = 'Low Risk';
      } else {
        if (input.waist_cm > 88) waistRisk = 'High Risk';
        else if (input.waist_cm > 80) waistRisk = 'Increased Risk';
        else waistRisk = 'Low Risk';
      }
    }

    // Macro calculations
    const proteinPerKg = input.goal.includes('build') ? 2.2 : 1.6;
    const proteinG = input.weight_kg * proteinPerKg;
    const proteinCalories = proteinG * 4;

    const fatPercentage = 0.25;
    const fatCalories = goalCalories * fatPercentage;
    const fatG = fatCalories / 9;

    const carbCalories = goalCalories - proteinCalories - fatCalories;
    const carbsG = carbCalories / 4;

    return {
      age: input.age,
      sex: input.sex,
      height_cm: input.height_cm,
      weight_kg: input.weight_kg,
      waist_cm: input.waist_cm,
      activity_level: input.activity_level,
      goal: input.goal,
      bmr: Math.round(bmr * 100) / 100,
      tdee: Math.round(tdee * 100) / 100,
      goal_calories: Math.round(goalCalories * 100) / 100,
      bmi: Math.round(bmi * 100) / 100,
      bmi_category: bmiCategory,
      waist_risk: waistRisk,
      protein_g: Math.round(proteinG * 100) / 100,
      fat_g: Math.round(fatG * 100) / 100,
      carbs_g: Math.round(carbsG * 100) / 100
    };
  };

  // Fetch user's health metrics
  const fetchMetrics = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('health_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setMetrics(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  };

  // Save new health metrics
  const saveMetrics = async (input: HealthMetricsInput) => {
    if (!user?.id) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      const calculatedMetrics = calculateMetrics(input);

      const { data, error: saveError } = await supabase
        .from('health_metrics')
        .insert({
          user_id: user.id,
          ...calculatedMetrics
        })
        .select()
        .single();

      if (saveError) throw saveError;

      // Refresh metrics
      await fetchMetrics();

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save metrics');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete health metrics
  const deleteMetrics = async (metricsId: string) => {
    if (!user?.id) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('health_metrics')
        .delete()
        .eq('id', metricsId)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;

      // Refresh metrics
      await fetchMetrics();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete metrics');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load metrics on component mount
  useEffect(() => {
    fetchMetrics();
  }, [user?.id]);

  return {
    metrics,
    loading,
    error,
    saveMetrics,
    deleteMetrics,
    calculateMetrics,
    refreshMetrics: fetchMetrics
  };
};