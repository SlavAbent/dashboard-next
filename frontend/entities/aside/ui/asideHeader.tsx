'use client';

import { iconSize, LogoIcon, ToggleIcon, TypographyP } from '@dashboard/ui';
import cn from 'clsx';
import Link from 'next/link';

import { useAsideStore } from '@/entities/aside/model/aside.store';

const transition = 'duration-500 ease-in-out';

export const AsideHeader = () => {
  const collapsed = useAsideStore((state) => state.collapsed);
  const toggle = useAsideStore((state) => state.toggle);

  return (
    <header
      className={cn(
        'border-bottom bg-sidebar relative flex min-h-14 w-full flex-col justify-center px-3 md:h-[69px] md:min-h-[69px]'
      )}>
      <Link
        href="/"
        className={cn(
          'group flex items-center overflow-hidden',
          collapsed ? 'w-10' : 'w-full',
          'transition-[width]',
          transition
        )}>
        <LogoIcon className="text-foreground h-6 w-7 shrink-0" />

        <TypographyP
          text="Venture"
          className={cn(
            'text-foreground shrink-0 overflow-hidden whitespace-nowrap',
            'transition-[max-width,margin-left,opacity]',
            transition,
            collapsed
              ? 'pointer-events-none ml-0 max-w-0 opacity-0'
              : 'ml-3 max-w-[180px] opacity-100'
          )}
        />
      </Link>

      <button
        type="button"
        aria-label="Toggle navigation"
        onClick={toggle}
        className="absolute top-1/2 -right-[14px] hidden -translate-y-1/2 cursor-pointer lg:block">
        <ToggleIcon size={iconSize(28)} className="text-muted-foreground" />
      </button>
    </header>
  );
};
