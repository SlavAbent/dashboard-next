import React from 'react';
import { CardItemType } from '@/shared/ui/CardItem/types';
import { cn } from '@/lib/utils';

const CardItem = ({ children, onClick, className }: CardItemType) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer flex-row items-center gap-y-1 rounded-sm p-2 duration-150 hover:bg-neutral-50',
        className
      )}
      onClick={onClick}>
      {children}
    </div>
  );
};

export default CardItem;
