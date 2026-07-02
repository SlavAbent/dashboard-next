'use client';
import React from 'react';

import { Pomodoro } from '@/widgets/Pomodoro';
import { WeatherContent } from '@/widgets/Weather/ui/WeatherContent';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-2 p-8">
      <div className="col-span-2">
        <Pomodoro />
      </div>
      <div className="col-span-3">
        <WeatherContent />
      </div>
    </div>
  );
}
