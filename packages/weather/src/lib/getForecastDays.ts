import type { OpenWeatherForecastResponse } from '../types';

export const getForecastDays = (
  data: OpenWeatherForecastResponse | undefined
) => {
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
