'use client';

import { WeatherContent } from '@dashboard/weather';

import { DashboardCard } from './dashboardCard';

export const WeatherCard = () => {
  return (
    <DashboardCard>
      <WeatherContent />
    </DashboardCard>
  );
};
