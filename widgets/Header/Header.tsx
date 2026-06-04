'use client';

import React, { useEffect, useRef } from 'react';
import { Input } from '@/shared/components/input';
import { SearchIcon } from '@/shared/icons/ui/SearchIcon';
import IconWrapper from '@/shared/icons/iconWrapper';
import { Dropdown } from '@/shared/components/Dropdown';
import Weather from '@/widgets/Weather/Weather';
import { iconSize } from '@/shared/icons/iconSize';
import { PomodoroTimer } from '@/features/pomodoro';
import { Clock } from '@/features/clock/ui/clock';

const Header = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      const isSearchShortCut =
        (isMac && e.metaKey && e.key.toLowerCase() === 'f') ||
        (!isMac && e.ctrlKey && e.key.toLowerCase() === 'f');

      if (isSearchShortCut) {
        e.preventDefault();

        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="border-bottom flex min-h-[70px] items-center px-8 py-[15.5]">
      <div className="grow">
        <Input
          ref={inputRef}
          placeholder="SearchIcon"
          className="min-w-[360px]"
          leftIcon={<SearchIcon size={iconSize(20)} />}
          rightIcon={
            <div className="flex items-center gap-2">
              <IconWrapper className="bg-[#D8D8D8]">⌘</IconWrapper>
              <IconWrapper className="bg-[#F2F2F2]">F</IconWrapper>
            </div>
          }
        />
      </div>
      <div className="flex items-center gap-2">
        <PomodoroTimer />
        <Weather className="min-w-fit cursor-pointer rounded-xs p-1 transition-colors duration-200 ease-in-out hover:bg-[#D8D8D8]/30" />
        <Clock className="" />
        <Dropdown
          src=""
          isAvatar
          text="Abent S."
          className="min-w-fit rounded-xs p-1 transition-colors duration-200 ease-in-out hover:bg-[#D8D8D8]/30"
          items={[
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
