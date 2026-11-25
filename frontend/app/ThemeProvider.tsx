'use client';

import { isTheme, resolveIsDark } from '@lib/theme';
import React, { useEffect } from 'react';

import { useThemeStore } from '@/shared/store/themeStore';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    const syncTheme = () => {
      const storedTheme = useThemeStore.getState().theme;
      const theme = isTheme(storedTheme) ? storedTheme : 'device';
      const isDark = resolveIsDark(theme);

      document.documentElement.dataset.theme =
        theme === 'device' ? (isDark ? 'dark' : 'light') : theme;
    };

    syncTheme();

    const unsubscribeStore = useThemeStore.subscribe(syncTheme);
    const unsubscribeHydration =
      useThemeStore.persist.onFinishHydration(syncTheme);

    return () => {
      unsubscribeStore();
      unsubscribeHydration();
    };
  }, []);

  return children;
};
