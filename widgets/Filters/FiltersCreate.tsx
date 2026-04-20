'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { FiltersCreateType, FilterType } from '@/widgets/Filters/types';
import Filter from '@/widgets/Filters/Filter';

const Filters = ({ data }: FiltersCreateType) => {
  const pathname = usePathname();
  const [isActiveFilter, setActiveFilter] = useState<number | null>(2);

  const formatTitle = (pathname: string): string => {
    const segment = pathname.split('/').filter(Boolean)[0];

    if (!segment) return '/';

    return `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`;
  };

  const title = useMemo(() => formatTitle(pathname), [pathname]);

  const handleFilterClick = useCallback((id: number) => {
    setActiveFilter(id);
  }, []);

  return (
    <div className="border-bottom flex items-center px-8">
      <TypographyH3 text={title} className="mr-9" />

      <div className="flex items-center gap-5">
        {data.tasks.map((filter: FilterType) => {
          return (
            <Filter
              key={filter.id}
              filter={filter}
              isActive={isActiveFilter === filter.id}
              handleFilterClick={handleFilterClick}
            />
          );
        })}
      </div>
      {/*<div>*/}
      {/*  <Button>Sort By</Button>*/}
      {/*  <Button>Filter</Button>*/}
      {/*  <Button>Add Task</Button>*/}
      {/*</div>*/}
    </div>
  );
};

export default Filters;
