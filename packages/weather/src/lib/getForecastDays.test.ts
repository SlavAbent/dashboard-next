import type { OpenWeatherForecastResponse } from '../types';
import { getForecastDays } from './getForecastDays';

const forecastItem = (dt: number, dt_txt: string) => ({
  dt,
  dt_txt,
  main: { temp: 10 },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
});

describe('getForecastDays', () => {
  it('selects one noon forecast per day and limits the result to five days', () => {
    const list = Array.from({ length: 6 }, (_, index) => [
      forecastItem(index * 2, `2026-12-0${index + 1} 09:00:00`),
      forecastItem(index * 2 + 1, `2026-12-0${index + 1} 12:00:00`),
    ]).flat();

    expect(
      getForecastDays({ list } satisfies OpenWeatherForecastResponse)
    ).toHaveLength(5);
    expect(
      getForecastDays({ list } satisfies OpenWeatherForecastResponse).every(
        (item) => item.dt_txt.endsWith('12:00:00')
      )
    ).toBe(true);
  });

  it('returns an empty collection without forecast data', () => {
    expect(getForecastDays(undefined)).toEqual([]);
  });
});
