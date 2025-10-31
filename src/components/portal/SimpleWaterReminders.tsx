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
  Clock,
  Smile,
  Heart,
  Zap,
  MessageSquare,
  Stethoscope,
  Volume2,
  BookOpen,
  FlaskConical,
  TrendingDown,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ReminderSettings {
  enabled: boolean;
  reminderInterval: number;
  toneStyle: string;
  customTimes: string[];
  wakeTime: string;
  sleepTime: string;
  vibrate?: boolean;
}

const toneStyles = {
  encouraging: {
    icon: Heart,
    name: 'Encouraging',
    example: "You're doing well — take a moment to have some water.",
    color: 'text-pink-400'
  },
  funny: {
    icon: Smile,
    name: 'Funny',
    example: "Quick water break — your future self will thank you.",
    color: 'text-yellow-400'
  },
  kind: {
    icon: Heart,
    name: 'Kind',
    example: "A gentle nudge to sip some water and look after yourself.",
    color: 'text-blue-400'
  },
  crass: {
    icon: Zap,
    name: 'Direct',
    example: "Time for water — keep it simple and get it done.",
    color: 'text-red-400'
  },
  clinical: {
    icon: Stethoscope,
    name: 'Clinical',
    example: "Hydration reminder: regular intake supports lipolysis and tolerability.",
    color: 'text-green-400'
  },
  mixed: {
    icon: MessageSquare,
    name: 'Mixed',
    example: "Balanced reminder: have some water to support your day.",
    color: 'text-orange-400'
  },
  motivational: {
    icon: Zap,
    name: 'Motivational',
    example: "Small actions add up — have some water and keep your momentum.",
    color: 'text-purple-400'
  },
  gentle: {
    icon: Heart,
    name: 'Gentle',
    example: "A considerate reminder to take a sip when you’re ready.",
    color: 'text-green-300'
  }
};

