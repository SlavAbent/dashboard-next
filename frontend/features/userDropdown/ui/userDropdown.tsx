'use client';

import { Dropdown } from '@dashboard/ui';
import { Skeleton } from '@dashboard/ui';
import { useSession } from 'next-auth/react';
import React from 'react';

export const UserDropdown = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Skeleton mode="shimmer" />;
  }

  if (!session) {
    return null;
  }

  const fullName = session.user?.name?.trim() ?? '';
  const [firstName = '', lastName = ''] = fullName.split(/\s+/);
  const compactName = [firstName, lastName]
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}.`)
    .join('');

  return (
    <Dropdown
      src={session?.user?.image ?? ''}
      isAvatar
      text={fullName}
      compactText={compactName}
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
