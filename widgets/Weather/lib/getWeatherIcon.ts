import type { LucideIcon } from 'lucide-react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  CloudHail,
  CloudRainWind,
} from 'lucide-react';

export const getWeatherIconByCode = (icon: string): LucideIcon => {
  switch (icon) {
    // CLEAR
    case '01d':
      return Sun;

    case '01n':
      return Moon;

    // CLOUDS
    case '02d':
      return CloudSun;

    case '02n':
      return CloudMoon;

    // CLOUDS
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return Cloud;

    // DRIZZLE
    case '09d':
    case '09n':
      return CloudDrizzle;

    // RAIN
    case '10d':
    case '10n':
      return CloudRain;

    // HEAVY RAIN / windy rain
    case '10-strong':
      return CloudRainWind;

    // THUNDERSTORM
    case '11d':
    case '11n':
      return CloudLightning;

    // SNOW
    case '13d':
    case '13n':
      return CloudSnow;

    // ATMOSPHERE
    case '50d':
    case '50n':
      return CloudFog;

    // extra semantic fallback
    case 'wind':
      return Wind;

    case 'hail':
      return CloudHail;

    default:
      return Cloud;
  }
};
