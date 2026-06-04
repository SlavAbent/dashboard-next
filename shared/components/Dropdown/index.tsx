'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/shared/components/dropdown-menu';

import { DropdownProps } from '@/shared/components/Dropdown/types/dropdown.types';
import { DropdownHeader } from '@/shared/components/Dropdown/ui/dropdown-header';
import { AvatarGroup } from '@/shared/components/Dropdown/ui/dropdown-group';
import { useState } from 'react';
import DropdownText from '@/shared/components/Dropdown/ui/dropdown-text';

export function Dropdown(props: DropdownProps) {
  const {
    src,
    isAvatar,
    text = 'User',
    size,
    items,
    classNameContainer,
    classNameText,
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        {isAvatar ? (
          <DropdownHeader
            src={src}
            text={text}
            size={size}
            classNameContainer={classNameContainer}
            classNameText={classNameText}
          />
        ) : (
          <DropdownText classNameText={classNameText} text={text} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          <AvatarGroup items={items} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
