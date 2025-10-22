'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Droplets,
  Bell,
  Settings,
  Plus,
  Minus,
  Clock,
  Smile,
  Heart,
  Zap,
  MessageSquare,
  Stethoscope,
  Volume2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface WaterSettings {
  enabled: boolean;
  dailyTarget: number;
  currentIntake: number;
  reminderInterval: number;
  toneStyle: string;
  customTimes: string[];
  wakeTime: string;
  sleepTime: string;
}

const toneStyles = {
  encouraging: {
    icon: Heart,
    name: 'Encouraging',
    example: "💪 You're crushing it! Time for hydration!",
    color: 'text-pink-400'
  },
  funny: {
    icon: Smile,
    name: 'Funny',
    example: "🐫 Even camels drink water... just saying",
    color: 'text-yellow-400'
  },
  kind: {
    icon: Heart,
    name: 'Kind',
    example: "💙 Gentle reminder to care for yourself with some water",
    color: 'text-blue-400'
  },
  crass: {
    icon: Zap,
    name: 'Crass',
    example: "🔥 Oi! Drink some bloody water!",
    color: 'text-red-400'
  },
  clinical: {
    icon: Stethoscope,
    name: 'Clinical',
    example: "⚕️ Hydration checkpoint: Optimize cellular function",
    color: 'text-green-400'
  },
  australian: {
    icon: MessageSquare,
    name: 'Australian',
    example: "🇦🇺 Fair dinkum mate, time for a drink!",
    color: 'text-orange-400'
  },
  motivational: {
    icon: Zap,
    name: 'Motivational',
    example: "🏆 Champions hydrate - that's you!",
    color: 'text-purple-400'
  },
  gentle: {
    icon: Heart,
    name: 'Gentle',
    example: "🌸 Your body deserves this care",
    color: 'text-green-300'
  }
};

