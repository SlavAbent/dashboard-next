import { cn } from '@lib/cn';
import type { Theme } from '@lib/theme';

import { colorOptions } from '@/shared/components/themeSwitch/themeSwitchOptions';

type ColorThemeSelectorProps = {
  theme: Theme;
  onSelect: (theme: Theme) => void;
};

export const ColorThemeSelector = ({
  theme,
  onSelect,
}: ColorThemeSelectorProps) => {
  const activeIndex = colorOptions.findIndex(
    (option) => option.value === theme
  );

  return (
    <div className="px-1 pb-1">
      <span className="text-muted-foreground text-xs">Цветовая палитра</span>
      <div
        role="group"
        aria-label="Цветовая палитра"
        className="bg-muted relative mt-2 grid grid-cols-3 rounded-full p-1">
        <span
          aria-hidden
          className={cn(
            'bg-background pointer-events-none absolute inset-y-1 left-1 w-[calc((100%_-_0.5rem)/3)] rounded-full shadow-sm',
            'transition-[transform,opacity] duration-300 ease-out',
            activeIndex < 0 && 'opacity-0'
          )}
          style={{
            transform: `translateX(${Math.max(activeIndex, 0) * 100}%)`,
          }}
        />
        {colorOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-label={option.label}
            aria-pressed={theme === option.value}
            title={option.label}
            onClick={() => onSelect(option.value)}
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
  );
};
