import React from 'react';
import cn from 'clsx';
import { EllipseType } from '@/shared/ui/Ellipse/types';
import { sizeMapping } from '@/shared/ui/Ellipse/shared/sizeMapping';

const Ellipse = ({ size = 8, color = '#000000' }: EllipseType) => {
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

export default Ellipse;
