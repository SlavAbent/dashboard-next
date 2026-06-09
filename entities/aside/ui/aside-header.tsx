'use client';

import { useAsideStore } from '@/entities/aside/model/aside.store';
import Link from 'next/link';
import { ToggleIcon } from '@/shared/icons/ui/ToggleIcon';
import { LogoIcon } from '@/shared/icons/ui/LogoIcon';
import { TypographyP } from '@/shared/components/Typography/TypographyP';
import { iconSize } from '@/shared/icons/iconSize';
import cn from 'clsx';

const transition = 'duration-300 ease-in-out';

export const AsideHeader = () => {
  const collapsed = useAsideStore((state) => state.collapsed);
  const toggle = useAsideStore((state) => state.toggle);

  return (
    <header
      className={cn(
        'border-bottom bg-muted-background dark:bg-background relative flex w-full flex-col transition-[width,padding]',
        transition,
        collapsed
          ? 'w-16 items-center px-0 py-5'
          : 'w-[250px] items-start px-7 py-5'
      )}>
      <Link href="/" className="flex items-center">
        <LogoIcon className="text-foreground h-6 w-7 shrink-0" />

        <TypographyP
          text="Venture"
          className={cn(
            'text-foreground overflow-hidden whitespace-nowrap transition-[max-width,margin,opacity]',
            transition,
            collapsed
              ? 'ml-0 max-w-0 opacity-0'
              : 'ml-3 max-w-[140px] opacity-100'
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
