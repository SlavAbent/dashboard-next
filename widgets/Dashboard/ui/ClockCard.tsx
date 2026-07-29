'use client';

import { DigitalClock } from '@/features/clock/ui/digital-clock';

import { DashboardCard } from './DashboardCard';

export const ClockCard = () => {
  return (
    <DashboardCard contentClassName="items-center justify-center">
      <DigitalClock />
    </DashboardCard>
  );
};
