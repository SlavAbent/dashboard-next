import React from 'react';
import { CardItemType } from '@/app/shared/ui/CardItem/types';
import { cva } from 'class-variance-authority';

const CardItem = ({ children, onClick, className }: CardItemType) => {
  const cardItemStyles = cva(
    'flex cursor-pointer flex-row items-center gap-y-1 rounded-sm p-2 duration-150 hover:bg-neutral-50'
  );

  return (
    <div className={cardItemStyles({ className })} onClick={onClick}>
      {children}
    </div>
  );
};

export default CardItem;
