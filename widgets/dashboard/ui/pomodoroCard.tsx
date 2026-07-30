'use client';

import { PomodoroPanel } from '@/features/pomodoro';

import { DashboardCard } from './dashboardCard';

export const PomodoroCard = () => {
  return (
    <DashboardCard contentClassName="flex items-center justify-center">
      <PomodoroPanel />
    </DashboardCard>
  );
};
