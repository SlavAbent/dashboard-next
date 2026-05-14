import { useQuery } from '@tanstack/react-query';
import { Coords } from '@/widgets/Weather/types/weather.types';

function getCurrentPosition(): Promise<Coords> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('No geolocation'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        reject(err);
      },
      {
        timeout: 5000,
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
  });
}

export function useCurrentCoords() {
  return useQuery({
    queryKey: ['geo'],
    queryFn: getCurrentPosition,
    retry: 2,
    refetchOnMount: 'always',
  });
}
