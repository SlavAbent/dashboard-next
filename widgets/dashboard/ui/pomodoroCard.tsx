'use client';

import { Pomodoro } from '@/widgets/pomodoro';

import { DashboardCard } from './dashboardCard';

export const PomodoroCard = () => {
  return (
    <DashboardCard contentClassName="flex items-center justify-center">
      <Pomodoro />
    </DashboardCard>
  );
};
