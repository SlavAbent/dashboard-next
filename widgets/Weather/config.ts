import { OpenWeatherForecastResponse } from '@/widgets/Weather/types';

export function getDays(data: OpenWeatherForecastResponse | undefined) {
  if (!data?.list) return [];

  type ListItem = NonNullable<OpenWeatherForecastResponse['list']>[number];
  const map = new Map<string, ListItem>();

  for (const item of data.list) {
    const day = item.dt_txt.split(' ')[0];

    if (!map.has(day) && item.dt_txt.includes('12:00:00')) {
      map.set(day, item);
    }
  }

  return Array.from(map.values()).slice(0, 5);
}
