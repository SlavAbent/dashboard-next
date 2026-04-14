'use client';

import React, {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronDown, CloudIcon, CloudSun, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TypographySmall } from '@/components/ui/typographySmall';
import { useWeatherStore } from '@/app/shared/store/weather.store';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type WeatherType = {
  className: string;
};

const Weather = ({ className }: WeatherType) => {
  const query = useWeatherStore((s) => s.query);
  const setQuery = useWeatherStore((s) => s.setQuery);
  const city = useWeatherStore((s) => s.city);
  const data = useWeatherStore((s) => s.data);
  const loading = useWeatherStore((s) => s.loading);
  const error = useWeatherStore((s) => s.error);
  const fetchWeather = useWeatherStore((s) => s.fetchWeather);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!data) {
      fetchWeather(city);
    }
  }, [data, city, fetchWeather]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') fetchWeather(query);
  };

  const days = useMemo(() => {
    if (!data?.list) return [];

    const map = new Map();

    for (let item of data.list) {
      const day = item.dt_txt.split(' ')[0];
      if (!map.has(day) && item.dt_txt.includes('12:00:00')) {
        map.set(day, item);
      }
    }

    return Array.from(map.values()).slice(0, 5);
  }, [data]);

  const currentTemp = Math.floor(data?.list?.[0]?.main?.temp) || 0;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            variant="ghost"
            className="hover:none flex cursor-pointer items-center gap-2 px-2 hover:bg-transparent hover:text-current hover:shadow-none">
            <CloudIcon size={32} />
            <TypographySmall text={`${currentTemp}°C`} />
            <ChevronDown
              width={16}
              height={16}
              className={cn(
                'color-[#000000] h-4 w-4 transition-transform duration-200',
                open && 'rotate-180'
              )}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-100 rounded-sm border border-[#AFAFAF] p-4">
          <div className="flex items-center gap-2">
            <Input
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Search city..."
              className="w-[300px]"
            />
            <Button
              onClick={() => fetchWeather(query)}
              className="rounded-sm py-[17px]">
              Search
            </Button>
          </div>
          <div className="flex items-center justify-between">
            {days?.map((item) => {
              const [, currentMonth, currentDay] = item.dt_txt
                .split(' ')[0]
                .split('-');

              return (
                <div key={item.dt} className="p-4 pb-0">
                  <div className="flex flex-col gap-3">
                    <TypographySmall
                      className="text-[12px] font-bold"
                      text={`${currentDay}/${currentMonth}`}
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
          {error && <p className="text-red-500">{error}</p>}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Weather;
