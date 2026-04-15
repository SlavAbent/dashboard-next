'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AvatarDropdownOptionType,
  AvatarDropdownType,
} from '@/components/types';
import { TypographySmall } from '@/components/ui/typographySmall';

export function AvatarDropdown(props: AvatarDropdownType) {
  const { src, name, separator, options, footer } = props;
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <div className="hover:none flex cursor-pointer items-center gap-2 px-2 hover:bg-transparent hover:text-current hover:shadow-none">
          <Avatar className="h-8 w-8">
            <AvatarImage src={src} alt="avatar" />
            <AvatarFallback>{name.split('')[0]}</AvatarFallback>
          </Avatar>

          <TypographySmall className="text-sm font-medium" text={name} />

          <ChevronDown
            width={16}
            height={16}
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
