'use client';

import { WeatherContent } from '@/widgets/weather/ui/weatherContent';

import { DashboardCard } from './dashboardCard';

export const WeatherCard = () => {
  return (
    <DashboardCard>
      <WeatherContent />
    </DashboardCard>
  );
};
