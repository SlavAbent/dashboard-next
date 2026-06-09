'use client';

import React from 'react';
import { ThemeSwitch } from '@/shared/components/ThemeSwitch/theme-switch';

const AsideFooter = () => {
  return (
    <div className="bg-sidebar flex grow items-end justify-center px-3 py-5">
      <ThemeSwitch />
    </div>
  );
};

export default AsideFooter;
