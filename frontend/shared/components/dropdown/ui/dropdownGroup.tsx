'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

import {
  DropdownItem,
  DropdownProps,
} from '@/shared/components/dropdown/types/dropdown.types';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/components/dropdown/ui/dropdownMenu';

export function DropdownGroup({ options }: DropdownProps) {
  if (!options?.length) return null;

  const handleLogout = () => {
    return signOut({
      redirectTo: '/login',
    });
  };

  return (
    <DropdownMenuGroup>
      {options.map((option: DropdownItem) => {
        if (option.separator) {
          return <DropdownMenuSeparator key={option.id} />;
        }

        if (option.isLogout) {
          return (
            <DropdownMenuItem
              key={option.id}
              onClick={handleLogout}
              className="cursor-pointer"
              variant={option.style ?? 'default'}>
              Logout
            </DropdownMenuItem>
          );
        }

        return (
          <DropdownMenuItem
            key={option.id}
            onClick={option.onClick}
            className="cursor-pointer">
            {option.title}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuGroup>
  );
}
