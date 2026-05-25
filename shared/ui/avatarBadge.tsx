'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

import { cn } from '@/shared/lib/cn';
import {
  AvatarDropdownOptionType,
  AvatarDropdownType,
} from '@/shared/ui/avatar-dropdown.types';
import { TypographySmall } from '@/shared/ui/Typography/TypographySmall';
import { iconSize } from '@/shared/icons/iconSize';
import { ArrowIcon } from '@/shared/icons/ui/ArrowIcon';

export function AvatarDropdown(props: AvatarDropdownType) {
  const { src, name, separator, options, footer, className } = props;
  const [open, setOpen] = useState(false);

  const avatarName: string = name.split('')[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className={className}>
        <div className="hover:none flex cursor-pointer items-center gap-2 px-2 hover:bg-transparent hover:text-current hover:shadow-none">
          <Avatar className="h-8 w-8">
            <AvatarImage src={src} alt="avatar" />
            <AvatarFallback>{avatarName}</AvatarFallback>
          </Avatar>

          <TypographySmall className="text-sm font-medium" text={name} />

          <ArrowIcon
            size={iconSize(16)}
            className={cn(
              'color-[#000000] h-4 w-4 transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          {options &&
            options.map((option: AvatarDropdownOptionType) => {
              return (
                <DropdownMenuItem key={option.id}>
                  {option.title}
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuGroup>

        {separator && <DropdownMenuSeparator />}

        {footer &&
          footer.map((option: AvatarDropdownOptionType) => {
            return (
              <DropdownMenuItem
                key={option.id}
                className="text-red-500 focus:text-red-500">
                {option.title}
              </DropdownMenuItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
