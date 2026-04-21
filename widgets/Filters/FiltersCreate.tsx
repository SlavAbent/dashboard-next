'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { FiltersCreateType, FilterType } from '@/widgets/Filters/types';
import View from '@/widgets/Filters/View';
import FilterActions from '@/widgets/Filters/FilterActions';

const DEFAULT_FILTER_ID = 2;

const formatTitle = (pathname: string): string => {
  const segment = pathname.split('/').filter(Boolean)[0];

  if (!segment) return '/';

  return `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`;
};

const Filters = ({ data }: FiltersCreateType) => {
  const pathname = usePathname();
  const [activeFilterId, setActiveFilterId] = useState<number | null>(
    DEFAULT_FILTER_ID
  );

  const handleFilterClick = (id: number) => {
    setActiveFilterId(id);
  };

  return (
    <div className="border-bottom flex items-center px-8">
      <div className="flex grow items-center">
        <TypographyH3 text={formatTitle(pathname)} className="mr-9" />

        <div className="flex items-center gap-5">
          {data?.tasks?.map((filter: FilterType) => {
            return (
              <View
                key={filter.id}
                filter={filter}
                isActive={activeFilterId === filter.id}
                handleFilterClick={handleFilterClick}
              />
            );
          })}
        </div>
      </div>
      <FilterActions />
    </div>
  );
};

export default Filters;
