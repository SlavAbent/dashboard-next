'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { Clock } from '@/features/clock/ui/clock';
import { PomodoroTimer } from '@/features/pomodoro';
import { Search } from '@/features/search';
import { UserDropdown } from '@/features/userDropdown';
import { Weather } from '@/features/weather';
import { RouteKey, routeToKeyMap } from '@/shared/config/routeMapping';

type PageKey = (typeof routeToKeyMap)[keyof typeof routeToKeyMap];
const hiddenPages = new Set<PageKey>([RouteKey.DASHBOARD, RouteKey.HOME]);

export const Header = () => {
  const pathname = usePathname();
  const pageKey = routeToKeyMap[pathname];

  if (pageKey && hiddenPages.has(pageKey)) return null;

  return (
    <div className="border-bottom flex min-h-[69px] items-center px-8 py-[15.5]">
      <div className="relative grow">
        <Search />
      </div>
      <div className="flex items-center gap-2">
        <PomodoroTimer />
        <Weather className="interactive-hover min-w-fit cursor-pointer rounded-xs p-1" />
        <Clock className="mr-2" />
        <UserDropdown />
      </div>
    </div>
  );
};

export default Header;
