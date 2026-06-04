'use client';

import React from 'react';
import {
  DropdownProps,
  DropdownItem,
} from '@/shared/components/Dropdown/types/dropdown.types';
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/components/dropdown-menu';

export function AvatarGroup({ items }: DropdownProps) {
  if (!items?.length) return null;

  return (
    <DropdownMenuGroup>
      {items.map((item: DropdownItem) => {
        if (item.separator) {
          return <DropdownMenuSeparator key={item.id} />;
        }

        return (
          <DropdownMenuItem key={item.id} onClick={item.onClick}>
            {item.title}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuGroup>
  );
}
