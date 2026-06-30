'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { useViewStore } from '@/entities/board/model/list.store';
import type { BoardViewMode } from '@/entities/board/model/types/list-types';
import type { NavigationMenuItem } from '@/entities/navigation';
import { TaskFilters } from '@/features/task-filters';
import { TypographyH3 } from '@/shared/components/Typography/TypographyH3';
import { formatedTitle } from '@/shared/config/formattedTitle';
import { routeToKeyMap } from '@/shared/config/routeMapping';
import {
  FilterType,
  SubHeaderCreateType,
} from '@/widgets/SubHeader/types/sub-header.types';
import View from '@/widgets/SubHeader/View';

const SubHeaderCreate = ({ navigation }: SubHeaderCreateType) => {
  const pathname = usePathname();
  const pageKey = routeToKeyMap[pathname];
  const setView = useViewStore((state) => state.setView);
  const activeFilterId = useViewStore((state) => state.activeFilterId);
  const setActiveFilterId = useViewStore((state) => state.setActiveFilterId);

  const handleFilterClick = (id: string, name: BoardViewMode) => {
    setActiveFilterId(id);
    setView(name);
  };

  const currentPage = navigation.menu.find((item: NavigationMenuItem) => {
    return item.slug === pageKey;
  });

  const hasFilters = currentPage?.subheader?.filters;
  const hasGrid = currentPage?.subheader?.grid;
  const views = currentPage?.subheader?.view ?? [];

  const title = currentPage?.name?.trim() || formatedTitle(pageKey);

  return (
    <div className="border-bottom flex min-h-[69px] items-center px-8">
      <div className="flex grow items-center gap-9">
        <TypographyH3 text={title} />
        <div className="flex items-center">
          {hasGrid &&
            views.map((filter: FilterType) => {
              const { id, name } = filter;
              return (
                <View
                  key={id}
                  filter={filter}
                  isActive={activeFilterId === id}
                  handleFilterClick={() =>
                    handleFilterClick(id, name as BoardViewMode)
                  }
                />
              );
            })}
        </div>
      </div>
      {hasFilters && <TaskFilters />}
    </div>
  );
};

export default SubHeaderCreate;
