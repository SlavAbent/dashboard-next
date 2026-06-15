'use client';

import React, { ChangeEvent, useMemo, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/Popover/popover';
import { Button } from '@/shared/components/Button/button';
import { Input } from '@/shared/components/Input/input';
import { useGeocodeCity } from '@/widgets/Weather/hooks/useGeocodeCity';
import { useWeather } from '@/widgets/Weather/hooks/useWeather';
import { WeatherType } from '@/widgets/Weather/types/weather.types';
import { useCurrentCoords } from '@/widgets/Weather/hooks/useCurrentPosition';
import { getDays } from '@/widgets/Weather/config';
import { DEFAULT_COORDS } from '@/widgets/Weather/constants';
import { getWeatherIconByCode } from '@/widgets/Weather/lib/getWeatherIcon';
import { Skeleton } from '@/shared/components/Skeleton/skeleton';

const Weather = ({ className }: WeatherType) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [city, setCity] = useState<string | null>(null);

  const geocode = useGeocodeCity(city);
  const position = useCurrentCoords();
  const coords = geocode.data ?? position.data ?? DEFAULT_COORDS;
  const weather = useWeather(coords);

  const data = weather.data;
  const loading = weather.isFetching;
  const error = weather.error;

  const days = getDays(data);
  const currentTemp = Math.floor(data?.list?.[0]?.main?.temp ?? 0);
  const currentCity = data?.city?.name ?? city ?? '';
  const currentWeatherId = data?.list?.[0]?.weather?.[0].icon ?? '01d';
  const CurrentWeatherIcon = getWeatherIconByCode(currentWeatherId);

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
    <div className={cn('flex items-center gap-2', className)}>
      <Popover open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
        <PopoverTrigger>
          <div className="flex min-w-16 cursor-pointer items-center gap-1">
            {!loading ? (
              <>
                <CurrentWeatherIcon
                  size={24}
                  className="text-muted-foreground"
                />

                <div className="flex items-center gap-2">
                  <TypographySmall
                    text={`${currentTemp}°C`}
                    className="!leading-5"
                  />
                </div>
              </>
            ) : (
              <Skeleton mode="shimmer" className="h-6 w-24 rounded-md" />
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="border-border w-100 rounded-sm border p-4">
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

            <Button onClick={handleSearch} className="rounded-sm py-[17px]">
              Search
            </Button>
          </div>

          <div className="flex h-[94px] items-center justify-between">
            {renderDays}
            {loading && <Skeleton mode="shimmer" className="h-[94px] w-full" />}
          </div>

          {error && <TypographySmall text={(error as Error).message} />}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Weather;
