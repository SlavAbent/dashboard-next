import { useMemo } from 'react';
import { OpenWeatherForecastResponse } from '@/widgets/Weather/types';

export const getDays = (data: OpenWeatherForecastResponse) =>
  useMemo(() => {
    if (!data?.list) return [];

    const map = new Map<string, any>();

    for (const item of data.list) {
      const day = item.dt_txt.split(' ')[0];

      if (!map.has(day) && item.dt_txt.includes('12:00:00')) {
        map.set(day, item);
      }
    }

    return Array.from(map.values()).slice(0, 5);
  }, [data]);
