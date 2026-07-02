'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { Clock } from '@/features/clock/ui/clock';
import { PomodoroTimer } from '@/features/pomodoro';
import { Search } from '@/features/Search';
import { Dropdown } from '@/shared/components/Dropdown';
import { routeToKeyMap } from '@/shared/config/routeMapping';
import { Weather } from '@/widgets/Weather/Weather';

type PageKey = (typeof routeToKeyMap)[keyof typeof routeToKeyMap];
const hiddenPages: PageKey[] = ['dashboard', 'home'];

const Header = () => {
  const pathname = usePathname();
  const pageKey = routeToKeyMap[pathname];

  if (pageKey && hiddenPages.includes(pageKey)) {
    return null;
  }

  return (
    <div className="border-bottom flex min-h-[69px] items-center px-8 py-[15.5]">
      <div className="relative grow">
        <Search />
      </div>
      <div className="flex items-center gap-2">
        <PomodoroTimer />
        <Weather className="interactive-hover min-w-fit cursor-pointer rounded-xs p-1" />
        <Clock className="" />
        <Dropdown
          src=""
          isAvatar
          text="Abent S."
          className="interactive-hover min-w-fit rounded-xs p-1"
          options={[
            { id: '1', title: 'Profile' },
            { id: '2', title: 'Billing' },
            { id: '3', separator: true },
            {
              id: '4',
              title: 'Log out',
              destructive: true,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Header;
