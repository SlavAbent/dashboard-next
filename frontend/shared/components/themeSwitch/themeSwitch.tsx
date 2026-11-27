'use client';

import { cn } from '@lib/cn';
import type { Theme } from '@lib/theme';
import { LogOut } from 'lucide-react';
import React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/dropdown/ui/dropdownMenu';
import { AppearanceThemeSelector } from '@/shared/components/themeSwitch/appearanceThemeSelector';
import { ColorThemeSelector } from '@/shared/components/themeSwitch/colorThemeSelector';
import type { ThemeSwitchUser } from '@/shared/components/themeSwitch/themeSwitch.types';
import {
  ThemeSwitchMenuUser,
  ThemeSwitchTriggerUser,
} from '@/shared/components/themeSwitch/themeSwitchUser';
import { useThemeStore } from '@/shared/store/themeStore';

type ThemeSwitchProps = {
  user?: ThemeSwitchUser;
  onLogout?: () => void;
  showUserName?: boolean;
};

export const ThemeSwitch = ({
  user,
  onLogout,
  showUserName = false,
}: ThemeSwitchProps) => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const selectTheme = (nextTheme: Theme) => {
    if (nextTheme === theme) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      setTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => setTheme(nextTheme));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Открыть меню пользователя и тем"
        title="Профиль и темы"
        className={cn(
          'interactive-hover inline-flex h-10 w-full items-center overflow-hidden p-1',
          'rounded-md transition-[background-color,box-shadow] outline-none',
          'focus-visible:ring-ring focus-visible:ring-2'
        )}>
        <ThemeSwitchTriggerUser user={user} showUserName={showUserName} />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        className="w-56 overflow-hidden p-2">
        {user && <ThemeSwitchMenuUser user={user} />}

        {user && <DropdownMenuSeparator className="my-2" />}

        <AppearanceThemeSelector theme={theme} onSelect={selectTheme} />
        <ColorThemeSelector theme={theme} onSelect={selectTheme} />

        {user && onLogout && (
          <>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem
              variant="destructive"
              onClick={onLogout}
              className="cursor-pointer rounded-md">
              <LogOut aria-hidden />
              Выйти
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
