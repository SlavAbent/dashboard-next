import React from 'react';
import { CardItemType } from '@/shared/components/CardItem/card-item.types';
import { cn } from '@/shared/lib/cn';

export const CardItem = ({ children, onClick, className }: CardItemType) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer flex-row items-center rounded-sm p-2 hover:bg-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-black',
        className
      )}
      onClick={onClick}>
      {children}
    </div>
  );
};
