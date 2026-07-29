import React from 'react';

import { Skeleton } from '@/shared/components/skeleton/skeleton';
import { TypographySmall } from '@/shared/components/typography/typographySmall';
import { getWeatherIconByCode } from '@/widgets/weather/lib/getWeatherIcon';
import { useWeatherState } from '@/widgets/weather/model/useWeatherState';

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
