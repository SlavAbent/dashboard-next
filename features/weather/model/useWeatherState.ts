import { useState } from 'react';

import { DEFAULT_COORDS } from '@/features/weather/config/constants';
import { useCurrentCoords } from '@/features/weather/model/useCurrentPosition';
import { useGeocodeCity } from '@/features/weather/model/useGeocodeCity';
import { useWeather } from '@/features/weather/model/useWeather';

export const useWeatherState = () => {
  const [city, setCity] = useState<string | null>(null);

  const { data: geocodeCoords } = useGeocodeCity(city);
  const { data: currentCoords } = useCurrentCoords();

  const coords = geocodeCoords ?? currentCoords ?? DEFAULT_COORDS;

  return {
    city,
    setCity,
    weather: useWeather(coords),
  };
};
