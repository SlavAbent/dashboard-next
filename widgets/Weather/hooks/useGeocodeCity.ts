import { useQuery } from '@tanstack/react-query';
import { getCoordsByCity } from '@/widgets/Weather/_api/api';

export function useGeocodeCity(city: string | null) {
  return useQuery({
    queryKey: ['geocode', city],
    queryFn: () => getCoordsByCity(city!),
    enabled: !!city,
    staleTime: 1000 * 60 * 60,
  });
}
