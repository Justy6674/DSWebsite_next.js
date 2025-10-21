import { Metadata } from 'next';
import SleepRecoveryOptimisation from '@/components/SleepRecoveryOptimisation';

export const metadata: Metadata = {
  title: 'Sleep Recovery Optimisation',
  description: 'Sleep Recovery Optimisation page - Access and manage your content',
};

export default function SleepRecoveryOptimisationPage() {
  return <SleepRecoveryOptimisation />;
}