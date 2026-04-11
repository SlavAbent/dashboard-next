'use client';

import React from 'react';
import { Logo } from '@/app/shared/icons/ui/Logo';
import Link from 'next/link';
import { Toggle } from '@/app/shared/icons/ui/Toggle';
import { useAsideStore } from '@/app/shared/store/aside.store';

const AsideHeader = () => {
  const { collapsed, toggle } = useAsideStore();
  return (
    <div
      className={`border-bottom relative py-[22px] ${collapsed ? 'min-w-[64px] px-4' : 'min-w-[250px] px-7'}`}>
      <Link href="/" className={`flex items-center overflow-hidden`}>
        <Logo
          className={`h-[24px] w-[28px] shrink-0 transition-all duration-300 ease-in-out`}
        />

        <span
          className={`ml-3 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'ml-0 max-w-0 opacity-0' : 'max-w-[140px] opacity-100'}`}>
          Venture
        </span>
      </Link>
      <div
        className="absolute top-1/2 -right-[14px] -translate-y-1/2 cursor-pointer"
        onClick={toggle}>
        <Toggle
          size={{
            width: 28,
            height: 28,
          }}
        />
      </div>
    </div>
  );
};

export default AsideHeader;
