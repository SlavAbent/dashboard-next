'use client';

import { Button, TypographyH3 } from '@dashboard/ui';
import cn from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useAsideStore } from '@/entities/aside/model/aside.store';
import type { BoardViewMode } from '@/entities/board';
import { useViewStore } from '@/entities/board/model/list.store';
import type { NavigationMenuItem } from '@/entities/navigation';
import { TaskFilters } from '@/features/taskFilters';
import { UserDropdown } from '@/features/userDropdown/ui/userDropdown';
import { formatedTitle } from '@/shared/config/formattedTitle';
import { RouteKey, routeToKeyMap } from '@/shared/config/routeMapping';
import {
  FilterType,
  SubHeaderCreateType,
} from '@/widgets/subHeader/types/subHeader.types';
import View from '@/widgets/subHeader/ui/view';

const SubHeaderCreate = ({ navigation }: SubHeaderCreateType) => {
  const pathname = usePathname();
  const toggleNavigation = useAsideStore((state) => state.toggle);

  const setView = useViewStore((state) => state.setView);
  const activeFilterId = useViewStore((state) => state.activeFilterId);
  const setActiveFilterId = useViewStore((state) => state.setActiveFilterId);

  const pageKey = routeToKeyMap[pathname];
  const currentPage = navigation.menu.find((item: NavigationMenuItem) => {
    return item.slug === pageKey;
  });

  const hasFilters = currentPage?.subheader?.filters;
  const hasGrid = currentPage?.subheader?.grid;
  const views = currentPage?.subheader?.view ?? [];

  const title = currentPage?.name?.trim() || formatedTitle(pageKey ?? '');
  const showProfileDropdown =
    pageKey === RouteKey.HOME || pageKey === RouteKey.DASHBOARD;

  const handleFilterClick = (id: string, name: BoardViewMode) => {
    setActiveFilterId(id);
    setView(name);
  };

  return (
    <div className="border-bottom flex min-h-14 min-w-0 flex-wrap items-center gap-2 px-3 py-2 sm:px-4 md:min-h-[69px] md:flex-nowrap md:px-8 md:py-0">
      {showProfileDropdown && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Toggle navigation"
          onClick={toggleNavigation}
          className="size-11 shrink-0 lg:hidden">
          <span className="flex flex-col gap-1" aria-hidden="true">
            <span className="bg-foreground h-0.5 w-5 rounded-full" />
            <span className="bg-foreground h-0.5 w-5 rounded-full" />
            <span className="bg-foreground h-0.5 w-5 rounded-full" />
          </span>
        </Button>
      )}
      <div className="flex min-w-0 grow items-center gap-2 sm:gap-4 md:gap-6">
        <TypographyH3
          text={title}
          className={cn('flex', showProfileDropdown && 'grow')}
        />

        <div className="flex items-center">
          {showProfileDropdown && <UserDropdown />}
        </div>

        <div
          className={cn(
            '',
            hasGrid ? 'flex items-center overflow-x-auto' : 'hidden'
          )}>
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
      {hasFilters && (
        <div className="w-full overflow-x-auto md:w-auto">
          <TaskFilters />
        </div>
      )}
    </div>
  );
};

export default SubHeaderCreate;
