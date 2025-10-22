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
  Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HealthMetrics {
  startingWeight: number;
  currentWeight: number;
  targetWeight: number;
  startingWaist: number;
  currentWaist: number;
  targetWaist: number;
  programStartDate: string;
  currentMedication: string;
  currentDose: string;
}

export default function HealthMetricsDashboard() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>({
    startingWeight: 0,
    currentWeight: 0,
    targetWeight: 0,
    startingWaist: 0,
    currentWaist: 0,
    targetWaist: 0,
    programStartDate: '',
    currentMedication: '',
    currentDose: ''
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

  // Load saved metrics from localStorage for demo
  useEffect(() => {
    if (currentUser?.email) {
      const savedMetrics = localStorage.getItem(`health_metrics_${currentUser.email}`);
      if (savedMetrics) {
        setHealthMetrics(JSON.parse(savedMetrics));
      }
    }
  }, [currentUser]);

  const saveMetrics = () => {
    if (currentUser?.email) {
      localStorage.setItem(`health_metrics_${currentUser.email}`, JSON.stringify(healthMetrics));
      setIsEditing(false);
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
          trend={healthMetrics.targetWeight ? `Target: ${healthMetrics.targetWeight}kg` : undefined}
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

      {/* Current Medication Card */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-[#f8fafc]">
            <Pill className="h-5 w-5 mr-2 text-[#b68a71]" />
            Current Medication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-[#fef5e7] mb-1">Medication</p>
              <p className="text-lg font-medium text-[#f8fafc]">
                {healthMetrics.currentMedication || 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#fef5e7] mb-1">Current Dose</p>
              <p className="text-lg font-medium text-[#f8fafc]">
                {healthMetrics.currentDose || 'Not specified'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form Modal */}
      {isEditing && (
        <Card className="bg-slate-800 border-[#b68a71]">
          <CardHeader>
            <CardTitle className="text-[#f8fafc]">Update Your Health Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
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
                <Label htmlFor="targetWeight" className="text-[#fef5e7]">Target Weight (kg)</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  value={healthMetrics.targetWeight || ''}
                  onChange={(e) => setHealthMetrics(prev => ({
                    ...prev,
                    targetWeight: parseFloat(e.target.value) || 0
                  }))}
                  className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>
                <Label htmlFor="targetWaist" className="text-[#fef5e7]">Target Waist (cm)</Label>
                <Input
                  id="targetWaist"
                  type="number"
                  value={healthMetrics.targetWaist || ''}
                  onChange={(e) => setHealthMetrics(prev => ({
                    ...prev,
                    targetWaist: parseFloat(e.target.value) || 0
                  }))}
                  className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <div>
                <Label htmlFor="currentMedication" className="text-[#fef5e7]">Current Medication</Label>
                <Input
                  id="currentMedication"
                  type="text"
                  value={healthMetrics.currentMedication}
                  onChange={(e) => setHealthMetrics(prev => ({
                    ...prev,
                    currentMedication: e.target.value
                  }))}
                  placeholder="e.g., Ozempic, Saxenda"
                  className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
              <div>
                <Label htmlFor="currentDose" className="text-[#fef5e7]">Current Dose</Label>
                <Input
                  id="currentDose"
                  type="text"
                  value={healthMetrics.currentDose}
                  onChange={(e) => setHealthMetrics(prev => ({
                    ...prev,
                    currentDose: e.target.value
                  }))}
                  placeholder="e.g., 0.5mg weekly"
                  className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
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
                onClick={saveMetrics}
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