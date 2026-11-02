import { cn } from '@lib/cn';
import React from 'react';

import { CardItemType } from '@/shared/components/cardItem/cardItem.types';

export const CardItem = ({ children, onClick, className }: CardItemType) => {
  const styles = cn(
    'flex cursor-pointer flex-row items-center rounded-sm p-2 hover:bg-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-black',
    className
  );

  if (onClick) {
    return (
      <button type="button" className={styles} onClick={onClick}>
        {children}
      </button>
    );
  }

  return <div className={styles}>{children}</div>;
};
