'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { FiltersCreateType, FilterType } from '@/widgets/Filters/types';
import Filter from '@/widgets/Filters/Filter';

const Filters = ({ data }: FiltersCreateType) => {
  const pathname = usePathname();
  const pageTitle = pathname.split('/')[1];
  const capitalizedTitle = `${pageTitle[0].toUpperCase()}${pageTitle.slice(1)}`;

  return (
    <div className="border-bottom flex items-center px-8">
      <TypographyH3 text={capitalizedTitle} className="mr-9" />

      <div className="flex items-center gap-5">
        {data.tasks.map((filter: FilterType) => {
          return <Filter key={filter.id} filter={filter} />;
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
