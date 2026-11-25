'use client';

import { cn } from '@lib/cn';
import type { Theme } from '@lib/theme';
import { CircleUserRound, Laptop, LogOut, MoonStar, Sun } from 'lucide-react';
import React from 'react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/avatar/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/dropdown/ui/dropdownMenu';
import { useThemeStore } from '@/shared/store/themeStore';

const appearanceOptions: Array<{
  value: Theme;
  label: string;
  icon: typeof Sun;
}> = [
  { value: 'light', label: 'Светлая', icon: Sun },
  { value: 'dark', label: 'Тёмная', icon: MoonStar },
  { value: 'device', label: 'Системная', icon: Laptop },
];

const colorOptions: Array<{
  value: Extract<Theme, 'yellow' | 'green' | 'red'>;
  label: string;
  swatchClassName: string;
}> = [
  { value: 'yellow', label: 'Жёлтая', swatchClassName: 'bg-yellow-300' },
  { value: 'green', label: 'Зелёная', swatchClassName: 'bg-green-300' },
  { value: 'red', label: 'Красная', swatchClassName: 'bg-red-300' },
];

const formatUserName = (name: string) => {
  const [firstName = '', ...rest] = name.trim().split(/\s+/);
  const lastName = rest.at(-1);
  const initial = firstName.charAt(0).toUpperCase();

  if (!lastName) return `${initial}.`;

  return `${initial}.${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`;
};

type ThemeSwitchProps = {
  user?: {
    image?: string | null;
    name?: string | null;
  };
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
  const userName = user?.name?.trim() || 'Пользователь';
  const displayName = formatUserName(userName);
  const avatarName = userName.charAt(0).toUpperCase();
  const activeAppearanceIndex = appearanceOptions.findIndex(
    (option) => option.value === theme
  );
  const activeColorIndex = colorOptions.findIndex(
    (option) => option.value === theme
  );

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
        {user ? (
          <Avatar className="size-8">
            <AvatarImage src={user.image ?? ''} alt={userName} />
            <AvatarFallback>{avatarName}</AvatarFallback>
          </Avatar>
        ) : (
          <CircleUserRound aria-hidden className="size-6" />
        )}
        {user && (
          <span
            aria-hidden={!showUserName}
            className={cn(
              'shrink-0 overflow-hidden text-sm font-medium whitespace-nowrap',
              'transition-[max-width,margin-left,opacity] duration-500 ease-in-out',
              showUserName
                ? 'ml-3 max-w-28 opacity-100'
                : 'pointer-events-none ml-0 max-w-0 opacity-0'
            )}>
            {displayName}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        className="w-56 overflow-hidden p-2">
        {user && (
          <div className="flex min-w-0 items-center gap-2 px-1 py-1.5">
            <Avatar className="size-8">
              <AvatarImage src={user.image ?? ''} alt="" />
              <AvatarFallback>{avatarName}</AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">
              {userName}
            </span>
          </div>
        )}

        {user && <DropdownMenuSeparator className="my-2" />}

        <div className="px-1 pb-2">
          <span className="text-muted-foreground text-xs">Оформление</span>
          <div
            role="group"
            aria-label="Режим темы"
            className="bg-muted relative mt-2 grid grid-cols-3 rounded-lg p-1">
            <span
              aria-hidden
              className={cn(
                'bg-background pointer-events-none absolute inset-y-1 left-1 w-[calc((100%_-_0.5rem)/3)] rounded-md shadow-sm',
                'transition-[transform,opacity] duration-300 ease-out',
                activeAppearanceIndex < 0 && 'opacity-0'
              )}
              style={{
                transform: `translateX(${Math.max(activeAppearanceIndex, 0) * 100}%)`,
              }}
            />
            {appearanceOptions.map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-label={option.label}
                  aria-pressed={theme === option.value}
                  title={option.label}
                  onClick={() => selectTheme(option.value)}
                  className="text-muted-foreground aria-pressed:text-foreground relative z-10 flex h-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-300">
                  <Icon aria-hidden className="size-4" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-1 pb-1">
          <span className="text-muted-foreground text-xs">
            Цветовая палитра
          </span>
          <div
            role="group"
            aria-label="Цветовая палитра"
            className="bg-muted relative mt-2 grid grid-cols-3 rounded-full p-1">
            <span
              aria-hidden
              className={cn(
                'bg-background pointer-events-none absolute inset-y-1 left-1 w-[calc((100%_-_0.5rem)/3)] rounded-full shadow-sm',
                'transition-[transform,opacity] duration-300 ease-out',
                activeColorIndex < 0 && 'opacity-0'
              )}
              style={{
                transform: `translateX(${Math.max(activeColorIndex, 0) * 100}%)`,
              }}
            />
            {colorOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-label={option.label}
                aria-pressed={theme === option.value}
                title={option.label}
                onClick={() => selectTheme(option.value)}
                className="group relative z-10 flex h-8 cursor-pointer items-center justify-center rounded-full">
                <span
                  aria-hidden
                  className={cn(
                    'size-4 rounded-full border border-black/10 transition-transform duration-300',
                    'group-hover:scale-110',
                    option.swatchClassName,
                    theme === option.value && 'scale-110 ring-2 ring-current/20'
                  )}
                />
              </button>
            ))}
          </div>
        </div>

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
