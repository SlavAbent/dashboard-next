'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import { FilterType, SubHeaderCreateType } from '@/widgets/SubHeader/types';
import View from '@/widgets/SubHeader/View';
import SubHeaderFilters from '@/widgets/SubHeader/SubHeaderFilters';
import { Folder } from '@/widgets/Aside/types';
import { routeToKeyMap } from '@/shared/config/routeMapping';
import { formatedTitle } from '@/shared/config/formattedTitle';
import { useListStore } from '@/entities/board/model/list.store';
import { ViewType } from '@/entities/board/types';

const SubHeaderCreate = ({
  foldersData,
  subheaderData,
}: SubHeaderCreateType) => {
  const pathname = usePathname();
  const pageKey = routeToKeyMap[pathname];
  const { setView, activeFilterId, setActiveFilterId } = useListStore();

  const handleFilterClick = (id: number | null, name: ViewType) => {
    setActiveFilterId(id);
    setView(name);
  };

  const currentPage = foldersData.menu.find((folder: Folder) => {
    return folder.name.toLowerCase() === pageKey;
  });

  const hasFilters = currentPage?.subheader?.filters;
  const hasGrid = currentPage?.subheader?.grid;

  const title = currentPage?.name?.trim() || formatedTitle(pageKey);

  return (
    <div className="border-bottom flex min-h-[69px] items-center px-8">
      <div className="flex grow items-center gap-9">
        <TypographyH3 text={title} />

        <div className="flex items-center">
          {hasGrid &&
            subheaderData?.page?.view?.map((filter: FilterType) => {
              const { id, name } = filter;
              return (
                <View
                  key={id}
                  filter={filter}
                  isActive={activeFilterId === id}
                  handleFilterClick={() =>
                    handleFilterClick(Number(id), name as ViewType)
                  }
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
