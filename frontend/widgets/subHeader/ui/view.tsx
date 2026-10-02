import React from 'react';

import { TypographyP } from '@/shared/components/typography/typographyP';
import { SvgIcon } from '@/shared/icons/svgIcon';
import { cn } from '@/shared/lib/cn';
import { SubHeaderViewControlType } from '@/widgets/subHeader/types/subHeader.types';

const View = ({
  filter,
  isActive,
  handleFilterClick,
}: SubHeaderViewControlType) => {
  const isActiveElement = isActive
    ? 'text-foreground'
    : 'text-muted-foreground group-hover:text-foreground';

  return (
    <div
      className="relative flex cursor-pointer items-center gap-1 border-transparent p-5 transition-colors"
      onClick={handleFilterClick}>
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
