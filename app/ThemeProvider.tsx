'use client';

import React, { useEffect } from 'react';

import { resolveIsDark } from '@/shared/lib/theme';
import { useThemeStore } from '@/shared/store/themeStore';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    const syncTheme = () => {
      const theme = useThemeStore.getState().theme;
      const isDark = resolveIsDark(theme);

      document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
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
