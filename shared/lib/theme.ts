export type Theme = 'light' | 'dark' | 'device';

export function getScheduledTheme(): 'light' | 'dark' {
  const hour = new Date().getHours();

  return hour >= 9 && hour < 20 ? 'light' : 'dark';
}

export function resolveIsDark(theme: Theme): boolean {
  if (theme === 'dark') return true;
  if (theme === 'light') return false;

  return getScheduledTheme() === 'dark';
}
