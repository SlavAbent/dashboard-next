'use client';

import { Popover } from '@base-ui/react/popover';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  type LucideIcon,
  Moon,
  Sun,
  Wind,
} from 'lucide-react';
import {
  type ButtonHTMLAttributes,
  type ChangeEvent,
  createElement,
  type InputHTMLAttributes,
  useMemo,
  useState,
} from 'react';

import type { OpenWeatherForecastResponse, WeatherType } from './types';
import { useWeatherState } from './weatherState';

const getWeatherIconByCode = (icon: string): LucideIcon => {
  switch (icon) {
    case '01d':
      return Sun;
    case '01n':
      return Moon;
    case '02d':
      return CloudSun;
    case '02n':
      return CloudMoon;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return Cloud;
    case '09d':
    case '09n':
      return CloudDrizzle;
    case '10d':
    case '10n':
      return CloudRain;
    case '10-strong':
      return CloudRainWind;
    case '11d':
    case '11n':
      return CloudLightning;
    case '13d':
    case '13n':
      return CloudSnow;
    case '50d':
    case '50n':
      return CloudFog;
    case 'wind':
      return Wind;
    case 'hail':
      return CloudHail;
    default:
      return Cloud;
  }
};

const getDays = (data: OpenWeatherForecastResponse | undefined) => {
  if (!data?.list) return [];

  const days = new Map<string, (typeof data.list)[number]>();

  for (const item of data.list) {
    const day = item.dt_txt.split(' ')[0];

    if (!days.has(day) && item.dt_txt.includes('12:00:00')) {
      days.set(day, item);
    }
  }

  return Array.from(days.values()).slice(0, 5);
};

const TypographySmall = ({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) => (
  <small className={`text-sm leading-none font-medium ${className}`}>
    {text}
  </small>
);

const Skeleton = ({ className = '' }: { className?: string }) => (
  <div
    className={`bg-muted/60 before:animate-shimmer relative w-full overflow-hidden rounded-md before:absolute before:inset-0 before:-translate-x-full before:skew-x-12 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
  />
);

const Input = ({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`border-input focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-sm border bg-transparent py-[7px] pl-3 text-[14px] transition-colors outline-none focus-visible:ring-1 ${className}`}
  />
);

const Button = ({
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    {...props}
    className={`bg-secondary text-secondary-foreground flex h-10 cursor-pointer items-center justify-center gap-2 rounded-sm px-2.5 text-xs font-medium transition-all disabled:pointer-events-none disabled:opacity-50 ${className}`}
  />
);

export const Weather = ({ className }: WeatherType) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative flex items-center gap-2 ${className ?? ''}`}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          aria-label="Weather forecast"
          className="cursor-pointer border-0 bg-transparent p-0">
          <WeatherSearch />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner align="end" sideOffset={4} className="z-50">
            <Popover.Popup
              aria-label="Weather forecast"
              className="bg-popover text-popover-foreground flex w-100 flex-col gap-2.5 rounded-sm border p-4 text-xs shadow-md">
              <WeatherContent />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};

export const WeatherContent = () => {
  const [query, setQuery] = useState('');
  const { city, weather, setCity } = useWeatherState();
  const { data, isFetching: loading, error } = weather;
  const days = getDays(data);
  const currentCity = data?.city?.name ?? city ?? '';

  const renderDays = useMemo(
    () =>
      days.map((dayData) => {
        const [, month, day] = dayData.dt_txt.split(' ')[0].split('-');
        const Icon = getWeatherIconByCode(dayData.weather?.[0]?.icon ?? '01d');

        return (
          <div key={`${dayData.dt}-${dayData.dt_txt}`} className="p-4 pb-0">
            <div className="flex flex-col gap-3">
              <TypographySmall
                className="text-[12px] font-bold"
                text={`${day}/${month}`}
              />
              <div className="flex flex-col items-center gap-2">
                {createElement(Icon, {
                  className: 'text-muted-foreground mx-auto h-8 w-8',
                })}
                <TypographySmall
                  className="text-2xl font-bold"
                  text={`${Math.round(dayData.main.temp)}°C`}
                />
              </div>
            </div>
          </div>
        );
      }),
    [days]
  );

  const handleSearch = () => {
    const next = query.trim();
    if (next) setCity(next);
  };

  return (
    <>
      <TypographySmall
        text={`Current city: ${currentCity}`}
        className="!leading-5"
      />
      <div className="flex w-full items-center gap-2">
        <Input
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value)
          }
          onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
          placeholder="Search city..."
        />
        <Button onClick={handleSearch} className="w-fit rounded-sm py-[17px]">
          Search
        </Button>
      </div>
      <div className="flex h-[94px] items-center justify-between">
        {renderDays}
        {loading && <Skeleton className="h-[94px] w-full" />}
      </div>
      {error && <TypographySmall text={(error as Error).message} />}
    </>
  );
};

const WeatherSearch = () => {
  const { weather } = useWeatherState();
  const current = weather.data?.list?.[0];
  const currentTemp = current ? `${Math.floor(current.main.temp)}°C` : '—';
  const Icon = getWeatherIconByCode(current?.weather?.[0]?.icon ?? '01d');

  return (
    <div className="flex min-w-16 cursor-pointer items-center gap-1">
      {!weather.isFetching ? (
        <>
          {createElement(Icon, {
            size: 24,
            className: 'text-muted-foreground',
          })}
          <TypographySmall text={currentTemp} className="!leading-5" />
        </>
      ) : (
        <Skeleton className="h-6 w-24 rounded-md" />
      )}
    </div>
  );
};
