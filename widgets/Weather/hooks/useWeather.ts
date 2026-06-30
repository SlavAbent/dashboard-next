import { useQuery } from '@tanstack/react-query';

import { getWeatherByCoords } from '@/widgets/Weather/_api/api';
import { Coords } from '@/widgets/Weather/types/weather.types';

export function useWeather(coords: Coords | null) {
  return useQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeatherByCoords(coords!),
    enabled: !!coords,
    staleTime: 1000 * 60 * 60,
  });
}
