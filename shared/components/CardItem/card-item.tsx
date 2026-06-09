import React from 'react';
import { CardItemType } from '@/shared/components/CardItem/card-item.types';
import { cn } from '@/shared/lib/cn';

export const CardItem = ({ children, onClick, className }: CardItemType) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer flex-row items-center gap-y-1 rounded-sm p-2 duration-150 hover:bg-neutral-50 dark:hover:text-zinc-900',
        className
      )}
      onClick={onClick}>
      {children}
    </div>
  );
};
