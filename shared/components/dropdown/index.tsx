'use client';

import { useState } from 'react';

import { DropdownProps } from '@/shared/components/dropdown/types/dropdown.types';
import { DropdownGroup } from '@/shared/components/dropdown/ui/dropdownGroup';
import { DropdownHeader } from '@/shared/components/dropdown/ui/dropdownHeader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/shared/components/dropdown/ui/dropdownMenu';
import DropdownText from '@/shared/components/dropdown/ui/dropdownText';

export function Dropdown(props: DropdownProps) {
  const {
    src,
    isAvatar,
    text = 'User',
    size,
    options,
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
          <DropdownGroup options={options} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
