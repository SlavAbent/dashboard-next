import React from 'react';
import { SvgIcon } from '@/shared/ui/SvgIcon';
import { cn } from '@/lib/utils';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { FilterType } from '@/widgets/Filters/types';

const Filter = ({ filter }: { filter: FilterType }) => {
  return (
    <div className="flex cursor-pointer items-center gap-1 py-5">
      <div>
        <SvgIcon
          icon={filter.icon}
          className={cn('transition-colors duration-300')}
        />
      </div>

      <TypographyP text={filter.name} />
    </div>
  );
};

export default Filter;
