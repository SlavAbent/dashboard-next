'use client';

import cn from 'clsx';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

import type { BoardViewMode } from '@/entities/board';
import { useViewStore } from '@/entities/board/model/list.store';
import type { NavigationMenuItem } from '@/entities/navigation';
import { TaskFilters } from '@/features/taskFilters';
import { Dropdown } from '@/shared/components/dropdown';
import { Skeleton } from '@/shared/components/skeleton/skeleton';
import { TypographyH3 } from '@/shared/components/typography/typographyH3';
import { formatedTitle } from '@/shared/config/formattedTitle';
import { RouteKey, routeToKeyMap } from '@/shared/config/routeMapping';
import {
  FilterType,
  SubHeaderCreateType,
} from '@/widgets/subHeader/types/subHeader.types';
import View from '@/widgets/subHeader/ui/view';

const SubHeaderCreate = ({ navigation }: SubHeaderCreateType) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
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

  if (status === 'loading') {
    return <Skeleton mode="shimmer" />;
  }

  if (status === 'unauthenticated') {
    return <div>Not authenticated</div>;
  }

  const handleFilterClick = (id: string, name: BoardViewMode) => {
    setActiveFilterId(id);
    setView(name);
  };

  return (
    <div className="border-bottom flex min-h-[69px] items-center px-8">
      <div className="flex grow items-center gap-9">
        <TypographyH3 text={title} className="flex grow" />

        <div className="flex items-center">
          {showProfileDropdown && (
            <Dropdown
              src={session?.user?.image ?? ''}
              isAvatar
              text={session?.user?.name ?? 'Say my name!'}
              className="interactive-hover min-w-fit rounded-xs p-1"
              options={[
                { id: '1', title: 'Profile' },
                { id: '2', title: 'Billing' },
                { id: '3', separator: true },
                {
                  id: '4',
                  title: 'Log out',
                  isLogout: true,
                  style: 'destructive',
                },
              ]}
            />
          )}
        </div>

        <div className={cn('', hasGrid ? 'flex items-center' : 'hidden')}>
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
