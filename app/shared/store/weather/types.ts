export type WeatherState = {
  city: string;
  query: string;
  data: any;
  loading: boolean;
  error: string;
  setQuery: (q: string) => void;
  setCity: (c: string) => void;
  fetchWeather: (city: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
};
