import { createElement } from 'react';

import { getWeatherIcon } from '../config/weatherIcons';
import { useWeatherState } from '../weatherState';
import { WeatherSkeleton, WeatherText } from './weatherPrimitives';

export const WeatherTrigger = () => {
  const { weather } = useWeatherState();
  const current = weather.data?.list?.[0];
  const currentTemp = current ? `${Math.floor(current.main.temp)}°C` : '—';
  const Icon = getWeatherIcon(current?.weather?.[0]?.icon ?? '01d');

  return (
    <div className="flex min-w-16 cursor-pointer items-center gap-1">
      {!weather.isFetching ? (
        <>
          {createElement(Icon, {
            size: 24,
            className: 'text-muted-foreground',
          })}
          <WeatherText className="!leading-5">{currentTemp}</WeatherText>
        </>
      ) : (
        <WeatherSkeleton className="h-6 w-24 rounded-md" />
      )}
    </div>
  );
};
