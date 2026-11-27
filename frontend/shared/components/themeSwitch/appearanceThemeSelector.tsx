import { cn } from '@lib/cn';
import type { Theme } from '@lib/theme';

import { appearanceOptions } from '@/shared/components/themeSwitch/themeSwitchOptions';

type AppearanceThemeSelectorProps = {
  theme: Theme;
  onSelect: (theme: Theme) => void;
};

export const AppearanceThemeSelector = ({
  theme,
  onSelect,
}: AppearanceThemeSelectorProps) => {
  const activeIndex = appearanceOptions.findIndex(
    (option) => option.value === theme
  );

  return (
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
            activeIndex < 0 && 'opacity-0'
          )}
          style={{
            transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
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
              onClick={() => onSelect(option.value)}
              className="text-muted-foreground aria-pressed:text-foreground relative z-10 flex h-8 cursor-pointer items-center justify-center rounded-md transition-colors duration-300">
              <Icon aria-hidden className="size-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
