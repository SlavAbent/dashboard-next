import {
  type Coords,
  type OpenWeatherForecastResponse,
  OpenWeatherForecastResponseSchema,
} from './types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY as string;
const GEOCODE_API = 'https://api.openweathermap.org/geo/1.0/';
const FORECAST_API = 'https://api.openweathermap.org/data/2.5/forecast';

export async function getCoordsByCity(city: string): Promise<Coords> {
  const response = await fetch(
    `${GEOCODE_API}direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('City lookup failed');
  }

  const data = await response.json();
  const coords = data?.[0];

  if (!coords) {
    throw new Error('City not found');
  }

  if (typeof coords.lat !== 'number' || typeof coords.lon !== 'number') {
    throw new Error(`Invalid geocode response for: "${city}"`);
  }

  return { lat: coords.lat, lon: coords.lon };
}

export async function getWeatherByCoords({
  lat,
  lon,
}: Coords): Promise<OpenWeatherForecastResponse> {
  const response = await fetch(
    `${FORECAST_API}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to load weather');
  }

  return OpenWeatherForecastResponseSchema.parse(await response.json());
}
