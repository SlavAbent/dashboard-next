'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { FilterType, SubHeaderCreateType } from '@/widgets/SubHeader/types';
import View from '@/widgets/SubHeader/View';
import SubHeaderFilters from '@/widgets/SubHeader/SubHeaderFilters';
import { Folder } from '@/widgets/Aside/types';
import { getCurrentPath } from '@/shared/config/getCurrentPath';
import { formatedTitle } from '@/shared/config/formattedTitle';

const DEFAULT_FILTER_ID = 2;

const SubHeaderCreate = ({
  foldersData,
  subheaderData,
}: SubHeaderCreateType) => {
  const pathname = usePathname();
  const segment = getCurrentPath(pathname);
  const [activeFilterId, setActiveFilterId] = useState<number | null>(
    DEFAULT_FILTER_ID
  );

  const handleFilterClick = (id: number) => {
    setActiveFilterId(id);
  };

  const currentPage = foldersData.menu.find((folder: Folder) => {
    return folder.name.toLowerCase() === segment;
  });

  const hasFilters = currentPage?.subheader?.filters;
  const hasGrid = currentPage?.subheader?.grid;

  return (
    <div className="border-bottom flex min-h-[69px] items-center px-8">
      <div className="flex grow items-center">
        <TypographyH3 text={formatedTitle(segment ?? '')} className="mr-9" />

        <div className="flex items-center gap-5">
          {hasGrid &&
            subheaderData?.page?.view?.map((filter: FilterType) => {
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
      {hasFilters && <SubHeaderFilters />}
    </div>
  );
};

export default SubHeaderCreate;
