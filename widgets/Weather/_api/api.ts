import {
  API_KEY,
  defaultWeatherApi,
  weatherApi,
} from '@/widgets/Weather/_api/constants';
import { Coords } from '@/widgets/Weather/types/weather.types';

export async function getCoordsByCity(city: string): Promise<Coords> {
  const res = await fetch(
    `${weatherApi}direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error('City lookup failed');
  }

  const data = await res.json();

  if (!data?.length) {
    throw new Error('City not found');
  }

  const coords = data[0];

  if (!coords?.lat || !coords?.lon) {
    throw new Error(`Invalid geocode response for: "${city}"`);
  }

  return {
    lat: coords.lat,
    lon: coords.lon,
  };
}

export async function getWeatherByCoords({ lat, lon }: Coords) {
  const res = await fetch(
    `${defaultWeatherApi}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to load weather');
  }

  return res.json();
}
