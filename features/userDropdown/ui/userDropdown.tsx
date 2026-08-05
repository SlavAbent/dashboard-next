'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import { Dropdown } from '@/shared/components/dropdown';
import { Skeleton } from '@/shared/components/skeleton/skeleton';

export const UserDropdown = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Skeleton mode="shimmer" />;
  }

  if (!session) {
    return null;
  }

  return (
    <Dropdown
      src={session?.user?.image ?? ''}
      isAvatar
      text={session?.user?.name ?? ''}
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
  );
};
