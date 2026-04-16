import { z } from 'zod';

export const OpenWeatherForecastResponseSchema = z.object({
  city: z
    .object({
      name: z.string().optional(),
      country: z.string().optional(),
      timezone: z.number().optional(),
    })
    .optional(),
  list: z
    .array(
      z.object({
        dt: z.number(),
        dt_txt: z.string(),
        main: z.object({
          temp: z.number(),
          feels_like: z.number().optional(),
          temp_min: z.number().optional(),
          temp_max: z.number().optional(),
          humidity: z.number().optional(),
        }),
        weather: z.array(
          z.object({
            id: z.number(),
            main: z.string(),
            description: z.string(),
            icon: z.string(),
          })
        ),
      })
    )
    .optional(),
});

export type OpenWeatherForecastResponse = z.infer<
  typeof OpenWeatherForecastResponseSchema
>;

export type WeatherState = {
  city: string;
  query: string;
  data: OpenWeatherForecastResponse | null;
  loading: boolean;
  error: string;
  setQuery: (q: string) => void;
  setCity: (c: string) => void;
  fetchWeather: (city: string) => Promise<void>;
  fetchWeatherByCoords: (lat: number, lon: number) => Promise<void>;
};
