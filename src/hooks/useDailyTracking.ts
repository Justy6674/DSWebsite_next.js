import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface DailyTrackingData {
  id?: string;
  user_id: string;
  tracking_date: string; // YYYY-MM-DD format

  // Physical metrics
  weight_kg?: number;
  waist_cm?: number;
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  heart_rate?: number;

  // Lifestyle tracking
  sleep_hours?: number;
  sleep_quality?: number; // 1-10
  energy_level?: number; // 1-10
  mood?: number; // 1-10
  stress_level?: number; // 1-10

  // Nutrition tracking
  calories_consumed?: number;
  protein_g?: number;
  carbs_g?: number;
  fat_g?: number;
  water_ml?: number;

  // Activity tracking
  steps?: number;
  exercise_minutes?: number;
  activity_type?: string;

  // Medication tracking
  medication_taken?: boolean;
  medication_time?: string; // HH:MM format
  side_effects?: string;

  // Notes
  daily_notes?: string;

  created_at?: string;
  updated_at?: string;
}

export const useDailyTracking = () => {
  const { user } = useAuth();
  const [trackingData, setTrackingData] = useState<DailyTrackingData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tracking data for a date range
  const fetchTrackingData = async (startDate?: string, endDate?: string) => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('daily_tracking_extended')
        .select('*')
        .eq('user_id', user.id)
        .order('tracking_date', { ascending: false });

      if (startDate) {
        query = query.gte('tracking_date', startDate);
      }
      if (endDate) {
        query = query.lte('tracking_date', endDate);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setTrackingData(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tracking data');
    } finally {
      setLoading(false);
    }
  };

  // Get tracking data for a specific date
  const getTrackingForDate = (date: string): DailyTrackingData | undefined => {
    return trackingData.find(entry => entry.tracking_date === date);
  };

  // Save or update tracking data for a specific date
  const saveTrackingData = async (data: Omit<DailyTrackingData, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user?.id) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      // Check if entry already exists for this date
      const existingEntry = trackingData.find(entry => entry.tracking_date === data.tracking_date);

      if (existingEntry) {
        // Update existing entry
        const { error: updateError } = await supabase
          .from('daily_tracking_extended')
          .update(data)
          .eq('id', existingEntry.id)
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        // Insert new entry
        const { error: insertError } = await supabase
          .from('daily_tracking_extended')
          .insert({
            user_id: user.id,
            ...data
          });

        if (insertError) throw insertError;
      }

      // Refresh data
      await fetchTrackingData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save tracking data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update specific fields for a date
  const updateTrackingFields = async (date: string, fields: Partial<DailyTrackingData>) => {
    if (!user?.id) throw new Error('User not authenticated');

    const existingEntry = trackingData.find(entry => entry.tracking_date === date);

    if (existingEntry) {
      // Update existing entry with new fields
      const updatedData = { ...existingEntry, ...fields };
      delete updatedData.id;
      delete updatedData.user_id;
      delete updatedData.created_at;
      delete updatedData.updated_at;

      await saveTrackingData(updatedData);
    } else {
      // Create new entry with just the specified fields
      await saveTrackingData({
        tracking_date: date,
        ...fields
      });
    }
  };

  // Delete tracking data for a specific date
  const deleteTrackingData = async (date: string) => {
    if (!user?.id) throw new Error('User not authenticated');

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('daily_tracking_extended')
        .delete()
        .eq('user_id', user.id)
        .eq('tracking_date', date);

      if (deleteError) throw deleteError;

      // Refresh data
      await fetchTrackingData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tracking data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get tracking statistics for a date range
  const getTrackingStats = (startDate: string, endDate: string) => {
    const filteredData = trackingData.filter(
      entry => entry.tracking_date >= startDate && entry.tracking_date <= endDate
    );

    if (filteredData.length === 0) return null;

    const stats = {
      totalEntries: filteredData.length,
      averageWeight: 0,
      averageWaist: 0,
      averageSleep: 0,
      averageSteps: 0,
      averageCalories: 0,
      medicationCompliance: 0,
      weightTrend: 'stable' as 'increasing' | 'decreasing' | 'stable'
    };

    // Calculate averages
    let weightSum = 0, weightCount = 0;
    let waistSum = 0, waistCount = 0;
    let sleepSum = 0, sleepCount = 0;
    let stepsSum = 0, stepsCount = 0;
    let caloriesSum = 0, caloriesCount = 0;
    let medicationTaken = 0;

    filteredData.forEach(entry => {
      if (entry.weight_kg) { weightSum += entry.weight_kg; weightCount++; }
      if (entry.waist_cm) { waistSum += entry.waist_cm; waistCount++; }
      if (entry.sleep_hours) { sleepSum += entry.sleep_hours; sleepCount++; }
      if (entry.steps) { stepsSum += entry.steps; stepsCount++; }
      if (entry.calories_consumed) { caloriesSum += entry.calories_consumed; caloriesCount++; }
      if (entry.medication_taken) medicationTaken++;
    });

    stats.averageWeight = weightCount > 0 ? Math.round((weightSum / weightCount) * 100) / 100 : 0;
    stats.averageWaist = waistCount > 0 ? Math.round((waistSum / waistCount) * 100) / 100 : 0;
    stats.averageSleep = sleepCount > 0 ? Math.round((sleepSum / sleepCount) * 100) / 100 : 0;
    stats.averageSteps = stepsCount > 0 ? Math.round(stepsSum / stepsCount) : 0;
    stats.averageCalories = caloriesCount > 0 ? Math.round(caloriesSum / caloriesCount) : 0;
    stats.medicationCompliance = Math.round((medicationTaken / filteredData.length) * 100);

    // Calculate weight trend
    if (weightCount >= 2) {
      const sortedWeights = filteredData
        .filter(entry => entry.weight_kg)
        .sort((a, b) => a.tracking_date.localeCompare(b.tracking_date))
        .map(entry => entry.weight_kg!);

      const firstWeight = sortedWeights[0];
      const lastWeight = sortedWeights[sortedWeights.length - 1];
      const difference = lastWeight - firstWeight;

      if (Math.abs(difference) < 0.5) {
        stats.weightTrend = 'stable';
      } else if (difference > 0) {
        stats.weightTrend = 'increasing';
      } else {
        stats.weightTrend = 'decreasing';
      }
    }

    return stats;
  };

  // Load initial data
  useEffect(() => {
    if (user?.id) {
      // Load last 30 days by default
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      fetchTrackingData(startDate, endDate);
    }
  }, [user?.id]);

  return {
    trackingData,
    loading,
    error,
    fetchTrackingData,
    getTrackingForDate,
    saveTrackingData,
    updateTrackingFields,
    deleteTrackingData,
    getTrackingStats,
    refreshData: () => fetchTrackingData()
  };
};