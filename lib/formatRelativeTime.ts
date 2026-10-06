const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 1000 * 60 * 60 * 24 * 365],
  ['month', 1000 * 60 * 60 * 24 * 30],
  ['day', 1000 * 60 * 60 * 24],
  ['hour', 1000 * 60 * 60],
  ['minute', 1000 * 60],
];

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export const formatRelativeTime = (isoDate: string): string => {
  const diff = new Date(isoDate).getTime() - Date.now();

  for (const [unit, ms] of UNITS) {
    if (Math.abs(diff) >= ms) {
      return rtf.format(Math.round(diff / ms), unit);
    }
  }

  return rtf.format(Math.round(diff / 1000), 'second');
};
