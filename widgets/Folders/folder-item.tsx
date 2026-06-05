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

export const FolderItem = ({
  id,
  collapsed,
  name,
  icon,
}: FolderItemProps & {
  collapsed: boolean;
}) => {
  const pathname = usePathname();
  const { isActive, href } = normalizePath(pathname, name);

  const itemClass = collapsed
    ? 'h-9 w-9 justify-center gap-0 p-0'
    : 'w-[216px] justify-start gap-3 px-4';

  const labelClass = collapsed
    ? 'ml-0 max-w-0 opacity-0'
    : 'max-w-[150px] text-sm opacity-100';

  const animatedClass = 'transition-all duration-300 ease-in-out';

  const activeText = (isActive: boolean) => {
    return isActive ? 'text-black' : 'text-neutral-80 group-hover:text-black';
  };

  return (
    <Link key={id} href={href} className="block">
      <CardItem
        className={cn(
          'group flex items-center overflow-hidden',
          animatedClass,
          isActive && 'bg-neutral-50',
          itemClass
        )}>
        <div className="flex size-5 shrink-0 items-center justify-center">
          <SvgIcon
            icon={icon}
            className={cn(
              'transition-colors duration-300',
              activeText(isActive)
            )}
          />
        </div>
        <TypographySmall
          text={name}
          className={cn(
            'overflow-hidden whitespace-nowrap',
            animatedClass,
            labelClass,
            activeText(isActive)
          )}
        />
      </CardItem>
    </Link>
  );
};
