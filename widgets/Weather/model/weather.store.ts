import { create } from 'zustand';
import { WeatherState } from './types';
import {
  API_KEY,
  defaultWeatherApi,
  weatherApi,
} from './_api';

export const useWeatherStore = create<WeatherState>((set) => ({
  city: 'Los Angeles',
  query: 'Los Angeles',
  data: null,
  loading: false,
  error: '',
  setQuery: (q) => set({ query: q }),
  setCity: (c) => set({ city: c }),
  fetchWeather: async (target: string) => {
    try {
      set({ loading: true, error: '' });

      const geo = await fetch(
        `${weatherApi}direct?q=${encodeURIComponent(target)}&limit=1&appid=${API_KEY}`
      ).then((r) => r.json());

      if (!geo?.length) {
        throw new Error('City not found');
      }

      const { lat, lon, name } = geo[0];

      const res = await fetch(
        `${defaultWeatherApi}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const json = await res.json();
      set({
        city: name,
        data: json,
        loading: false,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'error';
      set({ loading: false, error: message });
    }
  },
  fetchWeatherByCoords: async (lat, lon) => {
    try {
      set({ loading: true, error: '' });

      const res = await fetch(
        `${defaultWeatherApi}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const json = await res.json();

      const cityName = json?.city?.name || 'Unknown';

      set({
        city: cityName,
        query: cityName,
        data: json,
        loading: false,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'error';
      set({
        loading: false,
        error: message,
      });
    }
  },
}));
