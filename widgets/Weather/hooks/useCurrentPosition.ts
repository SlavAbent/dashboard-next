import { useQuery } from '@tanstack/react-query';
import { Coords } from '../types';

function getCurrentPosition(): Promise<Coords> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('No geolocation'));
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      resolve({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    }, reject);
  });
}

export function useCurrentCoords() {
  return useQuery({
    queryKey: ['geo'],
    queryFn: getCurrentPosition,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });
}
