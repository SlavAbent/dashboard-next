'use client';

import React, { ChangeEvent, useState } from 'react';
import { ChevronDown, CloudIcon, CloudSun, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { useGeocodeCity } from '@/widgets/Weather/hooks/useGeocodeCity';
import { useWeather } from '@/widgets/Weather/hooks/useWeather';
import { WeatherType } from '@/widgets/Weather/types';
import { useCurrentCoords } from '@/widgets/Weather/hooks/useCurrentPosition';
import { getDays } from '@/widgets/Weather/config';

const DEFAULT_COORDS = {
  lat: 59.9343,
  lon: 30.3351,
};

const Weather = ({ className }: WeatherType) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [city, setCity] = useState<string | null>(null);

  const geocode = useGeocodeCity(city);
  const position = useCurrentCoords();
  const coords = geocode.data ?? position.data ?? DEFAULT_COORDS;
  const weather = useWeather(coords);

  const data = weather.data;
  const loading = weather.isLoading;
  const error = weather.error;

  const days = getDays(data);
  const currentTemp = Math.floor(data?.list?.[0]?.main?.temp ?? 0);
  const currentCity = data?.city?.name ?? city ?? '';

  const handleSearch = () => {
    const next = query.trim();
    if (!next) return;

    setCity(next);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
        }}>
        <PopoverTrigger>
          <div className="flex cursor-pointer items-center gap-2 px-2">
            <CloudIcon size={28} color="#AFAFAF" />

            <div className="flex items-center gap-2">
              <TypographySmall
                text={currentCity}
                className="max-w-[120px] truncate !leading-5"
              />
              <TypographySmall
                text={`${currentTemp}°C`}
                className="!leading-5"
              />
            </div>

            <ChevronDown
              width={16}
              height={16}
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-100 rounded-sm border border-[#AFAFAF] p-4">
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

          <div className="flex items-center justify-between">
            {days.map((item) => {
              const [, month, day] = item.dt_txt.split(' ')[0].split('-');

              return (
                <div key={`${item.dt}-${item.dt_txt}`} className="p-4 pb-0">
                  <div className="flex flex-col gap-3">
                    <TypographySmall
                      className="text-[12px] font-bold"
                      text={`${day}/${month}`}
                    />

                    <div className="flex flex-col items-center gap-2">
                      <CloudSun className="mx-auto" />
                      <TypographySmall
                        className="text-2xl font-bold"
                        text={`${Math.round(item.main.temp)}°C`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {loading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          )}

          {error && <p className="text-red-500">{(error as Error).message}</p>}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Weather;
