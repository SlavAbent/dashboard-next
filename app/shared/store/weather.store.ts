import { create } from 'zustand';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;

type WeatherState = {
  city: string;
  query: string;
  data: any;
  loading: boolean;
  error: string;
  setQuery: (q: string) => void;
  setCity: (c: string) => void;
  fetchWeather: (city: string) => Promise<void>;
};

export const useWeatherStore = create<WeatherState>((set, get) => ({
  city: 'Saint Petersburg',
  query: 'Saint Petersburg',
  data: null,
  loading: false,
  error: '',
  setQuery: (q) => set({ query: q }),
  setCity: (c) => set({ city: c }),
  fetchWeather: async (target: string) => {
    try {
      set({ loading: true, error: '' });

      const geo = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(target)}&limit=1&appid=${API_KEY}`
      ).then((r) => r.json());

      if (!geo?.length) {
        throw new Error('City not found');
      }

      const { lat, lon, name } = geo[0];

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      const json = await res.json();
      set({
        city: name,
        data: json,
        loading: false,
      });
    } catch (e: any) {
      set({ loading: false, error: e.message || 'Error' });
    }
  },
}));
