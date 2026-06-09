'use client';

import React from 'react';
import { useThemeStore } from '@/shared/store/theme-store';
import { Switch } from '@/shared/components/Switch/switch';
import { MoonStar, Sun } from 'lucide-react';

const AsideFooter = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const isDark = theme === 'dark';
  const isDarkIcon = !isDark ? 'text-foreground' : 'text-muted-foreground';

  return (
    <div className="bg-sidebar flex grow items-end justify-center px-3 py-5">
      <div className="flex items-center gap-2">
        {isDark ? (
          <MoonStar className={isDarkIcon} />
        ) : (
          <Sun className={isDarkIcon} />
        )}

        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        />
      </div>
    </div>
  );
};

export default AsideFooter;
