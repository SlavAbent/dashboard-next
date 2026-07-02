import React, { ChangeEvent, useMemo, useState } from 'react';

import { Button } from '@/shared/components/Button/button';
import { Input } from '@/shared/components/Input/input';
import { Skeleton } from '@/shared/components/Skeleton/skeleton';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { getDays } from '@/widgets/Weather/config';
import { useWeatherState } from '@/widgets/Weather/hooks/useWeatherState';
import { getWeatherIconByCode } from '@/widgets/Weather/lib/getWeatherIcon';

export const WeatherContent = () => {
  const [query, setQuery] = useState('');

  const { city, weather, setCity } = useWeatherState();

  const { data, isFetching: loading, error } = weather;

  const days = getDays(data);

  const currentCity = data?.city?.name ?? city ?? '';

  const handleSearch = () => {
    const next = query.trim();
    if (!next) return;

    setCity(next);
  };

  const renderDays = useMemo(() => {
    return days.map((dayData) => {
      const [, month, day] = dayData.dt_txt.split(' ')[0].split('-');

      const weatherId = dayData.weather?.[0].icon ?? '01d';
      const Icon = getWeatherIconByCode(weatherId);

      return (
        <div key={`${dayData.dt}-${dayData.dt_txt}`} className="p-4 pb-0">
          <div className="flex flex-col gap-3">
            <TypographySmall
              className="text-[12px] font-bold"
              text={`${day}/${month}`}
            />

            <div className="flex flex-col items-center gap-2">
              <Icon className="text-muted-foreground mx-auto h-8 w-8" />
              <TypographySmall
                className="text-2xl font-bold"
                text={`${Math.round(dayData.main.temp)}°C`}
              />
            </div>
          </div>
        </div>
      );
    });
  }, [days]);

  return (
    <>
      <TypographySmall
        text={`Current city: ${currentCity}`}
        className="!leading-5"
      />
      <div className="flex items-center gap-2">
        <Input
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search city..."
          className="w-[300px]"
        />

        <Button onClick={handleSearch} className="w-fit rounded-sm py-[17px]">
          Search
        </Button>
      </div>

      <div className="flex h-[94px] items-center justify-between">
        {renderDays}
        {loading && <Skeleton mode="shimmer" className="h-[94px] w-full" />}
      </div>

      {error && <TypographySmall text={(error as Error).message} />}
    </>
  );
};
