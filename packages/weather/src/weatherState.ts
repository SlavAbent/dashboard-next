'use client';

import { useQuery } from '@tanstack/react-query';
import { create } from 'zustand';

import { getCoordsByCity, getWeatherByCoords } from './api';
import type { Coords } from './types';

const DEFAULT_COORDS: Coords = {
  lat: 59.9343,
  lon: 30.3351,
};

function useCurrentCoords() {
  return useQuery<Coords>({
    queryKey: ['weather', 'geo'],
    queryFn: () =>
      new Promise<Coords>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('No geolocation'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            }),
          reject,
          { timeout: 5000, enableHighAccuracy: true, maximumAge: 0 }
        );
      }),
    retry: 2,
    refetchOnMount: 'always',
  });
}

function useGeocodeCity(city: string | null) {
  return useQuery({
    queryKey: ['weather', 'geocode', city],
    queryFn: () => getCoordsByCity(city!),
    enabled: Boolean(city),
    staleTime: 1000 * 60 * 60,
  });
}

function useWeather(coords: Coords | null) {
  return useQuery({
    queryKey: ['weather', 'forecast', coords],
    queryFn: () => getWeatherByCoords(coords!),
    enabled: Boolean(coords),
    staleTime: 1000 * 60 * 60,
  });
}

type CityState = {
  city: string | null;
  setCity: (city: string | null) => void;
};

const useCityStore = create<CityState>((set) => ({
  city: null,
  setCity: (city) => set({ city }),
}));

export const useWeatherState = () => {
  const city = useCityStore((state) => state.city);
  const setCity = useCityStore((state) => state.setCity);
  const geocode = useGeocodeCity(city);
  const { data: currentCoords } = useCurrentCoords();
  const coords = city
    ? (geocode.data ?? null)
    : (currentCoords ?? DEFAULT_COORDS);
  const forecast = useWeather(coords);

  return {
    city,
    setCity,
    weather: {
      ...forecast,
      error: geocode.error ?? forecast.error,
      isFetching: geocode.isFetching || forecast.isFetching,
    },
  };
};
