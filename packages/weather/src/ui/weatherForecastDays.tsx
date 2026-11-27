import { createElement } from 'react';

import { getWeatherIcon } from '../config/weatherIcons';
import type { OpenWeatherForecastResponse } from '../types';
import { WeatherText } from './weatherPrimitives';

type ForecastDay = NonNullable<OpenWeatherForecastResponse['list']>[number];

export const WeatherForecastDays = ({ days }: { days: ForecastDay[] }) => (
  <>
    {days.map((dayData) => {
      const [, month, day] = dayData.dt_txt.split(' ')[0].split('-');
      const Icon = getWeatherIcon(dayData.weather?.[0]?.icon ?? '01d');

      return (
        <div key={`${dayData.dt}-${dayData.dt_txt}`} className="p-4 pb-0">
          <div className="flex flex-col gap-3">
            <WeatherText className="text-[12px] font-bold">
              {day}/{month}
            </WeatherText>
            <div className="flex flex-col items-center gap-2">
              {createElement(Icon, {
                className: 'text-muted-foreground mx-auto h-8 w-8',
              })}
              <WeatherText className="text-2xl font-bold">
                {Math.round(dayData.main.temp)}°C
              </WeatherText>
            </div>
          </div>
        </div>
      );
    })}
  </>
);
