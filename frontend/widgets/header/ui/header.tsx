'use client';

import { Clock } from '@dashboard/clock';
import { PomodoroRuntime, PomodoroTimer } from '@dashboard/pomodoro';
import { Button } from '@dashboard/ui';
import { Weather } from '@dashboard/weather';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useAsideStore } from '@/entities/aside/model/aside.store';
import { Search } from '@/features/search';
import { UserDropdown } from '@/features/userDropdown';
import { RouteKey, routeToKeyMap } from '@/shared/config/routeMapping';

type PageKey = (typeof routeToKeyMap)[keyof typeof routeToKeyMap];
const hiddenPages = new Set<PageKey>([RouteKey.DASHBOARD, RouteKey.HOME]);

export const Header = () => {
  const pathname = usePathname();
  const toggleNavigation = useAsideStore((state) => state.toggle);
  const pageKey = routeToKeyMap[pathname];
  const isHidden = pageKey && hiddenPages.has(pageKey);

  return (
    <>
      <PomodoroRuntime />
      {!isHidden && (
        <div className="border-bottom flex min-h-14 min-w-0 items-center gap-2 px-3 py-2 sm:px-4 md:h-[69px] md:min-h-[69px] md:px-8 md:py-0">
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
          <div className="relative min-w-0 grow">
            <Search />
          </div>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <div className="hidden lg:block">
              <PomodoroTimer />
            </div>
            <Weather className="interactive-hover flex min-w-fit cursor-pointer rounded-xs p-1" />
            <Clock className="mr-1 flex" />
            <UserDropdown />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
