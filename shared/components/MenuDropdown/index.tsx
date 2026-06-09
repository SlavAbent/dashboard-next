import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/Dropdown/ui/dropdown-menu';
import { MenuProps } from '@/shared/components/MenuDropdown/menu.types';
import cn from 'clsx';
import { TypographySmall } from '@/shared/components/Typography/TypographySmall';
import React from 'react';

export const MenuDropdown = ({
  label,
  open,
  icon,
  onOpenChange,
  options,
  onSelect,
  className,
  classNameItem,
  classNameText,
}: MenuProps) => {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        className={cn(
          'border-border flex h-10 cursor-pointer items-center gap-2 rounded-sm border px-3 py-1',
          className
        )}>
        {icon}
        <TypographySmall
          text={label}
          className={cn('text-sm font-medium', classNameText)}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuItem
              className={classNameItem}
              key={option.id}
              onClick={() => onSelect?.(option)}>
              {option.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
