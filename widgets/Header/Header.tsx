'use client';

import React from 'react';
import { Dropdown } from '@/shared/components/Dropdown';
import Weather from '@/widgets/Weather/Weather';
import { PomodoroTimer } from '@/features/pomodoro';
import { Clock } from '@/features/clock/ui/clock';
import { Search } from '@/features/Search';

const Header = () => {
  return (
    <div className="border-bottom flex min-h-[70px] items-center px-8 py-[15.5]">
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
