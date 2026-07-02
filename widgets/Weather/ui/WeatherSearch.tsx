import React from 'react';

import { Skeleton } from '@/shared/components/Skeleton/skeleton';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { useWeatherState } from '@/widgets/Weather/hooks/useWeatherState';
import { getWeatherIconByCode } from '@/widgets/Weather/lib/getWeatherIcon';

export const WeatherSearch = () => {
  const { weather } = useWeatherState();

  const current = weather?.data?.list?.[0];
  const currentTemp = Math.floor(current?.main?.temp ?? 0);
  const currentWeatherIcon = getWeatherIconByCode(
    current?.weather?.[0]?.icon ?? '01d'
  );

  const loading = weather.isFetching;
  return (
    <div className="flex min-w-16 cursor-pointer items-center gap-1">
      {!loading ? (
        <>
          {React.createElement(currentWeatherIcon, {
            size: 24,
            className: 'text-muted-foreground',
          })}

          <div className="flex items-center gap-2">
            <TypographySmall text={`${currentTemp}°C`} className="!leading-5" />
          </div>
        </>
      ) : (
        <Skeleton mode="shimmer" className="h-6 w-24 rounded-md" />
      )}
    </div>
  );
};