export default function WaterReminderDashboard() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<WaterSettings>({
    enabled: false,
    dailyTarget: 2000,
    currentIntake: 0,
    reminderInterval: 2,
    toneStyle: 'encouraging',
    customTimes: [],
    wakeTime: '07:00',
    sleepTime: '22:00'
  });

  const [newReminderTime, setNewReminderTime] = useState('');
  const [notificationPermission, setNotificationPermission] = useState('default');

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

  // Load settings and check notification permission
  useEffect(() => {
    if (currentUser?.email) {
      const savedSettings = localStorage.getItem(`water_settings_${currentUser.email}`);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }

    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, [currentUser]);

  const saveSettings = () => {
    if (currentUser?.email) {
      localStorage.setItem(`water_settings_${currentUser.email}`, JSON.stringify(settings));
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      return permission;
    }
    return 'denied';
  };

  const enableReminders = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
      setSettings(prev => ({ ...prev, enabled: true }));
      scheduleNotifications();
    } else {
      alert('Please enable notifications to use water reminders');
    }
  };

  const scheduleNotifications = () => {
    // In a real app, this would schedule actual push notifications
    console.log('Scheduling water reminders with settings:', settings);
  };

  const addWater = (amount: number) => {
    setSettings(prev => ({
      ...prev,
      currentIntake: Math.max(0, Math.min(prev.currentIntake + amount, prev.dailyTarget * 2))
    }));
  };

  const addCustomTime = () => {
    if (newReminderTime && !settings.customTimes.includes(newReminderTime)) {
      setSettings(prev => ({
        ...prev,
        customTimes: [...prev.customTimes, newReminderTime].sort()
      }));
      setNewReminderTime('');
    }
  };

  const removeCustomTime = (time: string) => {
    setSettings(prev => ({
      ...prev,
      customTimes: prev.customTimes.filter(t => t !== time)
    }));
  };

  const getProgressPercentage = () => {
    return Math.min((settings.currentIntake / settings.dailyTarget) * 100, 100);
  };

  const getToneStyleData = (style: string) => {
    return toneStyles[style as keyof typeof toneStyles] || toneStyles.encouraging;
  };

  if (!currentUser) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8 text-center">
          <p className="text-[#fef5e7]">Please sign in to access water reminders.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
          <Droplets className="h-8 w-8 text-[#b68a71]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#f8fafc]">Water Reminders</h1>
          <p className="text-[#fef5e7]">Smart hydration tracking with personality-driven notifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Progress */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-[#f8fafc]">
              <Droplets className="h-5 w-5 mr-2 text-[#b68a71]" />
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#b68a71] mb-2">
                {settings.currentIntake}ml
              </div>
              <div className="text-sm text-[#fef5e7]">
                of {settings.dailyTarget}ml goal
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-4 bg-slate-900 rounded-full border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
              <div className="text-center mt-2 text-sm text-[#b68a71]">
                {Math.round(getProgressPercentage())}% complete
              </div>
            </div>

            {/* Quick Add Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => addWater(250)}
                variant="outline"
                className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
              >
                +250ml
              </Button>
              <Button
                onClick={() => addWater(500)}
                variant="outline"
                className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
              >
                +500ml
              </Button>
              <Button
                onClick={() => addWater(-250)}
                variant="outline"
                className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
              >
                -250ml
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reminder Settings */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-[#f8fafc]">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-[#b68a71]" />
                Reminder Settings
              </div>
              <Switch
                checked={settings.enabled}
                onCheckedChange={(checked) => {
                  if (checked) {
                    enableReminders();
                  } else {
                    setSettings(prev => ({ ...prev, enabled: false }));
                  }
                }}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-[#fef5e7]">Daily Target (ml)</Label>
              <Input
                type="number"
                value={settings.dailyTarget}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  dailyTarget: parseInt(e.target.value) || 2000
                }))}
                className="bg-slate-900 border-slate-700 text-[#f8fafc]"
              />
            </div>

            <div>
              <Label className="text-[#fef5e7]">Reminder Interval (hours)</Label>
              <Select
                value={settings.reminderInterval.toString()}
                onValueChange={(value) => setSettings(prev => ({
                  ...prev,
                  reminderInterval: parseInt(value)
                }))}
              >
                <SelectTrigger className="bg-slate-900 border-slate-700 text-[#f8fafc]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Every hour</SelectItem>
                  <SelectItem value="2">Every 2 hours</SelectItem>
                  <SelectItem value="3">Every 3 hours</SelectItem>
                  <SelectItem value="4">Every 4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[#fef5e7]">Wake Time</Label>
                <Input
                  type="time"
                  value={settings.wakeTime}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    wakeTime: e.target.value
                  }))}
                  className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
              <div>
                <Label className="text-[#fef5e7]">Sleep Time</Label>
                <Input
                  type="time"
                  value={settings.sleepTime}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    sleepTime: e.target.value
                  }))}
                  className="bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
            </div>

            <Button
              onClick={saveSettings}
              className="w-full bg-[#b68a71] hover:bg-[#8B6F47] text-white"
            >
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Notification Tone Styles */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-[#f8fafc]">
            <Volume2 className="h-5 w-5 mr-2 text-[#b68a71]" />
            Notification Personality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(toneStyles).map(([key, style]) => {
              const Icon = style.icon;
              const isSelected = settings.toneStyle === key;

              return (
                <div
                  key={key}
                  onClick={() => setSettings(prev => ({ ...prev, toneStyle: key }))}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#b68a71]/20 border-[#b68a71]'
                      : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <Icon className={`h-5 w-5 mr-2 ${style.color}`} />
                    <span className="font-medium text-[#f8fafc]">{style.name}</span>
                  </div>
                  <p className="text-sm text-[#fef5e7] italic">"{style.example}"</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Custom Reminder Times */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-[#f8fafc]">
            <Clock className="h-5 w-5 mr-2 text-[#b68a71]" />
            Custom Reminder Times
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="time"
              value={newReminderTime}
              onChange={(e) => setNewReminderTime(e.target.value)}
              className="bg-slate-900 border-slate-700 text-[#f8fafc]"
              placeholder="Add custom time"
            />
            <Button
              onClick={addCustomTime}
              className="bg-[#b68a71] hover:bg-[#8B6F47] text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {settings.customTimes.length > 0 && (
            <div className="space-y-2">
              <Label className="text-[#fef5e7]">Active Custom Times:</Label>
              <div className="flex flex-wrap gap-2">
                {settings.customTimes.map((time) => (
                  <div
                    key={time}
                    className="flex items-center bg-slate-900 rounded-lg px-3 py-1 border border-slate-700"
                  >
                    <Clock className="h-4 w-4 mr-2 text-[#b68a71]" />
                    <span className="text-[#f8fafc]">{time}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeCustomTime(time)}
                      className="ml-2 h-6 w-6 p-0 text-red-400 hover:text-red-300"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Permission Status */}
      {notificationPermission !== 'granted' && (
        <Card className="bg-orange-900/20 border-orange-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-orange-200 font-medium">Notifications Disabled</p>
                <p className="text-orange-300 text-sm">
                  Enable browser notifications to receive water reminders
                </p>
              </div>
              <Button
                onClick={requestNotificationPermission}
                variant="outline"
                className="border-orange-600 text-orange-200 hover:bg-orange-800"
              >
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}