'use client';

import { DigitalClock } from '@dashboard/clock';

import { DashboardCard } from './dashboardCard';

export const ClockCard = () => {
  return (
    <DashboardCard contentClassName="items-center justify-center">
      <DigitalClock />
    </DashboardCard>
  );
};
