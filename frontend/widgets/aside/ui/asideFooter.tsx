'use client';

import { ThemeSwitch } from '@dashboard/ui';
import React from 'react';

export const AsideFooter = () => {
  return (
    <div className="bg-sidebar flex grow items-end justify-center px-1 py-5">
      <ThemeSwitch />
    </div>
  );
};
