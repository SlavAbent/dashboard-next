export const themes = [
  'light',
  'dark',
  'device',
  'yellow',
  'green',
  'red',
] as const;

export type Theme = (typeof themes)[number];

export const isTheme = (value: unknown): value is Theme =>
  typeof value === 'string' && themes.includes(value as Theme);

export function getScheduledTheme(): 'light' | 'dark' {
  const hour = new Date().getHours();

  return hour >= 9 && hour < 20 ? 'light' : 'dark';
}

export function resolveIsDark(theme: Theme): boolean {
  if (theme === 'dark') return true;
  if (theme !== 'device') return false;

  return getScheduledTheme() === 'dark';
}
