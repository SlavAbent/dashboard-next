'use client';

import { WeatherContent } from '@/features/weather';

import { DashboardCard } from './dashboardCard';

export const WeatherCard = () => {
  return (
    <DashboardCard>
      <WeatherContent />
    </DashboardCard>
  );
};
