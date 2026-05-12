import React from 'react';
import { SvgIcon } from '@/shared/ui/SvgIcon';
import { cn } from '@/lib/utils';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { ViewType } from '@/widgets/SubHeader/types';

const View = ({ filter, isActive, handleFilterClick }: ViewType) => {
  const isActiveElement = isActive
    ? 'text-black'
    : 'text-neutral-80 group-hover:text-black';

  return (
    <div
      className="relative flex cursor-pointer items-center gap-1 border-transparent p-5 transition-colors"
      onClick={() => handleFilterClick(Number(filter.id))}>
      <SvgIcon
        icon={filter.icon}
        className={cn('transition-colors duration-300', isActiveElement)}
      />

      <TypographyP text={filter.name} className={isActiveElement} />

      <div
        className={cn(
          'absolute bottom-0 left-0 h-[4px] w-full transition-all',
          isActive ? 'border-bottom-large' : 'bg-transparent'
        )}
      />
    </div>
  );
};

export default View;
