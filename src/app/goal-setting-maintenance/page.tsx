import { Metadata } from 'next';
import GoalSettingMaintenance from '@/components/GoalSettingMaintenance';

export const metadata: Metadata = {
  title: 'Goal Setting Maintenance',
  description: 'Goal Setting Maintenance page - Access and manage your content',
};

export default function GoalSettingMaintenancePage() {
  return <GoalSettingMaintenance />;
}