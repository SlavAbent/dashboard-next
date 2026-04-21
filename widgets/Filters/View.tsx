import React from 'react';
import { SvgIcon } from '@/shared/ui/SvgIcon';
import { cn } from '@/lib/utils';
import { TypographyP } from '@/shared/ui/Typography/TypographyP';
import { FilterType } from '@/widgets/Filters/types';

const View = ({
  filter,
  isActive,
  handleFilterClick,
}: {
  filter: FilterType;
  isActive: boolean;
  handleFilterClick: (id: number) => void;
}) => {
  return (
    <div
      className="flex cursor-pointer items-center gap-1 py-5"
      onClick={() => handleFilterClick(Number(filter.id))}>
      <div>
        <SvgIcon
          icon={filter.icon}
          className={cn(
            'transition-colors duration-300',
            isActive ? 'text-black' : 'text-[#727272] group-hover:text-black'
          )}
        />
      </div>

      <TypographyP
        text={filter.name}
        className={`${
          isActive ? 'text-black' : 'text-neutral-80 group-hover:text-black'
        }`}
      />
    </div>
  );
};

export default View;
