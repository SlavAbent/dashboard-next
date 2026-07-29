import cn from 'clsx';
import React from 'react';

import { EllipseType } from '@/shared/components/ellipse/ellipse.types';
import { sizeMapping } from '@/shared/components/ellipse/shared/sizeMapping';

export const Ellipse = ({ size = 8, color = '#000000' }: EllipseType) => {
  const normalizeSize = sizeMapping[Number(size)] || 'w-2 h-2';
  return (
    <div
      style={{ backgroundColor: color }}
      className={cn(
        'flex items-center justify-center rounded-[50%]',
        normalizeSize
      )}
    />
  );
};
