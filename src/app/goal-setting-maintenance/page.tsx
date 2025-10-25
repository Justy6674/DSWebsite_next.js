import { Metadata } from 'next';
import GoalSettingMaintenance from '@/components/GoalSettingMaintenance';

export const metadata: Metadata = {
  title: 'Goal Setting Maintenance',
  description: 'Goal Setting Maintenance page - Access and manage your content',
  alternates: {
    canonical: 'https://www.downscale.com.au/goal-setting-maintenance',
  },
};

export default function GoalSettingMaintenancePage() {
  return <GoalSettingMaintenance />;
}