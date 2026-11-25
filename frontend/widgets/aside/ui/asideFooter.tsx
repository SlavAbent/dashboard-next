'use client';

import { ThemeSwitch } from '@dashboard/ui';
import { cn } from '@lib/cn';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import { useAsideStore } from '@/entities/aside/model/aside.store';

export const AsideFooter = () => {
  const { data: session } = useSession();
  const collapsed = useAsideStore((state) => state.collapsed);

  return (
    <div
      className={cn(
        'bg-sidebar flex grow items-end px-3 py-5',
        'transition-[width] duration-500 ease-in-out',
        collapsed ? 'w-16' : 'w-[180px]'
      )}>
      <ThemeSwitch
        user={session?.user}
        showUserName={!collapsed}
        onLogout={() => void signOut({ redirectTo: '/login' })}
      />
    </div>
  );
};
