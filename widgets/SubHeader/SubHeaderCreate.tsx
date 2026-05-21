'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TypographyH3 } from '@/shared/ui/Typography/TypographyH3';
import {
  FilterType,
  SubHeaderCreateType,
} from '@/widgets/SubHeader/types/sub-header.types';
import View from '@/widgets/SubHeader/View';
import SubHeaderFilters from '@/widgets/SubHeader/SubHeaderFilters';
import type { NavigationMenuItem } from '@/entities/navigation';
import { routeToKeyMap } from '@/shared/config/routeMapping';
import { formatedTitle } from '@/shared/config/formattedTitle';
import { useViewStore } from '@/entities/board/model/list.store';
import type { BoardViewMode } from '@/entities/board/model/types/list-types';

const SubHeaderCreate = ({
  foldersData,
  subheaderData,
}: SubHeaderCreateType) => {
  const pathname = usePathname();
  const pageKey = routeToKeyMap[pathname];
  const setView = useViewStore((state) => state.setView);
  const activeFilterId = useViewStore((state) => state.activeFilterId);
  const setActiveFilterId = useViewStore((state) => state.setActiveFilterId);

  const handleFilterClick = (id: number | null, name: BoardViewMode) => {
    setActiveFilterId(id);
    setView(name);
  };

  const currentPage = foldersData.menu.find((item: NavigationMenuItem) => {
    return item.name.toLowerCase() === pageKey;
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
                    handleFilterClick(Number(id), name as BoardViewMode)
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
