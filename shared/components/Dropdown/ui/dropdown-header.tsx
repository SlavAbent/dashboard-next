'use client';

import { DropdownHeaderProps } from '@/shared/components/Dropdown/types/dropdown.types';
import cn from 'clsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/Avatar/avatar';
import DropdownText from '@/shared/components/Dropdown/ui/dropdown-text';

export function DropdownHeader({
  src,
  text = 'User',
  size,
  classNameContainer,
  classNameText,
}: DropdownHeaderProps) {
  const avatarName = text.trim().charAt(0).toUpperCase();

  return (
    <div className={cn('flex items-center gap-2', classNameContainer)}>
      <Avatar size={size} className="size-7">
        <AvatarImage src={src} alt={text} />
        <AvatarFallback>{avatarName}</AvatarFallback>
      </Avatar>
      <DropdownText classNameText={classNameText} text={text} />
    </div>
  );
}
