'use client';

import { Pomodoro } from '@/widgets/Pomodoro';

import { DashboardCard } from './DashboardCard';

export const PomodoroCard = () => {
  return (
    <DashboardCard contentClassName="flex items-center justify-center">
      <Pomodoro />
    </DashboardCard>
  );
};
