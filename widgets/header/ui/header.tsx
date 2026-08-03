'use client';

import { redirect, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

import { Clock } from '@/features/clock/ui/clock';
import { PomodoroTimer } from '@/features/pomodoro';
import { Search } from '@/features/search';
import { Weather } from '@/features/weather';
import { Dropdown } from '@/shared/components/dropdown';
import { Skeleton } from '@/shared/components/skeleton/skeleton';
import { routeToKeyMap } from '@/shared/config/routeMapping';

type PageKey = (typeof routeToKeyMap)[keyof typeof routeToKeyMap];
const hiddenPages = new Set<PageKey>(['dashboard', 'home']);

export const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === 'loading') {
    return <Skeleton mode="shimmer" />;
  }

  if (status === 'unauthenticated') {
    return <div>Not authenticated</div>;
  }

  if (!session) {
    redirect('/login');
  }

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
        <Dropdown
          src={session.user?.image ?? ''}
          isAvatar
          text={session.user?.name ?? 'You perfect!'}
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
      </div>
    </div>
  );
};

export default Header;
