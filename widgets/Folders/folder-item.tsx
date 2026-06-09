'use client';

import React from 'react';
import { normalizePath } from '@/shared/config/normalizePath';
import Link from 'next/link';
import { cn } from '@/shared/lib/cn';
import { SvgIcon } from '@/shared/icons/SvgIcon';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import { FolderItemProps } from '@/entities/navigation/model/types';
import { usePathname } from 'next/navigation';
import { CardItem } from '@/shared/components/CardItem/card-item';
import { useAsideStore } from '@/entities/aside/model/aside.store';

const transition = 'duration-300 ease-in-out';

export const FolderItem = ({ name, icon }: FolderItemProps) => {
  const collapsed = useAsideStore((state) => state.collapsed);
  const pathname = usePathname();
  const { isActive, href } = normalizePath(pathname, name);

  const activeClass = isActive
    ? 'text-primary dark:text-black'
    : 'text-muted-foreground group-hover:text-primary dark:group-hover:text-black';

  return (
    <Link href={href}>
      <CardItem
        className={cn(
          'group flex items-center overflow-hidden',
          'transition-[width,padding,gap]',
          transition,
          collapsed
            ? 'h-9 w-9 justify-center gap-0 p-0'
            : 'w-[216px] gap-3 px-4',
          isActive && 'bg-neutral-50 text-primary dark:bg-neutral-50 dark:text-black'
        )}>
        <SvgIcon
          icon={icon}
          className={cn('shrink-0 transition-colors', transition, activeClass)}
        />

        <TypographySmall
          text={name}
          className={cn(
            'overflow-hidden whitespace-nowrap',
            'transition-[max-width,opacity]',
            transition,
            collapsed ? 'max-w-0 opacity-0' : 'max-w-[150px] opacity-100',
            activeClass
          )}
        />
      </CardItem>
    </Link>
  );
};
