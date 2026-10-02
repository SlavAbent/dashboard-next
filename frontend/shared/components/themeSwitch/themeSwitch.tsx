'use client';

import { Laptop, MoonStar, Sun } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/cn';
import { useThemeStore } from '@/shared/store/themeStore';

export const ThemeSwitch = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      return;
    }

    if (theme === 'dark') {
      setTheme('device');
      return;
    }

    setTheme('light');
  };

  const Icon = {
    light: Sun,
    dark: MoonStar,
    device: Laptop,
  }[theme];

  return (
    <button
      type="button"
      aria-label="Переключить тему"
      title="Переключить тему"
      onClick={cycleTheme}
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center',
        'rounded-md transition-colors',
        'bg-accent text-foreground hover:opacity-80'
      )}>
      <Icon aria-hidden className="size-4" />
    </button>
  );
};
