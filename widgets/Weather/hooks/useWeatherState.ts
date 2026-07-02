import { useState } from 'react';

import { DEFAULT_COORDS } from '@/widgets/Weather/constants';
import { useCurrentCoords } from '@/widgets/Weather/hooks/useCurrentPosition';
import { useGeocodeCity } from '@/widgets/Weather/hooks/useGeocodeCity';
import { useWeather } from '@/widgets/Weather/hooks/useWeather';

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
