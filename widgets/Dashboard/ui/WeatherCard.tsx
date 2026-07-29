'use client';

import { WeatherContent } from '@/widgets/Weather/ui/WeatherContent';

import { DashboardCard } from './DashboardCard';

export const WeatherCard = () => {
  return (
    <DashboardCard>
      <WeatherContent />
    </DashboardCard>
  );
};
