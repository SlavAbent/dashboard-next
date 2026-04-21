import { useQuery } from '@tanstack/react-query';
import { getWeatherByCoords } from '@/widgets/Weather/_api/api';
import { Coords } from '@/widgets/Weather/types';

export function useWeather(coords: Coords | null) {
  return useQuery({
    queryKey: ['weather', coords?.lat, coords?.lon],
    queryFn: () => getWeatherByCoords(coords!),
    enabled: !!coords,
    staleTime: 1000 * 60 * 60,
  });
}
