'use client';

import React from 'react';

import { ThemeSwitch } from '@/shared/components/themeSwitch/themeSwitch';

export const AsideFooter = () => {
  return (
    <div className="bg-sidebar flex grow items-end justify-center px-1 py-5">
      <ThemeSwitch />
    </div>
  );
};
