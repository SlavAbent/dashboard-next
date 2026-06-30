'use client';

import { MoonStar, Sun } from 'lucide-react';
import React from 'react';

import { cn } from '@/shared/lib/cn';
import { useThemeStore } from '@/shared/store/theme-store';

export const ThemeSwitch = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Light theme' : 'Dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'bg-input relative inline-flex h-6 w-[46px] shrink-0 cursor-pointer items-center rounded-full border border-transparent p-0.5 transition-colors',
        'focus-visible:ring-ring focus-visible:ring-1 focus-visible:outline-none'
      )}>
      <Sun
        aria-hidden
        className={cn(
          'pointer-events-none absolute left-1.5 size-3.5 transition-colors',
          isDark ? 'text-muted-foreground' : 'text-foreground'
        )}
      />
      <MoonStar
        aria-hidden
        className={cn(
          'pointer-events-none absolute right-1.5 size-3.5 transition-colors',
          isDark ? 'text-foreground' : 'text-muted-foreground'
        )}
      />
      <span
        aria-hidden
        className={cn(
          'bg-background pointer-events-none block size-5 rounded-full shadow-sm transition-transform duration-200',
          isDark ? 'translate-x-[20px]' : 'translate-x-0'
        )}
      />
    </button>
  );
};