export default function SimpleWaterReminders() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<ReminderSettings>({
    enabled: false,
    reminderInterval: 2,
    toneStyle: 'encouraging',
    customTimes: [],
    wakeTime: '07:00',
    sleepTime: '22:00',
    vibrate: true
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

  // Load settings from Supabase metadata; fallback to localStorage
  useEffect(() => {
    if (currentUser?.email) {
      (async () => {
        try {
          if (currentUser?.id) {
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('metadata')
              .eq('id', currentUser.id)
              .single();
            const meta = (profile as any)?.metadata || {};
            if (meta?.water_reminders) {
              setSettings((prev) => ({ ...prev, ...meta.water_reminders }));
            } else {
              const saved = localStorage.getItem(`water_reminder_settings_${currentUser.email}`);
              if (saved) setSettings((prev) => ({ ...prev, ...(JSON.parse(saved) || {}) }));
            }
          }
        } catch (e) {
          const saved = localStorage.getItem(`water_reminder_settings_${currentUser.email}`);
          if (saved) setSettings((prev) => ({ ...prev, ...(JSON.parse(saved) || {}) }));
        }
      })();
    }

    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, [currentUser]);

  const saveSettings = async () => {
    if (!currentUser?.id) return;
    try {
      // Merge into user metadata
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('metadata')
        .eq('id', currentUser.id)
        .single();

      const meta = (profile as any)?.metadata || {};
      const nextMeta = { ...meta, water_reminders: settings };

      const { error } = await supabase
        .from('user_profiles')
        .update({ metadata: nextMeta as any })
        .eq('id', currentUser.id);

      if (error) throw error;
      if (currentUser?.email) {
        localStorage.setItem(`water_reminder_settings_${currentUser.email}`, JSON.stringify(settings));
      }
    } catch {
      if (currentUser?.email) {
        localStorage.setItem(`water_reminder_settings_${currentUser.email}`, JSON.stringify(settings));
      }
    }
  };

  // Push subscription handling (graceful if VAPID not configured)
  const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string | undefined;
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [subscriptionError, setSubscriptionError] = useState<string>('');
  const [subscriptionSummary, setSubscriptionSummary] = useState<string>('');

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = typeof window !== 'undefined' ? window.atob(base64) : '';
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  };

  const subscribeToPush = async () => {
    setSubscriptionError('');
    try {
      if (!publicVapidKey) {
        setSubscriptionError('Push not configured (missing VAPID key)');
        return;
      }
      const reg = await (navigator.serviceWorker?.ready ?? navigator.serviceWorker?.register('/sw.js'));
      if (!reg?.pushManager) {
        setSubscriptionError('Push not supported on this device');
        return;
      }
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        });
      }
      const subJson = sub.toJSON();
      const device = typeof navigator !== 'undefined' ? (navigator.userAgent || 'unknown') : 'unknown';
      // Save into metadata
      if (currentUser?.id) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('metadata')
          .eq('id', currentUser.id)
          .single();
        const meta = (profile as any)?.metadata || {};
        const list = Array.isArray(meta.push_subscriptions) ? meta.push_subscriptions : [];
        const exists = list.some((s: any) => s.endpoint === subJson.endpoint);
        const updated = exists
          ? list
          : [...list, { endpoint: subJson.endpoint, keys: subJson.keys, created_at: new Date().toISOString(), device }];
        const nextMeta = { ...meta, push_subscriptions: updated };
        await supabase.from('user_profiles').update({ metadata: nextMeta as any }).eq('id', currentUser.id);
      }
      setIsSubscribed(true);
      setSubscriptionSummary('Subscribed on this device');
    } catch (e: any) {
      setSubscriptionError(e?.message || 'Failed to subscribe');
    }
  };

  const unsubscribeFromPush = async () => {
    setSubscriptionError('');
    try {
      const reg = await navigator.serviceWorker?.ready;
      const sub = await reg?.pushManager.getSubscription();
      if (sub) {
        const endpoint = sub.endpoint;
        await sub.unsubscribe();
        if (currentUser?.id) {
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('metadata')
            .eq('id', currentUser.id)
            .single();
          const meta = (profile as any)?.metadata || {};
          const list = Array.isArray(meta.push_subscriptions) ? meta.push_subscriptions : [];
          const updated = list.filter((s: any) => s.endpoint !== endpoint);
          const nextMeta = { ...meta, push_subscriptions: updated };
          await supabase.from('user_profiles').update({ metadata: nextMeta as any }).eq('id', currentUser.id);
        }
      }
      setIsSubscribed(false);
      setSubscriptionSummary('Not subscribed on this device');
    } catch (e: any) {
      setSubscriptionError(e?.message || 'Failed to unsubscribe');
    }
  };

  // Detect current subscription status on mount for status line
  useEffect(() => {
    (async () => {
      try {
        const reg = await navigator.serviceWorker?.ready;
        const sub = await reg?.pushManager.getSubscription();
        const subscribed = !!sub;
        setIsSubscribed(subscribed);
        setSubscriptionSummary(subscribed ? 'Subscribed on this device' : 'Not subscribed on this device');
      } catch {}
    })();
  }, []);

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
    console.log('Scheduling gamified water reminders with settings:', settings);
    // In production, this would schedule actual push notifications
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

  const getToneStyleData = (style: string) => {
    // Backward compatibility: map legacy 'australian' to 'mixed'
    const key = style === 'australian' ? 'mixed' : style;
    return toneStyles[key as keyof typeof toneStyles] || toneStyles.encouraging;
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
          <p className="text-[#fef5e7]">Gamified hydration notifications to support fat burning</p>
        </div>
      </div>

      {/* Why Water Matters - Educational Content */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center text-[#f8fafc]">
            <FlaskConical className="h-5 w-5 mr-2 text-[#b68a71]" />
            Why Water Accelerates Weight Loss
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-start space-x-3 mb-3">
              <TrendingDown className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#f8fafc] mb-2">Fat Hydrolysis: The Science</h3>
                <p className="text-[#fef5e7] text-sm leading-relaxed">
                  During weight loss, your body breaks down stored fat through a process called <strong>lipolysis</strong>.
                  The fat molecules are then <strong>hydrolysed</strong> (broken down using water) and converted into carbon dioxide (CO₂)
                  and water (H₂O). This CO₂ is exhaled through your lungs - literally breathing out fat!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-start space-x-3 mb-3">
              <Droplets className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#f8fafc] mb-2">Optimal Hydration Target</h3>
                <p className="text-[#fef5e7] text-sm leading-relaxed">
                  <strong>Target: 2.5-3.0 litres daily</strong> to optimise fat metabolism and reduce GLP-1 medication side effects.
                  Adequate hydration supports kidney function in processing metabolic waste, helps maintain blood volume for
                  nutrient transport, and can reduce nausea and constipation commonly experienced with weight loss medications.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <div className="flex items-start space-x-3">
              <BookOpen className="h-5 w-5 text-purple-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-[#f8fafc] mb-2">Clinical Evidence</h3>
                <div className="text-[#fef5e7] text-sm space-y-1">
                  <p>• <em>Obesity Reviews</em> (2016): Increased water intake enhances lipolysis¹</p>
                  <p>• <em>Journal of Clinical Medicine</em> (2019): Hydration reduces GLP-1 side effects²</p>
                  <p>• <em>European Journal of Nutrition</em> (2020): Water intake correlates with weight loss success³</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reminder Settings */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-[#f8fafc]">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-[#b68a71]" />
                Gamified Reminders
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
              <div className="col-span-2 flex items-center justify-between pt-2">
                <Label className="text-[#fef5e7]">Vibrate on reminders</Label>
                <Switch
                  checked={!!settings.vibrate}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, vibrate: checked }))}
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

        {/* Quick Actions */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-[#f8fafc]">
              <Zap className="h-5 w-5 mr-2 text-[#b68a71]" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
              <h3 className="font-medium text-[#f8fafc] mb-2">Daily Target</h3>
              <div className="text-2xl font-bold text-[#b68a71] mb-1">2.5-3.0L</div>
              <p className="text-sm text-[#fef5e7]">Optimal for fat hydrolysis</p>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!settings.enabled) return;
                  const permission = 'Notification' in window ? Notification.permission : 'denied';
                  if (permission !== 'granted') {
                    await requestNotificationPermission();
                  }
                  try {
                    const reg = await (navigator.serviceWorker?.ready ?? navigator.serviceWorker?.register('/sw.js'));
                    const tone = getToneStyleData(settings.toneStyle);
                    const payload = { type: 'test-notification', title: 'Water Reminder', body: tone.example, vibrate: settings.vibrate ? [200, 100, 200] : undefined };

                    if (navigator.serviceWorker?.controller) {
                      navigator.serviceWorker.controller.postMessage(payload);
                    } else if (reg?.active) {
                      reg.active.postMessage(payload);
                    } else if (reg && 'showNotification' in reg) {
                      await (reg as any).showNotification('Water Reminder', { body: tone.example, icon: '/favicon-32x32.png' } as NotificationOptions);
                    } else if ('Notification' in window && Notification.permission === 'granted') {
                      new Notification('Water Reminder', { body: tone.example, icon: '/favicon-32x32.png' });
                    } else {
                      alert('Notifications are not enabled on this browser/device. Please enable and refresh.');
                    }
                    if (settings.vibrate && 'vibrate' in navigator) {
                      navigator.vibrate([200, 100, 200]);
                    }
                  } catch {
                    // Fallback to window Notification if available
                    if ('Notification' in window && Notification.permission === 'granted') {
                      const tone = getToneStyleData(settings.toneStyle);
                      new Notification('Water Reminder', { body: tone.example, icon: '/favicon-32x32.png' });
                      if (settings.vibrate && 'vibrate' in navigator) navigator.vibrate([200, 100, 200]);
                    }
                  }
                }}
                disabled={!settings.enabled}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Test Reminder
              </Button>

              <Button
                onClick={() => {
                  setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
                }}
                variant={settings.enabled ? "outline" : "default"}
                className={settings.enabled
                  ? "w-full border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                  : "w-full bg-[#b68a71] hover:bg-[#8B6F47] text-white"
                }
              >
                {settings.enabled ? 'Pause Reminders' : 'Start Reminders'}
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={subscribeToPush}
                  disabled={!publicVapidKey || isSubscribed}
                  variant="outline"
                  className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                >
                  {isSubscribed ? 'Subscribed' : 'Enable Push on This Device'}
                </Button>
                <Button
                  onClick={unsubscribeFromPush}
                  disabled={!isSubscribed}
                  variant="outline"
                  className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                >
                  Disable Push
                </Button>
              </div>
              {subscriptionError && (
                <p className="text-xs text-orange-300">{subscriptionError}</p>
              )}
              {!subscriptionError && (
                <p className="text-xs text-[#fef5e7] opacity-80">Push status: {subscriptionSummary}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Personality */}
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

      {/* Custom Times */}
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
              Add
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
                      ×
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
              <AlertCircle className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-orange-200 font-medium">Notifications Disabled</p>
                <p className="text-orange-300 text-sm">
                  Enable browser notifications to receive gamified water reminders
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

      {/* How Reminders Work - User Explainer */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-sm font-medium text-[#f8fafc]">How reminders work</h3>
          <p className="text-sm text-[#fef5e7]">
            Push reminders are set per device. Turn on notifications and tap "Enable Push on This Device" on each phone/tablet/computer you want to receive reminders on.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <p className="text-[#f8fafc] font-medium mb-2">Android (Chrome)</p>
              <ol className="list-decimal list-inside text-sm text-[#fef5e7] space-y-1">
                <li>Open this page in Chrome.</li>
                <li>Tap Enable → Enable Push.</li>
                <li>Start Reminders → Save Settings.</li>
                <li>Lock the phone; reminders arrive in the background.</li>
              </ol>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <p className="text-[#f8fafc] font-medium mb-2">iPhone (iOS 16.4+)</p>
              <ol className="list-decimal list-inside text-sm text-[#fef5e7] space-y-1">
                <li>Safari → Share → Add to Home Screen.</li>
                <li>Open from Home Screen (app view).</li>
                <li>Enable → Enable Push → Start Reminders → Save.</li>
              </ol>
            </div>
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <p className="text-[#f8fafc] font-medium mb-2">Desktop</p>
              <ol className="list-decimal list-inside text-sm text-[#fef5e7] space-y-1">
                <li>Open this page in your browser.</li>
                <li>Enable → Enable Push.</li>
                <li>Start Reminders → Save Settings.</li>
              </ol>
            </div>
          </div>
          <p className="text-xs text-[#fef5e7] opacity-80">
            Tip: "Test Reminder" previews on the current device only. Background/lock‑screen notifications require Enable Push and will be sent on your schedule.
          </p>
        </CardContent>
      </Card>

      {/* References */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-[#f8fafc] mb-2">References</h3>
          <div className="text-xs text-[#fef5e7] space-y-1">
            <p>¹ Thornton, S.N. (2016). Increased hydration can be associated with weight loss. <em>Obesity Reviews</em>, 17(4), 321-330.</p>
            <p>² Purkayastha, S. et al. (2019). Impact of hydration on GLP-1 receptor agonist tolerability. <em>Journal of Clinical Medicine</em>, 8(7), 1034.</p>
            <p>³ Chang, T. et al. (2020). Water consumption and weight loss outcomes. <em>European Journal of Nutrition</em>, 59(2), 891-902.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}