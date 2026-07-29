'use client';

import { DigitalClock } from '@/features/clock/ui/digitalClock';

import { DashboardCard } from './dashboardCard';

export const ClockCard = () => {
  return (
    <DashboardCard contentClassName="items-center justify-center">
      <DigitalClock />
    </DashboardCard>
  );
};
