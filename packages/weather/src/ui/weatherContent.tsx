'use client';

import { type ChangeEvent, useState } from 'react';

import { getForecastDays } from '../lib/getForecastDays';
import { useWeatherState } from '../weatherState';
import { WeatherForecastDays } from './weatherForecastDays';
import {
  WeatherButton,
  WeatherInput,
  WeatherSkeleton,
  WeatherText,
} from './weatherPrimitives';

export const WeatherContent = () => {
  const [query, setQuery] = useState('');
  const { city, weather, setCity } = useWeatherState();
  const { data, isFetching: loading, error } = weather;
  const days = getForecastDays(data);
  const currentCity = data?.city?.name ?? city ?? '';

  const handleSearch = () => {
    const next = query.trim();
    if (next) setCity(next);
  };

  return (
    <>
      <WeatherText className="!leading-5">
        Current city: {currentCity}
      </WeatherText>
      <div className="flex w-full items-center gap-2">
        <WeatherInput
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuery(event.target.value)
          }
          onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
          placeholder="Search city..."
        />
        <WeatherButton
          onClick={handleSearch}
          className="w-fit rounded-sm py-[17px]">
          Search
        </WeatherButton>
      </div>
      <div className="flex min-h-[94px] items-center justify-between overflow-x-auto">
        <WeatherForecastDays days={days} />
        {loading && <WeatherSkeleton className="h-[94px] w-full" />}
      </div>
      {error && <WeatherText>{(error as Error).message}</WeatherText>}
    </>
  );
};
