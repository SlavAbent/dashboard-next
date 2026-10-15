'use client';

import { PomodoroPanel } from '@dashboard/pomodoro';

import { DashboardCard } from './dashboardCard';

export const PomodoroCard = () => {
  return (
    <DashboardCard contentClassName="flex items-center justify-center">
      <PomodoroPanel />
    </DashboardCard>
  );
};
