'use client';

import cn from 'clsx';
import Link from 'next/link';

import { useAsideStore } from '@/entities/aside/model/aside.store';
import { TypographyP } from '@/shared/components/Typography/TypographyP';
import { iconSize } from '@/shared/icons/iconSize';
import { LogoIcon } from '@/shared/icons/ui/LogoIcon';
import { ToggleIcon } from '@/shared/icons/ui/ToggleIcon';

const transition = 'duration-500 ease-in-out';

export const AsideHeader = () => {
  const collapsed = useAsideStore((state) => state.collapsed);
  const toggle = useAsideStore((state) => state.toggle);

  return (
    <header
      className={cn(
        'border-bottom bg-sidebar relative flex w-full flex-col px-3 py-5'
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
        onClick={toggle}
        className="absolute top-1/2 -right-[14px] -translate-y-1/2 cursor-pointer">
        <ToggleIcon size={iconSize(28)} className="text-muted-foreground" />
      </button>
    </header>
  );
};
