'use client';

import React from 'react';

import {
  DropdownItem,
  DropdownProps,
} from '@/shared/components/Dropdown/types/dropdown.types';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/components/Dropdown/ui/dropdown-menu';

export function DropdownGroup({ options }: DropdownProps) {
  if (!options?.length) return null;

  return (
    <DropdownMenuGroup>
      {options.map((option: DropdownItem) => {
        if (option.separator) {
          return <DropdownMenuSeparator key={option.id} />;
        }

        return (
          <DropdownMenuItem key={option.id} onClick={option.onClick}>
            {option.title}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuGroup>
  );
}
